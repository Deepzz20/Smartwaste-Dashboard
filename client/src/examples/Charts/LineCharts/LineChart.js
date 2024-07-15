import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const LineChart = ({ chartData: initialChartData, chartOptions: initialChartOptions }) => {
  const [chartData, setChartData] = useState(initialChartData);
  const [chartOptions, setChartOptions] = useState(initialChartOptions);

  useEffect(() => {
    setChartData(initialChartData);
    setChartOptions(initialChartOptions);
  }, [initialChartData, initialChartOptions]);

  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
