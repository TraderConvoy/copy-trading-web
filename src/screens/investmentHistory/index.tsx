import React from 'react';
import InvestmentHistoryItem from './components/InvestmentHistoryItem';

const InvestmentHistory = () => {
  return (
    <div className="investment-history">
      <div className="investment-history__header">
        <div className="title-wrapper">
          <p className="title">Investment History</p>
        </div>
      </div>
      <div className="investment-history__content">
        <div className="history-wrapper">
          <InvestmentHistoryItem running={true} />
          <InvestmentHistoryItem />
          <InvestmentHistoryItem running={true} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(InvestmentHistory);
