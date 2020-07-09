import { $ } from '@core/dom';

export function resizeHandler(event, $root) {
    const $target = $(event.target);
    const targetCoords = $target.getCoords();
    const { resize } = $target.data;
    $target.css({ opacity: 1 });
    if (resize === 'col') {
        $target.css({ height: (window.innerHeight - targetCoords.top) + 'px' });
    } else if (resize === 'row') {
        $target.css({ width: (window.innerWidth - targetCoords.left) + 'px' });
    }
    const $parent = $target.closest('[data-type="resizable"]');
    const { col: columnIndex } = $parent.data;
    const coords = $parent.getCoords();
    let columnWidth;
    let columnHeight;

    document.onmousemove = e => {
        if (resize === 'col') {
            const deltaX = e.pageX - coords.right;
            columnWidth = coords.width + deltaX;
            $target.css({ transform: `translateX(${deltaX + 'px'})` });
        } else if (resize === 'row') {
            const deltaY = e.pageY - coords.bottom;
            columnHeight = coords.height + deltaY;
            $target.css({ transform: `translateY(${deltaY + 'px'})` });
        }
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmousemoup = null;
        if (resize === 'col') {
            const $cellList = $root.findAll(`[data-col="${columnIndex}"]`);
            $cellList.forEach(cell => cell.style.width = columnWidth + 'px');
            $target.css({ transform: 'translateX(0px)', height: 'auto' });
        } else if (resize === 'row') {
            $parent.css({ height: `${columnHeight}px` });
            $target.css({ transform: 'translateY(0px)', width: 'auto' });
        }
        $target.css({ opacity: 0 });
    };
}
