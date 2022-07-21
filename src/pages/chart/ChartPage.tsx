import React from "react";
import { useParams } from "react-router-dom";
import { CoingeckoChartDataPoller } from "../../api/coingecko";
import ChartComponent from "../../components/ChartComponent";

export default function ChartPage() {
  //get the param
  const { coin, vs } = useParams();
  //try to initialize the renderer
  const [poller, setPoller] = React.useState<
    CoingeckoChartDataPoller | undefined
  >();
  React.useEffect(() => {
    if (!coin || !vs) {
      return;
    }
    //setup the poller
    const instance = new CoingeckoChartDataPoller(coin, vs);
    setPoller(instance);
    instance.onError = (e) => {
      alert("Error happened");
      console.error(e);
    };
    instance.start();
    return () => instance.stop();
  }, [coin, vs]);
  return poller ? (
    <div style={{ width: "50%", height: "300px" }}>
      <ChartComponent source={poller} />
    </div>
  ) : (
    <p>Initialization in progress</p>
  );
}
