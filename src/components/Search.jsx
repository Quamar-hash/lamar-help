import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../context/Filter";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [results, setResults] = useState([]);
  const { searchTerm } = useContext(FilterContext);

  const navigate = useNavigate()

  const navigateToDetails = (name) => {
 
    navigate('/details',{state:{"name":name}})
  }

  const getSearchResult = async () => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSearchResult();
  }, [searchTerm]);

  return (
    <div className="px-16 max-w-md">
      {results.map((item, index) => {
        return (
          <div onClick={()=>navigateToDetails(item.name)} className="bg-white px-4 py-2 text-lg font-semibold my-2 rounded-md shadow-md cursor-pointer" >
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
