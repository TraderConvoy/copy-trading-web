import React from 'react';
import { Line } from 'react-chartjs-2';
import NumberFormat from 'react-number-format';

const Leader = ({ startCopy, detail }) => {
  const options = {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };
  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const data = {
    labels: [1, 3, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        backgroundColor: 'rgba(30, 96, 121, 1)',
        borderColor: 'rgb(43 139 192)',
        data: [...Array(10)].map(() => Math.floor(getRandomArbitrary(40, 80))),
        pointRadius: 0,
      },
    ],
  };
  // [0, 5, 4, 10, 10, 15, 14, 30, 34, 60],

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return (
    <div className="leader-card">
      <div className="info-wrapper">
        <div className="wrapper-left">
          <div className="avatar">
            {detail.expert.avatar ? (
              <img src={detail.expert.avatar} alt="avatar" />
            ) : (
              <p>{detail.expert.fullname.split('')[0]}</p>
            )}
          </div>
        </div>
        <div className="wrapper-right">
          <div className="name-wrapper">
            <a href={`/copy-trading/leader-detail/${detail.expert._id}`} className="name">
              {detail.expert.fullname}
            </a>
            <p className="sub">
              <span className="expert">Expert</span>
              <span className="percent">5%</span>
              Profit sharing
            </p>
          </div>
        </div>
      </div>
      <div className="detail-wrapper">
        <div className="wrapper-left">
          <p className="percent">{detail.info.gain_rate_last_month}%</p>
          <p className="gain">Gain last month</p>
          <p className={detail.info.gain_rate_months >= 0 ? 'gain-percent' : 'loss-percent'}>
            {/* FIXME: update month view  */}
            <NumberFormat displayType="text" value={detail.info.gain_rate_months} suffix={'%'} decimalScale={2} /> in
            10.7 months
          </p>
          <p className="copy-counter">{detail.info.copier} Copier</p>
          {detail.info.removed_copier && <p className="last"># -{detail.info.removed_copier} last 7d</p>}
        </div>
        <div className="wrapper-right">
          <p className="last-30days">Last 30days</p>
          <div className="chart-wrapper">
            <Line data={data} width={177} height={122} options={options} />
          </div>
        </div>
      </div>
      <div className="button-wrapper">
        <button className="start-copy-button" onClick={() => startCopy(detail)}>
          Start copy
        </button>
      </div>
    </div>
  );
};

export default Leader;
