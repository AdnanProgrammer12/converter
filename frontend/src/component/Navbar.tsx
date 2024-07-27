
import { useState } from 'react';
import './Navbar.css'
import { Routes,Route,Link } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy'; 
import Page from '../page';     


interface NavbarProps {
  // Removed onLoginButtonClick and onSignupButtonClick from the props interface
}


const Navbar: React.FC<NavbarProps> = () => {

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isAlternateImage, setIsAlternateImage] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
    setIsAlternateImage(!isAlternateImage);
  };

  return (
    <>
      <div className='NavMain'>
        <div className='Navpt1'>
          <div className='MainText'>
            <Link to="/" className='nav_logo'><span>PNG TO JPEG</span></Link>
          </div>
        </div>

        <div className="Navpt2">
          <li><Link to="/png-to-jpg" className='nav-link'>Png to Jpg</Link></li>
          <li><Link to="/jpg-to-png" className='nav-link'>Jpg to Png</Link></li>
          <li><Link to="/privacy-policy" className='nav-link'>Privacy Policy</Link></li>
          <li><Link to="/about-us" className='nav-link'>About Us</Link></li> 
          <li><Link to="/contact-us" className='nav-link'>Contact Us</Link></li>
        </div> 
         
        <img
          className="d"
          style={{ height: "28px", width: "28px", marginRight: "15px", cursor: "pointer" }}
          src={isAlternateImage ? "./assets/close.png" : "./assets/menu1.png"}
          alt="Nav Hamburger"
          onClick={handleMenuClick} 
        /> 
      </div>

      {isMenuVisible && (
        <div className='n2' style={{height:"170px", transition:"height 0.3 ease-in-out"}}> 
          <div className='g'>
          <li><Link to="/jpg-to-png" className='nav-link'>Png to Jpg</Link></li>
          <li><Link to="/png-to-jpg" className='nav-link'>Jpg to Png</Link></li>
          <li><Link to="/privacy-policy" className='nav-link'>Privacy Policy</Link></li>
          <li><Link to="/about-us" className='nav-link'>About Us</Link></li>
          <li><Link to="/contact-us" className='nav-link'>Contact Us</Link></li> 
          </div>
        </div> 
      )}

       {/* Define Routes for each page */}
       
    </>   
  )
}

export default Navbar;
