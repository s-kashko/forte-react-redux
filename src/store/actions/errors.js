export const SET_404_ERROR = 'SET_404_ERROR';
export const RESET_404_ERROR = 'RESET_404_ERROR';

export function set404error(path) {
    return { type: SET_404_ERROR, path }
}

export function reset404error() {
    return { type: RESET_404_ERROR }
}