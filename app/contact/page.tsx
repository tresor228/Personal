"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { CheckCircle2, XCircle, Mail, FileText, Send, Loader2, MessageSquare, Globe, ArrowRight, Copy, Check } from 'lucide-react';

const Contact = () => {
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
  }>({
    type: null,
    message: ''
  });

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Une erreur est survenue. Veuillez réessayer.'
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setStatus({
        type: 'error',
        message: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion.'
      });
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
    { id: 1, name: "GitHub", icon: <FaGithub />, link: "https://github.com/TresorAlad", color: "hover:text-gray-900 dark:hover:text-white" },
    { id: 2, name: "LinkedIn", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tresor-alade/", color: "hover:text-blue-600" },
    { id: 3, name: "Twitter", icon: <FaTwitter />, link: "https://x.com/kodjo_alad65494?t=EiKhL1pQpRztgvX7BvTQmw&s=09", color: "hover:text-blue-400" },
  ];

  return (
    <div className='w-full overflow-hidden pt-10'>
      <hr className='pt-20 text-zinc-700' />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-16' data-aos="fade-down">
          <h2 className='text-3xl font-bold uppercase pb-4 text-gray-900 dark:text-white'>Contactez-moi</h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl'>
            Dites-moi bonjour ici ! Que vous ayez une question, une proposition de projet ou que vous souhaitiez simplement échanger.
          </p>
        </div>

        <div className='grid lg:grid-cols-5 gap-12'>
          {/* Info Section (2 columns) */}
          <div className='lg:col-span-2 space-y-8' data-aos="fade-right">
            <div>
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>Coordonnées</h3>

              <div className='space-y-6'>
                {/* Email Card */}
                <div className='flex items-start p-4 bg-white dark:bg-gray-800/40 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md group/card'>
                  <div className='flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400'>
                    <Mail size={24} />
                  </div>
                  <div className='ml-4 flex-grow'>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Email</p>
                    <div className='flex items-center justify-between gap-2 mt-1'>
                      <a href="mailto:bernardalade92@gmail.com" className='text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-500 transition-colors break-all leading-tight'>
                        bernardalade92@gmail.com
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-blue-500'
                        title="Copier l'adresse"
                      >
                        {copied ? <Check size={18} className='text-green-500' /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resume Card */}
                <div className='flex items-start p-4 bg-white dark:bg-gray-800/40 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md'>
                  <div className='flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400'>
                    <FileText size={24} />
                  </div>
                  <div className='ml-4'>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Curriculum Vitae</p>
                    <Link href={cvLink} target='_blank' className='inline-flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:text-green-500 transition-colors group'>
                      Consulter mon profil
                      <ArrowRight size={18} className='ml-2 transform group-hover:translate-x-1 transition-transform' />
                    </Link>
                  </div>
                </div>

                {/* Available Status */}
                <div className='flex items-start p-4 bg-white dark:bg-gray-800/40 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md'>
                  <div className='flex-shrink-0 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400'>
                    <Globe size={24} />
                  </div>
                  <div className='ml-4'>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Disponibilité</p>
                    <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                      Ouvert aux opportunités de stage et collaborations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h4 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>Suivez-moi</h4>
              <div className='flex gap-4'>
                {socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white dark:bg-gray-800/40 rounded-full border border-gray-100 dark:border-gray-700/50 text-2xl text-gray-600 dark:text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Form Section (3 columns) */}
          <div className='lg:col-span-3' data-aos="fade-left">
            <div className='bg-white dark:bg-gray-800/40 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700/50'>
              <div className='flex items-center gap-3 mb-8'>
                <div className='p-2 bg-blue-500 rounded-lg text-white'>
                  <MessageSquare size={20} />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Envoyez un message</h3>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid sm:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label htmlFor="name" className='text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1'>Nom Complet</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Trésor ALADE"
                      className='w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor="email" className='text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1'>Adresse Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="bernardalade92@gmail.com"
                      className='w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor="subject" className='text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1'>Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="En quoi puis-je vous aider ?"
                    className='w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600'
                  />
                </div>

                <div className='space-y-2'>
                  <label htmlFor="message" className='text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1'>Votre Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Écrivez votre message ici..."
                    className='w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none'
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className='w-full group relative flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25'
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>Envoyer le Message</span>
                    </>
                  )}
                </button>

                {/* Status Feedback */}
                {status.type && (
                  <div
                    className={`animate-fade-in p-4 rounded-xl flex items-start gap-3 ${status.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                      }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-semibold">{status.type === 'success' ? 'Succès !' : 'Erreur'}</p>
                      <p className="text-sm opacity-90">{status.message}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className='mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center'>
          <p className='text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2'>
            <span>© {new Date().getFullYear()} Trésor ALADE.</span>
            <span className='hidden sm:inline'>•</span>
            <span className='hidden sm:inline italic text-sm'>Développé avec passion</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
