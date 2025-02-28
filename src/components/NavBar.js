import { Link } from 'react-router-dom';
import logoImage from '../assets/Bella-logo.png';
import fbImage from '../assets/fb-logo.png';
import instaImage from '../assets/insta-logo.png';
import React, { useState } from 'react';
const NavBar = () => { 
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const closeMenu= () => {
        setMenuOpen(false);
    };
    return(
        <nav className='navbar'>
            <div><img src={logoImage} alt='Logo' className='navbar-logo' /></div>
            <div className='menu' onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? 'open' : ''}>
                <li className='navbar-item'>
                    <Link to='/' className='navbar-link' onClick={closeMenu}>Home</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/aboutus' className='navbar-link' onClick={closeMenu}>About Us</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/contactus' className='navbar-link' onClick={closeMenu}>Contact Us</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/listings' className='navbar-link' onClick={closeMenu}>Current Listings</Link>
                </li>
            <div className='social-links-container'>
            <li className='navbar-item'>
                <a href="https://facebook.com" onClick={closeMenu} className={`navbar-link ${menuOpen ? 'text-link' : ''}`}>
            {menuOpen ? 'Follow on Facebook' : (
              <img src={fbImage} alt='fb' className='social-img'/>
            )}
          </a>
            </li>
        <li className='navbar-item'>
          <a href="https://instagram.com" onClick={closeMenu} className={`navbar-link ${menuOpen ? 'text-link' : ''}`}>
            {menuOpen ? 'Follow on Instagram' : (
              <img src={instaImage} alt='insta' className='social-img'/>
            )}
          </a>
        </li>
        </div>       
        </ul>         
        </nav>
    );
}
export default NavBar