import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import FavoriteProvider from './contexts/FavoriteContext';
import SearchProvider from './contexts/SearchContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginForm';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
      <Router>
        <AuthProvider>
          <FavoriteProvider>
            <SearchProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
              </Routes>
            </SearchProvider>
          </FavoriteProvider>
        </AuthProvider>
      </Router>
  );
};

export default App;
