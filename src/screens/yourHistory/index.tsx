import Loading from 'containers/components/Loading';
import useError from 'containers/hooks/useErrorContext';
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
  const { addError } = useError();
  const userInfo = useSelector((state: any) => state.screen.userInfo.userInfor);
  const listHistory = useSelector((state: any) => state.screen.userHistory.historyList);
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodate] = useState(new Date());
  const [profit, setProfit] = useState(0);
  const [loadingPage, setloadingPage] = useState(false);

  useEffect(() => {
    handleFilter();
  }, [page]);

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

  const onChangeTo = (e) => {
    setTodate(e);
  };

  const handleFilter = () => {
    try {
      if (moment().diff(fromDate, 'days') > 90) {
        addError((null as unknown) as Response, 'Please choose a date picker within 3 months');
        return;
      }
      if (!fromDate) {
        addError((null as unknown) as Response, 'Please select from date');
        return;
      }
      if (!toDate) {
        addError((null as unknown) as Response, 'Please select to date');
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
              <button className="filter-button" onClick={() => handleFilter()} disabled={loadingPage}>
                Search
              </button>
              <b>To:</b>
              <DatePicker
                required={true}
                onChange={onChangeTo}
                minDate={fromDate}
                // maxDate={new Date()}
                value={toDate}
              />{' '}
            </div>
            <div className="to-date">
              <b>From: </b>
              <DatePicker required={true} onChange={onChange} maxDate={toDate} value={fromDate} />{' '}
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
