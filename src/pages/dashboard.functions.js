import { storage } from '@core/utils';

export function toHTML(id, model) {
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.tableTitle}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `;
}

// excel: 121314
function getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    }
    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();
    if (!keys.length) {
        return `<p>We are not created record yet</p>`;
    }

    return `
        <div class="db__list-header">
            <span>Name</span>
            <span>Changing date</span>
        </div>
    
        <ul class="db__list">
            ${keys.map(key => {
        return toHTML(+key.split(':')[1], storage(key));
    }).join('')}
        </ul>
        `;
}

