import moment from 'moment';
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Overview = ({ data }) => {
  // const [number, setNumber] = useState(0);
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
  let dataChart = data.result.gain_every_months.reverse();
  const map1 = dataChart.map((x) => x.total_gain);
  const map2 = dataChart.map((x) => moment(x.updatedAt).format('MMM'));
  const chart = {
    labels: map2,
    datasets: [
      {
        backgroundColor: '#3FC66D',
        data: map1,
        pointRadius: 0,
      },
    ],
  };
  const fillChartByTime = (date) => {
    console.log(date);
  };

  return (
    <div className="overview">
      <div className="name-wrapper">
        <p>Monthly Gain</p>
        <p>Data as of {dataChart && moment(dataChart[0].updatedAt).format('DD MMM YYYY HH:mm:ss')}</p>
      </div>
      <div className="tab-wrapper">
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
      <Bar width={1300} height={230} data={chart} options={options} />
    </div>
  );
};

export default Overview;
