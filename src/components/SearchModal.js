import React, { useState, useEffect, useRef } from "react";
import { useChartContext } from "./ChartProvider";
import "../global.css";

const SearchModal = ({ onClose, data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { updateSelectedIndex } = useChartContext();
  const [showResults, setShowResults] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    console.log(data);
    if (Array.isArray(data)) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query)
      );

      setFilteredResults(filtered);
      setShowResults(true); 
    } else {
      console.error("indicesData is not an array or is undefined");
    }
  };

  const handleResultClick = (indexName) => {
    updateSelectedIndex(indexName); 
    onClose();
  };

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indices..."
          />
          <button type="submit">Search</button>
        </form>
        <div className="search-results">
          {showResults && filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <div
                key={index}
                className="result-item"
                onClick={() => handleResultClick(result.name)}
              >
                {result.name}
              </div>
            ))
          ) : showResults ? (
            <p>No results found</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
