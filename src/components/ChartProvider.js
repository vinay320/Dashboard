import React, { createContext, useContext, useState } from "react";

const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState("S&P 500");

  const updateSelectedIndex = (indexName) => {
    setSelectedIndex(indexName);
  };

  return (
    <ChartContext.Provider value={{ selectedIndex, updateSelectedIndex }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => useContext(ChartContext);
