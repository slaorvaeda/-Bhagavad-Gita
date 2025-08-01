'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DevotionalIcons } from './DevotionalIcons';

export default function ChapterCard({ chapter, index, theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group"
    >
      <Link href={`/chapters/${chapter.chapterId}`}>
        <div className={`bg-gradient-to-br ${theme} rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 h-full`}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-bold">{chapter.chapterId}</span>
            <div className="text-2xl group-hover:scale-110 transition-transform">
              <DevotionalIcons.Book className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-3">{chapter.name}</h3>
          <p className="text-lg opacity-90 mb-4">{chapter.meaning}</p>
          <p className="text-sm font-devanagari opacity-80 mb-4">{chapter.sanskrit}</p>
          <p className="text-sm opacity-75 line-clamp-3">{chapter.summary}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm opacity-75">
              {chapter.verses ? chapter.verses.length : 0} verses
            </span>
            <span className="text-sm opacity-75">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 