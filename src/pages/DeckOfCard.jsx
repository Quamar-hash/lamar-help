import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadscrum from "../components/Breadscrum";
import Controls from "../components/Controls";
import add from "../assets/icons/add.svg";

import male from "../assets/icons/male.svg";
import female from "../assets/icons/female.svg";
import planet from "../assets/icons/planet.svg";
import vehicle from "../assets/icons/vehicle.svg";
import move from "../assets/icons/move.svg";
import remove from "../assets/icons/remove.svg";
import starship from "../assets/icons/starship.svg";
import card from "../assets/icons/card.svg";

const DeckOfCard = () => {
  const location = useLocation();
  const deckName = location.state.deckName;

  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [myCards, setMyCards] = useState([]);
  const [active, setActive] = useState(false)
  const [allDecks, setAllDecks] = useState([])
  const [selectedCard, setSelectedCard] = useState([])
  const [possibleDeck, setPossibleDeck] = useState([])
  const [id, setId] = useState("")

  const navigate = useNavigate();

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

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem(`deck-${deckName}`));
  
    if (cards) {
      setMyCards(cards.newCards);
    }
  }, []);

  const deleteCard = (id) => {
    const updatedCards = [...myCards];
    updatedCards.splice(id, 1);
    setMyCards(updatedCards);
    localStorage.setItem(deckName, JSON.stringify(updatedCards));
    alert("card succesfully deleted");
  };

  function getAllDeckNames() {
    const decks = []
    const allDeck = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('deck-')) {
        const deck = JSON.parse(localStorage.getItem(key));
        allDeck.push(deck)
        decks.push(deck.deckName);
      }
    }
    setAllDecks(allDeck)
    setPossibleDeck(decks)
    
  }

  const moveCard = (event, info, index) => {

 setSelectedCard(info)
 setId(index)
  getAllDeckNames()
  const buttonRect = event.target.getBoundingClientRect();
  setButtonPos({ x: buttonRect.x, y: buttonRect.y });

  setActive(true)

  


  };

 

   const moveItem = (itemName) => {
    
        // Get the existing deck from localStorage
const existingDeck = JSON.parse(localStorage.getItem(`deck-${itemName}`));

if (existingDeck) {
  // If the key exists, update the newCards array
  const newCards = [...existingDeck.newCards, selectedCard];
  existingDeck.newCards = newCards;

  // Save the updated object back to localStorage
  localStorage.setItem(`deck-${itemName}`, JSON.stringify(existingDeck));
} else {
  // If the key does not exist, create a new object and save it to localStorage
  const newDeck = {
    deckName: itemName,
    newCards: [selectedCard],
  };
  
  localStorage.setItem(`deck-${itemName}`, JSON.stringify(newDeck));


   }

   deleteCard(id)

  }

  
   console.log(allDecks)
  

  return (
    <section className="h-full">
      <Breadscrum state1="Decks" state2={deckName} />
      <div className="flex justify-between      ">
        <Controls />

        <div
          className="p-2 mr-16 bg-white rounded-sm"
          onClick={() => navigate("/", { state: { deckName: deckName } })}
        >
          <img src={add} className="w-5" />
        </div>
      </div>

      <div className="px-16 mt-4">
        <p>
          Deck empty, click the plus icon on the right to start building your
          deck
        </p>

        <div className=" grid  md:grid-cols-2 lg:grid-cols-5 grid-cols-1 gap-4  mt-4 mb-8 ">
          {myCards.map((info, id) => {
            return (
              <section
                key={id}
                
                className="  bg-gray-100 transition rounded-lg pb-4 duration-700 cursor-pointer active:scale-90"
              >
                <div className="flex-cols   px-4 py-2  bg-gray-400 w-full">
                  <div className="flex justify-between items-center py-2  ">
                    <img src={card} />
                    <div className="flex items-center space-x-3">
                      <div
                        onClick={(event)=>moveCard(event, info, id)}
                        className="p-2 bg-white rounded-sm "
                      >
                        <img src={move} className="w-5" />
                      </div>
                      <div onClick={() => deleteCard(id)} className="p-2 bg-white   rounded-sm ">
                        <img src={remove} className="w-5 text-black" />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold">{info.name}</h2>
                </div>
                <div className="mt-4 md:px-8 px-4">
                  <div className="w-full     flex items-center justify-between ">
                    <div className="flex items-center">
                      <img src={info.gender === "male" ? male : female} />
                      <p>{info.birth_year || "unknown"}</p>
                    </div>

                    <p>Species</p>
                  </div>

                  <hr className="mt-2 mb-4 border-gray-500" />

                  <div className="flex justify-between items-center mt-2 mb-4 p-2 bg-gray-300 rounded-md">
                    <div className="flex space-x-2">
                      <img src={planet} className="w-6 h-6" />
                      {/* made text smaller nd a bit grayer  COULD have used the mapped so you dont have repeated styles */}
                      <div className="text-xs mt-1 text-gray-600">
                        HOMEWORLD{" "}
                      </div>
                    </div>
                    <div>Planet</div>
                  </div>
                  <div className="flex justify-between items-center mt-2 mb-4 p-2 bg-gray-300 rounded-md">
                    <div className="flex space-x-2">
                      <img src={vehicle} className="w-6 h-6" />
                      <div className="text-xs mt-1 text-gray-600">VEHICLES</div>
                    </div>
                    <div>{info.vehicles?.length}</div>
                  </div>
                  <div className="flex justify-between items-center mt-2 mb-4 p-2 bg-gray-300 rounded-md">
                    <div className="flex space-x-2">
                      <img src={starship} className="w-6 h-6" />
                      <div className="text-xs mt-1 text-gray-600">
                        STARSHIPS{" "}
                      </div>
                    </div>
                    <div>{info.starships?.length}</div>
                  </div>
                </div>
              </section>
            );
          }, [])}
        </div>

        <div
             ref={divRef}
         className={`${active ? "block" : "hidden"} px-2 bg-[#eee] h-96 w-[250px]  absolute left-0 top-0 transform transition-all duration-500 `}
         style={{ top: buttonPos.y + 40, left: buttonPos.x-200 }}

         >
          <h2 clasName="text-gray-400  font-lg">Select a deck</h2>
          <hr />
      {possibleDeck.map((item, index) => {
        console.log(item)
        return (
          <div onClick={()=>moveItem(item)}
     
           className="bg-white text-black px-4 py-2 text-lg font-semibold my-2 rounded-md shadow-md cursor-pointer"
          >
            <p>{item}</p>
          </div>
        );
      })}
    </div>

    {/* <div
        ref={divRef}
        className="bg-gray-200 absolute left-0 top-0 transform transition-all duration-500"
        style={{ top: buttonPos.y + 30, left: buttonPos.x }}
      >
        This div is positioned below the button!
      </div> */}

      </div>
    </section>
  );
};

export default DeckOfCard;
