import React from 'react';
import { Link } from 'react-router-dom';
import "./Pages.css";

const ContactPage: React.FC = () => {
  return (
    <div>
      <div className="setContent">
      <h1>Contact Us</h1>
        <p>Welcome to the Contact Us page of <Link to="/avif-to-png">png2jpeg.com</Link>! We're thrilled to hear from you and are here to assist you with any questions, feedback, or concerns you may have. At <Link to="/avif-to-png">png2jpeg.com</Link>, we value open communication and are committed to providing exceptional customer support to ensure your experience with our platform is nothing short of excellent.</p>

        <h2>How to Reach Us</h2>
        <p>We offer multiple channels for you to get in touch with us, ensuring that you can reach us in the way that is most convenient for you. Whether you prefer email correspondence, social media interactions, or traditional mail, we're here to listen and respond promptly to your inquiries.</p>

        <h3>Email</h3>
        <p>For general inquiries, technical support, or feedback, please email us at <a href="mailto:info@png2jpeg.com">info@png2jpeg.com</a>. Our dedicated team of professionals is standing by to assist you with any questions or concerns you may have. Whether you're experiencing issues with our platform, have suggestions for improvement, or simply want to learn more about our services, we're here to help.</p>
        
        <p>When contacting us via email, please provide as much detail as possible regarding your inquiry to help us better understand and address your needs. Whether you're experiencing technical difficulties, have questions about our services, or need assistance with a specific issue, our team will do everything we can to provide you with a timely and helpful response.</p>

        <h3>Social Media</h3>
        <p>Connect with us on social media for the latest updates, news, and announcements from <Link to="/avif-to-png">png2jpeg.com</Link>. Follow us on Facebook, Instagram, Twitter to stay informed about new features, promotions, and other exciting developments. Our social media channels are also a great way to engage with our community, share your experiences, and connect with like-minded individuals who share your interest in image conversion and technology.</p>

        <p>Feel free to reach out to us on social media with any questions, comments, or feedback you may have. Whether you're a long-time user of <Link to="/avif-to-png">png2jpeg.com</Link> or are considering trying out our services for the first time, we welcome your input and look forward to engaging with you on our social media platforms.</p>

        <h3>Mail</h3>
        <p>If you prefer traditional mail correspondence, you can reach us at the following address:</p>
        <address>
          Junaid Enterprises <br />
          New York, 1001 <br />
          United States
        </address>

        <p>Please note that responses to mail inquiries may take longer than other communication channels due to processing and delivery times. If your inquiry requires urgent attention, we recommend contacting us via email or social media for a faster response.</p>

        <h3>Customer Support</h3>
        <p>Our customer support team is available to assist you with any issues or concerns you may encounter while using <Link to="/avif-to-png">png2jpeg.com</Link>. Whether you need help troubleshooting technical issues, have questions about our services, or require assistance with a specific feature, our knowledgeable and friendly support staff are here to help.</p>
        
        <p>To contact our customer support team, please email us at <a href="mailto:info@png2jpeg.com?subject=Customer%20Support">info@png2jpeg.com</a> with "Customer Support" in the subject line. Be sure to include a detailed description of the issue you're experiencing, as well as any relevant information or screenshots that may help us diagnose and resolve the problem quickly.</p>

        <h3>Feedback and Suggestions</h3>
        <p>We value your feedback and suggestions and are always looking for ways to improve <Link to="/avif-to-png">png2jpeg.com</Link> based on your input. Whether you have ideas for new features, suggestions for improving existing functionality, or feedback on your experience with our platform, we want to hear from you.</p>
        
        <p>To share your feedback and suggestions with us, please email us at <a href="mailto:info@png2jpeg.com?subject=Feedback">info@png2jpeg.com</a> with "Feedback" in the subject line. We appreciate your insights and will carefully consider all feedback received as we continue to enhance and refine <Link to="/avif-to-png">png2jpeg.com</Link> to better meet the needs of our users.</p>

        <h3>Privacy and Security</h3>
        <p>Your privacy and security are our top priorities at <Link to="/avif-to-png">png2jpeg.com</Link>. Rest assured that any information you provide to us will be handled with the utmost care and confidentiality. We adhere to strict privacy and security protocols to protect your personal information and ensure a safe and secure browsing experience on our platform.</p>

        <p>If you have any questions or concerns about our privacy and security practices, please don't hesitate to contact us at <a href="mailto:info@png2jpeg.com">info@png2jpeg.com</a>. We're committed to transparency and will be happy to provide you with additional information or address any concerns you may have regarding your privacy and security on png2jpeg.com.</p>

        <h2>Get in Touch</h2>
        <p>We're here to help! Whether you have questions about our services, need assistance with a technical issue, or simply want to share your feedback with us, we're only a message away. Contact us today via email, social media, or traditional mail, and let us know how we can assist you. Thank you for choosing png2jpeg.com. We look forward to hearing from you!</p>
      </div>
    </div>
  );
}

export default ContactPage;