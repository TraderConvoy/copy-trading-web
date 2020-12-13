import Loading from 'containers/components/Loading';
import useToastContext from 'containers/hooks/useToastContext';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import TableYourHistory from './components/TableYourHistory';
import { getUserHistoryAction } from './ducks/actions';
const YourHistory = () => {
  const dispatch = useDispatch();
  const { addToast } = useToastContext();
  const userInfo = useSelector((state: any) => state.screen.userInfo.userInfor);
  const listHistory = useSelector((state: any) => state.screen.userHistory.historyList);
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState(new Date());
  const [profit, setProfit] = useState(0);
  const [loadingPage, setloadingPage] = useState(false);
  useEffect(() => {
    try {
      if (moment().diff(fromDate, 'days') > 90) {
        addToast('Please choose a date picker within 3 months');
        return;
      }
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

  useEffect(() => {
    if (listHistory?.profit.length !== 0) {
      setProfit(listHistory?.profit[0].profit);
    } else {
      setProfit(0);
    }
  }, [listHistory]);
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
            <div className="profit-count">
              <h5>
                Profit:{' '}
                {listHistory?.profit && (
                  <NumberFormat
                    thousandSeparator={true}
                    displayType="text"
                    prefix={'$'}
                    decimalScale={2}
                    value={profit}
                  />
                )}
              </h5>
            </div>
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
