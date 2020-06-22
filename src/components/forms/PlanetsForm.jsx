import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useHistory, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { planetsColumns } from '../../services/planetsService';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlanets } from '../../store/selectors/planets';
import { addNewPlanet, updatePlanet } from '../../store/actions/planets';
import { set404error } from '../../store/actions/errors';
import validateArr from '../../utils/validation/planetsForm';
import Input from '../common/Input';
import Button from '../common/Button';

const PlanetsForm = () => {
  const dispatch = useDispatch();
  const planets = useSelector((state) => getAllPlanets(state));

  const history = useHistory();
  const match = useRouteMatch();
  const { pathname } = useLocation();

  const [formErrors, setFormErrors] = useState({});
  const [planetData, setPlanetData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [planetIdError, setPlanetIdError] = useState(false);

  // convert data for rendering
  const forRender = (planet) => {
    const renderPlanet = { ...planet };
    const { population } = renderPlanet;
    if (population === 'unknown') renderPlanet.population = '';
    return renderPlanet;
  };

  // set planet data on componentDidMount
  useEffect(() => {
    const pathId = match.params.id;
    if (pathId === 'new') {
      const initialPlanetData = planetsColumns.reduce((columns, columnName) => {
        columns[columnName] = '';
        return columns;
      }, {});
      setPlanetData(initialPlanetData);
    }

    const planet = planets && planets.find((planet) => planet.id === pathId);
    if (planet) {
      setPlanetData(forRender(planet));
      setEditMode(true);
    }
    if (!planet && pathId !== 'new') {
      setPlanetIdError(true);
      dispatch(set404error(pathname));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValidateFunc = (key) => {
    return validateArr[key] ? validateArr[key] : validateArr['default'];
  };

  // convert data for storing
  const forStore = (planet, newItem = false) => {
    const storePlanet = { ...planet };
    const { population } = storePlanet;
    if (population === '') storePlanet.population = 'unknown';
    if (newItem) {
      storePlanet.beloved = false;
      storePlanet.id = nanoid();
    }
    return storePlanet;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const errors = { ...formErrors };

    if (editMode) {
      dispatch(updatePlanet(forStore(planetData)));
      history.push('/planets');
    } else {
      if (Object.keys(formErrors).length === 0) {
        for (let key in planetData) {
          const validateFunc = getValidateFunc(key);
          if (validateFunc(planetData[key]) !== '') {
            errors[key] = validateFunc(planetData[key]);
          }
        }
      }

      if (!Object.keys(errors).length) {
        dispatch(addNewPlanet(forStore(planetData, true)));
        history.push('/planets');
      } else setFormErrors(errors);
    }
  };

  const handleChange = ({ currentTarget: { value, name } }) => {
    const data = { ...planetData };
    const validateFunc = getValidateFunc(name);

    const currentError = validateFunc(value);

    if (currentError) {
      const errors = { ...formErrors, [name]: currentError };
      setFormErrors(errors);
    }

    if (formErrors[name] && !currentError) {
      const errors = { ...formErrors };
      delete errors[name];
      setFormErrors(errors);
    }

    data[name] = value;
    setPlanetData(data);
  };

  if (planetIdError) return <Redirect to="/path_not_found" />;
  return (
    <form>
      {planetsColumns.map((columnName) => (
        <Input
          key={columnName}
          name={columnName}
          label={columnName[0].toUpperCase() + columnName.slice(1)}
          value={planetData[columnName] ? planetData[columnName] : ''}
          type={columnName === 'beloved' ? 'checkbox' : 'input'}
          error={formErrors[columnName]}
          onChange={(event) => handleChange(event)}
        />
      ))}
      <Button
        onClick={onSubmit}
        label="Save"
        disabled={Object.keys(formErrors).length}
        classes="btn btn-dark"
      />
    </form>
  );
};

export default PlanetsForm;
