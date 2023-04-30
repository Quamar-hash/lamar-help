import React, { createContext, useState } from "react";

// create a new context
export const FilterContext = createContext();

// create a new component to provide the context
export const FilterProvider = ({ children }) => {
  const [state, setState] = useState("alphabet");
  const [clicked, setClicked] = useState(false)
  const [searchTerm,setSearchTerm] = useState("")

  // create a function to update the state
  const updateFilter = (type) => {
    setState(type);
  };

  //function to check if input is clicked
  const updateClicked = (status) => {
    setClicked(status)
  }

  const getSearchTerm = (term) => {
    setSearchTerm(term)
  }


  // pass the state and function as the value of the context
  const value = { filter: state, updateFilter, updateClicked, clicked, searchTerm, getSearchTerm };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
