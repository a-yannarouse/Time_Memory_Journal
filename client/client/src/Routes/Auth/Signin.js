import React, { useState, useEffect } from 'react';
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        console.log(data.user);
        //localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/'; // Redirect to home
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
  
  //This function handle signing in through normal input
  const handleSignin = async (event) => {
    event.preventDefault();
    console.log('Signin attempted');

    const endpoint = 'http://localhost:5000/users/signin';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signin successful:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.result));
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignin}>
        <h2>Welcome Back</h2>
        <input type="email" placeholder="Email" name="email" required  value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" name="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Sign In</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        <div className="separator"></div>
        <div id="googleSignInButton"></div> {/* Google Sign-In button will be rendered here */}
      </form>
    </div>
  );
};

export default Signin;
