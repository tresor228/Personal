"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Animation de clignement des yeux
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000); // Cligne toutes les 3 secondes

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window - sera implémenté plus tard */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 h-96 p-2 flex flex-col">
          <div className="flex justify-between items-center mb-2 pb-2 px-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Assistant IA - Trésor</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                <p>Posez une question sur le portfolio.</p>
                <p className="text-sm mt-2">Je répondrai uniquement à partir du contenu du portfolio.</p>
              </div>
            )}

            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-3 py-2 rounded-xl ${m.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const text = input.trim();
              if (!text) return;
              // ajouter message utilisateur
              setMessages((s) => [...s, { sender: 'user', text }]);
              setInput('');
              setLoading(true);
              try {
                const res = await fetch('/api/chatbot', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ message: text }),
                });
                const data = await res.json();
                let reply: string;
                if (!res.ok) {
                  // Try to extract a helpful message
                  reply = data?.error?.message || data?.error || `Erreur serveur (${res.status})`;
                } else {
                  reply = data?.reply || 'Désolé, aucune réponse.';
                }
                setMessages((s) => [...s, { sender: 'bot', text: reply }] );
              } catch (err) {
                setMessages((s) => [...s, { sender: 'bot', text: 'Erreur de connexion au serveur.' }]);
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
          <img src="/ai_robot.png" alt="AI Robot" className="w-16 h-16 object-cover rounded-full shadow-lg" />
        </div>
      </button>
    </div>
  );
};

export default ChatBot;

