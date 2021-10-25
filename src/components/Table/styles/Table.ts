import styled from 'styled-components'
import { CustomStyle } from '../Table.d';

export const StyledTable = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    position: relative;
`;

export const TD = styled.td<{customStyle?: CustomStyle}>`
    border-bottom: 1px solid #999;
    padding: 0.5rem 1rem;
    text-align: left;
    ${props => props.customStyle && props.customStyle};
`;

export const TR = styled.tr<{customStyle?: CustomStyle}>`
    ${props => props.customStyle && props.customStyle};
`;

export const TH = styled.th<{customStyle?: CustomStyle, sorted?: boolean}>`
    background-color: #f5f5f5;
    box-shadow: ${props => props.sorted ? 'inset 0 -2px 0 #999' : 'inset 0 -1px 0 #999'};
    padding: 1rem;
    text-align: left;
    position: sticky;
    top: -0.5rem;
    cursor: pointer;
    div {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
`;

export const TFoot = styled.tfoot`
    position: sticky;
    inset-block-end: -10px;
    background-color: #fff;
    td {
        border: none;
        text-align: center;
        padding: 1rem;
    }
`;

const Arrow = styled.div`
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background: transparent;
    border-top: 2px solid #999;
    border-left: 2px solid #999;
`;

export const UpArrow = styled(Arrow)`
    transform: rotate(45deg);
`;

export const DownArrow = styled(Arrow)`
    transform: rotate(-135deg);
`;