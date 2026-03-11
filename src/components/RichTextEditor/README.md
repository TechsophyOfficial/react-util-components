# RichTextEditor Component

A WYSIWYG text editor component for React with formatting tools and dark mode support.

## Features

- Rich text formatting (bold, italic, underline, strikethrough)
- Font family and font size controls
- Text alignment and indentation controls
- Bullet, numbered, and alphabetic lists
- Table insertion with configurable rows and columns (1-10)
- Table context menu for row/column/table operations
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
| `initialContent` | `string`                    | Yes      | Initial HTML content rendered once when the editor mounts            |

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
  const [htmlContent, setHtmlContent] = useState<string>(
    "<p>Start typing here...</p>",
  );

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
  const [htmlContent, setHtmlContent] = useState<string>(
    "<p>Start typing here...</p>",
  );

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
- **Font Options**: 10 font families, sizes 1-8
- **Alignment**: Left, Center, Right, Justify
- **Lists**: Bullet, Numbered, Alphabetic
- **Indentation**: Indent and Outdent
- **Tables**: Insert table from toolbar, then right-click a cell for quick actions
- **Dark Mode**: Toggle theme

## Table Actions

Right-click inside a table cell to open table actions:

- Add row above or below
- Remove current row
- Add column left or right
- Remove current column
- Remove entire table

## Keyboard and Interaction Notes

- Press `Escape` to close the table insert dialog or table context menu
- Press `Enter` on an empty list item to exit the list cleanly
- The editor keeps focus after formatting and table operations

## Notes

- The component fills its parent container width
- Control editor size by setting dimensions on the parent wrapper
- `initialContent` is applied only once on first mount
- HTML content is automatically sanitized when using `RenderHtmlView`
