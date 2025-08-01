export default function VerseDisplay({ chapter, selectedVerse, onVerseSelect }) {
  if (!chapter) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600">Please select a chapter to view verses.</p>
      </div>
    );
  }

  const currentVerse = chapter.verses.find(v => v.number === `${chapter.chapterId}.${selectedVerse}`);

  return (
    <div className="space-y-6">
      {/* Chapter Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chapter {chapter.chapterId}: {chapter.name}
          </h1>
          <p className="text-xl text-gray-600 mb-2">{chapter.meaning}</p>
          <p className="text-lg font-devanagari text-orange-600">{chapter.sanskrit}</p>
        </div>
        <p className="text-gray-700 leading-relaxed">{chapter.summary}</p>
      </div>

      {/* Verse Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Verses</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
          {chapter.verses.map((verse) => {
            const verseNumber = parseInt(verse.number.split('.')[1]);
            return (
              <button
                key={verse.number}
                onClick={() => onVerseSelect(verseNumber)}
                className={`p-2 rounded-lg text-sm font-medium transition-all ${
                  selectedVerse === verseNumber
                    ? 'bg-orange-500 text-white shadow-md'
                    : verse.important
                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {verseNumber}
                {verse.important && (
                  <span className="block text-xs">⭐</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Verse */}
      {currentVerse && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Verse {currentVerse.number}
            </h2>
            {currentVerse.important && (
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Important Verse
              </span>
            )}
          </div>

          {/* Sanskrit Text */}
          <div className="mb-6 p-4 bg-orange-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Sanskrit</h3>
            <p className="text-xl font-devanagari text-gray-800 leading-relaxed">
              {currentVerse.sanskrit}
            </p>
          </div>

          {/* Transliteration */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Transliteration</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentVerse.transliteration}
            </p>
          </div>

          {/* Translation */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Translation</h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              {currentVerse.translation}
            </p>
          </div>

          {/* Word Meanings */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Word Meanings</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentVerse.wordMeaning}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 