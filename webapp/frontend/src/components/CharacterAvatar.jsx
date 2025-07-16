import React, { useState, useRef } from 'react';
import './CharacterAvatar.css';

const CharacterAvatar = ({ character, onAvatarChange, size = 'medium', showUpload = true }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(character?.avatar_url || null);
  const fileInputRef = useRef(null);

  // Generate a unique placeholder based on character name and class
  const generatePlaceholder = () => {
    if (!character) return { emoji: '👤', color: '#95a5a6' };

    const name = character.name || 'Unknown';
    const primaryClass = character.classes?.primary || 'Unknown';
    
    // Class-based emojis and colors
    const classData = {
      'ARCANIST': { emoji: '🧙‍♂️', color: '#9b59b6' },
      'CHIMERIST': { emoji: '🐺', color: '#e67e22' },
      'DARKBLADE': { emoji: '🗡️', color: '#2c3e50' },
      'ELEMENTALIST': { emoji: '🔥', color: '#e74c3c' },
      'ENTROPIST': { emoji: '🎲', color: '#f39c12' },
      'FURY': { emoji: '💪', color: '#c0392b' },
      'GUARDIAN': { emoji: '🛡️', color: '#3498db' },
      'LOREMASTER': { emoji: '📚', color: '#8e44ad' },
      'ORATOR': { emoji: '🎭', color: '#16a085' },
      'ROGUE': { emoji: '🥷', color: '#34495e' },
      'SHARPSHOOTER': { emoji: '🏹', color: '#27ae60' },
      'SPIRITIST': { emoji: '👻', color: '#9b59b6' },
      'TINKERER': { emoji: '🔧', color: '#e67e22' },
      'WAYFARER': { emoji: '🗺️', color: '#2ecc71' },
      'WEAPONMASTER': { emoji: '⚔️', color: '#e74c3c' }
    };

    return classData[primaryClass] || { emoji: '👤', color: '#95a5a6' };
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, GIF, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setPreviewUrl(imageUrl);
      
      // Convert to blob URL for consistent handling
      fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          
          if (onAvatarChange) {
            onAvatarChange({
              file: file,
              url: blobUrl,
              originalUrl: imageUrl
            });
          }
          
          setIsUploading(false);
        })
        .catch(error => {
          console.error('Error processing image:', error);
          setIsUploading(false);
        });
    };

    reader.onerror = () => {
      alert('Error reading file');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setPreviewUrl(null);
    if (onAvatarChange) {
      onAvatarChange(null);
    }
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const placeholder = generatePlaceholder();
  const hasCustomAvatar = previewUrl && previewUrl !== placeholder.emoji;

  return (
    <div className={`character-avatar ${size}`}>
      <div 
        className="avatar-container"
        style={{ backgroundColor: hasCustomAvatar ? 'transparent' : placeholder.color }}
      >
        {hasCustomAvatar ? (
          <img 
            src={previewUrl} 
            alt={character?.name || 'Character'} 
            className="avatar-image"
            onError={() => {
              console.warn('Failed to load avatar image');
              setPreviewUrl(null);
            }}
          />
        ) : (
          <div className="avatar-placeholder">
            <span className="placeholder-emoji">{placeholder.emoji}</span>
            <span className="placeholder-initial">
              {character?.name?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        )}
        
        {isUploading && (
          <div className="upload-overlay">
            <div className="upload-spinner"></div>
          </div>
        )}
      </div>

      {showUpload && (
        <div className="avatar-controls">
          <button 
            className="upload-btn"
            onClick={handleUploadClick}
            disabled={isUploading}
            title="Upload avatar image"
          >
            📁 Upload
          </button>
          
          {hasCustomAvatar && (
            <button 
              className="remove-btn"
              onClick={handleRemoveAvatar}
              title="Remove avatar"
            >
              🗑️
            </button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      )}

      <div className="avatar-info">
        <div className="character-name">{character?.name || 'Unnamed Character'}</div>
        <div className="character-class">
          {character?.classes?.primary || 'No Class'}
          {character?.level && ` (Lv.${character.level})`}
        </div>
      </div>
    </div>
  );
};

export default CharacterAvatar;