import { useRef, useState, useEffect } from 'react'
import './RichTextEditor.css'
import TableContextMenu from './TableContextMenu'
import TableInsertDialog from './TableInsertDialog'

interface ToolbarButton {
  command: string
  icon: string
  value?: string
  title: string
}

interface RichTextEditorProps {
  setHtmlContent: (content: string) => void
  initialContent: string
}

interface TableDialogState {
  isOpen: boolean
  rows: string
  columns: string
}

interface TableContextMenuState {
  isOpen: boolean
  x: number
  y: number
  table: HTMLTableElement | null
  cell: HTMLTableCellElement | null
}

const RichTextEditor = ({
  setHtmlContent,
  initialContent,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInitializedRef = useRef<boolean>(false)
  const [selectedFont, setSelectedFont] = useState<string>('Arial')

  const [selectedFontSize, setSelectedFontSize] = useState<string>('2')
  const [activeCommands, setActiveCommands] = useState<Set<string>>(new Set())
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const savedSelectionRef = useRef<Range | null>(null)
  const [tableDialog, setTableDialog] = useState<TableDialogState>({
    isOpen: false,
    rows: '2',
    columns: '2',
  })
  const [tableDialogError, setTableDialogError] = useState<string>('')
  const [tableContextMenu, setTableContextMenu] =
    useState<TableContextMenuState>({
      isOpen: false,
      x: 0,
      y: 0,
      table: null,
      cell: null,
    })

  const fonts = [
    {
      label: 'Default Sans',
      value: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif',
    },
    { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
    { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
    { label: 'Courier New', value: '"Courier New", Courier, monospace' },
    { label: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
    { label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
    { label: 'Impact', value: 'Impact, Charcoal, sans-serif' },
    { label: 'Comic Sans', value: '"Comic Sans MS", "Comic Sans", cursive' },
  ]

  const fontSizes = ['1', '2', '3', '4', '5', '6', '7', '8']

  const toolbarButtons: ToolbarButton[] = [
    { command: 'bold', icon: '𝐁', title: 'Bold' },
    { command: 'italic', icon: '𝐼', title: 'Italic' },
    { command: 'underline', icon: 'U̲', title: 'Underline' },
    { command: 'strikeThrough', icon: 'S̶', title: 'Strikethrough' },
    { command: 'justifyLeft', icon: '≡', title: 'Align Left' },
    { command: 'justifyCenter', icon: '≡', title: 'Align Center' },
    { command: 'justifyRight', icon: '≡', title: 'Align Right' },
    { command: 'justifyFull', icon: '≡', title: 'Justify' },
  ]

  const updateHtmlContent = () => {
    if (editorRef?.current && setHtmlContent) {
      setHtmlContent(editorRef?.current?.innerHTML)
    }
  }

  const updateCommandStates = () => {
    const commands = ['bold', 'italic', 'underline', 'strikeThrough']
    const active = new Set<string>()

    commands.forEach((command) => {
      if (document.queryCommandState(command)) {
        active.add(command)
      }
    })

    setActiveCommands(active)
  }

  const executeCommand = (
    command: string,
    value: string | undefined = undefined
  ) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateHtmlContent()
    updateCommandStates()
  }

  const saveCurrentSelection = () => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0 || !editorRef.current) {
      return
    }

    const range = selection.getRangeAt(0)
    if (editorRef.current.contains(range.commonAncestorContainer)) {
      savedSelectionRef.current = range.cloneRange()
    }
  }

  const placeCaretAtEnd = (element: HTMLElement) => {
    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(element)
    range.collapse(false)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  const restoreSavedSelection = () => {
    const selection = window.getSelection()
    if (!selection || !editorRef.current) {
      return false
    }

    if (
      savedSelectionRef.current &&
      editorRef.current.contains(
        savedSelectionRef.current.commonAncestorContainer
      )
    ) {
      selection.removeAllRanges()
      selection.addRange(savedSelectionRef.current)
      return true
    }

    placeCaretAtEnd(editorRef.current)
    return true
  }

  const closeTableContextMenu = () => {
    setTableContextMenu({
      isOpen: false,
      x: 0,
      y: 0,
      table: null,
      cell: null,
    })
  }

  const focusCell = (cell: HTMLTableCellElement | null) => {
    if (!cell) {
      return
    }

    if (cell.innerHTML.trim() === '') {
      cell.innerHTML = '<br>'
    }

    const range = document.createRange()
    range.selectNodeContents(cell)
    range.collapse(true)

    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
    editorRef.current?.focus()
  }

  const getCellPosition = (cell: HTMLTableCellElement) => {
    const row = cell.parentElement as HTMLTableRowElement | null
    const section = row?.parentElement as
      | HTMLTableSectionElement
      | HTMLTableElement
      | null

    if (!row || !section) {
      return null
    }

    return {
      rowIndex: Array.from(section.children).indexOf(row),
      columnIndex: Array.from(row.children).indexOf(cell),
      row,
      section,
    }
  }

  const normalizeTable = (table: HTMLTableElement) => {
    if (!table.tBodies.length && table.rows.length > 0) {
      const tbody = document.createElement('tbody')
      while (table.firstChild) {
        tbody.appendChild(table.firstChild)
      }
      table.appendChild(tbody)
    }
  }

  const applyInlineTableStyles = (table: HTMLTableElement) => {
    table.style.borderCollapse = 'collapse'
    table.style.border = '1px solid #6b7280'
    table.style.width = '100%'

    Array.from(table.rows).forEach((tableRow) => {
      Array.from(tableRow.cells).forEach((tableCell) => {
        tableCell.style.border = '1px solid #6b7280'
        tableCell.style.padding = '8px'
        tableCell.style.verticalAlign = 'top'
      })
    })
  }

  const insertTableAtCursor = (rows: number, columns: number) => {
    if (!editorRef.current) {
      return
    }

    restoreSavedSelection()
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      return
    }

    const range = selection.getRangeAt(0)
    const table = document.createElement('table')
    const tbody = document.createElement('tbody')

    table.className = 'rte-table'

    for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
      const row = document.createElement('tr')
      for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
        const cell = document.createElement('td')
        cell.innerHTML = '<br>'
        row.appendChild(cell)
      }
      tbody.appendChild(row)
    }

    table.appendChild(tbody)
    applyInlineTableStyles(table)

    const spacerParagraph = document.createElement('p')
    spacerParagraph.innerHTML = '<br>'

    range.deleteContents()
    range.insertNode(spacerParagraph)
    range.insertNode(table)

    const firstCell = table.querySelector('td')
    if (firstCell instanceof HTMLTableCellElement) {
      focusCell(firstCell)
    }

    updateHtmlContent()
    closeTableContextMenu()
  }

  const openTableDialog = () => {
    saveCurrentSelection()
    setTableDialogError('')
    setTableDialog((previous) => ({ ...previous, isOpen: true }))
  }

  const closeTableDialog = () => {
    setTableDialog((previous) => ({ ...previous, isOpen: false }))
    setTableDialogError('')
  }

  const handleInsertTable = () => {
    const rows = Number.parseInt(tableDialog.rows, 10)
    const columns = Number.parseInt(tableDialog.columns, 10)

    if (
      Number.isNaN(rows) ||
      Number.isNaN(columns) ||
      rows < 1 ||
      columns < 1 ||
      rows > 10 ||
      columns > 10
    ) {
      setTableDialogError('Rows and columns must be between 1 and 10.')
      return
    }

    closeTableDialog()
    insertTableAtCursor(rows, columns)
  }

  const applyTableAction = (
    action:
      | 'addRowAbove'
      | 'addRowBelow'
      | 'removeRow'
      | 'addColLeft'
      | 'addColRight'
      | 'removeCol'
      | 'removeTable'
  ) => {
    const { table, cell } = tableContextMenu
    if (!table || !cell) {
      return
    }

    normalizeTable(table)
    const position = getCellPosition(cell)
    if (!position) {
      return
    }

    const { rowIndex, columnIndex, row, section } = position

    if (action === 'removeTable') {
      const nextFocusTarget =
        table.nextElementSibling instanceof HTMLElement
          ? table.nextElementSibling
          : null
      table.remove()
      if (nextFocusTarget) {
        placeCaretAtEnd(nextFocusTarget)
      }
      editorRef.current?.focus()
      updateHtmlContent()
      closeTableContextMenu()
      return
    }

    if (action === 'addRowAbove' || action === 'addRowBelow') {
      const newRow = document.createElement('tr')
      const cellCount = row.cells.length || 1
      for (let index = 0; index < cellCount; index += 1) {
        const newCell = document.createElement('td')
        newCell.innerHTML = '<br>'
        newRow.appendChild(newCell)
      }

      if (action === 'addRowAbove') {
        section.insertBefore(newRow, row)
      } else {
        section.insertBefore(newRow, row.nextSibling)
      }

      focusCell(newRow.cells[columnIndex] ?? newRow.cells[0])
    }

    if (action === 'removeRow') {
      const rowCount = section.children.length
      if (rowCount <= 1) {
        table.remove()
        editorRef.current?.focus()
      } else {
        const nextRow =
          (section.children[rowIndex + 1] as HTMLTableRowElement | undefined) ??
          (section.children[rowIndex - 1] as HTMLTableRowElement | undefined) ??
          null
        row.remove()
        focusCell(nextRow?.cells[columnIndex] ?? nextRow?.cells[0] ?? null)
      }
    }

    if (action === 'addColLeft' || action === 'addColRight') {
      const insertAt = action === 'addColLeft' ? columnIndex : columnIndex + 1
      Array.from(table.rows).forEach((tableRow) => {
        const newCell = tableRow.insertCell(insertAt)
        newCell.innerHTML = '<br>'
      })

      const focusRow = table.rows[rowIndex]
      focusCell(focusRow?.cells[insertAt] ?? null)
    }

    if (action === 'removeCol') {
      const totalColumns = row.cells.length
      if (totalColumns <= 1) {
        table.remove()
        editorRef.current?.focus()
      } else {
        Array.from(table.rows).forEach((tableRow) => {
          tableRow.deleteCell(columnIndex)
        })

        const focusRow = table.rows[rowIndex]
        const fallbackIndex = Math.max(0, columnIndex - 1)
        focusCell(focusRow?.cells[fallbackIndex] ?? focusRow?.cells[0] ?? null)
      }
    }

    applyInlineTableStyles(table)

    updateHtmlContent()
    closeTableContextMenu()
  }

  const createAlphabeticList = () => {
    // First create an ordered list
    document.execCommand('insertOrderedList', false)

    // Then apply alphabetic style to the list
    const selection = window.getSelection()
    if (selection && selection.anchorNode) {
      let node: Node | null = selection.anchorNode

      // Find the parent OL element
      while (node && node.nodeName !== 'OL') {
        node = node.parentNode
      }

      if (node && node instanceof HTMLElement) {
        node.style.listStyleType = 'lower-alpha'
      }
    }

    editorRef.current?.focus()
    updateHtmlContent()
    updateCommandStates()
  }

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontStack = e.target.value
    setSelectedFont(fontStack)
    executeCommand('fontName', fontStack)
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value
    setSelectedFontSize(size)
    executeCommand('fontSize', size)
  }

  const handleInput = () => {
    updateHtmlContent()
    updateCommandStates()
  }

  const handleEditorKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || !editorRef.current) {
      return
    }

    const selection = window.getSelection()
    const anchorNode = selection?.anchorNode
    if (!anchorNode) {
      return
    }

    const currentElement =
      anchorNode instanceof HTMLElement ? anchorNode : anchorNode.parentElement
    const currentListItem = currentElement?.closest(
      'li'
    ) as HTMLLIElement | null

    // When Enter is pressed on an empty list item, exit the list by creating
    // a new standalone block after the list so subsequent typing is not nested
    // in the same list wrapper block.
    if (currentListItem && currentListItem.textContent?.trim() === '') {
      event.preventDefault()

      const parentList = currentListItem.closest('ul, ol')
      if (!parentList) {
        return
      }

      const listHost = parentList.parentElement
      const insertionReference =
        listHost &&
        listHost.tagName === 'DIV' &&
        listHost.parentElement === editorRef.current
          ? listHost
          : parentList

      currentListItem.remove()

      if (parentList.children.length === 0) {
        parentList.remove()
      }

      const newBlock = document.createElement('div')
      newBlock.style.margin = '0'
      newBlock.style.padding = '0'

      if (insertionReference.isConnected) {
        insertionReference.insertAdjacentElement('afterend', newBlock)
      } else {
        editorRef.current.appendChild(newBlock)
      }

      placeCaretAtEnd(newBlock)
      updateHtmlContent()
      updateCommandStates()
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    // Update command states on selection change
    const handleSelectionChange = () => {
      updateCommandStates()
    }

    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [])

  useEffect(() => {
    // Set initial content only once when component mounts
    if (initialContent && editorRef?.current && !isInitializedRef.current) {
      editorRef.current.innerHTML = initialContent
      isInitializedRef.current = true
    }
  }, [initialContent])

  useEffect(() => {
    const closeContextMenuEvents = () => {
      setTableContextMenu((previous) =>
        previous.isOpen
          ? {
              isOpen: false,
              x: 0,
              y: 0,
              table: null,
              cell: null,
            }
          : previous
      )
    }

    document.addEventListener('click', closeContextMenuEvents)
    document.addEventListener('scroll', closeContextMenuEvents, true)

    return () => {
      document.removeEventListener('click', closeContextMenuEvents)
      document.removeEventListener('scroll', closeContextMenuEvents, true)
    }
  }, [])

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTableContextMenu()
        closeTableDialog()
      }
    }

    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  const handleEditorContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null
    if (!target) {
      return
    }

    const cell = target.closest('td, th')
    const table = target.closest('table')

    if (!cell || !table) {
      closeTableContextMenu()
      return
    }

    event.preventDefault()
    setTableContextMenu({
      isOpen: true,
      x: event.clientX,
      y: event.clientY,
      table: table as HTMLTableElement,
      cell: cell as HTMLTableCellElement,
    })
  }

  return (
    <div className={`editor-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='toolbar'>
        {/* Text Formatting Buttons */}
        <div className='toolbar-group'>
          {toolbarButtons.slice(0, 4).map((btn) => (
            <button
              key={btn.command}
              className={`toolbar-btn ${
                activeCommands.has(btn.command) ? 'active' : ''
              }`}
              onClick={() => executeCommand(btn.command, btn.value)}
              title={btn.title}
              type='button'
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Font Selection */}
        <div className='toolbar-group'>
          <select
            className='toolbar-select'
            value={selectedFont}
            onChange={handleFontChange}
            title='Font Family'
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
            className='toolbar-select size-select'
            value={selectedFontSize}
            onChange={handleFontSizeChange}
            title='Font Size'
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Alignment Buttons */}
        <div className='toolbar-group'>
          {toolbarButtons.slice(4).map((btn) => (
            <button
              key={btn.command}
              className={`toolbar-btn align-btn ${btn.command}`}
              onClick={() => executeCommand(btn.command, btn.value)}
              title={btn.title}
              type='button'
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Indent Buttons */}
        <div className='toolbar-group'>
          <button
            className='toolbar-btn'
            onClick={() => executeCommand('indent')}
            title='Indent'
            type='button'
          >
            ⇥
          </button>
          <button
            className='toolbar-btn'
            onClick={() => executeCommand('outdent')}
            title='Outdent'
            type='button'
          >
            ⇤
          </button>
        </div>

        {/* List Buttons */}
        <div className='toolbar-group'>
          <button
            className='toolbar-btn'
            onClick={() => executeCommand('insertUnorderedList')}
            title='Bullet List'
            type='button'
          >
            •
          </button>
          <button
            className='toolbar-btn'
            onClick={() => executeCommand('insertOrderedList')}
            title='Numbered List'
            type='button'
          >
            1.
          </button>
          <button
            className='toolbar-btn'
            onClick={createAlphabeticList}
            title='Alphabetic List'
            type='button'
          >
            a.
          </button>
        </div>

        {/* Table Button */}
        <div className='toolbar-group'>
          <button
            className='toolbar-btn'
            onClick={openTableDialog}
            title='Table'
            type='button'
            aria-label='Insert Table'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <rect
                x='1.5'
                y='1.5'
                width='13'
                height='13'
                rx='1.5'
                stroke='currentColor'
              />
              <path d='M1.5 8H14.5M8 1.5V14.5' stroke='currentColor' />
            </svg>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className='toolbar-group'>
          <button
            className='toolbar-btn'
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            type='button'
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleEditorKeyDown}
        onContextMenu={handleEditorContextMenu}
        className='editor-area'
        suppressContentEditableWarning
      ></div>

      <TableInsertDialog
        isOpen={tableDialog.isOpen}
        rows={tableDialog.rows}
        columns={tableDialog.columns}
        error={tableDialogError}
        onClose={closeTableDialog}
        onInsert={handleInsertTable}
        onRowsChange={(value) =>
          setTableDialog((previous) => ({
            ...previous,
            rows: value,
          }))
        }
        onColumnsChange={(value) =>
          setTableDialog((previous) => ({
            ...previous,
            columns: value,
          }))
        }
      />

      <TableContextMenu
        isOpen={tableContextMenu.isOpen}
        x={tableContextMenu.x}
        y={tableContextMenu.y}
        onAction={applyTableAction}
      />
    </div>
  )
}

export default RichTextEditor
