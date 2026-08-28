// Server-side HTML sanitizer for admin-authored rich content (TinyMCE output).
// Implements an allowlist of tags, attributes, and CSS properties.
// This runs in Cloudflare Workers, which lacks DOMParser, so we use a
// tokenizer-based parser that handles well-formed HTML.
//
// NOTE: This is a defense-in-depth layer. Admin content is the only source
// reaching dangerouslySetInnerHTML on the client. Restricting to these tags
// and styles substantially reduces XSS blast radius even if an admin account
// is compromised.

const ALLOWED_TAGS = new Set([
  'p', 'div', 'br', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'sub', 'sup', 'mark',
  'ul', 'ol', 'li', 'blockquote', 'hr', 'pre', 'code',
  'a', 'img',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption', 'colgroup', 'col',
]);

// Attributes allowed per tag (or as a global set). 'style' is handled
// specially via sanitizeCss before this set is consulted.
const ALLOWED_ATTRS = new Set([
  'href', 'target', 'rel', 'title', 'alt', 'src', 'width', 'height', 'colspan', 'rowspan',
  'style',
]);

const FORBIDDEN_ATTR_PREFIXES = ['on'];
const FORBIDDEN_SCHEMES = ['javascript:', 'vbscript:', 'data:'];
const FORBIDDEN_TAG_NAMES = ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button', 'svg', 'math'];

// CSS properties relevant to formatting produced by TinyMCE / Google Docs paste.
const ALLOWED_CSS_PROPS = [
  'font-family', 'font-size', 'font-style', 'font-weight', 'text-decoration',
  'text-align', 'text-indent', 'line-height', 'color',
  'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding-left',
  'padding-right', 'padding-top', 'padding-bottom', 'background-color', 'list-style-type',
  'vertical-align', 'border', 'border-collapse',
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sanitizeCss(css) {
  if (!css) return '';
  const allowed = [];
  // remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  // Split on top-level semicolons (ignoring those inside parens/url()).
  const decls = css.split(/;(?![^(]*\))/);
  for (const decl of decls) {
    const m = /^\s*([a-zA-Z-]+)\s*:\s*([\s\S]*?)\s*$/.exec(decl);
    if (!m) continue;
    const prop = m[1].toLowerCase().trim();
    const value = m[2].trim().replace(/\s+/g, ' ');
    if (ALLOWED_CSS_PROPS.includes(prop)) {
      // Only block clearly dangerous payloads in the value.
      if (/(expression|javascript:|vbscript:|@import|behavior)/i.test(value)) {
        continue;
      }
      allowed.push(`${prop}: ${value}`);
    }
  }
  return allowed.join('; ');
}

function sanitizeAttrs(tag, attrsStr) {
  const attrs = {};
  // parse attribute list
  const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m;
  while ((m = attrRe.exec(attrsStr)) !== null) {
    const name = m[1].toLowerCase();
    let value = m[3] !== undefined ? m[3] : (m[4] !== undefined ? m[4] : (m[5] !== undefined ? m[5] : ''));
    if (FORBIDDEN_ATTR_PREFIXES.some((p) => name.startsWith(p))) continue;
    if (!ALLOWED_ATTRS.has(name)) continue;

    if (name === 'href' || name === 'src') {
      const lower = value.trim().toLowerCase();
      if (FORBIDDEN_SCHEMES.some((s) => lower.startsWith(s))) continue;
      // allow only http(s), mailto, tel, and relative
      if (/^[a-z]+:/.test(lower) && !/^(https?:|mailto:|tel:)/.test(lower)) continue;
    }
    if (name === 'style') {
      const cleaned = sanitizeCss(value);
      if (cleaned) attrs.style = cleaned;
      continue;
    }
    attrs[name] = value;
  }
  return attrs;
}

function serialize(tag, attrs, selfClose) {
  const a = Object.keys(attrs)
    .map((k) => ` ${k}="${escapeHtml(attrs[k])}"`)
    .join('');
  return selfClose ? `<${tag}${a} />` : `<${tag}${a}>`;
}

export function sanitizeHtml(input) {
  if (input == null) return '';
  const src = String(input);
  if (!src) return '';

  // Fast path: no markup that could be dangerous
  if (!/[<]/.test(src)) return src;

  let out = '';
  let i = 0;
  const len = src.length;

  while (i < len) {
    const c = src[i];
    if (c === '<') {
      // comments
      if (src.startsWith('<!--', i)) {
        const end = src.indexOf('-->', i + 4);
        i = end === -1 ? len : end + 3;
        continue;
      }
      // closing tag
      if (src[i + 1] === '/') {
        const gt = src.indexOf('>', i);
        if (gt === -1) { out += escapeHtml(src.slice(i)); break; }
        const tagName = src.slice(i + 2, gt).trim().split(/[\s>]/)[0].toLowerCase();
        if (ALLOWED_TAGS.has(tagName) && !FORBIDDEN_TAG_NAMES.includes(tagName)) {
          out += `</${tagName}>`;
        } else {
          // drop it, nothing
        }
        i = gt + 1;
        continue;
      }
      // opening tag
      const gt = src.indexOf('>', i);
      if (gt === -1) { out += escapeHtml(src.slice(i)); break; }
      const rawTag = src.slice(i + 1, gt);
      const parts = rawTag.split(/[\s/]/);
      let tagName = parts[0].toLowerCase();
      // handle <!doctype etc.
      if (tagName.startsWith('!')) { i = gt + 1; continue; }
      const selfClose = /\/>$/.test(rawTag);
      const attrsStr = rawTag.slice(parts[0].length);

      if (!ALLOWED_TAGS.has(tagName) || FORBIDDEN_TAG_NAMES.includes(tagName)) {
        // disallowed: since content is from TinyMCE, treat unknown as text (escape)
        out += escapeHtml(src.slice(i, gt + 1));
        i = gt + 1;
        continue;
      }

      const attrs = sanitizeAttrs(tagName, attrsStr);
      const isVoid = ['br', 'img', 'hr', 'col'].includes(tagName);
      out += serialize(tagName, attrs, selfClose || isVoid);
      i = gt + 1;
      continue;
    } else {
      // try to find next tag quickly
      const next = src.indexOf('<', i);
      if (next === -1) {
        out += escapeHtml(src.slice(i));
        break;
      }
      out += escapeHtml(src.slice(i, next));
      i = next;
    }
  }

  return out;
}
