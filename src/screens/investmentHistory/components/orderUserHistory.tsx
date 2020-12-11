import { ORDER_USER_HISTORY } from 'constant/datatable';
import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React from 'react';
import Datatable from 'react-data-table-component';
const OrderUserHistory = ({ data, setPageOrder, pageOrder }) => {
  const pageData = itemWithPage(pageOrder, 50, data.data);
  return (
    <div className="table-trading-history">
      <Datatable className="copy-trade-table" columns={ORDER_USER_HISTORY()} data={pageData} noHeader={true} />
      <Pagination page={pageOrder} perPage={50} count={data.length} pageChange={(page: number) => setPageOrder(page)} />
    </div>
  );
};

export default OrderUserHistory;
