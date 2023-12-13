import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from './logo411.svg';

const Home = () => {
  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <img src={logo} alt="Travel Journal Logo" style={{ height: '50px', marginRight: '10px' }} />
        <span style={{ fontFamily: 'Playfair Display', fontSize: '24px', fontWeight: '700', color: '#4B4A67' }}>Travel Journal</span>
      </header>
      <div className="home-container">
        <h1>Welcome to the Travel Journal!</h1>
        <p>Your adventure starts here. Join us now or sign in!</p>
        <div className="navigation-links">
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/signin" className="nav-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
