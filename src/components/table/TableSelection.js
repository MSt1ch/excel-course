export class TableSelection {
    static className = 'selected';
    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el) {
        this.current = $el;
        if (this.group.length) {
            this.clear();
            this.group.push($el);
            $el.focus().addClass(TableSelection.className);
        } else {
            this.group.push($el);
            $el.focus().addClass(TableSelection.className);
        }
    }

    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.className));
        this.group = [];
    }

    selectGroup($group = []) {
        this.clear();

        this.group = $group;
        this.group.forEach($el => $el.focus().addClass(TableSelection.className));
    }
}
