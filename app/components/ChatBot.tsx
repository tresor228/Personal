"use client";

import React, { useState, useEffect, useRef } from "react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
  source?: "gemini";
  isError?: boolean;
};

const WELCOME_MESSAGE =
  "Bonjour ! Je suis l'assistant IA de Trésor.\nPosez-moi une question sur ses compétences, ses projets ou son expérience.";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((s) => [...s, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.text,
      }));

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      type ChatbotResponse = {
        reply?: string;
        error?: string;
        source?: ChatMessage["source"];
      };

      let data: ChatbotResponse | null = null;
      try {
        data = (await res.json()) as ChatbotResponse;
      } catch {
        data = null;
      }

      let reply: string;
      const source: ChatMessage["source"] = data?.source;
      let isError = false;

      if (!res.ok) {
        reply =
          res.status === 402
            ? "Le quota de la clé API est dépassé."
            : typeof data?.error === "string"
            ? data.error
            : `Erreur serveur (${res.status})`;
        isError = true;
      } else {
        reply = data?.reply || "Désolé, aucune réponse.";
      }

      setMessages((s) => [...s, { sender: "bot", text: reply, source, isError }]);
    } catch {
      setMessages((s) => [
        ...s,
        { sender: "bot", text: "Erreur de connexion.", isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Chat window ── */}
      {isOpen && (
        <div
          className="
            w-[20rem] sm:w-[23rem] max-w-[88vw]
            h-[26rem] sm:h-[28rem]
            flex flex-col
            rounded-2xl overflow-hidden
            shadow-2xl shadow-black/20
            border border-zinc-200 dark:border-white/10
            bg-white dark:bg-[#0f1117]
            animate-in slide-in-from-bottom-4 fade-in duration-300
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0B0D10] border-b border-white/10 flex-shrink-0">
            {/* Avatar TA */}
            <div className="w-9 h-9 rounded-full bg-[#FD8D49] flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-md shadow-[#FD8D49]/30">
              TA
            </div>

            {/* Name + status */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm font-outfit leading-none">
                Trésor AI
              </p>
              <p className="text-zinc-400 text-[11px] mt-0.5 flex items-center gap-1.5 font-outfit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                En ligne · assistant personnel
              </p>
            </div>

            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Fermer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-zinc-50 dark:bg-[#161b22]
                       scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-white/10"
          >
            {messages.map((m, idx) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={idx}
                  className={`flex items-end gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Bot avatar */}
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#FD8D49] flex items-center justify-center text-white text-[9px] font-black flex-shrink-0 mb-0.5">
                      TA
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] text-[13.5px] leading-relaxed whitespace-pre-wrap px-3.5 py-2.5 font-outfit ${
                      isUser
                        ? "bg-[#FD8D49] text-white rounded-2xl rounded-br-sm shadow-sm shadow-[#FD8D49]/20"
                        : m.isError
                        ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl rounded-bl-sm border border-red-200 dark:border-red-800/50"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-bl-sm shadow-sm border border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator — waveform orange */}
            {loading && (
              <div className="flex items-end gap-2 animate-in fade-in duration-200">
                <div className="w-6 h-6 rounded-full bg-[#FD8D49] flex items-center justify-center text-white text-[9px] font-black flex-shrink-0">
                  TA
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-bl-sm px-4 py-3.5 shadow-sm flex items-center gap-[3px]">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="block w-[3px] rounded-full bg-[#FD8D49]"
                      style={{
                        height: "16px",
                        animation: "chatWave 1s ease-in-out infinite",
                        animationDelay: `${i * 120}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex-shrink-0 px-3 py-3 bg-white dark:bg-[#0f1117] border-t border-zinc-100 dark:border-white/8"
          >
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2 focus-within:border-[#FD8D49] transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Envoyer un message…"
                disabled={loading}
                className="flex-1 bg-transparent outline-none text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 font-outfit disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-lg bg-[#FD8D49] hover:bg-[#E06B29] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0"
                aria-label="Envoyer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-600 text-center mt-1.5 font-outfit">
              Propulsé par Gemini · Assistant de Trésor
            </p>
          </form>
        </div>
      )}

      {/* ── Trigger button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative focus:outline-none rounded-full transition-all hover:scale-105 duration-300 shadow-xl shadow-black/20"
        aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
      >
        {/* Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#FD8D49] text-[10px] font-bold text-white border-2 border-white dark:border-[#0B0D10] z-10 shadow-sm">
            1
          </span>
        )}

        <div className="w-[3.8rem] h-[3.8rem] rounded-full overflow-hidden bg-white/50 backdrop-blur-sm ring-2 ring-[#FD8D49]/30 hover:ring-[#FD8D49]/60 transition-all">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ai_robot.png"
            alt="AI Assistant"
            className="w-full h-full object-cover"
          />
        </div>
      </button>
    </div>
  );
};

export default ChatBot;
