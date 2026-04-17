# Feed Builder

A Next.js application for building product feeds by selecting and parsing elements from web pages.

## Features

- **Element Selection**: Visually select HTML elements on a webpage to define what data to extract
- **Web Parsing**: Uses Playwright to parse selected elements from target URLs
- **Feed Generation**: Builds XML product feeds from parsed data
- **Download Feed**: Download generated feeds as XML files

## Project Structure

- `src/app/page.tsx` - Main UI with element picker and controls
- `src/hooks/useElementPicker.ts` - Hook for selecting elements on the page
- `src/components/HighlightBox.tsx` - Visual feedback for selected elements
- `src/app/api/parse-playwright/route.ts` - API endpoint for parsing web pages with Playwright
- `src/app/api/feed/route.ts` - API endpoint for generating and downloading feeds
- `src/utils/builderFeed.ts` - Feed building logic
- `src/utils/validateFeed.ts` - Feed validation (currently commented out)
- `src/types/picker.ts` - TypeScript types for element selection

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## How to Use

1. Click "Выбрать элемент" (Select Element) to activate the element picker
2. Hover over elements on the page to see them highlighted
3. Click on elements to select them (container, title, price, image selectors)
4. Selected elements will appear in the "Выбранный элемент" (Selected Element) section
5. Click "Парсинг" (Parse) to extract data from the example URL
6. Click "Скачать фид" (Download Feed) to generate and download the XML feed

## API Endpoints

### Parse Web Page

```
POST /api/parse-playwright
```

Request body:
```json
{
  "url": "https://example.com",
  "selectors": {
    "container": ".product-item",
    "title": ".product-title",
    "price": ".product-price",
    "image": "img"
  }
}
```

Response: Array of parsed products with title, price, and image properties.

### Generate Feed

```
GET /api/feed
```

Returns: XML feed as a downloadable file.

## Technologies Used

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **Styling**: CSS Modules/Tailwind CSS
- **Web Parsing**: Playwright
- **XML Generation**: xmlbuilder2
- **State Management**: Custom React hooks

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## License

MIT