import React, { useContext, useRef, useState } from 'react';
import { FilterContext } from '../context/Filter';


const Controls = () => {
  const [state, setState] = useState ("alphabet");
  const [searchTerm, setSearchTerm] = useState("")
  const timerRef = useRef(null);
  const {  updateFilter, updateClicked, getSearchTerm } = useContext(FilterContext);

  const filterCards = (type) => {

    setState(type);
    updateFilter(type);
    // console.log(state)
  }

  const handleFocus = () => {
    updateClicked(true)
  }
 

  const handleBlur = () => {
    timerRef.current = setTimeout(() => {
      console.log("handle blur", false)
      updateClicked(false)
    }, 500); // wait for half a second before setting focus to false
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value)
    getSearchTerm(searchTerm)
    clearTimeout(timerRef.current); // clear the timeout on every change
  };


  return (
    <section className="flex space-x-1 md:space-x-5 lg:px-16 px-6 items-center">
      <div className="relative max-w-md md:w-2/4 text-gray-600">
        <input onFocus={handleFocus} onBlur = {handleBlur} value={searchTerm} onChange= {handleChange} type="search" name="serchTerm" placeholder="Search" className="bg-white w-full h-10 px-1 md:px-5 pr-10 rounded-md text-sm focus:outline-none" />
        <button type="submit" className="absolute svg-icon right-0 top-0 mt-3 mr-4">
          <svg className="h-4 w-4 fillCurrent" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
        </button>
      </div>

      {/* fixed border and active filter */}

      <div onClick={() => filterCards("alphabet")} className={` flex items-center  border-gray-300  active-scale-90 cursor-pointer text-sm rounded md:text-lg px-1 md:px-4 py-1 ${state === 'alphabet' ? 'bg-white border' : 'bg-gray-200  '}`}>
        <p className="whitespace-nowrap">A to Z</p>
      </div>

      <div onClick={() => filterCards("youngest")} className={` flex items-center  border-gray-300  active-scale-90 cursor-pointer text-sm rounded md:text-lg px-1 md:px-4 py-1 ${state === 'youngest' ? 'bg-white border' : 'bg-gray-200 '}`}>
        <p>Youngest</p>
      </div>

      <div onClick={() => filterCards("eldest")} className={` border-gray-300 flex items-center active-scale-90 cursor-pointer md:text-lg  rounded text-sm px-1 md:px-4 py-1 ${state === 'eldest' ? 'bg-white border' : 'bg-gray-200 '}`}>
        <p>Eldest</p>
      </div>

    </section>
  )
}

export default Controls;
