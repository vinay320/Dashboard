import React, { useState, useEffect } from "react";
import axios from "axios";
import "../global.css";
import { FaRocket } from "react-icons/fa";

const MarketSummary = () => {
  const [marketSummary, setMarketSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/b6cae89d-7e41-4799-86bc-a113d165a22a"
      );
      setMarketSummary(response.data.marketSummary);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching market summary:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading market summary...</div>; 
  }

  return (
    <section className="market-summary">
      {marketSummary && (
        <div className="icon">
          <p>
            <span>{marketSummary.headline}</span>
            <span
              className={
                marketSummary.sentiment === "bullish"
                  ? "text-green"
                  : "text-red"
              }
            >
              {marketSummary.sentiment}
            </span>
          </p>
          <p>
            <FaRocket size={14} />
          </p>
        </div>
      )}
    </section>
  );
};

export default MarketSummary;

