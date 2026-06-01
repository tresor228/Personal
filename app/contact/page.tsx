"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { CheckCircle2, XCircle, Mail, FileText, Send, Loader2, MessageSquare, Globe, ArrowRight, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bernardalade92@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: t("contact.form.success") });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || t("contact.form.error") });
      }
    } catch {
      setStatus({ type: 'error', message: 'Impossible de se connecter au serveur.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cvLink = "https://drive.google.com/file/d/1ckRwZsWM5G-TEKY28aINVZcBreZidPXg/view?usp=sharing";

  const socials = [
    { id: 1, name: "GitHub", icon: <FaGithub />, link: "https://github.com/TresorAlad" },
    { id: 2, name: "LinkedIn", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tresor-alade/" },
    { id: 3, name: "Twitter", icon: <FaTwitter />, link: "https://x.com/kodjo_alad65494" },
  ];

  const inputClass = "w-full px-5 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 focus:border-[#FD8D49] focus:ring-4 focus:ring-[#FD8D49]/10 outline-none transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm font-outfit";

  return (
    <div className='w-full overflow-hidden py-24 bg-white dark:bg-[#0B0D10]/15'>
      <div className="section-divider mb-12" />

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-outfit'>
        
        {/* Section Header */}
        <div className='mb-12' data-aos="fade-down">
          <span className="text-[10px] font-black text-[#FD8D49] uppercase tracking-[0.35em]">
            — Travaillons ensemble
          </span>
          <h2 className='text-4xl sm:text-6xl font-black uppercase tracking-tight text-zinc-950 dark:text-white mt-3'>
            {t("contact.title")}
          </h2>
          <p className='text-zinc-500 dark:text-zinc-400 max-w-xl mt-4 text-sm'>
            {t("contact.description")}
          </p>
        </div>

        <div className='grid lg:grid-cols-5 gap-10'>
          
          {/* Info Column */}
          <div className='lg:col-span-2 space-y-6' data-aos="fade-right">
            
            {/* Email */}
            <div className='group flex items-center gap-4 p-5 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5 hover:border-[#FD8D49]/30 transition-all shadow-md shadow-black/[0.005]'>
              <div className='p-3 bg-[#FD8D49]/10 rounded-xl text-[#FD8D49] flex-shrink-0'>
                <Mail size={20} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1'>Email</p>
                <a href="mailto:bernardalade92@gmail.com"
                  className='text-sm font-bold text-zinc-900 dark:text-white hover:text-[#FD8D49] transition-colors truncate block'>
                  bernardalade92@gmail.com
                </a>
              </div>
              <button onClick={handleCopyEmail}
                className='p-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded-xl transition-all text-zinc-400 hover:text-[#FD8D49]'
                title="Copier">
                {copied ? <Check size={16} className='text-[#FD8D49]' /> : <Copy size={16} />}
              </button>
            </div>

            {/* CV */}
            <div className='flex items-center gap-4 p-5 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5 hover:border-[#FD8D49]/30 transition-all shadow-md shadow-black/[0.005]'>
              <div className='p-3 bg-[#FD8D49]/10 rounded-xl text-[#FD8D49] flex-shrink-0'>
                <FileText size={20} />
              </div>
              <div className='flex-1'>
                <p className='text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1'>Curriculum Vitae</p>
                <Link href={cvLink} target='_blank'
                  className='group/cv inline-flex items-center text-sm font-bold text-zinc-900 dark:text-white hover:text-[#FD8D49] transition-colors gap-1'>
                  {t("contact.info.cv")}
                  <ArrowRight size={14} className='group-hover/cv:translate-x-1 transition-transform' />
                </Link>
              </div>
            </div>

            {/* Availability */}
            <div className='flex items-center gap-4 p-5 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5 hover:border-[#FD8D49]/30 transition-all shadow-md shadow-black/[0.005]'>
              <div className='p-3 bg-emerald-500/10 rounded-xl text-emerald-500 flex-shrink-0'>
                <Globe size={20} />
              </div>
              <div>
                <p className='text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1'>{t("contact.info.availability")}</p>
                <p className='text-sm font-bold text-zinc-900 dark:text-white'>{t("contact.info.availability.details")}</p>
              </div>
            </div>

            {/* Socials */}
            <div className='pt-4'>
              <p className='text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-4'>{t("contact.socials")}</p>
              <div className='flex gap-3'>
                {socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-3 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-full text-lg text-zinc-500 dark:text-zinc-400 hover:text-[#FD8D49] hover:border-[#FD8D49]/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FD8D49]/5 transition-all duration-300 shadow-sm"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className='lg:col-span-3' data-aos="fade-left">
            <div className='bg-zinc-50 dark:bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-[2.5rem] border border-zinc-100 dark:border-white/5 shadow-xl shadow-black/[0.005]'>
              
              <div className='flex items-center gap-3 mb-8'>
                <div className='p-2.5 bg-[#FD8D49] rounded-xl text-white shadow-md shadow-[#FD8D49]/20'>
                  <MessageSquare size={18} />
                </div>
                <h3 className='text-xl font-bold text-zinc-900 dark:text-white'>{t("contact.form.title")}</h3>
              </div>

              <form onSubmit={handleSubmit} className='space-y-5'>
                <div className='grid sm:grid-cols-2 gap-5'>
                  <div className='space-y-2'>
                    <label htmlFor="name" className='text-[9px] font-black text-zinc-400 uppercase tracking-widest'>{t("contact.form.name")}</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                      required placeholder="Trésor ALADE" className={inputClass} />
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor="email" className='text-[9px] font-black text-zinc-400 uppercase tracking-widest'>{t("contact.form.email")}</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                      required placeholder="exemple@gmail.com" className={inputClass} />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor="subject" className='text-[9px] font-black text-zinc-400 uppercase tracking-widest'>{t("contact.form.subject")}</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                    required placeholder={t("contact.form.subject")} className={inputClass} />
                </div>

                <div className='space-y-2'>
                  <label htmlFor="message" className='text-[9px] font-black text-zinc-400 uppercase tracking-widest'>{t("contact.form.message")}</label>
                  <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange}
                    required placeholder="Votre message..." className={`${inputClass} resize-none`} />
                </div>

                <button type="submit" disabled={isLoading}
                  className='group w-full flex items-center justify-center gap-3 py-4 bg-[#FD8D49] hover:bg-[#E06B29] disabled:opacity-60 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-[#FD8D49]/10 hover:shadow-[#FD8D49]/20 hover:-translate-y-0.5'>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      {t("contact.form.submit")}
                    </>
                  )}
                </button>

                {status.type && (
                  <div className={`animate-fade-in p-4 rounded-2xl flex items-start gap-3 text-xs ${
                    status.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-800'
                      : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-250 dark:border-red-800'
                  }`}>
                    {status.type === 'success'
                      ? <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      : <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    }
                    <div>
                      <p className="font-bold">{status.type === 'success' ? t("contact.footer.success") : t("contact.footer.error")}</p>
                      <p className="opacity-80 mt-0.5">{status.message}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-24 pt-8 border-t border-zinc-150 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-zinc-400'>
            © {new Date().getFullYear()} <span className="font-bold text-zinc-650 dark:text-zinc-350">Trésor ALADE</span>. Tous droits réservés.
          </p>
          <p className='text-[10px] text-zinc-450 dark:text-zinc-500 uppercase tracking-wider font-bold'>
            {t("contact.footer.madeWith")} — Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
