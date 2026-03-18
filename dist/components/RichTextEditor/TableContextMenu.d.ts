interface TableContextMenuProps {
    isOpen: boolean;
    x: number;
    y: number;
    onAction: (action: 'addRowAbove' | 'addRowBelow' | 'removeRow' | 'addColLeft' | 'addColRight' | 'removeCol' | 'removeTable') => void;
}
declare const TableContextMenu: ({ isOpen, x, y, onAction, }: TableContextMenuProps) => import("react/jsx-runtime").JSX.Element | null;
export default TableContextMenu;
