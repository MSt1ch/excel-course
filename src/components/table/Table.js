import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';
import { matrix, nextSelector } from '@/components/table/table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        });
    }

    prepare() {
        this.selection = new TableSelection();
    }

    toHTML() {
        return createTable(20);
    }

    init() {
        super.init();

        this.selectCell(this.$root.find('[data-id="0:0"]'));

        this.$on('formula:input', text => {
            this.selection.current.text(text);
        });

        this.$on('formula:done', () => this.selection.current.focus());
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizeHandler(event, this.$root);
        } else if ($(event.target).data.type === 'cell') {
            if (event.shiftKey) {
                const $cells = matrix($(event.target), this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.selection.select($(event.target));
                this.$emit('table:selectClick', $(event.target));
            }
        }
    }

    onKeydown(event) {
        const { key, shiftKey } = event;
        const keys = ['Tab', 'Enter', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
        if (keys.includes(key) && !shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next);
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}

