import { SET_PEOPLE, ADD_NEW_PERSON, UPDATE_PERSON, DELETE_PERSON, CHANGE_PERSON_STATUS } from '../actions/people'

const initialState = [];

function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PEOPLE:
      return [
        ...state,
        ...action.people
      ];

    case ADD_NEW_PERSON:
      return [
        action.person,
        ...state
      ];

    case UPDATE_PERSON:
      return state.map((person) =>
        person.id === action.person.id ? { ...action.person } : person
      )

    case DELETE_PERSON:
      return [...state.filter(person => person.id !== action.id)];

    case CHANGE_PERSON_STATUS:
      return [
        ...state.map((person) => {
          return person.id === action.id ? { ...person, beloved: !person.beloved } : person
        })
      ];

    default:
      return state;
  }
}

export default peopleReducer;