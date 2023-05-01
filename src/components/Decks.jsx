import React, { useEffect, useRef, useState } from "react";
import deck from "../assets/icons/deck.svg";
import edit from "../assets/icons/edit.svg";
import remove from "../assets/icons/remove.svg";
import { useNavigate } from "react-router-dom";



const Decks = ({ card, cardName,  deleteCard, index, imageClassName }) => {
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);
  const [active, setActive] = useState(false);
  const [newName, setNewName] = useState("");

  const navigate = useNavigate();

  console.log(card)

  const [allDeck, setAllDecks] = useState([]);

  const viewDeck = (deckName) => {
    navigate("/deck/details", {
      state: { deckName: deckName },
    });
  };

  function getAllDecks() {
    const decks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("deck-")) {
        const deck = JSON.parse(localStorage.getItem(key));
        console.log("all deck", deck)
        decks.push(deck);
      }
    }
    setAllDecks(decks);
  }

  useEffect(() => {
    getAllDecks();
  }, [newName]);

  function getDeckLength(deckName) {

    const deck = allDeck.find((d) => d.deckName === deckName);
    if (deck) {
      return deck.newCards.length;
    }
    return 0;
  }

  const updateDeck = (event) => {
    const buttonRect = event?.target?.getBoundingClientRect();
    setButtonPos({ x: buttonRect.x, y: buttonRect.y });
    setActive(true);
  };

 

 
  const handleName = (event) => {
    event.preventDefault();
    console.log("hey");
  
    console.log(newName);
    const existingName = JSON.parse(localStorage.getItem(`deck-${card.cardName}`)) || [];
    console.log(existingName);
    if (existingName && newName) {
      localStorage.removeItem(`deck-${card.cardName}`);
      existingName.deckName = newName;
      localStorage.setItem(`deck-${newName}`, JSON.stringify(existingName));
      
      // Add updated deck to allDeck array
      const updatedDecks = allDeck.map((deck) => {
        if (deck.deckName === card.cardName) {
          return { ...deck, deckName: newName };
        }
        return deck;
      });
      setAllDecks(updatedDecks);
    }
   
  };
  
  console.log(allDeck)
  console.log(cardName)
  
  
  

  return (
    <div
      key={index}
      
      className="h-28 cursor-pointer active:scale-95 transition duration-500"
    >
      <div
        className={`${imageClassName}  relative rounded-b-0 rounded-t-md h-32 overflow-hidden `}
      >
        <div className="flex justify-end overflow-hidden">
          <img src={card.icon} className="-mt-4 w-40 -mr-3 " />
        </div>
        <div className="absolute top-4 left-4">
          <DeckIcon strokeColor="white" />
        </div>

        <div className="flex  ">
          <div
            onClick={(event) => updateDeck(event)}
            className="absolute top-6 right-16 bg-white p-2"
          >
            <img className="w-4 " src={edit} />
          </div>

          <div
            onClick={() => deleteCard(index)}
            className="absolute top-6 right-6 bg-black/70 p-2"
          >
            <img className="w-4 " src={remove} />
          </div>
        </div>
        <h2 className="absolute bottom-4 left-4 text-3xl text-white font-semibold">
          {card.cardName}
        </h2>
      </div>
      <div
        onClick={() => viewDeck(card.cardName)}
        className="bg-white h-full rounded-t-0 rounded-b-md flex justify-between px-6"
      >
        <p className="text-6xl pt-2 pb-4">{getDeckLength(cardName)}</p>

        <p className="pt-4 text-gray-500">total cards</p>
      </div>

      <div
        ref={divRef}
        className={`${
          active ? "block" : "hidden"
        }  px-2 bg-[#eee] h-36 w-[250px] py-2  absolute  transform transition-all duration-500 `}
        style={{ top: buttonPos.y + 40, left: buttonPos.x - 200 }}
      >
        <h2 clasName="text-gray-400  font-lg">Rename deck</h2>
        <hr />

      <form onSubmit={handleName}>

      <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          className="p-2 rounded-md my-2"
          type="text"
          placeholder="enter new deck name"
        />

        
<button type="submit">Submit</button>
      </form>

      </div>
    </div>
  );
};

export default Decks;


function DeckIcon({ strokeColor }) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1.99998L15.5 6.49998L8 11L0.5 6.49998L8 1.99998Z"
        stroke={strokeColor}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 9.59999L15.5 10.5L8 15L0.5 10.5L2 9.59999"
        stroke={strokeColor}
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}