import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mockUsers = [
  {
    id: 2,
    name: "Simmi Sharma",
    username: "simmi456",
    photo: null,
    qualification: "MCA",
    email: "simmi@test.com",
    phone: "9876543210",
    address: "City A",
    tenth: "School A",
    twelfth: "School B",
    graduation: "College C",
    certificates: [
      { url: "https://source.unsplash.com/400x200/?certificate,award", type: "image/png" },
    ],
    personalPosts: [
      { url: "https://source.unsplash.com/400x200/?event,college", type: "image/png" },
    ],
  },
  {
    id: 3,
    name: "Ankit Verma",
    username: "ankit789",
    photo: null,
    qualification: "B.Tech",
    email: "ankit@test.com",
    phone: "8765432109",
    address: "City B",
    tenth: "School X",
    twelfth: "School Y",
    graduation: "College Z",
    certificates: [],
    personalPosts: [],
  },
];

const mockCourses = [
  { id: 1, title: "React.js Complete Guide", provider: "Udemy", duration: "40 hrs", level: "Intermediate", image: "https://source.unsplash.com/400x200/?react,programming", rating: 4.8, students: "125K", field: "BCA" },
  { id: 2, title: "Data Structures & Algorithms", provider: "Coursera", duration: "60 hrs", level: "Advanced", image: "https://source.unsplash.com/400x200/?algorithm,code", rating: 4.9, students: "200K", field: "BCA" },
  { id: 3, title: "Node.js Backend Development", provider: "Pluralsight", duration: "35 hrs", level: "Intermediate", image: "https://source.unsplash.com/400x200/?server,backend", rating: 4.7, students: "80K", field: "BCA" },
  { id: 4, title: "AWS Cloud Practitioner", provider: "AWS", duration: "20 hrs", level: "Beginner", image: "https://source.unsplash.com/400x200/?cloud,technology", rating: 4.6, students: "300K", field: "BCA" },
];

const jobData = [
  { title: "Frontend Developer", company: "TechCorp India", type: "Full-time", location: "Bangalore", tag: "react,web,developer", salary: "6–10 LPA" },
  { title: "Java Backend Engineer", company: "Infosys Ltd.", type: "Hybrid", location: "Pune", tag: "java,developer,code", salary: "5–9 LPA" },
  { title: "Data Analyst", company: "Analytics Co.", type: "Remote", location: "Mumbai", tag: "data,analytics,business", salary: "4–8 LPA" },
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

const EASE = [0.22, 1, 0.36, 1];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --purple-500: #8b5cf6;
  --purple-600: #7c3aed;
  --navy: #1e1b4b;
  --white: #ffffff;
  --bg: #f0f4ff;
  --bg2: #f8f6ff;
  --border: rgba(99,102,241,0.13);
  --border2: rgba(99,102,241,0.22);
  --text: #1e1b4b;
  --text2: #374151;
  --text3: #6b7280;
  --text4: #a5b4fc;
  --grad: linear-gradient(135deg, var(--blue-500), var(--purple-500));
  --grad-dark: linear-gradient(135deg, #1d4ed8, #7c3aed);
  --shadow-sm: 0 1px 4px rgba(99,102,241,0.08), 0 1px 2px rgba(99,102,241,0.04);
  --shadow: 0 4px 20px rgba(99,102,241,0.12), 0 1px 4px rgba(99,102,241,0.06);
  --shadow-lg: 0 12px 40px rgba(99,102,241,0.18), 0 2px 8px rgba(99,102,241,0.08);
  --radius: 20px;
  --radius-sm: 12px;
}

body {
  font-family: 'Outfit', sans-serif;
  background: linear-gradient(135deg, #dbeafe 0%, #f5f3ff 50%, #ede9fe 100%);
  min-height: 100vh;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 99px; }

/* ─── BACKGROUND BLOBS ─── */
.bg-blob-1 {
  position: fixed; top: -100px; left: -100px;
  width: 500px; height: 500px;
  background: rgba(99,102,241,0.12);
  border-radius: 50%; filter: blur(80px);
  pointer-events: none; z-index: 0;
}
.bg-blob-2 {
  position: fixed; bottom: -100px; right: -100px;
  width: 600px; height: 600px;
  background: rgba(139,92,246,0.10);
  border-radius: 50%; filter: blur(100px);
  pointer-events: none; z-index: 0;
}

/* ─── NAV ─── */
.nav {
  height: 66px;
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1.5px solid rgba(255,255,255,0.5);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem;
  position: sticky; top: 0; z-index: 100;
  box-shadow: 0 1px 20px rgba(99,102,241,0.08);
}

.brand {
  display: flex; align-items: center; gap: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #2563eb, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.search-shell { position: relative; }
.search-box {
  width: 300px; padding: 0.55rem 1rem 0.55rem 2.5rem;
  border: 1.5px solid var(--border2);
  border-radius: 99px;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
  font-family: 'Outfit', sans-serif; font-size: 0.85rem;
  color: var(--text); outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  box-shadow: var(--shadow-sm);
}
.search-box:focus {
  border-color: var(--blue-500);
  background: rgba(255,255,255,0.95);
  box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
}
.search-box::placeholder { color: var(--text4); }
.search-ico { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: var(--text4); font-size: 0.85rem; pointer-events: none; }

.search-drop {
  position: absolute; top: calc(100% + 10px); left: 0; width: 100%;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border: 1.5px solid var(--border2);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-lg); z-index: 200;
}
.search-row {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.7rem 1rem; cursor: pointer;
  transition: background 0.15s;
}
.search-row:hover { background: rgba(99,102,241,0.07); }
.search-row-name { font-size: 0.875rem; font-weight: 600; color: var(--text); }
.search-row-meta { font-size: 0.72rem; color: var(--text3); margin-top: 1px; }

.nav-right { display: flex; align-items: center; gap: 0.85rem; }
.nav-icon-btn {
  width: 38px; height: 38px; border-radius: 11px;
  border: 1.5px solid var(--border2);
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.95rem; color: var(--text2);
  transition: background 0.18s, border-color 0.18s, transform 0.15s;
}
.nav-icon-btn:hover {
  background: rgba(99,102,241,0.1);
  border-color: rgba(99,102,241,0.3);
  transform: scale(1.05);
}
.nav-avatar {
  width: 38px; height: 38px; border-radius: 11px;
  background: var(--grad);
  color: #fff;
  font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1rem;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(99,102,241,0.35);
  transition: transform 0.15s, box-shadow 0.15s;
}
.nav-avatar:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(99,102,241,0.45);
}

/* ─── LAYOUT ─── */
.layout { display: flex; min-height: calc(100vh - 66px); position: relative; z-index: 1; }

.sidebar-panel {
  width: 360px; min-width: 360px;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-right: 1.5px solid rgba(255,255,255,0.55);
  height: calc(100vh - 66px);
  position: sticky; top: 66px;
  overflow-y: auto; flex-shrink: 0;
  box-shadow: 4px 0 24px rgba(99,102,241,0.07);
}
.sidebar-panel.right {
  border-right: none;
  border-left: 1.5px solid rgba(255,255,255,0.55);
  box-shadow: -4px 0 24px rgba(99,102,241,0.07);
}

/* ─── PANEL TOP ─── */
.panel-top {
  padding: 1.6rem;
  background: var(--grad-dark);
  position: relative; overflow: hidden;
}
.panel-top::before {
  content: '';
  position: absolute; top: -60px; right: -60px;
  width: 200px; height: 200px;
  background: rgba(255,255,255,0.06);
  border-radius: 50%;
}
.panel-top::after {
  content: '';
  position: absolute; bottom: -30px; left: -30px;
  width: 120px; height: 120px;
  background: rgba(139,92,246,0.15);
  border-radius: 50%;
}
.panel-user-row { display: flex; align-items: flex-start; justify-content: space-between; position: relative; z-index: 1; }
.panel-user-left { display: flex; align-items: center; gap: 0.9rem; }
.panel-av {
  width: 52px; height: 52px; border-radius: 14px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.3);
  color: #fff;
  font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.3rem;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2); flex-shrink: 0;
}
.panel-uname {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem; font-weight: 700; color: #fff;
  line-height: 1.2;
}
.panel-handle { font-size: 0.74rem; color: rgba(255,255,255,0.55); margin-top: 3px; }
.panel-qual-badge {
  display: inline-flex; align-items: center; margin-top: 0.85rem;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 99px; padding: 0.25rem 0.75rem;
  font-size: 0.72rem; color: rgba(255,255,255,0.85);
  letter-spacing: 0.04em; font-weight: 600;
  position: relative; z-index: 1;
}

.edit-btn {
  padding: 0.35rem 0.85rem; border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.9);
  font-family: 'Outfit', sans-serif; font-size: 0.77rem; font-weight: 600;
  cursor: pointer; transition: background 0.2s; flex-shrink: 0;
}
.edit-btn:hover { background: rgba(255,255,255,0.22); }
.close-x {
  padding: 0.3rem 0.75rem; border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.8);
  font-size: 0.74rem; cursor: pointer;
  font-family: 'Outfit', sans-serif; transition: background 0.2s;
}
.close-x:hover { background: rgba(220,38,38,0.4); border-color: rgba(220,38,38,0.5); }

/* ─── FORM ─── */
.form-section {
  padding: 1.2rem 1.5rem;
  border-bottom: 1.5px solid rgba(255,255,255,0.4);
}
.form-section-title {
  font-size: 0.69rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(99,102,241,0.7); margin-bottom: 0.75rem;
}
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.55rem; }
.form-field { display: flex; flex-direction: column; gap: 0.28rem; }
.form-label { font-size: 0.71rem; font-weight: 600; color: var(--text3); }
.form-input {
  padding: 0.55rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--border2);
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  font-family: 'Outfit', sans-serif; font-size: 0.83rem;
  color: var(--text); outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.form-input:focus {
  border-color: var(--blue-500);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  background: rgba(255,255,255,0.9);
}
.form-input::placeholder { color: var(--text4); }

.upload-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.45rem; width: 100%;
  padding: 0.6rem;
  border-radius: var(--radius-sm);
  border: 1.5px dashed rgba(99,102,241,0.35);
  background: rgba(99,102,241,0.04);
  color: var(--text3);
  font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.upload-btn:hover {
  border-color: var(--blue-500);
  color: var(--blue-600);
  background: rgba(99,102,241,0.08);
}

/* ─── KNOW MORE ─── */
.knowmore-section {
  padding: 1.1rem 1.5rem;
  border-bottom: 1.5px solid rgba(255,255,255,0.4);
}
.knowmore-btn {
  display: flex; align-items: center; gap: 0.4rem;
  background: none; border: none;
  font-family: 'Outfit', sans-serif; font-size: 0.83rem; font-weight: 600;
  color: var(--blue-600); cursor: pointer; padding: 0;
  transition: opacity 0.2s;
}
.knowmore-btn:hover { opacity: 0.65; }
.details-box {
  margin-top: 0.8rem;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(12px);
  border: 1.5px solid var(--border2);
  border-radius: var(--radius-sm); overflow: hidden;
}
.details-row {
  display: flex; align-items: center; gap: 0.7rem;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  font-size: 0.83rem; color: var(--text2); font-weight: 500;
}
.details-row:last-child { border-bottom: none; }
.details-icon { font-size: 0.92rem; width: 20px; text-align: center; }
.details-section-head {
  padding: 0.45rem 1rem;
  background: rgba(99,102,241,0.07);
  font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--blue-600);
  border-bottom: 1px solid rgba(255,255,255,0.5);
}

/* ─── FEEDS ─── */
.feed-section { padding: 1.1rem 1.5rem; }
.feed-title {
  font-size: 0.69rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(99,102,241,0.7); margin-bottom: 0.8rem;
}
.posts-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; }
.post-cell {
  aspect-ratio: 1; border-radius: 10px; overflow: hidden;
  position: relative; background: var(--border);
  border: 1.5px solid rgba(255,255,255,0.5);
  box-shadow: var(--shadow-sm);
}
.post-cell img, .post-cell video { width: 100%; height: 100%; object-fit: cover; }
.post-del {
  position: absolute; top: 4px; right: 4px; width: 22px; height: 22px;
  border-radius: 6px; background: rgba(255,255,255,0.92); border: none; color: #dc2626;
  font-size: 0.6rem; display: flex; align-items: center; justify-content: center;
  cursor: pointer; box-shadow: var(--shadow-sm); transition: background 0.15s;
}
.post-del:hover { background: #dc2626; color: #fff; }
.empty-feed { font-size: 0.8rem; color: var(--text4); padding: 0.35rem 0; }
.h-divider { border: none; border-top: 1.5px solid rgba(255,255,255,0.5); }

.chat-cta {
  margin: 1rem 1.5rem; width: calc(100% - 3rem); padding: 0.72rem;
  border-radius: 99px;
  background: var(--grad);
  color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.875rem; font-weight: 700;
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  box-shadow: 0 4px 20px rgba(99,102,241,0.35);
  transition: opacity 0.2s, transform 0.15s;
}
.chat-cta:hover { opacity: 0.88; transform: translateY(-2px); }

/* ─── CONTENT ─── */
.content { flex: 1; padding: 2rem 2.5rem; min-width: 0; }
.page-section { margin-bottom: 2.5rem; }
.sec-head {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 1.25rem;
}
.sec-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem; font-weight: 800; color: var(--navy);
}
.sec-sub { font-size: 0.79rem; color: var(--text3); margin-left: 0.6rem; font-weight: 500; }
.sec-link {
  font-size: 0.8rem; font-weight: 700; color: var(--blue-600);
  background: none; border: none; cursor: pointer;
  font-family: 'Outfit', sans-serif; transition: opacity 0.2s;
}
.sec-link:hover { opacity: 0.65; }

/* ─── JOB CARDS ─── */
.jobs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.2rem; }
.job-card {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255,255,255,0.55);
  border-radius: var(--radius);
  overflow: hidden; cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
}
.job-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: rgba(99,102,241,0.3);
}
.job-img { width: 100%; height: 130px; object-fit: cover; display: block; }
.job-body { padding: 1.1rem; }
.job-company {
  font-size: 0.71rem; font-weight: 700; color: var(--text3);
  letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.3rem;
}
.job-title-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.02rem; font-weight: 700; color: var(--navy);
  margin-bottom: 0.55rem; line-height: 1.3;
}
.job-tags {
  display: flex; align-items: center; gap: 0.4rem;
  flex-wrap: wrap; margin-bottom: 0.7rem;
}
.badge {
  display: inline-flex; align-items: center;
  padding: 0.18rem 0.6rem; border-radius: 99px;
  font-size: 0.68rem; font-weight: 700; border: 1.5px solid;
}
.job-salary {
  font-size: 0.78rem; color: #059669; font-weight: 700; margin-bottom: 0.72rem;
}
.apply-btn {
  width: 100%; padding: 0.55rem; border-radius: 99px;
  border: 2px solid transparent;
  background: var(--grad);
  color: #fff;
  font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(99,102,241,0.25);
  transition: opacity 0.2s, transform 0.15s;
}
.apply-btn:hover { opacity: 0.85; transform: translateY(-1px); }

/* ─── COURSE CARDS ─── */
.courses-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.1rem; }
.course-card {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255,255,255,0.55);
  border-radius: var(--radius);
  overflow: hidden; cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
}
.course-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: rgba(139,92,246,0.3);
}
.course-img-wrap { position: relative; }
.course-img { width: 100%; height: 110px; object-fit: cover; display: block; }
.level-chip {
  position: absolute; top: 8px; right: 8px;
  padding: 0.18rem 0.55rem; border-radius: 99px;
  font-size: 0.63rem; font-weight: 700; letter-spacing: 0.05em;
  text-transform: uppercase; border: 1.5px solid;
  box-shadow: var(--shadow-sm);
}
.course-body { padding: 1rem; }
.course-prov {
  font-size: 0.69rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.07em;
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.32rem;
}
.course-name {
  font-family: 'Playfair Display', serif;
  font-size: 0.9rem; font-weight: 700; color: var(--navy);
  line-height: 1.35; margin-bottom: 0.6rem;
}
.course-meta {
  display: flex; gap: 0.6rem; font-size: 0.72rem;
  color: var(--text3); margin-bottom: 0.82rem; font-weight: 500;
}
.course-ft { display: flex; align-items: center; justify-content: space-between; }
.rating {
  display: flex; align-items: center; gap: 0.25rem;
  font-size: 0.82rem; font-weight: 700; color: #d97706;
}
.star { color: #f59e0b; }
.enroll-btn {
  padding: 0.38rem 0.9rem; border-radius: 99px;
  background: var(--grad);
  color: #fff;
  font-family: 'Outfit', sans-serif; font-size: 0.74rem; font-weight: 700;
  border: none; cursor: pointer;
  box-shadow: 0 3px 10px rgba(99,102,241,0.28);
  transition: opacity 0.2s, transform 0.15s;
}
.enroll-btn:hover { opacity: 0.85; transform: scale(1.05); }

/* ─── DM PANEL ─── */
.dm-panel {
  width: 360px; min-width: 360px;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1.5px solid rgba(255,255,255,0.55);
  height: calc(100vh - 66px);
  position: sticky; top: 66px;
  display: flex; flex-direction: column; flex-shrink: 0;
  box-shadow: -4px 0 24px rgba(99,102,241,0.07);
}
.dm-head {
  padding: 1.3rem 1.5rem;
  border-bottom: 1.5px solid rgba(255,255,255,0.4);
  display: flex; align-items: center; justify-content: space-between;
  background: var(--grad-dark);
}
.dm-recipient {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; font-weight: 700; color: #fff;
}
.dm-status { font-size: 0.72rem; color: rgba(255,255,255,0.5); margin-top: 2px; }
.online-dot {
  display: inline-block; width: 6px; height: 6px;
  background: #34d399; border-radius: 50%; margin-right: 4px;
  vertical-align: middle;
}
.dm-body {
  flex: 1; padding: 1.25rem;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 0.65rem;
}
.bubble {
  max-width: 74%; padding: 0.68rem 1rem;
  border-radius: 16px;
  font-size: 0.85rem; line-height: 1.45;
}
.bubble.sent {
  background: var(--grad);
  color: #fff; align-self: flex-end;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 14px rgba(99,102,241,0.25);
}
.bubble.recv {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
  color: var(--text);
  border: 1.5px solid rgba(255,255,255,0.6);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}
.bubble-time { font-size: 0.67rem; opacity: 0.5; margin-top: 3px; }
.dm-empty {
  flex: 1; display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 0.5rem; color: var(--text4); font-size: 0.85rem;
}
.dm-foot {
  padding: 1rem;
  border-top: 1.5px solid rgba(255,255,255,0.4);
  display: flex; gap: 0.6rem;
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
}
.dm-input {
  flex: 1; padding: 0.65rem 1rem; border-radius: 99px;
  border: 1.5px solid var(--border2);
  background: rgba(255,255,255,0.8);
  font-family: 'Outfit', sans-serif; font-size: 0.85rem;
  color: var(--text); outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.dm-input:focus {
  border-color: var(--blue-500);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
}
.dm-input::placeholder { color: var(--text4); }
.send-btn {
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--grad);
  border: none; color: #fff; font-size: 0.9rem;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(99,102,241,0.3);
  flex-shrink: 0; transition: opacity 0.2s, transform 0.15s;
}
.send-btn:hover { opacity: 0.85; transform: scale(1.07); }

.no-courses {
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255,255,255,0.5);
  border-radius: var(--radius);
  padding: 2.5rem; text-align: center;
  color: var(--text3); font-size: 0.875rem;
}
`;

export default function StudentDashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [activeUserProfile, setActiveUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses] = useState(mockCourses);

  const [profile, setProfile] = useState({
    id: 1, name: "Rajat Kumar", username: "rajat123", qualification: "BCA",
    email: "rajat@test.com", phone: "1234567890", address: "City X",
    tenth: "School X", twelfth: "School Y", graduation: "College Z",
    photo: null, certificates: [], personalPosts: [], chats: {},
  });

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const deletePost = (type, idx) => {
    const key = type === "certificate" ? "certificates" : "personalPosts";
    const arr = [...profile[key]];
    arr.splice(idx, 1);
    setProfile({ ...profile, [key]: arr });
  };

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendedCourses = courses.filter(c => c.field === profile.qualification);

  const sendMessage = (friendId, message) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const chats = profile.chats[friendId] || [];
    setProfile({ ...profile, chats: { ...profile.chats, [friendId]: [...chats, { sender: profile.name, message, time }] } });
  };

  const Av = ({ name, photo, size = 52, r = 14 }) => photo
    ? <img src={photo} style={{ width: size, height: size, borderRadius: r, objectFit: "cover", flexShrink: 0 }} />
    : <div className="panel-av" style={{ width: size, height: size, borderRadius: r, fontSize: size * 0.38, flexShrink: 0 }}>{name[0]}</div>;

  const renderPanel = (user, editable = false) => (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div className="panel-top">
        <div className="panel-user-row">
          <div className="panel-user-left">
            <Av name={user.name} photo={user.photo} size={52} r={14} />
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
              📷&nbsp; Change Photo
              <input type="file" style={{ display: "none" }} onChange={e =>
                setProfile({ ...profile, photo: URL.createObjectURL(e.target.files[0]) })
              } />
            </label>
          </div>
          <div className="form-section">
            <div className="form-section-title">Personal Information</div>
            <div className="form-grid">
              {[
                { name: "qualification", label: "Qualification", placeholder: "e.g. BCA" },
                { name: "email", label: "Email Address", placeholder: "you@example.com" },
                { name: "phone", label: "Phone Number", placeholder: "10-digit" },
                { name: "address", label: "City / Address", placeholder: "Your city" },
              ].map(f => (
                <div className="form-field" key={f.name}>
                  <label className="form-label">{f.label}</label>
                  <input name={f.name} placeholder={f.placeholder} onChange={handleChange} className="form-input" />
                </div>
              ))}
            </div>
          </div>
          <div className="form-section">
            <div className="form-section-title">Academic Background</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.52rem" }}>
              {[
                { name: "tenth", label: "10th School", placeholder: "School name" },
                { name: "twelfth", label: "12th School", placeholder: "School name" },
                { name: "graduation", label: "Graduation College", placeholder: "College name" },
              ].map(f => (
                <div className="form-field" key={f.name}>
                  <label className="form-label">{f.label}</label>
                  <input name={f.name} placeholder={f.placeholder} onChange={handleChange} className="form-input" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="knowmore-section">
        <button className="knowmore-btn" onClick={() => setShowDetails(!showDetails)}>
          <span style={{ fontSize: "0.65rem" }}>{showDetails ? "▲" : "▼"}</span>
          {showDetails ? "Hide Candidate Details" : "View Candidate Details"}
        </button>
        {showDetails && (
          <div className="details-box" style={{ marginTop: "0.8rem" }}>
            <div className="details-row"><span className="details-icon">✉</span>{user.email}</div>
            <div className="details-row"><span className="details-icon">☎</span>{user.phone}</div>
            <div className="details-row"><span className="details-icon">📍</span>{user.address}</div>
            <div className="details-section-head">Academic Background</div>
            <div className="details-row"><span className="details-icon">🏫</span>10th — {user.tenth}</div>
            <div className="details-row"><span className="details-icon">🏫</span>12th — {user.twelfth}</div>
            <div className="details-row"><span className="details-icon">🎓</span>{user.graduation}</div>
          </div>
        )}
      </div>

      {editable && (
        <>
          <div className="form-section">
            <div className="form-section-title">Upload Certificate</div>
            <label className="upload-btn">
              ＋&nbsp; Add Certificate
              <input type="file" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const url = URL.createObjectURL(file);
                const caption = prompt("Caption for this certificate:");
                setProfile({ ...profile, certificates: [...profile.certificates, { url, type: file.type, caption }] });
              }} />
            </label>
          </div>
          <div className="form-section">
            <div className="form-section-title">Upload Event / Activity Post</div>
            <label className="upload-btn">
              ＋&nbsp; Add Post
              <input type="file" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0]; if (!file) return;
                const url = URL.createObjectURL(file);
                const caption = prompt("Caption for this post:");
                setProfile({ ...profile, personalPosts: [...profile.personalPosts, { url, type: file.type, caption }] });
              }} />
            </label>
          </div>
        </>
      )}

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
        <button className="chat-cta" onClick={() => setActiveChat(user.id)}>
          💬&nbsp; Message {user.name.split(" ")[0]}
        </button>
      )}
    </div>
  );

  return (
    <>
      <style>{CSS}</style>

      <div className="bg-blob-1" />
      <div className="bg-blob-2" />

      <nav className="nav">
        <button
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          onClick={() => {}}
        >
          <span className="brand">Campus2Career</span>
        </button>

        <div className="search-shell">
          <span className="search-ico">🔍</span>
          <input
            className="search-box"
            placeholder="Search students by name or username..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="search-drop">
              {filteredUsers.length > 0
                ? filteredUsers.map(u => (
                  <div key={u.id} className="search-row" onClick={() => { setActiveUserProfile(u.id); setSearchQuery(""); }}>
                    <Av name={u.name} photo={u.photo} size={34} r={9} />
                    <div>
                      <div className="search-row-name">{u.name}</div>
                      <div className="search-row-meta">@{u.username} · {u.qualification}</div>
                    </div>
                  </div>
                ))
                : <div style={{ padding: "0.85rem 1rem", fontSize: "0.83rem", color: "var(--text4)" }}>No students found.</div>
              }
            </div>
          )}
        </div>

        <div className="nav-right">
          <div className="nav-icon-btn" title="Notifications">🔔</div>
          <div
            className="nav-avatar"
            onClick={() => setShowProfile(!showProfile)}
            title={`${profile.name}'s Profile`}
          >
            {profile.photo
              ? <img src={profile.photo} style={{ width: 38, height: 38, borderRadius: 11, objectFit: "cover" }} />
              : profile.name[0]
            }
          </div>
        </div>
      </nav>

      <div className="layout">
        <AnimatePresence>
          {activeUserProfile && (
            <motion.div
              className="sidebar-panel"
              initial={{ x: -360, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -360, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              {renderPanel(mockUsers.find(u => u.id === activeUserProfile), false)}
            </motion.div>
          )}
        </AnimatePresence>

        <main className="content">
          <div className="page-section">
            <div className="sec-head">
              <div><span className="sec-title">Recommended Jobs</span></div>
              <button className="sec-link">View All Listings →</button>
            </div>
            <div className="jobs-grid">
              {jobData.map((job, i) => (
                <motion.div
                  key={i} className="job-card"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <img className="job-img" src={`https://source.unsplash.com/400x200/?${job.tag}`} alt={job.title} />
                  <div className="job-body">
                    <div className="job-company">{job.company}</div>
                    <div className="job-title-text">{job.title}</div>
                    <div className="job-tags">
                      {typeStyle[job.type] && (
                        <span className="badge" style={{ background: typeStyle[job.type].bg, color: typeStyle[job.type].color, borderColor: typeStyle[job.type].bg }}>
                          {job.type}
                        </span>
                      )}
                      <span className="badge" style={{ background: "rgba(255,255,255,0.6)", color: "var(--text3)", borderColor: "rgba(255,255,255,0.5)" }}>
                        📍 {job.location}
                      </span>
                    </div>
                    <div className="job-salary">₹ {job.salary}</div>
                    <button className="apply-btn">Apply Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="page-section">
            <div className="sec-head">
              <div>
                <span className="sec-title">Recommended Courses</span>
                <span className="sec-sub">Tailored for your {profile.qualification} background</span>
              </div>
              <button className="sec-link">Explore All →</button>
            </div>
            {recommendedCourses.length > 0
              ? <div className="courses-grid">
                {recommendedCourses.map(course => {
                  const lv = levelStyle[course.level] || levelStyle.Beginner;
                  return (
                    <motion.div
                      key={course.id} className="course-card"
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    >
                      <div className="course-img-wrap">
                        <img className="course-img" src={course.image} alt={course.title} />
                        <span className="level-chip" style={{ background: lv.bg, color: lv.color, borderColor: lv.border }}>{course.level}</span>
                      </div>
                      <div className="course-body">
                        <div className="course-prov">{course.provider}</div>
                        <div className="course-name">{course.title}</div>
                        <div className="course-meta">
                          <span>⏱ {course.duration}</span>
                          <span>· 👥 {course.students}</span>
                        </div>
                        <div className="course-ft">
                          <div className="rating"><span className="star">★</span>{course.rating}</div>
                          <button className="enroll-btn">Enroll Now</button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              : <div className="no-courses">No courses available for your field yet. Check back soon!</div>
            }
          </div>
        </main>

        <AnimatePresence>
          {showProfile && (
            <motion.div
              className="sidebar-panel right"
              initial={{ x: 360, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 360, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              {renderPanel(profile, true)}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeChat && (
            <motion.div
              className="dm-panel"
              initial={{ x: 360, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 360, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              <div className="dm-head">
                <div>
                  <div className="dm-recipient">{mockUsers.find(u => u.id === activeChat)?.name}</div>
                  <div className="dm-status"><span className="online-dot" />Active now</div>
                </div>
                <button className="close-x" onClick={() => setActiveChat(null)}>✕ Close</button>
              </div>
              <div className="dm-body">
                {!(profile.chats[activeChat] || []).length
                  ? <div className="dm-empty"><span style={{ fontSize: "2rem" }}>👋</span><span>Say hello to start a conversation</span></div>
                  : (profile.chats[activeChat] || []).map((msg, i) => (
                    <div key={i} className={`bubble ${msg.sender === profile.name ? "sent" : "recv"}`}>
                      <div>{msg.message}</div>
                      <div className="bubble-time">{msg.time}</div>
                    </div>
                  ))
                }
              </div>
              <div className="dm-foot">
                <input
                  id="chatInput" className="dm-input" placeholder="Write a message..."
                  onKeyDown={e => { if (e.key === "Enter" && e.target.value.trim()) { sendMessage(activeChat, e.target.value); e.target.value = ""; } }}
                />
                <button className="send-btn" onClick={() => {
                  const inp = document.getElementById("chatInput");
                  if (!inp.value.trim()) return;
                  sendMessage(activeChat, inp.value); inp.value = "";
                }}>➤</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}