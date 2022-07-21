import React from "react";
/**
 * Import the required stuffs
 */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CoingeckoChartDataPoller } from "../api/coingecko";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type ChartComponentProps = {
  /**
   * The poller that the data should be mounted to
   */
  source: CoingeckoChartDataPoller;
};

const padTime = (s: number | string) => `00000${s}`.slice(-2);

/**
 * This component shows the chart from the provided data provider
 */
export default function ChartComponent({
  source,
}: ChartComponentProps): JSX.Element {
  const [datas, setDatas] = React.useState<number[] | undefined>();
  const [labels, setLabels] = React.useState<string[] | undefined>();

  /**
   * Fill the array with data
   */
  function initData() {
    //try to init the data
    const { chartData } = source;
    const tmpData: number[] = [],
      tmpLabel: string[] = [];
    //generate 2 arrays
    const array_length = chartData.length - 40;
    chartData.slice(array_length).forEach((entry) => {
      //time
      const time = new Date(entry[0]);
      tmpLabel.push(
        `${padTime(time.getHours())}:${padTime(time.getMinutes())}`
      );
      tmpData.push(entry[1]);
    });
    setDatas(tmpData);
    setLabels(tmpLabel);
  }

  React.useEffect(() => {
    //attach the new data
    source.onNewData = function (_self, newSeg) {
      if (!labels || !datas) {
        return;
      }
      console.log("DATA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log("");
      //push the new stuffs into it
      newSeg.forEach((entry) => {
        //time
        const time = new Date(entry[0]);
        labels.push(
          `${padTime(time.getHours())}:${padTime(time.getMinutes())}`
        );
        datas.push(entry[1]);
      });
      //update the things
      setLabels(labels.slice(newSeg.length));
      setDatas(datas.slice(newSeg.length));
    };
  }, [labels, datas, source]);

  React.useEffect(() => {
    //load the data from the sources
    if (source.chartData.length === 0) {
      source.onLoad = initData;
    } else {
      //init
      initData();
    }
    //then the A**hole listeners
    return () => {
      source.onLoad = undefined;
      source.onNewData = undefined;
    };
    //eslint-disable-next-line
  }, [source]);
  //options
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${
          source.coin
        } VS ${source.vs.toUpperCase()} in last few minutes`,
      },
    },
  };
  //lets construct our data here dude
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: datas,
        label: `Value in ${source.vs.toUpperCase()}`,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(255, 171, 245, 0.5)",
      },
    ],
  };
  return datas && labels ? (
    <Line options={options} data={data} />
  ) : (
    <p>Loading.....</p>
  );
}
