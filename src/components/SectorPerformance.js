import React, { useState, useEffect } from "react";
import axios from "axios";
import "../global.css";

const SectorPerformance = () => {
  const [sectors, setSectors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/b6cae89d-7e41-4799-86bc-a113d165a22a"
      );
      setSectors(response.data.sectorPerformance.sectors);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching sectors:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading sector performance...</div>;
  }

  // Calculate total number of sectors, total change, and average change
  const totalSectors = sectors.length;
  const totalChange = sectors.reduce((sum, sector) => sum + sector.change, 0);
  const averageChange = totalChange / totalSectors;

  // Divide sectors into two columns for better UI presentation
  const halfLength = Math.ceil(sectors.length / 2);
  const leftColumnSectors = sectors.slice(0, halfLength);
  const rightColumnSectors = sectors.slice(halfLength);

  return (
    <section className="sector-performance">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Sector Performance</h2>
        <h5 style={{ color: "gray" }}>%Percentage Change</h5>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <ul>
            <li className="text-gray-700 all-sectors">
              <span>All Sectors</span>
              <span className="all-values">{averageChange.toFixed(2)}%</span>
            </li>
            {leftColumnSectors.map((sector, index) => (
              <li
                key={index}
                className={`${sector.change >= 0 ? "text-green" : "text-red"}`}
              >
                <span>{sector.name}</span>
                <span>{sector.change}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2">
          <ul>
            {rightColumnSectors.map((sector, index) => (
              <li
                key={index}
                className={`${sector.change >= 0 ? "text-green" : "text-red"}`}
              >
                <span>{sector.name}</span>
                <span>{sector.change}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SectorPerformance;