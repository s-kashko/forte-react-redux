import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { peopleColumns } from '../../services/peopleService';
import { getAllPeople } from '../../store/selectors/people';
import { addNewPerson, updatePerson } from '../../store/actions/people';
import { set404error } from '../../store/actions/errors';
import validateArr from '../../utils/validation/peopleForm';
import Input from '../common/Input';
import Button from '../common/Button';

const PeopleForm = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => getAllPeople(state));
  const { pathname } = useLocation();

  const history = useHistory();
  const match = useRouteMatch();

  const [formErrors, setFormErrors] = useState({});
  const [personData, setPersonData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [personIdError, setPersonIdError] = useState(false);

  // convert data for rendering
  const forRender = (person) => {
    const renderPerson = { ...person };
    const { birth_year, gender } = renderPerson;
    if (birth_year === 'unknown') {
      renderPerson.birth_year = '';
    } else renderPerson.birth_year = birth_year.replace('BBY', '');
    if (gender === 'n/a') renderPerson.gender = '';
    return renderPerson;
  };
  // set person data on componentDidMount
  useEffect(() => {
    const pathId = match.params.id;
    if (pathId === 'new') {
      const initialPersonData = peopleColumns.reduce((columns, columnName) => {
        columns[columnName] = '';
        return columns;
      }, {});
      setPersonData(initialPersonData);
    }

    const person = people?.find((person) => person.id === pathId);
    if (person) {
      setPersonData(forRender(person));
      setEditMode(true);
    }
    if (!person && pathId !== 'new') {
      setPersonIdError(true);
      dispatch(set404error(pathname));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValidateFunc = (key) => {
    return validateArr[key] ? validateArr[key] : validateArr['default'];
  };

  // convert data for storing
  const forStore = (person, newItem = false) => {
    const storePerson = { ...person };
    const { birth_year, gender } = storePerson;
    if (gender === '') storePerson.gender = 'n/a';
    if (birth_year === '' || birth_year === 'unknown') {
      storePerson.birth_year = 'unknown';
    } else storePerson.birth_year = birth_year + 'BBY';
    if (newItem) {
      storePerson.beloved = false;
      storePerson.id = nanoid();
    }
    return storePerson;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const errors = { ...formErrors };

    if (editMode) {
      dispatch(updatePerson(forStore(personData)));
      history.push('/people');
    } else if (Object.keys(formErrors).length === 0) {
      for (let key in personData) {
        const validateFunc = getValidateFunc(key);
        if (validateFunc(personData[key]) !== '') {
          errors[key] = validateFunc(personData[key]);
        }
      }

      if (!Object.keys(errors).length) {
        dispatch(addNewPerson(forStore(personData, true)));
        history.push('/people');
      } else setFormErrors(errors);
    }
  };

  const handleChange = ({ currentTarget: { value, name } }) => {
    const data = { ...personData };
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
    setPersonData(data);
  };

  if (personIdError) return <Redirect to="/path_not_found" />;
  return (
    <form>
      {peopleColumns.map((columnName) => (
        <Input
          key={columnName}
          name={columnName}
          label={columnName[0].toUpperCase() + columnName.slice(1)}
          value={personData[columnName] ? personData[columnName] : ''}
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

export default PeopleForm;
