import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Routes/Auth/Component/Login-SignUp/Signup';
import Signin from './Routes/Auth/Component/Login-SignUp/Signin';
import Home from './Routes/Home/Home';
import Feed from './Routes/Home/Feed';
import Entry from './Routes/Action/Entry';
import TripDetail from './Routes/Action/TripDetails';

function App() {
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/journal" element={<Feed />} />
        <Route path="/add-entry" element={<Entry />} />
        <Route path="/trip/:tripId" element={<TripDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
