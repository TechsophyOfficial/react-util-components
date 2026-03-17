interface TableContextMenuProps {
  isOpen: boolean
  x: number
  y: number
  onAction: (
    action:
      | 'addRowAbove'
      | 'addRowBelow'
      | 'removeRow'
      | 'addColLeft'
      | 'addColRight'
      | 'removeCol'
      | 'removeTable'
  ) => void
}

const TableContextMenu = ({
  isOpen,
  x,
  y,
  onAction,
}: TableContextMenuProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className='table-context-menu'
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <button type='button' onClick={() => onAction('addRowAbove')}>
        <span className='menu-icon' aria-hidden='true'>
          <svg
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='2'
              y='6'
              width='12'
              height='3'
              rx='0.6'
              stroke='currentColor'
            />
            <rect
              x='2'
              y='11'
              width='12'
              height='3'
              rx='0.6'
              stroke='currentColor'
            />
            <path d='M8 1V5M6 3H10' stroke='currentColor' />
          </svg>
        </span>
        <span>Row above</span>
      </button>
      <button type='button' onClick={() => onAction('addRowBelow')}>
        <span className='menu-icon' aria-hidden='true'>
          <svg
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='2'
              y='2'
              width='12'
              height='3'
              rx='0.6'
              stroke='currentColor'
            />
            <rect
              x='2'
              y='7'
              width='12'
              height='3'
              rx='0.6'
              stroke='currentColor'
            />
            <path d='M8 11V15M6 13H10' stroke='currentColor' />
          </svg>
        </span>
        <span>Row below</span>
      </button>
      <button type='button' onClick={() => onAction('removeRow')}>
        <span className='menu-icon' aria-hidden='true'>
          <svg
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='2'
              y='2'
              width='12'
              height='3'
              rx='0.6'
              stroke='currentColor'
            />
            <rect
              x='2'
              y='11'
              width='12'
              height='3'
              rx='0.6'
              stroke='currentColor'
            />
            <path d='M5 8H11' stroke='currentColor' />
          </svg>
        </span>
        <span>Remove row</span>
      </button>
      <button type='button' onClick={() => onAction('addColLeft')}>
        <span className='menu-icon' aria-hidden='true'>
          <svg
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='6'
              y='2'
              width='3'
              height='12'
              rx='0.6'
              stroke='currentColor'
            />
            <rect
              x='11'
              y='2'
              width='3'
              height='12'
              rx='0.6'
              stroke='currentColor'
            />
            <path d='M1 8H5M3 6V10' stroke='currentColor' />
          </svg>
        </span>
        <span>Column left</span>
      </button>
      <button type='button' onClick={() => onAction('addColRight')}>
        <span className='menu-icon' aria-hidden='true'>
          <svg
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='2'
              y='2'
              width='3'
              height='12'
              rx='0.6'
              stroke='currentColor'
            />
            <rect
              x='7'
              y='2'
              width='3'
              height='12'
              rx='0.6'
              stroke='currentColor'
            />
            <path d='M11 8H15M13 6V10' stroke='currentColor' />
          </svg>
        </span>
        <span>Column right</span>
      </button>
      <button type='button' onClick={() => onAction('removeCol')}>
        <span className='menu-icon' aria-hidden='true'>
          <svg
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='2'
              y='2'
              width='3'
              height='12'
              rx='0.6'
              stroke='currentColor'
            />
            <rect
              x='11'
              y='2'
              width='3'
              height='12'
              rx='0.6'
              stroke='currentColor'
            />
            <path d='M6 8H10' stroke='currentColor' />
          </svg>
        </span>
        <span>Remove column</span>
      </button>
      <button
        type='button'
        className='danger'
        onClick={() => onAction('removeTable')}
      >
        <span className='menu-icon' aria-hidden='true'>
          <svg
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='2'
              y='2'
              width='12'
              height='12'
              rx='1'
              stroke='currentColor'
            />
            <path d='M5 5L11 11M11 5L5 11' stroke='currentColor' />
          </svg>
        </span>
        <span>Remove table</span>
      </button>
    </div>
  )
}

export default TableContextMenu
