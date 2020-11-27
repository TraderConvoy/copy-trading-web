import { TABLE_YOUR_HISTORY } from 'constant/datatable';
import React from 'react';
import Datatable from 'react-data-table-component';

const TableYourHistory = ({ data }) => {
  return (
    <div className="table-your-history">
      <Datatable
        className="copy-trade-table"
        noHeader={true}
        columns={TABLE_YOUR_HISTORY()}
        data={data}
        paginationPerPage={10}
      />
    </div>
  );
};

export default TableYourHistory;
