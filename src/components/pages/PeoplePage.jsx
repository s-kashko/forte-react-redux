import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPeople } from '../../store/selectors/people';
import { deletePerson, changePersonStatus } from '../../store/actions/people';
import Table from '../common/Table';
import Preloader from '../common/Preloader/Preloader';

const PeoplePage = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => getAllPeople(state));
  const peopleLoading = useSelector((state) => state.loading.peopleLoading);
  const peopleInitializing = useSelector((state) => state.loading.peopleInitializing);

  const handlePersonStatus = (id) => {
    dispatch(changePersonStatus(id));
  };

  const handleDelete = (id) => {
    dispatch(deletePerson(id));
  };

  const getColumns = () => {
    if (!people.length) return [];

    return Object.keys(people[0]).map((colName) => {
      if (colName === 'beloved') {
        return {
          colName,
          content: ({ beloved, id }) => (
            <input type="checkbox" checked={beloved} onChange={() => handlePersonStatus(id)} />
          ),
        };
      }
      if (colName === 'name') {
        return {
          colName,
          content: ({ name, id }) => (
            <Link style={{ color: '#ffc107' }} to={`/people/${id}`}>
              {name}
            </Link>
          ),
        };
      }
      return { colName };
    });
  };

  return (
    <div>
      <h3>People from Star Wars Universe</h3>
      <Link to={'/people/new'} className="btn btn-warning" style={{ marginBottom: 25 }}>
        New Person
      </Link>
      <Table
        columns={getColumns()}
        data={Object.values(people)}
        tableDescriptor="People"
        onDelete={handleDelete}
        isLoading={peopleLoading}
        isInitializing={peopleInitializing}
      />
      {peopleLoading && <Preloader marginTop="20px" />}
    </div>
  );
};

export default PeoplePage;
