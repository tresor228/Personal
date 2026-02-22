export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';

async function callGemini(message: string, history: any[] = []): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY manquante');
  }

  // Load the portfolio data
  const dataPath = path.join(process.cwd(), 'app/api/chatbot/portfolio_data.json');
  let portfolioData = "Aucune donnée de portfolio trouvée.";
  try {
    if (fs.existsSync(dataPath)) {
      portfolioData = fs.readFileSync(dataPath, 'utf8');
      // Nettoyer les caractères * et # des données entrantes au cas où
      portfolioData = portfolioData.replace(/[*#]/g, '');
    }
  } catch (error) {
    console.warn("Erreur chargement données portfolio:", error);
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const systemInstruction = `Tu es l'assistant IA exclusif de Trésor. Tu réponds aux recruteurs et visiteurs en utilisant UNIQUEMENT le contenu du portfolio fourni ci-dessous en format JSON.
Ne JAMAIS utiliser les caractères * ou # dans tes réponses, même pour faire des listes ou mettre en gras. Utilise des tirets (-) pour les listes.
Les réponses doivent être professionnelles, naturelles, claires, concises et chaleureuses.
IMPORTANT: L'historique de la conversation t'est fourni. Si tu as déjà salué l'utilisateur ou s'il s'agit d'une suite de conversation, ne dis PLUS "Bonjour" ou "Comment puis-je vous aider". Réponds directement et naturellement à la question.
Si on te pose une question hors contexte du portfolio, réponds simplement que tu es là pour parler des compétences et projets de Trésor.

DONNÉES DU PORTFOLIO :
${portfolioData}`;

  const contents = history.map((item: any) => ({
    role: item.role === 'user' ? 'user' : 'model',
    parts: [{ text: item.text }]
  }));
  contents.push({ role: 'user', parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.3, // Température plus basse pour forcer la fidélité aux données
      maxOutputTokens: 800
    }
  });

  if (!response.text) {
    throw new Error("Réponse Gemini vide ou au format inattendu.");
  }

  // Filtrer brutalement les * et # de la sortie générée
  const cleanReply = response.text.replace(/[*#]/g, '').trim();

  return cleanReply;
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message invalide' }, { status: 400 });
    }

    try {
      const geminiReply = await callGemini(message, history || []);
      return NextResponse.json({ reply: geminiReply, source: 'gemini' });
    } catch (geminiErr: any) {
      console.error('Gemini direct failed:', geminiErr);
      let msg = geminiErr instanceof Error ? geminiErr.message : 'Erreur lors de l’appel au modèle Gemini.';

      // Capter l'erreur 429 "Quota exceeded"
      if (msg.includes('429') || msg.includes('Quota exceeded')) {
        return NextResponse.json({ error: "Votre compte Gemini a atteint la limite de requêtes gratuites. Vous devez configurer la facturation ou patienter." }, { status: 429 });
      }

      return NextResponse.json({ error: msg }, { status: 500 });
    }

  } catch (error) {
    console.error('chatbot error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
