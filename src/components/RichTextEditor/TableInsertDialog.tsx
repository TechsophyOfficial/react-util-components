interface TableInsertDialogProps {
  isOpen: boolean
  rows: string
  columns: string
  error: string
  onClose: () => void
  onInsert: () => void
  onRowsChange: (value: string) => void
  onColumnsChange: (value: string) => void
}

const TableInsertDialog = ({
  isOpen,
  rows,
  columns,
  error,
  onClose,
  onInsert,
  onRowsChange,
  onColumnsChange,
}: TableInsertDialogProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='table-dialog-overlay' onClick={onClose}>
      <div
        className='table-dialog'
        onClick={(event) => event.stopPropagation()}
      >
        <h4>Insert table</h4>
        <div className='table-dialog-field'>
          <label htmlFor='table-rows'>Rows</label>
          <input
            id='table-rows'
            type='number'
            min='1'
            max='10'
            value={rows}
            onChange={(event) => onRowsChange(event.target.value)}
          />
        </div>
        <div className='table-dialog-field'>
          <label htmlFor='table-columns'>Columns</label>
          <input
            id='table-columns'
            type='number'
            min='1'
            max='10'
            value={columns}
            onChange={(event) => onColumnsChange(event.target.value)}
          />
        </div>
        {error && <p className='table-dialog-error'>{error}</p>}
        <div className='table-dialog-actions'>
          <button type='button' onClick={onClose}>
            Cancel
          </button>
          <button type='button' onClick={onInsert}>
            Insert
          </button>
        </div>
      </div>
    </div>
  )
}

export default TableInsertDialog
