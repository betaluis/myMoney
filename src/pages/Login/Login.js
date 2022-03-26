
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { useLogin } from '../../hooks/useLogin'
import { useState } from 'react'


// Styles
import './Login.css'
import '../../styles/forms.css'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, isPending } = useLogin();

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="Login">
      
      <form  className="forms" onSubmit={handleSubmit}>
        <h1>Welcome!</h1>
        <label>
          <AiOutlineMail className='form-icon'/>
          <input 
            type="email" 
            placeholder='Email' 
            onChange={e => setEmail(e.target.value)}
            value={email}
            required 
          />
        </label>
        <label>
          <AiOutlineLock className='form-icon'/>
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
        {!isPending && <button>Log in</button>}
      </form>

    </div>
  )
}