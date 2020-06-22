import { SET_STARSHIPS, ADD_NEW_STARSHIP, UPDATE_STARSHIP, DELETE_STARSHIP, CHANGE_STARSHIP_STATUS } from '../actions/starships';

const initialState = [];

function starshipsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STARSHIPS:
      return [
        ...state,
        ...action.starships
      ];

    case ADD_NEW_STARSHIP:
      return [
        action.starship,
        ...state
      ];

    case UPDATE_STARSHIP:
      return state.map((starship) =>
        starship.id === action.starship.id ? { ...action.starship } : starship
      )

    case DELETE_STARSHIP:
      return [...state.filter(starship => starship.id !== action.id)];

    case CHANGE_STARSHIP_STATUS:
      return [
        ...state.map((starship) => {
          return starship.id === action.id ? { ...starship, beloved: !starship.beloved } : starship
        })
      ];

    default:
      return state;
  }
}

export default starshipsReducer;