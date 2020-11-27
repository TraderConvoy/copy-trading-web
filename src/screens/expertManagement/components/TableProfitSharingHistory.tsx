import { TABLE_PROFIT_SHARING_HISTORY } from 'constant/datatable';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React, { useState } from 'react';
import Datatable from 'react-data-table-component';

const TableProfitSharingHistory = ({ data }) => {
  const [page, setPage] = useState(1);
  const pageData = itemWithPage(page, 9, data);

  return (
    <div className="table-profit-sharing-history">
      <Datatable
        className="copy-trade-table"
        columns={TABLE_PROFIT_SHARING_HISTORY()}
        data={pageData}
        noHeader={true}
      />
      <Pagination page={page} perPage={9} data={data} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableProfitSharingHistory;
