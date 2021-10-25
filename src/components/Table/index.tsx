import React, { useCallback, useMemo, useState } from 'react';
import { SortDirection, SORT_DIRECTION } from '../../constants';
import { TableProps, ColumnConfig, SortConfig } from './Table.d';
import { TFoot, StyledTable, TD, TR, TH, UpArrow, DownArrow } from './styles/Table';
import PaginationBar from '../PaginationBar';

const defaultSortFn = (a: any, b: any, key: string, direction: SortDirection) => {
    if (a[key] < b[key]) {
      return direction === SORT_DIRECTION.ASC ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === SORT_DIRECTION.ASC ? 1 : -1;
    }
    return 0;
}

const DEFAULT_PAGE_SIZE = 25;

const Table = ({data, columnConfig, tableConfig}: TableProps) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>();
    const [currentPage, setCurrentPage] = useState(1);

    const sortedData = useMemo(() => {
        let tempData = [...data];
        if(sortConfig) {
            tempData.sort((a: any, b: any) => {
                if(sortConfig.customSortFn) {
                    return sortConfig.customSortFn(a, b, sortConfig.direction);
                }
                return defaultSortFn(a, b, sortConfig.key, sortConfig.direction);
            })
        }
        return tempData;
    }, [data, sortConfig]);

    const dataSlice = useMemo(() => {
        const tempData = [...sortedData];
        const limit = tableConfig.rowsPerPage || DEFAULT_PAGE_SIZE;
        return tempData.slice((currentPage - 1) * limit, currentPage * limit);
    }, [sortedData, currentPage, tableConfig]);

    const configureSort = useCallback((column: ColumnConfig) => {
        let direction = (column.defaultSortDirection || SORT_DIRECTION.ASC) as SortDirection;
        if(tableConfig?.allowSortRemoval && sortConfig?.key === column.id && (sortConfig.direction !== direction || column.restrictSort)) {
            setSortConfig(undefined);
            return;
        }
        if(sortConfig?.key === column.id && !column.restrictSort) {
            direction  = (sortConfig.direction === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC) as SortDirection;
        }
        setSortConfig({key: column.id, direction, customSortFn: column.customSortFn});
    }, [sortConfig, tableConfig]);

    const renderSortIcon = useCallback((key) => {
        if (sortConfig && sortConfig.key === key) {
            return sortConfig.direction === SORT_DIRECTION.ASC ? <UpArrow/> : <DownArrow/>
        }
        return null;
    }, [sortConfig]);

    const onPageChange = (pageNumber?: number) => {
        pageNumber && setCurrentPage(pageNumber)
    }

    const header = useMemo(() => {
        return (
            <thead>
                <TR>
                    {columnConfig.map((column: ColumnConfig) => (
                        <TH key={column.id}
                        sorted={sortConfig?.key === column.id}
                        onClick={() => tableConfig?.enableSort && !column.disableSort && configureSort(column)} >
                            <div>
                            {column.name}
                            {renderSortIcon(column.id)}
                            </div>
                        </TH>
                    ))}
                </TR>
            </thead>
        );
    }, [columnConfig, configureSort, tableConfig, renderSortIcon, sortConfig]);

    const body = useMemo(() => {
        return (
            <tbody>
                {
                    dataSlice.map((item, index: number) => (
                        <TR customStyle={tableConfig.customRowStyleRenderer && tableConfig.customRowStyleRenderer(item)} key={index}>
                            {columnConfig.map((column: ColumnConfig) => (
                                <TD key={`${column.id}-${index}`} 
                                customStyle={column.customStyleRenderer && column.customStyleRenderer(item[column.id])}>
                                    {item[column.id]}
                                </TD>
                            ))}
                        </TR>
                    ))
                }
            </tbody>
        )
    }, [dataSlice, columnConfig, tableConfig]);

    const footer = (
        <TFoot>
            <TR>
                <TD colSpan={columnConfig.length}>
                    {
                        data?.length ? 
                        <PaginationBar
                        records={data?.length ?? 0} 
                        recordsPerPage={tableConfig.rowsPerPage || DEFAULT_PAGE_SIZE} 
                        currentPage={currentPage} 
                        onChange={onPageChange}
                        />
                        : 'No Data'
                    }
                </TD>
            </TR>
        </TFoot>
    )

    return (
        <StyledTable>
            {header}
            {body}
            {footer}
        </StyledTable>
           
    );
}

export default Table;