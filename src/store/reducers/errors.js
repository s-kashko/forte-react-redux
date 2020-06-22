import { SET_404_ERROR, RESET_404_ERROR } from '../actions/errors'

const initialState = {
    error404: null
}

export default function errrorsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_404_ERROR:
            return {
                ...state,
                error404: action.path
            }

        case RESET_404_ERROR:
            return {
                ...state,
                error404: null
            }

        default:
            return state
    }
}