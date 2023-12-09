import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css'; 

//homepage component
const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Travel Journal!</h1>
      <p>Your adventure starts here. Join us now or sign in!</p>
      <div className="navigation-links">
        <Link to="/signup" className="nav-link">Sign Up</Link>
        <Link to="/signin" className="nav-link">Sign In</Link>
      </div>
    </div>
  )
}

export default Home;
