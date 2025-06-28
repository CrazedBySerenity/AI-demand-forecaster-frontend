import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface Props {
  forecast: number[];
  history: number[];
}

const ForecastChart: React.FC<Props> = ({ forecast, history }) => {
  const labels = [
    ...history.map((_, i) => `T-${history.length - i}`),
    ...forecast.map((_, i) => `T+${i + 1}`),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "History",
        data: history,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Forecast",
        data: Array(history.length).fill(null).concat(forecast),
        borderColor: "orange",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default ForecastChart;
