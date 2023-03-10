import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchTickers } from "../api";
import ApexCharts from "react-apexcharts";
import { isDarkAtom } from "../atom";

interface IPriceProps {
  coinId: string;
}

function priceCalc(price: number, percent: number): number {
  return Math.floor(price * (percent / 100) + price);
}

function dateConvert(date: string): string {
  const arr = date.split("_");
  return arr[2] + "_ago";
}

function getDate(date: Date): string {
  const convert = new Date(date);
  return (
    convert.getFullYear() + "-" + convert.getMonth() + "-" + convert.getDate()
  );
}

function Price({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery(["tickers", coinId], () =>
    fetchTickers(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  const {
    quotes: { USD },
  } = data;

  const xData: number[] = [];
  const xCate: string[] = [];

  if (USD) {
    Object.keys(USD).forEach((key) => {
      if (key.includes("percent_change_")) {
        xCate.push(dateConvert(key));
        xData.push(priceCalc(USD["price"], USD[key]));
      }
    });
    xCate.unshift(getDate(USD["ath_date"]));
    xData.unshift(Math.floor(USD["price"]));
  }

  return (
    <div>
      {isLoading ? (
        "Chart Loading..."
      ) : (
        <ApexCharts
          type="line"
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: { width: 500, height: "auto", toolbar: { show: false } },
            xaxis: {
              categories: xCate.reverse(),
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              name: "price",
              data: xData.reverse(),
            },
          ]}
        />
      )}
    </div>
  );
}

export default Price;
