'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MahabharataAnimation from './components/MahabharataAnimation';
import FluteShowcase from './components/FluteShowcase';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
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

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % sacredQuotes.length);
    }, 5000);
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(253,244,212)]">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-4 sm:mb-6">
                <span className="text-orange-600 font-devanagari">श्रीमद्भगवद्गीता</span>
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4 sm:mb-6">
                The Song of the Divine Lord
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Discover the timeless wisdom of Lord Krishna's teachings to Arjuna on the battlefield of Kurukshetra. 
                A sacred scripture that guides humanity through the path of dharma, karma, and moksha.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/chapters" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto touch-target"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Read Sacred Verses</span>
                  </motion.button>
                </Link>
                <Link href="/important-verses" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-orange-600 border-2 border-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto touch-target"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>Important Teachings</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-2xl">
                <Image
                  src="/hero.png"
                  alt="Bhagavad Gita Hero Image"
                  width={800}
                  height={800}
                  className="object-contain rounded-2xl"
                  priority
                  
                />
              </div>
            </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Divine Melody
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Witness the sacred flute of Lord Krishna, whose divine music 
              enchants all beings and awakens the soul to spiritual consciousness.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
            <FluteShowcase />
          </motion.div>
        </div>
      </section>

      {/* Sacred Quote Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border border-orange-100"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-4 sm:mb-6">🕉️</div>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-devanagari text-orange-600 mb-4 sm:mb-6 leading-relaxed">
                "{sacredQuotes[currentQuote].text}"
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-3 sm:mb-4">
                {sacredQuotes[currentQuote].meaning}
              </p>
              <p className="text-sm sm:text-base text-orange-500 font-semibold">
                Bhagavad Gita {sacredQuotes[currentQuote].chapter}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              Sacred Features
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the complete Bhagavad Gita with modern tools and traditional reverence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "📖",
                title: "Complete Scripture",
                description: "All 700 verses across 18 chapters with Sanskrit text, transliteration, translation, and word meanings.",
                color: "from-blue-500 to-purple-500"
              },
              {
                icon: "🔍",
                title: "Advanced Search",
                description: "Search through verses, translations, and Sanskrit text to find specific teachings and wisdom.",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: "⭐",
                title: "Important Verses",
                description: "Curated collection of the most significant verses that contain the essence of spiritual wisdom.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: "💾",
                title: "Bookmarks",
                description: "Save your favorite verses and create personal collections for daily study and reflection.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                description: "Read and study the Gita anywhere, anytime with our responsive design optimized for all devices.",
                color: "from-indigo-500 to-blue-500"
              },
              {
                icon: "🎵",
                title: "Audio Support",
                description: "Listen to Sanskrit recitations and pronunciations to enhance your learning experience.",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl sm:text-3xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { number: "18", label: "Chapters", icon: "📖" },
              { number: "700", label: "Verses", icon: "📜" },
              { number: "5000+", label: "Years Old", icon: "⏰" },
              { number: "∞", label: "Wisdom", icon: "🕉️" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
              >
                <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-1">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Begin Your Journey
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
              Start exploring the divine wisdom of the Bhagavad Gita today
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/chapters">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto touch-target"
                >
                  Start Reading
                </motion.button>
              </Link>
              <Link href="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 w-full sm:w-auto touch-target"
                >
                  Search Verses
                </motion.button>
              </Link>
              <Link href="/krishna-flute">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 w-full sm:w-auto touch-target flex items-center space-x-2"
                >
                  <span>🎵</span>
                  <span>Divine Flute</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Time */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100"
          >
            <p className="text-sm sm:text-base text-gray-600 mb-2">Current Time</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600 font-mono">
              {currentTime.toLocaleTimeString()}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
