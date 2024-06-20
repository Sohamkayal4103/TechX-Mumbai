//@ts-nocheck comment
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import styles from "../../page.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
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
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";

const Event = ({ params }: { params: { eventId: string } }) => {
  //console.log(params.eventId);
  const [event, setEvent] = useState({});
  const [title, setTitle] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const { user } = useAuth0();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [url, setUrl] = useState("");
  const [signal, setSignal] = useState(0);

  const greyCol = useColorModeValue("gray.200", "gray.600");
  const yellowCol = useColorModeValue("yellow.500", "yellow.300");
  const whiteCol = useColorModeValue("white", "gray.900");
  const greyCol2 = useColorModeValue("gray.900", "gray.50");

  const getEvent = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${params.eventId}`
      );
      console.log(response);
      setOrgEmail(response.data.organizer.email);
      setEvent(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setImage(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${response.data.image}`
      );
      console.log(image);
      setAttendees(response.data.attendees);
      setLat(response.data.latitude);
      setLng(response.data.longitude);
      setSignal(signal + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const stripe = async () => {
    console.log(price);
    console.log(title);
    if (event?.price && event?.title && event?.description) {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: event?.price,
            name: event?.title,
            description: event?.description,
            image: event?.image,
            id: event?._id,
          }),
        }
      );
      let result = await response.json();
      console.log(response);
      setUrl(result.url);
      console.log(result.url);
    }
  };

  const preLoad = async () => {
    await getEvent();
    await stripe();
  };

  useEffect(() => {
    if (signal < 2) {
      preLoad();
    }
  });
  return (
    <div className={styles.main}>
      <Navbar />
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex flexDirection="column">
            <Image
              rounded={"md"}
              alt={"product image"}
              src={
                image ||
                "https://www.travelperk.com/wp-content/uploads/alexandre-pellaes-6vAjp0pscX0-unsplash-1-1-720x480.jpg"
              }
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
              marginBottom={"30px"}
            />

            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GCLOUD_API_KEY}&q=${lat},${lng}`}
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, borderRadius: "5px" }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {event.title}
              </Heading>
              <Text
                fontSize={"2xl"}
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                letterSpacing={1.1}
              >
                {event.domain}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<StackDivider borderColor={greyCol} />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"lg"}>{event.description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={yellowCol}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Time & Venue
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem
                      minH={
                        event?.location?.length > 40 ? { md: "50px" } : null
                      }
                    >
                      Location
                    </ListItem>
                    <ListItem>Date</ListItem> <ListItem>Mode</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem
                      minH={
                        event?.location?.length > 40 ? { md: "50px" } : null
                      }
                    >
                      {event?.location?.substring(0, 40)}...
                    </ListItem>
                    <ListItem>{`${event?.date?.substring(
                      0,
                      10
                    )} , ${event?.date?.substring(11, 16)} hrs.`}</ListItem>
                    <ListItem>{event.mode}</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={yellowCol}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Other Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Tickets Left:
                    </Text>{" "}
                    {event.tickets - attendees.length}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Speakers:
                    </Text>
                    {"  "}
                    {event?.speakers?.length === 0
                      ? "No Speakers as of Now"
                      : event?.speakers?.map((speaker) => ({ speaker }))}
                  </ListItem>
                </List>
              </Box>
            </Stack>

            <Button
              rounded={"none"}
              w={"md"}
              ml={16}
              size={"lg"}
              py={"7"}
              bg={greyCol2}
              color={whiteCol}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              <a href={url} aria-label="Category">
                Buy Ticket (₹{event.price})
              </a>
            </Button>
            <Button
              rounded={"none"}
              w={"md"}
              ml={16}
              size={"lg"}
              py={"7"}
              bg={greyCol2}
              color={whiteCol}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Apply as speaker
            </Button>
            <Button
              rounded={"none"}
              w={"md"}
              size={"lg"}
              py={"7"}
              ml={16}
              bg={greyCol2}
              color={whiteCol}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Apply as volunteer
            </Button>
            {user?.email === orgEmail ? (
              <Button
                rounded={"none"}
                w={"md"}
                size={"lg"}
                py={"7"}
                ml={16}
                bg={greyCol2}
                color={whiteCol}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                <Link href={`/explore/${event._id}/cfp`}>View CFP</Link>
              </Button>
            ) : null}
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Event;
