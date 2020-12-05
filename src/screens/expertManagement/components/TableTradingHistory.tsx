import { TABLE_TRADING_HISTORY } from 'constant/datatable';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React, { useState } from 'react';
import Datatable from 'react-data-table-component';

const TableTradingHistory = ({ data }) => {
  const [page, setPage] = useState(1);
  const pageData = itemWithPage(page, 9, data);

  return (
    <div className="table-trading-history">
      <Datatable className="copy-trade-table" columns={TABLE_TRADING_HISTORY()} data={pageData} noHeader={true} />
      <Pagination page={page} perPage={9} count={data.length} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableTradingHistory;
