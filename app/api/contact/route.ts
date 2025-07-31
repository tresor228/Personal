export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

import { transporter } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }



    return NextResponse.json({ message: 'Email envoyé avec succès' });
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: 'bernardalade92@gmail.com',
      subject: `Nouveau message de ${name} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    console.log("Tentative d'envoi d'email...");
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé ! Détails :', info);

    return NextResponse.json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
