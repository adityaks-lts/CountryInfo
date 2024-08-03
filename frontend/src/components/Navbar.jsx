import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo">CountryInfo</div>
      <ul className="nav-links">
        <li><Link to="/"> Home</Link></li>
        {auth.user ? (
          <>
            <li><Link to="/favorites"> Favorites</Link></li>
            <li><button onClick={logout} className="logout-button"> Sign out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login"> Login</Link></li>
            <li><Link to="/signup"> Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
