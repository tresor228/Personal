export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const HF_TOKEN = process.env.HF_TOKEN;

async function callHuggingFace(message: string): Promise<string> {
  if (!HF_TOKEN) {
    throw new Error('HF_TOKEN manquante');
  }

  const systemPrompt = `Vous êtes l'assistant conversationnel du portfolio de Trésor. Répondez en français, de façon claire et utile. Si la question porte sur le portfolio, répondez en vous basant sur les informations connues. Sinon, fournissez une aide générale.`;

  const payload = {
    inputs: `${systemPrompt}\n\nUtilisateur: ${message}\n\nAssistant:`,
    parameters: {
      max_new_tokens: 200,
      temperature: 0.7,
      do_sample: true,
    },
  };

  const resp = await fetch('https://router.huggingface.co/hf-inference/models/microsoft/DialoGPT-medium', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HF_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await resp.text();
  let j: any = null;
  try { j = JSON.parse(text); } catch (e) { j = null; }

  if (!resp.ok) {
    // Gestion plus claire des erreurs Hugging Face
    if (resp.status === 401) {
      throw new Error(
        "HF_TOKEN invalide ou expiré. Vérifiez votre token sur https://huggingface.co/settings/tokens et mettez à jour la variable HF_TOKEN dans votre fichier .env.local."
      );
    }
    if (resp.status === 403) {
      throw new Error(
        "Accès refusé à l’API Hugging Face. Vérifiez que votre compte et votre token ont les droits nécessaires pour utiliser l’inference API."
      );
    }
    throw new Error(`Erreur Hugging Face (${resp.status}): ${text}`);
  }

  const reply = j?.[0]?.generated_text || j?.generated_text || 'Réponse HF non disponible.';
  // Nettoyer la réponse (supprimer le prompt répété)
  const cleanReply = reply.replace(`${systemPrompt}\n\nUtilisateur: ${message}\n\nAssistant:`, '').trim();
  return cleanReply || 'Réponse HF vide.';
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message invalide' }, { status: 400 });
    }

    // Allow temporary override of the OpenAI key via request header for testing (x-openai-key).
    // WARNING: ne JAMAIS utiliser cela en production — uniquement pour des tests locaux.
    const overrideKey = req.headers.get('x-openai-key');
    const usedKey = overrideKey || OPENAI_KEY;

    // Si aucune clé OpenAI n'est configurée mais qu'un token Hugging Face existe,
    // on utilise directement Hugging Face pour éviter toute erreur de quota OpenAI.
    if (!usedKey && HF_TOKEN) {
      try {
        const hfReply = await callHuggingFace(message);
        return NextResponse.json({ reply: hfReply, source: 'huggingface' });
      } catch (hfErr) {
        console.error('HF direct failed:', hfErr);
        const msg =
          hfErr instanceof Error
            ? hfErr.message
            : 'Erreur lors de l’appel au modèle Hugging Face.';
        return NextResponse.json(
          { error: msg },
          { status: 500 }
        );
      }
    }

    // Aucun fournisseur disponible : on retourne une erreur claire en français.
    if (!usedKey && !HF_TOKEN) {
      return NextResponse.json(
        {
          error:
            "Aucune clé de modèle d'IA n'est configurée. Ajoutez soit OPENAI_API_KEY, soit HF_TOKEN dans votre fichier .env.local.",
        },
        { status: 500 }
      );
    }

    try {
      const systemPrompt = `Vous êtes l'assistant conversationnel professionnel du portfolio de Trésor. Répondez en français, de façon claire, concise et utile. Si la question porte sur le portfolio, répondez en vous basant sur les informations connues. Sinon, fournissez une aide générale pertinente et proposez des questions de clarification ou des actions concrètes.`;

      const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 800,
      };

      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${usedKey}`,
        },
        body: JSON.stringify(payload),
      });
      const text = await resp.text();
      let j: any = null;
      try { j = JSON.parse(text); } catch (e) { j = null; }

      if (!resp.ok) {
        // Log detailed info to help diagnosis (do NOT log the key)
        console.error('OpenAI responded with error', { status: resp.status, statusText: resp.statusText, body: j || text });
        const err = j?.error || {};
        let messageErr = err?.message || text || 'Erreur OpenAI non détaillée';
        const type = err?.type;
        const code = err?.code;
        const status = code === 'insufficient_quota' ? 402 : resp.status || 502;

        // Message plus clair pour le cas de quota dépassé
        if (code === 'insufficient_quota') {
          messageErr =
            "Le quota de votre clé OpenAI est dépassé. Rendez-vous sur https://platform.openai.com/account/billing pour mettre à jour la facturation ou configurez un autre fournisseur (par ex. HF_TOKEN pour Hugging Face).";
        }

        // Fallback vers Hugging Face si quota dépassé ET token disponible
        if (code === 'insufficient_quota' && HF_TOKEN) {
          console.log('OpenAI quota exceeded, trying Hugging Face fallback...');
          try {
            const hfReply = await callHuggingFace(message);
            return NextResponse.json({ reply: hfReply, source: 'huggingface' });
          } catch (hfErr) {
            console.error('HF fallback failed:', hfErr);
            const msg =
              hfErr instanceof Error
                ? hfErr.message
                : 'Quota OpenAI dépassé et fallback Hugging Face échoué.';
            return NextResponse.json({ error: msg }, { status: 500 });
          }
        }

        return NextResponse.json({ error: messageErr, type, code }, { status });
      }

      const reply = j?.choices?.[0]?.message?.content?.trim() || null;
      // Log success minimally
      console.log('OpenAI OK', { model: payload.model, replyPresent: Boolean(reply) });
      return NextResponse.json({ reply: reply || 'Aucune réponse fournie par OpenAI.' });
    } catch (err) {
      console.error('Erreur OpenAI:', err);
      return NextResponse.json({ error: 'Erreur lors de l\'appel à OpenAI' }, { status: 500 });
    }
  } catch (error) {
    console.error('chatbot error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
