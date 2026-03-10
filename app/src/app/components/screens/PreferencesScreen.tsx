import React, { useState } from 'react';
import logoImg from '../../../assets/logo.png';
import type { UserPreferences } from '../../../lib/types';

interface PreferencesScreenProps {
  onComplete: (preferences: UserPreferences, name?: string) => void;
  initialPreferences?: UserPreferences;
  initialName?: string;
  isOnboarding?: boolean;
}

const styleOptions = [
  'Minimalist',
  'Streetwear',
  'Classic',
  'Bohemian',
  'Sporty',
  'Preppy',
  'Edgy',
  'Casual',
];

const colorOptions = ['Colorful', 'Earthy', 'Dark', 'Neutral', 'Bright'];

export function PreferencesScreen({
  onComplete,
  initialPreferences,
  initialName = '',
  isOnboarding = false,
}: PreferencesScreenProps) {
  const [name, setName] = useState<string>(initialName);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    initialPreferences?.styles || []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    initialPreferences?.colors || []
  );
  const [gender, setGender] = useState<'male' | 'female' | null>(
    initialPreferences?.gender || null
  );
  const [age, setAge] = useState<string>(
    initialPreferences?.age?.toString() || ''
  );

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const handleSubmit = () => {
    const preferences: UserPreferences = {
      styles: selectedStyles,
      colors: selectedColors,
      gender: gender,
      age: age ? parseInt(age) : null,
    };
    onComplete(preferences, name);
  };

  // For onboarding, name is required. For editing, it's optional
  const canSubmit = (isOnboarding ? name : true) && selectedStyles.length > 0 && selectedColors.length > 0 && gender && age;

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #1a1a1a 0%, #2c2318 60%, #3d2e1a 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <div className="px-8 pt-12 pb-6" style={{ textAlign: 'center' }}>
        <div style={{ width: 200, margin: '0 auto', marginBottom: 16 }}>
          <img
            src={logoImg}
            alt="Drobe"
            style={{
              width: '100%',
              filter: 'brightness(0) invert(1)',
              opacity: 0.95,
            }}
          />
        </div>
        <h2 style={{ color: '#C9A96E', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
          {isOnboarding ? 'Tell us about your style' : 'Edit Your Preferences'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
          Help us personalize your experience
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-8 pb-24">
        {/* Name */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#C9A96E', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: 15,
            }}
          />
        </div>

        {/* Gender */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#C9A96E', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>
            Gender
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setGender('male')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 12,
                border: `2px solid ${gender === 'male' ? '#C9A96E' : 'rgba(255,255,255,0.2)'}`,
                background: gender === 'male' ? 'rgba(201,169,110,0.15)' : 'rgba(255,255,255,0.05)',
                color: gender === 'male' ? '#C9A96E' : 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 12,
                border: `2px solid ${gender === 'female' ? '#C9A96E' : 'rgba(255,255,255,0.2)'}`,
                background: gender === 'female' ? 'rgba(201,169,110,0.15)' : 'rgba(255,255,255,0.05)',
                color: gender === 'female' ? '#C9A96E' : 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Female
            </button>
          </div>
        </div>

        {/* Age */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#C9A96E', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: 15,
            }}
          />
        </div>

        {/* Style Preferences */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#C9A96E', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>
            Style Preferences (select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {styleOptions.map((style) => (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: `2px solid ${selectedStyles.includes(style) ? '#C9A96E' : 'rgba(255,255,255,0.2)'}`,
                  background: selectedStyles.includes(style)
                    ? 'rgba(201,169,110,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  color: selectedStyles.includes(style) ? '#C9A96E' : 'rgba(255,255,255,0.7)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#C9A96E', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>
            Color Palettes (select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: `2px solid ${selectedColors.includes(color) ? '#C9A96E' : 'rgba(255,255,255,0.2)'}`,
                  background: selectedColors.includes(color)
                    ? 'rgba(201,169,110,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  color: selectedColors.includes(color) ? '#C9A96E' : 'rgba(255,255,255,0.7)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 12,
            background: canSubmit
              ? 'linear-gradient(135deg, #C9A96E, #e8c98a)'
              : 'rgba(255,255,255,0.1)',
            color: canSubmit ? '#1a1a1a' : 'rgba(255,255,255,0.4)',
            fontSize: 16,
            fontWeight: 600,
            border: 'none',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            opacity: canSubmit ? 1 : 0.5,
          }}
        >
          {isOnboarding ? 'Continue' : 'Save Preferences'}
        </button>

        {!isOnboarding && (
          <button
            onClick={() => onComplete(initialPreferences || {})}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: 12,
              borderRadius: 12,
              background: 'transparent',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
