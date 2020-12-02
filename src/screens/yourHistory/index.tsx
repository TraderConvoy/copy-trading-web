import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableYourHistory from './components/TableYourHistory';
import { getUserHistoryAction } from './ducks/actions';

// const fakeData = {
//   time: '18/11/2020 - 18:20:39',
//   type: 'BTC/USDT',
//   order: 'buy',
//   open: '9,486.2 USDT',
//   close: '9,658.3 USDT',
//   investment: '100.00',
//   profit: '+95 USD',
//   profit_sharing: '-5 USD',
//   leader: 'Donkin391',
//   total_profit: '+90 USD',
// };

const initPage = {
  count: '',
  current: 1,
  pageSize: 20,
};

const YourHistory = () => {
  const dispatch = useDispatch();
  // const data = Array(220).fill(fakeData);
  const listHistory = useSelector((state: any) => state.screen.userHistory.historyList);
  const [pagination, setPagination] = useState(initPage);
  useEffect(() => {
    dispatch(
      getUserHistoryAction(
        { id_user: '5fc70cadc982ed201cd6b6fa', page: pagination.current, size: pagination.pageSize },
        (res) => {
          console.log(res);
        },
      ),
    );
  }, []);
  return (
    <div className="your-history">
      <div className="your-history__header">
        <div className="title-wrapper">
          <p className="title">Your history</p>
        </div>
      </div>
      <div className="your-history__content">
        <TableYourHistory data={listHistory} />
      </div>
    </div>
  );
};

export default React.memo(YourHistory);
