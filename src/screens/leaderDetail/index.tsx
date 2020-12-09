import Loading from 'containers/components/Loading';
import useError from 'containers/hooks/useErrorContext';
import React, { useEffect, useState } from 'react';
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
  useEffect(() => {
    dispatch(
      getLeaderHistoryAction({ id_expert: leaderID, page: page, size: 50 }, () => {
        setTransferHistoryLoading(false);
      }),
    );
    handleGetLeaderDetail();
  }, []);

  useEffect(() => {
    if (tab === tabs.LEADER_HISTORY) {
      dispatch(
        getLeaderHistoryAction({ page: page, size: 50 }, () => {
          setTransferHistoryLoading(false);
        }),
      );
    }
  }, [page]);

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
              {tab === tabs.OVERVIEW && expertInfo && <Overview data={expertInfo} />}
              {tab === tabs.LEADER_HISTORY && leaderHistory && (
                <TableLeaderHistory data={leaderHistory} setPage={setPage} page={page} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default React.memo(LeaderDetail);
