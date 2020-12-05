import { TABLE_TRANSFER_HISTORY } from 'constant/datatable';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React, { useState } from 'react';
import Datatable from 'react-data-table-component';

const TableTransferHistory = ({ data }) => {
  const [page, setPage] = useState(1);
  const pageItems = itemWithPage(page, 9, data);
  return (
    <div className="table-transfer-history">
      <Datatable className="copy-trade-table" columns={TABLE_TRANSFER_HISTORY()} data={pageItems} noHeader={true} />
      <Pagination page={page} perPage={9} count={data.length} pageChange={(page: number) => setPage(page)} />
    </div>
  );
};

export default TableTransferHistory;
