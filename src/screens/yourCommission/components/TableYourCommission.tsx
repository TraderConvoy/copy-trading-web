import { TABLE_YOUR_COMMISSION } from 'constant/datatable';
import Pagination from 'containers/components/Pagination';
import React from 'react';
import Datatable from 'react-data-table-component';

const TableYourCommission = ({ data, setPage, page }) => {
  return (
    <div className="table-your-commission">
      <Datatable
        className={data.length > 0 ? 'copy-trade-table' : 'rdt_Table_none'}
        noHeader={true}
        columns={TABLE_YOUR_COMMISSION()}
        data={data?.data}
        paginationPerPage={50}
        responsive={true}
      />
      <Pagination page={page} perPage={50} count={data.count} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableYourCommission;
