import React, { createContext, useContext, useState } from "react";

// Create a context for the chart
const ChartContext = createContext();

// Provider component to manage the chart state
export const ChartProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState("S&P 500");

  // Function to update the selected index
  const updateSelectedIndex = (indexName) => {
    setSelectedIndex(indexName);
  };

  return (
    <ChartContext.Provider value={{ selectedIndex, updateSelectedIndex }}>
      {children}
    </ChartContext.Provider>
  );
};

// Custom hook to use the chart context
export const useChartContext = () => useContext(ChartContext);
