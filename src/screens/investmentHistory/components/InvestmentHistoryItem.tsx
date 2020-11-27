import { ButtonPause, ButtonStart, ButtonStop } from 'containers/components/Buttons';
import React from 'react';

const InvestmentHistoryItem = ({ running = false }) => {
  return (
    <div className="investment-history-item">
      <div className="info-wrapper">
        <div className="wrapper-left">
          <div className="avatar" />
        </div>
        <div className="wrapper-right">
          <div className="name-wrapper">
            <p className="name">ManhDung225</p>
            <p className="sub">
              <span className="expert">Expert</span>
              <span className="percent">5%</span>
              Profit sharing
            </p>
          </div>
        </div>
      </div>
      <div className="detail-wrapper">
        <div className="detail-item">
          <p className="name">Gain last time</p>
          <p className="value">+8%</p>
        </div>
        <div className="detail-item">
          <p className="name">Amount of investment</p>
          <p className="value">500 USD</p>
        </div>
        <div className="detail-item">
          <p className="name">Current balance</p>
          <p className="value">540 USD</p>
        </div>
      </div>
      <div className="button-wrapper">
        <div className="button-wrapper__button">
          <ButtonStop />
          {running ? <ButtonPause /> : <ButtonStart />}
        </div>
        <div className="button-wrapper__sub">
          <p>Start time: 10/11/2020 - 08:02:02</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentHistoryItem;
