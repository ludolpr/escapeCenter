import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img
        src={`http://127.0.0.1:8000/storage/uploads/blogs/${event.picture_blog}`}
        alt={event.name_blog}
        className="event-image"
      />
      <h2 className="event-title">{event.name_blog}</h2>
      <p className="event-description">{event.description_blog}</p>
    </div>
  );
};

export default EventCard;
