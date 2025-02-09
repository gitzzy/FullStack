import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ socket, user }) {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchEvents();
    socket.on('new_event', (event) => {
      setEvents((prevEvents) => [...prevEvents, event]);
    });
    return () => socket.off('new_event');
  }, [socket]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/events', {
        name,
        description,
        date,
        createdBy: user.id,
      });
      setEvents([...events, res.data]);
      setName('');
      setDescription('');
      setDate('');
    } catch (error) {
      alert('Failed to create event');
    }
  };

  return (
    <div className='dash'>
      <h2>Dashboard</h2>
      <h3>Welcome, {user.name}</h3>
      <form onSubmit={handleCreateEvent}>
        <input className='field2' type="text" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} required /><br></br>
        <input className='field2' type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /><br></br>
        <input className='field2' type="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br></br>
        <button className='btn' type="submit">Create Event</button>
      </form>
      <h3>Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>{event.name} - {event.date}<br>
          </br>
           Desc : {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
