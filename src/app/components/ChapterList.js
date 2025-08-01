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
            <span className="font-bold text-lg">{chapter.chapterId}</span>
            <span className="text-xs opacity-75">📖</span>
          </div>
          <h3 className="font-semibold text-sm mt-1">{chapter.name}</h3>
          <p className="text-xs opacity-75 mt-1">{chapter.meaning}</p>
          <p className="text-xs font-devanagari mt-1 opacity-60">{chapter.sanskrit}</p>
        </button>
      ))}
    </div>
  );
} 