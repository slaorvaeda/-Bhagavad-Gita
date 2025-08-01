"use client"

import FluteShowcase from '../components/FluteShowcase'

export default function KrishnaFlutePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="w-full h-screen relative overflow-hidden">
        <FluteShowcase />

        {/* Sacred background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23D4AF37' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Sacred floating elements - Mobile responsive */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Om symbols - Hidden on mobile for better performance */}
          <div className="hidden sm:block absolute top-20 left-20 text-4xl text-amber-200 animate-pulse">
            ॐ
          </div>
          <div className="hidden sm:block absolute top-40 right-32 text-3xl text-amber-200 animate-pulse" style={{ animationDelay: '1s' }}>
            ॐ
          </div>
          <div className="hidden sm:block absolute bottom-32 left-32 text-2xl text-amber-200 animate-pulse" style={{ animationDelay: '2s' }}>
            ॐ
          </div>
          <div className="hidden sm:block absolute bottom-20 right-20 text-3xl text-amber-200 animate-pulse" style={{ animationDelay: '3s' }}>
            ॐ
          </div>

          {/* Floating lotus petals - Reduced on mobile */}
          <div className="absolute top-32 left-1/4 text-lg sm:text-2xl text-orange-200 animate-bounce" style={{ animationDelay: '0.5s' }}>
            🪷
          </div>
          <div className="hidden sm:block absolute top-1/3 right-1/4 text-xl text-orange-200 animate-bounce" style={{ animationDelay: '1.5s' }}>
            🪷
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-lg sm:text-2xl text-orange-200 animate-bounce" style={{ animationDelay: '2.5s' }}>
            🪷
          </div>

          {/* Floating peacock feathers - Hidden on mobile */}
          <div className="hidden sm:block absolute top-1/4 right-16 text-2xl text-blue-200 animate-pulse" style={{ animationDelay: '0.8s' }}>
            🦚
          </div>
          <div className="hidden sm:block absolute bottom-1/4 left-16 text-xl text-blue-200 animate-pulse" style={{ animationDelay: '1.8s' }}>
            🦚
          </div>
        </div>

        {/* Sacred text overlay - Mobile responsive */}
        <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-amber-800 mb-1 sm:mb-2 text-shadow-lg">
            श्रीकृष्ण की बांसुरी
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-amber-700 font-medium">
            Lord Krishna's Divine Flute
          </p>
          <p className="text-xs sm:text-sm md:text-base text-amber-600 mt-1 sm:mt-2 max-w-xs sm:max-w-none mx-auto">
            Experience the sacred instrument that enchants all beings
          </p>
        </div>

        {/* Navigation back to home - Mobile responsive */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
          <a 
            href="/" 
            className="bg-white/20 backdrop-blur-sm text-amber-800 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-amber-200/40 hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base touch-target"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </a>
        </div>

        {/* Sacred quote - Mobile responsive */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none px-4 w-full max-w-sm sm:max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-amber-200/30">
            <p className="text-sm sm:text-lg md:text-xl text-amber-800 font-medium italic">
              "वेणुगोपाल गोविन्द मुकुन्द शौरि नन्दन"
            </p>
            <p className="text-xs sm:text-sm md:text-base text-amber-700 mt-1">
              Venugopala Govinda Mukunda Shauri Nandana
            </p>
          </div>
        </div>

        {/* Mobile controls info - Only show on mobile */}
        <div className="sm:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center pointer-events-none px-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-amber-200/40">
            <p className="text-xs text-amber-800 font-medium mb-1">Touch Controls:</p>
            <p className="text-xs text-amber-700">👆 Drag to rotate • 🔍 Pinch to zoom</p>
          </div>
        </div>
      </div>
    </div>
  )
} 