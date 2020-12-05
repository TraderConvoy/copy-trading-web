import { TABLE_YOUR_HISTORY } from 'constant/datatable';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React, { useState } from 'react';
import Datatable from 'react-data-table-component';

const TableYourHistory = ({ data }) => {
  const [page, setPage] = useState(1);
  const pageItems = itemWithPage(page, 9, data);
  return (
    <div className="table-your-history">
      <Datatable
        className="copy-trade-table"
        noHeader={true}
        columns={TABLE_YOUR_HISTORY()}
        data={pageItems}
        paginationPerPage={10}
        responsive={true}
      />
      <Pagination page={page} perPage={9} count={data.length} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableYourHistory;
