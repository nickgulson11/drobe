# Drobe System Architecture

## Overview

Drobe is an AI-powered wardrobe management Progressive Web App. Users photograph their clothes, receive AI-powered categorization, and get personalized outfit recommendations based on occasion, weather, and personal style preferences.

## Architecture Diagram

![Drobe Architecture](./Docs/DrobeArchitectureDiagram.png)

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State**: React Context API
- **Type Safety**: TypeScript throughout

### Backend
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (email/password)
- **Storage**: Supabase Storage (wardrobe-photos bucket)
- **Serverless**: Supabase Edge Functions (Deno)

### AI Services
- **Claude Vision**: Image analysis and clothing categorization
- **Claude 3.5 Sonnet**: Outfit recommendations and styling advice

### External APIs
- **OpenWeatherMap**: Real-time weather data for outfit suggestions

## System Components

### 1. Client Layer

**Screens**:
- Authentication (Sign In/Sign Up)
- Preferences Onboarding (name, gender, age, style, colors)
- Wardrobe (Clothes & Outfits tabs)
- AI Stylist (outfit suggestions)
- Lookbook (curated inspiration)
- Profile (user preferences and stats)

**State Management**:
- `AuthContext` - User authentication and profile
- `WardrobeContext` - Wardrobe items CRUD
- `OutfitContext` - Saved outfits and favorites
- `WeatherContext` - Weather data (30-min cache)

**Client-Side Image Processing**:
- Resize to 800x800px (detail) + 300x300px (thumbnail)
- WebP conversion at 82% quality (<150KB target)
- Reduces bandwidth and storage costs by ~90%

### 2. Backend (Supabase)

**Database Tables**:
- `profiles` - User preferences (gender, age, style, colors)
- `wardrobe_items` - Clothing with AI metadata
- `outfits` - Saved outfit combinations
- Row Level Security (RLS) on all tables

**Storage**:
- Bucket: `wardrobe-photos`
- Structure: `{user_id}/{timestamp}-{filename}.webp`
- Stores both full-size (800x800) and thumbnails (300x300)

**Edge Functions** (Deno/TypeScript):
- `analyze-clothing` - Claude Vision API wrapper
- `suggest-outfits` - Claude text API wrapper
- `get-weather` - OpenWeatherMap proxy

### 3. AI Services

**Claude Vision** (clothing analysis):
- Extracts: category, subcategory, colors, formality, seasons, patterns
- Latency: ~2-4 seconds per image
- Cost: One-time per uploaded item

**Claude 3.5 Sonnet** (outfit recommendations):
- Input: occasion, weather, user preferences, wardrobe items
- Output: 2-3 outfits with names and reasoning
- Personalized by gender, age, style preferences, color palettes
- Latency: ~4-8 seconds per request

## Key Data Flows

### 1. Upload & Analyze Clothing
1. User uploads photo → Client resizes to 800x800 + 300x300 thumbnail (WebP)
2. Upload to Supabase Storage → Get image URLs
3. Create database record → Call `analyze-clothing` Edge Function
4. Edge Function → Claude Vision API → Returns metadata (category, colors, etc.)
5. Update database → Display analyzed item in UI

**Latency**: ~3-5 seconds

### 2. Generate Outfit Suggestions
1. User enters occasion (e.g., "job interview")
2. Fetch wardrobe items + weather data + user preferences
3. Call `suggest-outfits` Edge Function
4. Edge Function → Claude 3.5 Sonnet → Returns 2-3 outfit combinations
5. Display suggestions → User saves favorites to database

**Latency**: ~4-8 seconds

## Deployment

**Production Stack**:
- Frontend: Vercel ([drobe-eight.vercel.app](https://drobe-eight.vercel.app))
- Backend: Supabase Cloud
- Edge Functions: Supabase
- CDN: Automatic (Vercel + Supabase)

## Security

- **Row Level Security (RLS)** on all database tables
- **API keys** stored server-side in Edge Functions (never exposed to client)
- **Authentication** via Supabase Auth with JWT tokens
- **Image storage** with unguessable URLs

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| React + TypeScript | Type safety, PWA support, large ecosystem |
| Supabase | PostgreSQL flexibility, built-in RLS, auth, and storage |
| Claude Vision | Best-in-class multimodal AI for clothing analysis |
| Edge Functions | Hide API keys, server-side AI calls |
| Client-side image processing | Reduces bandwidth and storage costs by ~90% |
| Context API | Simpler than Redux for MVP scope |

---

**Last Updated**: March 13, 2025
