"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaTelegram, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { CheckCircle2, XCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: 'Une erreur est survenue. Veuillez réessayer.'
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cvLink = "https://drive.google.com/file/d/1rYOaQyPrFcTkXTCAEPodT1CtUVposwTi/view?usp=drive_link";

  const socials = [
    { id: 1, name: "Telegram", icon: <FaTelegram />, link: "https://t.me/TDev01" },
    { id: 2, name: "GitHub", icon: <FaGithub />, link: "https://github.com/tresor228" },
    { id: 3, name: "LinkedIn", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tresor-alade/" },
    { id: 4, name: "Twitter", icon: <FaTwitter />, link: "https://x.com/kodjo_alad65494?t=EiKhL1pQpRztgvX7BvTQmw&s=09" },
  ];

  return (
    <div className='pt-10'>
      <hr className='pt-20 text-zinc-700' />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 gap-12'>
          {/* Contact Info Section */}
          <div className='flex-col' data-aos="fade-right">
            <h2 className='text-2xl sm:text-4xl font-bold uppercase'>Contactez-moi</h2>
            <div className='mt-8 bg-white dark:bg-gray-800/50 shadow-sm p-6 rounded-xl'>
              <p className='py-2 text-lg text-gray-700 dark:text-gray-300'>
                Dites-moi bonjour ici :{" "}
                <a href="mailto:bernardalade92@gmail.com" className='text-blue-500 hover:underline'>
                  bernardalade92@gmail.com
                </a>
              </p>
              <p className='py-2'>
                Pour plus d'informations, voici{" "}
                <Link href={cvLink} target='_blank'>
                  <span className='text-blue-500 hover:underline'>mon CV</span>
                </Link>
              </p>
              <div className='flex justify-start gap-6 pt-4'>
                {socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-3xl text-blue-500 hover:scale-110 transition-transform duration-200'
                    data-aos="zoom-in"
                    data-aos-delay={social.id * 100}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className='flex-col' data-aos="fade-up">
            <form onSubmit={handleSubmit} className='bg-white dark:bg-gray-800/50 shadow-md p-8 rounded-xl space-y-6'>
              {/* Nom */}
              <div className='space-y-2'>
                <label htmlFor="name" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Nom</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white'
                />
              </div>

              {/* Email */}
              <div className='space-y-2'>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Adresse Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white'
                />
              </div>

              {/* Sujet */}
              <div className='space-y-2'>
                <label htmlFor="subject" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white'
                />
              </div>

              {/* Message */}
              <div className='space-y-2'>
                <label htmlFor="message" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className='w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white'
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className='w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200'
              >
                Envoyer
              </button>

              {/* Message de confirmation */}
              {status.type && (
                <div
                  className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
                    status.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <p className="text-sm">{status.message}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        <p className='p-4 text-center text-gray-500 dark:text-gray-400'>
          © {new Date().getFullYear()} Trésor ALADE.
        </p>
      </div>
    </div>
  );
};

export default Contact;
