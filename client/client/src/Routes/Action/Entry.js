import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Entry.css';

const Entry = () => {
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [arrived, setArrived] = useState('');
  const [left, setLeft] = useState('');
  const [pic, setPic] = useState(''); // this will store the fetched image URL
  const navigate = useNavigate();

  const fetchImage = async (cityName) => {
    const accessKey = 'gkQIuL2AgGSqMty4G20Rxx_suWoaDmKaiSJIodXoXS0';
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&client_id=${accessKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        setPic(data.results[0].urls.regular); // Set the first image URL
      } else {
        setPic('');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setPic('');
    }
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    fetchImage(e.target.value); // Fetch image when the destination changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tripData = { destination, description, arrived, left, pic };
    const endpoint = 'http://localhost:5000/trips'; 

    try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          },
          body: JSON.stringify(tripData),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Trip added successfully:', data);
          navigate('/journal'); // Redirect to the journal page
        } else {
          console.error('Failed to add trip:', data.message);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }

    navigate('/journal'); // Redirect to journal page after submission
  };

  return (
    <div className="entry-container">
      <h2>Add a New Trip Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={handleDestinationChange}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Arrival Date"
          value={arrived}
          onChange={(e) => setArrived(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Departure Date"
          value={left}
          onChange={(e) => setLeft(e.target.value)}
          required
        />
        {pic && <img src={pic} alt="Destination" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default Entry;
