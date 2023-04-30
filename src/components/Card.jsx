import React from "react";
import starship from "../assets/icons/starship.svg";
import card from "../assets/icons/card.svg";
import add from "../assets/icons/add.svg";
import male from "../assets/icons/male.svg";
import female from "../assets/icons/female.svg";
import planet from "../assets/icons/planet.svg";
import vehicle from "../assets/icons/vehicle.svg";
import { useNavigate } from "react-router-dom";

const Card = ({ info, deckName }) => {
  const navigate = useNavigate();

  const navigateToDetails = (name) => {
    navigate("/details", { state: { name: name, deckName:deckName } });
  };

  return (
    <section
      onClick={() => navigateToDetails(info.name)}
      className="  bg-gray-100 transition rounded-lg pb-4 duration-700 cursor-pointer active:scale-90"
    >
      <div className="flex-cols  w-full px-4 py-2  bg-gray-400 w-full">
        <div className="flex justify-between items-center py-2  ">
          <img src={card} />
          <div className="p-2 bg-white rounded-sm ">
            <img src={add} className="w-5" />
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
            <div className="text-xs mt-1 text-gray-600">HOMEWORLD </div>
          </div>
          <div>Planet</div>
        </div>
        <div className="flex justify-between items-center mt-2 mb-4 p-2 bg-gray-300 rounded-md">
          <div className="flex space-x-2">
            <img src={vehicle} className="w-6 h-6" />
            <div  className="text-xs mt-1 text-gray-600">VEHICLES</div>
          </div>
          <div>{info.vehicles?.length}</div>
        </div>
        <div className="flex justify-between items-center mt-2 mb-4 p-2 bg-gray-300 rounded-md">
          <div className="flex space-x-2">
            <img src={starship} className="w-6 h-6" />
            <div  className="text-xs mt-1 text-gray-600">STARSHIPS </div>
          </div>
          <div>{info.starships?.length}</div>
        </div>
      </div>
    </section>
  );
};

export default Card;
