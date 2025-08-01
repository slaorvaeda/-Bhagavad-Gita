'use client';

import { DevotionalIcons } from './DevotionalIcons';

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-spin text-orange-500">
          <DevotionalIcons.Book className="w-16 h-16" />
        </div>
        <p className="text-xl text-gray-600">{message}</p>
      </div>
    </div>
  );
} 