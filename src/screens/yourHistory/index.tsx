import Loading from 'containers/components/Loading';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import TableYourHistory from './components/TableYourHistory';
import { getUserHistoryAction } from './ducks/actions';
const YourHistory = () => {
  const dispatch = useDispatch();
  // const data = Array(220).fill(fakeData);
  const userInfo = useSelector((state: any) => state.screen.userInfo.userInfor);
  const listHistory = useSelector((state: any) => state.screen.userHistory.historyList);
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState(new Date());
  const [loadingPage, setloadingPage] = useState(false);
  useEffect(() => {
    try {
      setloadingPage(true);
      dispatch(
        getUserHistoryAction({ id_user: userInfo._id, page: page, size: 50, fromDate, toDate: new Date() }, (res) => {
          setloadingPage(false);
          console.log(res);
        }),
      );
    } catch (error) {
      setloadingPage(false);
    }
  }, [page, fromDate]);
  const onChange = (e) => {
    setFromDate(e);
  };
  return (
    <div className="your-history">
      <div className="your-history__header">
        <div className="title-wrapper">
          <p className="title">Your history</p>
        </div>
      </div>
      <div className="your-history__content">
        <Row>
          <Col>
            {/* <div className="profit-count">
              <h5>
                Profit:{' '}
                {listHistory?.profit && (
                  <NumberFormat
                    thousandSeparator={true}
                    displayType="text"
                    prefix={'$'}
                    decimalScale={2}
                    value={listHistory?.profit[0]?.profit}
                  />
                )}
              </h5>
            </div> */}
            <div className="from-date">
              <b>To:</b>
              <DatePicker disabled value={new Date()} />{' '}
            </div>
            <div className="to-date">
              <b>From: </b>
              <DatePicker onChange={onChange} value={fromDate} />{' '}
            </div>
          </Col>
        </Row>
        <Loading isLoading={loadingPage}>
          {listHistory?.data && <TableYourHistory data={listHistory?.data} setPage={setPage} page={page} />}
        </Loading>
      </div>
    </div>
  );
};

export default React.memo(YourHistory);
