import { range } from '@core/utils';

export function matrix($target, $current) {
    const currentEl = $current.id(true);
    const targetEl = $target.id(true);

    const cols = range(currentEl.col, targetEl.col);
    const rows = range(currentEl.row, targetEl.row);

    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`));
        return acc;
    }, []);
}

export function nextSelector(key, { row, col }) {
    const MIN_VALUE = 0;
    switch (key) {
    case 'Enter':
    case 'ArrowDown':
        row++;
        break;
    case 'Tab':
    case 'ArrowRight':
        col++;
        break;
    case 'ArrowLeft':
        col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
        break;
    case 'ArrowUp':
        row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
        break;
    }
    return `[data-id="${row}:${col}"]`;
}
