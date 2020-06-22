import { SET_PEOPLE_LOADING } from '../actions/loading';
import { SET_PLANETS_LOADING } from '../actions/loading';
import { SET_STARSHIPS_LOADING } from '../actions/loading';
import { PEOPLE_INITIALIZING_DONE } from '../actions/loading';
import { PLANETS_INITIALIZING_DONE } from '../actions/loading';
import { STARSHIPS_INITIALIZING_DONE } from '../actions/loading';



const initialState = {
    peopleInitializing: true,
    planetsInitializing: true,
    starshipsInitializing: true,
    peopleLoading: false,
    planetsLoading: false,
    starshipsLoading: false
}

export default function loadingReducer(state = initialState, action) {
    switch (action.type) {

        case PEOPLE_INITIALIZING_DONE:
            return {
                ...state,
                peopleInitializing: false
            }

        case PLANETS_INITIALIZING_DONE:
            return {
                ...state,
                planetsInitializing: false
            }

        case STARSHIPS_INITIALIZING_DONE:
            return {
                ...state,
                starshipsInitializing: false
            }

        case SET_PEOPLE_LOADING:
            return {
                ...state,
                peopleLoading: action.value
            }
        case SET_PLANETS_LOADING:
            return {
                ...state,
                planetsLoading: action.value
            }
        case SET_STARSHIPS_LOADING:
            return {
                ...state,
                starshipsLoading: action.value
            }

        default: return state;
    }
}