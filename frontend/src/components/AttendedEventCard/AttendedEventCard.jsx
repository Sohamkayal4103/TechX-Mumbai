import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const AttendedEventCard = ({ event }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [domain, setDomain] = useState("");
  const [mode, setMode] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const eventId = window.location.pathname.split("/")[2];
    const getEvent = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/${event}`
      );
      const data = await response.json();
      if (data.title) {
        setTitle(data.title);
      }
      console.log(data.title);
      setDescription(data.description);
      console.log(data.description);
      setDate(data.date);
      setImage(data.image);
      setDomain(data.domain);
      setMode(data.mode);
      console.log(data);
    };
    getEvent();
  }, [event]);

  return (
    <div>
      {" "}
      <Center py={6}>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Box
            h={"210px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            <Image src={image} layout={"fit"} h={"210px"} w={"full"} />
          </Box>
          <Stack>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {domain}
            </Text>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {title}
            </Heading>
            <Text color={"gray.500"}>{description}</Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar src={user.picture} alt={"Author"} />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{user.name}</Text>
              <Text color={"gray.500"}>{date}</Text>
            </Stack>
            <Stack>
              <Text ml={8} color={"green.400"} px={10} fontWeight={"bold"}>
                {mode}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </div>
  );
};

export default AttendedEventCard;
