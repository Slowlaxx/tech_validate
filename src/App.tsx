import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SkillsPage from './pages/SkillsPage';
import TestsPage from './pages/TestsPage';
import TestPage from './pages/TestPage';
import CandidatesPage from './pages/CandidatesPage';
import AboutPage from './pages/AboutPage';

// Admin Pages
import AdminTestsPage from './pages/admin/AdminTestsPage';

// Company Pages
import CompanyTestsPage from './pages/company/CompanyTestsPage';

// Candidate Pages
import CandidateCustomTestsPage from './pages/candidate/CandidateCustomTestsPage';
import CustomTestPage from './pages/candidate/CustomTestPage';

// Protected route component
const ProtectedRoute: React.FC<{ 
  element: React.ReactElement; 
  allowedRoles?: ('candidate' | 'company' | 'admin')[];
}> = ({ element, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="about" element={<AboutPage />} />
          
          {/* Protected routes */}
          <Route 
            path="profile" 
            element={<ProtectedRoute element={<ProfilePage />} />} 
          />
          
          {/* Candidate routes */}
          <Route 
            path="skills" 
            element={<ProtectedRoute element={<SkillsPage />} allowedRoles={['candidate']} />} 
          />
          <Route 
            path="tests" 
            element={<ProtectedRoute element={<TestsPage />} allowedRoles={['candidate']} />} 
          />
          <Route 
            path="test/:language/:level" 
            element={<ProtectedRoute element={<TestPage />} allowedRoles={['candidate']} />} 
          />
          <Route 
            path="company-tests" 
            element={<ProtectedRoute element={<CandidateCustomTestsPage />} allowedRoles={['candidate']} />} 
          />
          <Route 
            path="custom-test/:testId" 
            element={<ProtectedRoute element={<CustomTestPage />} allowedRoles={['candidate']} />} 
          />
          
          {/* Company routes */}
          <Route 
            path="candidates" 
            element={<ProtectedRoute element={<CandidatesPage />} allowedRoles={['company']} />} 
          />
          <Route 
            path="company/tests" 
            element={<ProtectedRoute element={<CompanyTestsPage />} allowedRoles={['company']} />} 
          />
          
          {/* Admin routes */}
          <Route 
            path="admin/tests" 
            element={<ProtectedRoute element={<AdminTestsPage />} allowedRoles={['admin']} />} 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;