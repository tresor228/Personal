"use client";

import React, { useState, useEffect, useRef } from "react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
  source?: "gemini";
  isError?: boolean;
};

const WELCOME_MESSAGE = "Bonjour 👋\nJe suis l’assistant IA explicatif de Trésor. Comment puis-je vous aider aujourd'hui ? Je peux vous présenter ses compétences, ses projets ou son expérience.";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([{ sender: "bot", text: WELCOME_MESSAGE }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const hasGreetedRef = useRef(false);

  // Cacher la bulle de bienvenue automatiquement après 10s ou si le chat s'ouvre
  useEffect(() => {
    if (isOpen) {
      setShowWelcomeBubble(false);
    } else {
      const timer = setTimeout(() => {
        setShowWelcomeBubble(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 rounded-t-3xl rounded-b-xl shadow-2xl w-[22rem] sm:w-[24rem] max-w-[90vw] h-[26rem] sm:h-[28rem] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* En-tête Rose */}
          <div className="bg-gradient-to-r from-[#fc6bff] to-[#e442ff] p-4 flex justify-between items-center text-white rounded-t-3xl">
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-80 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-80 transition-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-white dark:bg-gray-900 custom-scrollbar transition-colors"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-8 text-sm">
                <p className="dark:text-gray-500">Posez une question — l'assistant répondra de manière naturelle et utile.</p>
              </div>
            )}

            {messages.map((m, idx) => {
              const isUser = m.sender === "user";
              const bubbleClasses = isUser
                ? "bg-[#ffb3f7] dark:bg-[#c93cce] text-white rounded-[1.5rem] rounded-br-none px-4 py-3"
                : m.isError
                  ? "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-[1.5rem] rounded-bl-none px-4 py-3"
                  : "bg-[#f8a1f0] dark:bg-[#ab2aa8] text-white rounded-[1.5rem] rounded-bl-none px-4 py-3";

              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 fade-in duration-300`}
                >
                  <div className={`max-w-[80%] text-[15px] shadow-sm whitespace-pre-wrap ${bubbleClasses}`}>
                    {m.text}
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

              setMessages((s) => [...s, { sender: "user", text }]);
              setInput('');
              setLoading(true);

              try {
                // Prepare history to send context to AI
                const history = messages.map(m => ({
                  role: m.sender === "user" ? "user" : "model",
                  text: m.text
                }));

                const res = await fetch('/api/chatbot', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ message: text, history }),
                });

                let data: any = null;
                try { data = await res.json(); } catch (_) { data = null; }

                let reply: string;
                let source: ChatMessage["source"] = data?.source;
                let isError = false;

                if (!res.ok) {
                  if (res.status === 402) {
                    reply = "Le quota de la clé configurée est dépassé.";
                    isError = true;
                  } else {
                    reply = data?.error?.message || data?.error || `Erreur serveur (${res.status})`;
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
                setTimeout(() => {
                  if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }, 50);
              }
            }}
            className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors"
          >
            <div className="flex items-center border border-gray-200 dark:border-gray-700 hover:border-[#fc6bff] transition-colors rounded-full px-4 py-2 bg-white dark:bg-gray-800 gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={loading ? 'Envoi en cours...' : 'Votre message...'}
                disabled={loading}
                className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center p-1 rounded-full transition-all ${loading ? 'opacity-50' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                aria-label="Envoyer le message"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fc6bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bouton du Chatbot */}
      <div className="flex items-center z-50">
        {!isOpen && showWelcomeBubble && (
          <div className="mr-4 relative flex items-center animate-in slide-in-from-right-4 fade-in duration-500">
            <div className="bg-white dark:bg-gray-800 px-5 py-3.5 rounded-[1.5rem] shadow-xl border border-gray-100 dark:border-gray-700 text-[14.5px] text-gray-700 dark:text-gray-200 w-64 leading-relaxed transition-colors relative z-10 hidden sm:block whitespace-pre-wrap">
              {WELCOME_MESSAGE}
              <button
                onClick={(e) => { e.stopPropagation(); setShowWelcomeBubble(false); }}
                className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs"
              >
                ✕
              </button>
              {/* Le petit triangle pointant vers le robot */}
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 rotate-45 w-4 h-4 bg-white dark:bg-gray-800 border-t border-r border-gray-100 dark:border-gray-700"></div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative focus:outline-none focus:ring-4 focus:ring-[#fc6bff]/50 rounded-full transition-all hover:scale-105 duration-300 shadow-xl"
          aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
        >
          {/* Notification Badge Rouge */}
          {!isOpen && (
            <span className="absolute top-0 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#D32F2F] text-[11px] font-bold text-white shadow-md border-[2.5px] border-white dark:border-gray-900 z-20 transition-all animate-bounce">
              1
            </span>
          )}

          <div className="relative w-[4.5rem] h-[4.5rem] flex flex-col items-center justify-center rounded-full overflow-hidden bg-white/50 backdrop-blur-sm">
            <img
              src="/ai_robot.png"
              alt="AI Robot"
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;


