# RichTextEditor Component

A WYSIWYG text editor component for React with formatting tools and dark mode support.

## Features

- Rich text formatting (bold, italic, underline, strikethrough)
- Multiple font families and sizes
- Text alignment and lists
- Dark mode toggle
- Real-time HTML content updates

## Installation

```tsx
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import RenderHtmlView from "./components/RichTextEditor/RenderHtmlView";
```

## Props

### RichTextEditor

| Prop             | Type                        | Required | Description                                                          |
| ---------------- | --------------------------- | -------- | -------------------------------------------------------------------- |
| `setHtmlContent` | `(content: string) => void` | Yes      | Callback function that receives the HTML content whenever it changes |
| `initialContent` | `string`                    | Yes      | Initial HTML content to display in the editor                        |

### RenderHtmlView

| Prop          | Type     | Required | Description                                       |
| ------------- | -------- | -------- | ------------------------------------------------- |
| `htmlContent` | `string` | Yes      | HTML string to render (sanitized using DOMPurify) |

## Usage

### Basic Example

```tsx
import { useState } from "react";
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";

function App() {
  const [htmlContent, setHtmlContent] = useState<string>("");

  return (
    <div style={{ height: "600px" }}>
      <RichTextEditor
        setHtmlContent={setHtmlContent}
        initialContent={htmlContent}
      />
    </div>
  );
}
```

### With Preview

```tsx
import { useState } from "react";
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import RenderHtmlView from "./components/RichTextEditor/RenderHtmlView";

function App() {
  const [htmlContent, setHtmlContent] = useState<string>("");

  return (
    <div style={{ display: "flex", gap: "20px", height: "600px" }}>
      <div style={{ flex: 1 }}>
        <RichTextEditor
          setHtmlContent={setHtmlContent}
          initialContent={htmlContent}
        />
      </div>
      <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc" }}>
        <RenderHtmlView htmlContent={htmlContent} />
      </div>
    </div>
  );
}
```

## Toolbar Features

- **Text Formatting**: Bold, Italic, Underline, Strikethrough
- **Font Options**: 10 font families, 8 sizes
- **Alignment**: Left, Center, Right, Justify
- **Lists**: Bullet, Numbered, Alphabetic
- **Indentation**: Indent/Outdent
- **Dark Mode**: Toggle theme

## Notes

- The component fills its parent container (100% width and height)
- Control size by setting dimensions on the parent div
- HTML content is automatically sanitized when using `RenderHtmlView`
