import React from 'react';
import { nanoid } from 'nanoid';
import Button from './Button';
import './Table.css';

const Table = ({ columns, data, onDelete, tableDescriptor, isLoading, isInitializing }) => {
  const createKey = (value) => {
    return value + nanoid();
  };

  const renderCell = (item, column) =>
    column.content ? column?.content(item) : item[column.colName];

  if (!data?.length && !isLoading && !isInitializing) {
    return <h4>There is no data for {tableDescriptor}</h4>;
  }

  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">{tableDescriptor}</th>
          {columns.map((column) => (
            <th key={createKey(column.colName)} scope="col" className="cellHeader">
              {column.colName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={createKey(item.name)}>
            <th scope="row">{++index}</th>
            {columns.map((column) => {
              return (
                <td key={createKey(item.name)} className="tableCell">
                  {renderCell(item, column)}
                </td>
              );
            })}
            <td>
              <Button onClick={() => onDelete(item.id)} classes="btn btn-danger" label="Delete" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
