import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../context/Filter";
import { useNavigate } from "react-router-dom";

const DeckSearch = ({database}) => {
  const [results, setResults] = useState([]);
  const { searchTerm } = useContext(FilterContext);
console.log(database)
  const navigate = useNavigate()

  const navigateToDetails = (name) => {
 
    navigate('/details',{state:{"name":name}})
  }

  const getSearchResult = async () => {
    const results = database.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      );
      console.log(results)
      setResults(results);
  };

  useEffect(() => {
    getSearchResult();
  }, [searchTerm, database]);



  return (
    <div className=" max-w-md">
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

export default DeckSearch;
