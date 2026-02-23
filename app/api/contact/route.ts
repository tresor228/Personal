export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validation des champs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    console.log("Tentative d'envoi d'email...");

    // Vérification et nettoyage des variables d'environnement
    const userEmail = process.env.EMAIL_USER?.trim();
    const userPass = process.env.EMAIL_PASS?.trim();

    if (!userEmail || !userPass) {
      console.error('ERREUR : Variables EMAIL_USER ou EMAIL_PASS manquantes dans .env.local');
      return NextResponse.json(
        { error: 'Le serveur de messagerie n\'est pas configuré. Veuillez vérifier le fichier .env.local.' },
        { status: 500 }
      );
    }

    // Configuration de l'email
    const mailOptions = {
      from: userEmail,
      replyTo: email,
      to: 'bernardalade92@gmail.com',
      subject: `[STUDIO PORTFOLIO] ${subject} - de ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #2563eb; padding: 24px; color: white;">
            <h1 style="margin: 0; font-size: 20px;">Nouveau Message de Contact</h1>
          </div>
          <div style="padding: 24px; background-color: white;">
            <p style="margin-top: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Expéditeur</p>
            <p style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${name}</p>
            <p style="color: #2563eb; margin-top: 0;">${email}</p>
            
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            
            <p style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Sujet</p>
            <p style="font-size: 16px; color: #111827; margin-top: 4px;">${subject}</p>
            
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            
            <p style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
            Envoyé le ${new Date().toLocaleString('fr-FR')} depuis votre portfolio.
          </div>
        </div>
      `,
      text: `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`
    };

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: userEmail,
          pass: userPass,
        },
      });

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email envoyé avec succès ! ID :', info.messageId);

      return NextResponse.json({
        success: true,
        message: 'Votre message a été envoyé avec succès !'
      });
    } catch (mailError: any) {
      console.error("❌ Erreur technique d'envoi :");
      console.error(mailError);

      let errorMessage = "Une erreur est survenue lors de l'envoi de l'email.";

      if (mailError.code === 'EAUTH') {
        errorMessage = "Erreur d'authentification Gmail (Bad Credentials). Veuillez vérifier votre Mot de Passe d'Application.";
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: mailError.message,
          code: mailError.code
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("❌ Erreur critique API :", error);
    return NextResponse.json(
      { error: "Une erreur critique est survenue sur le serveur." },
      { status: 500 }
    );
  }
}

// lib/mailer.ts - Votre configuration du transporter
/*
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true pour le port 465, false pour les autres ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Mot de passe d'application Gmail
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Vérifier la configuration au démarrage
transporter.verify(function (error, success) {
  if (error) {
    console.log('Erreur de configuration email:', error);
  } else {
    console.log('Serveur email prêt à envoyer des messages');
  }
});
*/

// .env.local - Variables d'environnement requises
/*
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-application-gmail
*/