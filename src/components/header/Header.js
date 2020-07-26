import { ExcelComponent } from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import { $ } from '@core/dom';
import { debounce } from '@core/utils';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options,
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    onInput(event) {
        this.$dispatch(actions.changeTitle($(event.target).text()));
    }

    toHTML() {
        const { tableTitle } = this.store.getState();
        return `<label>
            <input value="${ tableTitle }" type="text" class="input" />
        </label>
        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>`;
    }
}
