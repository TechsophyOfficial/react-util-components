# ⚛️ React Util Components

A collection of reusable, production-ready React components built with TypeScript. This library includes essential UI components with beautiful designs, smooth animations, and full customization options.

## 🚀 Features

- **TypeScript Support** - Fully typed components with comprehensive type definitions
- **Zero Dependencies** - Lightweight components with minimal external dependencies
- **Responsive Design** - Mobile-first approach with full responsive support
- **Dark Mode Support** - Built-in dark mode variants where applicable
- **Customizable** - Extensive props for customization
- **Modern Stack** - Built with React 18, TypeScript, and Vite

## 📦 Components

### ✨ Shimmer Component

A lightweight shimmer loading placeholder component perfect for skeleton screens.

**Features:**

- Smooth shimmer animation effect
- Fully responsive and customizable dimensions
- Dark mode support
- Flexible border radius
- Multiple layout support (cards, text lines, avatars)

**Usage:**

```tsx
import Shimmer from "./components/Shimmer/Shimmer";

<Shimmer height="200px" width="300px" borderRadius="12px" darkMode={false} />;
```

**Props:**

- `height` (number | string) - Height of the shimmer element
- `width` (number | string) - Width of the shimmer element
- `borderRadius` (number | string) - Border radius
- `darkMode` (boolean, optional) - Enable dark mode variant

---

### 🖼️ Lightbox Component

A responsive lightbox component for displaying images with advanced interaction features.

**Features:**

- Zoom in/out with buttons or double-click
- Rotate images clockwise/counter-clockwise
- Keyboard navigation (Escape, Arrow keys)
- Touch gesture support for mobile
- Single or multiple image galleries
- Image preloading and smooth transitions

**Usage:**

```tsx
import Lightbox from "./components/LightBox/LightBox";

const [isOpen, setIsOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);

const images = ["image1.jpg", "image2.jpg"];

{
  isOpen && (
    <Lightbox
      images={images}
      imageIndex={currentIndex}
      onClose={() => setIsOpen(false)}
      onNavigateImage={(index) => setCurrentIndex(index)}
    />
  );
}
```

**Props:**

- `images` (ImageData[] | string[]) - Array of image URLs or objects
- `imageIndex` (number, optional) - Initial image index
- `onClose` (function) - Callback when lightbox closes
- `onNavigateImage` (function, optional) - Callback when navigating images
- `allowZoom` (boolean, optional) - Enable zoom functionality
- `allowRotate` (boolean, optional) - Enable rotation
- `showTitle` (boolean, optional) - Show image title
- `zoomStep` (number, optional) - Zoom increment step
- `doubleClickZoom` (number, optional) - Zoom level on double-click
- `clickOutsideToExit` (boolean, optional) - Close on outside click
- `keyboardInteraction` (boolean, optional) - Enable keyboard shortcuts

---

### 📝 Rich Text Editor Component

A WYSIWYG text editor with comprehensive formatting tools and real-time HTML output.

**Features:**

- Rich text formatting (bold, italic, underline, strikethrough)
- Multiple font families and sizes
- Text alignment (left, center, right, justify)
- Ordered and unordered lists
- Dark mode toggle
- Real-time HTML content updates
- Sanitized HTML output

**Usage:**

```tsx
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import RenderHtmlView from "./components/RichTextEditor/RenderHtmlView";

const [htmlContent, setHtmlContent] = useState<string>("");

<RichTextEditor
  setHtmlContent={setHtmlContent}
  initialContent={htmlContent}
/>

<RenderHtmlView htmlContent={htmlContent} />
```

**Props (RichTextEditor):**

- `setHtmlContent` (function) - Callback that receives HTML content
- `initialContent` (string) - Initial HTML content

**Props (RenderHtmlView):**

- `htmlContent` (string) - HTML string to render (sanitized with DOMPurify)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Clone the Repository

```bash
git clone <repository-url>
cd react-util-components
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📚 Documentation

The project includes an interactive documentation UI accessible at the root route. Run the development server and navigate to `http://localhost:5173` to:

- View live demos of all components
- Test component functionality
- Copy code examples
- See all available props and features

## 🏗️ Project Structure

```
src/
├── components/
│   ├── LightBox/
│   │   ├── LightBox.tsx
│   │   ├── style.css
│   │   └── README.md
│   ├── RichTextEditor/
│   │   ├── RichTextEditor.tsx
│   │   ├── RenderHtmlView.tsx
│   │   ├── RichTextEditor.css
│   │   └── README.md
│   └── Shimmer/
│       ├── Shimmer.tsx
│       ├── Shimmer.css
│       └── README.md
├── App.tsx          # Documentation UI
├── styles.css       # Global styles
└── main.tsx         # Entry point
```

## 🎨 Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **CSS3** - Modern styling with animations
- **ESLint** - Code quality and consistency

## 📖 Component Documentation

Each component includes detailed documentation in its respective folder:

- `/src/components/Shimmer/README.md`
- `/src/components/LightBox/README.md`
- `/src/components/RichTextEditor/README.md`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔧 Development

This project uses:

- **Vite** for fast development and optimized builds
- **TypeScript** for type safety
- **ESLint** for code quality
- **React 18** with modern hooks patterns

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Notes

- All components are fully responsive and mobile-friendly
- Components are isolated and can be used independently
- TypeScript definitions included for all components
- CSS is modular and scoped to each component

---

Built with ❤️ using React + TypeScript + Vite
