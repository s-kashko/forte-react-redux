import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlanets } from '../../store/selectors/planets';
import { deletePlanet, changePlanetStatus } from '../../store/actions/planets';
import Table from '../common/Table';
import Preloader from '../common/Preloader/Preloader';

const PlanetsPage = () => {
  const dispatch = useDispatch();
  const planets = useSelector((state) => getAllPlanets(state));
  const planetsLoading = useSelector((state) => state.loading.planetsLoading);
  const planetsInitializing = useSelector((state) => state.loading.planetsInitializing);

  const handlePlanetStatus = (id) => {
    dispatch(changePlanetStatus(id));
  };

  const handleDelete = (id) => {
    dispatch(deletePlanet(id));
  };

  const getColumns = () => {
    if (!planets.length) return [];

    return Object.keys(planets[0]).map((colName) => {
      if (colName === 'beloved') {
        return {
          colName,
          content: ({ beloved, id }) => (
            <input type="checkbox" checked={beloved} onChange={() => handlePlanetStatus(id)} />
          ),
        };
      }
      if (colName === 'name') {
        return {
          colName,
          content: ({ name, id }) => (
            <Link style={{ color: '#ffc107' }} to={`/planets/${id}`}>
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
      <h3>Planets from Star Wars Universe</h3>
      <Link to={'/planets/new'} className="btn btn-warning" style={{ marginBottom: 25 }}>
        New Planet
      </Link>
      <Table
        columns={getColumns()}
        data={Object.values(planets)}
        tableDescriptor="Planets"
        onDelete={handleDelete}
        isLoading={planetsLoading}
        isInitializing={planetsInitializing}
      />
      {planetsLoading && <Preloader marginTop="20px" />}
    </div>
  );
};

export default PlanetsPage;
