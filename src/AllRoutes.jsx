import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Events from "./Pages/Events/Events";
import EventsCard from "./Pages/Events/EventCard";
import Team from "./Pages/Team/Team";
import Event from "./Pages/Events/EventCard";
import { useEffect, useState } from "react";

const AllRoutes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "unset";
    };
  }, [isModalOpen]);

  return (
    <Routes>
      <Route
        path="/events"
        element={
          <Events isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        }
      />
      <Route path="/eventsCard" element={<EventsCard />} />
      <Route
        path="/team"
        element={
          <Team isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        }
      />
      <Route
        path="/"
        element={
          <Home isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        }
      />
      <Route path="/card" element={<Event />} />
    </Routes>
  );
};

export default AllRoutes;
