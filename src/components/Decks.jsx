import React, { useEffect, useState } from 'react'
import deck from "../assets/icons/deck.svg";
import remove from "../assets/icons/remove.svg";
import { useNavigate } from 'react-router-dom';

function DeckIcon({strokeColor}) {

  return (
    <svg width="25" height="25" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1.99998L15.5 6.49998L8 11L0.5 6.49998L8 1.99998Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 9.59999L15.5 10.5L8 15L0.5 10.5L2 9.59999" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  )
}

const Decks = ({card, cardName, deleteCard, index, imageClassName}) => {



    const navigate = useNavigate();

    const [allDeck, setAllDecks] = useState([])

    const viewDeck = (deckName) => {
    
        navigate("/deck/details", {
          state: { deckName: deckName },
        });
      };

      function getAllDecks() {
        const decks = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('deck-')) {
            const deck = JSON.parse(localStorage.getItem(key));
            decks.push(deck);
          }
        }
        setAllDecks(decks)
      }


     

      useEffect(()=>{
        getAllDecks()
       }, [])

       function getDeckLength(deckName) {
        
        const deck = allDeck.find((d) => d.deckName === deckName);
        if (deck) {
        
          return deck.newCards.length;
        }
        return 0;
      }

   

  return (
    <div
    key={index}
  //  h-28 is acting weird something sus inspect and see 
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

      <div
        onClick={() => deleteCard(index)}
        className="absolute top-6 right-6 bg-black/70 p-2"
      >
        <img className="w-4 " src={remove} />
      </div>
      <h2 className="absolute bottom-4 left-4 text-3xl text-white font-semibold">
        {card.cardName}
      </h2>
    </div>
    <div  onClick={() => viewDeck(card.cardName)} className="bg-white h-full rounded-t-0 rounded-b-md flex justify-between px-6">
      <p className="text-6xl pt-2 pb-4">{getDeckLength(cardName)}</p>

      <p className="pt-4 text-gray-500">total cards</p>
    </div>
  </div>
  )
}

export default Decks