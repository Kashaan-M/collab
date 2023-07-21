const Sib = require('sib-api-v3-sdk');

const sendEmail = (receiver, username, activationCode) => {
  // send email with SendInBlue

  const defaultClient = Sib.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

  const transEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: 'donotreply@socialapp.com',
    name: 'Social App',
  };

  const receivers = [{ email: receiver }];

  transEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: `${username} Your account activation code`,
      textContent: 'Hi user',
      htmlContent: `
      <div style="width:100%;padding-left:0.25rem;">
      <h3 style="text-align:center;color: #2596bb">Social App</h3>
          <p>Hello ${username}! Thanks for your interest in Social App.Here is your account activation code.</p>
          <p style="font-weight:bold;font-size:1.5rem;">${activationCode}</p>
          <p>Please complete the sign up process(to log in)</p>
          <small>Regards</small>
          <small>Social App</small>
          </div>
          `,
    })
    .then((data) => {
      console.log('success');
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = sendEmail;
