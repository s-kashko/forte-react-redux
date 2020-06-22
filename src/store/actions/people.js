import { peopleAPI } from '../../services/peopleService';
import { setPeopleLoading, peopleInzDone } from './loading';

export const SET_PEOPLE = 'SET_PEOPLE';
export const UPDATE_PERSON = 'UPDATE_PERSON';
export const ADD_NEW_PERSON = 'ADD_NEW_PERSON';
export const DELETE_PERSON = 'DELETE_PERSON';
export const CHANGE_PERSON_STATUS = 'CHANGE_PERSON_STATUS';

function setPeopleAC(people) {
  return { type: SET_PEOPLE, people };
}

export const setPeople = (people) => (dispatch) => {
  dispatch(setPeopleAC(people));
  dispatch(peopleInzDone());
}

export const getPeopleData = () => async (dispatch) => {
  dispatch(setPeopleLoading(true));
  const people = await peopleAPI.getPeople();
  dispatch(setPeopleAC(people));
  dispatch(setPeopleLoading(false));
  localStorage.setItem('swapi-people', JSON.stringify(people));
  dispatch(peopleInzDone());
}

function addNewPersonAC(person) {
  return { type: ADD_NEW_PERSON, person }
}

export const addNewPerson = (person) => (dispatch, getState) => {
  dispatch(addNewPersonAC(person));
  localStorage.setItem('swapi-people', JSON.stringify(getState().people))
}

function updatePersonAC(person) {
  return { type: UPDATE_PERSON, person }
}

export const updatePerson = (person) => (dispatch, getState) => {
  dispatch(updatePersonAC(person));
  localStorage.setItem('swapi-people', JSON.stringify(getState().people))
}


function deletePersonAC(id) {
  return { type: DELETE_PERSON, id };
}

export const deletePerson = (id) => (dispatch, getState) => {
  dispatch(deletePersonAC(id));
  localStorage.setItem('swapi-people', JSON.stringify(getState().people));
}

function changePersonStatusAC(id) {
  return { type: CHANGE_PERSON_STATUS, id };
}

export const changePersonStatus = (id) => (dispatch, getState) => {
  dispatch(changePersonStatusAC(id));
  localStorage.setItem('swapi-people', JSON.stringify(getState().people))
}

