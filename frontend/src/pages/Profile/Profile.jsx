import React from "react";
import {
  Flex,
  Heading,
  Text,
  Stack,
  Button,
  Avatar,
  Grid,
  Center,
  Box,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Home from "../Home/Home";
import { Navigate } from "react-router-dom";
import AttendedEventCard from "../../components/AttendedEventCard/AttendedEventCard";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [attendedEvents, setAttendedEvents] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setName(data.name);
      setEmail(data.email);
      setImage(data.image);
      setAttendedEvents(data.attendedEvents);
    };
    if (isAuthenticated) {
      getUser();
    }
  }, [user.email, isAuthenticated]);

  return (
    <div>
      <Text>Welcome back, {name}</Text>
      <Flex justifyContent="space-between">
        <Flex
          ml={6}
          flexDirection="column"
          justifyContent="center"
          alignItems="left"
          mt={6}
        >
          <Avatar
            size="2xl"
            name={name}
            src={image}
            justifyContent="center"
            ml={6}
          />
          <Stack spacing={4} ml={4} mt={2}>
            <Heading fontSize="2xl">{name}</Heading>
            <Text>{email}</Text>
          </Stack>
        </Flex>

        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={6}
          ml="20px"
          alignItems="right"
        >
          {attendedEvents.map((event) => (
            <div>
              <AttendedEventCard event={event} />
            </div>
          ))}
        </Grid>
      </Flex>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Home />,
});
