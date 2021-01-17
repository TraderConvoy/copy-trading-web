import Loading from 'containers/components/Loading';
import useError from 'containers/hooks/useErrorContext';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { formatter } from 'utils/utilities';
import TableYourCommission from './components/TableYourCommission';
import { getUserCommissionAction } from './ducks/actions';
const YourCommission = () => {
  const dispatch = useDispatch();
  const { addError } = useError();
  const userInfo = useSelector((state: any) => state.screen.userInfo.userInfor);
  const listCommission = useSelector((state: any) => state.screen.userCommission.commissionList);
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 31)));
  const [toDate, setTodate] = useState(new Date());
  const [totalAmountWithdraw, setTotalAmountWithdraw] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [loadingPage, setloadingPage] = useState(false);

  useEffect(() => {
    handleFilter();
  }, [page]);

  useEffect(() => {
    console.log(listCommission, "listCommission");
    setTotalAmountWithdraw(listCommission?.totalAmountWithdraw);
    setTotalWithdraw(listCommission?.totalWithdraw);
  }, [listCommission]);

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
      // console.log(userInfo, "userInfo");
      dispatch(
        getUserCommissionAction(
          {
            id_user: userInfo.id_user_trading,
            page,
            size: 50,
            fromDate: moment(fromDate).utc().format('YYYY-MM-DD HH:mm:ss'),
            toDate: moment(toDate).utc().format('YYYY-MM-DD HH:mm:ss'),
          },
          (res) => {
            setloadingPage(false);
            console.log(res);
          },
        ),
      );
    } catch (error) {
      setloadingPage(false);
    }
  };

  return (
    <div className="your-history">
      <div className="your-history__header">
        <div className="title-wrapper">
          <p className="title">Your Commission</p>
        </div>
      </div>
      <div className="your-history__content">
        <Row>
          <Col>
            <div className="profit-count">
              <h5>Commission: {listCommission?.totalAmountWithdraw && formatter.format(totalAmountWithdraw)} USD</h5>
              <h5>Total: {listCommission?.totalWithdraw && formatter.format(totalWithdraw)} USD</h5>
            </div>
            <div className="from-date" style={{ marginTop: 10 }}>
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
              />
            </div>
            <div className="to-date" style={{ marginTop: 10 }}>
              <b>From: </b>
              <DatePicker required={true} onChange={onChange} maxDate={toDate} value={fromDate} />{' '}
            </div>
          </Col>
        </Row>
        <Loading isLoading={loadingPage}>
          {listCommission?.data && <TableYourCommission data={listCommission} setPage={setPage} page={page} />}
        </Loading>
      </div>
    </div>
  );
};

export default React.memo(YourCommission);
