'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MahabharataAnimation from './components/MahabharataAnimation';
import FluteShowcase from './components/FluteShowcase';



export default function Home() {
  const [currentTime, setCurrentTime] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const sacredQuotes = [
    {
      text: "योग: कर्मसु कौशलम्",
      meaning: "Yoga is skill in action",
      chapter: "2.50"
    },
    {
      text: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज",
      meaning: "Abandon all varieties of religion and just surrender unto Me",
      chapter: "18.66"
    },
    {
      text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
      meaning: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions",
      chapter: "2.47"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % sacredQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sacredQuotes.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Background Om Logo */}
        <div className="absolute top-1/2 transform -translate-y-1/2 opacity-10 pointer-events-none">
          <Image
            src="/om-logo.svg"
            alt="Sacred Om Symbol Background"
            width={400}
            height={400}
            className="w-full h-full "
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div
              className="text-center lg:text-left"
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">श्रीमद्भगवद्गीता</span>
                <br />
                <span className="text-amber-800">Srimad Bhagavad Gita</span>
              </h1>
              <p
                className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Discover the timeless wisdom of Lord Krishna&apos;s teachings through the sacred verses of the Bhagavad Gita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/chapters"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  Start Reading
                </Link>
                <Link
                  href="/search"
                  className="bg-white text-amber-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  Search Verses
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div
              className="flex justify-center lg:justify-end"
            >
              <Image
                src="/hero.png"
                alt="Divine Krishna with Flute"
                width={800}
                height={800}
                className="rounded-2xl shadow-2xl max-w-full h-auto"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Quote Carousel */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            key={currentQuoteIndex}
            className="text-center max-w-4xl mx-auto"
          >
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-800 italic mb-6 leading-relaxed">
              &ldquo;{sacredQuotes[currentQuoteIndex].text}&rdquo;
            </blockquote>
            <cite className="text-lg text-amber-700 font-semibold">
              — {sacredQuotes[currentQuoteIndex].source}
            </cite>
          </div>
        </div>
      </section>

      {/* Mahabharata Animation Section */}
      {/* <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              The Great Epic
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the cosmic dance of dharma through the lens of Mahabharata, 
              where every particle tells a story of divine wisdom and eternal truth.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
            <MahabharataAnimation />
          </motion.div>
        </div>
      </section> */}

      {/* Flute Showcase Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-8 sm:mb-12"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6"
            >
              Divine Melody
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Witness the sacred flute of Lord Krishna, whose divine music 
              enchants all beings and awakens the soul to spiritual consciousness.
            </p>
          </div>
          
          <div
            className="w-full"
          >
            <FluteShowcase />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              Sacred Features
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover the divine wisdom through our comprehensive features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Chapters",
                description: "All 18 chapters with Sanskrit text, transliteration, and translations",
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: "Advanced Search",
                description: "Search through verses, words, and meanings with powerful filters",
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              {
                title: "Important Verses",
                description: "Curated collection of the most significant teachings and verses",
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              },
              {
                title: "Study Notes",
                description: "Add personal notes and insights to your favorite verses",
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )
              },
              {
                title: "Bookmarks",
                description: "Save and organize your favorite verses for easy access",
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                )
              },
              {
                title: "Mobile Responsive",
                description: "Perfect reading experience on all devices and screen sizes",
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-6xl mx-auto">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { number: "18", label: "Chapters", icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ) },
              { number: "700", label: "Verses", icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ) },
              { number: "5000+", label: "Years Old", icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) },
              { number: "∞", label: "Wisdom", icon: (
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ) }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-1">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
            >
              Begin Your Journey
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90"
            >
              Start exploring the divine wisdom of the Bhagavad Gita today
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/chapters">
                <button
                  className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto touch-target flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Start Reading</span>
                </button>
              </Link>
              <Link href="/search">
                <button
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 w-full sm:w-auto touch-target flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search Verses</span>
                </button>
              </Link>
              <Link href="/krishna-flute">
                <button
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 w-full sm:w-auto touch-target flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span>Divine Flute</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current Time */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100"
          >
            <p className="text-sm sm:text-base text-gray-600 mb-2">Current Time</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600 font-mono">
              {isClient ? currentTime.toLocaleTimeString() : 'Loading...'}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {isClient ? currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'Loading...'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
