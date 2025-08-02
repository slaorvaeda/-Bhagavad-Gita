export default function ChapterList({ chapters, selectedChapter, onChapterSelect }) {
  return (
    <div className="space-y-2">
      {chapters.map((chapter) => (
        <button
          key={chapter.chapterId}
          onClick={() => onChapterSelect(chapter.chapterId)}
          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
            selectedChapter === chapter.chapterId
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-50 hover:bg-orange-100 text-gray-700 hover:text-orange-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xs opacity-75">Chapter {chapter.chapterId}</span>
            </div>
          </div>
          <h3 className="font-semibold text-sm mt-1">{chapter.name}</h3>
          <p className="text-xs opacity-75 mt-1">{chapter.meaning}</p>
          <p className="text-xs font-devanagari mt-1 opacity-60">{chapter.sanskrit}</p>
        </button>
      ))}
    </div>
  );
} 