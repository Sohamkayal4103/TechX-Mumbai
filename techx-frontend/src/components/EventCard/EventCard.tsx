//@ts-nocheck comment
import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const EventCard = ({ event }) => {
  const router = useRouter();
  let img = event.image;
  img = `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${event.image}`;
  //console.log(img);

  const handleRouting = async () => {
    if (event?._id) {
      router.push(`/Event/${event._id}`);
    } else {
      router.push("/");
    }
  };

  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        maxH={"600px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box maxH={"190px"} bg={"gray.100"} mt={-6} mx={-6} mb={6}>
          <Image
            src={
              event.image
                ? img
                : "https://www.travelperk.com/wp-content/uploads/alexandre-pellaes-6vAjp0pscX0-unsplash-1-1-720x480.jpg"
            }
            layout={"fit"}
            w={"full"}
            maxH={"210px"}
          />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {event.domain || "Event Domain"}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
            minH={"65px"}
          >
            {event.title || "Event Title"}
          </Heading>
          <Text minH={"100px"} color={"gray.500"}>
            {event.description?.substring(0, 150) + "..." ||
              "Event Description"}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={
              event?.organizer?.image
                ? event?.organizer?.image
                : "https://www.travelperk.com/wp-content/uploads/alexandre-pellaes-6vAjp0pscX0-unsplash-1-1-720x480.jpg"
            }
            alt={"Author"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>
              {event?.organizer?.name || "Organizer"}
            </Text>
            <VStack>
              <Text color={"gray.500"}>
                {event.date?.substring(0, 10)} {event.date?.substring(11, 16)}
              </Text>
            </VStack>
          </Stack>
          <Stack>
            <Text
              ml={8}
              color={"green.400"}
              px={10}
              fontWeight={"bold"}
              fontSize={{ base: "15px", md: "17px" }}
              w={{ base: "160px", md: "180px" }}
            >
              {event?.mode || "Online"}
            </Text>
          </Stack>
        </Stack>
        <Button
          w={"full"}
          mt={8}
          colorScheme="teal"
          variant="outline"
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
            variant: "solid",
          }}
          onClick={() => {
            handleRouting();
          }}
        >
          View Details
        </Button>
      </Box>
    </Center>
  );
};

export default EventCard;
