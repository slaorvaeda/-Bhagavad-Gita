import "./globals.css";
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({ 
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata = {
  title: "Bhagavad Gita - Read Online | श्रीमद्भगवद्गीता | Complete 700 Verses",
  description: "Read Bhagavad Gita online with Sanskrit text, English translation, and word meanings. Complete 18 chapters, 700 verses of Lord Krishna's divine wisdom. Free access to sacred Hindu scripture.",
  keywords: "Bhagavad Gita, read Bhagavad Gita online, Bhagavad Gita in English, Sanskrit Bhagavad Gita, Lord Krishna teachings, Hindu scripture, spiritual wisdom, dharma, karma, moksha, sacred text, 700 verses, 18 chapters, Arjuna, divine wisdom, spiritual guidance, ancient wisdom, vedic literature, upanishads, mahabharata",
  authors: [{ name: "Bhagavad Gita Digital" }],
  creator: "Bhagavad Gita Digital",
  publisher: "Bhagavad Gita Digital",
  category: "Religion & Spirituality",
  classification: "Sacred Text",
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
    title: "Bhagavad Gita - Read Online | Complete 700 Verses with Translation",
    description: "Read the complete Bhagavad Gita online with Sanskrit text, English translation, and detailed word meanings. All 18 chapters and 700 verses of Lord Krishna's divine wisdom.",
    url: 'https://bhagavadgita.digital',
    siteName: 'Bhagavad Gita Digital',
    images: [
      {
        url: '/krishna.svg',
        width: 500,
        height: 700,
        alt: 'Lord Krishna with Divine Flute - Bhagavad Gita',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita - Read Online | Complete 700 Verses",
    description: "Read the complete Bhagavad Gita online with Sanskrit text, English translation, and detailed word meanings. All 18 chapters and 700 verses.",
    images: ['/krishna.svg'],
    creator: '@bhagavadgitadigital',
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
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${notoSansDevanagari.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/om-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="application-name" content="Bhagavad Gita Digital" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bhagavad Gita" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Bhagavad Gita Digital",
              "url": "https://bhagavadgita.digital",
              "description": "Read the complete Bhagavad Gita online with Sanskrit text, English translation, and detailed word meanings. All 18 chapters and 700 verses of Lord Krishna's divine wisdom.",
              "publisher": {
                "@type": "Organization",
                "name": "Bhagavad Gita Digital",
                "url": "https://bhagavadgita.digital"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bhagavadgita.digital/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://en.wikipedia.org/wiki/Bhagavad_Gita",
                "https://www.bhagavad-gita.org/"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              "name": "Bhagavad Gita",
              "alternateName": "श्रीमद्भगवद्गीता",
              "description": "The Divine Song of Lord Krishna - A sacred Hindu scripture with 700 verses of spiritual wisdom.",
              "author": {
                "@type": "Person",
                "name": "Lord Krishna"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Bhagavad Gita Digital"
              },
              "numberOfPages": 700,
              "bookFormat": "Digital",
              "genre": "Sacred Text",
              "inLanguage": ["en", "sa"],
              "isbn": "978-0-000000-0-0",
              "url": "https://bhagavadgita.digital"
            })
          }}
        />
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
