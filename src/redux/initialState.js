import { storage } from '@core/utils';
import { defaultStyles } from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    tableTitle: 'new table',
};

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
});

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state')) : defaultState;

