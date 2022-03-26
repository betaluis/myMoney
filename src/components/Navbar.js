
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { AiOutlineMenu, AiOutlineCloseCircle } from 'react-icons/ai'

// Styles
import './Navbar.css';

export default function Navbar() {
  
  const [isActive, setIsActive] = useState(false)

  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();
  
  const handleActive = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  }

  // Close menu after link is clicked.
  const navLink = document.querySelectorAll('.nav__link');
  navLink.forEach(link => link.addEventListener('click', () => setIsActive(false)));

  return(
    <header className="header__container">

      <div className="header__content">
        <Link to="/" className='nav__logo'>Finances</Link>

        <AiOutlineMenu className="nav__toggle" onClick={handleActive}/>

        <nav className={`nav ${isActive ? "active" : ''}`}>
          <div className="nav__content">

            <AiOutlineCloseCircle className='nav__close' onClick={() => setIsActive(false)} />

            <Link to="/" className='nav__menu-logo'>Finances</Link>

            <ul className="nav__menu">
              {!user && (
                <>
                  <li className="nav__item">
                    <Link to="/login" className='nav__link'>Log in</Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/signup" className='nav__link'>Sign Up</Link>
                  </li>
                </>
              )}
              {user && (
                <div class="nav__logout">
                  <span>Hello, {user.displayName}!</span>
                  <li className="nav__item">
                    <Link to="/login" className='nav__link' onClick={logout}>Log out</Link>
                  </li>
                </div>
              )}
            </ul>

          </div>
        </nav>
      </div>

    </header>
  )
}