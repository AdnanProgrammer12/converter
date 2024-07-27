// import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
  return (

    <div className='MainCF'>

    <div  className='MainF'>
        
       <div  className='Row1'>

        <span  style={{fontSize:"17px"}}>Social Links</span>

        <div className='ic'>
            <img src="./assets/Facebook.png" alt="" />

         <span style={{fontSize:"14px",marginLeft:"12px"}}>
         <Link to={'https:www.facebook.com'} target='_blank' className='footer_links'> FaceBook</Link> 
          </span>  

        </div>

        <div className='ic' >
            <img src="./assets/insta.png" alt="" />
             <span  style={{fontSize:"14px",marginLeft:"14px"}}>
             <Link to={'https:www.instagram.com'} target='_blank' className='footer_links'> Instagram </Link> 
             </span>
           

        </div>

        <div className='ic'>
            <img src="./assets/twitter.png" alt="" style={{height:"33px", width:"33px"}}/>

          <span style={{fontSize:"14px", marginLeft:"20px"}}>
         <Link to={'https:www.x.com'} target='_blank' className='footer_links'> Twitter/X.com </Link>  
            </span>   

        </div> 

       </div>

       <div className='space' style={{height:"40px"}}>

       </div>


       <div className='Row2'>

       <span style={{fontSize:"17px"}}>Associated Links</span>
        <span style={{fontSize:"14px"}}>
        <Link to={'/privacy-policy'} target='_blank' className='footer_links'> Privacy Policy</Link> 
        </span>
        <span style={{fontSize:"14px"}}>
        <Link to={'/about-us'} target='_blank' className='footer_links'> About Us </Link> 
        </span>
        <span style={{fontSize:"14px", marginBottom:"0px"}}>
          <Link to={'/contact-us'} target='_blank' className='footer_links'> ContactUs </Link>
        </span>

       </div>
       <div className='space' style={{height:"40px"}}>

</div>
       <div  className='Row3'>

        <span style={{fontSize:"17px"}}>Help & Support</span>

        <span style={{fontSize:"14px"}}>
         <Link to={'/help-page'} target='_blank' className='footer_links'> Help </Link> 
        </span>

        <span style={{fontSize:"14px"}}>
        <Link to={'/terms-page'} target='_blank' className='footer_links'> Terms & Conditions </Link> 
        </span>

        <span style={{fontSize:"14px", marginBottom:"0px"}}>
        <Link to={'/faqs-page'} target='_blank' className='footer_links'> FAQ'S </Link>  
        </span>


       </div>

    </div> 
    <div className='space' style={{height:"150px"}}>

</div>

    <p style={{marginTop:"5%", color:'white'}}>&copy; Copy Right All Rigth Reserved png2jpeg.com.</p>


    </div>
  )
}


// // <Route path="/privacy-policy" element={<PrivacyPolicy />} />  
// <Route path="/about-us" element={<AboutPage />} /> 
// <Route path="/contact-us" element={<ContactPage />} /> 
// <Route path="/help-page" element={<HelpPage />} /> 
// <Route path="/terms-page" element={<TermsPage />} /> 
// {/* <Route path="/faqs-page" element={<FAQPage />} />   */}