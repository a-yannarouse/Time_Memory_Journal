import './App.css';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';

function App() {
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
  }
    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "870205317500-9gjs5gfkrmd36mhmntj0f8uq81q81s3m.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large"}
      );
    }, []);

  return (
    <div>
      <LoginSignUp/>
      <div id = "signInDiv"> </div>
    </div>
  );
}

export default App;
