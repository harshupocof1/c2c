import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [role, setRole] = useState("student"); // Default role
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    rollNo: "",      
    companyId: "",   
    companyEmail: "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (role === "student") {
      console.log("Student Login:", formData.rollNo);
      navigate("/student");
    } else {
      console.log("Industry Login:", formData.companyEmail);
      navigate("/industry");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute w-72 h-72 bg-blue-400 opacity-20 blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-400 opacity-20 blur-3xl bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/60 border border-white/30 p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          {role === "student" ? "Student Portal" : "Industry Portal"}
        </h2>

        {/* --- TABS SECTION (Dropdown ki jagah) --- */}
        <div className="flex bg-gray-200/50 p-1 rounded-xl mb-8 relative">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg z-10 transition-colors ${
              role === "student" ? "text-white" : "text-gray-500"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("industry")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg z-10 transition-colors ${
              role === "industry" ? "text-white" : "text-gray-500"
            }`}
          >
            Industry
          </button>
          
          {/* Animated Background Slider */}
          <motion.div
            layoutId="activeTab"
            className="absolute top-1 bottom-1 left-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md"
            initial={false}
            animate={{
              x: role === "student" ? 0 : "100%",
              width: "calc(50% - 4px)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* --- FORM SECTION --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {role === "student" ? (
              <input
                type="text"
                name="rollNo"
                placeholder="University Roll Number"
                value={formData.rollNo}
                onChange={handleChange}
                className="w-full mb-3 p-3 rounded-xl border border-white/50 bg-white/40 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
            ) : (
              <>
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="Official Company Email"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  className="w-full mb-3 p-3 rounded-xl border border-white/50 bg-white/40 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                />
                <input
                  type="text"
                  name="companyId"
                  placeholder="Registration ID"
                  value={formData.companyId}
                  onChange={handleChange}
                  className="w-full mb-3 p-3 rounded-xl border border-white/50 bg-white/40 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                />
              </>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-6 p-3 rounded-xl border border-white/50 bg-white/40 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl shadow-lg hover:shadow-purple-200 active:scale-95 transition-all font-bold"
        >
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </motion.div>
    </div>
  );
}