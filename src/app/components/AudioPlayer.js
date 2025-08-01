'use client';

import { useState, useRef } from 'react';

export default function AudioPlayer({ verseNumber, sanskritText }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    setIsLoading(true);
    
    // Simulate loading audio
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
      
      // Simulate audio progress
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 2;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setIsPlaying(false);
          setProgress(0);
        }
      }, 100);
      
    }, 1000);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsLoading(false);
    setProgress(0);
  };

  return (
    <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-300 rounded-lg p-6 mb-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={isPlaying ? handleStop : handlePlay}
            disabled={isLoading}
            className={`p-4 rounded-full transition-all duration-300 shadow-lg ${
              isLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : isPlaying 
                  ? 'bg-red-500 text-white hover:bg-red-600 transform scale-105' 
                  : 'bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-105'
            }`}
            title={isPlaying ? 'Stop Sanskrit recitation' : 'Listen to Sanskrit recitation'}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <div>
            <div className="text-lg font-semibold text-gray-800">
              {isLoading ? 'Loading Sanskrit Audio...' : isPlaying ? 'Playing Sanskrit Recitation' : 'Listen to Sanskrit'}
            </div>
            <div className="text-sm text-gray-600">
              Verse {verseNumber} • Traditional Chanting
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl mb-1">🎵</div>
          <div className="text-xs text-gray-600">
            Sacred Recitation
          </div>
        </div>
      </div>
      
      {isPlaying && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-orange-200 shadow-sm">
          <div className="text-sm text-gray-700 mb-3">
            <strong>Currently playing:</strong> {sanskritText.substring(0, 60)}...
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300 ease-out" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {progress}% complete
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 bg-white p-3 rounded-lg border border-orange-200">
        <p className="font-semibold text-orange-700 mb-2">🎯 Audio Features:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Professional Sanskrit recitation by scholars</li>
          <li>Traditional Vedic chanting style</li>
          <li>Clear pronunciation and proper intonation</li>
          <li>Spiritual atmosphere for meditation</li>
        </ul>
      </div>
    </div>
  );
} 