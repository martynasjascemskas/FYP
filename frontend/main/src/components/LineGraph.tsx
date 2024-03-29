import { LineChart } from "@mui/x-charts/LineChart";

// Average house price in uk 2015-2022
const AverageHousePricePerYear = [
  199556, 211724, 221402, 228353, 230611, 237217, 258429, 283378,
];

export default function SimpleLineChart(props: {
  medianHousePricePerPostcode: { [key: string]: number };
}) {
  // If houseprice in postcode in a year is 0 (no sales that year in that postcode), set value to null (to not be visible in chart).
  const medianHousePricePerPostcodeTransformed = Object.fromEntries(
    Object.entries(props.medianHousePricePerPostcode).map((entry) => {
      if (entry[1] > 0) {
        return entry;
      } else {
        return [entry[0], null];
      }
    })
  );
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format;

  return (
    <LineChart
      width={350}
      height={300}
      margin={{ left: 65 }}
      slotProps={{ legend: { hidden: true } }}
      series={[
        {
          data: Object.values(medianHousePricePerPostcodeTransformed),
          label: "Average House Price in Postcode",
          connectNulls: true,
          valueFormatter: currencyFormatter,
        },
        {
          data: AverageHousePricePerYear,
          label: "Average House Price in UK",
          valueFormatter: currencyFormatter,
        },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: Object.keys(medianHousePricePerPostcodeTransformed),
        },
      ]}
    />
  );
}
