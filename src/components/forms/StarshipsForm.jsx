import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { starshipsColumns } from '../../services/starshipsService';
import { getAllStarships } from '../../store/selectors/starships';
import { addNewStarship, updateStarship } from '../../store/actions/starships';
import { set404error } from '../../store/actions/errors';
import validateArr from '../../utils/validation/starshipsForm';
import Input from '../common/Input';
import Button from '../common/Button';

const StarshipsForm = () => {
  const dispatch = useDispatch();
  const starships = useSelector((state) => getAllStarships(state));

  const history = useHistory();
  const match = useRouteMatch();
  const { pathname } = useLocation();

  const [formErrors, setFormErrors] = useState({});
  const [starshipData, setStarshipData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [starshipIdError, setStarshipIdError] = useState(false);

  // convert data for rendering
  const forRender = (starship) => {
    const renderStarship = { ...starship };
    const { passengers } = renderStarship;
    if (passengers === 'n/a') renderStarship.passengers = '';
    if (passengers.includes(',')) renderStarship.passengers = passengers.replace(',', '');
    return renderStarship;
  };

  // set starship data on componentDidMount
  useEffect(() => {
    const pathId = match.params.id;
    if (pathId === 'new') {
      const initialStarshipData = starshipsColumns.reduce((columns, columnName) => {
        columns[columnName] = '';
        return columns;
      }, {});
      setStarshipData(initialStarshipData);
    }

    const starship = starships && starships.find((starship) => starship.id === pathId);
    if (starship) {
      setStarshipData(forRender(starship));
    }
    if (!starship && pathId !== 'new') {
      setStarshipIdError(true);
      dispatch(set404error(pathname));
    }
    if (starship) setEditMode(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValidateFunc = (key) => {
    return validateArr[key] ? validateArr[key] : validateArr['default'];
  };

  // convert data for storing
  const forStore = (starship, newItem = false) => {
    const renderStarship = { ...starship };
    const { passengers } = renderStarship;
    if (passengers === '') renderStarship.passengers = 'n/a';
    if (newItem) {
      renderStarship.beloved = false;
      renderStarship.id = nanoid();
    }
    return renderStarship;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const errors = { ...formErrors };

    if (editMode) {
      dispatch(updateStarship(forStore(starshipData)));
      history.push('/starships');
    } else {
      if (Object.keys(formErrors).length === 0) {
        for (let key in starshipData) {
          const validateFunc = getValidateFunc(key);
          if (validateFunc(starshipData[key]) !== '') {
            errors[key] = validateFunc(starshipData[key]);
          }
        }
      }

      if (!Object.keys(errors).length) {
        dispatch(addNewStarship(forStore(starshipData, true)));
        history.push('/starships');
      } else setFormErrors(errors);
    }
  };

  const handleChange = ({ currentTarget: { value, name } }) => {
    const data = { ...starshipData };
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
    setStarshipData(data);
  };

  if (starshipIdError) return <Redirect to="/path_not_found" />;
  return (
    <form>
      {starshipsColumns.map((columnName) => (
        <Input
          key={columnName}
          name={columnName}
          label={columnName[0].toUpperCase() + columnName.slice(1)}
          value={starshipData[columnName] ? starshipData[columnName] : ''}
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

export default StarshipsForm;
