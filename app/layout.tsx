import type { Metadata } from "next";
import { Geist_Mono, Archivo, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { LanguageProvider } from "./components/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

import Nav from "./components/Nav";
import { AosProvider } from "./components/AosProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
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
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AosProvider>
              <div className="relative w-full overflow-x-hidden">
                <Nav />
                <main className="w-full overflow-hidden">
                  {children}
                </main>
              </div>
            </AosProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
