import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- GLOBAL CONSTANTS & EXPANDED MOCK DATA ---
const INDUSTRY_CATEGORIES = [
  "IT Services", "Fintech", "HealthTech", "EdTech",
  "Manufacturing", "E-commerce", "Cybersecurity", "Cloud Computing"
];

const MOCK_INDUSTRIES = [
  { id: 1, name: "TechNova Solutions", tagline: "Cloud Native Excellence", domain: "Cloud Computing", location: "Bangalore", email: "contact@technova.com", contact: "+91 8888 7777", website: "www.technova.com", employees: "500+", logo: "TN", bio: "Leading the way in serverless architecture.", about: "Specializing in AWS and Azure migrations. We build resilient and scalable cloud infrastructures for enterprise clients globally.", address: "123 Tech Park, Whitefield, Bangalore", industry: "Cloud Computing", founded: "2015", profilePic: null, achievements: ["Best Startup 2023", "Cloud Partner of the Year"] },
  { id: 2, name: "Quantum AI", tagline: "Pioneering Artificial Intelligence", domain: "Artificial Intelligence", location: "Hyderabad", email: "hello@quantumai.in", contact: "+91 9999 0000", website: "www.quantumai.in", employees: "150+", logo: "QA", bio: "Building the next generation of neural networks.", about: "Focusing on NLP and Computer Vision. Our research is backed by top-tier universities.", address: "AI Enclave, HITEC City, Hyderabad", industry: "Artificial Intelligence", founded: "2018", profilePic: null, achievements: ["Top Innovator 2025"] },
  { id: 3, name: "Nexus Fintech", tagline: "Next-Gen Financial Systems", domain: "Blockchain", location: "Mumbai", email: "info@nexusfin.com", contact: "+91 7777 6666", website: "www.nexusfin.com", employees: "200+", logo: "NF", bio: "Decentralizing the future of banking.", about: "Experts in Ethereum and Solana smart contracts. Securing billions in daily transaction volumes.", address: "Finance Tower, BKC, Mumbai", industry: "Fintech", founded: "2019", profilePic: null, achievements: ["Fintech Shield Award"] },
  { id: 4, name: "GreenEnergy Co", tagline: "Sustainable Power Solutions", domain: "Sustainability", location: "Pune", email: "green@energyco.in", contact: "+91 5555 4444", website: "www.greenenergy.co.in", employees: "50+", logo: "GE", bio: "Clean energy solutions for a better tomorrow.", about: "Developing solar-grid management software. Using data to optimize sustainable energy distribution.", address: "Green Hill, Baner, Pune", industry: "Sustainability", founded: "2020", profilePic: null, achievements: ["Eco-Impact 2024"] },
];

const MOCK_STUDENTS = [
  { id: 201, name: "Rajat Kumar", email: "rajat.k@email.com", contact: "+91 9876512345", about: "Passionate Full Stack Developer specializing in MERN stack. Love building scalable web apps.", skills: ["React", "Node.js", "MongoDB", "Express", "AWS"], match: 98, rank: "Top 1%", experience: "6 months intern at WebDev Studio", certificates: ["AWS Cloud Practitioner", "React Advanced Concepts"], profilePic: null },
  { id: 202, name: "Simmi Sharma", email: "simmi.data@email.com", contact: "+91 8765432109", about: "Data enthusiast with a strong mathematical background. Exploring Deep Learning architectures.", skills: ["Python", "TensorFlow", "SQL", "Pandas", "Scikit-Learn"], match: 94, rank: "Top 5%", experience: "Research Assistant at University AI Lab", certificates: ["Deep Learning Specialization (Coursera)"], profilePic: null },
  { id: 203, name: "Ankit Verma", email: "ankit.design@email.com", contact: "+91 7654321098", about: "Creative UI/UX designer focusing on user-centered design and micro-interactions.", skills: ["UI/UX", "Figma", "Adobe XD", "Framer", "CSS"], match: 89, rank: "Top 10%", experience: "Freelance Designer (2 years)", certificates: ["Google UX Design Certificate"], profilePic: null },
  { id: 204, name: "Priya Das", email: "priya.backend@email.com", contact: "+91 6543210987", about: "Backend engineer focused on highly available microservices and robust API design.", skills: ["Java", "Spring Boot", "AWS", "Docker", "Kubernetes"], match: 85, rank: "Top 15%", experience: "1 year Junior Backend Dev at TechCorp", certificates: ["Oracle Certified Associate, Java SE 8 Programmer"], profilePic: null },
];

// --- MAIN COMPONENT ---
export default function IndustryDashboard() {
  // 1. STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Dynamic UI States
  const [visibleComments, setVisibleComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  // Modal & Feature States
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [showKnowMore, setShowKnowMore] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");

  // NEW: State for viewing other companies, posts details, applying, and viewing students
  const [viewingCompanyProfile, setViewingCompanyProfile] = useState(null);
  const [selectedPostDetail, setSelectedPostDetail] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState({ name: "", email: "", coverLetter: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Logged-in Company State
  const [companyProfile, setCompanyProfile] = useState({
    id: 999,
    name: "Global Tech Corp",
    tagline: "Innovating for a Digital Future",
    email: "hr@globaltech.com",
    contact: "+91 98765 43210",
    website: "www.globaltech.com",
    location: "New Delhi, India",
    address: "Plot 45, Okhla Phase III, New Delhi - 110020",
    about: "We are a multi-national technology firm focusing on industrial training and high-scale software solutions.",
    industry: "IT Services",
    founded: "2010",
    profilePic: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    achievements: ["CMMI Level 5", "Best Workplace 2024", "Innovation Excellence"]
  });

  // Global Activities Feed
  const [activities, setActivities] = useState([
    {
      id: 1,
      ownerId: 999,
      ownerName: "Global Tech Corp",
      type: "Internship",
      title: "MERN Stack Intern",
      desc: "Seeking proactive students with React and Node.js expertise for our New Delhi office.",
      skills: "React, Node.js, Express, MongoDB",
      duration: "6 Months",
      offerings: "Stipend of ₹20,000/month, Pre-placement offer, Mentorship",
      date: "2 Hours ago",
      likes: 24,
      isLiked: false,
      comments: [
        { id: 601, userId: 201, user: "Rajat Kumar", text: "Is this a remote-friendly position?" }
      ],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      applications: [
        { id: 801, studentId: 201, name: "Rajat Kumar", email: "rajat.k@email.com", coverLetter: "I have been working with MERN stack for personal projects and would love to contribute.", status: "Pending" }
      ]
    },
    {
      id: 2,
      ownerId: 1,
      ownerName: "TechNova Solutions",
      type: "Update",
      title: "New Office Launch",
      desc: "We have officially opened our doors in Whitefield, Bangalore!",
      skills: "", duration: "", offerings: "",
      date: "1 Day ago",
      likes: 156,
      isLiked: false,
      comments: [],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      applications: []
    },
    {
      id: 3,
      ownerId: 2,
      ownerName: "Quantum AI",
      type: "Job Vacancy",
      title: "AI Research Associate",
      desc: "Join our neural network research team in Hyderabad. PhD or Masters preferred.",
      skills: "Python, PyTorch, Deep Learning, Mathematics",
      duration: "Full-Time",
      offerings: "Competitive Salary, Health Insurance, Research Grants",
      date: "3 Days ago",
      likes: 89,
      isLiked: false,
      comments: [
        { id: 602, userId: 999, user: "Global Tech Corp", text: "Impressive requirements, good luck with the search!" }
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      applications: []
    },
    {
      id: 5,
      ownerId: 999,
      ownerName: "Global Tech Corp",
      type: "Job Vacancy",
      title: "Senior Product Designer",
      desc: "Looking for an experienced designer to lead our enterprise software UI/UX revamps.",
      skills: "Figma, User Research, Design Systems, Prototyping",
      duration: "Full-Time",
      offerings: "Equity Options, Remote work allowance, Annual Retreats",
      date: "1 Week ago",
      likes: 65,
      isLiked: false,
      comments: [],
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
      applications: [
        { id: 802, studentId: 203, name: "Ankit Verma", email: "ankit.design@email.com", coverLetter: "I have 2 years of freelance experience and a strong portfolio in enterprise SaaS.", status: "Pending" }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState({ title: "", desc: "", type: "Job Vacancy", image: "", skills: "", duration: "", offerings: "" });

  // 2. LOGIC HANDLERS
  const pushNotify = (msg) => {
    const id = Date.now();
    setNotifications(prev => [{ id, msg }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setCompanyProfile({
      ...companyProfile,
      name: formData.get("name"),
      email: formData.get("email"),
      contact: formData.get("contact"),
      website: formData.get("website"),
      about: formData.get("about"),
      address: formData.get("address"),
      location: formData.get("location"),
      industry: formData.get("industry"),
      founded: formData.get("founded")
    });
    setIsEditingProfile(false);
    pushNotify("Company portal details updated successfully!");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyProfile({ ...companyProfile, profilePic: URL.createObjectURL(file) });
    }
  };

  const handlePostImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: URL.createObjectURL(file) });
    }
  };

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    setCompanyProfile({ ...companyProfile, achievements: [...companyProfile.achievements, newAchievement] });
    setNewAchievement("");
  };

  const handleDeleteAchievement = (ach) => {
    setCompanyProfile({ ...companyProfile, achievements: companyProfile.achievements.filter(a => a !== ach) });
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.desc.trim()) return;
    const postToAdd = {
      ...newPost,
      id: Date.now(),
      ownerId: companyProfile.id,
      ownerName: companyProfile.name,
      date: "Just now",
      likes: 0,
      isLiked: false,
      comments: [],
      applications: []
    };
    setActivities([postToAdd, ...activities]);
    setNewPost({ title: "", desc: "", type: "Job Vacancy", image: "", skills: "", duration: "", offerings: "" });
    setIsPostModalOpen(false);
    pushNotify("Post published to the industry feed.");
  };

  const handleDeletePost = (postId) => {
    setActivities(prev => prev.filter(p => p.id !== postId));
    pushNotify("Post removed successfully.");
  };

  const handleLike = (postId) => {
    setActivities(prev => prev.map(post => post.id === postId ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked } : post));
  };

  const toggleComments = (postId) => setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    setActivities(prev => prev.map(post => post.id === postId ? { ...post, comments: [...post.comments, { id: Date.now(), userId: companyProfile.id, user: companyProfile.name, text: text }] } : post));
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleDeleteComment = (postId, commentId, commentAuthorId) => {
    const post = activities.find(p => p.id === postId);
    if (commentAuthorId === companyProfile.id || post.ownerId === companyProfile.id) {
      setActivities(prev => prev.map(p => p.id === postId ? { ...p, comments: p.comments.filter(c => c.id !== commentId) } : p));
      pushNotify("Comment deleted.");
    }
  };

  const handleApplyToVacancy = (e) => {
    e.preventDefault();
    if (!applicationForm.name || !applicationForm.email) return;

    setActivities(prev => prev.map(post => {
      if (post.id === selectedPostDetail.id) {
        return {
          ...post,
          applications: [...(post.applications || []), {
            id: Date.now(),
            studentId: Date.now(),
            name: applicationForm.name,
            email: applicationForm.email,
            coverLetter: applicationForm.coverLetter,
            status: "Pending"
          }]
        };
      }
      return post;
    }));

    setIsApplyModalOpen(false);
    setApplicationForm({ name: "", email: "", coverLetter: "" });
    pushNotify(`Successfully applied for ${selectedPostDetail.title}!`);
  };

  const updateApplicationStatus = (postId, appId, newStatus) => {
    setActivities(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          applications: post.applications.map(app => app.id === appId ? { ...app, status: newStatus } : app)
        };
      }
      return post;
    }));
    pushNotify(`Applicant marked as: ${newStatus}`);
  };

  const openStudentProfile = (studentId) => {
    const student = MOCK_STUDENTS.find(s => s.id === studentId);
    if (student) setSelectedStudent(student);
    else pushNotify("Detailed profile not available for simulated applicants.");
  };

  const startChatWithStudent = (student) => {
    setSelectedStudent(null);
    setActiveTab("chats");
    setActiveChat({ id: student.id, name: student.name, logo: student.name.charAt(0), type: "Student" });
  };

  // Filter Variables
  const filteredIndustries = MOCK_INDUSTRIES.filter(ind =>
    ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ind.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = activities.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="industry-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap');
        
        :root {
          --primary: #6366f1;
          --secondary: #4338ca;
          --bg: #f8fafc;
          --card: #ffffff;
          --text: #1e293b;
          --text-muted: #64748b;
          --border: #e2e8f0;
          --danger: #ef4444;
          --success: #10b981;
          --warning: #f59e0b;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .industry-app {
          font-family: 'Outfit', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          color: var(--text);
        }

        .sidebar {
          width: 300px;
          background: var(--card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 2.5rem 1.8rem;
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-link {
          padding: 1.1rem;
          border-radius: 16px;
          cursor: pointer;
          margin-bottom: 0.8rem;
          transition: all 0.3s ease;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-muted);
        }

        .nav-link.active {
          background: #eef2ff;
          color: var(--primary);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.08);
        }

        .nav-link:hover:not(.active) {
          background: #f1f5f9;
          color: var(--text);
          transform: translateX(5px);
        }

        .main-stage {
          flex: 1;
          padding: 3.5rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .profile-header {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          height: 250px;
          border-radius: 35px;
          position: relative;
          margin-bottom: 7rem;
          box-shadow: 0 25px 50px -12px rgba(67, 56, 202, 0.25);
        }

        .profile-pic-container {
          position: absolute;
          bottom: -55px;
          left: 55px;
          width: 170px;
          height: 170px;
          background: white;
          border-radius: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border: 7px solid white;
        }

        .profile-pic-container img { width: 100%; height: 100%; object-fit: cover; }
        
        .profile-pic-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          cursor: pointer;
          transition: 0.3s;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .profile-pic-container:hover .profile-pic-overlay { opacity: 1; }

        .post-card {
          background: white;
          border-radius: 28px;
          padding: 2.2rem;
          border: 1px solid var(--border);
          margin-bottom: 2.2rem;
          position: relative;
          transition: transform 0.3s ease;
        }

        .vacancy-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 22px;
          margin-bottom: 1.8rem;
        }

        .btn-filled {
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem 1.8rem;
          border-radius: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .btn-filled:hover { background: var(--secondary); transform: translateY(-2px); }
        .btn-filled:active { transform: translateY(0); }
        
        .btn-outline {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-outline:hover { background: var(--primary); color: white; }

        .edit-input {
          width: 100%;
          padding: 1.1rem;
          border: 1.8px solid var(--border);
          border-radius: 15px;
          margin-top: 10px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: 0.3s;
        }

        .edit-input:focus { border-color: var(--primary); background: #fcfdfe; }

        .remove-post-btn {
          position: absolute;
          top: 30px;
          right: 30px;
          background: #fff1f2;
          color: #e11d48;
          border: 1px solid #fecdd3;
          padding: 8px 18px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s;
        }

        .remove-post-btn:hover { background: #e11d48; color: white; }

        .comment-section { margin-top: 1.8rem; padding-top: 1.8rem; border-top: 1.5px dashed var(--border); }
        .comment-bubble { background: #f8fafc; padding: 1rem 1.4rem; border-radius: 18px; margin-bottom: 12px; position: relative; }
        .comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
        .comment-user { font-weight: 800; color: var(--primary); font-size: 0.85rem; }
        .comment-delete { color: var(--danger); font-size: 0.75rem; font-weight: 700; cursor: pointer; background: none; border: none; }
        .comment-delete:hover { text-decoration: underline; }

        /* Modal Styles */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 9999;
        }
        .modal-content {
          background: white; border-radius: 30px; padding: 3rem; width: 100%; max-width: 650px;
          max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .close-modal-btn {
          position: absolute; top: 25px; right: 25px; background: #f1f5f9; border: none; width: 40px; height: 40px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
          font-weight: bold; color: var(--text-muted); transition: 0.2s;
        }
        .close-modal-btn:hover { background: #e2e8f0; color: var(--text); }
        
        .badge { display: inline-block; padding: 5px 12px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; }
        .badge-vacancy { background: #eef2ff; color: var(--primary); }
        .badge-update { background: #f0fdf4; color: var(--success); }
        
        .status-badge { padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }
        .status-pending { background: #fef3c7; color: #b45309; }
        .status-shortlisted { background: #e0e7ff; color: #4338ca; }
        .status-selected { background: #dcfce7; color: #15803d; }
      `}</style>

      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2.4rem', color: 'var(--primary)' }}>Nexus.</h1>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '2px', marginTop: '5px' }}>INDUSTRY PORTAL</p>
        </div>
        
        <nav style={{ flex: 1 }}>
          <div className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => {setActiveTab('dashboard'); setViewingCompanyProfile(null);}}>
            <span style={{ fontSize: '1.3rem' }}>🌍</span> Global Feed
          </div>
          <div className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => {setActiveTab('profile'); setViewingCompanyProfile(null);}}>
            <span style={{ fontSize: '1.3rem' }}>🏢</span> My Enterprise
          </div>
          <div className={`nav-link ${activeTab === 'responses' ? 'active' : ''}`} onClick={() => {setActiveTab('responses'); setViewingCompanyProfile(null);}}>
            <span style={{ fontSize: '1.3rem' }}>📥</span> Vacancy Responses
          </div>
          <div className={`nav-link ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => {setActiveTab('explore'); setViewingCompanyProfile(null);}}>
            <span style={{ fontSize: '1.3rem' }}>🔍</span> Explore Network
          </div>
          <div className={`nav-link ${activeTab === 'chats' ? 'active' : ''}`} onClick={() => setActiveTab('chats')}>
            <span style={{ fontSize: '1.3rem' }}>💬</span> Messages
          </div>
        </nav>

        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '25px', border: '1px solid #eef2ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 10, height: 10, background: 'var(--success)', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Server Active</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '5px' }}>Node: #{companyProfile.id}-GTC</p>
        </div>
      </aside>

      {/* --- CONTENT --- */}
      <main className="main-stage">
        
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && !viewingCompanyProfile && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <header style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display' }}>Industry Insights</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Global vacancies and collaborative updates</p>
              </div>
              <input type="text" className="edit-input" style={{ maxWidth: '400px', margin: 0 }} placeholder="Search vacancies, companies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '3.5rem' }}>
              
              {/* FEED COLUMN */}
              <div>
                {filteredActivities.map(post => (
                  <motion.div key={post.id} className="post-card">
                    {post.ownerId === companyProfile.id && (
                      <button className="remove-post-btn" onClick={() => handleDeletePost(post.id)}>Remove</button>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: 50, height: 50, background: '#eef2ff', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--primary)', border: '1px solid #e2e8f0' }}>
                          {post.ownerName.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{post.ownerName}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{post.date}</div>
                        </div>
                      </div>
                      <span className={`badge ${post.type.includes('Vacancy') || post.type.includes('Internship') ? 'badge-vacancy' : 'badge-update'}`}>
                        {post.type}
                      </span>
                    </div>

                    {post.image && <img src={post.image} className="vacancy-img" alt="media" />}
                    
                    <h4 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{post.title}</h4>
                    <p style={{ lineHeight: '1.8', color: '#475569', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                      {post.desc.length > 100 ? `${post.desc.substring(0, 100)}...` : post.desc}
                    </p>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem' }}>
                      <button className="btn-filled" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }} onClick={() => setSelectedPostDetail(post)}>
                        View Details {post.type !== 'Update' && '& Apply'}
                      </button>
                    </div>
                    
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', gap: '30px' }}>
                      <button 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: post.isLiked ? 'var(--primary)' : '#64748b' }}
                        onClick={() => handleLike(post.id)}
                      >
                        {post.isLiked ? '💙 Interested' : '🤍 Show Interest'} ({post.likes})
                      </button>
                      <button 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}
                        onClick={() => toggleComments(post.id)}
                      >
                        💬 {post.comments.length} Comments
                      </button>
                    </div>

                    {/* COLLAPSIBLE COMMENTS */}
                    <AnimatePresence>
                      {visibleComments[post.id] && (
                        <motion.div className="comment-section" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                          {post.comments.map(c => (
                            <div key={c.id} className="comment-bubble">
                              <div className="comment-header">
                                <span className="comment-user">{c.user}</span>
                                {(c.userId === companyProfile.id || post.ownerId === companyProfile.id) && (
                                  <button className="comment-delete" onClick={() => handleDeleteComment(post.id, c.id, c.userId)}>Delete</button>
                                )}
                              </div>
                              <p style={{ fontSize: '0.95rem', color: '#334155' }}>{c.text}</p>
                            </div>
                          ))}
                          <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
                            <input className="edit-input" style={{ marginTop: 0, padding: '0.8rem' }} placeholder="Add to the conversation..." value={commentInputs[post.id] || ""} onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})} onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)} />
                            <button className="btn-filled" style={{ padding: '0 1.5rem' }} onClick={() => handleAddComment(post.id)}>Send</button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* SIDEBAR COLUMN */}
              <div>
                <h3 style={{ marginBottom: '1.8rem' }}>Top Talent</h3>
                <div className="post-card">
                  {MOCK_STUDENTS.map(s => (
                    <div key={s.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onClick={() => openStudentProfile(s.id)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 800 }}>{s.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{s.match}% Match</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{s.skills.slice(0,3).join(" • ")}</p>
                    </div>
                  ))}
                </div>

                <h3 style={{ marginBottom: '1.8rem', marginTop: '3rem' }}>Partner Network</h3>
                <div className="post-card" style={{ padding: '1rem' }}>
                  {MOCK_INDUSTRIES.map(ind => (
                    <div key={ind.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #f8fafc', cursor: 'pointer' }} onClick={() => {setViewingCompanyProfile(ind); setActiveTab('dashboard');}}>
                      <div style={{ width: 45, height: 45, background: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{ind.logo}</div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{ind.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{ind.domain}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* MY ENTERPRISE OR VIEWING OTHER COMPANY PROFILE */}
        {(activeTab === 'profile' || viewingCompanyProfile) && (
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            
            {viewingCompanyProfile && (
               <button className="btn-outline" style={{ marginBottom: '2rem' }} onClick={() => setViewingCompanyProfile(null)}>
                 ← Back to Explorer
               </button>
            )}

            <div className="profile-header">
              <div className="profile-pic-container">
                {(viewingCompanyProfile ? viewingCompanyProfile.profilePic : companyProfile.profilePic) ? (
                  <img src={viewingCompanyProfile ? viewingCompanyProfile.profilePic : companyProfile.profilePic} alt="Logo" />
                ) : (
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)' }}>
                    {(viewingCompanyProfile ? viewingCompanyProfile.name : companyProfile.name).charAt(0)}
                  </span>
                )}
                {!viewingCompanyProfile && (
                  <label className="profile-pic-overlay">
                    CHANGE LOGO
                    <input type="file" hidden onChange={handleProfilePicChange} accept="image/*" />
                  </label>
                )}
              </div>
              {!viewingCompanyProfile && (
                <button className="btn-filled" style={{ position: 'absolute', right: '35px', bottom: '35px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.3)' }} onClick={() => setIsEditingProfile(!isEditingProfile)}>
                  {isEditingProfile ? "Discard" : "✏️ Edit Portal Info"}
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.8rem', marginBottom: '10px' }}>
                  {viewingCompanyProfile ? viewingCompanyProfile.name : companyProfile.name}
                </h2>
                <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '3rem' }}>
                  {viewingCompanyProfile ? viewingCompanyProfile.tagline : companyProfile.tagline}
                </p>
                
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '30px', border: '1px solid var(--border)' }}>
                  <button className="btn-filled" style={{ width: '100%', marginBottom: '1.5rem', justifyContent: 'center', background: 'var(--text)', color: 'white' }} onClick={() => setShowKnowMore(!showKnowMore)}>
                    {showKnowMore ? "Hide Contact Details" : "Know More"}
                  </button>
                  <AnimatePresence>
                    {showKnowMore && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <div style={{ marginBottom: '25px', marginTop: '10px' }}>
                          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>CORPORATE EMAIL</span>
                          <div style={{ fontWeight: 600 }}>{viewingCompanyProfile ? viewingCompanyProfile.email : companyProfile.email}</div>
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>CONTACT</span>
                          <div style={{ fontWeight: 600 }}>{viewingCompanyProfile ? viewingCompanyProfile.contact : companyProfile.contact}</div>
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>LOCATION</span>
                          <div style={{ fontWeight: 600 }}>{viewingCompanyProfile ? viewingCompanyProfile.location : companyProfile.location}</div>
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>FULL ADDRESS</span>
                          <div style={{ fontWeight: 600, lineHeight: '1.6' }}>{viewingCompanyProfile ? viewingCompanyProfile.address : companyProfile.address}</div>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>DIGITAL DOMAIN</span>
                          <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{viewingCompanyProfile ? viewingCompanyProfile.website : companyProfile.website}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="post-card" style={{ height: 'fit-content' }}>
                {isEditingProfile && !viewingCompanyProfile ? (
                  <form onSubmit={handleProfileUpdate}>
                    <h3 style={{ marginBottom: '2.5rem' }}>Portal Configuration</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div><label style={{ fontSize: '0.8rem', fontWeight: 800 }}>Enterprise Name</label><input name="name" className="edit-input" defaultValue={companyProfile.name} /></div>
                      <div><label style={{ fontSize: '0.8rem', fontWeight: 800 }}>Industry Focus</label><input name="industry" className="edit-input" defaultValue={companyProfile.industry} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div><label style={{ fontSize: '0.8rem', fontWeight: 800 }}>Foundation Year</label><input name="founded" type="text" className="edit-input" defaultValue={companyProfile.founded} /></div>
                      <div><label style={{ fontSize: '0.8rem', fontWeight: 800 }}>Web Portal URL</label><input name="website" className="edit-input" defaultValue={companyProfile.website} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div><label style={{ fontSize: '0.8rem', fontWeight: 800 }}>Corporate Mail</label><input name="email" className="edit-input" defaultValue={companyProfile.email} /></div>
                      <div><label style={{ fontSize: '0.8rem', fontWeight: 800 }}>Mobile Connect</label><input name="contact" className="edit-input" defaultValue={companyProfile.contact} /></div>
                    </div>
                    <div style={{ marginBottom: '20px' }}><label style={{ fontSize: '0.8rem', fontWeight: 800 }}>Head Office Address</label><textarea name="address" className="edit-input" style={{ height: '80px', resize: 'none' }} defaultValue={companyProfile.address} /></div>
                    <div style={{ marginBottom: '30px' }}><label style={{ fontSize: '0.8rem', fontWeight: 800 }}>About the Enterprise</label><textarea name="about" className="edit-input" style={{ height: '160px', resize: 'none' }} defaultValue={companyProfile.about} /></div>

                    <hr style={{ borderTop: '1px solid var(--border)', margin: '2rem 0' }} />
                    <h4 style={{ marginBottom: '1rem', fontWeight: 800 }}>Manage Achievements</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.5rem' }}>
                      {companyProfile.achievements.map((ach, idx) => (
                        <div key={idx} style={{ background: '#fffbeb', color: '#b45309', padding: '8px 15px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          🏆 {ach}
                          <button type="button" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleDeleteAchievement(ach)}>✕</button>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                      <input className="edit-input" style={{ marginTop: 0 }} placeholder="New Achievement Name..." value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)} />
                      <button type="button" className="btn-filled" style={{ padding: '0 1.5rem', background: 'var(--text)' }} onClick={handleAddAchievement}>Add</button>
                    </div>
                    <button type="submit" className="btn-filled" style={{ width: '100%' }}>Finalize Portal Changes</button>
                  </form>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
                      <h3 style={{ margin: 0 }}>Organization Bio</h3>
                      {!viewingCompanyProfile && <button className="btn-filled" onClick={() => setIsPostModalOpen(true)}>+ Create Post / Vacancy</button>}
                    </div>
                    <p style={{ lineHeight: '1.9', color: '#475569', fontSize: '1.1rem', marginBottom: '3rem' }}>
                      {viewingCompanyProfile ? viewingCompanyProfile.about : companyProfile.about}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '25px', border: '1px solid #eef2ff' }}>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>FOUNDATION</span>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>{viewingCompanyProfile ? viewingCompanyProfile.founded : companyProfile.founded}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '25px', border: '1px solid #eef2ff' }}>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>EMPLOYEES</span>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--success)' }}>
                          {viewingCompanyProfile ? viewingCompanyProfile.employees : "500+"}
                        </div>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.2rem', fontWeight: 800 }}>ACHIEVEMENTS & BADGES</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '3rem' }}>
                      {(viewingCompanyProfile ? viewingCompanyProfile.achievements : companyProfile.achievements).map(a => (
                        <span key={a} style={{ background: '#fffbeb', color: '#b45309', padding: '10px 20px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 800, border: '1px solid #fef3c7' }}>🏆 {a}</span>
                      ))}
                    </div>

                    <h3 style={{ marginBottom: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                      {viewingCompanyProfile ? "Company Activity" : "My Activity & Posts"}
                    </h3>
                    
                    {activities.filter(a => a.ownerId === (viewingCompanyProfile ? viewingCompanyProfile.id : companyProfile.id)).map(post => (
                      <motion.div key={post.id} className="post-card" style={{ padding: '1.8rem', border: '1.5px solid #f1f5f9' }}>
                        {post.ownerId === companyProfile.id && !viewingCompanyProfile && (
                          <button className="remove-post-btn" onClick={() => handleDeletePost(post.id)}>Remove</button>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                          <span className={`badge ${post.type.includes('Vacancy') ? 'badge-vacancy' : 'badge-update'}`}>{post.type}</span>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>{post.date}</span>
                        </div>
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{post.title}</h4>
                        <p style={{ lineHeight: '1.8', color: '#475569', fontSize: '1.05rem', marginBottom: '1.5rem' }}>{post.desc}</p>
                        
                        <button className="btn-outline" style={{ width: '100%' }} onClick={() => setSelectedPostDetail(post)}>
                          View Full Details
                        </button>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* VACANCY RESPONSES TAB */}
        {activeTab === 'responses' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '1rem' }}>Vacancy Responses</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>Review applicants and shortlist candidates for your open positions.</p>
            
            {activities.filter(p => p.ownerId === companyProfile.id && p.type !== 'Update').length === 0 && (
              <div className="post-card" style={{ textAlign: 'center', padding: '4rem' }}>
                <h3 style={{ color: 'var(--text-muted)' }}>You have no active vacancies.</h3>
              </div>
            )}

            {activities.filter(p => p.ownerId === companyProfile.id && p.type !== 'Update').map(post => (
              <div key={post.id} className="post-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{post.title}</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Posted {post.date}</span>
                  </div>
                  <div style={{ background: '#eef2ff', color: 'var(--primary)', padding: '10px 20px', borderRadius: '15px', fontWeight: 800 }}>
                    {post.applications?.length || 0} Applications
                  </div>
                </div>

                {!post.applications || post.applications.length === 0 ? (
                  <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0' }}>No applications yet for this vacancy.</p>
                ) : (
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {post.applications.map(app => (
                      <div key={app.id} style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{app.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>{app.email}</p>
                          <span className={`status-badge status-${app.status.toLowerCase()}`}>
                            {app.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                          <button className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => openStudentProfile(app.studentId)}>
                            View Profile
                          </button>
                          {app.status === 'Pending' && (
                            <button className="btn-filled" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => updateApplicationStatus(post.id, app.id, 'Shortlisted')}>
                              Shortlist Candidate
                            </button>
                          )}
                          {app.status === 'Shortlisted' && (
                            <button className="btn-filled" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: 'var(--success)' }} onClick={() => updateApplicationStatus(post.id, app.id, 'Selected')}>
                              Select & Hire
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* EXPLORE NETWORK */}
        {activeTab === 'explore' && !viewingCompanyProfile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '2.5rem' }}>Global Directory</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
              {filteredIndustries.map(ind => (
                <div key={ind.id} className="post-card" style={{ cursor: 'pointer' }} onClick={() => setViewingCompanyProfile(ind)}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ width: 65, height: 65, background: 'var(--primary)', color: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900 }}>{ind.logo}</div>
                    <div><h4 style={{ fontSize: '1.2rem' }}>{ind.name}</h4><p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem' }}>{ind.domain}</p></div>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.7', marginBottom: '2rem' }}>{ind.bio}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>📍 {ind.location}</span>
                    <button className="btn-outline" style={{ padding: '5px 15px', fontSize: '0.75rem' }}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* MESSAGES */}
        {activeTab === 'chats' && (
          <div style={{ height: '75vh', display: 'flex', background: 'white', borderRadius: '35px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '350px', background: '#fcfdfe', borderRight: '1px solid var(--border)', overflowY: 'auto' }}>
              <div style={{ padding: '2.2rem', fontWeight: 900, fontSize: '1.3rem', borderBottom: '1px solid var(--border)' }}>Direct Messages</div>
              
              {activeChat && activeChat.type === 'Student' && (
                <div style={{ padding: '1.5rem 2.2rem', cursor: 'pointer', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: 45, height: 45, background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{activeChat.logo}</div>
                    <div><div style={{ fontWeight: 800 }}>{activeChat.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Student • Online</div></div>
                  </div>
                </div>
              )}

              {MOCK_INDUSTRIES.map(ind => (
                <div key={ind.id} style={{ padding: '1.5rem 2.2rem', cursor: 'pointer', borderBottom: '1px solid #f8fafc', background: activeChat?.id === ind.id ? '#f1f5f9' : 'transparent' }} onClick={() => setActiveChat({id: ind.id, name: ind.name, logo: ind.logo, type: "Enterprise"})}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: 45, height: 45, background: '#eef2ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--primary)' }}>{ind.logo}</div>
                    <div><div style={{ fontWeight: 800 }}>{ind.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Enterprise • Online</div></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#94a3b8' }}>
              {activeChat ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '2rem 3rem', borderBottom: '1px solid var(--border)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: 40, height: 40, background: 'var(--primary)', color: 'white', borderRadius: activeChat.type === 'Student' ? '50%' : '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activeChat.logo}</div>
                    {activeChat.name}
                  </div>
                  <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <div style={{ background: '#f1f5f9', padding: '1.2rem', borderRadius: '20px 20px 20px 0', maxWidth: '60%', color: 'var(--text)' }}>
                      {activeChat.type === 'Student' ? `Hello ${companyProfile.name}, thank you for reaching out regarding my application.` : `Welcome to the collaborative network. How can we help?`}
                    </div>
                  </div>
                  <div style={{ padding: '2rem', display: 'flex', gap: '15px', borderTop: '1px solid var(--border)' }}><input className="edit-input" style={{ margin: 0 }} placeholder="Write your message..." /><button className="btn-filled">Send</button></div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                  <p style={{ fontWeight: 600 }}>Select a node or student to initiate encrypted communication</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* --- CREATE POST / VACANCY MODAL --- */}
      <AnimatePresence>
        {isPostModalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <button className="close-modal-btn" onClick={() => setIsPostModalOpen(false)}>✕</button>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '2rem' }}>Publish Activity</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>CONTENT CATEGORY</label>
                  <select className="edit-input" value={newPost.type} onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}>
                    <option value="Job Vacancy">Job Vacancy</option>
                    <option value="Internship">Internship Opportunity</option>
                    <option value="Update">Corporate Update</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>POST TITLE</label>
                  <input className="edit-input" style={{marginTop:0}} placeholder="Title..." value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                </div>
              </div>

              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>DESCRIPTION</label>
              <textarea className="edit-input" style={{ height: '100px', resize: 'none', marginBottom: '15px' }} placeholder="Detailed requirements..." value={newPost.desc} onChange={(e) => setNewPost({ ...newPost, desc: e.target.value })} />
              
              {(newPost.type === 'Job Vacancy' || newPost.type === 'Internship') && (
                <>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>REQUIRED SKILLS</label>
                  <input className="edit-input" style={{marginTop:0, marginBottom: '15px'}} placeholder="E.g. React, Python, UI/UX..." value={newPost.skills} onChange={(e) => setNewPost({ ...newPost, skills: e.target.value })} />
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>DURATION / TYPE</label>
                      <input className="edit-input" style={{marginTop:0}} placeholder={newPost.type === 'Internship' ? "E.g. 6 Months" : "E.g. Full-Time"} value={newPost.duration} onChange={(e) => setNewPost({ ...newPost, duration: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>OFFERINGS / PERKS</label>
                      <input className="edit-input" style={{marginTop:0}} placeholder="Stipend, Certifications..." value={newPost.offerings} onChange={(e) => setNewPost({ ...newPost, offerings: e.target.value })} />
                    </div>
                  </div>
                </>
              )}

              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>ATTACH MEDIA (IMAGE)</label>
              <input type="file" className="edit-input" style={{ padding: '0.7rem' }} onChange={handlePostImageUpload} accept="image/*" />
              
              {newPost.image && (
                <div style={{ marginTop: '20px', borderRadius: '15px', overflow: 'hidden', height: '150px' }}>
                  <img src={newPost.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <button className="btn-filled" style={{ width: '100%', marginTop: '30px', padding: '1.2rem', fontSize: '1.1rem' }} onClick={handleCreatePost}>Publish to Network</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VACANCY DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedPostDetail && !isApplyModalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
              <button className="close-modal-btn" onClick={() => setSelectedPostDetail(null)}>✕</button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                <div style={{ width: 60, height: 60, background: '#eef2ff', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem', color: 'var(--primary)' }}>
                  {selectedPostDetail.ownerName.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{selectedPostDetail.title}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 800 }}>{selectedPostDetail.ownerName} • {selectedPostDetail.type}</p>
                </div>
              </div>

              {selectedPostDetail.image && (
                <img src={selectedPostDetail.image} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '20px', marginBottom: '2rem' }} alt="Post" />
              )}

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '10px' }}>DESCRIPTION</h4>
                <p style={{ lineHeight: '1.8', color: 'var(--text)' }}>{selectedPostDetail.desc}</p>
              </div>

              {(selectedPostDetail.type === 'Job Vacancy' || selectedPostDetail.type === 'Internship') && (
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>REQUIRED SKILLS</span>
                      <div style={{ fontWeight: 700 }}>{selectedPostDetail.skills || "Not specified"}</div>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px' }}>DURATION / TYPE</span>
                      <div style={{ fontWeight: 700 }}>{selectedPostDetail.duration || "Standard"}</div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '5px', marginTop: '10px' }}>WHAT WE OFFER</span>
                      <div style={{ fontWeight: 700, color: 'var(--success)' }}>{selectedPostDetail.offerings || "Standard industry perks"}</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedPostDetail.type !== 'Update' && (
                <button className="btn-filled" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', justifyContent: 'center' }} onClick={() => setIsApplyModalOpen(true)}>
                  Apply for this Role
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- APPLICATION FORM MODAL --- */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <button className="close-modal-btn" onClick={() => setIsApplyModalOpen(false)}>✕</button>
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '2rem' }}>Application Form</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Applying to <strong>{selectedPostDetail?.ownerName}</strong> for <strong>{selectedPostDetail?.title}</strong></p>
              
              <form onSubmit={handleApplyToVacancy}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>FULL NAME</label>
                <input required className="edit-input" style={{ marginBottom: '15px' }} placeholder="John Doe" value={applicationForm.name} onChange={e => setApplicationForm({...applicationForm, name: e.target.value})} />
                
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>EMAIL ADDRESS</label>
                <input required type="email" className="edit-input" style={{ marginBottom: '15px' }} placeholder="john@example.com" value={applicationForm.email} onChange={e => setApplicationForm({...applicationForm, email: e.target.value})} />
                
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>COVER LETTER / WHY HIRE YOU?</label>
                <textarea required className="edit-input" style={{ height: '120px', resize: 'none', marginBottom: '25px' }} placeholder="Briefly explain your suitability for this role..." value={applicationForm.coverLetter} onChange={e => setApplicationForm({...applicationForm, coverLetter: e.target.value})} />
                
                <button type="submit" className="btn-filled" style={{ width: '100%', padding: '1.2rem', justifyContent: 'center' }}>Submit Application</button>
                <button type="button" className="btn-outline" style={{ width: '100%', marginTop: '15px', border: 'none', color: 'var(--text-muted)' }} onClick={() => setIsApplyModalOpen(false)}>Cancel</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STUDENT PROFILE MODAL --- */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} style={{ maxWidth: '750px' }}>
              <button className="close-modal-btn" onClick={() => setSelectedStudent(null)}>✕</button>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                <div style={{ width: 100, height: 100, borderRadius: '30px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 900 }}>
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ fontSize: '2.2rem', margin: 0 }}>{selectedStudent.name}</h2>
                  <p style={{ color: 'var(--primary)', fontWeight: 800 }}>{selectedStudent.email} • {selectedStudent.contact}</p>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '10px' }}>ABOUT STUDENT</h4>
                <p style={{ lineHeight: '1.7' }}>{selectedStudent.about}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '10px' }}>CORE SKILLS</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedStudent.skills.map(skill => (
                      <span key={skill} style={{ background: '#eef2ff', color: 'var(--secondary)', padding: '5px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700 }}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '10px' }}>EXPERIENCE</h4>
                  <p style={{ fontWeight: 600 }}>{selectedStudent.experience}</p>
                </div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '10px' }}>CERTIFICATIONS</h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text)' }}>
                  {selectedStudent.certificates.map((cert, idx) => (
                    <li key={idx} style={{ marginBottom: '8px', fontWeight: 600 }}>{cert}</li>
                  ))}
                </ul>
              </div>

              <button className="btn-filled" style={{ width: '100%', padding: '1.2rem', justifyContent: 'center' }} onClick={() => startChatWithStudent(selectedStudent)}>
                💬 Message Student
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NOTIFICATIONS --- */}
      <div style={{ position: 'fixed', bottom: '3rem', right: '3rem', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ background: '#1e293b', color: 'white', padding: '1.3rem 2.5rem', borderRadius: '22px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', fontSize: '0.95rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 10, height: 10, background: 'var(--primary)', borderRadius: '50%' }}></div> {n.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}