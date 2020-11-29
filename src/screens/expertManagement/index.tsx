import { UrlImagesContext } from 'containers/contexts/UrlImagesContext';
import React, { useContext, useState } from 'react';
import TableProfitSharingHistory from './components/TableProfitSharingHistory';
import TableTradingHistory from './components/TableTradingHistory';

const tabs = {
  TRADING_HISTORY: 'trading_history',
  PROFIT_SHARING_HISTORY: 'profit_sharing_history',
};

const fakeTradingHistory = {
  time: '18/11/2020 - 18:20:39',
  type: 'BTC/USDT',
  order: 'buy',
  open: '9,486.2 USDT',
  close: '9,658.3 USDT',
  investment: '100.00',
  profit: '+95 USD',
};

const fakeProfitSharingHistory = {
  time: '18/11/2020 - 18:20:39',
  type: 'BTC/USDT',
  order: 'buy',
  open: '9,486.2 USDT',
  close: '9,658.3 USDT',
  investment: '100.00',
  profit_sharing: '+5 USD',
  username: 'Donkin391',
};

const ExpertManagement = () => {
  const [tab, setTab] = useState(tabs.TRADING_HISTORY);
  const urlImg = useContext(UrlImagesContext);

  const fakeDataTradingHistory = Array(80).fill(fakeTradingHistory);
  const fakeDataProfitSharingHistory = Array(90).fill(fakeProfitSharingHistory);

  return (
    <div className="expert-management">
      <div className="expert-management__header">
        <div className="title-wrapper">
          <p className="title">Expert Management</p>
        </div>
      </div>
      <div className="expert-management__content">
        <div className="card-wrapper">
          <div className="start-copy-trade">
            <img src={`${urlImg}icons/start-copy-trade.svg`} />
            <p>Start copy trade now to receive profit from all Copier who copy your trade</p>
            <button>Start copy trade</button>
          </div>
          <div className="withdrawal">
            <img src={`${urlImg}icons/withdrawal.svg`} />
            <div className="detail">
              <p>Total 5% profit sharing</p>
              <p className="total">$ 2116</p>
            </div>
            <button>withdrawal</button>
          </div>
        </div>
        <div className="tab-wrapper">
          <div className="tab__name">
            <p
              className={`name ${tab === tabs.TRADING_HISTORY ? 'active' : ''}`}
              onClick={() => setTab(tabs.TRADING_HISTORY)}
            >
              Trading history
            </p>
            <p
              className={`name ${tab === tabs.PROFIT_SHARING_HISTORY ? 'active' : ''}`}
              onClick={() => setTab(tabs.PROFIT_SHARING_HISTORY)}
            >
              Profit sharing history
            </p>
          </div>
          <div className="tab__content">
            {tab === tabs.TRADING_HISTORY ? <TableTradingHistory data={fakeDataTradingHistory} /> : null}
            {tab === tabs.PROFIT_SHARING_HISTORY ? (
              <TableProfitSharingHistory data={fakeDataProfitSharingHistory} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExpertManagement);
