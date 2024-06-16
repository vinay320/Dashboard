import React, { useState } from "react";
import {
  FaChartLine,
  FaIndustry,
  FaSearchDollar,
  FaDollarSign,
} from "react-icons/fa";
import "../global.css"; 

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    console.log(`Clicked on ${itemName}`);
   
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className={`sidebar-item ${
                activeItem === "Chart Line" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Chart Line")}>
              <FaChartLine size={24} />
            </li>
          <li
              className={`sidebar-item ${
                activeItem === "Industry" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Industry")}
            >
              <FaIndustry size={24} />
           
          </li>
          <li
              className={`sidebar-item ${
                activeItem === "Search Dollar" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Search Dollar")}
            >
              <FaSearchDollar size={24} />
            
          </li>
          <li
              className={`sidebar-item ${
                activeItem === "Dollar Sign" ? "active" : ""
              }`}
              onClick={() => handleItemClick("Dollar Sign")}
            >
              <FaDollarSign size={24} />
            
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
    