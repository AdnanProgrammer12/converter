import './App.css';
import Page from './page';
import PageForJpg from "./PageForJpg";
import PageForPng from "./PageForPng";

import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AboutPage from './component/pages/AboutPage';
import ContactPage from './component/pages/ContactPage';
import PrivacyPolicy from './component/pages/PrivacyPolicy'; 
import HelpPage from './component/pages/HelpPage';
import TermsPage from './component/pages/TermsPage';   
import FAQPage from './component/pages/FAQPage'; 

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PageForPng/>} /> 
        <Route path="/png-to-jpg" element={<PageForPng/>} /> 
        <Route path="/jpg-to-png" element={<PageForJpg/>} />  
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />  
        <Route path="/about-us" element={<AboutPage />} /> 
        <Route path="/contact-us" element={<ContactPage />} /> 
        <Route path="/help-page" element={<HelpPage />} /> 
        <Route path="/terms-page" element={<TermsPage />} /> 
        <Route path="/faqs-page" element={<FAQPage />} />  
      </Routes>  
      <Footer/>  
    </Router> 
  ); 
}

export default App;
