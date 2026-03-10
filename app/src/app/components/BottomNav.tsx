import React from "react";
import { useViewportOffset } from "../../hooks/useViewportOffset";

interface BottomNavProps {
  active: string;
  onNavigate: (screen: string) => void;
}

const navItems = [
  {
    id: "ai",
    label: "Style AI",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" fill={active ? "#C9A96E" : "none"} stroke={active ? "#C9A96E" : "#C4B8AA"} strokeWidth="1.5" />
        <path d="M11 7L12.2 10H15.5L12.8 11.9L13.8 15L11 13.1L8.2 15L9.2 11.9L6.5 10H9.8L11 7Z" fill={active ? "#1A1A1A" : "#C4B8AA"} />
      </svg>
    ),
    special: true,
  },
  {
    id: "wardrobe",
    label: "Wardrobe",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="15" rx="2" stroke={active ? "#1A1A1A" : "#C4B8AA"} strokeWidth="1.5" fill={active ? "#1A1A1A" : "none"} />
        <path d="M11 4V19" stroke={active ? "#fff" : "#C4B8AA"} strokeWidth="1.5" />
        <circle cx="7.5" cy="11.5" r="1" fill={active ? "#fff" : "#C4B8AA"} />
        <circle cx="14.5" cy="11.5" r="1" fill={active ? "#C9A96E" : "#C4B8AA"} />
      </svg>
    ),
  },
  {
    id: "lookbook",
    label: "Lookbook",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="2" width="16" height="18" rx="1.5" stroke={active ? "#1A1A1A" : "#C4B8AA"} strokeWidth="1.5" fill="none" />
        <rect x="6" y="5" width="10" height="6" rx="0.5" fill={active ? "#C9A96E" : "#C4B8AA"} />
        <line x1="6" y1="13" x2="16" y2="13" stroke={active ? "#1A1A1A" : "#C4B8AA"} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="6" y1="15.5" x2="13" y2="15.5" stroke={active ? "#1A1A1A" : "#C4B8AA"} strokeWidth="1" strokeLinecap="round" />
        <line x1="6" y1="17.5" x2="14" y2="17.5" stroke={active ? "#1A1A1A" : "#C4B8AA"} strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" fill={active ? "#1A1A1A" : "none"} stroke={active ? "#1A1A1A" : "#C4B8AA"} strokeWidth="1.5" />
        <path d="M4 19C4 15.7 7.1 13 11 13C14.9 13 18 15.7 18 19" stroke={active ? "#1A1A1A" : "#C4B8AA"} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const bottomOffset = useViewportOffset();

  return (
    <div
      className="absolute left-0 right-0 flex items-center justify-around"
      style={{
        bottom: `${bottomOffset}px`,
        background: "rgba(247,245,242,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid #E8E3DC",
        padding: "10px 8px 24px",
        zIndex: 40,
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className="flex flex-col items-center gap-1"
          style={{ flex: 1, opacity: 1 }}
        >
          {item.icon(active === item.id)}
          <span
            style={{
              fontSize: 10,
              fontWeight: active === item.id ? 600 : 400,
              color: active === item.id ? (item.special ? "#C9A96E" : "#1A1A1A") : "#C4B8AA",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.2px",
            }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
