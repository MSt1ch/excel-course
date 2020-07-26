import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

const CODES = {
    A: 65,
    Z: 90,
};

function toCell(row, state = {}) {
    return function(_, col) {
        const id = `${row}:${col}`;
        const data = state.dataState[id || ''];
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id],
        });
        return `
            <div
                class="cell"
                contenteditable
                data-col=${col}
                data-type="cell"
                data-value="${data || ''}"
                data-id="${row}:${col}"
                style="${styles}; ${state.colState[col] ? `width: ${state.colState[col]}px;"` : ''}"
                
            >${parse(data) || ''}
            </div>
        `;
    };
}

function toColumn(colState = {}) {
    return function(column, index) {
        return `
        <div
            class="column"
            data-type="resizable"
            data-col=${index}
            ${colState[index] ? `style="width: ${colState[index]}px"` : ''}
        >
            ${column}
            <div class="col-resize" data-resize="col"></div>
        </div>`;
    };
}

function createRow(content, rowNumber = '', rowState= {}) {
    const resizeLine = rowNumber
        ? `<div
            class="row-resize"
            data-resize="row" 
            ></div>`
        : '';
    return `
        <div
            class="row"
            data-type="resizable"
            data-row=${rowNumber}
            ${rowState[rowNumber] ? `style="height: ${rowState[rowNumber]}px"`: ''}
            >
            <div class="row-info">
                ${rowNumber}
                ${resizeLine}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 10, tableState) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn(tableState.colState))
        .join('');

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(i, tableState))
            .join('');
        rows.push(createRow(cells, i + 1, tableState.rowState));
    }

    return rows.join('');
}
