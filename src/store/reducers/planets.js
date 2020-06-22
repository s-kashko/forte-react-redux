import { SET_PLANETS, ADD_NEW_PLANET, UPDATE_PLANET, DELETE_PLANET, CHANGE_PLANET_STATUS } from '../actions/planets'

const initialState = [];

function planetReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLANETS:
      return [
        ...state,
        ...action.planets
      ];

    case ADD_NEW_PLANET:
      return [
        action.planet,
        ...state
      ];

    case UPDATE_PLANET:
      return state.map((planet) =>
        planet.id === action.planet.id ? { ...action.planet } : planet
      )

    case DELETE_PLANET:
      return [...state.filter(planet => planet.id !== action.id)];

    case CHANGE_PLANET_STATUS:
      return [
        ...state.map((planet) => {
          return planet.id === action.id ? { ...planet, beloved: !planet.beloved } : planet
        })
      ];

    default:
      return state;
  }
}

export default planetReducer;