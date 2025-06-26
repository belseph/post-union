import { useState } from 'react';
import { MentorDashboard } from './components/MentorDashboard';
import { EntrepreneurDashboard } from './components/EntrepreneurDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login/Login';
import { ResetPasswordPage } from './components/Login/pages/ResetPasswordPage.tsx'
import NavBarWrapper from './components/NavBar/NavBarWrapper';
import Footer from './components/Footer/Footer.tsx';
import { AddPost } from './components/Home/AddPost.tsx';
import About from './pages/About/About.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import PrivateRoute from './components/PrivateRoutes.tsx';
import './App.css'

// Componente interno que tiene acceso al contexto de autenticación
function AppContent() {
  const { user } = useAuth();
  const [selectedTag] = useState<string>('all');

  // Obtener el ID del usuario actual desde el contexto
  const currentUserId = user?.userId || null;

  console.log('🔍 Usuario en App:', user);
  console.log('🆔 Current User ID:', currentUserId);

  return (
    <div className='app-container'>
      <NavBarWrapper />
      <main className='app-main-content'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<PrivateRoute><Home selectedTag={selectedTag} currentUserId={currentUserId} /></PrivateRoute>} />
          <Route path="/add-post" element={<PrivateRoute><AddPost /></PrivateRoute>} />
          <Route path="/reset-password" element={<PrivateRoute><ResetPasswordPage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><EntrepreneurDashboard /></PrivateRoute>} />
          <Route path="/mentor-dashboard" element={<PrivateRoute><MentorDashboard /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;