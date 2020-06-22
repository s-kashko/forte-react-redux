import { SET_404_ERROR, RESET_404_ERROR, SET_ERROR, RESET_ERROR } from '../actions/errors'

const initialState = {
    error404: null,
    errors: []
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

        case SET_ERROR:
            return {
                ...state,
                errors: [...state.errors, action.error]
            }

        case RESET_ERROR:
            return {
                ...state,
                errors: state.errors.filter(err => err.id !== action.id)
            }



        default:
            return state
    }
}