import React, { useEffect, useRef, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { historyOptions } from "../chartConfigs/chartConfig";

//History chart

const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24H");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24H":
        return day;
      case "7D":
        return week;
      case "1Y":
        return year;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      console.log("Yeah");
      const chartInstance = new Line(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(174, 305, 194, 0.5)",
              borderColor: "rgba(174, 305, 194, 0.4",
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
    }
  });

  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p className="my-0">${detail.current_price.toFixed(2)}</p>
          <p
            className={
              //warning to user
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          >
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  };

  return (
    <div className="bg-white border mt-2 rounded p-3">
      <div>{renderPrice()}</div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>
      <div className="chart-buttom mt-1">
        <button
          onClick={() => setTimeFormat("24H")}
          className="btn btn-outline-secondary btn-sm"
        >
          24H
        </button>
        <button
          onClick={() => setTimeFormat("7D")}
          className="btn btn-outline-secondary btn-sm mx-1"
        >
          7D
        </button>
        <button
          onClick={() => setTimeFormat("1W")}
          className="btn btn-outline-secondary btn-sm"
        >
          1W
        </button>
      </div>
    </div>
  );
};

export default HistoryChart;
