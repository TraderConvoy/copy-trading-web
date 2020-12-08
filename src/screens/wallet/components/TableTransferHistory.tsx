import { TABLE_TRANSFER_HISTORY } from 'constant/datatable';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React from 'react';
import Datatable from 'react-data-table-component';

const TableTransferHistory = ({ walletHistory, setPage, page }) => {
  const pageItems = itemWithPage(page, 50, walletHistory.data);
  return (
    <div className="table-transfer-history">
      <Datatable className="copy-trade-table" columns={TABLE_TRANSFER_HISTORY()} data={pageItems} noHeader={true} />
      <Pagination page={page} perPage={50} count={walletHistory.count} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableTransferHistory;
