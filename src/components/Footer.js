import React from 'react';
import { Link } from 'react-router-dom';
import BB from '../assets/insignia-logo.png'
const Footer = () => {
    return(
        <footer className='footer'>
                <ul className='quick-links'>
                <li><Link className='footer-link' to='/'>Home</Link></li>
                <li><Link className='footer-link' to='/aboutus'>About Us</Link></li>
                <li><Link className='footer-link' to='/contactus'>Contact Us</Link></li>
                <li><Link className='footer-link' to='/listings'>Current Listings</Link></li>
                <li><Link className='footer-link' to='/login'>Employee Login</Link></li>
                </ul>
                <div className='bb-container'><img src={ BB } alt='insignia' className='bb-insig' /></div>
            <div className='gen-info'>
                <p>&copy; {new Date().getFullYear()} Bella Bella Realty</p>
                <p>Contact Us: reyesrob@bellabellarealty.com</p>
                <p>Cell Phone: +1-786-915-1821</p>
                <p>Website Created By Daniel Blazquez</p>
            </div>
        </footer>
    );
}
export default Footer;