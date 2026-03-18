interface TableInsertDialogProps {
    isOpen: boolean;
    rows: string;
    columns: string;
    error: string;
    onClose: () => void;
    onInsert: () => void;
    onRowsChange: (value: string) => void;
    onColumnsChange: (value: string) => void;
}
declare const TableInsertDialog: ({ isOpen, rows, columns, error, onClose, onInsert, onRowsChange, onColumnsChange, }: TableInsertDialogProps) => import("react/jsx-runtime").JSX.Element | null;
export default TableInsertDialog;
