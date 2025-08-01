'use client';

import { useState, useEffect } from 'react';

export default function StudyNotes({ verseId, chapterId, verseNumber }) {
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [savedNotes, setSavedNotes] = useState('');

  useEffect(() => {
    // Load saved notes from localStorage
    const saved = localStorage.getItem(`gita-notes-${verseId}`);
    if (saved) {
      setSavedNotes(saved);
      setNotes(saved);
    }
  }, [verseId]);

  const handleSave = () => {
    localStorage.setItem(`gita-notes-${verseId}`, notes);
    setSavedNotes(notes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotes(savedNotes);
    setIsEditing(false);
  };

  const handleDelete = () => {
    localStorage.removeItem(`gita-notes-${verseId}`);
    setNotes('');
    setSavedNotes('');
    setIsEditing(false);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center">
          📝 Study Notes
          <span className="text-sm font-normal text-gray-600 ml-2">
            Verse {verseNumber}
          </span>
        </h4>
        
        <div className="flex space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {savedNotes ? 'Edit' : 'Add Notes'}
              </button>
              {savedNotes && (
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your personal insights, questions, or reflections about this verse..."
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
          <div className="mt-2 text-xs text-gray-600">
            💡 <strong>Tips:</strong> Write about what this verse means to you, questions you have, or how you can apply it in your life.
          </div>
        </div>
      ) : savedNotes ? (
        <div className="bg-white p-3 rounded border">
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {savedNotes}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <div className="text-2xl mb-2">📝</div>
          <p className="text-sm">No notes yet. Click "Add Notes" to start your study.</p>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-600">
        <p>🎯 <strong>Study Suggestions:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>What does this verse teach about dharma (duty)?</li>
          <li>How can you apply this wisdom in daily life?</li>
          <li>What questions does this verse raise for you?</li>
          <li>How does this relate to other verses you've studied?</li>
        </ul>
      </div>
    </div>
  );
} 