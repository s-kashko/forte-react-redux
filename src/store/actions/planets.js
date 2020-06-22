import { planetsAPI } from '../../services/planetsService';
import { setPlanetsLoading, planetsInzDone, peopleInzDone } from './loading';
import { setError } from './errors';

export const SET_PLANETS = 'SET_PLANETS';
export const UPDATE_PLANET = 'UPDATE_PLANET';
export const ADD_NEW_PLANET = 'ADD_NEW_PLANET';
export const DELETE_PLANET = 'DELETE_PLANET';
export const CHANGE_PLANET_STATUS = 'CHANGE_PLANET_STATUS';

function setPlanetsAC(planets) {
  return { type: SET_PLANETS, planets };
}

export const setPlanets = (planets) => (dispatch) => {
  dispatch(setPlanetsAC(planets));
  dispatch(planetsInzDone());
}

export const getPlanetsData = () => async (dispatch) => {
  try {
    dispatch(setPlanetsLoading(true));
    const planets = await planetsAPI.getPlanets();
    dispatch(setPlanetsAC(planets));
    localStorage.setItem('swapi-planets', JSON.stringify(planets))
    dispatch(peopleInzDone())
  } catch (err) {
    dispatch(setError(err.message))
  } finally {
    dispatch(setPlanetsLoading(false));
  }
}

function addNewPlanetAC(planet) {
  return { type: ADD_NEW_PLANET, planet }
}

export const addNewPlanet = (planet) => (dispatch, getState) => {
  dispatch(addNewPlanetAC(planet));
  localStorage.setItem('swapi-planets', JSON.stringify(getState().planets))
}

function updatePlanetAC(planet) {
  return { type: UPDATE_PLANET, planet }
}

export const updatePlanet = (planet) => (dispatch, getState) => {
  dispatch(updatePlanetAC(planet));
  localStorage.setItem('swapi-planets', JSON.stringify(getState().planets));
}

function deletePlanetAC(id) {
  return { type: DELETE_PLANET, id };
}

export const deletePlanet = (id) => (dispatch, getState) => {
  dispatch(deletePlanetAC(id));
  localStorage.setItem('swapi-planets', JSON.stringify(getState().planets))
}

function changePlanetStatusAC(id) {
  return { type: CHANGE_PLANET_STATUS, id };
}

export const changePlanetStatus = (id) => (dispatch, getState) => {
  dispatch(changePlanetStatusAC(id));
  localStorage.setItem('swapi-planets', JSON.stringify(getState().planets))
}