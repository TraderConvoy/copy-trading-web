import Loading from 'containers/components/Loading';
import useError from 'containers/hooks/useErrorContext';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ModalStartCopy from 'screens/dashboard/components/ModalStartCopy';
import LeaderInfo from './components/LeaderInfo';
import Overview from './components/Overview';
import TableLeaderHistory from './components/TableLeaderHistory';
import { getLeaderDetailAction, getLeaderHistoryAction } from './redux/actions';

const tabs = {
  OVERVIEW: 'overview',
  LEADER_HISTORY: 'leader_history',
};

const fakeData = {
  time: '18/11/2020 - 18:20:39',
  type: 'BTC/USDT',
  order: 'buy',
  open: '9,486.2 USDT',
  close: '9,658.3 USDT',
  investment: '100.00',
  profit: '+95 USD',
};

const LeaderDetail = (props) => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [tab, setTab] = useState(tabs.OVERVIEW);
  const dispatch = useDispatch();
  const history = useHistory();
  const { addError } = useError();
  const { leaderID }: any = useParams();
  const [page, setPage] = useState(1);
  const [transferHistoryLoading, setTransferHistoryLoading] = useState(true);
  const expertInfo = useSelector((state: any) => state.screen.leaderDetail.expertDetail.data);
  const leaderHistory = useSelector((state: any) => state.screen.leaderDetail.leaderHistory);
  const expertDetail = {
    expert: expertInfo?.result,
  };
  const [showModalSC, setShowModalStartSC] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [toDate, setTodate] = useState(new Date());
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    handleGetExpertHistory();
    handleGetLeaderDetail();
  }, []);

  useEffect(() => {
    if (tab === tabs.LEADER_HISTORY) {
      handleGetExpertHistory();
    }
  }, [page]);

  const handleGetExpertHistory = () => {
    setTransferHistoryLoading(true);
    dispatch(
      getLeaderHistoryAction(
        {
          id_expert: leaderID,
          page,
          size: 50,
          fromDate: moment(fromDate).utc().format('YYYY-MM-DD HH:mm:ss'),
          toDate: moment(toDate).utc().format('YYYY-MM-DD HH:mm:ss'),
        },
        () => {
          setTransferHistoryLoading(false);
        },
      ),
    );
  };

  const handleGetLeaderDetail = () => {
    setLoadingPage(true);
    const body = {
      _id: leaderID,
    };
    dispatch(
      getLeaderDetailAction(body, (err, res) => {
        if (err) addError(err, null);
        else {
          console.log(res);
          setLoadingPage(false);
        }
      }),
    );
  };
  const closeModalSC = () => {
    setShowModalStartSC(false);
  };
  const setShowModalStart = () => {
    setShowModalStartSC(true);
  };

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
      handleGetExpertHistory();
      /*dispatch(
        getUserHistoryAction({ id_user: userInfo._id, page: page, size: 50, fromDate, toDate: new Date() }, (res) => {
          setloadingPage(false);
          console.log(res);
        }),
      );*/
    } catch (error) {
      setLoadingPage(false);
    }
  };

  return (
    <Loading isLoading={loadingPage}>
      <div className="leader-detail">
        <div className="leader-detail__header">
          <div className="title-wrapper">
            <p onClick={() => history.push('/copy-trading/top-leaders')}>Back</p>
          </div>
        </div>
        <div className="leader-detail__content">
          {showModalSC && (
            <ModalStartCopy
              detail={expertDetail}
              isOpen={showModalSC}
              closeModal={closeModalSC}
              setShowModalTf={false}
            />
          )}
          {expertInfo && <LeaderInfo setShowModalStart={setShowModalStart} expertInfo={expertInfo} />}
          <div className="tab-wrapper">
            <div className="tab-names">
              <p className={`tab ${tab === tabs.OVERVIEW ? 'active' : ''}`} onClick={() => setTab(tabs.OVERVIEW)}>
                Overview
              </p>
              <p
                className={`tab ${tab === tabs.LEADER_HISTORY ? 'active' : ''}`}
                onClick={() => setTab(tabs.LEADER_HISTORY)}
              >
                Leader History
              </p>
            </div>
            <div className="tab-content">
              {tab === tabs.OVERVIEW && expertInfo && <Overview id_expert={leaderID} />}
              {tab === tabs.LEADER_HISTORY && leaderHistory && (
                <>
                  <div>
                    <Row>
                      <Col>
                        <div className="profit-count">
                          <h5>
                            Profit:{' '}
                            {leaderHistory?.profit && (
                              <NumberFormat
                                thousandSeparator={true}
                                displayType="text"
                                prefix={'$'}
                                decimalScale={2}
                                value={leaderHistory?.profit[0]?.profit}
                              />
                            )}
                          </h5>
                        </div>
                        <div className="from-date">
                          <button
                            className="filter-button"
                            onClick={() => handleFilter()}
                            disabled={transferHistoryLoading}
                          >
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
                  </div>
                  <Loading isLoading={transferHistoryLoading}>
                    <TableLeaderHistory data={leaderHistory} setPage={setPage} page={page} />
                  </Loading>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default React.memo(LeaderDetail);
