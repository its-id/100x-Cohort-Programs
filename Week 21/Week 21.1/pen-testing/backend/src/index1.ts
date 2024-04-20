import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
app.post('/generate-otp', (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
  otpStore[email] = otp;

  //should send the OTP to the user's email here.

  console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
  res.status(200).json({ message: 'OTP generated and logged', otp: otp });
});

// Endpoint to reset password
app.post('/reset-password', (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ message: 'Email, OTP, and new password are required' });
  }
  
  if (otpStore[email] === otp) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);

    delete otpStore[email]; // Clear the OTP after use
    
    //logic to reset the password in the database should be here.
    
    res.status(200).json({ message: 'Password has been reset successfully' });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
