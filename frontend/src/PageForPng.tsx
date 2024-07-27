// page.tsx
import  { useState, ChangeEvent} from 'react';
import "./page.css";
// import { useParams } from 'react-router-dom'; 
// import Navbar from './component/Navbar.tsx';
import MainComponnent from "./component/MainComponnent.tsx";    
import TextPartForPng from './component/TextPartForPng.tsx';
import { useEffect } from 'react';
// import { Helmet } from 'react-helmet';
import {Helmet} from "react-helmet"; 
// import Helmet
import TextPart from "./component/TextPart.tsx";
// import Footer from "./component/Footer.tsx"; 



const Page: React.FC = () => { 
  const [loading, setLoading] = useState(false);
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);
  const [isSignupPopupVisible, setSignupPopupVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repassword, setrePassword] = useState<string>('');


//   const [typeConversion, setTypeConversion] = useState('avif2png');

  // useEffect(() => {F
  //   // Set the initial conversion type after the component mounts
  //   setTypeConversion(Props.type); 


  // }, [typeConversion]);

  const handleSignupButtonClick = () => {
    setSignupPopupVisible(true);
  };

  const handleLoginButtonClick = () => {
    setLoginPopupVisible(true);
  };

  const handleCloseLoginPopup = () => {
    setLoginPopupVisible(false);
    setSignupPopupVisible(false)
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlerePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setrePassword(e.target.value);
  };


  const handleLogin = () => {
    setLoading(true);
    // Perform login logic
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successful') {
          console.log('Login successful');
          localStorage.setItem('userEmail', email);
          // Add any further logic you want to perform after successful login

          setEmail('');
          setPassword('');
          setrePassword('');

          setInterval(()=>{},1000)

          setLoading(false);

          setTimeout(() => {
            // Show success message (you can implement this part)
            alert('Login successful!'); // You can replace this with your own success message handling
  
            handleCloseLoginPopup();
          },2000)

          
        } else {
          alert('Login failed!');
          console.error('Login failed');
          // Handle login failure, show error message, etc.
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        // Handle error, show error message, etc.
      });

    // Close the login popup after handling the login logic
    // handleCloseLoginPopup();
  };

  const handleSignUp = () => {
    setLoading(true);
    // Perform registration logic
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Registration successful') {
          console.log('Registration successful');
          setEmail('');
          setPassword('');
          setrePassword('');

          setInterval(()=>{},1000)

          setLoading(false);

          setTimeout(() => {
            // Show success message (you can implement this part)
            alert('Registration successful!'); // You can replace this with your own success message handling
  
            // Close the signup popup after handling the registration logic
            handleCloseLoginPopup();
          }, 2000); // 2000 milliseconds (2 seconds)
        } else {
          alert('Registration failed!');
          console.error('Registration failed');
          // Handle registration failure, show error message, etc.
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        // Handle error, show error message, etc.
      });

    // Close the signup popup after handling the registration logic
    // handleCloseLoginPopup();
  };


  return (

    <div className='M'>
    <div className={`Main ${isLoginPopupVisible || isSignupPopupVisible? 'isLoginPopupVisible' : ''}`}>

      <Helmet>
      <title>{"PNG to JPG – Convert PNG to JPG Online Free"}</title>
      <meta name="keywords" content="png to jpg, png to jpeg, convert png to jpg, png to jpeg converter"/>

      <meta name="description" content={`Convert PNG to JPG efficiently with this free online tool without any required sign-up process. Enjoy high-quality conversions efficiently and bulk processing for all your PNG to JPG needs.`} />
      </Helmet>
      {/* <Navbar onLoginButtonClick={handleLoginButtonClick} onSignupButtonClick={handleSignupButtonClick} /> */}
     
      {isLoginPopupVisible && (
        <div className="overlay" onClick={handleCloseLoginPopup}></div>
      )}

      {isLoginPopupVisible && (
        <div className="LoginPopup">
          <div className='PopM'>
            <h2>Login to your account</h2>
            <div className='google'>

                <img src='./assets/download.png' style={{height:"26px", width:"26px", marginRight:"7px"}}></img>
              Login with Google
            </div>

            <div className="orLine">
              <span>OR</span>
            </div>

            {/* Input fields for email and password */}
            <div className='inputContainer'>
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
            </div>

            <div className='inputContainer'>
              <label>Password:</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
            </div>

            {/* Login with Google */}
           

            {/* Your login button goes here */}

            {loading&&(
        <button className="bt" onClick={handleSignUp}>

          <div  className='loader'>

          </div>
        </button>

            )}


            {!loading&&

<button className="bt" onClick={handleLogin}>Login</button>


            }
           
            <div style={{height:"40px"}}>

            </div>


          <p> Don't have account?<span style={{color:"blue",cursor:"pointer"}}>Register</span></p> 
          </div>
        </div>
      )}

{isSignupPopupVisible && (
        <div className="overlay" onClick={handleCloseLoginPopup}></div>
      )}

      {isSignupPopupVisible && (
        <div className="LoginPopup">
          <div className='PopM'>
            <h2>Register to your account</h2>
            <div className='google1'>

                <img src='./assets/download.png' style={{height:"26px", width:"26px", marginRight:"7px"}}></img>
              Signup with Google
            </div>

            <div className="orLine">
              <span>OR</span>
            </div>

            {/* Input fields for email and password */}
            <div className='inputContainer'>
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
            </div>

            <div className='inputContainer'>
              <label>Password:</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
            </div>

            <div className='inputContainer'>
              <label>Confirm Password:</label>
              <input type="password" placeholder="Re-Enter your password" value={repassword} onChange={handlerePasswordChange} />
            </div>

            {/* Login with Google */}
           

            {/* Your login button goes here */}

            {loading&&(
        <button className="bt" onClick={handleSignUp}>

          <div  className='loader'>

          </div>
        </button>

            )}

   {!loading&&(
        <button className="bt" onClick={handleSignUp}>Register</button>

            )}

            {/* <button className="bt" onClick={handleSignUp}>Register</button> */}

            {/* <div style={{height:"40px"}}>

            </div> */}


          <p> Already have an account?<span style={{color:"blue",cursor:"pointer"}}>Login</span></p> 
          </div>
        </div>
      )}
      <MainComponnent defaultConversion={'png2jpg'} convertHeading={''}/> 
      
      <TextPartForPng /> 
      {/* <Footer /> */}
    </div> 
    </div>
  );
}


export default Page; 