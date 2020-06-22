import { starshipsAPI } from '../../services/starshipsService';
import { setStarshipsLoading, starshipsInzDone } from './loading';
import { setError } from './errors';

export const SET_STARSHIPS = 'SET_STARSHIPS';
export const UPDATE_STARSHIP = 'UPDATE_STARSHIP';
export const ADD_NEW_STARSHIP = 'ADD_NEW_STARSHIP';
export const DELETE_STARSHIP = 'DELETE_STARSHIP';
export const CHANGE_STARSHIP_STATUS = 'CHANGE_STARSHIP_STATUS';

function setStarshipsAC(starships) {
  return { type: SET_STARSHIPS, starships };
}

export const setStarships = (starships) => (dispatch) => {
  dispatch(setStarshipsAC(starships));
  dispatch(starshipsInzDone());
}

export const getStarshipsData = () => async (dispatch) => {
  try {
    dispatch(setStarshipsLoading(true));
    const starships = await starshipsAPI.getStarships();
    dispatch(setStarshipsAC(starships));
    localStorage.setItem('swapi-starships', JSON.stringify(starships))
  } catch (err) {
    dispatch(setError(err.message))
  } finally {
    dispatch(setStarshipsLoading(false));
  }
}

function addNewStarshipAC(starship) {
  return { type: ADD_NEW_STARSHIP, starship }
}

export const addNewStarship = (starship) => (dispatch, getState) => {
  dispatch(addNewStarshipAC(starship));
  localStorage.setItem('swapi-starships', JSON.stringify(getState().starships))
}

function updateStarshipAC(starship) {
  return { type: UPDATE_STARSHIP, starship }
}

export const updateStarship = (starship) => (dispatch, getState) => {
  dispatch(updateStarshipAC(starship));
  localStorage.setItem('swapi-starships', JSON.stringify(getState().starships))
}

function deleteStarshipAC(id) {
  return { type: DELETE_STARSHIP, id };
}

export const deleteStarship = (id) => (dispatch, getState) => {
  dispatch(deleteStarshipAC(id));
  localStorage.setItem('swapi-starships', JSON.stringify(getState().starships))
}

function changeStarshipStatusAC(id) {
  return { type: CHANGE_STARSHIP_STATUS, id };
}

export const changeStarshipStatus = (id) => (dispatch, getState) => {
  dispatch(changeStarshipStatusAC(id));
  localStorage.setItem('swapi-starships', JSON.stringify(getState().starships))
}