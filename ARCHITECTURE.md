# Drobe System Architecture

## Architecture Diagram

![Drobe Architecture](./docs/DrobeArchitectureDiagram.png)

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


## Key Data Flows

### 1. Upload & Analyze Clothing
1. User uploads photo → Client resizes to 800x800 + 300x300 thumbnail (WebP)
2. Upload to Supabase Storage → Get image URLs
3. Create database record → Call `analyze-clothing` Edge Function
4. Edge Function → Claude Vision API → Returns metadata (category, colors, etc.)
5. Update database → Display analyzed item in UI

### 2. Generate Outfit Suggestions
1. User enters occasion (e.g., "job interview")
2. Fetch wardrobe items + weather data + user preferences
3. Call `suggest-outfits` Edge Function
4. Edge Function → Claude 3.5 Sonnet → Returns 2-3 outfit combinations
5. Display suggestions → User saves favorites to database

## Deployment

**Production Stack**:
- Frontend: Vercel ([drobe-eight.vercel.app](https://drobe-eight.vercel.app))
- Backend: Supabase Cloud
- Edge Functions: Supabase
- CDN: Automatic (Vercel + Supabase)


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
