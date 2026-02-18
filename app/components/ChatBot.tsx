"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
  source?: "openai" | "huggingface" | "system";
  isError?: boolean;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const hasGreetedRef = useRef(false);

  // Animation de clignement des yeux
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000); // Cligne toutes les 3 secondes

    return () => clearInterval(blinkInterval);
  }, []);

  // Message de bienvenue lorsque la fenêtre est ouverte pour la première fois
  useEffect(() => {
    if (isOpen && !hasGreetedRef.current) {
      setMessages([
        {
          sender: "bot",
          text:
            "Bonjour, je suis l’assistant IA de Trésor. Posez-moi vos questions sur le portfolio, vos projets ou vos idées.",
          source: "system",
        },
      ]);
      hasGreetedRef.current = true;
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window - sera implémenté plus tard */}
      {isOpen && (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/70 dark:border-gray-700/70 w-[22rem] sm:w-[24rem] max-w-[90vw] h-[26rem] sm:h-[28rem] p-2 flex flex-col">
          <div className="flex justify-between items-center mb-2 pb-2 px-3 border-b border-gray-200/70 dark:border-gray-800">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Assistant IA - Trésor
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Réponses en français, adaptées à votre contexte.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                <p>Posez une question — l'assistant répondra de manière naturelle et utile.</p>
                <p className="text-sm mt-2">Je me base sur le portfolio, et je peux aussi répondre de façon générale si nécessaire.</p>
              </div>
            )}

            {messages.map((m, idx) => {
              const isUser = m.sender === "user";
              const bubbleBase =
                "max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow-sm whitespace-pre-wrap";
              const bubbleClasses = isUser
                ? `${bubbleBase} bg-blue-600 text-white`
                : m.isError
                ? `${bubbleBase} bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-100`
                : `${bubbleBase} bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white`;

              return (
                <div
                  key={idx}
                  className={`flex ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={bubbleClasses}>
                    {m.text}
                    {!isUser && m.source && m.source !== "system" && (
                      <p className="mt-1 text-[11px] opacity-70">
                        Réponse IA (
                        {m.source === "huggingface" ? "Hugging Face" : "OpenAI"}
                        )
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const text = input.trim();
              if (!text) return;
              // ajouter message utilisateur
              setMessages((s) => [...s, { sender: "user", text }]);
              setInput('');
              setLoading(true);
              try {
                const res = await fetch('/api/chatbot', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ message: text }),
                });
                let data: any = null;
                try { data = await res.json(); } catch (_) { data = null; }
                let reply: string;
                let source: ChatMessage["source"] = data?.source;
                let isError = false;
                if (!res.ok) {
                  if (res.status === 402) {
                    reply =
                      "Le quota de la clé OpenAI configurée est dépassé. Mettez à jour la facturation sur https://platform.openai.com/account/billing ou configurez un token Hugging Face (HF_TOKEN) dans votre .env.local.";
                    isError = true;
                  } else if (res.status === 500) {
                    reply =
                      data?.error ||
                      "Erreur interne du serveur. Veuillez réessayer plus tard.";
                    isError = true;
                  } else {
                    reply =
                      data?.error?.message ||
                      data?.error ||
                      `Erreur serveur (${res.status})`;
                    isError = true;
                  }
                } else {
                  reply = data?.reply || "Désolé, aucune réponse.";
                }
                setMessages((s) => [
                  ...s,
                  { sender: "bot", text: reply, source, isError },
                ]);
              } catch (err) {
                setMessages((s) => [
                  ...s,
                  {
                    sender: "bot",
                    text: "Erreur de connexion au serveur.",
                    isError: true,
                  },
                ]);
              } finally {
                setLoading(false);
                // scroll to bottom
                setTimeout(() => {
                  if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }, 50);
              }
            }}
            className="pt-2 px-2 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    (e.target as HTMLTextAreaElement).form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                  }
                }}
                placeholder={loading ? 'Envoi...' : 'Écrire un message...'}
                rows={1}
                className="flex-1 resize-none p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none text-sm text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="Envoyer"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? '...' : <Send className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Robot Icon Button - Toujours dans le coin */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group animate-bounce-slow hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
        aria-label="Ouvrir le chatbot"
      >
        <div className="relative w-16 h-22 flex flex-col items-center">
          {/* Ombre douce et diffuse sous le robot */}
          <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-11 h-3 bg-black/10 dark:bg-black/20 rounded-full blur-xl"></div>
          {/* Image du robot depuis /public/ai_robot.png */}
          <img
            src="/ai_robot.png"
            alt="AI Robot"
            className={`w-16 h-16 object-cover rounded-full shadow-lg transition-all duration-150 ${
              isBlinking ? "scale-95 brightness-75" : ""
            }`}
          />
        </div>
      </button>
    </div>
  );
};

export default ChatBot;

