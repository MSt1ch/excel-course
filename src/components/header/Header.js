import { ExcelComponent } from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import { $ } from '@core/dom';
import { debounce } from '@core/utils';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options,
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    onInput(event) {
        this.$dispatch(actions.changeTitle($(event.target).text()));
    }

    onClick(event) {
        const $target = $(event.target);
        if ($target.data.button === 'remove') {
            const decision = confirm('Do you want to remove the table?');
            if (decision) {
                localStorage.removeItem(`excel:${ActiveRoute.param}`);
                ActiveRoute.navigate('');
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('');
        }
    }

    toHTML() {
        const { tableTitle } = this.store.getState();
        return `<label>
            <input value="${ tableTitle }" type="text" class="input" />
        </label>
        <div>
            <div class="button">
                <i class="material-icons" data-button="remove">delete</i>
            </div>
            <div class="button" >
                <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>
        </div>`;
    }
}
