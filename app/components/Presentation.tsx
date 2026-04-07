"use client";

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Calendar, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const Presentation = () => {
  const link = [
    "https://www.linkedin.com/in/tresor-alade/",
    "https://github.com/tresor228"
  ]
  return (
    <section className='w-full overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='gap-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 md:grid-cols-2 items-center pt-28 md:pt-36'>
          <div className=''>
            <p 
            className='uppercase text-2xl sm:text-4xl font-bold my-2 py-2'>
              <span className=''>Salut,  je suis</span><br />
              <span className='pb-4'>Trésor ALADE</span>
            </p>
            <p className='dark:text-gray-300'>
            Développeur Backend avec 2 ans d'expérience et Administrateur de Bases de Données (DBA) Junior, passionné par la conception de systèmes robustes et performants.
            </p>

            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className='flex flex-wrap gap-6 pt-8'
            >
              <div className='flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700'>
                <div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md text-blue-500'>
                  <Calendar size={20} />
                </div>
                <div>
                  <div className='text-xl font-bold text-gray-900 dark:text-white'>2+ Ans</div>
                  <div className='text-xs text-gray-500 dark:text-gray-400 uppercase font-medium'>Expérience</div>
                </div>
              </div>

              <div className='flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700'>
                <div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-md text-green-500'>
                  <Users size={20} />
                </div>
                <div>
                  <div className='text-xl font-bold text-gray-900 dark:text-white'>3+ Clients</div>
                  <div className='text-xs text-gray-500 dark:text-gray-400 uppercase font-medium'>Satisfaits</div>
                </div>
              </div>

              <div className='flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700'>
                <div className='p-2 bg-orange-100 dark:bg-orange-900/30 rounded-md text-orange-500'>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className='text-xl font-bold text-gray-900 dark:text-white'>5+ Projets</div>
                  <div className='text-xs text-gray-500 dark:text-gray-400 uppercase font-medium'>Livrés</div>
                </div>
              </div>
            </div>

            <div data-aos="fade-right"
               data-aos-delay="100"
               className='flex items-center space-x-4 pt-10'>
               <Link href={'/contact'}>
                <Button
                  className='bg-blue-500 text-white hover:bg-blue-600 rounded-full'
                >Me Contacter
               </Button>
               </Link>
               <div className='text-blue-500'>
                <Link href={link[0]}>
                  <Linkedin />
                </Link>
               </div>
               <div className='text-blue-500'>
                 <Link href={link[1]}>
                   <Github />
                 </Link>
               </div>
            </div>
          </div>
          <div className='pt-5 sm:pt-0'>
            <div 
             className='w-full sm:w-[300px] h-full bg-gray-100 hover:bg-gray-50 dark:bg-bgdarkPrimary dark:hover:bg-gray-800 rounded-xl flex justify-center drop-shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out items-center'>
              <Image 
              src='/tresorfolio.png' 
              alt='tresor' 
              width={300} 
              height={400}
              className='rounded-xl' 
              />
            </div>
          </div> 
        </div>
      </div>
    </section>
  )
}

export default Presentation