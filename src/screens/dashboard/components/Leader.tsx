import React from 'react';
import { Line } from 'react-chartjs-2';

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
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        backgroundColor: 'rgba(30, 96, 121, 1)',
        borderColor: 'rgb(43 139 192)',
        data: [0, 5, 4, 10, 10, 15, 14, 30, 34, 60],
        pointRadius: 0,
      },
    ],
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
          <p className="gain-percent">{detail.info.gain_rate_months}% in 10.7 months</p>
          <p className="copy-counter">{detail.info.copier} Copier</p>
          <p className="last"># -{detail.info.removed_copier} last 7d</p>
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
