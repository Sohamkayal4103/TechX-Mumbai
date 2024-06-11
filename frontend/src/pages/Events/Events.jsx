import React, { useState, useEffect } from "react";
import { Grid, Flex } from "@chakra-ui/react";

import EventCard from "../../components/EventCard/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/events`
      );
      const data = await response.json();
      setEvents(data);
    };

    getEvents();
  }, []);

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} minW={100} m={8}>
        {events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            description={event.description}
            isApproved={event.isApproved}
            time={event.time}
            date={event.date}
            image={event.image}
            mode={event.mode}
            location={event.location}
            price={event.price}
            speakerApplications={event.speakerApplications}
            speakers={event.speakers}
            attendees={event.attendees}
            volunteers={event.volunteers}
            tickets={event.tickets}
            volunteersApplications={event.volunteersApplications}
            organizer={event.organizer}
            domain={event.domain}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Events;
