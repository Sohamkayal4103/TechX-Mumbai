import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [dbUser, setDbUser] = useState({});
  const [event, setEvent] = useState({});
  const navigate = useNavigate();

  const eventId = window.location.pathname.split("/")[2];
  const getUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.email}`
    );
    const data = await response.json();
    console.log(data);
    setDbUser(data);

    if (eventId) {
      var ind = data.attendedEvents.indexOf(eventId);
      if (ind == -1) {
        const res2 = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/update/${data._id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              attendedEvents: eventId,
            }),
          }
        );
        console.log(res2);
      }
    }
  };

  const getEvent = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`
    );
    const data = await response.json();
    console.log(data);
    setEvent(data);

    var ind = data.attendees.indexOf(dbUser._id);
    if (dbUser._id) {
      if (ind == -1) {
        const res2 = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/attendees/${eventId}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              attendees: dbUser._id,
            }),
          }
        );
        console.log(res2);
      }
    }
  };
  const handleClick = async () => {
    getUser();
    getEvent();
    navigate("/");
  };

  return (
    <div>
      {user && (
        <div>
          <Box textAlign="center" py={10} px={6}>
            <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              You are registered successfullt for the event! Thank you!
            </Heading>
            <Text color={"gray.500"}>
              <button onClick={handleClick}>Back to Home Page</button>
            </Text>
          </Box>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
