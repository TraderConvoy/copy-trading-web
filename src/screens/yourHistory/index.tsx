import Pagination, { itemWithPage } from 'containers/components/Pagination';
import React, { useState } from 'react';
import TableYourHistory from './components/TableYourHistory';

const fakeData = {
  time: '18/11/2020 - 18:20:39',
  type: 'BTC/USDT',
  order: 'buy',
  open: '9,486.2 USDT',
  close: '9,658.3 USDT',
  investment: '100.00',
  profit: '+95 USD',
  profit_sharing: '-5 USD',
  leader: 'Donkin391',
  total_profit: '+90 USD',
};

const YourHistory = () => {
  const [page, setPage] = useState(1);
  const data = Array(220).fill(fakeData);
  return (
    <div className="your-history">
      <div className="your-history__header">
        <div className="title-wrapper">
          <p className="title">Your history</p>
        </div>
      </div>
      <div className="your-history__content">
        <TableYourHistory data={itemWithPage(page, 9, data)} />
        <Pagination page={page} perPage={9} data={data} pageChange={(page: number) => setPage(page)} />
      </div>
    </div>
  );
};

export default React.memo(YourHistory);
