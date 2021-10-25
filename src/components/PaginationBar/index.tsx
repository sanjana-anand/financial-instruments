import React, { useMemo } from 'react';
import styled from 'styled-components';

type PaginationBarProps = {
  records: number;
  recordsPerPage: number;
  currentPage: number;
  onChange: (pageNumber?: number) => void;
};

const PaginationButton = styled.button<{active?: boolean}>`
    border: none;
    background-color: transparent;
    padding: 0.5rem;
    font-size: 1rem;
    color: #4169e1;
    cursor: pointer;
    text-decoration: ${props => props.active ? 'underline' : 'none'};
    :disabled {
        color: #999;
        cursor: auto; 
    }
`;

const PaginationBar = (props: PaginationBarProps) => {
    const { records, recordsPerPage, currentPage, onChange } = props;

    const total = useMemo(() => {
        return Math.ceil(records / recordsPerPage);
    }, [records, recordsPerPage])

    const pages = useMemo(() => {
        const range = [];
        for (let i = 1; i <= total; i++) {
            range.push(i);
        }
        return range;
    }, [total]);

    if (!records || total === 1) return null;

    return (
        <div>
            <PaginationButton
            className="pagination-button-nav"
            onClick={() => onChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
                Prev
            </PaginationButton>

            {pages.map((idx: number) => (
                <PaginationButton key={idx} active={currentPage === idx} onClick={() => onChange(idx)}>
                {idx}
                </PaginationButton>
            ))}

            <PaginationButton
                className="pagination-button-nav"
                onClick={() => onChange(currentPage + 1)}
                disabled={currentPage === total}
            >
                Next
            </PaginationButton>
        </div>
    );
}

export default PaginationBar;