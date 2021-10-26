require('dotenv').config({ path: '.sendgrid.env' });
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mail = {
  sendMail: async function(recipient, documentId) {
    console.log(recipient, documentId);
    const msg = {
      to: `${recipient}`,
      from: 'mabw19@student.bth.se',
      subject: 'You have been invited!',
      text: 'One of your friends have invited to you edit one of their documents on JSEditor. Following the link to sign up: Sign up here! Kind regards, The JSEditor-team',
      html: `One of your friends have invited to you edit one of their documents on <strong>JSEditor</strong>. <br><br> Following the link to sign up: <a href=${"https://www.student.bth.se/~mabw19/editor/?id=" + documentId}>Sign up here!</a> <br><br> Kind regards, <br> The JSEditor-team`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

module.exports = mail;