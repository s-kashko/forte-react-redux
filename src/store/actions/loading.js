export const SET_PEOPLE_LOADING = 'SET_PEOPLE_LOADING';
export const SET_PLANETS_LOADING = 'SET_PLANETS_LOADING';
export const SET_STARSHIPS_LOADING = 'SET_STARSHIPS_LOADING';
export const PEOPLE_INITIALIZING_DONE = 'PEOPLE_INITIALIZING_DONE';
export const PLANETS_INITIALIZING_DONE = 'PLANETS_INITIALIZING_DONE';
export const STARSHIPS_INITIALIZING_DONE = 'STARSHIPS_INITIALIZING_DONE';


export function setPeopleLoading(value) {
    return { type: SET_PEOPLE_LOADING, value }
}

export function setPlanetsLoading(value) {
    return { type: SET_PLANETS_LOADING, value }
}

export function setStarshipsLoading(value) {
    return { type: SET_STARSHIPS_LOADING, value }
}

export function peopleInzDone() {
    return { type: PEOPLE_INITIALIZING_DONE }
}

export function planetsInzDone() {
    return { type: PLANETS_INITIALIZING_DONE }
}

export function starshipsInzDone() {
    return { type: STARSHIPS_INITIALIZING_DONE }
}