import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/blog");
        setEvents(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
