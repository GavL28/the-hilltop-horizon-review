import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Turnstile } from '@marsidev/react-turnstile';
import { Editor } from '@tinymce/tinymce-react';

// Centralized Staff Data Array
const staffData = [
  { id: 'gavin', name: 'Gavin Liu', pronouns: 'He/Him', grade: 'Junior', role: 'Co-Editor in Chief &\nIT Developer', shortBio: 'Gavin Liu is a writer (mainly poetry), musician, visual artist, journalist, and avid magnet collector', fullBio: 'Gavin Liu is a writer (mainly poetry), musician, visual artist, journalist, and avid magnet collector from Sammamish, WA. He spends his time writing, playing the piano, gaming, on walks, overthinking, or doing nothing. He has over 200 magnets, which may or may not be a good financial investment but it’s too late to turn back now.', photo: '/IMG_1463.jpeg' },
  { id: 'tawanda', name: 'Tawanda Sibanda', pronouns: 'He/Him', grade: 'Senior', role: 'Co-Editor in Chief & Secretary', shortBio: 'Tawanda Sibanda is mainly a poet and artist from Allentown, Pennsylvania. He spends his time running, working out, baking treats, bopping to J-city pop, or staying up too late to binge anime.', fullBio: 'Tawanda Sibanda is mainly a poet and artist from Allentown, Pennsylvania. He spends his time running, working out, baking treats, bopping to J-city pop, or staying up too late to binge anime.', photo: '/Tawanda Sibanda.jpeg' },
  { id: 'sherry', name: 'Sherry Wang', pronouns: 'She/Her', grade: 'Junior', role: 'Poetry Editor & Social Media Director', shortBio: 'Sherry Wang is a teenage poet, musician, and public speaker from Monmouth County, New Jersey.', fullBio: 'Sherry Wang is a teenage poet, musician, and public speaker from Monmouth County, New Jersey. She began writing in the fifth grade after discovering the works of Shakespeare, whose plays and sonnets sparked her love of language. When she is not searching for her next inspiration, Sherry can be found performing on stage, spending weekends at Speech & Debate tournaments, or eating more sushi than she would like to admit.', photo: '/Sherry Wang..jpg'  },
  { id: 'mia-l', name: 'Mia Lucke', pronouns: 'She/Her', grade: 'Senior', role: 'Poetry Editor & Art Editor', shortBio: 'Mia Lucke is a poet and visual artist. Adopted from Taiwan, she currently lives in Milwaukee, Wisconsin.', fullBio: 'Mia Lucke is a poet and visual artist. Adopted from Taiwan, she currently lives in Milwaukee, Wisconsin. She spends her time writing, doing art, or going on walks. She often can be found performing her poetry for open mics, marathons, or fundraisers. The topics of her writings range from mental health, to biblical and mythological stories, or modern day society and politics. Her poetry focuses on processing both herself and the world around her.', photo: '/Mia_Lucke.jpg' },
  { id: 'grey', name: 'Gregory Whitworth-Neufeld', pronouns: 'He/Him', grade: 'Senior', role: 'Poetry Editor', shortBio: 'Gregory Whitworth-Neufeld is a poet, playwright, visual artist, actor, and editor. His work engages politics, nature, and small-scale social interactions.', fullBio: 'Gregory Whitworth-Neufeld is a poet, playwright, visual artist, actor, and editor. His work engages politics, nature, and small-scale social interactions. When he isn’t making art, he loves reading, rock climbing, forest walks, and listening to music.', photo: '/Gregory Whitworth-Neufeld (Grey).jpeg' },
  { id: 'jayne', name: 'Jayne Kim', pronouns: 'She/Her', grade: 'Senior', role: 'Nonfiction Editor & International Representative (South Korea)', shortBio: 'Coming Soon...', fullBio: 'Full biography coming soon...' },
  { id: 'stella', name: 'Stella Goldstein', pronouns: 'She/Her', grade: 'Junior', role: 'Nonfiction Editor & International Representative (Japan)', shortBio: 'Stella Goldstein is an aspiring journalist, poet, and fiction author. Born in Shanghai, she lived in Miami for eleven years and now lives in Tokyo.', fullBio: 'Stella Goldstein is an aspiring journalist, poet, and fiction author. Born in Shanghai, she lived in Miami for eleven years and now lives in Tokyo with her dad. Her writing focuses mainly on the teenager experience—eating disorders and social pressure are prominent topics. Outside of writing, she likes biking, yoga, sewing, and drinking matcha.', photo: '/Stella Goldstein Headshot.jpg' },
  { id: 'aster', name: 'Aster Ellis', pronouns: 'They/Them', grade: 'Senior', role: 'Nonfiction Editor', shortBio: 'Aster Ellis is a young writer from Memphis, Tennessee. When not writing, they enjoy playing the guitar and sitting in nature.', fullBio: 'Aster Ellis is a young writer from Memphis, Tennessee. When not writing, they enjoy playing the guitar and sitting in nature.', photo: '/Aster.jpg' },
  { id: 'juliana', name: 'Juliana Grindel', pronouns: 'She/Her', grade: 'Senior', role: 'Fiction Editor', shortBio: 'Juliana Grindel is a fiction writer, musician, fencer, and artist from Cheshire, Connecticut.', fullBio: 'Juliana Grindel is a fiction writer, musician, fencer, and artist from Cheshire, Connecticut. She has been writing since middle school, and focuses on speculative and flash fiction with psychological themes. Her goal in writing is to write a long form piece of psychological fiction. When she is not writing, she spends her free time playing clarinet, reading, or collecting blind boxes. ', photo: '/Juliana Grindel.jpeg' },
  { id: 'mia-s', name: 'Mia Song', pronouns: 'She/Her', grade: 'Senior', role: 'Poetry Editor', shortBio: 'Mia Song is an ambitious but amateur writer located in the depths of Florida\'s notorious swamps. She is a high school student who dedicates her passions for writing, drawing, singing, and dancing in her school community.', fullBio: 'Mia Song is an ambitious but amateur writer located in the depths of Florida\'s notorious swamps. She is a high school student who dedicates her passions for writing, drawing, singing, and dancing in her school community. In her free time, Mia enjoys writing poems, learning code, and participating in debate competitions. In her actual free time, you can find her glued to her phone screen, mostly consisting of cute kitty content and teenage brainrot.', photo: '/MiaSong.JPG' },
  { id: 'katelyn', name: 'Katelyn Gaubatz', pronouns: 'She/Her', grade: 'Senior', role: 'Fiction Editor', shortBio: 'Katelyn Gaubatz is a fiction and non-fiction writer from Richmond, Virginia. When she is not writing, she enjoys playing volleyball, violin, and pickleball.', fullBio: 'Katelyn Gaubatz is a fiction and non-fiction writer from Richmond, Virginia. When she is not writing, she enjoys playing volleyball, violin, and pickleball.', photo: '/Katelyn Gaubatz.jpg' },
  { id: 'che', name: 'Che Holts', pronouns: 'He/Him', grade: 'Junior', role: 'Photography Editor', shortBio: 'Che is Californian fiction writer, and athlete. He will tend to draw most inspiration from comic books and indie music.', fullBio: 'Che is Californian fiction writer, and athlete. He will tend to draw most inspiration from comic books and indie music. He started writing in fifth grade during lockdown just because he could and killed time. He loves and cherishes his pet beetles lovingly named Hamster and Dinosaur. Aspires and hopes  to one day  write a superhero novel that can be taught in schools and make people more excited about writing.', photo: '/Che Holts.jpeg' },
  { id: 'rubbi', name: 'Rubbi Chen', pronouns: 'She/Her', grade: 'Senior', role: 'International Representative (China)', shortBio: 'Rubbi is a fiction writer from Shanghai, China. Normally she writes some teenage queer romance, body horror (especially splatterpunk!) and suspense fiction.', fullBio: 'Rubbi is a fiction writer from Shanghai, China. Normally she writes some teenage queer romance, body horror (especially splatterpunk!) and suspense fiction. She started writing in primary school and her first work was a yaoi smut. Except for writing, she claims to have no other artistic talent, so she spends most of her time doing anthropology and queer studies research, advocating for women’s rights, watching women’s hockey, fantasizing about her future wife, and being a cat mom. ', photo: '/Rubbi Chen.jpg' },
];

// Frequently Asked Questions (accordion content)
const FAQ_ITEMS = [
  { q: 'Does it cost money to submit?', a: 'No, submissions are completely free.' },
  { q: 'Can I submit multiple pieces?', a: 'Yes, but each genre has its specific limits. Check the specific guidelines for more details.' },
  { q: 'Am I eligible to submit?', a: 'Any teen ages 14-19 or in high school can submit.' },
  { q: 'How do I submit?', a: 'Read through the guidelines tab, then go to the submissions tab and fill the form.' },
  { q: 'Do you accept international submissions?', a: "Yes, from any nation. We're an international youth literary magazine, we seek to grow worldwide. (Check out the International Representative Position in the Join Us tab.)" },
  { q: 'Do you accept non-English submissions?', a: 'As of now, we do not accept fully non-English submissions, but this may change in the future. Having non-English characters or phrases to a limited extent in a majority English submission is fine, as long as you explain and provide a translation on the submission form.' },
  { q: 'What are the word counts and limits?', a: 'Check the guidelines tab.' },
  { q: 'How should I format my submission / document?', a: 'Check the guidelines tab.' },
  { q: 'Do you accept simultaneous submissions?', a: 'For the first issue, no. Starting from the second issue, yes. (Make sure to immediately contact us if your submission is accepted elsewhere so we can withdraw your submission. Contact info can be found in the contact tab.)' },
  { q: 'How will each issue be published?', a: 'Online, on this website, in the Issues tab.' },
  { q: 'Who owns the rights to my work after publication?', a: 'You do! You retain 100% ownership of your work. We only ask for First Serial Rights, meaning we get to be the first to publish your work. After it appears in our issue, all rights revert back to you immediately. You are free to republish, re-share, or include your work in a future collection whenever you like.' },
  { q: 'Do I need parental or guardian permission to submit?', a: 'Yes, if you are under 18.' },
  { q: 'Can I use a pen name?', a: 'Yes, but please enter your real full name into the submission form, and request a pen name to be used for if your work is selected.' },
  { q: 'When will I hear back about my submission?', a: 'Response time varies, but generally ranges from a week or two to a month.' },
  { q: 'Will I receive feedback?', a: 'Yes, no matter if your piece is selected to be published or not, you will receive detailed, specific, and in-depth feedback from one of our editors.' },
  { q: 'How often do issues come out?', a: 'Issues come out every two months, except the first issue (1 month) and certain times of the year, e.g. holidays, AP & IB & Finals testing.' },
  { q: 'What will communication primarily be through?', a: 'Public announcements will be posted on this website and our official instagram account, but communication typically will be through email.' },
  { q: 'Can I submit to multiple genres / sections?', a: 'Yes; you can technically submit 20 or even more pieces total across the genres and sections. However, you may only fill one submission form per genre / section each issue.' },
];

// Genres used by Selected Works (section subheadings)
const SELECTED_WORKS_GENRES = ['Poetry', 'Fiction', 'Nonfiction', 'Art', 'Photography'];

// Tabs that can be restored from the URL hash on reload
const VALID_TABS = new Set([
  'home',
  'about-litmag',
  'about-mission',
  'about-staff',
  'staff-detail',
  'announcements',
  'about-stats',
  'selected-works',
  'selected-works-issue',
  'selected-works-piece',
  'digital-magazine',
  'issues-archive',
  'issue-detail',
  'submit-guidelines',
  'submit-links',
  'faq',
  'contact',
  'join',
  'admin',
]);

// Sub-views that need in-memory state to render — a reload lands on their parent tab
const TAB_PARENT = {
  'staff-detail': 'about-staff',
  'selected-works-issue': 'selected-works',
  'selected-works-piece': 'selected-works',
  'issue-detail': 'issues-archive',
};

// Parse `#/tab` or `#/tab/id` from the URL
function getHashRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  const [tab, id] = raw.split('/');
  return { tab, id: id || null };
}

function getTabFromHash() {
  const { tab, id } = getHashRoute();
  if (!VALID_TABS.has(tab)) return 'home';
  // Selected-works sub-views carry their object id in the URL and are restored
  // by an effect once the content loads, so keep the tab when an id is present.
  if (id && (tab === 'selected-works-issue' || tab === 'selected-works-piece')) return tab;
  return TAB_PARENT[tab] || tab;
}

const PAGE_TITLES = {
  home: 'Home',
  'about-litmag': 'About the Lit Mag',
  'about-mission': 'Our Mission',
  'about-staff': 'Staff / Team',
  announcements: 'Announcements',
  'about-stats': 'Stats',
  'selected-works': 'Selected Works',
  'digital-magazine': 'Digital Magazine',
  'issues-archive': 'Issues Archive',
  'submit-guidelines': 'Submit: Guidelines',
  'submit-links': 'Submit: Submissions Links',
  faq: 'FAQ',
  contact: 'Contact Us',
  join: 'Join Us',
  admin: 'Admin',
};

// "August 3rd" style date for announcements (D1 stores timestamps in UTC)
function formatAnnouncementDate(dateStr) {
  const d = new Date(String(dateStr).replace(' ', 'T') + 'Z');
  if (Number.isNaN(d.getTime())) return '';
  const day = d.getUTCDate();
  const suffix = day % 10 === 1 && day % 100 !== 11 ? 'st'
    : day % 10 === 2 && day % 100 !== 12 ? 'nd'
    : day % 10 === 3 && day % 100 !== 13 ? 'rd' : 'th';
  const month = d.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
  return `${month} ${day}${suffix}`;
}

const TINYMCE_INIT = {
  height: 400,
  menubar: false,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
  ],
  toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style: 'body { font-family:Lora,Georgia,serif; font-size:16px }',
};

const PIECE_FONT_MAP = {
  times: "'Times New Roman', Times, serif",
  georgia: "Georgia, 'Times New Roman', serif",
};

const PIECE_FONTS = [
  { value: 'times', label: 'Times New Roman' },
  { value: 'georgia', label: 'Georgia' },
];

function makePieceTinyMCEInit(font) {
  const fontFamily = PIECE_FONT_MAP[font] || PIECE_FONT_MAP.times;
  return {
    height: 520,
    menubar: false,
    branding: false,
    resize: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
      'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'table', 'help', 'wordcount', 'paste', 'lineheight'
    ],
    toolbar: 'undo redo | fontfamily fontsize | ' +
      'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | ' +
      'outdent indent | bullist numlist | lineheight | removeformat | help',
    font_family_formats:
      "Times New Roman='Times New Roman';" +
      "Georgia='Georgia'",
    line_height_formats: '1 1.15 1.5 2',
    content_style: `body { font-family: ${fontFamily}; font-size: 12pt; margin: 72px 80px; color: #000; }`,
    paste_as_text: false,
    paste_data_images: false,
    paste_strip_class_names: '',
    paste_merge_formats: true,
    paste_retain_style: 'all',
    formats: {
      underline: { inline: 'u', styles: {} },
      block_indent: { selector: 'p', styles: { paddingLeft: '%value' } },
      block_dedent: { selector: 'p', styles: { paddingLeft: '0' } },
    },
    indent_use_margin: false,
    paste_preprocess: function (plugin, args) {
      let html = args.content;
      html = html.replace(/<p([^>]*?)style="([^"]*?)margin-left\s*:\s*([\d.]+(?:pt|px|em))([^"]*)"([^>]*?)>([\s\S]*?)<\/p>/gi,
        (match, before, stylesPre, value, stylesPost, after, content) => {
          const newStyle = (stylesPre + 'padding-left:' + value + ';' + stylesPost).replace(/;\s*;/g, ';');
          return `<p${before}style="${newStyle}" data-mce-style="${newStyle}"${after}>${content}</p>`;
        }
      );
      html = html.replace(/<div([^>]*?)style="([^"]*?)margin-left\s*:\s*([\d.]+(?:pt|px|em))([^"]*)"([^>]*?)>([\s\S]*?)<\/div>/gi,
        (match, before, stylesPre, value, stylesPost, after, content) => {
          const newStyle = (stylesPre + 'padding-left:' + value + ';' + stylesPost).replace(/;\s*;/g, ';');
          return `<div${before}style="${newStyle}" data-mce-style="${newStyle}"${after}>${content}</div>`;
        }
      );
      html = html.replace(/<li([^>]*?)style="([^"]*?)margin-left\s*:\s*([\d.]+(?:pt|px|em))([^"]*)"([^>]*?)>([\s\S]*?)<\/li>/gi,
        (match, before, stylesPre, value, stylesPost, after, content) => {
          const newStyle = (stylesPre + 'padding-left:' + value + ';' + stylesPost).replace(/;\s*;/g, ';');
          return `<li${before}style="${newStyle}" data-mce-style="${newStyle}"${after}>${content}</li>`;
        }
      );
      args.content = html;
    },
    paste_postprocess: function (plugin, args) {
      const node = args.node;
      if (!node || !node.querySelectorAll) return;
      const all = node.querySelectorAll('p, div, li');
      all.forEach((el) => {
        const ml = el.style.marginLeft;
        if (ml && ml !== '0') {
          el.style.paddingLeft = ml;
          el.style.marginLeft = '0';
          el.setAttribute('data-mce-style', el.getAttribute('data-mce-style') ? el.getAttribute('data-mce-style').replace(/margin-left[^;]*/g, '').replace(/;\s*;/g, ';').trim() + ';padding-left:' + ml : 'padding-left:' + ml);
        }
      });
    },
    setup: function (editor) {
      editor.on('paste', function (e) {
        setTimeout(() => {
          const body = editor.getBody();
          if (!body) return;
          const paragraphs = body.querySelectorAll('p, div, li');
          paragraphs.forEach((p) => {
            const text = p.textContent;
            if (text && text.includes('\t')) {
              p.textContent = text.replace(/\t/g, '\u2003\u2003');
            }
            const ds = p.getAttribute('data-mce-style') || '';
            const plMatch = ds.match(/padding-left\s*:\s*([\d.]+(?:pt|px|em))/i);
            if (plMatch && (!p.style.paddingLeft || p.style.paddingLeft === '0')) {
              p.style.paddingLeft = plMatch[1];
            }
          });
          const walk = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null);
          let node;
          while ((node = walk.nextNode())) {
            const text = node.textContent;
            if (text && text.includes('\t')) {
              node.textContent = text.replace(/\t/g, '\u2003\u2003');
            }
          }
        }, 0);
      });
    },
  };
}

function GuidelinesSection({ title, isOpen, onToggle, children }) {
  return (
    <div style={{ border: '1px solid var(--accent-border)', borderRadius: '4px', marginBottom: '15px', overflow: 'hidden' }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '15px 20px',
          backgroundColor: isOpen ? 'var(--accent-bg)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-heading)',
          fontSize: '1.15rem',
          color: 'var(--text-main)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div style={{ padding: '0 20px 20px 20px', fontSize: '0.95rem' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromHash);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openGuidelines, setOpenGuidelines] = useState('general');
  const [selectedWorksIssue, setSelectedWorksIssue] = useState(null);
  const [selectedWorksPiece, setSelectedWorksPiece] = useState(null);

  const toggleGuidelines = (section) => {
    setOpenGuidelines((prev) => (prev === section ? null : section));
  };

  // Subscription Form State
  const [subName, setSubName] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [subCountry, setSubCountry] = useState('');
  const [subCaptchaToken, setSubCaptchaToken] = useState('');
  const [subActionType, setSubActionType] = useState('subscribe');

  // Admin Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Editor States
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueHtml, setNewIssueHtml] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState('');

  // Admin edit existing issue
  const [adminMode, setAdminMode] = useState('publish');
  const [showIssueManager, setShowIssueManager] = useState(false);
  const [editingIssueId, setEditingIssueId] = useState('');
  const [editIssueTitle, setEditIssueTitle] = useState('');
  const [editIssueHtml, setEditIssueHtml] = useState('');

  // Digital magazine edition admin state
  const [digitalEditions, setDigitalEditions] = useState([]);
  const [adminDigitalMode, setAdminDigitalMode] = useState('add');
  const [digitalTitle, setDigitalTitle] = useState('');
  const [digitalUrl, setDigitalUrl] = useState('');
  const [editDigitalId, setEditDigitalId] = useState('');
  const [editDigitalTitle, setEditDigitalTitle] = useState('');
  const [editDigitalUrl, setEditDigitalUrl] = useState('');

  // Announcements admin state
  const [adminAnnouncementMode, setAdminAnnouncementMode] = useState('add');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [editAnnouncementId, setEditAnnouncementId] = useState('');
  const [editAnnouncementMessage, setEditAnnouncementMessage] = useState('');

  // Selected works state (fetched from /api/content)
  const [selectedWorks, setSelectedWorks] = useState([]);

  // Selected works admin state
  const [adminSWMode, setAdminSWMode] = useState('add-issue');
  const [swIssueTitle, setSwIssueTitle] = useState('');
  const [editSWIssueId, setEditSWIssueId] = useState('');
  const [editSWIssueTitle, setEditSWIssueTitle] = useState('');
  const [swPieceIssueId, setSwPieceIssueId] = useState('');
  const [swPieceTitle, setSwPieceTitle] = useState('');
  const [swPieceAuthor, setSwPieceAuthor] = useState('');
  const [swPieceGenre, setSwPieceGenre] = useState('Poetry');
  const [swPieceContent, setSwPieceContent] = useState('');
  const [swPieceBio, setSwPieceBio] = useState('');
  const [swPieceFont, setSwPieceFont] = useState('times');
  const [editSWPieceId, setEditSWPieceId] = useState('');
  const [editSWPieceIssueId, setEditSWPieceIssueId] = useState('');
  const [editSWPieceTitle, setEditSWPieceTitle] = useState('');
  const [editSWPieceAuthor, setEditSWPieceAuthor] = useState('');
  const [editSWPieceGenre, setEditSWPieceGenre] = useState('Poetry');
  const [editSWPieceContent, setEditSWPieceContent] = useState('');
  const [editSWPieceBio, setEditSWPieceBio] = useState('');
  const [editSWPieceFont, setEditSWPieceFont] = useState('times');

  const scrollToForm = (id) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.transition = 'box-shadow 0.3s';
        el.style.boxShadow = '0 0 0 3px rgba(51, 122, 183, 0.5)';
        setTimeout(() => { el.style.boxShadow = ''; }, 1200);
      }
    }, 60);
  };

  const apiPost = async (url, body) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      let data = {};
      try { data = await res.json(); } catch { data = {}; }
      return { ok: res.ok, data };
    } catch (err) {
      return { ok: false, data: { error: err.message } };
    }
  };

  // --- New State for Dynamic Content ---
  const [currentIssue, setCurrentIssue] = useState(null);
  const [pastIssues, setPastIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null); // <-- Add this new line!
  const [announcements, setAnnouncements] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  // Restore a selected-works sub-view (issue or piece) from its URL id
  const restoreRoute = (works) => {
    const { tab, id } = getHashRoute();
    if (tab === 'selected-works-issue' && id) {
      const issue = works.find((i) => String(i.id) === id);
      if (issue) {
        setSelectedWorksIssue(issue);
        setActiveTab('selected-works-issue');
      } else {
        setActiveTab('selected-works');
      }
      return true;
    }
    if (tab === 'selected-works-piece' && id) {
      const issue = works.find((i) => i.pieces.some((p) => String(p.id) === id));
      if (issue) {
        const piece = issue.pieces.find((p) => String(p.id) === id);
        setSelectedWorksIssue(issue);
        setSelectedWorksPiece(piece);
        setActiveTab('selected-works-piece');
      } else {
        setActiveTab('selected-works');
      }
      return true;
    }
    return false;
  };

  async function refreshSiteContent() {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
        if (data.success) {
          setCurrentIssue(data.currentIssue);
          setPastIssues(data.pastIssues || []);
          setDigitalEditions(data.digitalEditions || []);
          setSelectedWorks(data.selectedWorks || []);
          setAnnouncements(data.announcements || []);
          restoreRoute(data.selectedWorks || []);
        }
      return data;
    } catch (err) {
      console.error('Failed to fetch site content:', err);
      return null;
    }
  }

  // Fetch content on page load
  useEffect(() => {
    async function loadContent() {
      await refreshSiteContent();
      setIsContentLoading(false);
    }
    loadContent();
  }, []);

  // Keep the URL hash in sync with the active tab so reloads stay on the same
  // page and the browser back/forward buttons move between tabs within the site.
  const skipHashSyncRef = useRef(true);
  useEffect(() => {
    if (skipHashSyncRef.current) {
      skipHashSyncRef.current = false;
      return;
    }
    let target;
    if (activeTab === 'selected-works-issue' || activeTab === 'selected-works-piece') {
      // Preserve the object id already in the URL until the sub-view is restored
      const currentId =
        (activeTab === 'selected-works-piece' ? selectedWorksPiece?.id : selectedWorksIssue?.id) ||
        getHashRoute().id;
      target = `#/${activeTab}${currentId ? `/${currentId}` : ''}`;
    } else {
      target = `#/${activeTab}`;
    }
    // Already on this route (initial restore / back-forward): don't add a duplicate entry.
    if (getHashRoute().tab === activeTab) return;
    window.history.pushState(null, '', target);
  }, [activeTab, selectedWorksIssue, selectedWorksPiece]);

  // Keep the browser tab title in sync with the active page
  useEffect(() => {
    let page;
    if (activeTab === 'staff-detail') {
      page = selectedStaff ? selectedStaff.name : PAGE_TITLES['about-staff'];
    } else if (activeTab === 'selected-works-issue' || activeTab === 'selected-works-piece') {
      page = selectedWorksIssue || selectedWorksPiece ? (selectedWorksPiece || selectedWorksIssue).title : PAGE_TITLES['selected-works'];
    } else if (activeTab === 'issue-detail') {
      page = selectedIssue ? selectedIssue.title : PAGE_TITLES['issues-archive'];
    } else {
      page = PAGE_TITLES[activeTab] || PAGE_TITLES.home;
    }
    document.title = `The Hilltop Horizon Review | ${page}`;
  }, [activeTab, selectedStaff, selectedWorksIssue, selectedWorksPiece, selectedIssue]);

  // Scroll back to the top whenever the tab changes, so you don't land mid-page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // React to manual hash edits / back-forward navigation
  useEffect(() => {
    const onHashChange = () => {
      if (!restoreRoute(selectedWorks)) setActiveTab(getTabFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [selectedWorks]);

  // Collapse the nav into the hamburger menu only on mobile widths
  const handleParentNavClick = (group, fallbackTab) => (e) => {
    if (window.matchMedia('(max-width: 880px)').matches) {
      e.stopPropagation();
      setOpenMobileDropdown((prev) => (prev === group ? null : group));
    } else {
      setActiveTab(fallbackTab);
    }
  };

  const allIssuesForAdmin = [
    ...(currentIssue ? [{ ...currentIssue, isCurrent: true }] : []),
    ...(pastIssues || []).map((issue) => ({ ...issue, isCurrent: false })),
  ];

  function handleSelectIssueToEdit(issueId) {
    const issue = allIssuesForAdmin.find((i) => i.id === issueId);
    if (!issue) return;
    setEditingIssueId(issue.id);
    setEditIssueTitle(issue.title);
    setEditIssueHtml(issue.content_html);
  }

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    setActiveTab('staff-detail');
  };

  const isNavActive = (group) => {
    const groups = {
      home: ['home'],
      about: ['about-litmag', 'about-mission', 'about-staff', 'staff-detail', 'announcements', 'about-stats'],
      issues: ['selected-works', 'selected-works-issue', 'selected-works-piece', 'digital-magazine', 'issues-archive'],
      submit: ['submit-guidelines', 'submit-links'],
      faq: ['faq'],
      contact: ['contact'],
      join: ['join'],
    };
    return groups[group].includes(activeTab);
  };

  const handleTextareaTab = (value, setValue) => (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const el = e.currentTarget;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    setValue(value.slice(0, start) + '\t' + value.slice(end));
    setTimeout(() => {
      el.selectionStart = el.selectionEnd = start + 1;
    }, 0);
  };

  return (
    <div className="app">
      {/* Navigation Bar (top banner) */}
      <nav className="nav-bar">
        <a href="#" className="nav-logo" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} title="The Hilltop Horizon Review">
          <img src="https://raw.githubusercontent.com/GavL28/the-hilltop-horizon-review/main/public/THHR.logo (1).png" alt="Logo" />
          <span className="nav-brand">The Hilltop Horizon Review</span>
        </a>
        <button
          className="nav-toggle"
          onClick={() => { setMobileMenuOpen(!mobileMenuOpen); if (mobileMenuOpen) setOpenMobileDropdown(null); }}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </button>
        <ul
          className={mobileMenuOpen ? 'nav-list nav-list-open' : 'nav-list'}
          onClick={() => { setMobileMenuOpen(false); setOpenMobileDropdown(null); }}
        >
          <li className="nav-item">
            <button className={isNavActive('home') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('home')}>Home</button>
          </li>
          <li className={openMobileDropdown === 'about' ? 'nav-item dropdown-open' : 'nav-item'}>
            <button className={isNavActive('about') ? 'nav-link active' : 'nav-link'} onClick={handleParentNavClick('about', 'about-litmag')}>About ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-litmag')}>About the Lit Mag</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-mission')}>Our Mission</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-staff')}>Staff / Team</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('announcements')}>Announcements</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-stats')}>Stats</button></li>
            </ul>
          </li>
          <li className={openMobileDropdown === 'issues' ? 'nav-item dropdown-open' : 'nav-item'}>
            <button className={isNavActive('issues') ? 'nav-link active' : 'nav-link'} onClick={handleParentNavClick('issues', 'selected-works')}>Issues / Selected Works ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('selected-works')}>Selected Works</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('digital-magazine')}>Digital Magazine</button></li>
            </ul>
          </li>
          <li className={openMobileDropdown === 'submit' ? 'nav-item dropdown-open' : 'nav-item'}>
            <button className={isNavActive('submit') ? 'nav-link active' : 'nav-link'} onClick={handleParentNavClick('submit', 'submit-guidelines')}>Submit ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('submit-guidelines')}>Guidelines</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('submit-links')}>Submissions Links</button></li>
            </ul>
          </li>
          <li className="nav-item">
            <button className={isNavActive('faq') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('faq')}>FAQ</button>
          </li>
          <li className="nav-item">
            <button className={isNavActive('contact') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('contact')}>Contact Us</button>
          </li>
          <li className="nav-item">
            <button className={isNavActive('join') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('join')}>Join Us</button>
          </li>
        </ul>
      </nav>

      {/* Header & Logo (home page only) */}
      {activeTab === 'home' && (
        <header className="site-header">
          <div className="container">
            <a href="#" className="logo-container" onClick={() => setActiveTab('home')}>
              <img src="https://raw.githubusercontent.com/GavL28/the-hilltop-horizon-review/main/public/THHR.logo (1).png" alt="Logo" />
            </a>
            <div className="site-title">The Hilltop Horizon Review</div>
            <div className="site-subtitle">an international youth literary magazine</div>
          </div>
        </header>
      )}

      {/* Home: hero (above the main content) */}
      {activeTab === 'home' && (
        <section className="container" style={{ paddingTop: '15px' }}>
          <div className="hero-banner">
            <img src="/IMG_6051.jpeg" alt="The Hilltop Horizon Review" className="hero-image" />
            <p className="hero-description">
              We are an international youth literary magazine, run by high schoolers, for high schoolers.
            </p>
          </div>
        </section>
      )}

      {/* Editors' Desk (full-width white section) */}
      {activeTab === 'home' && (
        <section className="editors-desk">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="section-title">From the Co-Editors in Chiefs' Desk</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '20px' }}>
              Welcome to the digital home of The Hilltop Horizon Review! Run by a team of devoted and eager young writers, we seek to build a world-wide community for young writers to chase their dreams.
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
              —{' '}
              <button className="link-button" onClick={() => setActiveTab('about-staff')}>
                Gavin, Co-Editor in Chief
              </button>
            </p>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main className="main-content container">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>

            {/* Announcements (from DB, newest 3 shown on home) */}
            <div className="announcement-banner" style={{ maxWidth: '1000px', margin: '0 auto 40px auto' }}>
              <button className="announcement-heading" onClick={() => setActiveTab('announcements')}>
                <span className="loud-speaker">📢</span> Announcements
              </button>
              {isContentLoading && (
                <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>Loading announcements...</p>
              )}
              {!isContentLoading && announcements.length === 0 && (
                <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>No announcements yet. Check back soon!</p>
              )}
              {announcements.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {announcements.slice(0, 3).map((a) => (
                    <div key={a.id}>
                      <div className="announcement-message">{a.message}</div>
                      <div className="announcement-date">{formatAnnouncementDate(a.created_at)}</div>
                    </div>
                  ))}
                </div>
              )}
              <button className="announcement-view-all" onClick={() => setActiveTab('announcements')}>
                (click to view all announcements)
              </button>
            </div>
            
            <h2 className="section-title">Featured Piece</h2>
            <div className="featured-poem">
              <h3 className="poem-title">Editor's Choice</h3>
              <p className="poem-body">To be determined...</p>
            </div>
          </div>
        )}

        {/* ABOUT SUBTABS */}
        {activeTab === 'about-litmag' && (
          <div className="content-box">
            <h2 className="section-title">About The Hilltop Horizon Review</h2>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '8px' }}>The Hilltop Horizon Review</h3>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>An international youth literary magazine, founded by high schoolers, for high schoolers.</p>
            <div className="about-split">
              <div className="about-text">
                <p>
                  <strong>
                    Founded by{' '}
                    <button className="link-button" onClick={() => handleStaffClick(staffData.find((s) => s.id === 'gavin'))}>Gavin Liu</button>
                    {' '}and{' '}
                    <button className="link-button" onClick={() => handleStaffClick(staffData.find((s) => s.id === 'tawanda'))}>Tawanda Sibanda</button>
                    {' '}on July 8th, 2026.
                  </strong>
                </p>
                <p>We are a team of 13 Reynolds Young Writers Workshop Class of 2026 alumni from all over the world, including the U.S., China, Japan, and South Korea.</p>
                <p>We accept submissions from high schoolers (ages 14-19).</p>
                <p>We publish a new issue every two months.</p>
                <p>If your submission(s) is selected to be published, you will be notified and your work and bio will be added to the issue. Each piece you submit will be carefully reviewed by our wonderful editors, who will provide editing, and detailed, specific, and in-depth feedback.</p>
                <p>Communication will be by email.</p>
                <p style={{ marginTop: '20px', fontWeight: 600 }}>
                  Find out more about our team{' '}
                  <button
                    className="link-button"
                    onClick={() => setActiveTab('about-staff')}
                    style={{ color: '#064e3b', fontWeight: 700 }}
                  >
                    here
                  </button>
                  .
                </p>
              </div>
              <div className="about-image">
                <img src="/IMG_5975.jpeg" alt="The Hilltop Horizon Review team" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about-mission' && (
          <div className="content-box">
            <h2 className="section-title">Our Mission</h2>
            <p>We seek to provide a welcoming and interactive community for young writers to join, as it can be difficult to find such a community locally.</p>
            <p>Though we are mainly a literary magazine, we also accept art and photography. Submissions are reviewed blindly. We believe that feedback to every single submission no matter published or not is essential to supporting young writers and artists. If you don't get selected for an issue, come back and submit to the next issue!</p>
          </div>
        )}

        {/* STAFF DIRECTORY GRID */}
        {activeTab === 'about-staff' && (
          <div>
            <h2 className="section-title">Editorial Board</h2>
            <p style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--text-muted)' }}>
              Our masthead consists of 13 dedicated high school editors worldwide. Click any profile to learn more.
            </p>
            
            <div className="staff-grid">
              {staffData.map((staff) => (
                <div key={staff.id} className="staff-card" onClick={() => handleStaffClick(staff)}>
                  {staff.photo ? (
                    <img src={staff.photo} alt={staff.name} className="staff-photo-placeholder" style={{ objectFit: 'cover', border: 'none' }} />
                  ) : (
                    <div className="staff-photo-placeholder"></div>
                  )}
                  <h3 className="staff-name">{staff.name}</h3>
                  <p className="staff-meta">{staff.pronouns} • {staff.grade}</p>
                  <p className="staff-role">{staff.role}</p>
                  <p className="staff-short-bio">"{staff.shortBio}"</p>
                  <span className="staff-read-more">View Profile →</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INDIVIDUAL STAFF PROFILE VIEW */}
        {activeTab === 'staff-detail' && selectedStaff && (
          <div className="content-box">
            <button className="btn-back" onClick={() => setActiveTab('about-staff')}>
              ← Back to Staff Directory
            </button>
            
            <div className="staff-detail-header">
              {selectedStaff.photo ? (
                <img src={selectedStaff.photo} alt={selectedStaff.name} className="staff-photo-large" style={{ objectFit: 'cover', border: 'none' }} />
              ) : (
                <div className="staff-photo-large"></div>
              )}
              <div>
                <h2>{selectedStaff.name}</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '15px' }}>
                  {selectedStaff.pronouns} • {selectedStaff.grade}
                </p>
                <h4 style={{ whiteSpace: 'pre-line' }}>{selectedStaff.role}</h4>
              </div>
            </div>

            <div className="staff-bio-full">
              <p>{selectedStaff.fullBio}</p>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeTab === 'announcements' && (
          <div className="content-box fade-in">
            <h2 className="section-title" style={{ fontSize: '2.6rem' }}>Announcements</h2>

            {isContentLoading && <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>Loading announcements...</p>}

            {!isContentLoading && announcements.length === 0 && (
              <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>No announcements yet. Check back soon!</p>
            )}

            {!isContentLoading && announcements.length > 0 && (
              <div>
                {announcements.map((a, i) => (
                  <div
                    key={a.id}
                    style={{
                      marginBottom: '20px',
                      padding: i === 0 ? '28px' : '20px',
                      backgroundColor: 'var(--accent-bg)',
                      borderRadius: '4px',
                      borderLeft: i === 0 ? '4px solid var(--accent)' : 'none',
                    }}
                  >
                    <div
                      className="issue-content"
                      style={{
                        lineHeight: '1.7',
                        fontSize: i === 0 ? '1.5rem' : '1.25rem',
                        fontWeight: i === 0 ? 700 : 600,
                      }}
                    >
                      {a.message}
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'block', marginTop: '12px' }}>
                      {formatAnnouncementDate(a.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === 'about-stats' && (
          <div className="content-box fade-in">
            <h2 className="section-title">Stats</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', marginTop: '30px' }}>
              <div style={{ padding: '30px 45px', backgroundColor: 'var(--accent-bg)', borderRadius: '8px', textAlign: 'center', minWidth: '240px' }}>
                <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>—</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '20px', color: 'var(--text-main)' }}>Submissions Received</div>
              </div>
              <div style={{ padding: '30px 45px', backgroundColor: 'var(--accent-bg)', borderRadius: '8px', textAlign: 'center', minWidth: '240px' }}>
                <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>4</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '20px', color: 'var(--text-main)' }}>Nations Reached</div>
              </div>
            </div>
          </div>
        )}

        {/* 3. PAST ISSUE READER (Viewing a specific clicked issue) */}
        {activeTab === 'issue-detail' && selectedIssue && (
          <div className="content-box fade-in">
            <button 
              className="btn-back" 
              onClick={() => setActiveTab('issues-archive')}
              style={{ marginBottom: '20px', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontStyle: 'italic' }}
            >
              ← Back to Archive
            </button>
            
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', borderBottom: '1px solid var(--accent-border)', paddingBottom: '10px' }}>
              {selectedIssue.title}
            </h3>
            
            <div 
              className="issue-content"
              dangerouslySetInnerHTML={{ __html: selectedIssue.content_html }} 
              style={{ lineHeight: '1.8' }}
            />
          </div>
        )}

        {/* 4. SELECTED WORKS (List of issues) */}
        {activeTab === 'selected-works' && (
          <div className="content-box fade-in">
            <h2 className="section-title">Selected Works</h2>
            <p style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--text-muted)' }}>
              Browse the pieces selected for publication, organized by issue. Click an issue to view its selected works.
            </p>
            {selectedWorks.length === 0 && (
              <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>No issues available yet.</p>
            )}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {selectedWorks.map((issue) => (
                <li
                  key={issue.id}
                  onClick={() => {
                    setSelectedWorksIssue(issue);
                    setActiveTab('selected-works-issue');
                  }}
                  style={{
                    marginBottom: '15px',
                    padding: '15px',
                    backgroundColor: 'var(--accent-bg)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.border = '1px solid var(--text-main)'}
                  onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
                >
                  <strong style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{issue.title}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginTop: '5px' }}>
                    {issue.pieces.length} piece{issue.pieces.length === 1 ? '' : 's'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. SELECTED WORKS — ISSUE (List of pieces with authors) */}
        {activeTab === 'selected-works-issue' && selectedWorksIssue && (
          <div className="content-box fade-in">
            <button
              className="btn-back"
              onClick={() => setActiveTab('selected-works')}
              style={{ marginBottom: '20px', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontStyle: 'italic' }}
            >
              ← Back to Selected Works
            </button>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', borderBottom: '1px solid var(--accent-border)', paddingBottom: '10px' }}>
              {selectedWorksIssue.title} — Selected Works
            </h3>
            {SELECTED_WORKS_GENRES.map((genre) => {
              const genrePieces = selectedWorksIssue.pieces.filter((p) => p.genre === genre);
              return (
                <div key={genre} style={{ marginBottom: '25px' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', borderBottom: '1px solid var(--accent-border)', paddingBottom: '5px', marginBottom: '12px' }}>
                    {genre}
                  </h4>
                  {genrePieces.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>No pieces yet.</p>
                  ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {genrePieces.map((piece) => (
                        <li
                          key={piece.id}
                          onClick={() => {
                            setSelectedWorksPiece(piece);
                            setActiveTab('selected-works-piece');
                          }}
                          style={{
                            marginBottom: '8px',
                            padding: '6px 0',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                        >
                          <strong style={{ color: 'var(--text-main)' }}>{piece.title}</strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginTop: '4px' }}>
                            by {piece.author}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 6. SELECTED WORKS — PIECE (Viewing a specific piece) */}
        {activeTab === 'selected-works-piece' && selectedWorksPiece && (
          <div className="content-box fade-in">
            <button
              className="btn-back"
              onClick={() => setActiveTab('selected-works-issue')}
              style={{ marginBottom: '20px', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontStyle: 'italic' }}
            >
              ← Back to {selectedWorksIssue ? selectedWorksIssue.title : 'Selected Works'}
            </button>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{selectedWorksPiece.title}</h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid var(--accent-border)',
                paddingBottom: '10px',
                marginBottom: '20px',
              }}
            >
              <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{selectedWorksPiece.author}</span>
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{selectedWorksPiece.genre}</span>
            </div>
            <div className={`piece-font-${selectedWorksPiece.piece_font || 'times'}`} style={{ textAlign: 'left' }}>
              {selectedWorksPiece.content && selectedWorksPiece.content.trim().startsWith('<') ? (
                <div dangerouslySetInnerHTML={{ __html: selectedWorksPiece.content }} />
              ) : (
                <div style={{ whiteSpace: 'pre-wrap' }}>{selectedWorksPiece.content}</div>
              )}
            </div>
            {selectedWorksPiece.bio && (
              <div style={{ marginTop: '40px' }}>
                <hr style={{ border: 'none', borderTop: '1px solid var(--accent-border)', marginBottom: '20px' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-main)' }}>
                  {selectedWorksPiece.author}
                </h4>
                <p style={{ fontSize: '1rem', fontWeight: 400, lineHeight: '1.75', color: 'var(--text-main)' }}>
                  {selectedWorksPiece.bio}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 7. DIGITAL MAGAZINE (External edition links) */}
        {activeTab === 'digital-magazine' && (
          <div className="content-box fade-in" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Digital Magazine</h2>
            <p style={{ marginBottom: '30px', color: 'var(--text-muted)' }}>
              Read each issue in our interactive digital magazine edition.
            </p>
            {digitalEditions.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No digital editions available yet. Check back soon!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                {digitalEditions.map((edition) => (
                  <a
                    key={edition.id}
                    href={edition.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-block', fontSize: '1.1rem', padding: '15px 30px' }}
                  >
                    {edition.title} →
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBMIT SUBTABS */}
        {activeTab === 'submit-guidelines' && (
          <div className="content-box">
            <h2 className="section-title">Submission Guidelines</h2>
            <p style={{ marginBottom: '20px' }}>
              Thank you for taking the time to submit to our literary magazine! Please review the information below before making your submission. Good luck!
            </p>

            <GuidelinesSection title="General Guidelines" isOpen={openGuidelines === 'general'} onToggle={() => toggleGuidelines('general')}>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Applies to any/all submissions:</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px', marginBottom: '8px' }}>Original & Unpublished Work Only</h4>
              <p>Submit original, previously unpublished work only. Posting on your own social media, blog, or website (or performing at an open mic) is fine, but work that has appeared in another literary magazine, journal, or zine is not eligible.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Simultaneous Submissions</h4>
              <p>Simultaneous submissions are not allowed.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>One Document Per Section</h4>
              <p>Put all of your pieces for a section in one document, each with a clear title exactly as it should appear in print. (Check section specific guidelines for more details)</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Content Warnings</h4>
              <p>If your work engages sensitive material (violence, self-harm, sexual content, abuse, etc.), add a brief content warning at the top of the document. It won't affect acceptance.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>File Naming</h4>
              <p>For file names: <code style={{ backgroundColor: 'var(--accent-bg)', padding: '2px 5px', borderRadius: '3px' }}>first_last_title</code> e.g. <code style={{ backgroundColor: 'var(--accent-bg)', padding: '2px 5px', borderRadius: '3px' }}>John_Smith_Sunlight.filetype</code>. For the title, use any one of your submission(s)'s titles.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Guardian Consent</h4>
              <p>If you are under 18, make sure to have a guardian consent to your submitting to The Hilltop Horizon Review, and to consent to granting us the right to publish your work.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>No AI & No Plagiarism</h4>
              <p>NO AI AT ALL will be tolerated. No pieces generated, adjusted, revised, or anything affected by AI in any way will be tolerated. We will check every submission and submissions found to have used AI will be disqualified, and may or may not be given a SINGLE warning based on the severity of your AI usage. In addition, we do not tolerate plagiarism, and if you do quote something please properly cite it.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Read Everything Carefully</h4>
              <p>Read your section's specific guidelines carefully as well!</p>
              <p style={{ marginTop: '15px' }}>Questions? Email <a href="mailto:team@hilltophorizonreview.com" style={{ color: 'var(--text-main)' }}>team@hilltophorizonreview.com</a></p>
            </GuidelinesSection>

            <GuidelinesSection title="Poetry Guidelines" isOpen={openGuidelines === 'poetry'} onToggle={() => toggleGuidelines('poetry')}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '0', marginBottom: '8px' }}>Font Size</h4>
              <p>12 Point Font, with exceptions for stylistic choice.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Acceptable Fonts</h4>
              <p>Times New Roman ONLY.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Number and Length of Submission</h4>
              <p>A submission may include up to five (5) pages of poetry. Submitted poems may be any length, but each poem should begin at the top of a new page.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Spacing</h4>
              <p>Single spaced, with exceptions for stylistic choice.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>File Type</h4>
              <p>Word Document.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Other</h4>
              <p>While stylistic choices are accepted, it is preferred that poems are in the format suggested above.</p>
            </GuidelinesSection>

            <GuidelinesSection title="Fiction Guidelines" isOpen={openGuidelines === 'fiction'} onToggle={() => toggleGuidelines('fiction')}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '0', marginBottom: '8px' }}>Font Size</h4>
              <p>12 pt.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Acceptable Fonts</h4>
              <p>Times New Roman ONLY.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Number of Submissions Per Person</h4>
              <p>Multiple pieces can be submitted but they must add up to be under the word limit and must be submitted in the same form/document.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Length of Submission</h4>
              <p>5000 words.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Spacing</h4>
              <p>Double spaced.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>File Type</h4>
              <p>N/A.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Other</h4>
              <p>Please have a clear title on the piece for publication.</p>
            </GuidelinesSection>

            <GuidelinesSection title="Nonfiction Guidelines" isOpen={openGuidelines === 'nonfiction'} onToggle={() => toggleGuidelines('nonfiction')}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '0', marginBottom: '8px' }}>Font Size</h4>
              <p>12 pt font.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Acceptable Fonts</h4>
              <p>Times New Roman ONLY.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Number of Submissions Per Person</h4>
              <p>Unlimited, can submit multiple pieces as long as they fall within the word limit.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Length of Submission</h4>
              <p>3500 words maximum in total.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Spacing</h4>
              <p>Single-spaced.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>File Type</h4>
              <p>Google Docs (preferred), or PDF.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Other</h4>
              <p>Must include titles for each submitted piece. Profanity/explicit themes allowed. We are looking for works that are personal and introspective. Dual submissions are allowed.</p>
            </GuidelinesSection>

            <GuidelinesSection title="Art Guidelines" isOpen={openGuidelines === 'art'} onToggle={() => toggleGuidelines('art')}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '0', marginBottom: '8px' }}>Number of Submissions Per Person</h4>
              <p>No minimum; maximum of 5.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>File Type</h4>
              <p>JPEG, PNG.</p>
            </GuidelinesSection>

            <GuidelinesSection title="Photography Guidelines" isOpen={openGuidelines === 'photography'} onToggle={() => toggleGuidelines('photography')}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '0', marginBottom: '8px' }}>Number of Submissions Per Person</h4>
              <p>No minimum; maximum of 5.</p>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>File Type</h4>
              <p>JPEG, PNG, or RAW.</p>
            </GuidelinesSection>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <a href="#" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }} onClick={(e) => { e.preventDefault(); setActiveTab('submit-links'); }}>
                Go to Submission Links →
              </a>
            </div>
          </div>
        )}

        {activeTab === 'submit-links' && (
          <div className="content-box" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-title">Submissions Links</h2>
            <p style={{ marginBottom: '20px' }}>
              Ready to submit? Fill out our submission form below. Make sure to review our <a href="#" style={{ color: 'var(--text-main)' }} onClick={(e) => { e.preventDefault(); setActiveTab('submit-guidelines'); }}>guidelines</a> first!
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfT9l99n-TwHVNZySCyWboYuV-G8s6ydGyHLbYMhvTHOz_0oA/viewform?usp=sharing&ouid=115181364077200728162"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              Access Submission Form →
            </a>
          </div>
        )}

        {/* FAQ TAB */}
        {activeTab === 'faq' && (
          <div className="content-box">
            <h2 className="section-title">Frequently Asked Questions</h2>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="faq-item">
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="faq-answer">{item.a}</div>}
              </div>
            ))}

            <div style={{ marginTop: '45px', padding: '25px', backgroundColor: 'var(--accent-bg)', borderRadius: '4px', textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '10px' }}>Any other questions?</h4>
              <p style={{ marginBottom: '12px' }}>
                Feel free to reach out to us at{' '}
                <a href="mailto:team@hilltophorizonreview.com" style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>team@hilltophorizonreview.com</a>
                , or find more info on our contact page.
              </p>
              <button className="btn-primary" onClick={() => setActiveTab('contact')}>Contact Page</button>
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="content-box" style={{ maxWidth: '650px', margin: '0 auto' }}>
            <h2 className="section-title">Contact Us</h2>
            
            {/* Official Email & Social Media Placeholders */}
            <div style={{ textAlign: 'center', marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid var(--accent-border)' }}>
              <p style={{ marginBottom: '12px', fontSize: '1.05rem' }}>
                <strong>Official Email:</strong> <a href="team@hilltophorizonreview.com" style={{ color: 'var(--text-main)' }}>team@hilltophorizonreview.com</a>
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>Connect with us on social media:</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <a
                  href="https://www.instagram.com/hilltop_horizon_review/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                  Instagram
                </a>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginBottom: '25px', color: 'var(--text-muted)' }}>
              Subscribe to receive notifications when a new issue drops:
            </p>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!subCaptchaToken) {
                alert('Please complete the captcha verification.');
                return;
              }

              // Determine the correct endpoint based on which button was clicked
              const endpoint = subActionType === 'subscribe' ? '/api/subscribe' : '/api/unsubscribe';

              try {
                const response = await fetch(endpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  // Unsubscribe only strictly needs the email and token, but sending the whole payload is fine
                  body: JSON.stringify({ name: subName, email: subEmail, country: subCountry, token: subCaptchaToken }),
                });

                const data = await response.json();
                if (data.success) {
                  alert(subActionType === 'subscribe' ? 'Subscribed successfully!' : 'Unsubscribed successfully.');
                  setSubName('');
                  setSubEmail('');
                  setSubCountry('');
                } else {
                  alert('Error: ' + data.error);
                }
              } catch (err) {
                alert(`An error occurred while trying to ${subActionType}.`);
              }
            }}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={subName} 
                  onChange={(e) => setSubName(e.target.value)} 
                  required={subActionType === 'subscribe'} // Only required for subscribing
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={subEmail} 
                  onChange={(e) => setSubEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={subCountry} 
                  onChange={(e) => setSubCountry(e.target.value)} 
                  required={subActionType === 'subscribe'} // Only required for subscribing
                />
              </div>
              <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                <Turnstile 
                  siteKey="0x4AAAAAAEEsA5qQZtd99Uc8" 
                  onSuccess={(token) => setSubCaptchaToken(token)} 
                />
              </div>
              
              {/* Button Group */}
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '15px' }}>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  onClick={() => setSubActionType('subscribe')}
                >
                  Subscribe
                </button>
                <button 
                  type="submit" 
                  className="btn-secondary" 
                  onClick={() => setSubActionType('unsubscribe')}
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid var(--text-main)', 
                    color: 'var(--text-main)',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  Unsubscribe
                </button>
              </div>
            </form>

          </div>
        )}

        {/* JOIN US TAB */}
        {activeTab === 'join' && (
          <div className="content-box" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="section-title">Join Our Team</h2>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-muted)' }}>
              The Hilltop Horizon Review is entirely run by high schoolers. We look for passionate, dedicated individuals who want to help shape our global literary community. Open to teens ages 14–19. Link to apply coming soon...
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '40px' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Poetry Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: Two. Edits poetry submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Communicates and works together with fellow poetry editors to select a collection of poems to be published each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in poetry is a required minimum. Experience editing poetry is a definete plus. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Fiction Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: One. Edits fiction submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Communicates and works together with fellow fiction editors to select a collection of fiction pieces to be published each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in fiction is a required minimum. Experience editing fiction is a definete plus. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Nonfiction Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: One. Edits nonfiction submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Communicates and works together with fellow nonfiction editors to select a collection of nonfiction pieces to be published each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in nonfiction is a required minimum. Experience editing fiction is a definete plus. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Art Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: One. Reviews artwork submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Works to select pieces to be published in each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in art is a required minimum. Experience reviewing, judging, and providing feedback on artwork is a definete plus, as well as experience in a variety of mediums. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Photography Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: One. Reviews photography submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Works to select pieces to be published in each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in photography is a required minimum. Experience reviewing, judging, and providing feedback on photography is a definete plus. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Internal Operations Secretary</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: Zero. Manages internal team schedules, meeting notes, communication channels, announcments, and administrative workflows.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: strong organizational and calendar management skills, excellent communication for team announcements, and proficiency in tools like Slack, Google Workspace, and project management platforms. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>External Operations Secretary</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: Zero. Manages submissions, general tracking organization, external communication, public relations, and forms.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: strong organizational skills, excellent communication with members of the public -- primarily submitters, frequent availability to check and respond to inquiries and requests. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Website Administrator</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: Zero. Maintains web infrastructure and security, uploads new issues, adds new features, and ensures smooth site performance.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Basic coding knowledge is required. Experience and familiarity with IDEs, github, cloudflare, and especially experience with creating / acting as administrator for other websites is recommended. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Social Media Director</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: Zero. Runs social channels, designs promotional graphics, and engages with the online young writer community.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended Qualifications: Experience with handling social media accounts, art & design experience, experience with canva, photoshop, illustrator, etc. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>International Representatives</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: As many as possible (NOT U.S.A., China, Japan, or South Korea). Builds regional networks, handles promotion in region, and coordinates translation or regional features abroad.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended Qualifications: MUST be living in a nation that The Hilltop Horizon Review does NOT have an international representative in. Fluency in the nation's language. Experience with creating promotional materials. Does not necessarily require coming to meetings because of time zone differences.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Director of Policy and Standards</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Number of this position available: One. Ensures adherence to magazine guidelines, ethical standards, plagiarism checks, and AI-free policies. Does not necessarily require coming to meetings because of time zone differences.</p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>Ready to apply?</p>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf7t94PioPBZ6vYIsTg8KTuazKuFvMfB0N8BkygoGE2HI-wow/viewform?usp=sharing&ouid=115181364077200728162" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }} target="_blank" rel="noopener noreferrer">
                Application form →
              </a>
            </div>
          </div>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && (
                  <div className="content-box" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="section-title">Editor / Admin Dashboard</h2>
                    
                    {!isAdminLoggedIn ? (
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const { ok, data } = await apiPost('/api/admin/login', { password: adminPassword });
                        if (ok) setIsAdminLoggedIn(true);
                        else alert(`Access Denied: ${data.error || 'Check Cloudflare logs'}`);
                      }}>
                        <div className="form-group">
                          <label>Admin Password</label>
                          <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="form-control" required />
                        </div>
                        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Login</button>
                      </form>
                    ) : (
                      <div>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => setShowIssueManager(!showIssueManager)}
                          style={{
                            backgroundColor: '#fff',
                            color: '#337ab7',
                            border: '1px solid #337ab7',
                            padding: '8px 14px',
                            borderRadius: '4px',
                            marginBottom: '20px',
                            cursor: 'pointer'
                          }}
                        >
                          {showIssueManager ? '▾' : '▸'} Issue Publishing & Editing
                        </button>

                        {showIssueManager && (
                        <>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => setAdminMode('publish')}
                            style={{
                              backgroundColor: adminMode === 'publish' ? '#337ab7' : '#fff',
                              color: adminMode === 'publish' ? '#fff' : '#337ab7',
                              border: '1px solid #337ab7',
                              padding: '5px 10px',
                              borderRadius: '4px'
                            }}
                          >
                            Publish New Issue
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => setAdminMode('edit')}
                            style={{
                              backgroundColor: adminMode === 'edit' ? '#337ab7' : '#fff',
                              color: adminMode === 'edit' ? '#fff' : '#337ab7',
                              border: '1px solid #337ab7',
                              padding: '5px 10px',
                              borderRadius: '4px'
                            }}
                          >
                            Edit Existing Issue
                          </button>
                        </div>

                        {adminMode === 'publish' ? (
                          <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (!confirm('Are you sure? This will archive the current issue, update the home page, and email ALL subscribers.')) return;

                            const { ok, data } = await apiPost('/api/admin/publish', { 
                              title: newIssueTitle, 
                              contentHtml: newIssueHtml, 
                              announcementMessage: newAnnouncement 
                            });

                            if (ok) {
                              alert('Issue published and emails sent successfully!');
                              setNewIssueTitle('');
                              setNewIssueHtml('');
                              setNewAnnouncement('');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to publish: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>New Issue Title (e.g., Issue II: Shadows)</label>
                              <input type="text" value={newIssueTitle} onChange={(e) => setNewIssueTitle(e.target.value)} className="form-control" required />
                            </div>
                            
                            <div className="form-group">
                              <label>Home Page Announcement Message</label>
                              <input type="text" value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)} className="form-control" required 
                                    placeholder="e.g., Issue II is officially out! Read it under the Issues tab." />
                            </div>

                            <div className="form-group">
                              <label>Issue Content (WYSIWYG Editor)</label>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                                Format your text, add headers, links, or images visually below:
                              </p>
                              
                              <Editor
                                apiKey='vi6do892krmboei0izctd0jz9q98379bnrr3h3g7fcejsi5h'
                                value={newIssueHtml}
                                onEditorChange={(content) => setNewIssueHtml(content)}
                                init={TINYMCE_INIT}
                              />
                            </div>

                            <button type="submit" className="btn-primary" style={{ marginTop: '15px', backgroundColor: '#d9534f', borderColor: '#d9534f' }}>
                              Publish Issue & Broadcast Email
                            </button>
                          </form>
                        ) : (
                          <form onSubmit={async (e) => {
                            e.preventDefault();
                            if (!editingIssueId) {
                              alert('Please select an issue to edit.');
                              return;
                            }

                            const { ok, data } = await apiPost('/api/admin/update-issue', {
                              issueId: editingIssueId,
                              title: editIssueTitle,
                              contentHtml: editIssueHtml,
                            });

                            if (ok) {
                              alert('Issue updated successfully.');
                              const refreshed = await refreshSiteContent();
                              if (refreshed?.success && selectedIssue?.id === editingIssueId) {
                                const updated = [
                                  ...(refreshed.currentIssue ? [refreshed.currentIssue] : []),
                                  ...(refreshed.pastIssues || []),
                                ].find((i) => i.id === editingIssueId);
                                if (updated) setSelectedIssue(updated);
                              }
                            } else {
                              alert(`Failed to save: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Select Issue to Edit</label>
                              {allIssuesForAdmin.length === 0 ? (
                                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No published issues yet.</p>
                              ) : (
                                <select
                                  className="form-control"
                                  value={editingIssueId}
                                  onChange={(e) => handleSelectIssueToEdit(e.target.value)}
                                  required
                                >
                                  <option value="">— Choose an issue —</option>
                                  {allIssuesForAdmin.map((issue) => (
                                    <option key={issue.id} value={issue.id}>
                                      {issue.title}
                                      {issue.isCurrent ? ' (Current)' : ''}
                                      {!issue.isCurrent && issue.published_at
                                        ? ` — ${new Date(issue.published_at).toLocaleDateString()}`
                                        : ''}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>

                            {editingIssueId && (
                              <>
                                <div className="form-group">
                                  <label>Issue Title</label>
                                  <input
                                    type="text"
                                    value={editIssueTitle}
                                    onChange={(e) => setEditIssueTitle(e.target.value)}
                                    className="form-control"
                                    required
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Issue Content (WYSIWYG Editor)</label>
                                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                                    Fix typos or formatting below. Saving will not email subscribers.
                                  </p>

                                  <Editor
                                    key={editingIssueId}
                                    apiKey='vi6do892krmboei0izctd0jz9q98379bnrr3h3g7fcejsi5h'
                                    value={editIssueHtml}
                                    onEditorChange={(content) => setEditIssueHtml(content)}
                                    init={TINYMCE_INIT}
                                  />
                                </div>

                                <button type="submit" className="btn-primary" style={{ marginTop: '15px' }}>
                                  Save Changes
                                </button>
                              </>
                            )}
                          </form>
                        )}
                        </>
                        )}

                        <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid var(--accent-border)' }} />
                        <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '15px' }}>Digital Magazine Editions</h3>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => { setAdminDigitalMode('add'); scrollToForm('digital-add-form'); }}
                            style={{
                              backgroundColor: adminDigitalMode === 'add' ? '#337ab7' : '#fff',
                              color: adminDigitalMode === 'add' ? '#fff' : '#337ab7',
                              border: '1px solid #337ab7',
                              padding: '5px 10px',
                              borderRadius: '4px'
                            }}
                          >
                            Add Digital Magazine Edition
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => { setAdminDigitalMode('edit'); scrollToForm('digital-edit-form'); }}
                            style={{
                              backgroundColor: adminDigitalMode === 'edit' ? '#337ab7' : '#fff',
                              color: adminDigitalMode === 'edit' ? '#fff' : '#337ab7',
                              border: '1px solid #337ab7',
                              padding: '5px 10px',
                              borderRadius: '4px'
                            }}
                          >
                            Edit Digital Magazine Edition
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => { setAdminDigitalMode('delete'); scrollToForm('digital-delete-form'); }}
                            style={{
                              backgroundColor: adminDigitalMode === 'delete' ? '#337ab7' : '#fff',
                              color: adminDigitalMode === 'delete' ? '#fff' : '#337ab7',
                              border: '1px solid #337ab7',
                              padding: '5px 10px',
                              borderRadius: '4px'
                            }}
                          >
                            Delete Digital Magazine Edition
                          </button>
                        </div>

                        {adminDigitalMode === 'add' && (
                          <form id="digital-add-form" onSubmit={async (e) => {
                            e.preventDefault();
                            const { ok, data } = await apiPost('/api/admin/digital-editions/add', { title: digitalTitle, url: digitalUrl });
                            if (ok) {
                              alert('Digital magazine edition added.');
                              setDigitalTitle('');
                              setDigitalUrl('');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to add: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Button Title</label>
                              <input
                                type="text"
                                className="form-control"
                                value={digitalTitle}
                                onChange={(e) => setDigitalTitle(e.target.value)}
                                required
                                placeholder="e.g., Issue One Digital Magazine Edition"
                              />
                            </div>
                            <div className="form-group">
                              <label>Edition URL</label>
                              <input
                                type="url"
                                className="form-control"
                                value={digitalUrl}
                                onChange={(e) => setDigitalUrl(e.target.value)}
                                required
                                placeholder="https://..."
                              />
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Add Edition</button>
                          </form>
                        )}

                        {adminDigitalMode === 'edit' && (
                          <form id="digital-edit-form" onSubmit={async (e) => {
                            e.preventDefault();
                            if (!editDigitalId) {
                              alert('Please select an edition to edit.');
                              return;
                            }
                            const { ok, data } = await apiPost('/api/admin/digital-editions/edit', { id: editDigitalId, title: editDigitalTitle, url: editDigitalUrl });
                            if (ok) {
                              alert('Digital magazine edition updated.');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to update: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Select Edition to Edit</label>
                              {digitalEditions.length === 0 ? (
                                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No digital editions yet.</p>
                              ) : (
                                <select
                                  className="form-control"
                                  value={editDigitalId}
                                  onChange={(e) => {
                                    const edition = digitalEditions.find((x) => x.id === e.target.value);
                                    setEditDigitalId(edition?.id || '');
                                    setEditDigitalTitle(edition?.title || '');
                                    setEditDigitalUrl(edition?.url || '');
                                  }}
                                  required
                                >
                                  <option value="">— Choose an edition —</option>
                                  {digitalEditions.map((edition) => (
                                    <option key={edition.id} value={edition.id}>{edition.title}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                            {editDigitalId && (
                              <>
                                <div className="form-group">
                                  <label>Button Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editDigitalTitle}
                                    onChange={(e) => setEditDigitalTitle(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Edition URL</label>
                                  <input
                                    type="url"
                                    className="form-control"
                                    value={editDigitalUrl}
                                    onChange={(e) => setEditDigitalUrl(e.target.value)}
                                    required
                                  />
                                </div>
                                <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Save Changes</button>
                              </>
                            )}
                          </form>
                        )}

                        {adminDigitalMode === 'delete' && (
                          <div id="digital-delete-form">
                            {digitalEditions.length === 0 ? (
                              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No digital editions to delete.</p>
                            ) : (
                              <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {digitalEditions.map((edition) => (
                                  <li
                                    key={edition.id}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      padding: '12px 15px',
                                      backgroundColor: 'var(--accent-bg)',
                                      borderRadius: '4px',
                                      marginBottom: '10px'
                                    }}
                                  >
                                    <div style={{ minWidth: 0 }}>
                                      <strong>{edition.title}</strong>
                                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>{edition.url}</div>
                                    </div>
                                    <button
                                      type="button"
                                      className="btn-primary"
                                      style={{
                                        backgroundColor: '#d9534f',
                                        borderColor: '#d9534f',
                                        color: '#fff',
                                        padding: '5px 12px',
                                        borderRadius: '4px',
                                        marginLeft: '15px',
                                        flexShrink: 0
                                      }}
                                      onClick={async () => {
                                        if (!confirm(`Delete "${edition.title}"?`)) return;
                                        const { ok, data } = await apiPost('/api/admin/digital-editions/delete', { id: edition.id });
                                        if (ok) {
                                          alert('Digital magazine edition deleted.');
                                          if (editDigitalId === edition.id) {
                                            setEditDigitalId('');
                                            setEditDigitalTitle('');
                                            setEditDigitalUrl('');
                                          }
                                          await refreshSiteContent();
                                        } else {
                                          alert(`Failed to delete: ${data.error || 'Unknown error'}`);
                                        }
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid var(--accent-border)' }} />
                        <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '15px' }}>Announcements</h3>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => { setAdminAnnouncementMode('add'); scrollToForm('announcement-add-form'); }}
                            style={{
                              backgroundColor: adminAnnouncementMode === 'add' ? '#337ab7' : '#fff',
                              color: adminAnnouncementMode === 'add' ? '#fff' : '#337ab7',
                              border: '1px solid #337ab7',
                              padding: '5px 10px',
                              borderRadius: '4px'
                            }}
                          >
                            Add Announcement
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => { setAdminAnnouncementMode('edit'); scrollToForm('announcement-edit-form'); }}
                            style={{
                              backgroundColor: adminAnnouncementMode === 'edit' ? '#337ab7' : '#fff',
                              color: adminAnnouncementMode === 'edit' ? '#fff' : '#337ab7',
                              border: '1px solid #337ab7',
                              padding: '5px 10px',
                              borderRadius: '4px'
                            }}
                          >
                            Edit Announcement
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => { setAdminAnnouncementMode('delete'); scrollToForm('announcement-delete-form'); }}
                            style={{
                              backgroundColor: adminAnnouncementMode === 'delete' ? '#337ab7' : '#fff',
                              color: adminAnnouncementMode === 'delete' ? '#fff' : '#337ab7',
                              border: '1px solid #337ab7',
                              padding: '5px 10px',
                              borderRadius: '4px'
                            }}
                          >
                            Delete Announcement
                          </button>
                        </div>

                        {adminAnnouncementMode === 'add' && (
                          <form id="announcement-add-form" onSubmit={async (e) => {
                            e.preventDefault();
                            const { ok, data } = await apiPost('/api/admin/announcements/add', { message: announcementMessage });
                            if (ok) {
                              alert('Announcement posted.');
                              setAnnouncementMessage('');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to add: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Announcement Message</label>
                              <textarea
                                className="form-control"
                                value={announcementMessage}
                                onChange={(e) => setAnnouncementMessage(e.target.value)}
                                required
                                rows="4"
                                placeholder="e.g., Submissions for Issue II are now open!"
                              />
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Post Announcement</button>
                          </form>
                        )}

                        {adminAnnouncementMode === 'edit' && (
                          <form id="announcement-edit-form" onSubmit={async (e) => {
                            e.preventDefault();
                            if (!editAnnouncementId) {
                              alert('Please select an announcement to edit.');
                              return;
                            }
                            const { ok, data } = await apiPost('/api/admin/announcements/edit', { id: editAnnouncementId, message: editAnnouncementMessage });
                            if (ok) {
                              alert('Announcement updated.');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to update: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Select Announcement to Edit</label>
                              {announcements.length === 0 ? (
                                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No announcements yet.</p>
                              ) : (
                                <select
                                  className="form-control"
                                  value={editAnnouncementId}
                                  onChange={(e) => {
                                    const a = announcements.find((x) => x.id === e.target.value);
                                    setEditAnnouncementId(a?.id || '');
                                    setEditAnnouncementMessage(a?.message || '');
                                  }}
                                  required
                                >
                                  <option value="">— Choose an announcement —</option>
                                  {announcements.map((a) => (
                                    <option key={a.id} value={a.id}>
                                      {a.message.length > 80 ? a.message.slice(0, 80) + '…' : a.message}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Announcement Message</label>
                              <textarea
                                className="form-control"
                                value={editAnnouncementMessage}
                                onChange={(e) => setEditAnnouncementMessage(e.target.value)}
                                required
                                rows="4"
                              />
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Update Announcement</button>
                          </form>
                        )}

                        {adminAnnouncementMode === 'delete' && (
                          <div id="announcement-delete-form">
                            {announcements.length === 0 ? (
                              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No announcements to delete.</p>
                            ) : (
                              <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {announcements.map((a) => (
                                  <li
                                    key={a.id}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      padding: '12px 15px',
                                      backgroundColor: 'var(--accent-bg)',
                                      borderRadius: '4px',
                                      marginBottom: '10px'
                                    }}
                                  >
                                    <div style={{ minWidth: 0 }}>
                                      <strong>{a.message}</strong>
                                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {formatAnnouncementDate(a.created_at)}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      className="btn-primary"
                                      style={{
                                        backgroundColor: '#d9534f',
                                        borderColor: '#d9534f',
                                        color: '#fff',
                                        padding: '5px 12px',
                                        borderRadius: '4px',
                                        marginLeft: '15px',
                                        flexShrink: 0
                                      }}
                                      onClick={async () => {
                                        if (!confirm('Delete this announcement?')) return;
                                        const { ok, data } = await apiPost('/api/admin/announcements/delete', { id: a.id });
                                        if (ok) {
                                          alert('Announcement deleted.');
                                          if (editAnnouncementId === a.id) {
                                            setEditAnnouncementId('');
                                            setEditAnnouncementMessage('');
                                          }
                                          await refreshSiteContent();
                                        } else {
                                          alert(`Failed to delete: ${data.error || 'Unknown error'}`);
                                        }
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid var(--accent-border)' }} />
                        <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '15px' }}>Selected Works</h3>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
                          {['add-issue', 'edit-issue', 'delete-issue', 'add-piece', 'edit-piece', 'delete-piece'].map((mode) => {
                            const labels = {
                              'add-issue': 'Add Issue',
                              'edit-issue': 'Edit Issue Title',
                              'delete-issue': 'Delete Issue',
                              'add-piece': 'Add Piece',
                              'edit-piece': 'Edit Piece',
                              'delete-piece': 'Delete Piece',
                            };
                            return (
                              <button
                                key={mode}
                                type="button"
                                className="btn-primary"
                                onClick={() => { setAdminSWMode(mode); scrollToForm('sw-' + mode + '-form'); }}
                                style={{
                                  backgroundColor: adminSWMode === mode ? '#337ab7' : '#fff',
                                  color: adminSWMode === mode ? '#fff' : '#337ab7',
                                  border: '1px solid #337ab7',
                                  padding: '5px 10px',
                                  borderRadius: '4px'
                                }}
                              >
                                {labels[mode]}
                              </button>
                            );
                          })}
                        </div>

                        {adminSWMode === 'add-issue' && (
                          <form id="sw-add-issue-form" onSubmit={async (e) => {
                            e.preventDefault();
                            const { ok, data } = await apiPost('/api/admin/selected-works/issues/add', { title: swIssueTitle });
                            if (ok) {
                              alert('Issue added.');
                              setSwIssueTitle('');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to add: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Issue Title</label>
                              <input
                                type="text"
                                className="form-control"
                                value={swIssueTitle}
                                onChange={(e) => setSwIssueTitle(e.target.value)}
                                required
                                placeholder="e.g., Issue 1"
                              />
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Add Issue</button>
                          </form>
                        )}

                        {adminSWMode === 'edit-issue' && (
                          <form id="sw-edit-issue-form" onSubmit={async (e) => {
                            e.preventDefault();
                            if (!editSWIssueId) {
                              alert('Please select an issue to edit.');
                              return;
                            }
                            const { ok, data } = await apiPost('/api/admin/selected-works/issues/edit', { id: editSWIssueId, title: editSWIssueTitle });
                            if (ok) {
                              alert('Issue title updated.');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to update: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Select Issue</label>
                              {selectedWorks.length === 0 ? (
                                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No issues yet.</p>
                              ) : (
                                <select
                                  className="form-control"
                                  value={editSWIssueId}
                                  onChange={(e) => {
                                    const issue = selectedWorks.find((x) => x.id === e.target.value);
                                    setEditSWIssueId(issue?.id || '');
                                    setEditSWIssueTitle(issue?.title || '');
                                  }}
                                  required
                                >
                                  <option value="">— Choose an issue —</option>
                                  {selectedWorks.map((issue) => (
                                    <option key={issue.id} value={issue.id}>{issue.title}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                            {editSWIssueId && (
                              <>
                                <div className="form-group">
                                  <label>Issue Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editSWIssueTitle}
                                    onChange={(e) => setEditSWIssueTitle(e.target.value)}
                                    required
                                  />
                                </div>
                                <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Save Changes</button>
                              </>
                            )}
                          </form>
                        )}

                        {adminSWMode === 'delete-issue' && (
                          <div id="sw-delete-issue-form">
                            {selectedWorks.length === 0 ? (
                              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No issues to delete.</p>
                            ) : (
                              <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {selectedWorks.map((issue) => (
                                  <li
                                    key={issue.id}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      padding: '12px 15px',
                                      backgroundColor: 'var(--accent-bg)',
                                      borderRadius: '4px',
                                      marginBottom: '10px'
                                    }}
                                  >
                                    <div>
                                      <strong>{issue.title}</strong>
                                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {issue.pieces.length} piece{issue.pieces.length === 1 ? '' : 's'}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      className="btn-primary"
                                      style={{
                                        backgroundColor: '#d9534f',
                                        borderColor: '#d9534f',
                                        color: '#fff',
                                        padding: '5px 12px',
                                        borderRadius: '4px',
                                        marginLeft: '15px'
                                      }}
                                      onClick={async () => {
                                        if (!confirm(`Delete "${issue.title}" and all of its pieces?`)) return;
                                        const { ok, data } = await apiPost('/api/admin/selected-works/issues/delete', { id: issue.id });
                                        if (ok) {
                                          alert('Issue deleted.');
                                          if (selectedWorksIssue?.id === issue.id) setSelectedWorksIssue(null);
                                          if (editSWIssueId === issue.id) {
                                            setEditSWIssueId('');
                                            setEditSWIssueTitle('');
                                          }
                                          await refreshSiteContent();
                                        } else {
                                          alert(`Failed to delete: ${data.error || 'Unknown error'}`);
                                        }
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        {adminSWMode === 'add-piece' && (
                          <form id="sw-add-piece-form" onSubmit={async (e) => {
                            e.preventDefault();
                            if (!swPieceIssueId) {
                              alert('Please select an issue.');
                              return;
                            }
                            const { ok, data } = await apiPost('/api/admin/selected-works/pieces/add', {
                              issueId: swPieceIssueId,
                              title: swPieceTitle,
                              author: swPieceAuthor,
                              genre: swPieceGenre,
                              content: swPieceContent,
                              bio: swPieceBio,
                              pieceFont: swPieceFont,
                            });
                            if (ok) {
                              alert('Piece added.');
                              setSwPieceTitle('');
                              setSwPieceAuthor('');
                              setSwPieceContent('');
                              setSwPieceBio('');
                              setSwPieceFont('times');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to add: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Issue</label>
                              {selectedWorks.length === 0 ? (
                                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                                  No issues yet. Add an issue first.
                                </p>
                              ) : (
                                <select
                                  className="form-control"
                                  value={swPieceIssueId}
                                  onChange={(e) => setSwPieceIssueId(e.target.value)}
                                  required
                                >
                                  <option value="">— Choose an issue —</option>
                                  {selectedWorks.map((issue) => (
                                    <option key={issue.id} value={issue.id}>{issue.title}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Piece Title</label>
                              <input
                                type="text"
                                className="form-control"
                                value={swPieceTitle}
                                onChange={(e) => setSwPieceTitle(e.target.value)}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Author</label>
                              <input
                                type="text"
                                className="form-control"
                                value={swPieceAuthor}
                                onChange={(e) => setSwPieceAuthor(e.target.value)}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Genre / Section</label>
                              <select
                                className="form-control"
                                value={swPieceGenre}
                                onChange={(e) => setSwPieceGenre(e.target.value)}
                                required
                              >
                                {SELECTED_WORKS_GENRES.map((genre) => (
                                  <option key={genre} value={genre}>{genre}</option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Font</label>
                              <select
                                className="form-control"
                                value={swPieceFont}
                                onChange={(e) => setSwPieceFont(e.target.value)}
                              >
                                {PIECE_FONTS.map((f) => (
                                  <option key={f.value} value={f.value}>{f.label}</option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Piece Content (paste from Google Docs)</label>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                                Copy from your Google Doc and paste directly into the editor below. Formatting, indentation, and spacing will be preserved.
                              </p>
                              <div className="piece-page piece-page-editor">
                                <Editor
                                  apiKey='vi6do892krmboei0izctd0jz9q98379bnrr3h3g7fcejsi5h'
                                  value={swPieceContent}
                                  onEditorChange={(content) => setSwPieceContent(content)}
                                  init={makePieceTinyMCEInit(swPieceFont)}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Author Bio (optional)</label>
                              <textarea
                                className="form-control"
                                rows={3}
                                value={swPieceBio}
                                onChange={(e) => setSwPieceBio(e.target.value)}
                                onKeyDown={handleTextareaTab(swPieceBio, setSwPieceBio)}
                                placeholder="A short note about the author, shown under the piece."
                              />
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Add Piece</button>
                          </form>
                        )}

                        {adminSWMode === 'edit-piece' && (
                          <form id="sw-edit-piece-form" onSubmit={async (e) => {
                            e.preventDefault();
                            if (!editSWPieceId) {
                              alert('Please select a piece to edit.');
                              return;
                            }
                            const { ok, data } = await apiPost('/api/admin/selected-works/pieces/edit', {
                              id: editSWPieceId,
                              issueId: editSWPieceIssueId,
                              title: editSWPieceTitle,
                              author: editSWPieceAuthor,
                              genre: editSWPieceGenre,
                              content: editSWPieceContent,
                              bio: editSWPieceBio,
                              pieceFont: editSWPieceFont,
                            });
                            if (ok) {
                              alert('Piece updated.');
                              await refreshSiteContent();
                            } else {
                              alert(`Failed to update: ${data.error || 'Unknown error'}`);
                            }
                          }}>
                            <div className="form-group">
                              <label>Select Piece</label>
                              {selectedWorks.flatMap((issue) => issue.pieces).length === 0 ? (
                                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No pieces yet.</p>
                              ) : (
                                <select
                                  className="form-control"
                                  value={editSWPieceId}
                                  onChange={(e) => {
                                    const piece = selectedWorks
                                      .flatMap((issue) => issue.pieces.map((p) => ({ ...p, issueId: issue.id })))
                                      .find((p) => p.id === e.target.value);
                                    setEditSWPieceId(piece?.id || '');
                                    setEditSWPieceIssueId(piece?.issueId || '');
                                    setEditSWPieceTitle(piece?.title || '');
                                    setEditSWPieceAuthor(piece?.author || '');
                                    setEditSWPieceGenre(piece?.genre || 'Poetry');
                                    setEditSWPieceContent(piece?.content || '');
                                    setEditSWPieceBio(piece?.bio || '');
                                    setEditSWPieceFont(piece?.piece_font || 'times');
                                  }}
                                  required
                                >
                                  <option value="">— Choose a piece —</option>
                                  {selectedWorks.map((issue) => (
                                    <optgroup key={issue.id} label={issue.title}>
                                      {issue.pieces.map((piece) => (
                                        <option key={piece.id} value={piece.id}>{piece.title} — {piece.author}</option>
                                      ))}
                                    </optgroup>
                                  ))}
                                </select>
                              )}
                            </div>
                            {editSWPieceId && (
                              <>
                                <div className="form-group">
                                  <label>Issue</label>
                                  <select
                                    className="form-control"
                                    value={editSWPieceIssueId}
                                    onChange={(e) => setEditSWPieceIssueId(e.target.value)}
                                    required
                                  >
                                    {selectedWorks.map((issue) => (
                                      <option key={issue.id} value={issue.id}>{issue.title}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Piece Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editSWPieceTitle}
                                    onChange={(e) => setEditSWPieceTitle(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Author</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editSWPieceAuthor}
                                    onChange={(e) => setEditSWPieceAuthor(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Genre / Section</label>
                                  <select
                                    className="form-control"
                                    value={editSWPieceGenre}
                                    onChange={(e) => setEditSWPieceGenre(e.target.value)}
                                    required
                                  >
                                    {SELECTED_WORKS_GENRES.map((genre) => (
                                      <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Font</label>
                                  <select
                                    className="form-control"
                                    value={editSWPieceFont}
                                    onChange={(e) => setEditSWPieceFont(e.target.value)}
                                  >
                                    {PIECE_FONTS.map((f) => (
                                      <option key={f.value} value={f.value}>{f.label}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Piece Content (paste from Google Docs)</label>
                                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                                    Copy from your Google Doc and paste directly into the editor below. Formatting, indentation, and spacing will be preserved.
                                  </p>
                                  <div className="piece-page piece-page-editor">
                                    <Editor
                                      apiKey='vi6do892krmboei0izctd0jz9q98379bnrr3h3g7fcejsi5h'
                                      value={editSWPieceContent}
                                      onEditorChange={(content) => setEditSWPieceContent(content)}
                                      init={makePieceTinyMCEInit(editSWPieceFont)}
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label>Author Bio (optional)</label>
                                  <textarea
                                    className="form-control"
                                    rows={3}
                                    value={editSWPieceBio}
                                    onChange={(e) => setEditSWPieceBio(e.target.value)}
                                    onKeyDown={handleTextareaTab(editSWPieceBio, setEditSWPieceBio)}
                                    placeholder="A short note about the author, shown under the piece."
                                  />
                                </div>
                                <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Save Changes</button>
                              </>
                            )}
                          </form>
                        )}

                        {adminSWMode === 'delete-piece' && (
                          <div id="sw-delete-piece-form">
                            {selectedWorks.flatMap((issue) => issue.pieces).length === 0 ? (
                              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No pieces to delete.</p>
                            ) : (
                              <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {selectedWorks.map((issue) => (
                                  <li key={issue.id}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '15px' }}>{issue.title}</p>
                                    {issue.pieces.length === 0 ? (
                                      <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem' }}>No pieces.</p>
                                    ) : (
                                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {issue.pieces.map((piece) => (
                                          <li
                                            key={piece.id}
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                              padding: '12px 15px',
                                              backgroundColor: 'var(--accent-bg)',
                                              borderRadius: '4px',
                                              marginBottom: '8px'
                                            }}
                                          >
                                            <div>
                                              <strong>{piece.title}</strong>
                                              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>by {piece.author} • {piece.genre}</div>
                                            </div>
                                            <button
                                              type="button"
                                              className="btn-primary"
                                              style={{
                                                backgroundColor: '#d9534f',
                                                borderColor: '#d9534f',
                                                color: '#fff',
                                                padding: '5px 12px',
                                                borderRadius: '4px',
                                                marginLeft: '15px'
                                              }}
                                              onClick={async () => {
                                                if (!confirm(`Delete "${piece.title}"?`)) return;
                                                const { ok, data } = await apiPost('/api/admin/selected-works/pieces/delete', { id: piece.id });
                                                if (ok) {
                                                  alert('Piece deleted.');
                                                  if (selectedWorksPiece?.id === piece.id) setSelectedWorksPiece(null);
                                                  if (editSWPieceId === piece.id) {
                                                    setEditSWPieceId('');
                                                    setEditSWPieceTitle('');
                                                    setEditSWPieceAuthor('');
                                                    setEditSWPieceGenre('Poetry');
                                                    setEditSWPieceContent('');
                                                  }
                                                  await refreshSiteContent();
                                                } else {
                                                  alert(`Failed to delete: ${data.error || 'Unknown error'}`);
                                                }
                                              }}
                                            >
                                              Delete
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </main>

              {/* Footer */}
              <footer className="site-footer">
                <div className="footer-logo">
                  <img src="https://raw.githubusercontent.com/GavL28/the-hilltop-horizon-review/main/public/THHR.logo (1).png" alt="Logo" />
                </div>

                <div className="footer-nav">
                  <div className="footer-col">
                    <button className="footer-tab" onClick={() => setActiveTab('home')}>Home</button>
                  </div>
                  <div className="footer-col">
                    <span className="footer-tab">About</span>
                    <button onClick={() => setActiveTab('about-litmag')}>About the Lit Mag</button>
                    <button onClick={() => setActiveTab('about-mission')}>Our Mission</button>
                    <button onClick={() => setActiveTab('about-staff')}>Staff / Team</button>
                    <button onClick={() => setActiveTab('about-stats')}>Stats</button>
                  </div>
                  <div className="footer-col">
                    <span className="footer-tab">Issues / Selected Works</span>
                    <button onClick={() => setActiveTab('selected-works')}>Selected Works</button>
                    <button onClick={() => setActiveTab('digital-magazine')}>Digital Magazine</button>
                  </div>
                  <div className="footer-col">
                    <span className="footer-tab">Submit</span>
                    <button onClick={() => setActiveTab('submit-guidelines')}>Guidelines</button>
                    <button onClick={() => setActiveTab('submit-links')}>Submissions Links</button>
                  </div>
                  <div className="footer-col">
                    <span className="footer-tab">Announcements</span>
                    <button onClick={() => setActiveTab('announcements')}>Announcements</button>
                  </div>
                  <div className="footer-col">
                    <button className="footer-tab" onClick={() => setActiveTab('faq')}>FAQ</button>
                  </div>
                  <div className="footer-col">
                    <button className="footer-tab" onClick={() => setActiveTab('contact')}>Contact Us</button>
                  </div>
                  <div className="footer-col">
                    <button className="footer-tab" onClick={() => setActiveTab('join')}>Join Us</button>
                  </div>
                </div>

                <div className="footer-bottom">
                  <span className="footer-copyright" onDoubleClick={() => setActiveTab('admin')}>&copy; {new Date().getFullYear()} The Hilltop Horizon Review Literary Magazine. All rights reserved.</span>
                  <a
                    className="footer-instagram"
                    href="https://www.instagram.com/hilltop_horizon_review/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Follow us on Instagram"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </footer>
            </div>
          );
        }