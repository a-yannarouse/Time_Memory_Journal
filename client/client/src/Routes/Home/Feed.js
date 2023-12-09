import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Feed.css';

//user personal feed component
const Feed = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    } else {
        // Fetch trips only if authenticated
        const fetchTrips = async () => {
          try {
            const response = await fetch('http://localhost:5000/trips', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
  
            if (!response.ok) {
              throw new Error('Failed to fetch trips');
            }
  
            const fetchedTrips = await response.json();
            setTrips(fetchedTrips);
          } catch (error) {
            console.error('Error fetching trips:', error);
          }
        };
  
        fetchTrips();
      }
    }, [isAuthenticated, navigate]); 

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    navigate('/'); // Redirect to the home page after sign out
  };

  const handleAddEntry = () => {
    navigate('/add-entry'); // Navigate to the add entry page
  };

  const viewTripDetails = (tripId) => {
    navigate(`/trip/${tripId}`); // Navigate to the trip details page
  };

  return (
    <div className="feed-container">
      <nav className="navbar">
        <button onClick={handleAddEntry} className="nav-button">Add Entry</button>
        <button onClick={handleSignOut} className="nav-button">Sign Out</button>
      </nav>
      <div className="content">
        <h1>Welcome to Your Personal Journal</h1>
        <div className="journal-entries">
            {trips.map(trip => (
                <div key={trip._id} className="trip-entry" onClick={() => viewTripDetails(trip._id)}>
                    <img src={trip.pic} alt={trip.destination} />
                    <div className="trip-info">
                        <h3>{trip.destination}</h3>
                        <p className="date">{new Date(trip.arrived).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
