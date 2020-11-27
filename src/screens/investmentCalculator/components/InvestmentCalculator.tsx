import React from 'react';

const InvestmentCalculator = () => {
  return (
    <div className="investment-calculator-component">
      <div className="__header">
        <p className="title">Investment Calculator</p>
        <p className="sub">500 USD is minimum required deposit for this trader</p>
      </div>
      <div className="__search">
        <div className="item deposit-wrapper">
          <p>Deposit</p>
          <div className="search-wrapper">
            <p>USD</p>
            <input />
          </div>
        </div>
        <div className="item profitability-wrapper">
          <p>Profitability</p>
          <div className="search-wrapper">
            <p>%</p>
            <input />
          </div>
        </div>
        <div className="item investment-period-wrapper">
          <p>Investment period</p>
          <div className="tab-wrapper">
            <button className="tab">7 days</button>
            <button className="tab">1 months</button>
            <button className="tab active">2 months</button>
            <button className="tab">3 months</button>
            <button className="tab">6 months</button>
            <button className="tab">12 months</button>
          </div>
        </div>
      </div>
      <div className="__detail">
        <div className="item estimate-profit-wrapper">
          <p>Estimate profit</p>
          <p className="total">81 USD</p>
        </div>
        <div className="item estimate-profitability-wrapper">
          <p>Estimate profitability</p>
          <p className="total">12.15 %</p>
        </div>
        <div className="item profit-sharing-wrapper">
          <p>Profit sharing</p>
          <p className="total">4.05 USD</p>
        </div>
      </div>
      <div className="__button">
        <button>Calculate</button>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
