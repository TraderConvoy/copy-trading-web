import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatter } from 'utils/utilities';

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
  let dataChart = detail?.expert?.trading_gains ? detail?.expert?.trading_gains : [];
  const map1 = dataChart.map((x) => formatter.format(x.total_gain));
  const data = {
    labels: map1,
    datasets: [
      {
        backgroundColor: 'rgb(49 98 125 / 86%)',
        borderColor: '#0f83bb',
        borderWidth: 1,
        data: map1,
        pointRadius: 0,
        beginAtZero: true,
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
              <p>{detail.expert?.username.split('')[0]}</p>
            )}
          </div>
        </div>
        <div className="wrapper-right">
          <div className="name-wrapper">
            <a href={`/copy-trading/leader-detail/${detail.expert._id}`} className="name">
              {detail.expert?.username}
            </a>
            <p className="sub">
              <span className="expert">Expert</span>
              <span className="percent" style={{ paddingRight: 5 }}>
                5%{' '}
              </span>{' '}
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
            {formatter.format(detail.info.gain_rate_months)} % in month
          </p>
          <p className="copy-counter">{detail.info.copier} Copier</p>
        </div>
        <div className="wrapper-right">
          <p className="last-30days">Last 30 days</p>
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
