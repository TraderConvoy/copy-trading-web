import React from 'react';

const LeaderInfo = () => {
  return (
    <div className="leader-info">
      <div className="wrapper-top">
        <div className="info-wrapper">
          <div className="avatar-wrapper">
            <div className="avatar" />
          </div>
          <div className="name-wrapper">
            <p className="name">ACGInvest</p>
            <p className="sub">
              <span className="expert">Expert</span>
              <span className="percent">5%</span>
              Profit sharing
            </p>
          </div>
        </div>
      </div>
      <div className="wrapper-bottom">
        <div className="wrapper-left">
          <p className="value">+8%</p>
          <p className="sub">Gain last 30days</p>
          <p className="sub-green">+94 % in 10.7 months</p>
        </div>
        <div className="wrapper-right">
          <div className="button-wrapper">
            <p>216 Copier</p>
            <button>Start Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderInfo;
