
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai'

import './Signup.css'

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { signup, error, isPending } = useSignup();

  const handleSubmit = e => {
    e.preventDefault();
    signup(username, email, password)
  }

  return (
    <div className="Signup" onSubmit={handleSubmit}>
      <form className='forms'>
        <h1>Create Account</h1>
        <label>
          <AiOutlineUser />
          <input 
            type="text" 
            placeholder='Username' 
            onChange={e => setUsername(e.target.value)}
            value={username}
            required 
          />
        </label>  
        <label>
          <AiOutlineMail />
          <input 
            type="email" 
            placeholder='Email' 
            onChange={e => setEmail(e.target.value)}
            value={email}
            required 
          />
        </label>  
        <label>
          <AiOutlineLock />
          <input 
            type="password" 
            placeholder='Password' 
            onChange={e => setPassword(e.target.value)}
            value={password}
            required 
          />
        </label>  
        {error && <div className='error'>{error}</div>}
        {isPending && <button disabled>Loading...</button>}
        {!isPending && <button>Sign Up</button>}
      </form>      
    </div>
  )
}