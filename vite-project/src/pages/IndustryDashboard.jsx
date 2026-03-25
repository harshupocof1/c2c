import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── GLOBAL DATA ─────────────────────────────────────────────────────────────

const MOCK_INDUSTRIES = [
  { id: 1, name: "TechNova Solutions", tagline: "Cloud Native Excellence", domain: "Cloud Computing", location: "Bangalore", email: "contact@technova.com", contact: "+91 8888 7777", website: "www.technova.com", employees: "500+", logo: "TN", bio: "Leading the way in serverless architecture.", about: "Specializing in AWS and Azure migrations. We build resilient and scalable cloud infrastructures for enterprise clients globally.", address: "123 Tech Park, Whitefield, Bangalore", industry: "Cloud Computing", founded: "2015", profilePic: null, achievements: ["Best Startup 2023", "Cloud Partner of the Year"] },
  { id: 2, name: "Quantum AI", tagline: "Pioneering Artificial Intelligence", domain: "Artificial Intelligence", location: "Hyderabad", email: "hello@quantumai.in", contact: "+91 9999 0000", website: "www.quantumai.in", employees: "150+", logo: "QA", bio: "Building the next generation of neural networks.", about: "Focusing on NLP and Computer Vision. Our research is backed by top-tier universities.", address: "AI Enclave, HITEC City, Hyderabad", industry: "Artificial Intelligence", founded: "2018", profilePic: null, achievements: ["Top Innovator 2025"] },
  { id: 3, name: "Nexus Fintech", tagline: "Next-Gen Financial Systems", domain: "Blockchain", location: "Mumbai", email: "info@nexusfin.com", contact: "+91 7777 6666", website: "www.nexusfin.com", employees: "200+", logo: "NF", bio: "Decentralizing the future of banking.", about: "Experts in Ethereum and Solana smart contracts.", address: "Finance Tower, BKC, Mumbai", industry: "Fintech", founded: "2019", profilePic: null, achievements: ["Fintech Shield Award"] },
  { id: 4, name: "GreenEnergy Co", tagline: "Sustainable Power Solutions", domain: "Sustainability", location: "Pune", email: "green@energyco.in", contact: "+91 5555 4444", website: "www.greenenergy.co.in", employees: "50+", logo: "GE", bio: "Clean energy solutions for a better tomorrow.", about: "Developing solar-grid management software.", address: "Green Hill, Baner, Pune", industry: "Sustainability", founded: "2020", profilePic: null, achievements: ["Eco-Impact 2024"] },
];

// Simulated student profiles — these are students who uploaded resumes/profile
const MOCK_STUDENTS = [
  {
    id: 201, name: "Rajat Kumar", email: "rajat.k@email.com", contact: "+91 9876512345",
    about: "Passionate Full Stack Developer specializing in MERN stack. Love building scalable web apps.",
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    match: 98, rank: "Top 1%",
    experience: "6 months intern at WebDev Studio",
    certificates: ["AWS Cloud Practitioner", "React Advanced Concepts"],
    profilePic: null,
    qualification: "BCA",
    college: "Delhi University",
    resumes: [
      { name: "Rajat_Kumar_Resume.pdf", type: "application/pdf", size: "245 KB", preview: null }
    ],
    personalPosts: [
      { url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=400&fit=crop", type: "image/png", caption: "Hackathon 2024 - First Place!" },
      { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=400&fit=crop", type: "image/png", caption: "Team project demo day." },
    ],
    certImages: [
      { url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop", type: "image/png", caption: "AWS Certificate" }
    ],
    applications: [{ postId: 1, role: "MERN Stack Intern", status: "Shortlisted" }],
  },
  {
    id: 202, name: "Simmi Sharma", email: "simmi.data@email.com", contact: "+91 8765432109",
    about: "Data enthusiast with a strong mathematical background. Exploring Deep Learning architectures.",
    skills: ["Python", "TensorFlow", "SQL", "Pandas", "Scikit-Learn"],
    match: 94, rank: "Top 5%",
    experience: "Research Assistant at University AI Lab",
    certificates: ["Deep Learning Specialization (Coursera)"],
    profilePic: null,
    qualification: "MCA",
    college: "Pune University",
    resumes: [
      { name: "Simmi_Sharma_CV.pdf", type: "application/pdf", size: "189 KB", preview: null }
    ],
    personalPosts: [
      { url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=400&fit=crop", type: "image/png", caption: "ML Research Conference" },
    ],
    certImages: [],
    applications: [],
  },
  {
    id: 203, name: "Ankit Verma", email: "ankit.design@email.com", contact: "+91 7654321098",
    about: "Creative UI/UX designer focusing on user-centered design and micro-interactions.",
    skills: ["UI/UX", "Figma", "Adobe XD", "Framer", "CSS"],
    match: 89, rank: "Top 10%",
    experience: "Freelance Designer (2 years)",
    certificates: ["Google UX Design Certificate"],
    profilePic: null,
    qualification: "B.Tech",
    college: "BITS Pilani",
    resumes: [
      { name: "Ankit_Portfolio_Resume.jpg", type: "image/jpeg", size: "380 KB", preview: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" }
    ],
    personalPosts: [
      { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop", type: "image/png", caption: "UI project - SaaS dashboard redesign" },
      { url: "https://images.unsplash.com/photo-1609921205586-7e8a57516512?w=400&h=400&fit=crop", type: "image/png", caption: "Workshop: Design Thinking" },
    ],
    certImages: [
      { url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop", type: "image/png", caption: "Google UX Design" }
    ],
    applications: [{ postId: 5, role: "Senior Product Designer", status: "Pending" }],
  },
  {
    id: 204, name: "Priya Das", email: "priya.backend@email.com", contact: "+91 6543210987",
    about: "Backend engineer focused on highly available microservices and robust API design.",
    skills: ["Java", "Spring Boot", "AWS", "Docker", "Kubernetes"],
    match: 85, rank: "Top 15%",
    experience: "1 year Junior Backend Dev at TechCorp",
    certificates: ["Oracle Certified Associate, Java SE 8"],
    profilePic: null,
    qualification: "B.Tech",
    college: "NIT Trichy",
    resumes: [],
    personalPosts: [],
    certImages: [],
    applications: [],
  },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Satoshi:wght@300;400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --primary: #5b5ef4;
  --primary-dark: #4338ca;
  --primary-light: #818cf8;
  --success: #059669;
  --danger: #e11d48;
  --warning: #d97706;
  --bg: #f0f2ff;
  --card: #ffffff;
  --text: #0f172a;
  --text-muted: #64748b;
  --border: #e5e8ff;
  --border-strong: rgba(91,94,244,0.2);
  --surface: rgba(255,255,255,0.85);
}

* { box-sizing: border-box; }
body { font-family: 'Outfit', sans-serif; background: var(--bg); min-height: 100vh; color: var(--text); }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-thumb { background: rgba(91,94,244,0.2); border-radius: 99px; }

.industry-app { display: flex; min-height: 100vh; }

/* ── SIDEBAR ── */
.sidebar {
  width: 290px; background: var(--card); border-right: 1px solid var(--border);
  display: flex; flex-direction: column; padding: 2.2rem 1.6rem;
  height: 100vh; position: sticky; top: 0; z-index: 100;
}
.brand-name { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--primary); }
.brand-sub { font-size: 0.68rem; font-weight: 800; color: #94a3b8; letter-spacing: 2px; margin-top: 3px; }
.nav-link {
  padding: 1rem; border-radius: 14px; cursor: pointer; margin-bottom: 0.6rem;
  transition: all 0.25s; font-weight: 600; display: flex; align-items: center;
  gap: 12px; color: var(--text-muted); font-size: 0.9rem;
}
.nav-link.active { background: #eef2ff; color: var(--primary); }
.nav-link:hover:not(.active) { background: #f8fafc; color: var(--text); transform: translateX(4px); }
.nav-badge {
  margin-left: auto; background: var(--primary); color: white;
  font-size: 0.65rem; font-weight: 800; padding: 2px 7px; border-radius: 99px;
}

/* ── MAIN ── */
.main-stage { flex: 1; padding: 3rem 3.5rem; max-width: 1280px; margin: 0 auto; }

/* ── CARDS ── */
.post-card {
  background: white; border-radius: 24px; padding: 2rem;
  border: 1px solid var(--border); margin-bottom: 2rem;
  position: relative; transition: box-shadow 0.25s;
}
.post-card:hover { box-shadow: 0 8px 30px rgba(91,94,244,0.1); }
.vacancy-img { width: 100%; height: 260px; object-fit: cover; border-radius: 18px; margin-bottom: 1.5rem; }

/* ── BUTTONS ── */
.btn-filled {
  background: var(--primary); color: white; border: none;
  padding: 0.85rem 1.6rem; border-radius: 14px; font-weight: 700; cursor: pointer;
  transition: 0.2s; display: inline-flex; align-items: center; gap: 8px; font-family: inherit;
  font-size: 0.88rem;
}
.btn-filled:hover { background: var(--primary-dark); transform: translateY(-1px); }
.btn-outline {
  background: transparent; color: var(--primary); border: 2px solid var(--primary);
  padding: 0.7rem 1.3rem; border-radius: 14px; font-weight: 700; cursor: pointer;
  transition: 0.2s; font-family: inherit; font-size: 0.88rem;
}
.btn-outline:hover { background: var(--primary); color: white; }
.remove-post-btn {
  position: absolute; top: 22px; right: 22px;
  background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3;
  padding: 6px 14px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: 0.2s;
}
.remove-post-btn:hover { background: #e11d48; color: white; }

/* ── INPUTS ── */
.edit-input {
  width: 100%; padding: 0.95rem 1rem; border: 1.5px solid var(--border);
  border-radius: 13px; margin-top: 8px; font-family: inherit; font-size: 0.88rem;
  outline: none; transition: 0.25s; color: var(--text); background: #fafbff;
}
.edit-input:focus { border-color: var(--primary); background: white; box-shadow: 0 0 0 3px rgba(91,94,244,0.1); }

/* ── PROFILE ── */
.profile-header {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  height: 220px; border-radius: 30px; position: relative;
  margin-bottom: 6rem; box-shadow: 0 20px 50px -10px rgba(67,56,202,0.3);
}
.profile-pic-container {
  position: absolute; bottom: -50px; left: 50px;
  width: 150px; height: 150px; background: white; border-radius: 40px;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 6px solid white;
}
.profile-pic-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.5); color: white;
  display: flex; align-items: center; justify-content: center; opacity: 0;
  cursor: pointer; transition: 0.25s; font-size: 0.75rem; font-weight: 700;
}
.profile-pic-container:hover .profile-pic-overlay { opacity: 1; }

/* ── BADGES ── */
.badge { display: inline-block; padding: 4px 11px; border-radius: 9px; font-size: 0.72rem; font-weight: 800; }
.badge-vacancy { background: #eef2ff; color: var(--primary); }
.badge-update { background: #f0fdf4; color: var(--success); }
.badge-internship { background: #fdf4ff; color: #9333ea; }
.status-badge { padding: 5px 13px; border-radius: 18px; font-size: 0.75rem; font-weight: 700; }
.status-pending { background: #fef3c7; color: #b45309; }
.status-shortlisted { background: #e0e7ff; color: #3730a3; }
.status-selected { background: #dcfce7; color: #166534; }

/* ── COMMENTS ── */
.comment-section { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1.5px dashed var(--border); }
.comment-bubble { background: #f8fafc; padding: 0.9rem 1.2rem; border-radius: 16px; margin-bottom: 10px; position: relative; }
.comment-user { font-weight: 800; color: var(--primary); font-size: 0.82rem; }
.comment-delete { color: var(--danger); font-size: 0.72rem; font-weight: 700; cursor: pointer; background: none; border: none; }

/* ── MODALS ── */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(15,23,42,0.65);
  backdrop-filter: blur(10px); display: flex; align-items: center;
  justify-content: center; z-index: 9999;
}
.modal-content {
  background: white; border-radius: 28px; padding: 2.8rem;
  width: 100%; max-width: 640px; max-height: 90vh;
  overflow-y: auto; position: relative; box-shadow: 0 25px 60px rgba(0,0,0,0.4);
}
.close-modal-btn {
  position: absolute; top: 22px; right: 22px; background: #f1f5f9; border: none;
  width: 38px; height: 38px; border-radius: 50%; display: flex;
  align-items: center; justify-content: center; cursor: pointer;
  font-weight: bold; color: var(--text-muted); transition: 0.15s;
}
.close-modal-btn:hover { background: #e2e8f0; }

/* ── STUDENT CARD ── */
.student-card {
  background: white; border-radius: 20px; padding: 1.5rem;
  border: 1px solid var(--border); cursor: pointer; transition: 0.25s;
}
.student-card:hover { box-shadow: 0 8px 28px rgba(91,94,244,0.12); border-color: rgba(91,94,244,0.2); transform: translateY(-2px); }

/* ── RESUME VIEWER ── */
.resume-item-ind {
  display: flex; align-items: center; gap: 0.65rem;
  padding: 0.7rem 1rem; border-radius: 13px;
  background: rgba(91,94,244,0.04); border: 1px solid rgba(91,94,244,0.12);
  margin-bottom: 0.5rem; cursor: pointer; transition: 0.2s;
}
.resume-item-ind:hover { background: rgba(91,94,244,0.08); border-color: rgba(91,94,244,0.25); }
.resume-name-ind { font-size: 0.82rem; font-weight: 700; color: var(--text); flex: 1; }
.resume-size-ind { font-size: 0.72rem; color: var(--text-muted); }

/* ── NOTIFICATION ── */
.notif-toast {
  background: #0f172a; color: white; padding: 1rem 1.8rem; border-radius: 18px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.25); font-size: 0.88rem; font-weight: 600;
  display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.08);
}

/* ── MESSAGES ── */
.dm-panel-ind {
  height: 75vh; display: flex; background: white; border-radius: 28px;
  border: 1px solid var(--border); overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06);
}
.msg-sidebar {
  width: 320px; background: #fafbff; border-right: 1px solid var(--border); overflow-y: auto;
}
.msg-sidebar-head { padding: 1.8rem 2rem; font-weight: 900; font-size: 1.1rem; border-bottom: 1px solid var(--border); }
.msg-row {
  padding: 1.2rem 2rem; cursor: pointer; border-bottom: 1px solid #f8fafc; transition: 0.15s;
}
.msg-row:hover { background: #f1f5f9; }
.msg-row.active { background: #eef2ff; }
.msg-avatar {
  width: 42px; height: 42px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.88rem;
}
.msg-unread { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; flex-shrink: 0; }
.msg-name { font-weight: 700; font-size: 0.88rem; }
.msg-preview { font-size: 0.75rem; color: var(--text-muted); margin-top: 2px; }
.bubble { max-width: 72%; padding: 0.65rem 0.9rem; border-radius: 14px; font-size: 0.84rem; line-height: 1.45; }
.bubble.sent { background: var(--primary); color: white; align-self: flex-end; border-bottom-right-radius: 3px; }
.bubble.recv { background: #f1f5f9; color: var(--text); align-self: flex-start; border-bottom-left-radius: 3px; }
.bubble-time { font-size: 0.64rem; opacity: 0.5; margin-top: 3px; }

/* ── TALENT SECTION ── */
.talent-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.skill-tag {
  display: inline-block; background: #eef2ff; color: var(--primary);
  padding: 4px 10px; border-radius: 8px; font-size: 0.72rem; font-weight: 700;
  margin: 3px; border: 1px solid rgba(91,94,244,0.15);
}
.match-bar { height: 5px; background: #e8eaff; border-radius: 99px; margin-top: 5px; overflow: hidden; }
.match-fill { height: 100%; background: linear-gradient(90deg, var(--primary), #9333ea); border-radius: 99px; }
.rank-chip { display: inline-block; background: #fef3c7; color: #b45309; padding: 3px 10px; border-radius: 99px; font-size: 0.7rem; font-weight: 800; }
.posts-mini-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 0.75rem; }
.post-mini { aspect-ratio: 1; border-radius: 8px; overflow: hidden; }
.post-mini img { width: 100%; height: 100%; object-fit: cover; }
`;

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function IndustryDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({
    // Pre-seeded message from student (they replied to company message)
    201: [
      { sender: "Global Tech Corp", text: "Hi Rajat! We noticed your profile and would love to discuss the MERN Stack Intern role with you.", time: "10:30 AM" },
      { sender: "Rajat Kumar", text: "Thank you for reaching out! I would love to know more about the role.", time: "10:45 AM" },
    ],
    202: [
      { sender: "Global Tech Corp", text: "Hi Simmi! Your skills in Python are impressive. We have an opening that might suit you.", time: "Yesterday" },
    ],
  });
  const [chatInput, setChatInput] = useState("");

  const [visibleComments, setVisibleComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [showKnowMore, setShowKnowMore] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");
  const [viewingCompanyProfile, setViewingCompanyProfile] = useState(null);
  const [selectedPostDetail, setSelectedPostDetail] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState({ name: "", email: "", coverLetter: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentResumeModal, setStudentResumeModal] = useState(null); // { student, resume }

  const [companyProfile, setCompanyProfile] = useState({
    id: 999, name: "Global Tech Corp", tagline: "Innovating for a Digital Future",
    email: "hr@globaltech.com", contact: "+91 98765 43210", website: "www.globaltech.com",
    location: "New Delhi, India", address: "Plot 45, Okhla Phase III, New Delhi - 110020",
    about: "We are a multi-national technology firm focusing on industrial training and high-scale software solutions.",
    industry: "IT Services", founded: "2010",
    profilePic: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    achievements: ["CMMI Level 5", "Best Workplace 2024", "Innovation Excellence"],
  });

  const [activities, setActivities] = useState([
    {
      id: 1, ownerId: 999, ownerName: "Global Tech Corp", type: "Internship",
      title: "MERN Stack Intern", desc: "Seeking proactive students with React and Node.js expertise for our New Delhi office.",
      skills: "React, Node.js, Express, MongoDB", duration: "6 Months",
      offerings: "Stipend of ₹20,000/month, Pre-placement offer, Mentorship",
      date: "2 Hours ago", likes: 24, isLiked: false,
      comments: [{ id: 601, userId: 201, user: "Rajat Kumar", text: "Is this a remote-friendly position?" }],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      applications: [{ id: 801, studentId: 201, name: "Rajat Kumar", email: "rajat.k@email.com", coverLetter: "I have been working with MERN stack for personal projects.", status: "Pending" }],
    },
    {
      id: 2, ownerId: 1, ownerName: "TechNova Solutions", type: "Update",
      title: "New Office Launch", desc: "We have officially opened our doors in Whitefield, Bangalore!",
      skills: "", duration: "", offerings: "", date: "1 Day ago", likes: 156, isLiked: false,
      comments: [], image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", applications: [],
    },
    {
      id: 3, ownerId: 2, ownerName: "Quantum AI", type: "Job Vacancy",
      title: "AI Research Associate", desc: "Join our neural network research team in Hyderabad. PhD or Masters preferred.",
      skills: "Python, PyTorch, Deep Learning, Mathematics", duration: "Full-Time",
      offerings: "Competitive Salary, Health Insurance, Research Grants",
      date: "3 Days ago", likes: 89, isLiked: false,
      comments: [{ id: 602, userId: 999, user: "Global Tech Corp", text: "Impressive requirements, good luck!" }],
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80", applications: [],
    },
    {
      id: 5, ownerId: 999, ownerName: "Global Tech Corp", type: "Job Vacancy",
      title: "Senior Product Designer", desc: "Looking for an experienced designer to lead our enterprise software UI/UX revamps.",
      skills: "Figma, User Research, Design Systems, Prototyping", duration: "Full-Time",
      offerings: "Equity Options, Remote work allowance, Annual Retreats",
      date: "1 Week ago", likes: 65, isLiked: false,
      comments: [],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      applications: [{ id: 802, studentId: 203, name: "Ankit Verma", email: "ankit.design@email.com", coverLetter: "I have 2 years of freelance experience and a strong portfolio.", status: "Pending" }],
    },
  ]);

  const [newPost, setNewPost] = useState({ title: "", desc: "", type: "Job Vacancy", image: "", skills: "", duration: "", offerings: "" });

  const pushNotify = (msg) => {
    const id = Date.now();
    setNotifications(prev => [{ id, msg }, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setCompanyProfile({ ...companyProfile, name: fd.get("name"), email: fd.get("email"), contact: fd.get("contact"), website: fd.get("website"), about: fd.get("about"), address: fd.get("address"), location: fd.get("location"), industry: fd.get("industry"), founded: fd.get("founded") });
    setIsEditingProfile(false);
    pushNotify("Company profile updated!");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) setCompanyProfile({ ...companyProfile, profilePic: URL.createObjectURL(file) });
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.desc.trim()) return;
    setActivities([{ ...newPost, id: Date.now(), ownerId: companyProfile.id, ownerName: companyProfile.name, date: "Just now", likes: 0, isLiked: false, comments: [], applications: [] }, ...activities]);
    setNewPost({ title: "", desc: "", type: "Job Vacancy", image: "", skills: "", duration: "", offerings: "" });
    setIsPostModalOpen(false);
    pushNotify("Post published to industry feed.");
  };

  const handleDeletePost = (id) => { setActivities(prev => prev.filter(p => p.id !== id)); pushNotify("Post removed."); };

  const handleLike = (id) => setActivities(prev => prev.map(p => p.id === id ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p));

  const toggleComments = (id) => setVisibleComments(prev => ({ ...prev, [id]: !prev[id] }));

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;
    setActivities(prev => prev.map(p => p.id === postId ? { ...p, comments: [...p.comments, { id: Date.now(), userId: companyProfile.id, user: companyProfile.name, text }] } : p));
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleDeleteComment = (postId, cid, cAuthorId) => {
    const post = activities.find(p => p.id === postId);
    if (cAuthorId === companyProfile.id || post.ownerId === companyProfile.id) {
      setActivities(prev => prev.map(p => p.id === postId ? { ...p, comments: p.comments.filter(c => c.id !== cid) } : p));
    }
  };

  const handleApplyToVacancy = (e) => {
    e.preventDefault();
    setActivities(prev => prev.map(p => p.id === selectedPostDetail.id ? { ...p, applications: [...(p.applications || []), { id: Date.now(), studentId: Date.now(), name: applicationForm.name, email: applicationForm.email, coverLetter: applicationForm.coverLetter, status: "Pending" }] } : p));
    setIsApplyModalOpen(false);
    setApplicationForm({ name: "", email: "", coverLetter: "" });
    pushNotify(`Applied for ${selectedPostDetail.title}!`);
  };

  const updateApplicationStatus = (postId, appId, newStatus) => {
    setActivities(prev => prev.map(p => p.id === postId ? { ...p, applications: p.applications.map(a => a.id === appId ? { ...a, status: newStatus } : a) } : p));
    pushNotify(`Candidate marked as: ${newStatus}`);
  };

  const openStudentProfile = (studentId) => {
    const s = MOCK_STUDENTS.find(s => s.id === studentId);
    if (s) setSelectedStudent(s);
    else pushNotify("Detailed profile not available for this applicant.");
  };

  const startChatWithStudent = (student) => {
    setSelectedStudent(null);
    setActiveTab("messages");
    setActiveChat(student.id);
  };

  const sendMessageToStudent = () => {
    if (!chatInput.trim() || !activeChat) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), { sender: companyProfile.name, text: chatInput.trim(), time }],
    }));
    setChatInput("");
    pushNotify("Message sent to student.");
  };

  const filteredActivities = activities.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = MOCK_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.skills.some(sk => sk.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalApplications = activities.filter(p => p.ownerId === companyProfile.id).reduce((acc, p) => acc + (p.applications?.length || 0), 0);
  const unreadChats = Object.keys(chatMessages).filter(id => {
    const msgs = chatMessages[id] || [];
    return msgs.length > 0 && msgs[msgs.length - 1].sender !== companyProfile.name;
  }).length;

  return (
    <div className="industry-app">
      <style>{CSS}</style>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div style={{ marginBottom: "3rem" }}>
          <div className="brand-name">Nexus.</div>
          <div className="brand-sub">INDUSTRY PORTAL</div>
        </div>
        <nav style={{ flex: 1 }}>
          {[
            { id: "dashboard", icon: "🌍", label: "Global Feed" },
            { id: "profile", icon: "🏢", label: "My Enterprise" },
            { id: "responses", icon: "📥", label: "Vacancy Responses", badge: totalApplications > 0 ? totalApplications : null },
            { id: "talent", icon: "🎓", label: "Student Talent Pool" },
            { id: "explore", icon: "🔍", label: "Explore Network" },
            { id: "messages", icon: "💬", label: "Messages", badge: unreadChats > 0 ? unreadChats : null },
          ].map(item => (
            <div key={item.id} className={`nav-link ${activeTab === item.id ? "active" : ""}`}
              onClick={() => { setActiveTab(item.id); setViewingCompanyProfile(null); }}>
              <span style={{ fontSize: "1.15rem" }}>{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          ))}
        </nav>
        <div style={{ padding: "1.2rem", background: "#f8fafc", borderRadius: "20px", border: "1px solid #eef2ff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, background: "#10b981", borderRadius: "50%" }} />
            <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>Server Active</span>
          </div>
          <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 4 }}>Node: #{companyProfile.id}-GTC</p>
        </div>
      </aside>

      {/* ── CONTENT ── */}
      <main className="main-stage">

        {/* ── GLOBAL FEED ── */}
        {activeTab === "dashboard" && !viewingCompanyProfile && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <h2 style={{ fontSize: "2.2rem", fontFamily: "Playfair Display, serif" }}>Industry Insights</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Global vacancies and collaborative updates</p>
              </div>
              <input className="edit-input" style={{ maxWidth: 380, marginTop: 0 }} placeholder="Search feed..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "3rem" }}>
              {/* FEED */}
              <div>
                {filteredActivities.map(post => (
                  <motion.div key={post.id} className="post-card">
                    {post.ownerId === companyProfile.id && <button className="remove-post-btn" onClick={() => handleDeletePost(post.id)}>Remove</button>}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 46, height: 46, background: "#eef2ff", borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "var(--primary)", fontSize: "0.85rem" }}>{post.ownerName.charAt(0)}</div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: "1rem" }}>{post.ownerName}</div>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{post.date}</div>
                        </div>
                      </div>
                      <span className={`badge ${post.type === "Internship" ? "badge-internship" : post.type.includes("Vacancy") ? "badge-vacancy" : "badge-update"}`}>{post.type}</span>
                    </div>
                    {post.image && <img src={post.image} className="vacancy-img" alt="" />}
                    <h4 style={{ fontSize: "1.4rem", marginBottom: 10 }}>{post.title}</h4>
                    <p style={{ lineHeight: 1.7, color: "#475569", fontSize: "1rem", marginBottom: "1.3rem" }}>{post.desc.length > 100 ? post.desc.substring(0, 100) + "..." : post.desc}</p>
                    <div style={{ display: "flex", gap: 12, marginBottom: "1.2rem" }}>
                      <button className="btn-filled" style={{ padding: "0.65rem 1.2rem", fontSize: "0.82rem" }} onClick={() => setSelectedPostDetail(post)}>View Details {post.type !== "Update" && "& Apply"}</button>
                    </div>
                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.2rem", display: "flex", gap: 25 }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 7, color: post.isLiked ? "var(--primary)" : "#64748b", fontSize: "0.85rem" }} onClick={() => handleLike(post.id)}>
                        {post.isLiked ? "💙" : "🤍"} {post.likes}
                      </button>
                      <button style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 7, color: "#64748b", fontSize: "0.85rem" }} onClick={() => toggleComments(post.id)}>
                        💬 {post.comments.length}
                      </button>
                    </div>
                    <AnimatePresence>
                      {visibleComments[post.id] && (
                        <motion.div className="comment-section" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                          {post.comments.map(c => (
                            <div key={c.id} className="comment-bubble">
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <span className="comment-user">{c.user}</span>
                                {(c.userId === companyProfile.id || post.ownerId === companyProfile.id) && <button className="comment-delete" onClick={() => handleDeleteComment(post.id, c.id, c.userId)}>Delete</button>}
                              </div>
                              <p style={{ fontSize: "0.88rem", color: "#334155" }}>{c.text}</p>
                            </div>
                          ))}
                          <div style={{ display: "flex", gap: 10, marginTop: "1.2rem" }}>
                            <input className="edit-input" style={{ marginTop: 0, padding: "0.7rem" }} placeholder="Add a comment..." value={commentInputs[post.id] || ""} onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })} onKeyPress={e => e.key === "Enter" && handleAddComment(post.id)} />
                            <button className="btn-filled" style={{ padding: "0 1.2rem" }} onClick={() => handleAddComment(post.id)}>Send</button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* SIDEBAR WIDGETS */}
              <div>
                <h3 style={{ marginBottom: "1.5rem", fontFamily: "Playfair Display, serif" }}>Top Talent</h3>
                <div className="post-card">
                  {MOCK_STUDENTS.map(s => (
                    <div key={s.id} style={{ marginBottom: "1.2rem", paddingBottom: "1.2rem", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }} onClick={() => openStudentProfile(s.id)}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontWeight: 800, fontSize: "0.88rem" }}>{s.name}</span>
                        <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700 }}>{s.match}% Match</span>
                      </div>
                      <div className="match-bar"><div className="match-fill" style={{ width: s.match + "%" }} /></div>
                      <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 6 }}>{s.skills.slice(0, 3).join(" · ")}</p>
                    </div>
                  ))}
                </div>

                <h3 style={{ marginBottom: "1.5rem", marginTop: "2.5rem", fontFamily: "Playfair Display, serif" }}>Partner Network</h3>
                <div className="post-card" style={{ padding: "0.8rem" }}>
                  {MOCK_INDUSTRIES.map(ind => (
                    <div key={ind.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "0.9rem", borderBottom: "1px solid #f8fafc", cursor: "pointer" }} onClick={() => { setViewingCompanyProfile(ind); setActiveTab("dashboard"); }}>
                      <div style={{ width: 40, height: 40, background: "var(--primary)", color: "white", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.75rem" }}>{ind.logo}</div>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 800 }}>{ind.name}</div>
                        <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{ind.domain}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── PROFILE / VIEWING COMPANY ── */}
        {(activeTab === "profile" || viewingCompanyProfile) && (
          <motion.div initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            {viewingCompanyProfile && (
              <button className="btn-outline" style={{ marginBottom: "1.8rem" }} onClick={() => setViewingCompanyProfile(null)}>← Back</button>
            )}
            <div className="profile-header">
              <div className="profile-pic-container">
                {(viewingCompanyProfile ? viewingCompanyProfile.profilePic : companyProfile.profilePic)
                  ? <img src={viewingCompanyProfile ? viewingCompanyProfile.profilePic : companyProfile.profilePic} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--primary)" }}>{(viewingCompanyProfile ? viewingCompanyProfile.name : companyProfile.name).charAt(0)}</span>
                }
                {!viewingCompanyProfile && (
                  <label className="profile-pic-overlay">CHANGE LOGO<input type="file" hidden onChange={handleProfilePicChange} accept="image/*" /></label>
                )}
              </div>
              {!viewingCompanyProfile && (
                <button className="btn-filled" style={{ position: "absolute", right: 30, bottom: 30, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(15px)", border: "1px solid rgba(255,255,255,0.3)" }} onClick={() => setIsEditingProfile(!isEditingProfile)}>
                  {isEditingProfile ? "Discard" : "✏️ Edit Portal Info"}
                </button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3.5rem" }}>
              <div>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", marginBottom: 8 }}>{viewingCompanyProfile ? viewingCompanyProfile.name : companyProfile.name}</h2>
                <p style={{ color: "var(--primary)", fontWeight: 800, fontSize: "1.1rem", marginBottom: "2.5rem" }}>{viewingCompanyProfile ? viewingCompanyProfile.tagline : companyProfile.tagline}</p>
                <div style={{ background: "white", padding: "2.2rem", borderRadius: "28px", border: "1px solid var(--border)" }}>
                  <button className="btn-filled" style={{ width: "100%", marginBottom: "1.2rem", justifyContent: "center", background: "var(--text)" }} onClick={() => setShowKnowMore(!showKnowMore)}>
                    {showKnowMore ? "Hide Contact Details" : "Know More"}
                  </button>
                  <AnimatePresence>
                    {showKnowMore && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                        {[["CORPORATE EMAIL", viewingCompanyProfile ? viewingCompanyProfile.email : companyProfile.email], ["CONTACT", viewingCompanyProfile ? viewingCompanyProfile.contact : companyProfile.contact], ["LOCATION", viewingCompanyProfile ? viewingCompanyProfile.location : companyProfile.location], ["ADDRESS", viewingCompanyProfile ? viewingCompanyProfile.address : companyProfile.address], ["WEBSITE", viewingCompanyProfile ? viewingCompanyProfile.website : companyProfile.website]].map(([label, val]) => (
                          <div key={label} style={{ marginBottom: 20 }}>
                            <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "#94a3b8", marginBottom: 4 }}>{label}</span>
                            <div style={{ fontWeight: 600, color: label === "WEBSITE" ? "var(--primary)" : "var(--text)", fontSize: "0.88rem" }}>{val}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="post-card">
                {isEditingProfile && !viewingCompanyProfile ? (
                  <form onSubmit={handleProfileUpdate}>
                    <h3 style={{ marginBottom: "2rem" }}>Portal Configuration</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>Enterprise Name</label><input name="name" className="edit-input" defaultValue={companyProfile.name} /></div>
                      <div><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>Industry Focus</label><input name="industry" className="edit-input" defaultValue={companyProfile.industry} /></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>Founded Year</label><input name="founded" className="edit-input" defaultValue={companyProfile.founded} /></div>
                      <div><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>Website</label><input name="website" className="edit-input" defaultValue={companyProfile.website} /></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>Email</label><input name="email" className="edit-input" defaultValue={companyProfile.email} /></div>
                      <div><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>Contact</label><input name="contact" className="edit-input" defaultValue={companyProfile.contact} /></div>
                    </div>
                    <div style={{ marginBottom: 16 }}><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>Location</label><input name="location" className="edit-input" defaultValue={companyProfile.location} /></div>
                    <div style={{ marginBottom: 16 }}><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>Address</label><textarea name="address" className="edit-input" style={{ height: 70, resize: "none" }} defaultValue={companyProfile.address} /></div>
                    <div style={{ marginBottom: 24 }}><label style={{ fontSize: "0.75rem", fontWeight: 800 }}>About</label><textarea name="about" className="edit-input" style={{ height: 130, resize: "none" }} defaultValue={companyProfile.about} /></div>
                    <h4 style={{ marginBottom: "1rem", fontWeight: 800 }}>Manage Achievements</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1.2rem" }}>
                      {companyProfile.achievements.map((ach, idx) => (
                        <div key={idx} style={{ background: "#fffbeb", color: "#b45309", padding: "7px 13px", borderRadius: 11, fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 7 }}>
                          🏆 {ach}
                          <button type="button" style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: "bold" }} onClick={() => setCompanyProfile(p => ({ ...p, achievements: p.achievements.filter(a => a !== ach) }))}>✕</button>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                      <input className="edit-input" style={{ marginTop: 0 }} placeholder="New achievement..." value={newAchievement} onChange={e => setNewAchievement(e.target.value)} />
                      <button type="button" className="btn-filled" style={{ padding: "0 1.2rem", background: "var(--text)" }} onClick={() => { if (newAchievement.trim()) { setCompanyProfile(p => ({ ...p, achievements: [...p.achievements, newAchievement] })); setNewAchievement(""); } }}>Add</button>
                    </div>
                    <button type="submit" className="btn-filled" style={{ width: "100%" }}>Save Changes</button>
                  </form>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <h3>Organization Bio</h3>
                      {!viewingCompanyProfile && <button className="btn-filled" onClick={() => setIsPostModalOpen(true)}>+ Create Post</button>}
                    </div>
                    <p style={{ lineHeight: 1.85, color: "#475569", fontSize: "1rem", marginBottom: "2.5rem" }}>{viewingCompanyProfile ? viewingCompanyProfile.about : companyProfile.about}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.8rem", marginBottom: "2.5rem" }}>
                      <div style={{ background: "#f8fafc", padding: "1.3rem", borderRadius: 22, border: "1px solid #eef2ff" }}>
                        <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "#94a3b8", marginBottom: 4 }}>FOUNDED</span>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900 }}>{viewingCompanyProfile ? viewingCompanyProfile.founded : companyProfile.founded}</div>
                      </div>
                      <div style={{ background: "#f8fafc", padding: "1.3rem", borderRadius: 22, border: "1px solid #eef2ff" }}>
                        <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "#94a3b8", marginBottom: 4 }}>EMPLOYEES</span>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#059669" }}>{viewingCompanyProfile ? viewingCompanyProfile.employees : "500+"}</div>
                      </div>
                    </div>
                    <h4 style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "1rem", fontWeight: 800 }}>ACHIEVEMENTS</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2.5rem" }}>
                      {(viewingCompanyProfile ? viewingCompanyProfile.achievements : companyProfile.achievements).map(a => (
                        <span key={a} style={{ background: "#fffbeb", color: "#b45309", padding: "8px 18px", borderRadius: 14, fontSize: "0.8rem", fontWeight: 800, border: "1px solid #fef3c7" }}>🏆 {a}</span>
                      ))}
                    </div>
                    <h3 style={{ marginBottom: "1.8rem", borderTop: "1px solid var(--border)", paddingTop: "1.8rem" }}>Activity & Posts</h3>
                    {activities.filter(a => a.ownerId === (viewingCompanyProfile ? viewingCompanyProfile.id : companyProfile.id)).map(post => (
                      <div key={post.id} className="post-card" style={{ padding: "1.5rem", border: "1.5px solid #f1f5f9" }}>
                        {post.ownerId === companyProfile.id && !viewingCompanyProfile && <button className="remove-post-btn" onClick={() => handleDeletePost(post.id)}>Remove</button>}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.2rem" }}>
                          <span className={`badge ${post.type === "Internship" ? "badge-internship" : post.type.includes("Vacancy") ? "badge-vacancy" : "badge-update"}`}>{post.type}</span>
                          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700 }}>{post.date}</span>
                        </div>
                        <h4 style={{ fontSize: "1.3rem", marginBottom: 10 }}>{post.title}</h4>
                        <p style={{ lineHeight: 1.7, color: "#475569", fontSize: "0.9rem", marginBottom: "1.2rem" }}>{post.desc}</p>
                        <button className="btn-outline" style={{ width: "100%" }} onClick={() => setSelectedPostDetail(post)}>View Full Details</button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── VACANCY RESPONSES ── */}
        {activeTab === "responses" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.2rem", marginBottom: "0.75rem" }}>Vacancy Responses</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem" }}>Review applicants and shortlist candidates.</p>
            {activities.filter(p => p.ownerId === companyProfile.id && p.type !== "Update").map(post => (
              <div key={post.id} className="post-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.3rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.3rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: 4 }}>{post.title}</h3>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Posted {post.date}</span>
                  </div>
                  <div style={{ background: "#eef2ff", color: "var(--primary)", padding: "9px 18px", borderRadius: 14, fontWeight: 800 }}>
                    {post.applications?.length || 0} Applications
                  </div>
                </div>
                {!post.applications?.length
                  ? <p style={{ color: "#94a3b8", textAlign: "center", padding: "1.8rem 0" }}>No applications yet.</p>
                  : post.applications.map(app => (
                    <div key={app.id} style={{ background: "#f8fafc", border: "1px solid var(--border)", borderRadius: 18, padding: "1.3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <div style={{ flex: 1, marginRight: "1rem" }}>
                        <h4 style={{ fontSize: "1.1rem", marginBottom: 4 }}>{app.name}</h4>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 8 }}>{app.email}</p>
                        <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>{app.coverLetter}</p>
                        <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexDirection: "column", flexShrink: 0 }}>
                        <button className="btn-outline" style={{ padding: "0.45rem 0.9rem", fontSize: "0.8rem" }} onClick={() => openStudentProfile(app.studentId)}>👤 View Profile</button>
                        {app.status === "Pending" && <button className="btn-filled" style={{ padding: "0.45rem 0.9rem", fontSize: "0.8rem" }} onClick={() => updateApplicationStatus(post.id, app.id, "Shortlisted")}>Shortlist</button>}
                        {app.status === "Shortlisted" && <button className="btn-filled" style={{ padding: "0.45rem 0.9rem", fontSize: "0.8rem", background: "#059669" }} onClick={() => updateApplicationStatus(post.id, app.id, "Selected")}>✓ Select</button>}
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}
          </motion.div>
        )}

        {/* ── TALENT POOL ── */}
        {activeTab === "talent" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <header style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.2rem" }}>Student Talent Pool</h2>
                <p style={{ color: "var(--text-muted)" }}>Browse student profiles, resumes, certificates & posts</p>
              </div>
              <input className="edit-input" style={{ maxWidth: 320, marginTop: 0 }} placeholder="Search by name or skill..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </header>
            <div className="talent-grid">
              {filteredStudents.map(student => (
                <div key={student.id} className="student-card" onClick={() => openStudentProfile(student.id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, var(--primary), #7c3aed)", color: "white", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.3rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{student.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1rem" }}>{student.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{student.qualification} · {student.college}</div>
                    </div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "var(--primary)" }}>{student.match}%</div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>Match</div>
                    </div>
                  </div>
                  <div className="match-bar" style={{ marginBottom: "0.9rem" }}><div className="match-fill" style={{ width: student.match + "%" }} /></div>
                  <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.6, marginBottom: "0.9rem" }}>{student.about.substring(0, 90)}...</p>
                  <div style={{ marginBottom: "0.9rem" }}>
                    {student.skills.slice(0, 4).map(sk => <span key={sk} className="skill-tag">{sk}</span>)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span className="rank-chip">{student.rank}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      {student.resumes.length > 0 && <span style={{ fontSize: "0.7rem", background: "#eef2ff", color: "var(--primary)", padding: "3px 9px", borderRadius: 99, fontWeight: 700 }}>📄 {student.resumes.length} Resume</span>}
                      {student.personalPosts.length > 0 && <span style={{ fontSize: "0.7rem", background: "#f0fdf4", color: "#166534", padding: "3px 9px", borderRadius: 99, fontWeight: 700 }}>🖼️ {student.personalPosts.length} Posts</span>}
                    </div>
                  </div>
                  {student.personalPosts.length > 0 && (
                    <div className="posts-mini-grid">
                      {student.personalPosts.slice(0, 3).map((p, i) => (
                        <div key={i} className="post-mini"><img src={p.url} alt="" /></div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── EXPLORE ── */}
        {activeTab === "explore" && !viewingCompanyProfile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.2rem", marginBottom: "2.2rem" }}>Global Directory</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2.2rem" }}>
              {MOCK_INDUSTRIES.map(ind => (
                <div key={ind.id} className="post-card" style={{ cursor: "pointer" }} onClick={() => setViewingCompanyProfile(ind)}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: "1.3rem" }}>
                    <div style={{ width: 58, height: 58, background: "var(--primary)", color: "white", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 900 }}>{ind.logo}</div>
                    <div><h4 style={{ fontSize: "1.1rem" }}>{ind.name}</h4><p style={{ color: "var(--primary)", fontWeight: 800, fontSize: "0.75rem" }}>{ind.domain}</p></div>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.65, marginBottom: "1.8rem" }}>{ind.bio}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "1.3rem" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.78rem" }}>📍 {ind.location}</span>
                    <button className="btn-outline" style={{ padding: "5px 14px", fontSize: "0.72rem" }}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === "messages" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.2rem", marginBottom: "1.8rem" }}>Student Messages</h2>
            <div className="dm-panel-ind">
              {/* Student list */}
              <div className="msg-sidebar">
                <div className="msg-sidebar-head">Direct Messages</div>
                {MOCK_STUDENTS.map(s => {
                  const msgs = chatMessages[s.id] || [];
                  const last = msgs[msgs.length - 1];
                  const hasUnread = last && last.sender !== companyProfile.name;
                  return (
                    <div key={s.id} className={`msg-row ${activeChat === s.id ? "active" : ""}`} onClick={() => setActiveChat(s.id)}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div className="msg-avatar" style={{ background: "linear-gradient(135deg, var(--primary), #7c3aed)", color: "white" }}>{s.name.charAt(0)}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="msg-name">{s.name}</span>
                            {hasUnread && <div className="msg-unread" />}
                          </div>
                          <div className="msg-preview">{last ? last.text.substring(0, 38) + "..." : "No messages yet"}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat area */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {activeChat ? (
                  <>
                    <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), #7c3aed)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>{MOCK_STUDENTS.find(s => s.id === activeChat)?.name.charAt(0)}</div>
                        <div>
                          <div style={{ fontWeight: 800 }}>{MOCK_STUDENTS.find(s => s.id === activeChat)?.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "#10b981" }}>● Student · Online</div>
                        </div>
                      </div>
                      <button className="btn-outline" style={{ padding: "0.45rem 1rem", fontSize: "0.78rem" }} onClick={() => openStudentProfile(activeChat)}>View Full Profile</button>
                    </div>
                    <div style={{ flex: 1, padding: "2rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                      {!(chatMessages[activeChat]?.length)
                        ? <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", flexDirection: "column", gap: 8 }}>
                          <span style={{ fontSize: "2rem" }}>💬</span>
                          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Start the conversation</span>
                          <span style={{ fontSize: "0.78rem" }}>You can initiate contact with this student</span>
                        </div>
                        : (chatMessages[activeChat] || []).map((msg, i) => (
                          <div key={i} className={`bubble ${msg.sender === companyProfile.name ? "sent" : "recv"}`}>
                            <div>{msg.text}</div>
                            <div className="bubble-time">{msg.time}</div>
                          </div>
                        ))
                      }
                    </div>
                    <div style={{ padding: "1.3rem 2rem", borderTop: "1px solid var(--border)", display: "flex", gap: 12 }}>
                      <input className="edit-input" style={{ marginTop: 0 }} placeholder="Write a message to the student..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyPress={e => e.key === "Enter" && sendMessageToStudent()} />
                      <button className="btn-filled" onClick={sendMessageToStudent}>Send</button>
                    </div>
                  </>
                ) : (
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, color: "#94a3b8" }}>
                    <span style={{ fontSize: "3rem" }}>💬</span>
                    <p style={{ fontWeight: 600 }}>Select a student to start messaging</p>
                    <p style={{ fontSize: "0.82rem" }}>Only companies can initiate conversations</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* ── CREATE POST MODAL ── */}
      <AnimatePresence>
        {isPostModalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
              <button className="close-modal-btn" onClick={() => setIsPostModalOpen(false)}>✕</button>
              <h3 style={{ marginBottom: "1.3rem", color: "var(--primary)", fontSize: "1.8rem" }}>Publish Activity</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
                <div><label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>CATEGORY</label>
                  <select className="edit-input" value={newPost.type} onChange={e => setNewPost({ ...newPost, type: e.target.value })}>
                    <option value="Job Vacancy">Job Vacancy</option>
                    <option value="Internship">Internship</option>
                    <option value="Update">Corporate Update</option>
                  </select>
                </div>
                <div><label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>TITLE</label>
                  <input className="edit-input" style={{ marginTop: 0 }} placeholder="Post title..." value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
                </div>
              </div>
              <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>DESCRIPTION</label>
              <textarea className="edit-input" style={{ height: 90, resize: "none", marginBottom: 14 }} value={newPost.desc} onChange={e => setNewPost({ ...newPost, desc: e.target.value })} />
              {(newPost.type === "Job Vacancy" || newPost.type === "Internship") && (
                <>
                  <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>REQUIRED SKILLS</label>
                  <input className="edit-input" style={{ marginTop: 0, marginBottom: 14 }} value={newPost.skills} onChange={e => setNewPost({ ...newPost, skills: e.target.value })} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
                    <div><label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>DURATION</label><input className="edit-input" style={{ marginTop: 0 }} value={newPost.duration} onChange={e => setNewPost({ ...newPost, duration: e.target.value })} /></div>
                    <div><label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>OFFERINGS</label><input className="edit-input" style={{ marginTop: 0 }} value={newPost.offerings} onChange={e => setNewPost({ ...newPost, offerings: e.target.value })} /></div>
                  </div>
                </>
              )}
              <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>IMAGE URL</label>
              <input className="edit-input" style={{ marginBottom: 14 }} placeholder="https://..." value={newPost.image} onChange={e => setNewPost({ ...newPost, image: e.target.value })} />
              <button className="btn-filled" style={{ width: "100%", padding: "1.1rem", justifyContent: "center", marginTop: 10 }} onClick={handleCreatePost}>Publish to Network</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VACANCY DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedPostDetail && !isApplyModalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
              <button className="close-modal-btn" onClick={() => setSelectedPostDetail(null)}>✕</button>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.3rem" }}>
                <div style={{ width: 54, height: 54, background: "#eef2ff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.3rem", color: "var(--primary)" }}>{selectedPostDetail.ownerName.charAt(0)}</div>
                <div>
                  <h3 style={{ fontSize: "1.6rem", margin: 0 }}>{selectedPostDetail.title}</h3>
                  <p style={{ color: "var(--primary)", fontWeight: 800, fontSize: "0.85rem" }}>{selectedPostDetail.ownerName} · {selectedPostDetail.type}</p>
                </div>
              </div>
              {selectedPostDetail.image && <img src={selectedPostDetail.image} style={{ width: "100%", height: 190, objectFit: "cover", borderRadius: 18, marginBottom: "1.8rem" }} alt="" />}
              <p style={{ lineHeight: 1.75, color: "var(--text)", marginBottom: "1.8rem", fontSize: "0.92rem" }}>{selectedPostDetail.desc}</p>
              {selectedPostDetail.type !== "Update" && (
                <div style={{ background: "#f8fafc", padding: "1.3rem", borderRadius: 18, border: "1px solid var(--border)", marginBottom: "1.8rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div><span style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "#94a3b8", marginBottom: 4 }}>SKILLS</span><div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{selectedPostDetail.skills || "Not specified"}</div></div>
                    <div><span style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "#94a3b8", marginBottom: 4 }}>DURATION</span><div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{selectedPostDetail.duration || "Standard"}</div></div>
                    <div style={{ gridColumn: "span 2" }}><span style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "#94a3b8", marginBottom: 4, marginTop: 10 }}>OFFERINGS</span><div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#059669" }}>{selectedPostDetail.offerings}</div></div>
                  </div>
                </div>
              )}
              {selectedPostDetail.type !== "Update" && selectedPostDetail.ownerId !== companyProfile.id && (
                <button className="btn-filled" style={{ width: "100%", padding: "1.1rem", justifyContent: "center" }} onClick={() => setIsApplyModalOpen(true)}>Apply for this Role</button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── APPLICATION FORM ── */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
              <button className="close-modal-btn" onClick={() => setIsApplyModalOpen(false)}>✕</button>
              <h3 style={{ marginBottom: "0.8rem", color: "var(--primary)", fontSize: "1.8rem" }}>Application Form</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.8rem" }}>Applying to <strong>{selectedPostDetail?.ownerName}</strong> for <strong>{selectedPostDetail?.title}</strong></p>
              <form onSubmit={handleApplyToVacancy}>
                <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>FULL NAME</label>
                <input required className="edit-input" style={{ marginBottom: 14 }} value={applicationForm.name} onChange={e => setApplicationForm({ ...applicationForm, name: e.target.value })} />
                <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>EMAIL</label>
                <input required type="email" className="edit-input" style={{ marginBottom: 14 }} value={applicationForm.email} onChange={e => setApplicationForm({ ...applicationForm, email: e.target.value })} />
                <label style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8" }}>COVER LETTER</label>
                <textarea required className="edit-input" style={{ height: 110, resize: "none", marginBottom: 22 }} value={applicationForm.coverLetter} onChange={e => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })} />
                <button type="submit" className="btn-filled" style={{ width: "100%", padding: "1.1rem", justifyContent: "center" }}>Submit Application</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STUDENT PROFILE MODAL ── */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} style={{ maxWidth: 700 }}>
              <button className="close-modal-btn" onClick={() => setSelectedStudent(null)}>✕</button>

              {/* Header */}
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1.8rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.8rem" }}>
                <div style={{ width: 80, height: 80, borderRadius: 22, background: "linear-gradient(135deg, var(--primary), #7c3aed)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", fontWeight: 900 }}>{selectedStudent.name.charAt(0)}</div>
                <div>
                  <h2 style={{ fontSize: "1.9rem", margin: 0 }}>{selectedStudent.name}</h2>
                  <p style={{ color: "var(--primary)", fontWeight: 800, fontSize: "0.88rem" }}>{selectedStudent.qualification} · {selectedStudent.college}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <span className="rank-chip">{selectedStudent.rank}</span>
                    <span style={{ background: "#eef2ff", color: "var(--primary)", padding: "3px 10px", borderRadius: 99, fontSize: "0.7rem", fontWeight: 800 }}>{selectedStudent.match}% Match</span>
                  </div>
                </div>
              </div>

              {/* About */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase" }}>About</h4>
                <p style={{ lineHeight: 1.7, fontSize: "0.9rem" }}>{selectedStudent.about}</p>
              </div>

              {/* Skills & Experience */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <div>
                  <h4 style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase" }}>Skills</h4>
                  <div>{selectedStudent.skills.map(sk => <span key={sk} className="skill-tag">{sk}</span>)}</div>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase" }}>Experience</h4>
                  <p style={{ fontWeight: 600, fontSize: "0.88rem" }}>{selectedStudent.experience}</p>
                </div>
              </div>

              {/* Resumes */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8", marginBottom: 10, textTransform: "uppercase" }}>
                  📄 Resumes ({selectedStudent.resumes.length})
                </h4>
                {selectedStudent.resumes.length === 0
                  ? <p style={{ fontSize: "0.82rem", color: "#94a3b8" }}>No resume uploaded yet.</p>
                  : selectedStudent.resumes.map((r, i) => (
                    <div key={i} className="resume-item-ind" onClick={() => setStudentResumeModal({ student: selectedStudent, resume: r })}>
                      <span style={{ fontSize: "1.3rem" }}>{r.type === "application/pdf" ? "📑" : "🖼️"}</span>
                      <div style={{ flex: 1 }}>
                        <div className="resume-name-ind">{r.name}</div>
                        <div className="resume-size-ind">{r.size}</div>
                      </div>
                      <span style={{ fontSize: "0.72rem", background: "#eef2ff", color: "var(--primary)", padding: "3px 9px", borderRadius: 99, fontWeight: 700 }}>View</span>
                    </div>
                  ))
                }
              </div>

              {/* Activity Posts */}
              {selectedStudent.personalPosts.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8", marginBottom: 10, textTransform: "uppercase" }}>
                    🖼️ Activity Posts ({selectedStudent.personalPosts.length})
                  </h4>
                  <div className="posts-mini-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {selectedStudent.personalPosts.map((p, i) => (
                      <div key={i} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", position: "relative" }}>
                        <img src={p.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {p.caption && (
                          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", color: "white", fontSize: "0.62rem", padding: "4px 6px", fontWeight: 600 }}>{p.caption}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              {selectedStudent.certImages.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94a3b8", marginBottom: 10, textTransform: "uppercase" }}>Certificates</h4>
                  <div className="posts-mini-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {selectedStudent.certImages.map((p, i) => (
                      <div key={i} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1" }}>
                        <img src={p.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "0.75rem" }}>
                    {selectedStudent.certificates.map((cert, i) => (
                      <div key={i} style={{ fontSize: "0.82rem", fontWeight: 600, color: "#475569", padding: "4px 0", borderBottom: "1px solid #f1f5f9" }}>🏅 {cert}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: 12, marginTop: "1.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                <button className="btn-filled" style={{ flex: 1, justifyContent: "center" }} onClick={() => startChatWithStudent(selectedStudent)}>
                  💬 Message Student
                </button>
                <button className="btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => { setSelectedStudent(null); setActiveTab("responses"); }}>
                  📋 View Applications
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RESUME PREVIEW MODAL ── */}
      <AnimatePresence>
        {studentResumeModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setStudentResumeModal(null); }}>
            <motion.div className="modal-content" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} style={{ maxWidth: 560 }}>
              <button className="close-modal-btn" onClick={() => setStudentResumeModal(null)}>✕</button>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Resume Preview</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                {studentResumeModal.student.name} · {studentResumeModal.resume.name}
              </p>
              {studentResumeModal.resume.type === "application/pdf"
                ? <div style={{ background: "#f8fafc", border: "2px dashed var(--border-strong)", borderRadius: 16, padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📑</div>
                  <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{studentResumeModal.resume.name}</div>
                  <div style={{ fontSize: "0.82rem", marginBottom: "1.5rem" }}>PDF Document · {studentResumeModal.resume.size}</div>
                  <a href={studentResumeModal.resume.url || "#"} target="_blank" rel="noreferrer">
                    <button className="btn-filled" style={{ justifyContent: "center" }}>⬇️ Download Resume</button>
                  </a>
                </div>
                : studentResumeModal.resume.preview
                  ? <img src={studentResumeModal.resume.preview} alt="Resume" style={{ width: "100%", borderRadius: 14, border: "1px solid var(--border)" }} />
                  : <div style={{ background: "#f8fafc", border: "2px dashed var(--border-strong)", borderRadius: 16, padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🖼️</div>
                    <div style={{ fontWeight: 700 }}>{studentResumeModal.resume.name}</div>
                    <div style={{ fontSize: "0.82rem", marginTop: "0.5rem" }}>{studentResumeModal.resume.size}</div>
                  </div>
              }
              <button className="btn-filled" style={{ width: "100%", marginTop: "1.5rem", justifyContent: "center" }} onClick={() => { setStudentResumeModal(null); startChatWithStudent(studentResumeModal.student); }}>
                💬 Message This Student
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NOTIFICATIONS ── */}
      <div style={{ position: "fixed", bottom: "2.5rem", right: "2.5rem", zIndex: 1000, display: "flex", flexDirection: "column", gap: 12 }}>
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} className="notif-toast"
              initial={{ opacity: 0, x: 50, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div style={{ width: 8, height: 8, background: "var(--primary-light)", borderRadius: "50%", flexShrink: 0 }} />
              {n.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}