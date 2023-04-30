import React from 'react'

const Breadscrum = ({state1, state2}) => {
  return (
  
<nav className="flex items-center  text-black/70  py-3 lg:px-16  px-6" aria-label="Breadcrumb">
  
   
    
      <div className="flex items-center">
        {/* change what the href pointed to from # to / */}
        <a href="/" className="text-black text-lg">{state1}</a>
      </div>
 
 
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-400 mt-1" fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        <span className="  text-lg font-medium">{state2}</span>
      </div>
  

</nav>
  )
}

export default Breadscrum