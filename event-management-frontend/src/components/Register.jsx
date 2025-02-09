import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/register', { name, email, password });
      alert('Registration successful, please login');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className='login'>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input className='field2' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br></br>
        <input className='field2' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br></br>
        <input className='field2' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>
        <button className='btn' type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
