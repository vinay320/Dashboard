import React, { useState, useEffect } from "react";
import axios from "axios";
import "../global.css";

const MarketsOverview = () => {
  const [marketsData, setMarketsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/b6cae89d-7e41-4799-86bc-a113d165a22a"
        );
        setMarketsData(response.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchData();
  }, []);

  if (
    !marketsData ||
    !marketsData.marketsOverview ||
    !marketsData.marketsOverview.indices
  ) {
    return <div>Loading...</div>;
  }

  const { indices } = marketsData.marketsOverview;

  return (
    <section className="markets-overview">
      <h2>Markets Overview</h2>
      <div>
        <h3>Indices</h3>
        <ul>
          {indices.map((index, i) => (
            <li key={i}>
              <span>{index.name}</span>
              <span>{index.value}</span>
              <span className={index.change >= 0 ? "text-green" : "text-red"}>
                {index.change} ({index.percentChange}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MarketsOverview;






