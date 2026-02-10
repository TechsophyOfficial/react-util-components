import { useRef, useState, useEffect } from "react";
import "./RichTextEditor.css";

interface ToolbarButton {
  command: string;
  icon: string;
  value?: string;
  title: string;
}

interface RichTextEditorProps {
  setHtmlContent: (content: string) => void;
  initialContent: string;
}

const RichTextEditor = ({
  setHtmlContent,
  initialContent,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<string>("Arial");
  const [selectedFontSize, setSelectedFontSize] = useState<string>("2");
  const [activeCommands, setActiveCommands] = useState<Set<string>>(new Set());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const fonts = [
    {
      label: "Default Sans",
      value: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif",
    },
    { label: "Arial", value: "Arial, Helvetica, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
    { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
    { label: "Courier New", value: '"Courier New", Courier, monospace' },
    { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
    { label: "Trebuchet MS", value: '"Trebuchet MS", Helvetica, sans-serif' },
    { label: "Impact", value: "Impact, Charcoal, sans-serif" },
    { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans", cursive' },
  ];

  const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const toolbarButtons: ToolbarButton[] = [
    { command: "bold", icon: "𝐁", title: "Bold" },
    { command: "italic", icon: "𝐼", title: "Italic" },
    { command: "underline", icon: "U̲", title: "Underline" },
    { command: "strikeThrough", icon: "S̶", title: "Strikethrough" },
    { command: "justifyLeft", icon: "≡", title: "Align Left" },
    { command: "justifyCenter", icon: "≡", title: "Align Center" },
    { command: "justifyRight", icon: "≡", title: "Align Right" },
    { command: "justifyFull", icon: "≡", title: "Justify" },
  ];

  const updateHtmlContent = () => {
    if (editorRef?.current && setHtmlContent) {
      setHtmlContent(editorRef?.current?.innerHTML);
    }
  };

  const updateCommandStates = () => {
    const commands = ["bold", "italic", "underline", "strikeThrough"];
    const active = new Set<string>();

    commands.forEach((command) => {
      if (document.queryCommandState(command)) {
        active.add(command);
      }
    });

    setActiveCommands(active);
  };

  const executeCommand = (
    command: string,
    value: string | undefined = undefined,
  ) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateHtmlContent();
    updateCommandStates();
  };

  const createAlphabeticList = () => {
    // First create an ordered list
    document.execCommand("insertOrderedList", false);

    // Then apply alphabetic style to the list
    const selection = window.getSelection();
    if (selection && selection.anchorNode) {
      let node: Node | null = selection.anchorNode;

      // Find the parent OL element
      while (node && node.nodeName !== "OL") {
        node = node.parentNode;
      }

      if (node && node instanceof HTMLElement) {
        node.style.listStyleType = "lower-alpha";
      }
    }

    editorRef.current?.focus();
    updateHtmlContent();
    updateCommandStates();
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontStack = e.target.value;
    setSelectedFont(fontStack);
    executeCommand("fontName", fontStack);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setSelectedFontSize(size);
    executeCommand("fontSize", size);
  };

  const handleInput = () => {
    updateHtmlContent();
    updateCommandStates();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Set initial focus
    editorRef.current?.focus();

    // Update command states on selection change
    const handleSelectionChange = () => {
      updateCommandStates();
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  useEffect(() => {
    // Set initial content only once when component mounts
    if (initialContent && editorRef?.current && !isInitializedRef.current) {
      editorRef.current.innerHTML = initialContent;
      isInitializedRef.current = true;
    }
  }, [initialContent]);

  return (
    <div className={`editor-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="toolbar">
        {/* Text Formatting Buttons */}
        <div className="toolbar-group">
          {toolbarButtons.slice(0, 4).map((btn) => (
            <button
              key={btn.command}
              className={`toolbar-btn ${
                activeCommands.has(btn.command) ? "active" : ""
              }`}
              onClick={() => executeCommand(btn.command, btn.value)}
              title={btn.title}
              type="button"
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Font Selection */}
        <div className="toolbar-group">
          <select
            className="toolbar-select"
            value={selectedFont}
            onChange={handleFontChange}
            title="Font Family"
          >
            {fonts.map((font) => (
              <option
                key={font.label}
                value={font.value}
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </option>
            ))}
          </select>

          <select
            className="toolbar-select size-select"
            value={selectedFontSize}
            onChange={handleFontSizeChange}
            title="Font Size"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Alignment Buttons */}
        <div className="toolbar-group">
          {toolbarButtons.slice(4).map((btn) => (
            <button
              key={btn.command}
              className={`toolbar-btn align-btn ${btn.command}`}
              onClick={() => executeCommand(btn.command, btn.value)}
              title={btn.title}
              type="button"
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Indent Buttons */}
        <div className="toolbar-group">
          <button
            className="toolbar-btn"
            onClick={() => executeCommand("indent")}
            title="Indent"
            type="button"
          >
            ⇥
          </button>
          <button
            className="toolbar-btn"
            onClick={() => executeCommand("outdent")}
            title="Outdent"
            type="button"
          >
            ⇤
          </button>
        </div>

        {/* List Buttons */}
        <div className="toolbar-group">
          <button
            className="toolbar-btn"
            onClick={() => executeCommand("insertUnorderedList")}
            title="Bullet List"
            type="button"
          >
            •
          </button>
          <button
            className="toolbar-btn"
            onClick={() => executeCommand("insertOrderedList")}
            title="Numbered List"
            type="button"
          >
            1.
          </button>
          <button
            className="toolbar-btn"
            onClick={createAlphabeticList}
            title="Alphabetic List"
            type="button"
          >
            a.
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="toolbar-group">
          <button
            className="toolbar-btn"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
            type="button"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="editor-area"
        suppressContentEditableWarning
      ></div>
    </div>
  );
};

export default RichTextEditor;
