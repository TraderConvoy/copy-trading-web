import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableLeaderHistory from 'screens/expertManagement/components/TableTradingHistory';
import LeaderInfo from './components/LeaderInfo';
import Overview from './components/Overview';

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
  const [tab, setTab] = useState(tabs.OVERVIEW);
  const history = useHistory();

  return (
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
  );
};

export default React.memo(LeaderDetail);
