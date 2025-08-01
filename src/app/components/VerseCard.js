'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VerseCard({ verse, chapterId, isImportant = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
        isImportant ? 'border-orange-500' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-semibold text-gray-700">Verse {verse.number}</span>
          {isImportant && (
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )}
        </div>
        <Link href={`/chapters/${chapterId}?verse=${verse.number.split('.')[1]}`}>
          <svg className="w-5 h-5 text-gray-400 hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-lg font-devanagari text-gray-800 leading-relaxed mb-2">
            {verse.sanskrit}
          </p>
          <p className="text-sm text-gray-600 italic">
            {verse.transliteration}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Translation</h4>
          <p className="text-gray-600 leading-relaxed">
            {verse.translation}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Word Meanings</h4>
          <p className="text-sm text-gray-600">
            {verse.wordMeaning}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 