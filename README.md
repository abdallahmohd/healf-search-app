# Product Search App – Technical Assessment

A React Native (Expo + TypeScript) implementation for a performant, scalable, and user-focused product search experience, designed to handle a dataset of 6,000 products. The goal was to demonstrate practical architectural decisions, snappy UX, and code that’s ready for further feature expansion.

## 🚀 Live Demo (Expo Go)

You can preview the latest version of this app instantly in Expo Go:

- **Scan the QR code or open on your device:**  
  [Expo Preview QR Page](https://expo.dev/preview/update?message=update%20readme&updateRuntimeVersion=1.0.0&createdAt=2025-07-02T20%3A42%3A04.775Z&slug=exp&projectId=e9d2fe4d-98c0-40d8-8173-f0bb0d65ef8f&group=2e6b8be1-ed06-4eaa-9e78-a4a540bad241)  
  Open this link on your mobile device, or scan the QR code displayed on the page using [Expo Go](https://expo.dev/client).

- **Direct mobile deep link:**  
  [Open directly in Expo Go](exp+://expo-development-client/?url=https://u.expo.dev/e9d2fe4d-98c0-40d8-8173-f0bb0d65ef8f/group/2e6b8be1-ed06-4eaa-9e78-a4a540bad241)  
  _(Tap this if you’re on your device and have Expo Go installed.)_

> **Note:**  
> When previewing the app in Expo Go, the standard Expo icon will display instead of the custom app icon. The custom icon appears only in standalone or development builds.


## Tech Stack

- React Native + Expo
- TypeScript
- Zustand for global state management and selectors
- React Native Paper for modern UI components
- FlashList for performant grid rendering

## Installation & Running the App

To get this application up and running on your local machine and test it on a device or emulator, follow these steps:

### Clone this repository

First, get a copy of the project files by cloning the repository to your local machine:

```bash
git clone https://github.com/abdallahmohd/healf-search-app.git
cd healf-search-app
```

### Install dependencies

Navigate into the cloned project directory and install all the necessary project dependencies using either npm or yarn:

```bash
npm install
# or
yarn install
```

### Start the Expo Development Server (Metro Bundler)

Once dependencies are installed, start the Expo development server. This will open a new browser tab with the Metro Bundler, which compiles and serves your application.

```bash
npx expo start
# or, with yarn:
yarn expo start
```

### Install Expo Go on your Mobile Device

To run the app on your physical mobile device, download and install the Expo Go app from your device's app store.

### Open on Device or Emulator via QR Code

After the Expo development server starts, you will see a QR code displayed in your terminal.

- **On a physical device:** Open the Expo Go app on your phone and use its built-in QR code scanner to scan the QR code displayed by the Metro Bundler. The app will then automatically load on your device.
- **On an iOS/Android emulator:** You can typically select the option to "Run on iOS simulator" or "Run on Android emulator" from the Metro Bundler's web interface or directly in your terminal, and Expo will launch the app in an installed emulator.

No additional environment setup required. The product data is pre-converted to JSON and loads instantly, so you don't need to configure any databases or external services.

## Folder Structure

- Feature-based: `/components`, `/screens`, `/store`, `/utils`
- Co-located styles/types for each component
- Hooks abstract business logic per feature (component/screen)
- Inspired by Bulletproof React for modularity without overengineering

## Data Loading & Indexing

- CSV-to-JSON conversion done offline.
    - CSV parse: ~55s for 6,000 rows
    - JSON load: ~0.002s (instant hydration)
- `buildIndex` parses product metadata, cleans tags/SEO fields, and builds an inverted index (`term → Set<productID>`). This index supports lightning-fast term lookups and relevance scoring.

## Search, Ranking & Filtering

- Two-phase search logic:
    1. **Phase 1:** Inverted index lookup (O(1) per term, fast set intersections) across key fields—title, vendor, tags, SEO. Results are immediately ranked by relevance, ensuring that the most likely matches appear first. Tags are filtered by usability and relevance.
    2. **Phase 2:** Linear scan (O(n)) over products not already found in Phase 1, searching description snippets and supporting partial matches. This ensures recall for long-tail/partial queries, while keeping linear work to a minimum.
- **Performance note:**
    - With this approach, the majority of queries are satisfied in the first phase, so even on large datasets, users see relevant results instantly.
    - Phase 2 happens on a smaller subset (products not matched in Phase 1), further optimizing performance.
- **Relevance:**
    - Title matches are prioritized, then vendor, tags, SEO.
    - Results from Phase 1 appear first; Phase 2 results follow.
- **Scalability/Lazy Loading:**
    - In very large datasets, we could run Phase 1 immediately (showing instant, highly relevant matches), and stream in Phase 2 results as they arrive—true lazy loading of search results for optimal perceived performance.
- **Pagination:**
    - Pagination is handled in the UI using FlashList (client-side).
    - In a production app, this would likely be replaced by server-side pagination (API requests) for maximum scalability and efficiency.
- **Filtering:**
    - Top “category” and “goal” tags (parsed from messy tag data) are surfaced as filter chips above the product grid.
- **Sorting:**
    - Sort by title, price (min), and date (newest/oldest).
- **Badges & Tag Logic:**
    - Products with the “new” tag get a badge.
    - Any with the “hidden” tag are excluded from all views.
- **Missing Images:**
    - Missing images are replaced with a fallback branded image.
    - App icon branded with the healf logo.

## UI/UX

- Modern, clean design: Emphasizes product visibility with taller, more immersive cards in a two-column grid.
- Persistent search bar: Always accessible at the top.
- Smooth infinite scroll with a loading spinner on pagination.
- Clear “No results” messaging with image.
- Quick filter chips (category/goal) just above the results.
- Scroll-to-top button appears on scroll.

## Key Architectural Decisions

- I've implemented custom search logic for the exercise - in a real world environment we'd use server-side logic, ideally integrated with solid third party software.
- JSON chosen over CSV for instant app start-up and parsing.
- Inverted index enables O(1) term → product lookups.
- Two-phase search maximizes both performance and relevance.
- Lazy loading and client-side pagination decouple search logic from rendering, supporting large data sets and instant UX.

## Next Steps - If I had more time, or for extending this software:

- Unit tests for all search/filter helpers
- Enhanced autosuggestions (currently basic)
- Star ratings - currently present in the METADATA property
- Variants - to be visible on the card as a range
- Out-of-stock badges
- Replace custom search with a mature library in production
- Skeleton loaders & richer error states
- Move all constants to a single config
- More robust error handling for incomplete/malformed product data

## Summary

This project demonstrates a scalable, high-performance search architecture—prioritizing instant results, robust filtering/sorting, and a modern, visually appealing UI. Two-phase search ensures both speed and comprehensive results, and the architecture can scale effortlessly with lazy loading and server-side pagination.
