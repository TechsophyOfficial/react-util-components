import { useState } from "react";
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import RenderHtmlView from "./components/RichTextEditor/RenderHtmlView";
import Lightbox from "./components/LightBox/LightBox";
import Shimmer from "./components/Shimmer/Shimmer";
import "./styles.css";

const App = () => {
  const [htmlText, setHtmlText] = useState<string>(
    "<p>Start typing here...</p>",
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const images = [
    "https://img.freepik.com/free-photo/vividly-colored-hummingbird-nature_23-2151495325.jpg",
    "https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg",
  ];

  return (
    <div className="app-container">
      <header className="header">
        <h1>⚛️ React Util Components</h1>
        <p className="subtitle">A collection of reusable React components</p>
      </header>

      <div className="content">
        {/* Component 1: Shimmer */}
        <section className="component-section">
          <div className="component-header">
            <h2>✨ Shimmer Component</h2>
            <button
              className="demo-button"
              onClick={() =>
                setActiveDemo(activeDemo === "shimmer" ? null : "shimmer")
              }
            >
              {activeDemo === "shimmer" ? "🔼 Hide Demo" : "▶️ Show Demo"}
            </button>
          </div>
          <p className="description">
            A lightweight shimmer loading placeholder component with smooth
            animation effects. Perfect for skeleton screens while content is
            loading.
          </p>

          <div className="features">
            <h3>Features:</h3>
            <ul>
              <li>Smooth shimmer animation effect</li>
              <li>Fully responsive and customizable</li>
              <li>Dark mode support</li>
              <li>Flexible dimensions and border radius</li>
            </ul>
          </div>

          {activeDemo === "shimmer" && (
            <div className="demo-container">
              <h4>Live Demo:</h4>
              <div className="shimmer-demos">
                <div className="demo-item">
                  <p>
                    <strong>Light Mode (Card):</strong>
                  </p>
                  <Shimmer height="200px" width="300px" borderRadius="12px" />
                </div>
                <div className="demo-item">
                  <p>
                    <strong>Dark Mode (Card):</strong>
                  </p>
                  <Shimmer
                    height="200px"
                    width="300px"
                    borderRadius="12px"
                    darkMode={true}
                  />
                </div>
                <div className="demo-item">
                  <p>
                    <strong>Text Lines:</strong>
                  </p>
                  <div style={{ width: "300px" }}>
                    <Shimmer height="20px" width="100%" borderRadius="4px" />
                    <div style={{ marginTop: "10px" }}>
                      <Shimmer height="20px" width="80%" borderRadius="4px" />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Shimmer height="20px" width="60%" borderRadius="4px" />
                    </div>
                  </div>
                </div>
                <div className="demo-item">
                  <p>
                    <strong>Circle Avatar:</strong>
                  </p>
                  <Shimmer height="100px" width="100px" borderRadius="50%" />
                </div>
              </div>

              <div className="code-example">
                <h4>Usage Example:</h4>
                <pre>{`<Shimmer 
  height="200px" 
  width="300px" 
  borderRadius="12px" 
  darkMode={false} 
/>`}</pre>
              </div>
            </div>
          )}
        </section>

        {/* Component 2: Lightbox */}
        <section className="component-section">
          <div className="component-header">
            <h2>🖼️ Lightbox Component</h2>
            <button
              className="demo-button"
              onClick={() =>
                setActiveDemo(activeDemo === "lightbox" ? null : "lightbox")
              }
            >
              {activeDemo === "lightbox" ? "🔼 Hide Demo" : "▶️ Show Demo"}
            </button>
          </div>
          <p className="description">
            A responsive lightbox component for displaying images with zoom,
            rotate, and navigation capabilities. Mobile-friendly with touch
            gestures.
          </p>

          <div className="features">
            <h3>Features:</h3>
            <ul>
              <li>Zoom in/out with buttons or double-click</li>
              <li>Rotate images clockwise/counter-clockwise</li>
              <li>Keyboard navigation (Escape to close, arrows to navigate)</li>
              <li>Touch gesture support for mobile devices</li>
              <li>Single or multiple image galleries</li>
              <li>Image navigation (previous/next)</li>
            </ul>
          </div>

          {activeDemo === "lightbox" && (
            <div className="demo-container">
              <h4>Live Demo:</h4>
              <div className="lightbox-trigger">
                <button
                  className="action-button"
                  onClick={() => {
                    setCurrentImageIndex(0);
                    setIsLightboxOpen(true);
                  }}
                >
                  🎨 Open Lightbox Gallery
                </button>
                <p
                  style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}
                >
                  Click to view the image gallery with zoom and rotate features
                </p>
              </div>

              <div className="code-example">
                <h4>Usage Example:</h4>
                <pre>{`const [isOpen, setIsOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);

const images = [
  "image1.jpg",
  "image2.jpg"
];

{isOpen && (
  <Lightbox
    images={images}
    imageIndex={currentIndex}
    onClose={() => setIsOpen(false)}
    onNavigateImage={(index) => setCurrentIndex(index)}
  />
)}`}</pre>
              </div>
            </div>
          )}
        </section>

        {/* Component 3: RichTextEditor */}
        <section className="component-section">
          <div className="component-header">
            <h2>📝 Rich Text Editor</h2>
            <button
              className="demo-button"
              onClick={() =>
                setActiveDemo(activeDemo === "editor" ? null : "editor")
              }
            >
              {activeDemo === "editor" ? "🔼 Hide Demo" : "▶️ Show Demo"}
            </button>
          </div>
          <p className="description">
            A WYSIWYG text editor component with formatting tools and dark mode
            support. Create and edit rich text content with list controls, table
            tools, and real-time HTML output.
          </p>

          <div className="features">
            <h3>Features:</h3>
            <ul>
              <li>
                Rich text formatting (bold, italic, underline, strikethrough)
              </li>
              <li>Multiple font families and sizes</li>
              <li>Text alignment (left, center, right, justify)</li>
              <li>Ordered and unordered lists</li>
              <li>Alphabetic list option</li>
              <li>Insert tables (1-10 rows and columns)</li>
              <li>Right-click table context menu for row/column actions</li>
              <li>Dark mode toggle</li>
              <li>Real-time HTML content updates</li>
            </ul>
          </div>

          {activeDemo === "editor" && (
            <div className="demo-container">
              <h4>Live Demo:</h4>
              <div style={{ height: "400px", marginBottom: "20px" }}>
                <RichTextEditor
                  setHtmlContent={setHtmlText}
                  initialContent={htmlText}
                />
              </div>

              <div style={{ marginTop: "20px" }}>
                <h4>Preview Output:</h4>
                <div
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "16px",
                    backgroundColor: "#f9f9f9",
                    minHeight: "100px",
                  }}
                >
                  <RenderHtmlView htmlContent={htmlText} />
                </div>
                <p style={{ marginTop: "10px", color: "#4a5568" }}>
                  Tip: Click the table icon in the toolbar to insert a table,
                  then right-click any table cell for row and column actions.
                </p>
              </div>

              <div className="code-example">
                <h4>Usage Example:</h4>
                <pre>{`const [htmlContent, setHtmlContent] = useState<string>("");

<RichTextEditor 
  setHtmlContent={setHtmlContent} 
  initialContent={htmlContent} 
/>

// Use the toolbar table icon to insert a table.
// Right-click inside a table cell to open row/column actions.

<RenderHtmlView htmlContent={htmlContent} />`}</pre>
              </div>
            </div>
          )}
        </section>

        {/* Installation Section */}
        <section className="component-section installation">
          <h2>📦 Installation & Setup</h2>
          <div className="code-example">
            <h4>Import Components:</h4>
            <pre>{`// Shimmer
import Shimmer from "./components/Shimmer/Shimmer";

// Lightbox
import Lightbox from "./components/LightBox/LightBox";

// Rich Text Editor
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import RenderHtmlView from "./components/RichTextEditor/RenderHtmlView";`}</pre>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <Lightbox
          images={images}
          imageIndex={currentImageIndex}
          onClose={() => setIsLightboxOpen(false)}
          onNavigateImage={(index) => setCurrentImageIndex(index)}
        />
      )}
    </div>
  );
};

export default App;
