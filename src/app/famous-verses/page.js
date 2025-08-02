import Link from 'next/link';
import { famousVerses } from '../data/gitaData';

export default function FamousVersesPage() {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Sacred Om Symbol Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="flex items-center justify-center h-full">
          <div className="text-9xl font-bold text-orange-600">ॐ</div>
        </div>
      </div>

      {/* Page Header Section */}
      <section className="relative z-10 bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <Link href="/" className="text-yellow-300 hover:text-yellow-100 transition-colors mb-6 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Famous Verses
            </h1>
            <p className="text-xl opacity-90 mb-6">
              The most important teachings from the Bhagavad Gita
            </p>
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-10 mb-12 border-l-4 border-orange-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Timeless Wisdom</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              These verses contain the essence of the Bhagavad Gita&apos;s teachings. They have guided millions 
              of people throughout history and continue to offer profound insights for modern life.
            </p>
            <p className="text-lg text-gray-600">
              Each verse is presented with its Sanskrit text, translation, and practical meaning for daily life.
            </p>
          </div>

          {/* Famous Verses */}
          <div className="space-y-12">
            {famousVerses.map((verse, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-10 border-l-4 border-yellow-500 transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                      Verse {verse.id}
                    </h3>
                    <p className="text-lg text-gray-600">
                      Chapter {verse.chapter}
                    </p>
                  </div>
                  <Link
                    href={`/chapter/${verse.chapter}#verse-${verse.id}`}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    View in Context
                  </Link>
                </div>

                {/* Sanskrit Text */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-600 mb-4">Sanskrit:</h4>
                  <div className="sanskrit text-2xl text-gray-800 leading-relaxed p-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                    {verse.sanskrit}
                  </div>
                </div>

                {/* Translation */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-600 mb-4">Translation:</h4>
                  <p className="text-xl text-gray-700 leading-relaxed p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                    {verse.translation}
                  </p>
                </div>

                {/* Practical Meaning */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-600 mb-4">Practical Meaning:</h4>
                  <p className="text-xl text-gray-700 leading-relaxed p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    {verse.meaning}
                  </p>
                </div>

                {/* Life Application */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border-2 border-purple-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    How to Apply in Daily Life:
                  </h4>
                  <ul className="text-lg text-gray-700 space-y-3">
                    {verse.id === "2.47" && (
                      <>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Focus on your actions and efforts, not the results</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Do your best in everything you do</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Let go of attachment to outcomes</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Find peace in the process, not just the destination</span>
                        </li>
                      </>
                    )}
                    {verse.id === "4.8" && (
                      <>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Trust that divine help is always available</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Have faith in the natural order of things</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Understand that challenges serve a higher purpose</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Stay committed to righteous actions</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-12 shadow-lg border-2 border-orange-200">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Continue Your Journey
              </h3>
              <p className="text-xl text-gray-700 mb-8">
                These verses are just the beginning. Explore all 18 chapters to discover the complete wisdom of the Bhagavad Gita.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/chapters"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-105 text-lg font-semibold"
                >
                  Explore All Chapters
                </Link>
                <Link
                  href="/bookmarks"
                  className="bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg transform hover:scale-105 text-lg font-semibold"
                >
                  My Bookmarks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 