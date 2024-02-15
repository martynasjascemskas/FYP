import { LineChart } from "@mui/x-charts/LineChart";

const AverageHousePricePerYear = [
  199556, 211724, 221402, 228353, 230611, 237217, 258429, 283378,
];

export default function SimpleLineChart(props: {
  averageHousePricePerPostcode: { [key: string]: number };
}) {
  const averageHousePricePerPostcodeTransformed = Object.fromEntries(
    Object.entries(props.averageHousePricePerPostcode).map((entry) => {
      if (entry[1] > 0) {
        return entry;
      } else {
        return [entry[0], null];
      }
    })
  );

  return (
    <LineChart
      width={350}
      height={300}
      slotProps={{ legend: { hidden: true } }}
      series={[
        {
          data: Object.values(averageHousePricePerPostcodeTransformed),
          label: "AverageHousePricePerPostcode",
          connectNulls: true,
        },
        { data: AverageHousePricePerYear, label: "AverageHousePricePerYear" },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: Object.keys(averageHousePricePerPostcodeTransformed),
        },
      ]}
    />
  );
}
