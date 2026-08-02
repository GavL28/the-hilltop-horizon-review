import React, { useState } from 'react';
import './App.css';
import { Turnstile } from '@marsidev/react-turnstile';

// Centralized Staff Data Array
const staffData = [
  { id: 'gavin', name: 'Gavin Liu', pronouns: 'He/Him', grade: 'Junior', role: 'Co-Editor in Chief', shortBio: 'Dedicated to fostering a welcoming community for young writers.', fullBio: 'Full biography coming soon...', photo: '/gavinliu.png' },
  { id: 'tawanda', name: 'Tawanda Sibanda', pronouns: 'He/Him', grade: 'Senior', role: 'Co-Editor in Chief & Internal Operations Secretary', shortBio: 'Passionate about organizing and streamlining literary operations.', fullBio: 'Full biography coming soon...' },
  { id: 'tallulah', name: 'Tallulah Dolan', pronouns: 'She/Her', grade: 'Junior', role: 'Fiction Editor & External Operations Secretary', shortBio: 'An avid reader and writer of contemporary fiction.', fullBio: 'Full biography coming soon...' },
  { id: 'grey', name: 'Grey Raymonds', pronouns: 'He/Him', grade: 'Senior', role: 'Poetry Editor', shortBio: 'Specializes in free verse and deeply emotional works.', fullBio: 'Full biography coming soon...' },
  { id: 'brielle', name: 'Brielle Tandy', pronouns: 'She/Her', grade: 'Senior', role: 'Poetry Editor', shortBio: 'Loves finding rhythm and structure in every stanza.', fullBio: 'Full biography coming soon...' },
  { id: 'sherry', name: 'Sherry Wang', pronouns: 'She/Her', grade: 'Junior', role: 'Poetry Editor & Social Media Director', shortBio: 'Connecting poets across digital landscapes and social feeds.', fullBio: 'Full biography coming soon...' },
  { id: 'mia-l', name: 'Mia Lucke', pronouns: 'She/Her', grade: 'Senior', role: 'Poetry Editor & Art Editor', shortBio: 'Bridging the gap between visual arts and the written word.', fullBio: 'Full biography coming soon...' },
  { id: 'aster', name: 'Aster Greer', pronouns: 'They/Them', grade: 'Senior', role: 'Nonfiction Editor', shortBio: 'Dedicated to highlighting powerful, true stories and essays.', fullBio: 'Full biography coming soon...' },
  { id: 'jayne', name: 'Jayne Kim', pronouns: 'She/Her', grade: 'Senior', role: 'Nonfiction Editor & International Representative (South Korea)', shortBio: 'Bringing global perspectives to creative nonfiction.', fullBio: 'Full biography coming soon...' },
  { id: 'stella', name: 'Stella Goldstein', pronouns: 'She/Her', grade: 'Junior', role: 'Nonfiction Editor & International Representative (Japan)', shortBio: 'Curating essays that bridge diverse cultures and experiences.', fullBio: 'Full biography coming soon...' },
  { id: 'juliana', name: 'Juliana Grindel', pronouns: 'She/Her', grade: 'Senior', role: 'Fiction Editor', shortBio: 'Always on the hunt for a compelling narrative arc.', fullBio: 'Full biography coming soon...' },
  { id: 'mia-s', name: 'Mia Song', pronouns: 'She/Her', grade: 'Senior', role: 'Fiction Editor & Website Manager', shortBio: 'Weaving stories both in prose and in web code.', fullBio: 'Full biography coming soon...' },
  { id: 'che', name: 'Che Holts', pronouns: 'He/Him', grade: 'Junior', role: 'Photography Editor', shortBio: 'Capturing moments that speak louder than words.', fullBio: 'Full biography coming soon...' },
  { id: 'rubbi', name: 'Rubbi Chen', pronouns: 'She/Her', grade: 'Senior', role: 'International Representative (China)', shortBio: 'Fostering literary connections across international borders.', fullBio: 'Full biography coming soon...' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedStaff, setSelectedStaff] = useState(null);
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    setActiveTab('staff-detail');
  };

  return (
    <div className="app">
      {/* Header & Logo */}
      <header className="site-header">
        <div className="container">
          <a href="#" className="logo-container" onClick={() => setActiveTab('home')}>
            <img src="/inkandstain_icon.png" alt="Ink & Stain Logo" className="logo-icon" />
            <h1 className="site-title">Ink & Stain</h1>
            <p className="site-subtitle">an international youth literary magazine</p>
          </a>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <button className="nav-link" onClick={() => setActiveTab('home')}>Home</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setActiveTab('about-litmag')}>About ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-litmag')}>About the Lit Mag</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-mission')}>Our Mission</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('about-staff')}>Staff / Team</button></li>
            </ul>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setActiveTab('issues-current')}>Issues ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('issues-current')}>Current Issue</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('issues-archive')}>Past Issues Archive</button></li>
            </ul>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setActiveTab('submit-guidelines')}>Submit ▾</button>
            <ul className="dropdown">
              <li><button className="dropdown-link" onClick={() => setActiveTab('submit-guidelines')}>Guidelines</button></li>
              <li><button className="dropdown-link" onClick={() => setActiveTab('submit-links')}>Submissions Links</button></li>
            </ul>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setActiveTab('faq')}>FAQ</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setActiveTab('contact')}>Contact Us</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => setActiveTab('join')}>Join Us</button>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="main-content container">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>
            <div className="hero-banner">
              <p className="hero-description">
                We are an international youth literary magazine, run by high schoolers, for high schoolers.
              </p>
            </div>
            
            <div className="content-box" style={{ textAlign: 'center' }}>
              <h2 className="section-title">From the Editors' Desk</h2>
              <p style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '20px' }}>
                Welcome to the digital home of Ink & Stain. In a world increasingly driven by fleeting digital trends, we wanted to carve out a quiet, intentional space for young voices. Whether you write in the margins of your notebooks, type late into the night, or sketch on scrap paper, this journal is a testament to the raw and the profoundly human. 
              </p>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                — Gavin & Tawanda, Co-Editors-in-Chief
              </p>
            </div>

            {/* Announcements Box */}
            <div className="content-box" style={{ maxWidth: '700px', margin: '0 auto 40px auto' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '15px', textAlign: 'center' }}>Announcements</h3>
              <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <li>
                  <strong>Issue I Submissions:</strong> We are officially open for poetry, prose, and visual art. Read our guidelines to submit.
                </li>
                <li>
                  <strong>Editors Wanted:</strong> We are expanding our masthead! If you have a sharp eye for literature, check our "Join Us" page to apply.
                </li>
              </ul>
            </div>
            
            <h2 className="section-title">Featured Work</h2>
            <div className="featured-poem">
              <h3 className="poem-title">Sample Piece</h3>
              <p className="poem-body">
                {`Spurts of violent blue
Shining of teasing steel too
Red upon white cloth`}
              </p>
            </div>
          </div>
        )}

        {/* ABOUT SUBTABS */}
        {activeTab === 'about-litmag' && (
          <div className="content-box">
            <h2 className="section-title">About Ink & Stain</h2>
            <p>We are an international youth literary magazine, run by high schoolers, for high schoolers.</p>
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

        {/* ISSUES SUBTABS */}
        {activeTab === 'issues-current' && (
          <div className="content-box" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Current Issue</h2>
            <p>Issue I — Coming Soon.</p>
          </div>
        )}

        {activeTab === 'issues-archive' && (
          <div className="content-box" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Past Issues Archive</h2>
            <p>Archived releases will appear here after publication.</p>
          </div>
        )}

        {/* SUBMIT SUBTABS */}
        {(activeTab === 'submit-guidelines' || activeTab === 'submit-links') && (
          <div className="content-box">
            <h2 className="section-title">Submission Guidelines</h2>
            <p style={{ marginBottom: '20px' }}>
              Thank you for taking the time to submit to our literary magazine! Please review the information below before making your submission. Good luck!
            </p>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginTop: '20px', marginBottom: '10px' }}>Age Requirements</h3>
            <p>Please note we only accept submissions from high school aged students (ages 14–19).</p>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginTop: '20px', marginBottom: '10px' }}>What Can Be Submitted?</h3>
            <p>We accept works of fiction, nonfiction, poetry, artwork, and photography. However, we do <strong>NOT</strong> accept any works that have been published elsewhere. We are looking for original, unpublished works.</p>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginTop: '20px', marginBottom: '10px' }}>Artificial Intelligence & Plagiarism Policy</h3>
            <p>We do not allow the use of artificial intelligence (AI) in any capacity. AI may not be used for developing ideas, giving suggestions, or producing content to any extent.</p>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginTop: '20px', marginBottom: '10px' }}>Prohibited Content</h3>
            <p>We do not permit hate speech, bigotry, extreme violence, or sexually explicit content.</p>
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <a href="#" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Access Submission Form →
              </a>
            </div>
          </div>
        )}

        {/* FAQ TAB */}
        {activeTab === 'faq' && (
          <div className="content-box">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Does it cost money to submit?</h4>
            <p style={{ marginBottom: '15px' }}>No, submissions are completely free.</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '15px' }}>Can I submit multiple pieces?</h4>
            <p>Please check the monthly prompt guidelines for genre-specific submission limits.</p>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="content-box" style={{ maxWidth: '650px', margin: '0 auto' }}>
            <h2 className="section-title">Contact Us</h2>
            
            {/* Official Email & Social Media Placeholders */}
            <div style={{ textAlign: 'center', marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid var(--accent-border)' }}>
              <p style={{ marginBottom: '12px', fontSize: '1.05rem' }}>
                <strong>Official Email:</strong> <a href="mailto:contact@inkandstainlit.com" style={{ color: 'var(--text-main)' }}>contact@inkandstainlit.com</a>
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>Connect with us on social media:</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.95rem' }}>
                <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Instagram</a>
                <span>•</span>
                <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>X (Twitter)</a>
                <span>•</span>
                <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Facebook</a>
                <span>•</span>
                <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>TikTok</a>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginBottom: '25px', color: 'var(--text-muted)' }}>Or send us a direct message below:</p>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!captchaToken) {
                alert('Please complete the captcha verification.');
                return;
              }

              try {
                const response = await fetch('/api/submit', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, message, token: captchaToken }),
                });

                const data = await response.json();
                if (data.success) {
                  alert('Message sent successfully!');
                  setName('');
                  setEmail('');
                  setMessage('');
                } else {
                  alert('Error: ' + data.error);
                }
              } catch (err) {
                alert('An error occurred while sending your message.');
              }
            }}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  className="form-control" 
                  rows="5" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                ></textarea>
              </div>
              <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                <Turnstile 
                  siteKey="0x4AAAAAAEEHPVvPPOVCCORz" 
                  onSuccess={(token) => setCaptchaToken(token)} 
                />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '15px' }}>Send Message</button>
            </form>
          </div>
        )}

        {/* JOIN US TAB */}
        {activeTab === 'join' && (
          <div className="content-box" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title">Join Our Team</h2>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-muted)' }}>
              Ink & Stain is entirely run by high schoolers. We look for passionate, dedicated individuals who want to help shape our global literary community. Open to students ages 14–19.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '40px' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Poetry Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Reviews and selects poetry submissions, evaluates lyrical quality, and curates monthly poetic features.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Fiction Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Reads short stories and flash fiction submissions, evaluating narrative arc, character development, and prose style.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Nonfiction Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Evaluates personal essays, memoirs, and creative nonfiction pieces for emotional resonance and clarity.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Art Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Curates digital and traditional visual artwork to accompany literary pieces and feature independent youth artists.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Photography Editor</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Selects striking photographic works for publication across issues and online showcases.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Internal Operations Secretary</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Manages internal team schedules, meeting notes, communication channels, and administrative workflows.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>External Operations Secretary</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Coordinates outreach with partner literary magazines, schools, and external literary organizations.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Website Manager</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Maintains web infrastructure, uploads new issues, tests user interfaces, and ensures smooth site performance.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Social Media Director</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Runs social channels, designs promotional graphics, and engages with the online young writer community.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>International Representatives</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Builds regional networks, promotes submissions, and coordinates translation or regional features abroad.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Director of Policy and Standards</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Ensures adherence to magazine guidelines, ethical standards, plagiarism checks, and AI-free policies.</p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '15px', fontStyle: 'italic' }}>Ready to apply?</p>
              <a href="#" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Open Application Form (Google Form) →
              </a>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ink & Stain Literary Magazine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
