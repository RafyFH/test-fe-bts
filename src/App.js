import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChecklistPage from './pages/ChecklistPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';


const PrivateRoute = ({ element: Component }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Jika ada user dan token, izinkan akses ke halaman yang dilindungi
  return user && user.token ? <Component /> : <Navigate to="/login" />;
};
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checklist" element={<PrivateRoute element={ChecklistPage} />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;