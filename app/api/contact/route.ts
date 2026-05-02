export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getMailTransporter, sendPortfolioContactMail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    if (!getMailTransporter()) {
      console.error(
        "ERREUR : Variables EMAIL_USER ou EMAIL_PASS manquantes dans .env.local"
      );
      return NextResponse.json(
        {
          error:
            "Le serveur de messagerie n'est pas configuré. Veuillez vérifier le fichier .env.local.",
        },
        { status: 500 }
      );
    }

    const result = await sendPortfolioContactMail({
      name,
      email,
      subject,
      message,
    });

    if (!result.ok) {
      if (result.code === "EAUTH") {
        return NextResponse.json(
          {
            error:
              "Erreur d'authentification Gmail (identifiants invalides). Vérifiez le mot de passe d'application.",
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          error:
            "Une erreur est survenue lors de l'envoi du message. Réessayez plus tard.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Votre message a été envoyé avec succès !",
    });
  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      { error: "Une erreur critique est survenue sur le serveur." },
      { status: 500 }
    );
  }
}
