import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { subscribeVotes } from "../utils/socket";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const dataset = data.datasets[tooltipItem.datasetIndex];
        const meta = dataset._meta[Object.keys(dataset._meta)[0]];
        const total = meta.total;
        const currentValue = tooltipItem?.value;
        const percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
        return currentValue + " (" + percentage + "%)";
      },
      title: (tooltipItem) => {
        return `${tooltipItem[0]?.label}`;
      },
    },
  },
};

// #4d8aba cplus
// #a31116 ruby
// #29beb0 go
// #f0db4f jsrgb(240, 219, 79)

const Chart = () => {
  const [votes, setVotes] = useState({});

  useEffect(() => {
    subscribeVotes((data) => {
      setVotes(data);
    });
  }, [setVotes]);

  const totalVotes = Object.values(votes).reduce((previous, next) => previous + next, 0);

  const chartData = {
    labels: Object.keys(votes),
    datasets: [
      {
        data: Object.values(votes),
        backgroundColor: [
          "rgba(240, 219, 79, 0.2)",
          "rgba(41, 190, 176, 0.2)",
          "rgba(163, 17, 22, 0.2)",
          "rgba(77, 138, 186, 0.2)",
        ],
        borderColor: [
          "rgba(240, 219, 79, 1)",
          "rgba(41, 190, 176, 1)",
          "rgba(163, 17, 22, 1)",
          "rgba(77, 138, 186, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ marginLeft: "20vw", height: "50vh", width: "50vw" }}>
      <h2 className='header-title'>Toplam oy sayısı : {totalVotes}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
