import React, { useContext, useEffect, useRef, useState } from "react";


import Breadscrum from "../components/Breadscrum";
import { FilterContext } from "../context/Filter";

import { getImageClassName } from '../utilities/getImageColor'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Decks from "../components/Decks";
import Modal from "../components/Modal";

const AllDeck = () => {
 
  const [icon, setIcon] = useState("");
  const [cardName, setCardName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 
  const timerRef = useRef(null);
  const { filter, updateFilter, getSearchTerm, updateClicked, clicked } =
    useContext(FilterContext);

  const [allCards, setAllCards] = useState([]);



  
  


  const deleteCard =  (index) => {
    const updatedCards = [...allCards];
    updatedCards.splice(index, 1);
    setAllCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    toast("card was succesfully deleted");
  };

  useEffect(() => {
    // Fetch data from local storage
    const storedCards = localStorage.getItem("cards");
    if (storedCards) {
      setAllCards(JSON.parse(storedCards));
    }
  }, []);

  const createCard = (e) => {
    e.preventDefault();
  
    const iconValue = icon
    const cardNameValue = cardName

    console.log(iconValue, cardNameValue)
  
    if (!iconValue) {
      toast("Please select an icon");
      return;
    }
  
    if (!cardNameValue) {
      toast("Please enter a deck name");
      return;
    }
  
    const newCard = {
      icon: iconValue,
      cardName: cardNameValue,
    };
  
    // Store the new card object in localstorage
    const existingCards = JSON.parse(localStorage.getItem("cards")) || [];
    existingCards.push(newCard);
    localStorage.setItem("cards", JSON.stringify(existingCards));
  
    // Update the allCards state to include the new card object
    setAllCards((prevCards) => [...prevCards, newCard]);
  
    // Clear the input fields
    setIcon("");
    setCardName("");
  };
  

  const updateCardName = (index, newName) => {
    const updatedCards = [...cards];
    updatedCards[index].cardName = newName;
    setCards(updatedCards);
  };

 

 


  const handleFocus = () => {
    updateClicked(true);
  };

  const handleBlur = () => {
    timerRef.current = setTimeout(() => {
      updateClicked(false);
    }, 500); // wait for half a second before setting focus to false
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
    getSearchTerm(searchTerm);
    clearTimeout(timerRef.current); // clear the timeout on every change
  };

 
 

  return (
    <>
      <Breadscrum state1="Decks" state2="Select deck" />

  

      <div className=" flex items-center space-x-2 xl:justify-between px-6 lg:px-16">
        <div className="relative w-[450px] md:w-[820px] xl:w-[500px] text-gray-600 ">
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={searchTerm}
            onChange={handleChange}
            type="search"
            name="serchTerm"
            placeholder="Search"
            className="bg-white w-full h-10 px-1 md:px-5 pr-10 rounded-md text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="absolute svg-icon right-0 top-0 mt-3 mr-4"
          >
            <svg
              className="h-4 w-4 fillCurrent"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>

        

          <Modal createCard={createCard} cardName={cardName} icon={icon} setIcon={setIcon} setCardName={setCardName} />
      
      </div>

      <section className="lg:px-16 px-6 my-2 mb-4 h-full">
        {/* flexed and block */}
        <div className="block md:flex /*lg:px-16*/ my-4 justify-between">
          <p className={`${allCards.length > 0 ? "hidden" : "md:flex block"}`}>
            No Decks Created. Please create a Deck by pressing the Add Deck <span className="bg-white px-2 m-1 font-bold rounded shadow">+</span>
            button above.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen xl:grid-cols-5 lg:grid-cols-4 gap-2 space-x-2 space-y-36 md:space-y-0 ">
          {allCards.map((card, index) => {
            const imageClassName = getImageClassName(card.icon);
            const name = card.cardName
            console.log(name)
            return (
             <Decks key={index} cardName={name}   deleteCard={deleteCard} card={card} index={index} imageClassName={imageClassName} />
            );
          })}
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default AllDeck;
