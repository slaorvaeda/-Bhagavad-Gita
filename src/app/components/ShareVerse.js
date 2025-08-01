'use client';

import { useState } from 'react';

export default function ShareVerse({ verseNumber, sanskritText, translation, chapterId }) {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const shareData = {
    title: `Bhagavad Gita Verse ${verseNumber}`,
    text: `${translation}\n\nFrom Chapter ${chapterId} of the Bhagavad Gita`,
    url: `${window.location.origin}/chapter/${chapterId}#verse-${verseNumber}`
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setShowShareOptions(true);
      }
    } catch (error) {
      console.log('Error sharing:', error);
      setShowShareOptions(true);
    }
  };

  const handleSocialShare = (platform) => {
    let url = '';
    const encodedText = encodeURIComponent(`${translation}\n\nFrom Chapter ${chapterId} of the Bhagavad Gita`);
    const encodedUrl = encodeURIComponent(shareData.url);

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'email':
        url = `mailto:?subject=Bhagavad Gita Verse ${verseNumber}&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
    setShowShareOptions(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
      setShowShareOptions(false);
    } catch (error) {
      console.log('Error copying link:', error);
    }
  };

  const handleCopyVerse = async () => {
    const verseText = `Bhagavad Gita ${verseNumber}\n\nSanskrit:\n${sanskritText}\n\nTranslation:\n${translation}\n\nFrom Chapter ${chapterId}`;
    try {
      await navigator.clipboard.writeText(verseText);
      alert('Verse copied to clipboard!');
      setShowShareOptions(false);
    } catch (error) {
      console.log('Error copying verse:', error);
    }
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleNativeShare}
            className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            title="Share this verse"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          
          <div>
            <div className="text-sm font-semibold text-gray-800">
              Share This Verse
            </div>
            <div className="text-xs text-gray-600">
              Spread the wisdom of the Gita
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          <div>📤 Share Options</div>
          <div>Social Media</div>
        </div>
      </div>

      {showShareOptions && (
        <div className="mt-4 p-4 bg-white rounded border">
          <h5 className="text-sm font-semibold text-gray-800 mb-3">Choose sharing method:</h5>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            <button
              onClick={() => handleSocialShare('twitter')}
              className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              <span>🐦</span>
              <span>Twitter</span>
            </button>
            
            <button
              onClick={() => handleSocialShare('facebook')}
              className="flex items-center space-x-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              <span>📘</span>
              <span>Facebook</span>
            </button>
            
            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="flex items-center space-x-2 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </button>
            
            <button
              onClick={() => handleSocialShare('telegram')}
              className="flex items-center space-x-2 p-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors text-sm"
            >
              <span>📱</span>
              <span>Telegram</span>
            </button>
            
            <button
              onClick={() => handleSocialShare('email')}
              className="flex items-center space-x-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
            >
              <span>📧</span>
              <span>Email</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-2 p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
            >
              <span>🔗</span>
              <span>Copy Link</span>
            </button>
          </div>
          
          <div className="border-t pt-3">
            <button
              onClick={handleCopyVerse}
              className="w-full p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
            >
              📋 Copy Verse Text (Sanskrit + Translation)
            </button>
          </div>
          
          <button
            onClick={() => setShowShareOptions(false)}
            className="w-full mt-2 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-600">
        <p>🌟 <strong>Share the Wisdom:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Share with friends and family</li>
          <li>Post on social media platforms</li>
          <li>Send via messaging apps</li>
          <li>Copy for personal study</li>
        </ul>
      </div>
    </div>
  );
} 