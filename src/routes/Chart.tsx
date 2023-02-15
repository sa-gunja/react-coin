import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["history", coinId], () => fetchCoinHistory(coinId));
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: { width: 500, height: "auto", toolbar: { show: false } },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              data: data?.map((data) => [
                Number(data.time_close) * 1000,
                Number(data.open),
                Number(data.high),
                Number(data.low),
                Number(data.close),
              ]) as any,
            },
          ]}
        />
      )}
    </div>
  );
}

export default Chart;
