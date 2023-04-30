import React, { useState, useEffect, useContext } from 'react';
import { FilterContext } from '../context/Filter';
import Card from './Card';
import Search from './Search';
import axios from 'axios';
import { useLocation } from 'react-router-dom';



const AllCards = () => {
  const [info, setInfo] = useState([]);
  const { filter, clicked } = useContext(FilterContext);

  const location = useLocation();
  const deckName = location?.state?.deckName;


console.log("card", clicked)

  // alphabet
  function sortObjectsByName(objects) {

    if(filter === 'alphabet'){

    return objects.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  } else if(filter === "youngest"){
    return objects.sort((a, b) => {
      const dobA = parseInt(a.birth_year); // parse DOB string to integer
      const dobB = parseInt(b.birth_year); // parse DOB string to integer
      return dobA - dobB;
    });
  }
  else return objects.sort((a, b) => {
    const dobA = parseInt(a.birth_year); // parse DOB string to integer
    const dobB = parseInt(b.birth_year); // parse DOB string to integer
    return dobB - dobA;
  });

  }

  const [pageNum, setPageNum] = useState(1)
   const [previousCount, setPreviousCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);


 

  useEffect(() => {
    async function fetchCharacters() {
      const url = `https://swapi.dev/api/people/?page=${pageNum}`;
      try {
        const response = await axios.get(url);
        console.log(response.data.results)
        const result = sortObjectsByName(response.data.results, filter )
      setInfo(result);
        setErrorMessage("");
        setIsNextDisabled(false);
        setIsPreviousDisabled(false);
        setPreviousCount(pageNum);
      } catch (error) {
        setInfo([]);
        setErrorMessage("Page not found");
        setIsNextDisabled(true);
        setIsPreviousDisabled(previousCount === 1);
        setPageNum(previousCount);
      }
    }

    fetchCharacters();
  }, [pageNum, previousCount, filter, clicked]);

  



 

 function handlePreviousClick() {
  if (pageNum > 2) {
    setPageNum(pageNum - 1);
  }
}

function handleNextClick() {
  setPageNum(pageNum + 1);
}
 


  return (

    <>
    {clicked === true ? (
      <Search />
    ) : (
      <div className="px-6  grid  md:grid-cols-2 lg:grid-cols-5 grid-cols-1 gap-4  mt-4 md:pl-16 mb-8  ">
        {/* added responsiveness padding and such */}
        {info.map((item, index) => (
          <Card deckName={deckName} key={item.name + index} info={item} />
        ))}
      </div>
    )}


<nav className='mx-16 mb-4'  aria-label="Page navigation example">
  <ul class="inline-flex items-center space-x-2">
    <li onClick={handlePreviousClick}>
      <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white rounded-l-lg  ">
        <span class="sr-only">Previous</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      </a>
    </li>
    <li onClick={()=>setPageNum(1)}>
      <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white ">{pageNum > 3? pageNum -3 : 1}</a>
    </li>
    <li onClick={()=>setPageNum(2)}>
      <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white ">{pageNum > 3? pageNum - 2 : 2}</a>
    </li>
    <li onClick={()=>setPageNum(3)}>
      <a href="#" aria-current="page" class="px-3 py-2 leading-tight text-gray-500 bg-white ">{pageNum > 3? pageNum -1 : 3}</a>
    </li>
    
    <li onClick={handleNextClick} 
    
    >
      <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white rounded-r-lg  ">
        <span class="sr-only">Next</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
      </a>
    </li>
  </ul>
</nav>


  </>
    
  );
};

export default AllCards;
