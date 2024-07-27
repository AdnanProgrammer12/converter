import React from 'react';
import "./Pages.css";  

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <div className="setContent"> 
        <h1>Privacy Policy</h1>
        <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from the Website.</p>

        <h2>Information We Collect</h2>
        <p>When you visit the Website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Website, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Website, and information about how you interact with the Website. We refer to this automatically-collected information as "Device Information".</p>

        <p>We collect Device Information using the following technologies:</p>
        <ul>
          <li>Cookies: These are data files that are placed on your device or computer and often include an anonymous unique identifier. You can configure your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Website.</li>
          <li>Log files: These track actions occurring on the Website, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the Device Information that we collect to improve and optimize the Website (for example, by generating analytics about how our customers browse and interact with the Website), and to assess the success of our marketing and advertising campaigns.</p>

        <h2>Sharing Your Personal Information</h2>
        <p>We do not share your Personal Information with third parties except to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.</p>

        <h2>Your Rights</h2>
        <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>

        <h2>Data Retention</h2>
        <p>When you place an order through the Website, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>

        <h2>Changes</h2>
        <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>

        <h2>Contact Us</h2>
        <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@png2jpeg.com</p>
      </div>    
    </div> 
  );
}

export default PrivacyPolicy;
