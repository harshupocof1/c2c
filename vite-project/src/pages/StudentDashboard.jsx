import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

const mockUsers = [
  {
    id: 2, name: "Simmi kumari", username: "simmi456", photo: null,
    qualification: "MCA", email: "simmi@test.com", phone: "9876543210",
    address: "City A", tenth: "School A", twelfth: "School B", graduation: "College C",
    certificates: [{ url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=200&fit=crop", type: "image/png" }],
    personalPosts: [{ url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=200&fit=crop", type: "image/png" }],
    resumes: [], skills: ["Python", "Django", "SQL"], about: "MCA student passionate about backend development.",
  },
  {
    id: 3, name: "Ankit Verma", username: "ankit789", photo: null,
    qualification: "B.Tech", email: "ankit@test.com", phone: "8765432109",
    address: "City B", tenth: "School X", twelfth: "School Y", graduation: "College Z",
    certificates: [], personalPosts: [], resumes: [], skills: ["UI/UX", "Figma", "CSS"],
    about: "B.Tech student specializing in frontend and design.",
  },
];

const mockIndustries = [
  { id: 1, name: "TechNova Solutions", logo: "TN", domain: "Cloud Computing", location: "Bangalore", tagline: "Cloud Native Excellence" },
  { id: 2, name: "Quantum AI", logo: "QA", domain: "Artificial Intelligence", location: "Hyderabad", tagline: "Pioneering AI" },
  { id: 3, name: "Nexus Fintech", logo: "NF", domain: "Blockchain", location: "Mumbai", tagline: "Next-Gen Finance" },
  { id: 999, name: "Global Tech Corp", logo: "GT", domain: "IT Services", location: "New Delhi", tagline: "Innovating the Future" },
];

const mockCourses = [
  { id: 1, title: "React.js Complete Guide", provider: "Udemy", duration: "40 hrs", level: "Intermediate", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop", rating: 4.8, students: "125K", field: "BCA" },
  { id: 2, title: "Data Structures & Algorithms", provider: "Coursera", duration: "60 hrs", level: "Advanced", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop", rating: 4.9, students: "200K", field: "BCA" },
  { id: 3, title: "Node.js Backend Development", provider: "Pluralsight", duration: "35 hrs", level: "Intermediate", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop", rating: 4.7, students: "80K", field: "BCA" },
  { id: 4, title: "AWS Cloud Practitioner", provider: "AWS", duration: "20 hrs", level: "Beginner", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop", rating: 4.6, students: "300K", field: "BCA" },
  { id: 5, title: "Machine Learning A-Z", provider: "Udemy", duration: "55 hrs", level: "Intermediate", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop", rating: 4.8, students: "310K", field: "MCA" },
  { id: 6, title: "Django REST Framework", provider: "Pluralsight", duration: "30 hrs", level: "Intermediate", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop", rating: 4.6, students: "95K", field: "MCA" },
  { id: 7, title: "System Design Fundamentals", provider: "Coursera", duration: "45 hrs", level: "Advanced", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop", rating: 4.9, students: "180K", field: "B.Tech" },
];

const jobData = [
  { title: "Frontend Developer", company: "TechCorp India", companyId: 1, type: "Full-time", location: "Bangalore", salary: "6–10 LPA", skills: "React, CSS, TypeScript", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop" },
  { title: "Java Backend Engineer", company: "Infosys Ltd.", companyId: 2, type: "Hybrid", location: "Pune", salary: "5–9 LPA", skills: "Java, Spring Boot, AWS", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop" },
  { title: "Data Analyst", company: "Analytics Co.", companyId: 3, type: "Remote", location: "Mumbai", salary: "4–8 LPA", skills: "Python, SQL, Tableau", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop" },
];

// Shared vacancy feed (simulating what industry posted)
const sharedVacancyFeed = [
  {
    id: 101, ownerId: 999, ownerName: "Global Tech Corp", ownerLogo: "GT",
    type: "Internship", title: "MERN Stack Intern",
    desc: "Seeking proactive students with React and Node.js expertise for our New Delhi office. You will work alongside senior engineers on live client projects.",
    skills: "React, Node.js, Express, MongoDB", duration: "6 Months",
    offerings: "Stipend of ₹20,000/month, Pre-placement offer, Mentorship",
    date: "2 hours ago", likes: 24,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    id: 102, ownerId: 2, ownerName: "Quantum AI", ownerLogo: "QA",
    type: "Job Vacancy", title: "AI Research Associate",
    desc: "Join our neural network research team in Hyderabad. PhD or Masters preferred. Remote work options available.",
    skills: "Python, PyTorch, Deep Learning, Mathematics", duration: "Full-Time",
    offerings: "Competitive Salary, Health Insurance, Research Grants",
    date: "3 days ago", likes: 89,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    id: 103, ownerId: 999, ownerName: "Global Tech Corp", ownerLogo: "GT",
    type: "Job Vacancy", title: "Senior Product Designer",
    desc: "Looking for an experienced designer to lead our enterprise software UI/UX revamps. Portfolio required.",
    skills: "Figma, User Research, Design Systems, Prototyping", duration: "Full-Time",
    offerings: "Equity Options, Remote work allowance, Annual Retreats",
    date: "1 week ago", likes: 65,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    id: 104, ownerId: 1, ownerName: "TechNova Solutions", ownerLogo: "TN",
    type: "Internship", title: "Cloud DevOps Intern",
    desc: "Help us build and maintain CI/CD pipelines on AWS and Azure. Great learning opportunity for cloud enthusiasts.",
    skills: "AWS, Docker, Kubernetes, Linux", duration: "3 Months",
    offerings: "Stipend ₹15,000/month, Certificate, PPO Possibility",
    date: "5 days ago", likes: 43,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
];

const levelStyle = {
  Beginner:     { bg: "#e6f9f0", color: "#1a7a4a", border: "#b3e8cc" },
  Intermediate: { bg: "#fff8e6", color: "#9a6400", border: "#ffd97a" },
  Advanced:     { bg: "#fdeef1", color: "#b5192d", border: "#f5b3bc" },
};

const typeStyle = {
  "Full-time": { bg: "#ede9fe", color: "#5b21b6" },
  "Hybrid":    { bg: "#dbeafe", color: "#1d4ed8" },
  "Remote":    { bg: "#e6faf5", color: "#0a7a58" },
};

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --indigo: #4f46e5;
  --indigo-light: #818cf8;
  --violet: #7c3aed;
  --emerald: #10b981;
  --amber: #f59e0b;
  --rose: #f43f5e;
  --navy: #0f172a;
  --slate: #1e293b;
  --muted: #64748b;
  --subtle: #94a3b8;
  --border: rgba(148,163,184,0.18);
  --border-strong: rgba(99,102,241,0.25);
  --surface: rgba(255,255,255,0.72);
  --surface-strong: rgba(255,255,255,0.92);
  --grad: linear-gradient(135deg, #4f46e5, #7c3aed);
  --grad-warm: linear-gradient(135deg, #f59e0b, #ef4444);
  --grad-emerald: linear-gradient(135deg, #10b981, #059669);
  --shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
  --shadow: 0 4px 16px rgba(79,70,229,0.1), 0 1px 4px rgba(15,23,42,0.06);
  --shadow-lg: 0 12px 40px rgba(79,70,229,0.16), 0 2px 8px rgba(15,23,42,0.08);
  --radius: 18px;
  --radius-sm: 11px;
  --radius-xs: 8px;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: #f1f5f9;
  min-height: 100vh;
  color: var(--slate);
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(79,70,229,0.25); border-radius: 99px; }

/* ── NOISE OVERLAY ── */
.noise {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* ── TOP NAV ── */
.nav {
  height: 62px;
  background: var(--surface);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 1.75rem;
  position: sticky; top: 0; z-index: 200;
  box-shadow: 0 1px 12px rgba(15,23,42,0.06);
}
.brand {
  font-family: 'Syne', sans-serif;
  font-size: 1.15rem; font-weight: 800; letter-spacing: -0.04em;
  background: var(--grad);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.brand-sub { font-size: 0.65rem; font-weight: 600; color: var(--subtle); letter-spacing: 0.12em; text-transform: uppercase; }
.search-shell { position: relative; }
.search-box {
  width: 280px; padding: 0.52rem 1rem 0.52rem 2.4rem;
  border: 1px solid var(--border-strong);
  border-radius: 99px; background: var(--surface-strong);
  font-family: 'DM Sans', sans-serif; font-size: 0.83rem; color: var(--slate); outline: none;
  transition: 0.2s; box-shadow: var(--shadow-sm);
}
.search-box:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(79,70,229,0.12); }
.search-box::placeholder { color: var(--subtle); }
.search-ico { position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); color: var(--subtle); font-size: 0.8rem; pointer-events: none; }
.search-drop {
  position: absolute; top: calc(100% + 8px); left: 0; width: 100%;
  background: var(--surface-strong); backdrop-filter: blur(20px);
  border: 1px solid var(--border-strong); border-radius: var(--radius);
  overflow: hidden; box-shadow: var(--shadow-lg); z-index: 300;
}
.search-row { display: flex; align-items: center; gap: 0.7rem; padding: 0.65rem 1rem; cursor: pointer; transition: background 0.15s; }
.search-row:hover { background: rgba(79,70,229,0.06); }
.search-row-name { font-size: 0.83rem; font-weight: 600; color: var(--slate); }
.search-row-meta { font-size: 0.7rem; color: var(--muted); }

.nav-right { display: flex; align-items: center; gap: 0.7rem; }
.nav-pill {
  padding: 0.38rem 1rem; border-radius: 99px;
  background: var(--surface-strong); border: 1px solid var(--border-strong);
  font-size: 0.75rem; font-weight: 700; color: var(--muted); cursor: pointer;
  transition: 0.18s;
}
.nav-pill:hover { background: rgba(79,70,229,0.08); color: var(--indigo); }
.nav-pill.active { background: var(--grad); color: white; border-color: transparent; box-shadow: 0 4px 12px rgba(79,70,229,0.3); }
.nav-avatar {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--grad); color: white;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 3px 12px rgba(79,70,229,0.3);
  transition: transform 0.15s, box-shadow 0.15s; overflow: hidden;
}
.nav-avatar:hover { transform: scale(1.08); }
.notif-btn {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--surface-strong); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  font-size: 0.9rem; position: relative; transition: 0.18s;
}
.notif-btn:hover { background: rgba(79,70,229,0.08); }
.notif-dot {
  position: absolute; top: 6px; right: 6px;
  width: 7px; height: 7px; background: var(--rose); border-radius: 50%;
  border: 1.5px solid white;
}

/* ── LAYOUT ── */
.layout { display: flex; min-height: calc(100vh - 62px); position: relative; z-index: 1; }

/* ── SIDEBAR ── */
.sidebar-panel {
  width: 340px; min-width: 340px;
  background: var(--surface); backdrop-filter: blur(24px);
  border-right: 1px solid var(--border);
  height: calc(100vh - 62px); position: sticky; top: 62px;
  overflow-y: auto; flex-shrink: 0;
}
.sidebar-panel.right { border-right: none; border-left: 1px solid var(--border); }

/* ── PANEL TOP ── */
.panel-top {
  padding: 1.5rem;
  background: var(--grad); position: relative; overflow: hidden;
}
.panel-top::before {
  content: ''; position: absolute; top: -50px; right: -50px;
  width: 160px; height: 160px; background: rgba(255,255,255,0.07); border-radius: 50%;
}
.panel-av {
  width: 48px; height: 48px; border-radius: 13px;
  background: rgba(255,255,255,0.18); border: 2px solid rgba(255,255,255,0.28);
  color: white; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.panel-uname { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: white; line-height: 1.2; }
.panel-handle { font-size: 0.7rem; color: rgba(255,255,255,0.55); margin-top: 2px; }
.panel-qual-badge {
  display: inline-flex; align-items: center; margin-top: 0.7rem;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.18);
  border-radius: 99px; padding: 0.22rem 0.7rem;
  font-size: 0.7rem; color: rgba(255,255,255,0.85); font-weight: 600; letter-spacing: 0.04em;
  position: relative; z-index: 1;
}
.edit-btn {
  padding: 0.3rem 0.8rem; border-radius: 9px;
  border: 1.5px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.9); font-size: 0.74rem; font-weight: 600; cursor: pointer;
  transition: 0.2s; flex-shrink: 0; font-family: 'DM Sans', sans-serif;
}
.edit-btn:hover { background: rgba(255,255,255,0.22); }
.close-x {
  padding: 0.28rem 0.72rem; border-radius: 9px;
  border: 1.5px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.8); font-size: 0.72rem; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: 0.2s;
}
.close-x:hover { background: rgba(220,38,38,0.4); }

/* ── FORM SECTIONS ── */
.form-section {
  padding: 1rem 1.4rem;
  border-bottom: 1px solid rgba(255,255,255,0.4);
}
.form-section-title {
  font-size: 0.67rem; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--indigo); opacity: 0.7; margin-bottom: 0.65rem;
}
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.form-field { display: flex; flex-direction: column; gap: 0.25rem; }
.form-label { font-size: 0.68rem; font-weight: 600; color: var(--muted); }
.form-input {
  padding: 0.5rem 0.85rem; border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong); background: rgba(255,255,255,0.6);
  font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: var(--slate); outline: none;
  transition: 0.2s;
}
.form-input:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(79,70,229,0.1); background: rgba(255,255,255,0.9); }
.form-input::placeholder { color: var(--subtle); }

.upload-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.4rem; width: 100%;
  padding: 0.6rem; border-radius: var(--radius-sm);
  border: 1.5px dashed rgba(79,70,229,0.3); background: rgba(79,70,229,0.03);
  color: var(--muted); font-size: 0.8rem; font-weight: 500; cursor: pointer;
  transition: 0.2s; font-family: 'DM Sans', sans-serif;
}
.upload-btn:hover { border-color: var(--indigo); color: var(--indigo); background: rgba(79,70,229,0.06); }

/* ── KNOW MORE ── */
.knowmore-section { padding: 1rem 1.4rem; border-bottom: 1px solid rgba(255,255,255,0.4); }
.knowmore-btn {
  display: flex; align-items: center; gap: 0.4rem;
  background: none; border: none; font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem; font-weight: 600; color: var(--indigo); cursor: pointer; transition: 0.2s;
}
.knowmore-btn:hover { opacity: 0.65; }
.details-box {
  margin-top: 0.75rem; background: rgba(255,255,255,0.6);
  border: 1px solid var(--border-strong); border-radius: var(--radius-sm); overflow: hidden;
}
.details-row {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.55rem 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.5);
  font-size: 0.8rem; color: var(--slate); font-weight: 500;
}
.details-row:last-child { border-bottom: none; }
.details-section-head {
  padding: 0.4rem 0.9rem; background: rgba(79,70,229,0.06);
  font-size: 0.66rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--indigo);
  border-bottom: 1px solid rgba(255,255,255,0.5);
}

/* ── FEEDS ── */
.feed-section { padding: 1rem 1.4rem; }
.feed-title {
  font-size: 0.67rem; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--indigo); opacity: 0.7; margin-bottom: 0.75rem;
}
.posts-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; }
.post-cell {
  aspect-ratio: 1; border-radius: 9px; overflow: hidden;
  position: relative; background: var(--border); border: 1px solid rgba(255,255,255,0.5);
}
.post-cell img, .post-cell video { width: 100%; height: 100%; object-fit: cover; }
.post-del {
  position: absolute; top: 4px; right: 4px; width: 20px; height: 20px;
  border-radius: 5px; background: rgba(255,255,255,0.92); border: none;
  color: var(--rose); font-size: 0.58rem; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: 0.15s;
}
.post-del:hover { background: var(--rose); color: white; }
.empty-feed { font-size: 0.78rem; color: var(--subtle); padding: 0.3rem 0; }
.h-divider { border: none; border-top: 1px solid rgba(255,255,255,0.5); }

/* ── RESUME ITEM ── */
.resume-item {
  display: flex; align-items: center; gap: 0.65rem;
  padding: 0.6rem 0.85rem; border-radius: var(--radius-sm);
  background: rgba(79,70,229,0.05); border: 1px solid rgba(79,70,229,0.12);
  margin-bottom: 0.5rem;
}
.resume-icon { font-size: 1.2rem; flex-shrink: 0; }
.resume-name { font-size: 0.8rem; font-weight: 600; color: var(--slate); flex: 1; }
.resume-del { background: none; border: none; color: var(--rose); cursor: pointer; font-size: 0.75rem; font-weight: 700; }
.resume-del:hover { text-decoration: underline; }

/* ── CHAT CTA ── */
.chat-cta {
  margin: 1rem 1.4rem; width: calc(100% - 2.8rem); padding: 0.68rem;
  border-radius: 99px; background: var(--grad);
  color: white; font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 700;
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  box-shadow: 0 4px 16px rgba(79,70,229,0.3); transition: 0.2s;
}
.chat-cta:hover { opacity: 0.88; transform: translateY(-1px); }

/* ── MAIN CONTENT ── */
.content { flex: 1; padding: 1.75rem 2rem; min-width: 0; overflow-y: auto; }
.page-section { margin-bottom: 2.5rem; }
.sec-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 1.1rem; }
.sec-title { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 800; color: var(--navy); }
.sec-sub { font-size: 0.76rem; color: var(--muted); margin-left: 0.5rem; font-weight: 500; }
.sec-link {
  font-size: 0.78rem; font-weight: 700; color: var(--indigo);
  background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: 0.2s;
}
.sec-link:hover { opacity: 0.65; }

/* ── JOB CARDS ── */
.jobs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.1rem; }
.job-card {
  background: var(--surface-strong); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden; cursor: pointer;
  box-shadow: var(--shadow-sm); transition: 0.25s;
}
.job-card:hover { box-shadow: var(--shadow-lg); border-color: rgba(79,70,229,0.25); transform: translateY(-3px); }
.job-img { width: 100%; height: 120px; object-fit: cover; display: block; }
.job-body { padding: 1rem; }
.job-company { font-size: 0.68rem; font-weight: 700; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.28rem; }
.job-title-text { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 0.5rem; line-height: 1.3; }
.job-tags { display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.6rem; }
.badge {
  display: inline-flex; align-items: center;
  padding: 0.16rem 0.55rem; border-radius: 99px;
  font-size: 0.66rem; font-weight: 700; border: 1.5px solid;
}
.job-salary { font-size: 0.76rem; color: var(--emerald); font-weight: 700; margin-bottom: 0.7rem; }
.apply-btn {
  width: 100%; padding: 0.5rem; border-radius: 99px;
  border: none; background: var(--grad); color: white;
  font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 700; cursor: pointer;
  box-shadow: 0 4px 12px rgba(79,70,229,0.22); transition: 0.2s;
}
.apply-btn:hover { opacity: 0.88; transform: translateY(-1px); }

/* ── INDUSTRY FEED ── */
.feed-grid { display: flex; flex-direction: column; gap: 1.25rem; }
.feed-card {
  background: var(--surface-strong); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden; cursor: pointer;
  box-shadow: var(--shadow-sm); transition: 0.25s;
}
.feed-card:hover { box-shadow: var(--shadow); border-color: rgba(79,70,229,0.2); }
.feed-img { width: 100%; height: 220px; object-fit: cover; display: block; }
.feed-body { padding: 1.4rem; }
.feed-owner-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.feed-owner-left { display: flex; align-items: center; gap: 0.7rem; }
.feed-logo {
  width: 42px; height: 42px; border-radius: 11px;
  background: rgba(79,70,229,0.1); color: var(--indigo);
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(79,70,229,0.15);
}
.feed-owner-name { font-weight: 700; font-size: 0.95rem; }
.feed-date { font-size: 0.72rem; color: var(--subtle); }
.type-chip {
  padding: 0.2rem 0.65rem; border-radius: 99px;
  font-size: 0.68rem; font-weight: 700;
}
.chip-internship { background: #ede9fe; color: #5b21b6; }
.chip-job { background: #e0f2fe; color: #0369a1; }
.chip-update { background: #dcfce7; color: #166534; }

/* ── APPLICATION STATUS ── */
.applications-list { display: flex; flex-direction: column; gap: 1rem; }
.app-card {
  background: var(--surface-strong); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.2rem;
  box-shadow: var(--shadow-sm);
}
.app-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
.app-role { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: var(--navy); }
.app-company { font-size: 0.78rem; color: var(--muted); font-weight: 600; margin-top: 3px; }
.status-pill { padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.72rem; font-weight: 700; }
.status-pending { background: #fef3c7; color: #b45309; }
.status-shortlisted { background: #e0e7ff; color: #3730a3; }
.status-selected { background: #dcfce7; color: #166534; }
.status-rejected { background: #fee2e2; color: #b91c1c; }
.app-meta { font-size: 0.78rem; color: var(--muted); line-height: 1.7; }

/* ── COURSES ── */
.courses-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }
.course-card {
  background: var(--surface-strong); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden; cursor: pointer;
  box-shadow: var(--shadow-sm); transition: 0.25s;
}
.course-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
.course-img-wrap { position: relative; }
.course-img { width: 100%; height: 105px; object-fit: cover; display: block; }
.level-chip {
  position: absolute; top: 7px; right: 7px;
  padding: 0.16rem 0.5rem; border-radius: 99px;
  font-size: 0.62rem; font-weight: 700; letter-spacing: 0.04em;
  text-transform: uppercase; border: 1.5px solid;
}
.course-body { padding: 0.9rem; }
.course-prov {
  font-size: 0.67rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.07em; background: var(--grad);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.28rem;
}
.course-name { font-family: 'Syne', sans-serif; font-size: 0.85rem; font-weight: 700; color: var(--navy); line-height: 1.3; margin-bottom: 0.5rem; }
.course-meta { display: flex; gap: 0.55rem; font-size: 0.7rem; color: var(--muted); margin-bottom: 0.75rem; }
.course-ft { display: flex; align-items: center; justify-content: space-between; }
.rating { display: flex; align-items: center; gap: 0.22rem; font-size: 0.78rem; font-weight: 700; color: var(--amber); }
.enroll-btn {
  padding: 0.35rem 0.82rem; border-radius: 99px; background: var(--grad);
  color: white; font-family: 'Syne', sans-serif; font-size: 0.7rem; font-weight: 700;
  border: none; cursor: pointer; box-shadow: 0 3px 8px rgba(79,70,229,0.25); transition: 0.2s;
}
.enroll-btn:hover { opacity: 0.85; transform: scale(1.05); }
.no-courses {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 2.5rem; text-align: center;
  color: var(--muted); font-size: 0.875rem;
}

/* ── DM PANEL ── */
.dm-panel {
  width: 340px; min-width: 340px;
  background: var(--surface); backdrop-filter: blur(24px);
  border-left: 1px solid var(--border);
  height: calc(100vh - 62px); position: sticky; top: 62px;
  display: flex; flex-direction: column; flex-shrink: 0;
}
.dm-head {
  padding: 1.2rem 1.4rem;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  background: var(--grad);
}
.dm-recipient { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: white; }
.dm-status { font-size: 0.7rem; color: rgba(255,255,255,0.5); margin-top: 2px; }
.online-dot { display: inline-block; width: 6px; height: 6px; background: #34d399; border-radius: 50%; margin-right: 4px; vertical-align: middle; }
.dm-body { flex: 1; padding: 1.1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.6rem; }
.bubble {
  max-width: 74%; padding: 0.62rem 0.9rem; border-radius: 14px;
  font-size: 0.82rem; line-height: 1.45;
}
.bubble.sent { background: var(--grad); color: white; align-self: flex-end; border-bottom-right-radius: 3px; box-shadow: 0 4px 12px rgba(79,70,229,0.22); }
.bubble.recv { background: rgba(255,255,255,0.8); color: var(--slate); border: 1px solid var(--border); align-self: flex-start; border-bottom-left-radius: 3px; }
.bubble-time { font-size: 0.64rem; opacity: 0.5; margin-top: 3px; }
.dm-empty { flex: 1; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 0.45rem; color: var(--subtle); font-size: 0.82rem; }
.dm-foot {
  padding: 0.9rem; border-top: 1px solid var(--border);
  display: flex; gap: 0.55rem; background: rgba(255,255,255,0.4);
}
.dm-input {
  flex: 1; padding: 0.6rem 0.9rem; border-radius: 99px;
  border: 1px solid var(--border-strong); background: var(--surface-strong);
  font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: var(--slate); outline: none; transition: 0.2s;
}
.dm-input:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(79,70,229,0.1); }
.dm-input::placeholder { color: var(--subtle); }
.send-btn {
  width: 40px; height: 40px; border-radius: 50%; background: var(--grad);
  border: none; color: white; font-size: 0.85rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(79,70,229,0.28); transition: 0.2s;
}
.send-btn:hover { opacity: 0.85; transform: scale(1.07); }

/* ── MODALS ── */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(15,23,42,0.65);
  backdrop-filter: blur(10px); display: flex; align-items: center;
  justify-content: center; z-index: 1000;
}
.modal-box {
  background: white; border-radius: 22px; padding: 2.2rem;
  width: 100%; max-width: 580px; max-height: 88vh; overflow-y: auto;
  position: relative; box-shadow: 0 25px 60px rgba(15,23,42,0.4);
}
.modal-close {
  position: absolute; top: 18px; right: 18px; width: 34px; height: 34px;
  border-radius: 50%; background: #f1f5f9; border: none; cursor: pointer;
  font-weight: 700; color: var(--muted); display: flex; align-items: center; justify-content: center;
  transition: 0.15s;
}
.modal-close:hover { background: #e2e8f0; }
.modal-title { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: var(--navy); margin-bottom: 0.4rem; }
.modal-sub { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.8rem; }
.field-label { font-size: 0.72rem; font-weight: 700; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.35rem; display: block; }
.field-input {
  width: 100%; padding: 0.75rem 1rem; border-radius: 11px;
  border: 1.5px solid rgba(148,163,184,0.3); background: #f8fafc;
  font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: var(--slate); outline: none;
  transition: 0.2s; margin-bottom: 1rem;
}
.field-input:focus { border-color: var(--indigo); background: white; box-shadow: 0 0 0 3px rgba(79,70,229,0.1); }
.field-input::placeholder { color: var(--subtle); }
.field-textarea { min-height: 100px; resize: none; }
.btn-primary {
  width: 100%; padding: 0.9rem; border-radius: 12px; border: none;
  background: var(--grad); color: white;
  font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer;
  box-shadow: 0 4px 16px rgba(79,70,229,0.3); transition: 0.2s;
}
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-secondary {
  width: 100%; padding: 0.75rem; border-radius: 12px; margin-top: 0.6rem;
  border: 1.5px solid rgba(148,163,184,0.3); background: transparent;
  color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 600; cursor: pointer;
  transition: 0.2s;
}
.btn-secondary:hover { background: #f1f5f9; }

/* ── NOTIFICATIONS ── */
.notif-toast {
  background: var(--navy); color: white; padding: 1rem 1.8rem; border-radius: 16px;
  box-shadow: 0 12px 32px rgba(15,23,42,0.3); font-size: 0.88rem; font-weight: 600;
  display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.08);
}
.notif-dot2 { width: 8px; height: 8px; background: var(--indigo-light); border-radius: 50%; flex-shrink: 0; }

/* ── INBOX NOTICE ── */
.inbox-banner {
  background: linear-gradient(135deg, rgba(79,70,229,0.07), rgba(124,58,237,0.05));
  border: 1px solid rgba(79,70,229,0.18); border-radius: var(--radius);
  padding: 1rem 1.3rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;
}
.inbox-banner-icon { font-size: 1.5rem; flex-shrink: 0; }
.inbox-banner-text { flex: 1; font-size: 0.83rem; color: var(--slate); font-weight: 500; line-height: 1.5; }
.inbox-banner-text strong { color: var(--indigo); }
`;

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function StudentDashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [activeUserProfile, setActiveUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("feed"); // feed | jobs | courses | applications
  const [notifications, setNotifications] = useState([]);
  const [applyModal, setApplyModal] = useState(null); // post being applied to
  const [applyForm, setApplyForm] = useState({ coverLetter: "" });
  const [postDetailModal, setPostDetailModal] = useState(null);
  const [feedLikes, setFeedLikes] = useState({});
  const [inboxMessages, setInboxMessages] = useState([
    { id: 1, from: "Global Tech Corp", fromId: 999, fromLogo: "GT", text: "Hi! We noticed your profile and would love to discuss the MERN Stack Intern role with you.", time: "10:30 AM", read: false },
    { id: 2, from: "Quantum AI", fromId: 2, fromLogo: "QA", text: "Your skills in Python are impressive. We have an opening that might suit you.", time: "Yesterday", read: true },
  ]);

  const [profile, setProfile] = useState({
    id: 1, name: "Rajat Kumar", username: "rajat123", qualification: "BCA",
    email: "rajat@test.com", phone: "1234567890", address: "City X",
    tenth: "School X", twelfth: "School Y", graduation: "College Z",
    photo: null, certificates: [], personalPosts: [], resumes: [],
    chats: {
      999: [{ sender: "Global Tech Corp", message: "Hi! We noticed your profile and would love to discuss the MERN Stack Intern role with you.", time: "10:30 AM" }],
      2: [{ sender: "Quantum AI", message: "Your skills in Python are impressive. We have an opening that might suit you.", time: "Yesterday" }],
    },
  });

  const [myApplications, setMyApplications] = useState([
    { id: 1, postId: 101, role: "MERN Stack Intern", company: "Global Tech Corp", appliedOn: "2 days ago", status: "Shortlisted", coverLetter: "I have been working with MERN stack for personal projects." },
  ]);

  const pushNotify = (msg) => {
    const id = Date.now();
    setNotifications(prev => [{ id, msg }, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const deletePost = (type, idx) => {
    const key = type === "certificate" ? "certificates" : "personalPosts";
    const arr = [...profile[key]];
    arr.splice(idx, 1);
    setProfile({ ...profile, [key]: arr });
  };

  const deleteResume = (idx) => {
    const arr = [...profile.resumes];
    arr.splice(idx, 1);
    setProfile({ ...profile, resumes: arr });
    pushNotify("Resume removed.");
  };

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendedCourses = mockCourses.filter(c => c.field === profile.qualification);

  const sendMessage = (toId, message) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const chats = { ...profile.chats };
    chats[toId] = [...(chats[toId] || []), { sender: profile.name, message, time }];
    setProfile({ ...profile, chats });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyModal) return;
    setMyApplications(prev => [...prev, {
      id: Date.now(), postId: applyModal.id,
      role: applyModal.title, company: applyModal.ownerName,
      appliedOn: "Just now", status: "Pending", coverLetter: applyForm.coverLetter,
    }]);
    setApplyForm({ coverLetter: "" });
    setApplyModal(null);
    setPostDetailModal(null);
    pushNotify(`Applied to ${applyModal.title} at ${applyModal.ownerName}!`);
  };

  const alreadyApplied = (postId) => myApplications.some(a => a.postId === postId);

  const unreadCount = inboxMessages.filter(m => !m.read).length;

  const Av = ({ name, photo, size = 48, r = 13 }) => photo
    ? <img src={photo} style={{ width: size, height: size, borderRadius: r, objectFit: "cover", flexShrink: 0 }} alt="" />
    : <div className="panel-av" style={{ width: size, height: size, borderRadius: r, fontSize: size * 0.38, flexShrink: 0 }}>{name[0]}</div>;

  const renderPanel = (user, editable = false) => (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div className="panel-top">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <Av name={user.name} photo={user.photo} size={48} r={13} />
            <div>
              <div className="panel-uname">{user.name}</div>
              <div className="panel-handle">@{user.username}</div>
            </div>
          </div>
          {editable
            ? <button className="edit-btn" onClick={() => setEditMode(!editMode)}>{editMode ? "✕ Close" : "✎ Edit"}</button>
            : <button className="close-x" onClick={() => setActiveUserProfile(null)}>✕ Close</button>
          }
        </div>
        <span className="panel-qual-badge">🎓 {user.qualification}</span>
      </div>

      {editable && editMode && (
        <>
          <div className="form-section">
            <div className="form-section-title">Profile Photo</div>
            <label className="upload-btn">
              📷 Change Photo
              <input type="file" style={{ display: "none" }} onChange={e => setProfile({ ...profile, photo: URL.createObjectURL(e.target.files[0]) })} />
            </label>
          </div>
          <div className="form-section">
            <div className="form-section-title">Personal Information</div>
            <div className="form-grid">
              {[
                { name: "qualification", label: "Qualification", placeholder: "e.g. BCA" },
                { name: "email", label: "Email", placeholder: "you@example.com" },
                { name: "phone", label: "Phone", placeholder: "10-digit" },
                { name: "address", label: "City / Address", placeholder: "Your city" },
              ].map(f => (
                <div className="form-field" key={f.name}>
                  <label className="form-label">{f.label}</label>
                  <input name={f.name} placeholder={f.placeholder} defaultValue={user[f.name]} onChange={handleChange} className="form-input" />
                </div>
              ))}
            </div>
          </div>
          <div className="form-section">
            <div className="form-section-title">Academic Background</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {[
                { name: "tenth", label: "10th School", placeholder: "School name" },
                { name: "twelfth", label: "12th School", placeholder: "School name" },
                { name: "graduation", label: "Graduation College", placeholder: "College name" },
              ].map(f => (
                <div className="form-field" key={f.name}>
                  <label className="form-label">{f.label}</label>
                  <input name={f.name} placeholder={f.placeholder} defaultValue={user[f.name]} onChange={handleChange} className="form-input" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="knowmore-section">
        <button className="knowmore-btn" onClick={() => setShowDetails(!showDetails)}>
          <span style={{ fontSize: "0.62rem" }}>{showDetails ? "▲" : "▼"}</span>
          {showDetails ? "Hide Details" : "View Candidate Details"}
        </button>
        {showDetails && (
          <div className="details-box" style={{ marginTop: "0.75rem" }}>
            <div className="details-row">✉ {user.email}</div>
            <div className="details-row">☎ {user.phone}</div>
            <div className="details-row">📍 {user.address}</div>
            <div className="details-section-head">Academic Background</div>
            <div className="details-row">🏫 10th — {user.tenth}</div>
            <div className="details-row">🏫 12th — {user.twelfth}</div>
            <div className="details-row">🎓 {user.graduation}</div>
          </div>
        )}
      </div>

      {editable && (
        <>
          <div className="form-section">
            <div className="form-section-title">Upload Resume (PDF / JPEG)</div>
            <label className="upload-btn">
              📄 Add Resume / CV
              <input type="file" accept=".pdf,image/jpeg,image/jpg,image/png" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const url = URL.createObjectURL(file);
                setProfile(prev => ({ ...prev, resumes: [...prev.resumes, { url, name: file.name, type: file.type, size: (file.size / 1024).toFixed(0) + " KB" }] }));
                pushNotify("Resume uploaded successfully!");
              }} />
            </label>
            {profile.resumes.length > 0 && (
              <div style={{ marginTop: "0.6rem" }}>
                {profile.resumes.map((r, i) => (
                  <div key={i} className="resume-item">
                    <span className="resume-icon">{r.type === "application/pdf" ? "📑" : "🖼️"}</span>
                    <span className="resume-name">{r.name} <span style={{ color: "var(--subtle)", fontWeight: 400 }}>({r.size})</span></span>
                    <button className="resume-del" onClick={() => deleteResume(i)}>✕ Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-section">
            <div className="form-section-title">Upload Certificate</div>
            <label className="upload-btn">
              ＋ Add Certificate
              <input type="file" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const url = URL.createObjectURL(file);
                setProfile(prev => ({ ...prev, certificates: [...prev.certificates, { url, type: file.type }] }));
              }} />
            </label>
          </div>
          <div className="form-section">
            <div className="form-section-title">Upload Event / Activity Post</div>
            <label className="upload-btn">
              ＋ Add Post
              <input type="file" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const url = URL.createObjectURL(file);
                setProfile(prev => ({ ...prev, personalPosts: [...prev.personalPosts, { url, type: file.type }] }));
              }} />
            </label>
          </div>
        </>
      )}

      <div className="feed-section">
        <div className="feed-title">Resumes on File</div>
        {!(user.resumes || []).length
          ? <div className="empty-feed">No resumes uploaded yet.</div>
          : (user.resumes || []).map((r, i) => (
            <div key={i} className="resume-item">
              <span className="resume-icon">{r.type === "application/pdf" ? "📑" : "🖼️"}</span>
              <span className="resume-name">{r.name}</span>
              {editable && <button className="resume-del" onClick={() => deleteResume(i)}>✕</button>}
            </div>
          ))
        }
      </div>

      <div className="feed-section">
        <div className="feed-title">Certificate Feed</div>
        {!(user.certificates || []).length
          ? <div className="empty-feed">No certificates uploaded yet.</div>
          : <div className="posts-grid">{(user.certificates || []).map((p, i) => (
            <div key={i} className="post-cell">
              {editable && <button className="post-del" onClick={() => deletePost("certificate", i)}>✕</button>}
              {p.type.startsWith("video") ? <video src={p.url} /> : <img src={p.url} alt="" />}
            </div>
          ))}</div>
        }
      </div>

      <hr className="h-divider" />

      <div className="feed-section">
        <div className="feed-title">Event / Activity Feed</div>
        {!(user.personalPosts || []).length
          ? <div className="empty-feed">No activity posts yet.</div>
          : <div className="posts-grid">{(user.personalPosts || []).map((p, i) => (
            <div key={i} className="post-cell">
              {editable && <button className="post-del" onClick={() => deletePost("personal", i)}>✕</button>}
              {p.type.startsWith("video") ? <video src={p.url} /> : <img src={p.url} alt="" />}
            </div>
          ))}</div>
        }
      </div>

      {!editable && (
        <div style={{ padding: "0.75rem 1.4rem", paddingTop: 0 }}>
          <div style={{ background: "rgba(79,70,229,0.06)", border: "1px solid rgba(79,70,229,0.15)", borderRadius: 11, padding: "0.75rem 1rem", fontSize: "0.78rem", color: "var(--muted)", textAlign: "center" }}>
            💬 Industry can message this student directly
          </div>
        </div>
      )}
    </div>
  );

  const chatList = [...mockIndustries.map(ind => ({
    id: ind.id, name: ind.name, logo: ind.logo, type: "industry",
    lastMsg: (profile.chats[ind.id] || []).slice(-1)[0]?.message || "No messages yet",
    unread: unreadCount > 0 && inboxMessages.some(m => !m.read && m.fromId === ind.id),
  }))];

  return (
    <>
      <style>{CSS}</style>
      <div className="noise" />

      {/* ── NAV ── */}
      <nav className="nav">
        <div>
          <div className="brand">Campus2Career</div>
          <div className="brand-sub">Student Portal</div>
        </div>

        <div className="search-shell">
          <span className="search-ico">🔍</span>
          <input className="search-box" placeholder="Search students..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          {searchQuery && (
            <div className="search-drop">
              {filteredUsers.length > 0
                ? filteredUsers.map(u => (
                  <div key={u.id} className="search-row" onClick={() => { setActiveUserProfile(u.id); setSearchQuery(""); }}>
                    <Av name={u.name} photo={u.photo} size={32} r={8} />
                    <div>
                      <div className="search-row-name">{u.name}</div>
                      <div className="search-row-meta">@{u.username} · {u.qualification}</div>
                    </div>
                  </div>
                ))
                : <div style={{ padding: "0.8rem 1rem", fontSize: "0.8rem", color: "var(--subtle)" }}>No students found.</div>
              }
            </div>
          )}
        </div>

        <div className="nav-right">
          {["feed", "jobs", "courses", "applications"].map(tab => (
            <button key={tab} className={`nav-pill ${activeTab === tab ? "active" : ""}`}
              onClick={() => { setActiveTab(tab); setShowProfile(false); setActiveChat(null); }}>
              {{ feed: "🏭 Industry Feed", jobs: "💼 Jobs", courses: "📚 Courses", applications: "📋 My Applications" }[tab]}
            </button>
          ))}
          <div className="notif-btn" onClick={() => { setActiveTab("inbox"); setShowProfile(false); setActiveChat(null); }}>
            💬
            {unreadCount > 0 && <div className="notif-dot" />}
          </div>
          <div className="nav-avatar" onClick={() => { setShowProfile(!showProfile); setActiveChat(null); }} title={profile.name}>
            {profile.photo ? <img src={profile.photo} style={{ width: 36, height: 36, objectFit: "cover" }} alt="" /> : profile.name[0]}
          </div>
        </div>
      </nav>

      <div className="layout">
        {/* Left panel: other student profiles */}
        <AnimatePresence>
          {activeUserProfile && (
            <motion.div className="sidebar-panel"
              initial={{ x: -340, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -340, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}>
              {renderPanel(mockUsers.find(u => u.id === activeUserProfile), false)}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN ── */}
        <main className="content">

          {/* INDUSTRY FEED */}
          {activeTab === "feed" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">Industry Feed</span><span className="sec-sub">Vacancies & updates from companies</span></div>
                </div>
                <div className="feed-grid">
                  {sharedVacancyFeed.map(post => (
                    <div key={post.id} className="feed-card">
                      {post.image && <img src={post.image} className="feed-img" alt="" />}
                      <div className="feed-body">
                        <div className="feed-owner-row">
                          <div className="feed-owner-left">
                            <div className="feed-logo">{post.ownerLogo}</div>
                            <div>
                              <div className="feed-owner-name">{post.ownerName}</div>
                              <div className="feed-date">{post.date}</div>
                            </div>
                          </div>
                          <span className={`type-chip ${post.type === "Internship" ? "chip-internship" : post.type === "Job Vacancy" ? "chip-job" : "chip-update"}`}>
                            {post.type}
                          </span>
                        </div>

                        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.5rem" }}>{post.title}</h3>
                        <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1rem" }}>{post.desc.length > 120 ? post.desc.substring(0, 120) + "..." : post.desc}</p>

                        {post.skills && (
                          <div style={{ marginBottom: "1rem" }}>
                            {post.skills.split(", ").slice(0, 4).map(s => (
                              <span key={s} style={{ display: "inline-block", background: "rgba(79,70,229,0.08)", color: "var(--indigo)", padding: "0.18rem 0.55rem", borderRadius: 99, fontSize: "0.7rem", fontWeight: 700, marginRight: "0.35rem", marginBottom: "0.35rem", border: "1px solid rgba(79,70,229,0.15)" }}>{s}</span>
                            ))}
                          </div>
                        )}

                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                          <button
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, color: feedLikes[post.id] ? "var(--indigo)" : "var(--muted)", display: "flex", alignItems: "center", gap: "5px" }}
                            onClick={() => setFeedLikes(prev => ({ ...prev, [post.id]: !prev[post.id] }))}>
                            {feedLikes[post.id] ? "💙" : "🤍"} {post.likes + (feedLikes[post.id] ? 1 : 0)}
                          </button>
                          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, color: "var(--muted)" }} onClick={() => setPostDetailModal(post)}>
                            👁️ View Details
                          </button>
                          {post.type !== "Update" && (
                            alreadyApplied(post.id)
                              ? <span style={{ marginLeft: "auto", background: "#dcfce7", color: "#166534", padding: "0.25rem 0.8rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 700 }}>✓ Applied</span>
                              : <button style={{ marginLeft: "auto" }} className="apply-btn" style={{ width: "auto", marginLeft: "auto", padding: "0.38rem 1rem", fontSize: "0.78rem" }}
                                  onClick={() => { setApplyModal(post); setPostDetailModal(null); }}>
                                  Apply Now →
                                </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* JOBS */}
          {activeTab === "jobs" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">Recommended Jobs</span></div>
                  <button className="sec-link">View All →</button>
                </div>
                <div className="jobs-grid">
                  {jobData.map((job, i) => (
                    <motion.div key={i} className="job-card" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                      <img className="job-img" src={job.image} alt={job.title} />
                      <div className="job-body">
                        <div className="job-company">{job.company}</div>
                        <div className="job-title-text">{job.title}</div>
                        <div className="job-tags">
                          {typeStyle[job.type] && <span className="badge" style={{ background: typeStyle[job.type].bg, color: typeStyle[job.type].color, borderColor: typeStyle[job.type].bg }}>{job.type}</span>}
                          <span className="badge" style={{ background: "rgba(255,255,255,0.6)", color: "var(--muted)", borderColor: "rgba(148,163,184,0.3)" }}>📍 {job.location}</span>
                        </div>
                        <div className="job-salary">₹ {job.salary}</div>
                        <button className="apply-btn">Apply Now</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* COURSES */}
          {activeTab === "courses" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">Recommended Courses</span><span className="sec-sub">Tailored for {profile.qualification}</span></div>
                  <button className="sec-link">Explore All →</button>
                </div>
                {recommendedCourses.length > 0
                  ? <div className="courses-grid">
                    {recommendedCourses.map(course => {
                      const lv = levelStyle[course.level] || levelStyle.Beginner;
                      return (
                        <motion.div key={course.id} className="course-card" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                          <div className="course-img-wrap">
                            <img className="course-img" src={course.image} alt={course.title} />
                            <span className="level-chip" style={{ background: lv.bg, color: lv.color, borderColor: lv.border }}>{course.level}</span>
                          </div>
                          <div className="course-body">
                            <div className="course-prov">{course.provider}</div>
                            <div className="course-name">{course.title}</div>
                            <div className="course-meta"><span>⏱ {course.duration}</span><span>· 👥 {course.students}</span></div>
                            <div className="course-ft">
                              <div className="rating"><span>★</span>{course.rating}</div>
                              <button className="enroll-btn">Enroll</button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  : <div className="no-courses">No courses available for your field yet.</div>
                }
              </div>
            </motion.div>
          )}

          {/* MY APPLICATIONS */}
          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">My Applications</span><span className="sec-sub">{myApplications.length} total</span></div>
                </div>
                {myApplications.length === 0
                  ? <div className="no-courses">You haven't applied to anything yet. Browse the Industry Feed to get started!</div>
                  : <div className="applications-list">
                    {myApplications.map(app => (
                      <div key={app.id} className="app-card">
                        <div className="app-card-header">
                          <div>
                            <div className="app-role">{app.role}</div>
                            <div className="app-company">{app.company}</div>
                          </div>
                          <span className={`status-pill status-${app.status.toLowerCase()}`}>{app.status}</span>
                        </div>
                        <div className="app-meta">
                          <strong>Applied:</strong> {app.appliedOn}<br />
                          <strong>Cover Letter:</strong> {app.coverLetter}
                        </div>
                        {app.status === "Shortlisted" && (
                          <div style={{ marginTop: "0.75rem", background: "rgba(79,70,229,0.06)", border: "1px solid rgba(79,70,229,0.15)", borderRadius: 10, padding: "0.7rem 0.9rem", fontSize: "0.8rem", color: "var(--indigo)", fontWeight: 600 }}>
                            🎉 You've been shortlisted! The company may reach out to you via messages.
                          </div>
                        )}
                        {app.status === "Selected" && (
                          <div style={{ marginTop: "0.75rem", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, padding: "0.7rem 0.9rem", fontSize: "0.8rem", color: "var(--emerald)", fontWeight: 600 }}>
                            ✅ Congratulations! You've been selected. Check messages for next steps.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                }
              </div>
            </motion.div>
          )}

          {/* INBOX */}
          {activeTab === "inbox" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="page-section">
                <div className="sec-head">
                  <div><span className="sec-title">Messages from Companies</span><span className="sec-sub">{unreadCount} unread</span></div>
                </div>
                <div className="inbox-banner">
                  <span className="inbox-banner-icon">ℹ️</span>
                  <div className="inbox-banner-text">
                    <strong>Note:</strong> Only companies can initiate conversations. You can reply to messages from companies who contact you directly.
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {inboxMessages.map(msg => (
                    <div key={msg.id}
                      style={{ background: msg.read ? "rgba(255,255,255,0.7)" : "rgba(79,70,229,0.05)", border: `1px solid ${msg.read ? "var(--border)" : "rgba(79,70,229,0.2)"}`, borderRadius: 16, padding: "1.1rem 1.3rem", cursor: "pointer", display: "flex", gap: "1rem", alignItems: "flex-start", transition: "0.2s" }}
                      onClick={() => { setActiveChat(msg.fromId); setInboxMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m)); }}>
                      <div style={{ width: 42, height: 42, borderRadius: 11, background: "var(--grad)", color: "white", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{msg.fromLogo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.28rem" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy)" }}>{msg.from}</span>
                          <span style={{ fontSize: "0.72rem", color: "var(--subtle)" }}>{msg.time}</span>
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5 }}>{msg.text}</p>
                      </div>
                      {!msg.read && <div style={{ width: 8, height: 8, background: "var(--indigo)", borderRadius: "50%", flexShrink: 0, marginTop: 4 }} />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>

        {/* Right panel: own profile */}
        <AnimatePresence>
          {showProfile && (
            <motion.div className="sidebar-panel right"
              initial={{ x: 340, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 340, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}>
              {renderPanel(profile, true)}
            </motion.div>
          )}
        </AnimatePresence>

        {/* DM Panel */}
        <AnimatePresence>
          {activeChat && (
            <motion.div className="dm-panel"
              initial={{ x: 340, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 340, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}>
              <div className="dm-head">
                <div>
                  <div className="dm-recipient">{mockIndustries.find(i => i.id === activeChat)?.name}</div>
                  <div className="dm-status"><span className="online-dot" />Company • Active</div>
                </div>
                <button className="close-x" onClick={() => setActiveChat(null)}>✕ Close</button>
              </div>
              <div className="dm-body">
                {!(profile.chats[activeChat] || []).length
                  ? <div className="dm-empty"><span style={{ fontSize: "1.8rem" }}>💬</span><span>No messages yet</span></div>
                  : (profile.chats[activeChat] || []).map((msg, i) => (
                    <div key={i} className={`bubble ${msg.sender === profile.name ? "sent" : "recv"}`}>
                      <div>{msg.message}</div>
                      <div className="bubble-time">{msg.time}</div>
                    </div>
                  ))
                }
              </div>
              <div className="dm-foot">
                <input id="chatInput2" className="dm-input" placeholder="Reply to company..."
                  onKeyDown={e => { if (e.key === "Enter" && e.target.value.trim()) { sendMessage(activeChat, e.target.value); e.target.value = ""; } }} />
                <button className="send-btn" onClick={() => {
                  const inp = document.getElementById("chatInput2");
                  if (!inp.value.trim()) return;
                  sendMessage(activeChat, inp.value); inp.value = "";
                }}>➤</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── POST DETAIL MODAL ── */}
      <AnimatePresence>
        {postDetailModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setPostDetailModal(null); }}>
            <motion.div className="modal-box" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}>
              <button className="modal-close" onClick={() => setPostDetailModal(null)}>✕</button>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 50, height: 50, borderRadius: 13, background: "rgba(79,70,229,0.1)", color: "var(--indigo)", fontFamily: "Syne, sans-serif", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{postDetailModal.ownerLogo}</div>
                <div>
                  <div className="modal-title" style={{ fontSize: "1.4rem" }}>{postDetailModal.title}</div>
                  <div style={{ color: "var(--indigo)", fontWeight: 700, fontSize: "0.85rem" }}>{postDetailModal.ownerName} · {postDetailModal.type}</div>
                </div>
              </div>
              {postDetailModal.image && <img src={postDetailModal.image} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 14, marginBottom: "1.5rem" }} alt="" />}
              <p style={{ lineHeight: 1.75, color: "var(--muted)", marginBottom: "1.5rem", fontSize: "0.88rem" }}>{postDetailModal.desc}</p>
              {postDetailModal.skills && (
                <div style={{ background: "#f8fafc", border: "1px solid var(--border)", borderRadius: 14, padding: "1.1rem 1.3rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div><div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--subtle)", marginBottom: 5, textTransform: "uppercase" }}>Required Skills</div><div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{postDetailModal.skills}</div></div>
                    <div><div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--subtle)", marginBottom: 5, textTransform: "uppercase" }}>Duration / Type</div><div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{postDetailModal.duration}</div></div>
                    <div style={{ gridColumn: "span 2" }}><div style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--subtle)", marginBottom: 5, textTransform: "uppercase" }}>What We Offer</div><div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--emerald)" }}>{postDetailModal.offerings}</div></div>
                  </div>
                </div>
              )}
              {postDetailModal.type !== "Update" && (
                alreadyApplied(postDetailModal.id)
                  ? <div style={{ textAlign: "center", padding: "0.9rem", background: "#dcfce7", borderRadius: 12, color: "#166534", fontWeight: 700 }}>✓ You've already applied to this position</div>
                  : <button className="btn-primary" onClick={() => { setApplyModal(postDetailModal); setPostDetailModal(null); }}>Apply for this Role</button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── APPLY MODAL ── */}
      <AnimatePresence>
        {applyModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setApplyModal(null); }}>
            <motion.div className="modal-box" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
              <button className="modal-close" onClick={() => setApplyModal(null)}>✕</button>
              <div className="modal-title">Apply Now</div>
              <div className="modal-sub">Applying to <strong>{applyModal.ownerName}</strong> for <strong>{applyModal.title}</strong></div>
              <form onSubmit={handleApplySubmit}>
                <label className="field-label">Your Name</label>
                <input className="field-input" value={profile.name} readOnly style={{ background: "#f8fafc", cursor: "not-allowed" }} />
                <label className="field-label">Email</label>
                <input className="field-input" value={profile.email} readOnly style={{ background: "#f8fafc", cursor: "not-allowed" }} />
                <label className="field-label">Resume to Attach</label>
                {profile.resumes.length > 0
                  ? <div style={{ marginBottom: "1rem" }}>
                    {profile.resumes.map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(79,70,229,0.05)", border: "1px solid rgba(79,70,229,0.15)", borderRadius: 10, padding: "0.5rem 0.8rem", marginBottom: "0.4rem" }}>
                        <span>{r.type === "application/pdf" ? "📑" : "🖼️"}</span>
                        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--slate)", flex: 1 }}>{r.name}</span>
                        <span style={{ fontSize: "0.7rem", background: "#dcfce7", color: "#166534", padding: "0.12rem 0.5rem", borderRadius: 99, fontWeight: 700 }}>Attached</span>
                      </div>
                    ))}
                  </div>
                  : <div style={{ marginBottom: "1rem", padding: "0.7rem", background: "#fff8e6", border: "1px solid #ffd97a", borderRadius: 10, fontSize: "0.8rem", color: "#9a6400", fontWeight: 600 }}>
                    ⚠️ No resume on file. Open your profile to upload one.
                  </div>
                }
                <label className="field-label">Cover Letter</label>
                <textarea required className={`field-input field-textarea`} placeholder="Explain why you're a great fit for this role..."
                  value={applyForm.coverLetter} onChange={e => setApplyForm({ ...applyForm, coverLetter: e.target.value })} />
                <button type="submit" className="btn-primary">Submit Application</button>
                <button type="button" className="btn-secondary" onClick={() => setApplyModal(null)}>Cancel</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NOTIFICATIONS ── */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 2000, display: "flex", flexDirection: "column", gap: "12px" }}>
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} className="notif-toast"
              initial={{ opacity: 0, x: 50, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div className="notif-dot2" />{n.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}