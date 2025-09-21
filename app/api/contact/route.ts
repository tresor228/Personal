// app/api/send-email/route.ts (ou pages/api/send-email.ts selon votre structure)

export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';

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

    // Configuration de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Utilisez votre email configuré
      replyTo: email, // L'email de la personne qui envoie
      to: 'bernardalade92@gmail.com',
      subject: `Nouveau message de ${name} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message :</h3>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; border-radius: 3px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="margin: 30px 0; border: 0; height: 1px; background: #ddd;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Ce message a été envoyé depuis votre portfolio le ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      `,
      text: `
        Nouveau message de contact
        
        Nom : ${name}
        Email : ${email}
        Sujet : ${subject}
        
        Message :
        ${message}
        
        Envoyé le ${new Date().toLocaleString('fr-FR')}
      `
    };

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès ! ID :', info.messageId);

    return NextResponse.json({ 
      success: true,
      message: 'Email envoyé avec succès',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error("Erreur détaillée lors de l'envoi d'email :", error);
    
    // Log plus détaillé pour le debugging
    if (error instanceof Error) {
      console.error("Message d'erreur :", error.message);
      console.error("Stack trace :", error.stack);
    }

    return NextResponse.json(
    { 
      success: false,
      error: "Erreur lors de l'envoi de l'email. Veuillez réessayer.",
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
    },
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