# Drobe - AI-Powered Wardrobe Assistant

> **Northwestern Kellogg MBAi 448 Final Project**
>
> **Project Team**: Nick Gulson, Shinjini Biswas, George Pantazis, Deepesh Khubchandani, Saahithi Budharaju, Tatsuya Fujii

An AI-powered Progressive Web App that helps you organize your wardrobe and receive personalized outfit recommendations using Claude Vision AI and weather-aware styling.

**Live Prototype**: [drobe-eight.vercel.app](https://drobe-eight.vercel.app) (Mobile-optimized)

---

## 📱 Product Overview

**Drobe** solves a common daily problem: "What should I wear today?"

By combining AI-powered clothing analysis with intelligent outfit recommendations, Drobe helps users:
- **Save time**: Get outfit suggestions in seconds instead of trying on multiple combinations
- **Discover new looks**: AI finds combinations you might not have considered
- **Dress appropriately**: Weather-aware suggestions ensure comfort and style
- **Organize efficiently**: Automatic categorization eliminates manual wardrobe tagging
- **Shop their closet**: Maximize existing wardrobe instead of buying new clothes

---

## 🎥 Demo Video

**[Link to Product Demo Video]** *(Upload your video to YouTube/Vimeo and add link here)*

*1-2 minute walkthrough showing:*
1. User requesting outfit suggestions for an occasion
2. AI generating personalized recommendations
3. User uploading a clothing photo
4. AI automatically categorizing the item
5. User views Look of the Day page

---

## 🏗️ System Architecture

![Drobe Architecture](./docs/DrobeArchitectureDiagram.png)

---

## 🤖 AI Model Card

We use **two AI models** in Drobe:

1. **Claude Vision** - Analyzes uploaded clothing photos
   - Categorizes items (tops, bottoms, shoes, etc.)
   - Extracts colors, formality, and seasonal data
   - Zero-shot learning (no fine-tuning required)

2. **Claude 3.5 Sonnet** - Generates outfit recommendations
   - Considers occasion, weather, and user preferences
   - Provides styling reasoning for each suggestion
   - Personalized to user's demographics and style

**Full Model Card**: See [MODEL_CARD.md](./MODEL_CARD.md) for detailed information on:
- Model specifications and intended use
- Training data and limitations
- Performance evaluation and metrics
- Bias considerations and ethical deployment

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Supabase account ([supabase.com](https://supabase.com))
- Anthropic API key ([console.anthropic.com](https://console.anthropic.com))
- OpenWeatherMap API key ([openweathermap.org](https://openweathermap.org/api))

### Quick Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd drobe/app
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase URL and anon key

# 3. Run the app
npm run dev
# Open http://localhost:5173
```

### Database & AI Setup
1. **Database**: Run SQL schema from `Docs/plans/2026-03-05-drobe-mvp-implementation.md` (lines 74-246) in Supabase SQL Editor
2. **Edge Functions**: Deploy 3 functions from `Docs/EDGE_FUNCTIONS_SETUP.md` to Supabase with API keys

See full setup details in `Docs/` folder.

---

## 📖 Usage Guide

### Uploading Clothing Items

1. **Navigate to Wardrobe** (hangar icon in bottom nav)
2. **Click "+ Add"** button in top right
3. **Choose photo method**:
   - "Take Photo" (uses device camera)
   - "Choose from Gallery" (selects from photos)
4. **Wait for AI analysis** (~3-5 seconds)
5. **Review categorization**:
   - Category (tops, bottoms, outerwear, shoes, accessories)
   - Subcategory (t-shirt, jeans, sneakers, etc.)
   - Colors
   - Formality level
   - Seasonal tags

**Tips for best results**:
- ✅ Good lighting (natural light preferred)
- ✅ Single item per photo
- ✅ Clear, unobstructed view
- ✅ Flat lay or hanging (not worn)
- ❌ Avoid multiple items in one photo
- ❌ Avoid extreme angles or blur

### Getting Outfit Suggestions

1. **Navigate to Style AI** (sparkles icon in bottom nav)
2. **Enter an occasion**:
   - Natural language: "What should I wear to a wedding?"
   - Or select Quick Occasion: "Job Interview", "Casual Brunch", etc.
3. **Review suggestions** (2-3 outfits generated)
   - Each shows item combinations with photos
   - AI reasoning explains why the outfit works
   - Weather badge shows current conditions
4. **Save favorites**: Click "Add to Outfits" button (star icon)

**Example occasions**:
- "Job interview at a tech startup"
- "Date night at a nice restaurant"
- "Casual brunch with friends"
- "Wedding in the summer"
- "Work presentation"
- "Coffee meeting"

### Managing Your Wardrobe

**Grid View** (default):
- 2-column masonry layout
- Thumbnail images
- Category and formality tags
- Tap item to see details

**List View**:
- Full-width rows
- Larger thumbnails
- More metadata visible
- Swipe to delete (future feature)

**Filtering**:
- Use category tabs: All | Tops | Bottoms | Outerwear | Shoes | Accessories
- Only shows items in selected category

**Item Details**:
- Tap any item to see full detail modal
- View all AI-generated metadata
- See which favorite outfits include this item
- Delete item from wardrobe

### Editing Preferences

1. **Navigate to Profile** (person icon in bottom nav)
2. **Click "Edit Preferences"**
3. **Update**:
   - Display name
   - Gender and age
   - Style preferences (multi-select)
   - Color palettes (multi-select)
4. **Save changes**
5. **AI suggestions will now reflect your updates**

---

## 🎯 Expected Outputs

### Clothing Upload
Upload a photo → AI analyzes and returns: category (tops, bottoms, shoes, etc.), colors, formality level (casual/smart casual/formal), seasonal tags, and style notes. Item appears in wardrobe grid with category badge and tags (~3-5 seconds).

### Outfit Suggestions
Enter occasion (e.g., "job interview") → AI generates 2-3 outfit combinations with:
- Creative outfit name
- Item combinations from your wardrobe
- Styling reasoning (why this works)
- Weather considerations
- Option to save to favorites (~4-8 seconds)

### Saved Outfits
View saved outfits in Wardrobe → Outfits tab. Each shows outfit name, 2x2 item grid, and occasion. Tap to see full details and AI reasoning.

---

