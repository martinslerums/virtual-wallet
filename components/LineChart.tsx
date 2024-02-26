"use client";

import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  ChartOptions,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

type LineChartProps = {
  transactions: Transaction[];
};

const LineChart = ({ transactions }: LineChartProps) => {
  const sortedTransactionsForChart = [...transactions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const dates = sortedTransactionsForChart.map((transaction: Transaction) =>
    format(transaction.createdAt, "MM-dd")
  );

  let cumulativeBalance: number = 0;

  const amounts = sortedTransactionsForChart.map((transaction: Transaction) => {
    cumulativeBalance += transaction.amount;
    return cumulativeBalance;
  });

  const data = {
    labels: dates,
    datasets: [
      {
        data: amounts,
        backgroundColor: "rgba(165, 240, 167, 0.5)",
        borderColor: "rgba(165, 240, 167, 1)",
        pointBorderColor: "rgba(165, 240, 167, 1)",
        tension: 0.1,
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    layout: {
      padding: 30,
    },
    scales: {
      y: {
        ticks: {
          color: "black",
          font: {
            weight: "bold",
          },
          callback: (tickValue: string | number) => {
            const value =
              typeof tickValue === "string" ? parseFloat(tickValue) : tickValue;
            return value >= 1000 ? value / 1000 + "K" : value;
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          display: false,
          color: "black",
          font: {
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
      <Line
        data={data}
        options={options}
        className="rounded-md border h-full bg-white"
      />
  );
};

export default LineChart;
