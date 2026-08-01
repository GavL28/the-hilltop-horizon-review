import React, { useState } from 'react';
import './App.css';

// SVG Icon for Ink & Quill Theme
const InkLogo = () => (
  <svg className="logo-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 52C20 52 28 48 36 38L52 14C54 11 50 7 47 9L23 25C13 33 9 41 9 49" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 56C24 56 30 52 30 52" stroke="#1C1917" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="52" r="3" fill="#1C1917"/>
    <path d="M42 18L47 23" stroke="#1C1917" strokeWidth="2"/>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app">
      {/* Header & Logo */}
      <header className="site-header">
        <div className="container">
          <a href="#" className="logo-container" onClick={() => setActiveTab('home')}>
            <InkLogo />
            <h1 className="site-title">Ink & Stain</h1>
            <p className="site-subtitle">an international youth literary magazine</p>
          </a>
        </div>
      </header>

      {/* Navigation Bar with Subtabs */}
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

      {/* Main Dynamic Content Area */}
      <main className="main-content container">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>
            <div className="hero-banner">
              <p className="hero-description">
                We are an international youth literary magazine, run by high schoolers, for high schoolers.
              </p>
            </div>
            
            {/* NEW: Welcome Note */}
            <div className="content-box" style={{ textAlign: 'center' }}>
              <h2 className="section-title">From the Editors' Desk</h2>
              <p style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '20px' }}>
                Welcome to the digital home of Ink & Stain. In a world increasingly driven by fleeting digital trends, we wanted to carve out a quiet, intentional space for young voices. Whether you write in the margins of your notebooks, type late into the night, or sketch on scrap paper, this journal is a testament to the raw and the profoundly human. 
              </p>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                — Gavin & Tawanda, Co-Editors-in-Chief
              </p>
            </div>

            {/* NEW: Split Column Section for Prompts & News */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
              
              {/* Monthly Prompt Box */}
              <div className="content-box" style={{ flex: '1 1 300px', marginBottom: '0' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '15px' }}>Monthly Prompt</h3>
                <h4 style={{ color: 'var(--accent-ink)', marginBottom: '10px', fontSize: '1.1rem' }}>August: "Echoes & Aftermath"</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: '25px', color: 'var(--text-muted)' }}>
                  This month, we are looking for pieces that explore what gets left behind. The ringing in your ears after a loud concert, the shadow of a childhood memory, or the stubborn stain of spilled ink on a pristine desk.
                </p>
                <button className="btn-primary" onClick={() => setActiveTab('submit-guidelines')}>
                  Submit for this Prompt
                </button>
              </div>

              {/* Announcements Box */}
              <div className="content-box" style={{ flex: '1 1 300px', marginBottom: '0' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '15px' }}>Announcements</h3>
                <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <li>
                    <strong style={{ color: 'var(--text-main)' }}>Issue I Submissions:</strong> We are officially open for poetry, prose, and visual art. Read our guidelines to submit.
                  </li>
                  <li>
                    <strong style={{ color: 'var(--text-main)' }}>Readers Wanted:</strong> We are expanding our masthead! If you have a sharp eye for literature, apply to join our editorial team.
                  </li>
                </ul>
              </div>

            </div>
            
            {/* EXISTING: Featured Poem */}
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

        {activeTab === 'about-staff' && (
          <div>
            <h2 className="section-title">Editorial Board</h2>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-muted)' }}>
              Our masthead consists of 14 dedicated high school editors worldwide.
            </p>
            <div className="staff-grid">
              <div className="staff-card">
                <h3 className="staff-name">Gavin Liu</h3>
                <p className="staff-role">Co-Editor-in-Chief</p>
              </div>
              <div className="staff-card">
                <h3 className="staff-name">Tawanda Sibanda</h3>
                <p className="staff-role">Co-Editor-in-Chief & Internal Operations Secretary</p>
              </div>
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
          <div className="content-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-title">Contact Us</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        )}

        {/* JOIN US TAB */}
        {activeTab === 'join' && (
          <div className="content-box" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Join Our Team</h2>
            <p>Interested in joining our international team of high school readers and editors?</p>
            <br />
            <button className="btn-primary">Apply as a Reader</button>
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
