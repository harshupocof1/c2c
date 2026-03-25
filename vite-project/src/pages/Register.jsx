import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Importing the background video (Ensure the path is correct)
import bgVideo from "../assets/bg-video.mp4";

export default function Register() {
  const navigate = useNavigate();
  // State to manage the active registration role (student or industry)
  const [role, setRole] = useState("student");

  // Comprehensive state to manage all form fields for both roles
  const [formData, setFormData] = useState({
    // Common Fields
    password: "",
    confirmPassword: "",
    
    // Student Specific Fields
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    studentDOB: "", // Added Date of Birth field
    qualification: "",
    universityName: "",
    studentCity: "",
    rollNo: "", // Kept for registration, but not used for login anymore
    
    // Industry Specific Fields
    enterpriseName: "",
    industryFocus: "",
    foundedYear: "",
    website: "",
    companyEmail: "",
    contactNumber: "",
    location: "",
    address: ""
  });

  // Handle dynamic input changes for all fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the registration submission process
  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match. Please verify.");
      return;
    }

    if (role === "student") {
      console.log("Registering Student:", formData.studentEmail, formData.studentDOB);
    } else {
      console.log("Registering Enterprise:", formData.enterpriseName, formData.companyEmail);
    }
    
    // Redirect to login page after successful registration
    navigate("/login");
  };

  // Placeholder for Google OAuth integration
  const handleGoogleLogin = () => {
    console.log("Initiating Google Authentication for Registration...");
  };

  return (
    // Main full-screen wrapper container
    <div className="relative min-h-screen flex items-center justify-center p-4 py-10">
      
      {/* Background Video Section */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark overlay to ensure form readability over the video */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Main Glassmorphism Registration Container */}
      <div className="relative z-20 flex w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden min-h-[600px] border border-white/20">
        
        {/* Left Side: Animated Graphics and Branding */}
        <div className="hidden lg:flex w-2/5 bg-black/30 relative items-center justify-center overflow-hidden">
          <motion.div
            animate={{ y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-72 h-72 bg-purple-500/40 rounded-full mix-blend-screen filter blur-[80px]"
          />
          <motion.div
            animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/40 rounded-full mix-blend-screen filter blur-[80px]"
          />
          
          <div className="relative z-10 text-white text-center p-8">
            <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Join Us Today!</h1>
            <p className="text-gray-200 text-lg font-medium drop-shadow-md leading-relaxed">
              Create your account to unlock exclusive tools, manage your profile, and connect with the network.
            </p>
          </div>
        </div>

        {/* Right Side: Scrollable Registration Form Area */}
        <div className="w-full lg:w-3/5 p-8 sm:p-12 flex flex-col relative bg-white/95 overflow-y-auto max-h-[90vh] custom-scrollbar">
          
          <div className="text-center mb-6 flex-shrink-0">
            <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">Please fill in the details below</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6 relative shadow-inner border border-gray-200 flex-shrink-0">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-3 text-sm font-bold rounded-lg z-10 transition-colors ${role === "student" ? "text-white" : "text-gray-600 hover:text-indigo-600"}`}
            >
              Student
            </button>
            <button
              onClick={() => setRole("industry")}
              className={`flex-1 py-3 text-sm font-bold rounded-lg z-10 transition-colors ${role === "industry" ? "text-white" : "text-gray-600 hover:text-indigo-600"}`}
            >
              Industry / Enterprise
            </button>
            <motion.div
              layoutId="registerTab"
              className="absolute top-1 bottom-1 left-1 bg-indigo-600 rounded-lg shadow-md"
              initial={false}
              animate={{ x: role === "student" ? 0 : "100%", width: "calc(50% - 4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all mb-6 flex-shrink-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center mb-6 flex-shrink-0">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm font-medium">OR REGISTER MANUALLY</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Dynamic Form Sections based on Role */}
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-shrink-0 mb-6"
            >
              {role === "student" ? (
                
                // --- STUDENT FORM SECTION (Grid Layout) ---
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="relative">
                      <input type="text" id="studentName" name="studentName" placeholder=" " value={formData.studentName} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="studentName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Full Name
                      </label>
                    </div>

                    {/* Email Address (Now required for Login) */}
                    <div className="relative">
                      <input type="email" id="studentEmail" name="studentEmail" placeholder=" " value={formData.studentEmail} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="studentEmail" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Email Address
                      </label>
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <input type="tel" id="studentPhone" name="studentPhone" placeholder=" " value={formData.studentPhone} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="studentPhone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Phone Number
                      </label>
                    </div>

                    {/* Date of Birth (With floating label fix) */}
                    <div className="relative">
                      <input 
                        type="text" 
                        onFocus={(e) => (e.target.type = "date")} 
                        onBlur={(e) => (!e.target.value ? (e.target.type = "text") : null)}
                        id="studentDOB" 
                        name="studentDOB" 
                        placeholder=" " 
                        value={formData.studentDOB} 
                        onChange={handleChange} 
                        className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" 
                      />
                      <label htmlFor="studentDOB" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Date of Birth
                      </label>
                    </div>

                    {/* University Roll Number */}
                    <div className="relative">
                      <input type="text" id="rollNo" name="rollNo" placeholder=" " value={formData.rollNo} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="rollNo" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        University Roll Number
                      </label>
                    </div>

                    {/* Qualification */}
                    <div className="relative">
                      <input type="text" id="qualification" name="qualification" placeholder=" " value={formData.qualification} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="qualification" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Qualification / Degree
                      </label>
                    </div>

                    {/* University Name */}
                    <div className="relative">
                      <input type="text" id="universityName" name="universityName" placeholder=" " value={formData.universityName} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="universityName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        University Name
                      </label>
                    </div>

                    {/* City */}
                    <div className="relative">
                      <input type="text" id="studentCity" name="studentCity" placeholder=" " value={formData.studentCity} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="studentCity" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        City
                      </label>
                    </div>

                  </div>
                </div>

              ) : (

                // --- INDUSTRY / ENTERPRISE FORM SECTION (Grid Layout) ---
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Enterprise Name */}
                    <div className="relative">
                      <input type="text" id="enterpriseName" name="enterpriseName" placeholder=" " value={formData.enterpriseName} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="enterpriseName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Enterprise Name
                      </label>
                    </div>

                    {/* Industry Focus */}
                    <div className="relative">
                      <input type="text" id="industryFocus" name="industryFocus" placeholder=" " value={formData.industryFocus} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="industryFocus" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Industry Focus (e.g., IT, Manufacturing)
                      </label>
                    </div>

                    {/* Founded Year */}
                    <div className="relative">
                      <input type="number" id="foundedYear" name="foundedYear" placeholder=" " value={formData.foundedYear} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="foundedYear" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Founded Year
                      </label>
                    </div>

                    {/* Website */}
                    <div className="relative">
                      <input type="url" id="website" name="website" placeholder=" " value={formData.website} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="website" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Website URL
                      </label>
                    </div>

                    {/* Official Company Email */}
                    <div className="relative">
                      <input type="email" id="companyEmail" name="companyEmail" placeholder=" " value={formData.companyEmail} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="companyEmail" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Official Company Email
                      </label>
                    </div>

                    {/* Contact Number */}
                    <div className="relative">
                      <input type="tel" id="contactNumber" name="contactNumber" placeholder=" " value={formData.contactNumber} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                      <label htmlFor="contactNumber" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                        Contact Number
                      </label>
                    </div>
                  </div>

                  {/* Location (City/State) */}
                  <div className="relative">
                    <input type="text" id="location" name="location" placeholder=" " value={formData.location} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
                    <label htmlFor="location" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                      City / Location
                    </label>
                  </div>

                  {/* Full Address */}
                  <div className="relative">
                    <textarea id="address" name="address" rows="2" placeholder=" " value={formData.address} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all resize-none"></textarea>
                    <label htmlFor="address" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                      Full Address
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Common Password Fields (Always Visible at the bottom of the form) */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 flex-shrink-0">
            {/* Password Input */}
            <div className="relative w-full sm:w-1/2">
              <input type="password" id="regPassword" name="password" placeholder=" " value={formData.password} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
              <label htmlFor="regPassword" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                Password
              </label>
            </div>

            {/* Confirm Password Input */}
            <div className="relative w-full sm:w-1/2">
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder=" " value={formData.confirmPassword} onChange={handleChange} className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 peer transition-all" />
              <label htmlFor="confirmPassword" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text">
                Confirm Password
              </label>
            </div>
          </div>

          {/* Registration Submit Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg shadow-lg hover:shadow-indigo-500/40 active:scale-95 transition-all font-bold text-lg tracking-wide flex-shrink-0"
          >
            CREATE ACCOUNT
          </button>

          {/* Navigation link to go back to Login */}
          <p className="text-center mt-6 text-sm font-medium text-gray-600 flex-shrink-0">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="text-indigo-700 font-bold cursor-pointer hover:underline">
              Login here
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}