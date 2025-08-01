'use client';

import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, description }) {
  return (
    <section className="py-16 text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              {subtitle}
            </h2>
          )}
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
} 