# Lightbox Component

A responsive React lightbox component for displaying images with zoom, rotate, and navigation capabilities.

## Features

- Zoom in/out with buttons
- Rotate images clockwise/counter-clockwise
- Keyboard navigation (Escape to close)
- Mobile-friendly with touch gestures
- Single or multiple image galleries
- Double-click to zoom
- Image navigation (previous/next)

## Installation

```tsx
import Lightbox from "./components/LightBox/LightBox";
import type { ImageData } from "./components/LightBox/LightBox";
```

## Props

| Prop                  | Type                        | Default  | Description                                                          |
| --------------------- | --------------------------- | -------- | -------------------------------------------------------------------- |
| `images`              | `ImageData[]` \| `string[]` | Required | Array of image URLs or image objects with `url` and optional `title` |
| `imageIndex`          | `number`                    | `0`      | Initial image index to display                                       |
| `onClose`             | `(e?: MouseEvent) => void`  | Required | Callback function when lightbox closes                               |
| `onNavigateImage`     | `(index: number) => void`   | -        | Callback function when navigating between images                     |
| `isOnlyOneImage`      | `boolean`                   | `false`  | Force single image mode                                              |
| `title`               | `string`                    | -        | Title for single image mode                                          |
| `allowZoom`           | `boolean`                   | `true`   | Enable/disable zoom functionality                                    |
| `allowRotate`         | `boolean`                   | `true`   | Enable/disable rotation functionality                                |
| `showTitle`           | `boolean`                   | `true`   | Show/hide image title                                                |
| `zoomStep`            | `number`                    | `0.3`    | Zoom increment/decrement step                                        |
| `doubleClickZoom`     | `number`                    | `4`      | Zoom level on double-click                                           |
| `clickOutsideToExit`  | `boolean`                   | `true`   | Close lightbox when clicking outside the image                       |
| `keyboardInteraction` | `boolean`                   | `true`   | Enable keyboard shortcuts                                            |

## Usage

### Single Image

```tsx
import { useState } from "react";
import Lightbox from "./components/LightBox/LightBox";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>View Image</button>

      {isOpen && (
        <Lightbox
          images={["https://example.com/image.jpg"]}
          isOnlyOneImage={true}
          title="My Image"
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

### Multiple Images

```tsx
import { useState } from "react";
import Lightbox from "./components/LightBox/LightBox";

function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  return (
    <>
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          onClick={() => {
            setCurrentIndex(index);
            setIsOpen(true);
          }}
          style={{ width: 200, cursor: "pointer" }}
        />
      ))}

      {isOpen && (
        <Lightbox
          images={images}
          imageIndex={currentIndex}
          onClose={() => setIsOpen(false)}
          onNavigateImage={(index) => setCurrentIndex(index)}
        />
      )}
    </>
  );
}
```

### With Titles

```tsx
import { useState } from "react";
import Lightbox, { ImageData } from "./components/LightBox/LightBox";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const images: ImageData[] = [
    { url: "https://example.com/sunset.jpg", title: "Beautiful Sunset" },
    { url: "https://example.com/mountain.jpg", title: "Mountain View" },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Gallery</button>

      {isOpen && (
        <Lightbox
          images={images}
          imageIndex={0}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

## Controls

- **Escape key**: Close lightbox
- **Click outside image**: Close lightbox
- **Double-click image**: Zoom in
- **Drag**: Pan zoomed image

## Notes

- The component automatically filters out PDF files from navigation
- Reset button appears when image is zoomed, panned, or rotated
- Mobile controls shown on smaller screens
