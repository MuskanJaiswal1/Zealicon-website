import React from "react";
import CardData from "./Eventsdata.jsx";
import { useEffect, useState } from "react";

const EventCard = () => {
  const [eventCard, seteventCard] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    seteventCard(CardData);
  }, []);

  return (
    <div className="px-8 md:px-12 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-7">
      {eventCard.map((Member) => (
        <div className="max-h-[550px] w-70 px-4 py-2 bg-gradient-to-tr from-[#0A2530] to-black rounded-lg flex flex-col items-center my-6" >
          <img src={Member.icon} alt="" className="w-full h-1/2 mt-6 pb-4" />
          <h1 className="text-xl md:text-3xl font-[rabu-kliwon] pt-2 text-[#7EF2F6]">
            {Member.title}
          </h1>
          <h2 className="text-lg  font-semibold text-slate-300">
            {Member.venue}
          </h2>
          <h2 className="text-lg font-semibold text-slate-300">
            {Member.duration}
          </h2>
          <p className="text-lg text-slate-300 text-center my-4">
            {Member.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
