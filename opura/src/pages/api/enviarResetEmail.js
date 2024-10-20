// pages/api/send-reset-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, code } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Código de Recuperação de Senha - Clube Ópura',
      html: `
        <h1>Recuperação de Senha</h1>
        <p>Você solicitou a recuperação de senha para sua conta no Clube Ópura.</p>
        <p>Seu código de verificação é: <strong>${code}</strong></p>
        <p>Este código é válido por 1 hora.</p>
        <p>Se você não solicitou esta recuperação, por favor ignore este e-mail.</p>
      `,
    });

    res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ message: 'Erro ao enviar e-mail' });
  }
}