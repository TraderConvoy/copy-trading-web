import Loading from 'containers/components/Loading';
import useError from 'containers/hooks/useErrorContext';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import TableLeaderHistory from 'screens/expertManagement/components/TableTradingHistory';
import LeaderInfo from './components/LeaderInfo';
import Overview from './components/Overview';
import { getLeaderDetailAction } from './redux/actions';

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

const LeaderDetail = () => {
  const [data, setData] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [tab, setTab] = useState(tabs.OVERVIEW);

  const dispatch = useDispatch();
  const history = useHistory();
  const { addError } = useError();
  const { leaderID }: any = useParams();

  const userId = '5fc70cadc982ed201cd6b6fb';

  useEffect(() => {
    handleGetLeaderDetail();
  }, []);

  const handleGetLeaderDetail = () => {
    setLoadingPage(true);
    const body = {
      id_user: userId,
      id_expert: leaderID,
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

  return (
    <Loading isLoading={loadingPage}>
      <div className="leader-detail">
        <div className="leader-detail__header">
          <div className="title-wrapper">
            <p onClick={() => history.push('/copy-tradding')}>Back</p>
          </div>
        </div>
        <div className="leader-detail__content">
          <LeaderInfo />
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
              {tab === tabs.OVERVIEW ? <Overview /> : null}
              {tab === tabs.LEADER_HISTORY ? <TableLeaderHistory data={Array(99).fill(fakeData)} /> : null}
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default React.memo(LeaderDetail);
