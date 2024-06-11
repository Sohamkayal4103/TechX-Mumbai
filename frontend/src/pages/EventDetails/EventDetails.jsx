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
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Simple() {
  const [event, setEvent] = useState({});
  const [title, setTitle] = useState("");
  const [orgemail, setOrgemail] = useState("");
  const { user } = useAuth0();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    const eventId = window.location.pathname.split("/")[2];
    const getEvent = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`
      );
      const data = await response.json();
      setOrgemail(data.organizer.email);
      setEvent(data);
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setImage(data.image);
      setAttendees(data.attendees);
      setLat(data.latitude);
      setLng(data.longitude);

      console.log(data.latitude, data.longitude);
    };
    getEvent();

    const stripe = async () => {
      console.log(price);
      console.log(title);
      if (event.price && event.title && event.description) {
        console.log("all good");
        let response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/stripe/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: event.price,
              name: event.title,
              description: event.description,
              image: event.image,
              id: event._id,
            }),
          }
        );
        let result = await response.json();
        setUrl(result.url);
        console.log(result.url);
      }
    };
    stripe();
  }, [event.price, event.title, event.description, event.image]);

  const [url, setUrl] = useState("");
  return (
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
              "https://www.travelperk.com/wp-content/uploads/alexandre-pellaes-6vAjp0pscX0-unsplash-1-1-720x480.jpg"
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
            marginBottom={"30px"}
          />

          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB5mC45USvzTjQQbn4gWdlKOHHpKs6Yvn8&q=${lat},${lng}`}
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
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{event.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Time & Venue
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Location</ListItem>
                  <ListItem>Date</ListItem> <ListItem>Mode</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>{event.location}</ListItem>
                  <ListItem>{event.date}</ListItem>
                  <ListItem>{event.mode}</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
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
                  </Text>{" "}
                  {(event.speakers || []).map((speaker) => {
                    <Text>{speaker}</Text>;
                  })}
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
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
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
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
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
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Apply as volunteer
          </Button>
          {user.email === orgemail ? (
            <Button
              rounded={"none"}
              w={"md"}
              size={"lg"}
              py={"7"}
              ml={16}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
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
  );
}
