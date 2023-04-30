import React, { useState, useEffect } from "react";
import factionJedi from "../assets/icons/factionJedi.svg";
import rebelWater from "../assets/icons/rebelAllianceWatermark.svg";
import noFactionWater from "../assets/icons/noFactionWater.svg";
import water from "../assets/icons/watermark.svg";
import add from "../assets/icons/add.svg";

const Modal = ({createCard, cardName, icon, setIcon, setCardName}) => {
  const [showModal, setShowModal] = useState(false);


  const closeModal = () => {
    setShowModal(false);
  };

  const handleButtonClick = () => {
    setShowModal(true);
    console.log(icon)
  };

  // useEffect to close modal when clicked outside
  useEffect( ()=> {

    function handleOutsideClick(event) {
        if(event.target.matches('.modal') || !event.target.closest(".modal")) {
          console.log("OUTSIDE MODAL")
          setShowModal(false)
        }
    }
    

      document.addEventListener("click", handleOutsideClick)

      // removes event listener when modal unmounts
      return () => {
          document.removeEventListener("click", handleOutsideClick)
      }
  }, [])


  return (
    <div className="relative modal">
      <div className="p-2 bg-white rounded-sm" onClick={handleButtonClick}>
        <img src={add} className="w-5" />
      </div>
      <div
        tabIndex="-1"
        aria-hidden="true"
        // updated modal pos
        className={`${
          showModal ? "flex" : "hidden"
        } absolute -right-1 mt-2 z-20 w-64`}
      >
        <div className="relative w-full max-w-md max-h-full py-4">
          <div className="relative bg-white rounded-lg shadow py-2 ">
            {/* 
              resized the modal 96 to 64
              removed the close btn svg and added a useeffect to handle closing the modal
            <button
              onClick={closeModal}
              type="button"
              className="absolute top-0 right-0 bg-transparent hover:bg-black  rounded-lg  p-1   "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="red"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button> */}
            <div class="px-3 flex  justify-between py-3 flex">
              <div className="">
                <p>Faction</p>
                
              </div>
              <div className="flex  items-center space-x-2">
                <div  onClick={() => setIcon(rebelWater)} className="active:scale-95 transition duration-500 cursor-pointer bg-gray-200">
                  <img className="rounded-sm w-8 p-1  bg-gray-400" src={rebelWater} />
                </div>
                <div
                  onClick={() => setIcon(factionJedi)}
                  className=" active:scale-95 transition duration-500 cursor-pointer "
                >
                  <img className="rounded-sm w-8 p-1 border border-gray-400" src={factionJedi} />
                </div>
                <div className=" active:scale-95 transition duration-500 cursor-pointer bg-gray-400" onClick={() => setIcon(water)}>
                  <img
                    className="rounded-sm w-8 p-1  bg-gray-400"
                    src={water}
                  />
                </div>
                <div className=" active:scale-95 transition duration-500 cursor-pointer bg-gray-400" onClick={() => setIcon(noFactionWater)}>
                  <img
                    className="rounded-sm w-8 p-1  bg-gray-400"
                    src={noFactionWater}
                  />
                </div>
              </div>
            </div>
            <form onSubmit={createCard} className=" px-3">
              
              <div className="relative z-0">
              <input
                id="deckName"
                name="deckName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />

              <label
                htmlFor="deckName"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Deck Name
              </label>
              </div>

{/* <div class="relative z-0">
    <input type="text" id="floating_standard" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Floating standard</label>
</div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
