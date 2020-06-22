import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStarships } from '../../store/selectors/starships';
import { deleteStarship, changeStarshipStatus } from '../../store/actions/starships';
import Table from '../common/Table';
import Preloader from '../common/Preloader/Preloader';

const StarshipsPage = () => {
  const dispatch = useDispatch();
  const starships = useSelector((state) => getAllStarships(state));
  const starshipsLoading = useSelector((state) => state.loading.starshipsLoading);
  const starshipsInitializing = useSelector((state) => state.loading.starshipsInitializing);

  const handleBelovedStatus = (id) => {
    dispatch(changeStarshipStatus(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteStarship(id));
  };

  const getColumns = () => {
    if (!starships.length) return [];

    return Object.keys(starships[0]).map((colName) => {
      if (colName === 'beloved') {
        return {
          colName,
          content: ({ beloved, id }) => (
            <input type="checkbox" checked={beloved} onChange={() => handleBelovedStatus(id)} />
          ),
        };
      }
      if (colName === 'name') {
        return {
          colName,
          content: ({ name, id }) => (
            <Link style={{ color: '#ffc107' }} to={`/starships/${id}`}>
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
      <h3>Starships from Star Wars Universe</h3>
      <Link to={'/starships/new'} className="btn btn-warning" style={{ marginBottom: 25 }}>
        New Starship
      </Link>
      <Table
        columns={getColumns()}
        data={Object.values(starships)}
        tableDescriptor="Starships"
        onDelete={handleDelete}
        isLoading={starshipsLoading}
        isInitializing={starshipsInitializing}
      />
      {starshipsLoading && <Preloader marginTop="20px" />}
    </div>
  );
};

export default StarshipsPage;
