import React, { useState, useEffect } from 'react';
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //This function handles the google Oauth response
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  
    const endpoint = 'http://localhost:5000/users/google-auth'; 
  
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Asd")

      if (data.success) {
        console.log('Google Sign-In successful:', data);
        localStorage.setItem('token', data.token);
        window.location.href = '/journal'; // Redirect to home
      } else {
        alert(data.message);        
      }
    })
    .catch(error => {
      console.error('Error during Google Sign-In:', error);
      alert('An error occurred during Google Sign-In');
    });
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "870205317500-9gjs5gfkrmd36mhmntj0f8uq81q81s3m.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log('Signup attempted'); 

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const endpoint = 'http://localhost:5000/users/signup';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.result));
        window.location.href = '/journal';
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div className="signup-container">
    <form className="signup-form" onSubmit={handleSignup}>
      <h2>Welcome to the Travel Journal!</h2>
      <input type="text" placeholder="Username" name="username" required value={username}
          onChange={(e) => setUsername(e.target.value)}/>
      <input type="email" placeholder="Email" name="email" required  value={email}
          onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" name="password" required value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      <input type="password" placeholder="Confirm Password" name="confirmPassword" required value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}/>
      <button type="submit">Signup</button>
      <p>Already have an account? <a href="/signin">Login!</a></p>
      <div className="separator"></div>
      <div id="googleSignInButton"></div> {/* Google Sign-In button will be rendered here */}
    </form>
  </div>
  )
}

export default Signup
