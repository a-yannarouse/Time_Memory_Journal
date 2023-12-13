import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./TripDetails.css"

//component for trip details
const TripDetail = () => {
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  //Get the trip details
  useEffect(() => {
    const fetchTripDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/trips/${tripId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trip details');
        }

        const data = await response.json();
        setTrip(data);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      }
    };

    fetchTripDetail();
  }, [tripId]);

  //Get the weather data from weatherapi.com
  useEffect(() => {
    if (trip) {
      const WEATHERAPI_API_KEY = 'd69226f7bb5045198ba220800230512'; // Insert your actual API key here
      const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_API_KEY}&q=${encodeURIComponent(trip.destination)}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.success === false) {
            throw new Error(data.error.info);
          } else {
            setWeather(data.current);
          }
        })
        .catch(error => {
          console.error('Error fetching current weather:', error);
        });
    }
  }, [trip]);

  //the go back button
  const goBackToFeed = () => {
    navigate('/journal');
  };

  if (!trip) {
    return <div>Loading...</div>;
  }

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className="trip-detail-container">
      <div className="trip-description">
        <h1>{trip.destination}</h1>
        <p className="trip-dates">{`From ${new Date(trip.arrived).toLocaleDateString()} to ${new Date(trip.left).toLocaleDateString()}`}</p>
        <p>{trip.description}</p>
      </div>
      <div className="navigation-buttons">
        <button onClick={goBackToFeed} className="button back-button">My Journal</button>
      </div>
      <div className="trip-image-container">
        <img src={trip.pic} alt={`View of ${trip.destination}`} className="trip-image" />
        {weather && (
          <div className="weather-info">
            <h2>Current Weather in {trip.destination}</h2>
            <p>Temperature: {weather.temp_c}°C</p>
            <p>Condition: {weather.condition.text}</p>
            <img src={weather.condition.icon} alt="Weather condition icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetail;
