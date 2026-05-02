import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/html-escape";

export function getMailTransporter(): nodemailer.Transporter | null {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export function getContactRecipient(): string {
  return (process.env.CONTACT_TO_EMAIL ?? "bernardalade92@gmail.com").trim();
}

export type SendContactResult =
  | { ok: true; messageId: string }
  | { ok: false; code?: string };

/**
 * Envoie l'email de contact du portfolio (HTML avec champs échappés, alternative text/plain).
 */
export async function sendPortfolioContactMail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<SendContactResult> {
  const transporter = getMailTransporter();
  const from = process.env.EMAIL_USER?.trim();
  if (!transporter || !from) {
    return { ok: false };
  }

  const { name, email, subject, message } = params;
  const to = getContactRecipient();

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  const html = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #2563eb; padding: 24px; color: white;">
            <h1 style="margin: 0; font-size: 20px;">Nouveau Message de Contact</h1>
          </div>
          <div style="padding: 24px; background-color: white;">
            <p style="margin-top: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Expéditeur</p>
            <p style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${safeName}</p>
            <p style="color: #2563eb; margin-top: 0;">${safeEmail}</p>
            
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            
            <p style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Sujet</p>
            <p style="font-size: 16px; color: #111827; margin-top: 4px;">${safeSubject}</p>
            
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            
            <p style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</div>
          </div>
          <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
            Envoyé le ${new Date().toLocaleString("fr-FR")} depuis votre portfolio.
          </div>
        </div>
      `;

  const text = `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`;

  try {
    const info = await transporter.sendMail({
      from,
      replyTo: email,
      to,
      subject: `[STUDIO PORTFOLIO] ${subject} - de ${name}`,
      html,
      text,
    });
    console.log("Email contact envoyé, id :", info.messageId);
    return { ok: true, messageId: info.messageId ?? "" };
  } catch (err: unknown) {
    const code =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: unknown }).code)
        : undefined;
    console.error("Échec envoi email contact:", err);
    return { ok: false, code };
  }
}
