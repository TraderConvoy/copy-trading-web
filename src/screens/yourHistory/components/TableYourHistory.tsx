import { TABLE_YOUR_HISTORY } from 'constant/datatable';
import Pagination from 'containers/components/Pagination';
import React from 'react';
import Datatable from 'react-data-table-component';

const TableYourHistory = ({ data, setPage, page }) => {
  return (
    <div className="table-your-history">
      <Datatable
        className={data.length > 0 ? 'copy-trade-table' : 'rdt_Table_none'}
        noHeader={true}
        columns={TABLE_YOUR_HISTORY()}
        data={data?.data}
        paginationPerPage={50}
        responsive={true}
      />
      <Pagination page={page} perPage={50} count={data.count} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableYourHistory;
