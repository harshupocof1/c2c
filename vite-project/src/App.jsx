import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importing the page components
// Ensure these names match your exact file names in the 'pages' folder
import Login from "./pages/login"; 
import Register from "./pages/Register"; 
import StudentDashboard from "./pages/StudentDashboard"; 
import IndustryDashboard from "./pages/IndustryDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to the Login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Route for the Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for the Register page */}
        <Route path="/register" element={<Register />} />

        {/* Routes for the Dashboards after successful login */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/industry" element={<IndustryDashboard />} />
      </Routes>
    </Router>
  );
}