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
import { AuthProvider } from './context/AuthContext.tsx';
import PrivateRoute from './components/PrivateRoutes.tsx';
import './App.css'


function App() {

  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentUserId] = useState<string | null>('1');

  return (
    <Router>
      <AuthProvider>
        <div className='app-container'>
          <NavBarWrapper />
          <main className='app-main-content'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<PrivateRoute><Home selectedTag={undefined} currentUserId={undefined} /></PrivateRoute>} />
              <Route path="/add-post" element={<PrivateRoute><AddPost /></PrivateRoute>} />
              <Route path="/reset-password" element={<PrivateRoute><ResetPasswordPage /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><EntrepreneurDashboard /></PrivateRoute>} />
              <Route path="/mentor-dashboard" element={<PrivateRoute><MentorDashboard /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
