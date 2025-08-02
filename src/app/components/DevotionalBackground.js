'use client';

import { useEffect, useRef } from 'react';
import { DevotionalIcons } from './DevotionalIcons';

export default function DevotionalBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating symbols
    const symbols = [];
    const symbolTypes = ['om', 'lotus', 'peacock', 'flute', 'krishna'];

    for (let i = 0; i < 15; i++) {
      const symbol = document.createElement('div');
      symbol.className = 'absolute text-4xl opacity-10 pointer-events-none';
      symbol.style.left = `${Math.random() * 100}%`;
      symbol.style.top = `${Math.random() * 100}%`;
      symbol.style.animationDelay = `${Math.random() * 5}s`;
      symbol.style.animationDuration = `${5 + Math.random() * 5}s`;
      
      const symbolType = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
      symbol.innerHTML = DevotionalIcons[symbolType] || '<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>';
      
      container.appendChild(symbol);
      symbols.push(symbol);
    }

    return () => {
      symbols.forEach(symbol => {
        if (symbol.parentNode) {
          symbol.parentNode.removeChild(symbol);
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-red-100/20"></div>
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)"
          ].join(', ')
        }}
      />
    </div>
  );
} 