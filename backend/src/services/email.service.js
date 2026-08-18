const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to Backend Ledger!';
    const text = `Hello ${name}, \n\n Thank You for registering at Backend Ledger, We're excited to have you on board! \n\nBest regards, \n The Backend Ledger Team`;
    const html = `<p> Hello ${name}, </p><p>Thank You for registering at Backend Ledger, We're excited to have you on board! \n\nBest regards,<br> The Backend Ledger Team</p>`
     
    await sendEmail(userEmail, subject, text, html); 
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = "Transaction Successful 💸";

    const text = `
Hello ${name},

Your transaction has been completed successfully.

Amount: ₹${amount}
Transferred To: ${toAccount}

Thank you for using our service.

Regards,
Ledger App Team
`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
        <h2 style="color:#28a745;">Transaction Successful ✅</h2>

        <p>Hello <strong>${name}</strong>,</p>

        <p>Your transaction has been completed successfully.</p>

        <table style="width:100%; border-collapse:collapse; margin:20px 0;">
            <tr>
                <td><strong>Amount</strong></td>
                <td>₹${amount}</td>
            </tr>
            <tr>
                <td><strong>Transferred To</strong></td>
                <td>${toAccount}</td>
            </tr>
            <tr>
                <td><strong>Status</strong></td>
                <td style="color:green;"><strong>Success</strong></td>
            </tr>
        </table>

        <p>Thank you for using <strong>Ledger App</strong>.</p>

        <hr>
        <p style="font-size:12px;color:gray;">
            This is an automated email. Please do not reply.
        </p>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = "Transaction Failed ❌";

    const text = `
Hello ${name},

Unfortunately, your transaction could not be completed.

Amount: ₹${amount}
Attempted Transfer To: ${toAccount}

Please check your account balance or try again later.

Regards,
Ledger App Team
`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
        <h2 style="color:#dc3545;">Transaction Failed ❌</h2>

        <p>Hello <strong>${name}</strong>,</p>

        <p>Unfortunately, we couldn't process your transaction.</p>

        <table style="width:100%; border-collapse:collapse; margin:20px 0;">
            <tr>
                <td><strong>Amount</strong></td>
                <td>₹${amount}</td>
            </tr>
            <tr>
                <td><strong>Attempted Transfer To</strong></td>
                <td>${toAccount}</td>
            </tr>
            <tr>
                <td><strong>Status</strong></td>
                <td style="color:red;"><strong>Failed</strong></td>
            </tr>
        </table>

        <p>
            Possible reasons:
        </p>

        <ul>
            <li>Insufficient balance</li>
            <li>Invalid recipient account</li>
            <li>Temporary server issue</li>
        </ul>

        <p>Please try again later.</p>

        <hr>
        <p style="font-size:12px;color:gray;">
            This is an automated email. Please do not reply.
        </p>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};