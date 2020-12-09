import { TABLE_YOUR_HISTORY } from 'constant/datatable';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React from 'react';
import Datatable from 'react-data-table-component';

const TableYourHistory = ({ data, setPage, page }) => {
  const pageItems = itemWithPage(page, 50, data);
  return (
    <div className="table-your-history">
      <Datatable
        className="copy-trade-table"
        noHeader={true}
        columns={TABLE_YOUR_HISTORY()}
        data={pageItems}
        paginationPerPage={50}
        responsive={true}
      />
      <Pagination page={page} perPage={50} count={data.count} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableYourHistory;
