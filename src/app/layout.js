import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: "श्रीमद्भगवद्गीता | Srimad Bhagavad Gita",
  description: "The Divine Song of Lord Krishna - A sacred Hindu scripture with 700 verses of spiritual wisdom. Read, search, and study the Bhagavad Gita online.",
  keywords: "Bhagavad Gita, Krishna, Arjuna, Hindu scripture, spiritual wisdom, dharma, karma, moksha, Sanskrit, sacred text",
  authors: [{ name: "Bhagavad Gita Digital" }],
  creator: "Bhagavad Gita Digital",
  publisher: "Bhagavad Gita Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bhagavadgita.digital'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "श्रीमद्भगवद्गीता | Srimad Bhagavad Gita",
    description: "The Divine Song of Lord Krishna - A sacred Hindu scripture with 700 verses of spiritual wisdom.",
    url: 'https://bhagavadgita.digital',
    siteName: 'Bhagavad Gita Digital',
    images: [
      {
        url: '/krishna.svg',
        width: 500,
        height: 700,
        alt: 'Lord Krishna',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "श्रीमद्भगवद्गीता | Srimad Bhagavad Gita",
    description: "The Divine Song of Lord Krishna - A sacred Hindu scripture with 700 verses of spiritual wisdom.",
    images: ['/krishna.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans antialiased bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
