import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });
  const [token, setToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetOTPMode, setResetOTPMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitReset = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    const res = await axios.post('http://localhost:3000/reset-password', {
      ...data,
      token,
    });

    console.log(res.data);
    if (res.data) {
      setSuccessMessage(res.data.message);
    } else {
      setErrorMessage(res.data.message);
    }
  };

  const handleGenerateOTP = async () => {
    const res = await axios.post('http://localhost:3000/generate-otp', {
      email: data.email,
    });

    console.log(res.data);
    if (res.data.otp) {
      setData({ ...data, otp: res.data.otp });
      setResetOTPMode(true);
    }
  };

  return (
    <>
      <h1>Testing Captcha using CloudFlare</h1>
      {<p>OTP: {data?.otp ? data.otp : 'Not Yet'}</p>}
      {!resetOTPMode ? (
        <>
          <div className='card'>
            <input
              name='email'
              placeholder='Email'
              type='email'
              onChange={handleInputChange}
            />
            <button onClick={handleGenerateOTP}>Generate OTP</button>
          </div>
        </>
      ) : (
        <div className='captcha-container'>
          <span className='header'>Reset Password</span>
          <div className='reset-inputs'>
            <input
              name='email'
              placeholder='Email'
              type='email'
              onChange={handleInputChange}
            />
            <input
              name='otp'
              placeholder='OTP'
              type='text'
              onChange={handleInputChange}
            />
            <input
              name='newPassword'
              placeholder='Password'
              type='password'
              onChange={handleInputChange}
            />
          </div>
          <Turnstile
            onSuccess={(token) => {
              setToken(token);
            }}
            siteKey={import.meta.env.VITE_SITE_KEY}
          />
          <div className='card'>
            <button onClick={handleSubmitReset}>Submit</button>
          </div>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </>
  );
}

export default App;
