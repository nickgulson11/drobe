import React, { useState } from "react";
import logoImg from "../../../assets/logo.png";
import { useAuth } from "../../../contexts/AuthContext";
import { useWardrobe } from "../../../contexts/WardrobeContext";
import { useOutfits } from "../../../contexts/OutfitContext";
import { useViewportOffset } from "../../../hooks/useViewportOffset";
import { PreferencesScreen } from "./PreferencesScreen";
import type { UserPreferences } from "../../../lib/types";

const activityData = [
  { day: "M", height: 60 },
  { day: "T", height: 90 },
  { day: "W", height: 45 },
  { day: "T", height: 100 },
  { day: "F", height: 70 },
  { day: "S", height: 30 },
  { day: "S", height: 55 },
];

export function ProfileScreen() {
  const { user, profile, updateProfile } = useAuth();
  const { items } = useWardrobe();
  const { outfits } = useOutfits();
  const bottomOffset = useViewportOffset();
  const [showPreferences, setShowPreferences] = useState(false);

  const handlePreferencesComplete = async (preferences: UserPreferences, name?: string) => {
    const updates: any = { style_preferences: preferences };
    if (name) {
      updates.display_name = name;
    }
    await updateProfile(updates);
    setShowPreferences(false);
  };

  // Calculate real stats
  const itemCount = items.length;
  const savedCount = outfits.filter(o => o.is_favorite).length;

  // Get user initials for avatar
  const getInitials = (name?: string | null) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || "U";
    return name.split(" ").map(n => n.charAt(0)).join("").toUpperCase().slice(0, 2);
  };

  // Get display name
  const displayName = profile?.display_name || user?.email || "User";

  // Get member since date
  const getMemberSince = () => {
    if (profile?.created_at) {
      const date = new Date(profile.created_at);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return "Recently";
  };

  const stats = [
    { label: "Items", value: itemCount.toString() },
    { label: "Outfits", value: savedCount.toString() },
  ];

  // Get user preferences
  const userPreferences = profile?.style_preferences as UserPreferences || {};
  const stylePrefs = userPreferences.styles || [];

  // Handle colors being either string (old format) or array (new format)
  const colorPrefs = Array.isArray(userPreferences.colors)
    ? userPreferences.colors
    : userPreferences.colors
      ? [userPreferences.colors]
      : [];

  // If showing preferences modal
  if (showPreferences) {
    return (
      <PreferencesScreen
        onComplete={handlePreferencesComplete}
        initialPreferences={userPreferences}
        initialName={profile?.display_name || ''}
        isOnboarding={false}
      />
    );
  }

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: "#F7F5F2", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div style={{ height: 16 }} />

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: bottomOffset + 100 }}>
        {/* Header */}
        <div className="px-6 py-3">
          <img src={logoImg} alt="Drobe" style={{ height: 58, width: "auto", marginBottom: 16 }} />

          {/* Profile info section */}
          <div className="flex items-center gap-4 mb-5">
            {/* Avatar */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #C9A96E, #a07840)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "#fff", fontSize: 24, fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>
                {getInitials(profile?.display_name)}
              </span>
            </div>

            {/* Name and info */}
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", fontFamily: "'Playfair Display', serif", marginBottom: 2 }}>
                {displayName}
              </h1>
              <p style={{ fontSize: 12, color: "#A0917E", fontWeight: 400, marginBottom: 4 }}>
                {user?.email}
              </p>
              {(userPreferences.gender || userPreferences.age) && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {userPreferences.gender && (
                    <span style={{ fontSize: 11, color: "#6B5E4E", fontWeight: 500 }}>
                      {userPreferences.gender.charAt(0).toUpperCase() + userPreferences.gender.slice(1)}
                    </span>
                  )}
                  {userPreferences.age && (
                    <>
                      {userPreferences.gender && <span style={{ fontSize: 11, color: "#C4B8AA" }}>•</span>}
                      <span style={{ fontSize: 11, color: "#6B5E4E", fontWeight: 500 }}>
                        Age {userPreferences.age}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats cards */}
          <div className="flex gap-3 justify-center">
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 16,
                  padding: "20px 40px",
                  border: "1px solid #E8E3DC"
                }}
              >
                <p style={{ color: "#C9A96E", fontSize: 28, fontWeight: 600, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>
                  {s.value}
                </p>
                <p style={{ color: "#A0917E", fontSize: 12, fontWeight: 500 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Style Profile */}
        <div className="mx-5 mt-4" style={{ background: "#fff", borderRadius: 20, padding: "20px 18px" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>Style Profile</h2>
            <button
              onClick={() => setShowPreferences(true)}
              style={{
                fontSize: 12,
                color: "#C9A96E",
                fontWeight: 600,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
              }}
            >
              Edit
            </button>
          </div>

          {/* Style Preferences */}
          <div style={{ marginBottom: colorPrefs.length > 0 ? 16 : 0 }}>
            <p style={{ fontSize: 10, color: "#A0917E", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Style
            </p>
            <div className="flex flex-wrap gap-2">
              {stylePrefs.length > 0 ? (
                stylePrefs.map((pref) => (
                  <span
                    key={pref}
                    style={{
                      background: "#F7F5F2",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 12,
                      color: "#6B5E4E",
                      fontWeight: 500,
                    }}
                  >
                    {pref}
                  </span>
                ))
              ) : (
                <p style={{ fontSize: 13, color: "#A0917E", fontStyle: "italic" }}>
                  Not set
                </p>
              )}
            </div>
          </div>

          {/* Color Palettes */}
          {colorPrefs.length > 0 && (
            <div>
              <p style={{ fontSize: 10, color: "#A0917E", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Color Palettes
              </p>
              <div className="flex flex-wrap gap-2">
                {colorPrefs.map((color) => (
                  <span
                    key={color}
                    style={{
                      background: "linear-gradient(135deg, #FFF9ED, #FFF5E1)",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 12,
                      color: "#8B7355",
                      fontWeight: 500,
                      display: "inline-block",
                    }}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="mx-5 mt-4 mb-4" style={{ background: "#fff", borderRadius: 20, overflow: "hidden" }}>
          {[
            { icon: "🔔", label: "Notifications", sub: "Daily outfit reminders" },
            { icon: "🔒", label: "Privacy", sub: "Data & account settings" },
            { icon: "💳", label: "Subscription", sub: "Drobe Pro · Active" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: i < 2 ? "1px solid #F7F5F2" : "none" }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div className="flex-1">
                <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>{item.label}</p>
                <p style={{ fontSize: 11, color: "#A0917E", marginTop: 1 }}>{item.sub}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="#C4B8AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}