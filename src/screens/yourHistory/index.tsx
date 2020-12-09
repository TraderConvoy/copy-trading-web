import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableYourHistory from './components/TableYourHistory';
import { getUserHistoryAction } from './ducks/actions';

const YourHistory = () => {
  const dispatch = useDispatch();
  // const data = Array(220).fill(fakeData);
  const userInfo = useSelector((state: any) => state.screen.userInfo.userInfor);
  const listHistory = useSelector((state: any) => state.screen.userHistory.historyList);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(
      getUserHistoryAction({ id_user: userInfo._id, page: page, size: 50 }, (res) => {
        console.log(res);
      }),
    );
  }, [page]);
  return (
    <div className="your-history">
      <div className="your-history__header">
        <div className="title-wrapper">
          <p className="title">Your history</p>
        </div>
      </div>
      <div className="your-history__content">
        {listHistory && <TableYourHistory data={listHistory} setPage={setPage} page={page} />}
      </div>
    </div>
  );
};

export default React.memo(YourHistory);
