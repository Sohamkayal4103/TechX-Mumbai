import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";

import AdminCard from "../../components/AdminCard/AdminCard";
import { useAuth0 } from "@auth0/auth0-react";

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [checked, setChecked] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [password, setPassword] = useState("");

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

  const checkUser = (e) => {
    e.preventDefault();
    if (
      (user.email === "sohamkayal012@gmail.com" ||
        user.email === "mukulkolpe45@gmail.com" ||
        user.email === "sarveshlimaye2002@gmail.com") &&
      password === "root"
    ) {
      setChecked(true);
    }
  };

  return (
    <div>
      {!checked ? (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Enter Admin Security Key
            </Heading>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={checkUser}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap={4} minW={100} m={8}>
          {events.map((event) => (
            <AdminCard
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
      )}
    </div>
  );
};

export default Admin;
