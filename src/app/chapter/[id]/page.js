import Link from 'next/link';
import BookmarkButton from '../../components/BookmarkButton';

// Import data from the data file
import { gitaChapters } from '../../data/gitaData';

export default async function ChapterPage({ params }) {
  const resolvedParams = await params;
  const chapterId = parseInt(resolvedParams.id);
  const chapter = gitaChapters[chapterId];

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Chapter Not Found</h1>
          <p className="text-gray-600 mb-8">This chapter is not available yet.</p>
          <Link href="/" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

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
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Link href="/" className="text-yellow-300 hover:text-yellow-100 transition-colors mb-4 inline-block">
              ← Back to All Chapters
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Chapter {chapterId}: {chapter.name}
            </h1>
            <p className="text-xl mb-2 sanskrit">{chapter.sanskrit}</p>
            <p className="text-lg opacity-90">{chapter.meaning}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Chapter Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Chapter Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {chapter.summary || "This chapter explores the fundamental teachings of the Bhagavad Gita, addressing the nature of the soul, the importance of dharma, and the path to spiritual enlightenment. Each verse contains profound wisdom that has guided seekers for thousands of years."}
            </p>
          </div>

          {/* Verses */}
          <div className="space-y-8">
            {chapter.verses.map((verse, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 border-l-4 border-orange-500" id={`verse-${verse.number}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="verse-number text-lg font-bold text-orange-600">{verse.number}</div>
                  <BookmarkButton 
                    verseId={`${chapterId}-${verse.number}`}
                    chapterId={chapterId}
                    verseNumber={verse.number}
                  />
                </div>
                
                {/* Sanskrit Text */}
                <div className="mb-6">
                  <div className="sanskrit text-xl text-gray-800 leading-relaxed p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                    {verse.sanskrit}
                  </div>
                </div>
                
                {/* Transliteration */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Transliteration:</h4>
                  <p className="text-gray-700 font-mono text-sm leading-relaxed">{verse.transliteration}</p>
                </div>
                
                {/* Translation */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Translation:</h4>
                  <p className="text-gray-700 leading-relaxed p-4 bg-blue-50 rounded-lg border border-blue-200">{verse.translation}</p>
                </div>
                
                {/* Word Meanings */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Word Meanings:</h4>
                  <p className="text-gray-600 leading-relaxed p-4 bg-green-50 rounded-lg border border-green-200 text-sm">{verse.wordMeaning}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            {chapterId > 1 && (
              <Link 
                href={`/chapter/${chapterId - 1}`}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md"
              >
                ← Previous Chapter
              </Link>
            )}
            
            <Link 
              href="/"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
            >
              All Chapters
            </Link>
            
            {chapterId < 18 && (
              <Link 
                href={`/chapter/${chapterId + 1}`}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md"
              >
                Next Chapter →
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 