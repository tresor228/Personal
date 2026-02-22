import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tresorfolio",
  description: "Mon Portfolio",
  icons: {
    icon: "/logo1.png",
  },
};

// Ajouter le lien CSS pour AOS dans les métadonnées
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

import Nav from "./components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
        {/* Script pour éviter le flash de thème clair lors du chargement */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${archivo.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-screen scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative w-full overflow-x-hidden">
            <Nav />
            <main className="w-full overflow-hidden">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

