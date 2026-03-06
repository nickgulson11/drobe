import React from "react";
import logoImg from "../../../assets/logo.png";
import { useAuth } from "../../../contexts/AuthContext";
import { useWardrobe } from "../../../contexts/WardrobeContext";
import { useOutfits } from "../../../contexts/OutfitContext";

const stylePrefs = ["Minimal", "Smart Casual", "Neutral Tones", "Structured", "Relaxed Fit"];

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
  const { user, profile } = useAuth();
  const { items } = useWardrobe();
  const { outfits } = useOutfits();

  // Calculate real stats
  const itemCount = items.length;
  const outfitCount = outfits.length;
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
    { label: "Outfits", value: outfitCount.toString() },
    { label: "Saved", value: savedCount.toString() },
  ];
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: "#F7F5F2", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div style={{ height: 44 }} />

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 100 }}>
        {/* Header */}
        <div className="px-6 py-3">
          <img src={logoImg} alt="Drobe" style={{ height: 58, width: "auto", marginBottom: 16 }} />

          {/* Profile info section */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
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

              {/* Name and date */}
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A", fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>
                  {displayName}
                </h1>
                <p style={{ fontSize: 13, color: "#A0917E", fontWeight: 400 }}>
                  Member since {getMemberSince()}
                </p>
              </div>
            </div>

            {/* Edit button */}
            <button
              style={{
                background: "#fff",
                border: "1px solid #E8E3DC",
                borderRadius: 12,
                padding: "8px 16px",
                color: "#1A1A1A",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Edit
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 16,
                  padding: "20px 12px",
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
        <div className="mx-5 mt-4" style={{ background: "#fff", borderRadius: 20, padding: "18px 16px" }}>
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>Style Profile</p>
            <span style={{ fontSize: 11, color: "#C9A96E", fontWeight: 600 }}>Edit preferences</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {stylePrefs.map((pref) => (
              <span
                key={pref}
                style={{
                  background: "#F7F5F2",
                  borderRadius: 100,
                  padding: "6px 14px",
                  fontSize: 12,
                  color: "#6B5E4E",
                  border: "1px solid #E8E3DC",
                }}
              >
                {pref}
              </span>
            ))}
            <span
              style={{
                background: "#1A1A1A",
                borderRadius: 100,
                padding: "6px 14px",
                fontSize: 12,
                color: "#C9A96E",
              }}
            >
              + Add
            </span>
          </div>
        </div>

        {/* Wardrobe activity */}
        <div className="mx-5 mt-4" style={{ background: "#fff", borderRadius: 20, padding: "18px 16px" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>Wear Activity</p>
            <span style={{ fontSize: 11, color: "#A0917E" }}>This week</span>
          </div>
          <div className="flex items-end justify-between gap-1" style={{ height: 80 }}>
            {activityData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  style={{
                    width: "100%",
                    height: `${d.height}%`,
                    background: d.height === 100 ? "linear-gradient(180deg, #C9A96E, #a07840)" : "#F0EDE8",
                    borderRadius: 6,
                    transition: "all 0.3s",
                  }}
                />
                <p style={{ fontSize: 10, color: "#A0917E" }}>{d.day}</p>
              </div>
            ))}
          </div>
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