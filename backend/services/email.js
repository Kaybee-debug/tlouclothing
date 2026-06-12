const nodemailer = require('nodemailer');

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function createTransport() {
  if (!isSmtpConfigured()) return null;

  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendVerificationEmail(to, code) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'tlou.masoga1@gmail.com';
  const subject = 'T.L.O.U. Clothing — verify your email';
  const text = [
    'Hi,',
    '',
    'Your T.L.O.U. Clothing verification code is:',
    '',
    code,
    '',
    'This code expires in 15 minutes.',
    '',
    'If you did not sign up, you can ignore this email.',
    '',
    'T.L.O.U. Clothing',
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <h2 style="color:#200934">T.L.O.U. Clothing</h2>
      <p>Use this code to confirm your email address:</p>
      <p style="font-size:32px;font-weight:bold;letter-spacing:6px;color:#200934">${code}</p>
      <p style="color:#666">This code expires in 15 minutes.</p>
      <p style="color:#666;font-size:12px">If you did not sign up, you can ignore this email.</p>
    </div>
  `;

  const transport = createTransport();
  if (!transport) {
    console.log(`[email-dev] Verification code for ${to}: ${code}`);
    return { sent: false, devMode: true };
  }

  await transport.sendMail({ from, to, subject, text, html });
  return { sent: true, devMode: false };
}

module.exports = { sendVerificationEmail, isSmtpConfigured };
