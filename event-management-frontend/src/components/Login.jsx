import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'
import { Link } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input className='field1' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br></br>
        <input className='field2' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>
        <button className='btn' type="submit">Login</button>
    
      </form>
      <Link to='/register'>Register now</Link>
    </div>
  );
}

export default Login;