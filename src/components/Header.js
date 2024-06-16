import React, { useState, useEffect } from "react";
import { FaHome, FaSearch, FaCompass, FaCertificate } from "react-icons/fa";
import axios from "axios";
import SearchModal from "./SearchModal";
import "../global.css"; 
import { useAuth } from "./AuthProvider";

const Header = ({ userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indicesData, setIndicesData] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/b6cae89d-7e41-4799-86bc-a113d165a22a"
        );
        setIndicesData(response.data.marketsOverview.indices);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <header className="header">
        <div>
          <h1>
            Hello, {userName} <FaCertificate color="blue" size={14} />
          </h1>
          <p>{formattedDate}</p>
        </div>
        <nav>
          <span className="icon-text">
            <FaCompass size={24} className="icon" />
            <div>For You</div>
          </span>
          <span className="icon-text">
            <FaHome size={24} className="icon" />
            <div>Screener</div>
          </span>
          <span className="icon-text" onClick={handleSearchClick}>
            <FaSearch size={24} className="icon" />
          </span>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>
      {isModalOpen && (
        <SearchModal onClose={handleModalClose} data={indicesData} />
      )}
    </>
  );
};

export default Header;
