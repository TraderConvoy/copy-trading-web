import { TABLE_LEADER_HISTORY } from 'constant/datatable';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React from 'react';
import Datatable from 'react-data-table-component';

const TableTradingHistory = ({ data, setPage, page }) => {
  const pageData = itemWithPage(page, 50, data.data);
  return (
    <div className="table-trading-history">
      <Datatable
        className={data.length > 0 ? 'copy-trade-table' : 'rdt_Table_none'}
        columns={TABLE_LEADER_HISTORY()}
        data={pageData}
        noHeader={true}
      />
      <Pagination page={page} perPage={50} count={data.length} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableTradingHistory;
