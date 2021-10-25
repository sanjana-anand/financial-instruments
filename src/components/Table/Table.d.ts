export type CustomStyle = {[key: string]: string};

export type ColumnConfig = {
    id: string;
    name: string;
    disableSort?: boolean;
    defaultSortDirection?: SortDirection;
    restrictSort?: boolean;
    customSortFn?: (a: any, b: any, direction: SortDirection) => 1 | -1 | 0;
    customStyleRenderer?: (value: any) => CustomStyle;
}

export type TableConfig = {
    enableSort?: boolean;
    allowSortRemoval?: boolean;
    rowsPerPage?: number;
    customRowStyleRenderer?: (row: any) => CustomStyle;
}

export type TableProps = {
    columnConfig: ColumnConfig[];
    tableConfig: TableConfig;
    data: any[];
}

export type SortConfig = {
    key: string;
    direction: SortDirection;
    customSortFn?: (a: any, b: any, direction: SortDirection) => 1 | -1 | 0
}