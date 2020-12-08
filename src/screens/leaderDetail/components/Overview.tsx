import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const Overview = () => {
  const [number, setNumber] = useState(0);
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
          ticks: {
            // Include a dollar sign in the ticks
            weight: 100,
            callback: (value, index, values) => {
              return value + '%';
            },
          },
        },
      ],
    },
  };
  debugger;
  let randoms = [...Array(15)].map(() => Math.floor(Math.random() * 12));
  console.log();
  const data = {
    labels: ['26.Oct', '', '28.Oct', '', '30.Oct', '', '1.Nov', '', '3.Nov', '', '5.Nov', '', '7.Nov'],
    datasets: [
      {
        backgroundColor: '#3FC66D',
        data: randoms,
        // data: [55, 4, 10, 10, 15, 14, 30, 40, 34, 60, 50, 80, 90],
        pointRadius: 0,
      },
    ],
  };
  const fillChartByTime = (date) => {
    console.log(date);
  };

  return (
    <div className="overview">
      <p className="name-wrapper">
        <p>Montly Gain</p>
        <p>Data as of 23 Nov 2020, 11:55:43</p>
      </p>
      <div className="tab-wrapper">
        {/* <button className="tab">3 days</button> */}
        <button className="tab" onClick={() => fillChartByTime(0)}>
          7 days
        </button>
        <button className="tab" onClick={() => fillChartByTime(1)}>
          1 months
        </button>
        <button className="tab" onClick={() => fillChartByTime(3)}>
          3 months
        </button>
        <button className="tab" onClick={() => fillChartByTime(6)}>
          6 months
        </button>
        <button className="tab" onClick={() => fillChartByTime(12)}>
          12 montsh
        </button>
        <button className="tab" onClick={() => fillChartByTime(24)}>
          All
        </button>
      </div>
      <Bar width={1300} height={230} data={data} options={options} />
    </div>
  );
};

export default Overview;
