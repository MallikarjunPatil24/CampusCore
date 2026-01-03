import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SplashScreen from "./components/SplashScreen";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ClassSection from "./pages/admin/ClassSection";
import StudentRegistration from "./pages/admin/StudentRegistration";
import StudentList from "./pages/admin/StudentList";
import SubjectPage from "./pages/admin/SubjectPage";
import SubjectList from "./pages/admin/SubjectList";
import AttendancePage from "./pages/admin/AttendancePage";
import MarksEntry from "./pages/admin/MarksEntry";
import AddNotice from "./pages/admin/AddNotice";
import StudentProfile from "./pages/admin/StudentProfile";
import AdminRegister from "./pages/AdminRegister";

function App() {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem("token");

  // 🔹 Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timer);
  }, []);

  // 🔹 Show splash screen first
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<AdminRegister />} />
        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/classes"
          element={
            isAuthenticated ? <ClassSection /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/add-student"
          element={
            isAuthenticated ? <StudentRegistration /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/students"
          element={isAuthenticated ? <StudentList /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/subjects"
          element={isAuthenticated ? <SubjectPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/subjects/list"
          element={isAuthenticated ? <SubjectList /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/attendance"
          element={
            isAuthenticated ? <AttendancePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/marks"
          element={isAuthenticated ? <MarksEntry /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/add-notice"
          element={isAuthenticated ? <AddNotice /> : <Navigate to="/login" />}
        />
        <Route path="/admin/students/:id" element={<StudentProfile />} />
        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
