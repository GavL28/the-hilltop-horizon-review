import React, { useState, useEffect } from 'react';
import './App.css';
import { Turnstile } from '@marsidev/react-turnstile';
import { Editor } from '@tinymce/tinymce-react';

// Centralized Staff Data Array
const staffData = [
  { id: 'gavin', name: 'Gavin Liu', pronouns: 'He/Him', grade: 'Junior', role: 'Co-Editor in Chief', shortBio: 'Gavin Liu is a writer (mainly poetry), musician, visual artist, journalist, and avid magnet collector', fullBio: 'Gavin Liu is a writer (mainly poetry), musician, visual artist, journalist, and avid magnet collector from Sammamish, WA. He spends his time writing, playing the piano, gaming, on walks, overthinking, or doing nothing. He has over 200 magnets, which may or may not be a good financial investment but it’s too late to turn back now.', photo: '/Gavin Liu.jpeg' },
  { id: 'tawanda', name: 'Tawanda Sibanda', pronouns: 'He/Him', grade: 'Senior', role: 'Co-Editor in Chief & Internal Operations Secretary', shortBio: 'Tawanda Sibanda is mainly a poet and artist from Allentown, Pennsylvania. He spends his time running, working out, baking treats, bopping to J-city pop, or staying up too late to binge anime.', fullBio: 'Tawanda Sibanda is mainly a poet and artist from Allentown, Pennsylvania. He spends his time running, working out, baking treats, bopping to J-city pop, or staying up too late to binge anime.' },
  { id: 'sherry', name: 'Sherry Wang', pronouns: 'She/Her', grade: 'Junior', role: 'Poetry Editor & Social Media Director', shortBio: 'Sherry Wang is a teenage poet, musician, and public speaker from Monmouth County, New Jersey.', fullBio: 'Sherry Wang is a teenage poet, musician, and public speaker from Monmouth County, New Jersey. She began writing in the fifth grade after discovering the works of Shakespeare, whose plays and sonnets sparked her love of language. When she is not searching for her next inspiration, Sherry can be found performing on stage, spending weekends at Speech & Debate tournaments, or eating more sushi than she would like to admit.', photo: '/Sherry Wang..jpg'  },
  { id: 'mia-l', name: 'Mia Lucke', pronouns: 'She/Her', grade: 'Senior', role: 'Poetry Editor & Art Editor', shortBio: 'Mia Lucke is a poet and visual artist. Adopted from Taiwan, she currently lives in Milwaukee, Wisconsin.', fullBio: 'Mia Lucke is a poet and visual artist. Adopted from Taiwan, she currently lives in Milwaukee, Wisconsin. She spends her time writing, doing art, or going on walks. She often can be found performing her poetry for open mics, marathons, or fundraisers. The topics of her writings range from mental health, to biblical and mythological stories, or modern day society and politics. Her poetry focuses on processing both herself and the world around her.', photo: '/Mia_Lucke.jpg' },
  { id: 'grey', name: 'Grey Raymonds', pronouns: 'He/Him', grade: 'Senior', role: 'Poetry Editor', shortBio: 'Coming Soon...', fullBio: 'Full biography coming soon...' },
  { id: 'brielle', name: 'Brielle Tandy', pronouns: 'She/Her', grade: 'Senior', role: 'Poetry Editor', shortBio: 'Coming Soon...', fullBio: 'Full biography coming soon...' },
  { id: 'jayne', name: 'Jayne Kim', pronouns: 'She/Her', grade: 'Senior', role: 'Nonfiction Editor & International Representative (South Korea)', shortBio: 'Coming Soon...', fullBio: 'Full biography coming soon...' },
  { id: 'stella', name: 'Stella Goldstein', pronouns: 'She/Her', grade: 'Junior', role: 'Nonfiction Editor & International Representative (Japan)', shortBio: 'Coming Soon...', fullBio: 'Full biography coming soon...' },
  { id: 'aster', name: 'Aster Ellis', pronouns: 'They/Them', grade: 'Senior', role: 'Nonfiction Editor', shortBio: 'Aster Ellis is a young writer from Memphis, Tennessee. When not writing, they enjoy playing the guitar and sitting in nature.', fullBio: 'Aster Ellis is a young writer from Memphis, Tennessee. When not writing, they enjoy playing the guitar and sitting in nature.', photo: '/Aster.jpg' },
  { id: 'tallulah', name: 'Tallulah Dolan', pronouns: 'She/Her', grade: 'Junior', role: 'Fiction Editor & External Operations Secretary', shortBio: 'Coming Soon...', fullBio: 'Full biography coming soon...' },
  { id: 'juliana', name: 'Juliana Grindel', pronouns: 'She/Her', grade: 'Senior', role: 'Fiction Editor', shortBio: 'Juliana Grindel is a fiction writer, musician, fencer, and artist from Cheshire, Connecticut.', fullBio: 'Juliana Grindel is a fiction writer, musician, fencer, and artist from Cheshire, Connecticut. She has been writing since middle school, and focuses on speculative and flash fiction with psychological themes. Her goal in writing is to write a long form piece of psychological fiction. When she is not writing, she spends her free time playing clarinet, reading, or collecting blind boxes. ', photo: '/Juliana Grindel.jpeg' },
  { id: 'mia-s', name: 'Mia Song', pronouns: 'She/Her', grade: 'Senior', role: 'Fiction Editor & Website Manager', shortBio: 'Coming Soon...', fullBio: 'Full biography coming soon...' },
  { id: 'che', name: 'Che Holts', pronouns: 'He/Him', grade: 'Junior', role: 'Photography Editor', shortBio: 'Che is Californian fiction writer, and athlete. He will tend to draw most inspiration from comic books and indie music.', fullBio: 'Che is Californian fiction writer, and athlete. He will tend to draw most inspiration from comic books and indie music. He started writing in fifth grade during lockdown just because he could and killed time. He loves and cherishes his pet beetles lovingly named Hamster and Dinosaur. Aspires and hopes  to one day  write a superhero novel that can be taught in schools and make people more excited about writing.', photo: '/Che Holts.jpeg' },
  { id: 'rubbi', name: 'Rubbi Chen', pronouns: 'She/Her', grade: 'Senior', role: 'International Representative (China)', shortBio: 'Rubbi is a fiction writer from Shanghai, China. Normally she writes some teenage queer romance, body horror (especially splatterpunk!) and suspense fiction.', fullBio: 'Rubbi is a fiction writer from Shanghai, China. Normally she writes some teenage queer romance, body horror (especially splatterpunk!) and suspense fiction. She started writing in primary school and her first work was a yaoi smut. Except for writing, she claims to have no other artistic talent, so she spends most of her time doing anthropology and queer studies research, advocating for women’s rights, watching women’s hockey, fantasizing about her future wife, and being a cat mom. ', photo: '/Rubbi Chen.jpg' },
];

// Genres used by Selected Works (section subheadings)
const SELECTED_WORKS_GENRES = ['Poetry', 'Fiction', 'Nonfiction', 'Art', 'Photography'];

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
  const [activeTab, setActiveTab] = useState('home');
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
  const [editSWPieceId, setEditSWPieceId] = useState('');
  const [editSWPieceIssueId, setEditSWPieceIssueId] = useState('');
  const [editSWPieceTitle, setEditSWPieceTitle] = useState('');
  const [editSWPieceAuthor, setEditSWPieceAuthor] = useState('');
  const [editSWPieceGenre, setEditSWPieceGenre] = useState('Poetry');
  const [editSWPieceContent, setEditSWPieceContent] = useState('');

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
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(true);

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
        if (data.announcement) setAnnouncement(data.announcement.message);
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
      about: ['about-litmag', 'about-mission', 'about-staff', 'staff-detail'],
      announcements: ['announcements', 'announcements-archive'],
      issues: ['selected-works', 'selected-works-issue', 'selected-works-piece', 'digital-magazine', 'issues-archive'],
      submit: ['submit-guidelines', 'submit-links'],
      faq: ['faq'],
      contact: ['contact'],
      join: ['join'],
    };
    return groups[group].includes(activeTab);
  };

  return (
    <div className="app">
      {/* Navigation Bar (top banner) */}
      <nav className="nav-bar">
        <a href="#" className="nav-logo" onClick={() => setActiveTab('home')} title="The Hilltop Horizon Review">
          <img src="https://raw.githubusercontent.com/GavL28/the-hilltop-horizon-review/main/public/THHR.logo (1).png" alt="Logo" />
        </a>
        <ul className="nav-list">
          <li className="nav-item">
            <button className={isNavActive('home') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('home')}>Home</button>
          </li>
          <li className="nav-item">
            <button className={isNavActive('about') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('about-litmag')}>About ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-litmag')}>About the Lit Mag</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-mission')}>Our Mission</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-staff')}>Staff / Team</button></li>
            </ul>
          </li>
          <li className="nav-item">
            <button className={isNavActive('announcements') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('announcements')}>Announcements ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('announcements')}>Announcements</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('announcements-archive')}>Past Announcements</button></li>
            </ul>
          </li>
          <li className="nav-item">
            <button className={isNavActive('issues') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('selected-works')}>Issues / Selected Works ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('selected-works')}>Selected Works</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('digital-magazine')}>Digital Magazine</button></li>
            </ul>
          </li>
          <li className="nav-item">
            <button className={isNavActive('submit') ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('submit-guidelines')}>Submit ▾</button>
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

      {/* Header & Logo */}
      <header className="site-header">
        <div className="container">
          <a href="#" className="logo-container" onClick={() => setActiveTab('home')}>
            <img src="https://raw.githubusercontent.com/GavL28/the-hilltop-horizon-review/main/public/THHR.logo (1).png" alt="Logo" />
          </a>
          <div className="site-title">The Hilltop Horizon Review</div>
          <div className="site-subtitle">an international youth literary magazine</div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content container">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>

            {/* Dynamic Announcement Banner */}
            {announcement && (
              <div style={{
                backgroundColor: 'var(--accent-bg)',
                borderLeft: '4px solid var(--text-main)',
                padding: '15px 20px',
                marginBottom: '30px',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span className="loud-speaker">📢</span> 
                <span><strong>Latest Update:</strong> {announcement}</span>
              </div>
            )}

            <div className="hero-banner">
              <img src="/IMG_6051.jpeg" alt="The Hilltop Horizon Review" className="hero-image" />
              <p className="hero-description">
                We are an international youth literary magazine, run by high schoolers, for high schoolers.
              </p>
            </div>

            <div className="content-box" style={{ textAlign: 'center' }}>
              <h2 className="section-title">From the Co-Editors in Chiefs' Desk</h2>
              <p style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '20px' }}>
                Welcome to the digital home of The Hilltop Horizon Review! Run by a team of devoted and eager young writers, we seek to build a world-wide community for young writers to chase their dreams.
              </p>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                — Gavin, Co-Editor in Chief
              </p>
            </div>

            {/* Announcements Box */}
          <div className="content-box" style={{ maxWidth: '1000px', margin: '0 auto 40px auto' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '15px', textAlign: 'center' }}>Announcements</h3>
              <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <li>
                  <strong>Issue I Submissions:</strong> We are officially open for poetry, fiction, nonfiction, art, and photography. Issue 1 is for Reynolds 2026 alumni only. Read our guidelines to submit.
                </li>
                <li>
                  <strong>Editors Wanted:</strong> We are expanding our team! If you have a sharp eye for literature, check our "Join Us" page to apply.
                </li>
              </ul>
            </div>
            
            <h2 className="section-title">Featured Work</h2>
            <div className="featured-poem">
              <h3 className="poem-title">Sample Piece</h3>
              <p className="poem-body">
                {`Spurts of violent blue
Shining of teasing steel through
Red upon white cloth`}
              </p>
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
                <p>We are a team of 14 Reynolds Young Writers Workshop Class of 2026 alumni from all over the world, including the U.S., China, Japan, and South Korea.</p>
                <p>We accept submissions from high schoolers (ages 14-19).</p>
                <p>If your submission(s) is selected to be published, you will be notified and your work and bio will be added to the issue. Each piece you submit will be carefully reviewed by our wonderful editors, who will provide editing, and detailed, specific, and in-depth feedback.</p>
                <p>Communication will be by email.</p>
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
          </div>
        )}

        {/* STAFF DIRECTORY GRID */}
        {activeTab === 'about-staff' && (
          <div>
            <h2 className="section-title">Editorial Board</h2>
            <p style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--text-muted)' }}>
              Our masthead consists of 14 dedicated high school editors worldwide. Click any profile to learn more.
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
                <h4>{selectedStaff.role}</h4>
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
            <h2 className="section-title">Announcements</h2>

            {isContentLoading && <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>Loading latest announcement...</p>}

            {!isContentLoading && announcements.length === 0 && (
              <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>No announcements yet. Check back soon!</p>
            )}

            {!isContentLoading && announcements.length > 0 && (
              <div style={{ marginBottom: '50px' }}>
                <div className="issue-content" style={{ lineHeight: '1.8', fontSize: '1.15rem' }}>
                  {announcements[0].message}
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginTop: '15px' }}>
                  Posted {new Date(announcements[0].created_at).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* PAST ANNOUNCEMENTS */}
        {activeTab === 'announcements-archive' && (
          <div className="content-box fade-in">
            <h2 className="section-title">Past Announcements</h2>

            {isContentLoading && <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>Loading archive...</p>}

            {!isContentLoading && announcements.slice(1).length === 0 && (
              <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)' }}>No past announcements available yet.</p>
            )}

            {!isContentLoading && announcements.slice(1).length > 0 && (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {announcements.slice(1).map((a) => (
                  <li
                    key={a.id}
                    style={{
                      marginBottom: '15px',
                      padding: '15px',
                      backgroundColor: 'var(--accent-bg)',
                      borderRadius: '4px',
                      border: '1px solid transparent',
                    }}
                  >
                    <div style={{ color: 'var(--text-main)' }}>{a.message}</div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginTop: '5px' }}>
                      Posted {new Date(a.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
                            marginBottom: '12px',
                            padding: '15px',
                            backgroundColor: 'var(--accent-bg)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            border: '1px solid transparent',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.border = '1px solid var(--text-main)'}
                          onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
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
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{selectedWorksPiece.genre}</span>
              <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{selectedWorksPiece.author}</span>
            </div>
            <div className="issue-content" style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
              {selectedWorksPiece.content}
            </div>
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
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Does it cost money to submit?</h4>
            <p style={{ marginBottom: '15px' }}>No, submissions are completely free.</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Can I submit multiple pieces?</h4>
            <p>Yes, but each genre has its specific limits. Check the specific guidelines for more details.</p>

            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Am I eligible to submit?</h4>
            <p style={{ marginBottom: '15px' }}>Any teen ages 14-19 or in high school can submit.</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>How do I submit?</h4>
            <p>Read through the guidelines tab, then go to the submissions tab and fill the form.</p>

            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Do you accept international submissions?</h4>
            <p style={{ marginBottom: '15px' }}>Yes, from any nation. We're an international youth literary magazine, we seek to grow worldwide. (Check out the International Representative Position in the Join Us tab.)</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Do you accept non-English submissions?</h4>
            <p>As of now, we do not accept fully non-English submissions, but this may change in the future. Having non-English characters or phrases to a limited extent in a majority English submission is fine, as long as you explain and provide a translation on the submission form.</p>
          
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>What are the word counts and limits?</h4>
            <p style={{ marginBottom: '15px' }}>Check the guidelines tab.</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>How should I format my submission / document?</h4>
            <p>Check the guidelines tab.</p>

            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Do you accept simultaneous submissions?</h4>
            <p style={{ marginBottom: '15px' }}>For the first issue, no. Starting from the second issue, yes. (Make sure to immediately contact us if your submission is accepted elsewhere so we can withdraw your submission. Contact info can be found in the contact tab.)</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>How will each issue be published?</h4>
            <p>Online, on thi website, in the Issues tab.</p>
          
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Who owns the rights to my work after publication?</h4>
            <p style={{ marginBottom: '15px' }}>You do! You retain 100% ownership of your work. We only ask for First Serial Rights, meaning we get to be the first to publish your work. After it appears in our issue, all rights revert back to you immediately. You are free to republish, re-share, or include your work in a future collection whenever you like.</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Do I need parental or guardian permission to submit?</h4>
            <p>Yes, if you are under 18.</p>

            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Can I use a pen name?</h4>
            <p style={{ marginBottom: '15px' }}>Yes, but please enter you real full name into the submission form, and request a pen name to be used for if your work is selected.</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>When will I hear back about my submission?</h4>
            <p>Response time varies, but generally ranges from a week or two to a month.</p>
          
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Will I receive feedback?</h4>
            <p style={{ marginBottom: '15px' }}>Yes, no matter if your piece is selected to be published or not, you will receive detailed, specific, and in-depth feedback from one of our editors.</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>How often do issues come out?</h4>
            <p>Issues come out every two months, except the first issue (1 month) and certain times of the year, e.g. holidays, AP & IB & Finals testing.</p>
          
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>What will communication primarily be through?</h4>
            <p style={{ marginBottom: '15px' }}>Public announcements will be posted on this website and our official instagram account, but communication typically will be through email.</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Can I submit to multiple genres / secitons?</h4>
            <p>Yes; you can technically submit 20 or even more pieces total across the genres and sections. However, you may only fill one submission form per genre / section each issue.</p>
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
                <span className="btn-primary" style={{ display: 'inline-block', backgroundColor: '#D6D3D1', color: '#1C1917', cursor: 'default' }}>Coming Soon...</span>
                <span className="btn-primary" style={{ display: 'inline-block', backgroundColor: '#D6D3D1', color: '#1C1917', cursor: 'default' }}>Coming Soon...</span>
                <span className="btn-primary" style={{ display: 'inline-block', backgroundColor: '#D6D3D1', color: '#1C1917', cursor: 'default' }}>Coming Soon...</span>
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
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: One. Edits poetry submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Communicates and works together with fellow poetry editors to select a collection of poems to be published each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in poetry is a required minimum. Experience editing poetry is a definete plus. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Fiction Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: Two. Edits fiction submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Communicates and works together with fellow fiction editors to select a collection of fiction pieces to be published each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in fiction is a required minimum. Experience editing fiction is a definete plus. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Nonfiction Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: Two. Edits nonfiction submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Communicates and works together with fellow nonfiction editors to select a collection of nonfiction pieces to be published each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in nonfiction is a required minimum. Experience editing fiction is a definete plus. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Art Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: One. Reviews artwork submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Works to select pieces to be published in each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in art is a required minimum. Experience reviewing, judging, and providing feedback on artwork is a definete plus, as well as experience in a variety of mediums. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Photography Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: One. Reviews photography submissions and provides detailed, specific, and in-depth constructive feedback for every piece assigned. Works to select pieces to be published in each issue.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Experience in photography is a required minimum. Experience reviewing, judging, and providing feedback on photography is a definete plus. Willingsness to work and communicate with fellow editors. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Internal Operations Secretary</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: Zero. Manages internal team schedules, meeting notes, communication channels, announcments, and administrative workflows.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: strong organizational and calendar management skills, excellent communication for team announcements, and proficiency in tools like Slack, Google Workspace, and project management platforms. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>External Operations Secretary</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: Zero. Manages submissions, general tracking organization, external communication, public relations, and forms.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: strong organizational skills, excellent communication with members of the public -- primarily submitters, frequent availability to check and respond to inquiries and requests. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Website Administrator</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: Zero. Maintains web infrastructure and security, uploads new issues, adds new features, and ensures smooth site performance.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended qualifications: Basic coding knowledge is required. Experience and familiarity with IDEs, github, cloudflare, and especially experience with creating / acting as administrator for other websites is recommended. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Social Media Director</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: Zero. Runs social channels, designs promotional graphics, and engages with the online young writer community.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended Qualifications: Experience with handling social media accounts, art & design experience, experience with canva, photoshop, illustrator, etc. Come consistently to meetings. & more.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>International Representatives</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: As many as possible (NOT U.S.A., China, Japan, or South Korea). Builds regional networks, handles promotion in region, and coordinates translation or regional features abroad.</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Recommended Qualifications: MUST be living in a nation that The Hilltop Horizon Review does NOT have an international representative in. Fluency in the nation's language. Experience with creating promotional materials. Does not necessarily require coming to meetings because of time zone differences.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Director of Policy and Standards</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Currently Seeking: One. Ensures adherence to magazine guidelines, ethical standards, plagiarism checks, and AI-free policies. Does not necessarily require coming to meetings because of time zone differences.</p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>Ready to apply?</p>
              <a href="#" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Application Form Coming Soon... →
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
                                        Posted {new Date(a.created_at).toLocaleDateString()}
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
                            });
                            if (ok) {
                              alert('Piece added.');
                              setSwPieceTitle('');
                              setSwPieceAuthor('');
                              setSwPieceContent('');
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
                              <label>Piece Content</label>
                              <textarea
                                className="form-control"
                                rows={8}
                                value={swPieceContent}
                                onChange={(e) => setSwPieceContent(e.target.value)}
                                required
                                placeholder="Paste the piece here. Line breaks are preserved."
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
                                  <label>Piece Content</label>
                                  <textarea
                                    className="form-control"
                                    rows={8}
                                    value={editSWPieceContent}
                                    onChange={(e) => setEditSWPieceContent(e.target.value)}
                                    required
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
                <div className="container" onDoubleClick={() => setActiveTab('admin')}>
                  <p>&copy; {new Date().getFullYear()} The Hilltop Horizon Review Literary Magazine. All rights reserved.</p>
                </div>
              </footer>
            </div>
          );
        }