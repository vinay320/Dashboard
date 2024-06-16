import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { useChartContext } from "./ChartProvider";
import "../global.css";

const ChartSection = () => {
  const { selectedIndex } = useChartContext("S&P 500");
  const [indicesData, setIndicesData] = useState([]);
  const [timeRange, setTimeRange] = useState("ALL");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/b6cae89d-7e41-4799-86bc-a113d165a22a"
      );
      setIndicesData(response.data.marketsOverview.indices);
    } catch (error) {
      console.error("Error fetching indices data:", error);
    }
  };

  const filterData = (indexName, range) => {
    const index = indicesData.find((index) => index.name === indexName);
    if (
      !index ||
      !Array.isArray(index.chartData) ||
      index.chartData.length === 0
    ) {
      return []; 
    }

    switch (range) {
      case "1D":
        return index.chartData.slice(-1); 
      case "1W":
        return index.chartData.slice(-7); 
      case "1M":
        return index.chartData.slice(-30); 
      case "3M":
        return index.chartData.slice(-90); 
      case "1Y":
        return index.chartData.slice(-365);
      case "All":
        return index.chartData;
      default:
        return index.chartData;
    }
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const filteredData = filterData(selectedIndex, timeRange);

  return (
    <section className="chart-section">
      <h2>{selectedIndex}</h2>
      <div className="time-range-buttons">
        {["1D", "1W", "1M", "3M", "1Y", "All"].map((range) => (
          <button
            key={range}
            className={`${
              timeRange === range ? "bg-blue-500" : "bg-gray-700"
            } text-white rounded hover:bg-blue-400`}
            onClick={() => handleTimeRangeChange(range)}
          >
            {range}
          </button>
        ))}
      </div>
      <div className="recharts-wrapper">
        <LineChart width={600} height={300} data={filteredData}>
          <XAxis dataKey="date" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </section>
  );
};

export default ChartSection;

