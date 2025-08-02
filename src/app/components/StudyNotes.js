'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StudyNotes({ verseId, chapterId, verseNumber }) {
  const [notes, setNotes] = useState('');
  const [studyNotes, setStudyNotes] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedNotes = JSON.parse(localStorage.getItem('studyNotes') || '[]');
    setStudyNotes(savedNotes);
  }, []);

  const saveNote = () => {
    if (!notes.trim()) return;

    const newNote = {
      id: Date.now(),
      verseId,
      chapterId,
      verseNumber,
      notes: notes.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedNotes = [...studyNotes, newNote];
    setStudyNotes(updatedNotes);
    localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
    setNotes('');
  };

  const deleteNote = (index) => {
    const updatedNotes = studyNotes.filter((_, i) => i !== index);
    setStudyNotes(updatedNotes);
    localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
  };

  const currentVerseNotes = studyNotes.filter(
    note => note.verseId === verseId && note.chapterId === chapterId && note.verseNumber === verseNumber
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-orange-500 mr-2">📝</span>
        Study Notes
      </h3>

      {/* Add Note Form */}
      <div className="mb-6">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your thoughts, insights, or questions about this verse..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          rows="4"
        />
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-500">
            {isClient ? `Last updated: ${new Date().toLocaleDateString()}` : 'Loading...'}
          </span>
          <button
            onClick={saveNote}
            disabled={!notes.trim()}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save Note
          </button>
        </div>
      </div>

      {/* Display Notes */}
      {currentVerseNotes.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Study Notes Yet</h2>
          <p className="text-gray-600 mb-6">Start your spiritual journey by adding notes to verses.</p>
          <Link href="/chapters" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">
            Explore Chapters
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {currentVerseNotes.map((note, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Chapter {note.chapterId}, Verse {note.verseNumber}
                  </h3>
                  <p className="text-sm text-gray-600">Added on {isClient ? new Date(note.timestamp).toLocaleDateString() : 'Loading...'}</p>
                </div>
                <button
                  onClick={() => deleteNote(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  title="Delete note"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-50 rounded p-3 mb-3">
                <p className="text-sm text-gray-700 italic">&ldquo;{note.verseText}&rdquo;</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Your Notes:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{note.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 