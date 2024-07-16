"use client";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Heading,
  Text,
  useRadio,
  Button,
  Divider,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";
import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";
import Navbar from "@/components/Navbar/Navbar";

const AnnouncementsPage = ({ params }: { params: { eventId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState();
  const [processedDate, setProcessedDate] = useState("");
  const [displayDate, setDisplayData] = useState<String>("main");
  const { user } = useAuth0();

  const loadAndCheck = async () => {
    console.log(user);
    if (user) {
      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.email}`
      );
      const userData = await userRes.json();
      console.log(userData);
      const eventRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${params.eventId}`
      );
      const eventData = await eventRes.json();
      console.log(eventData);
      if (eventData.organizer._id === userData._id) {
        console.log("Check passed. User authorized");
        setEventDetails(eventData);
        setLoading(false);
      } else {
        console.log("Unauthorized User");
      }
    } else {
      console.log("user still not defined");
    }
  };

  const changeDisplayData = async (newDisplay: String) => {
    setDisplayData(newDisplay);
    console.log(`Data changed to: ${newDisplay}`);
  };

  useEffect(() => {
    loadAndCheck();
  }, [user]);

  if (loading) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <NotAllowedIcon boxSize={"50px"} color={"red.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Only Admin Access
        </Heading>
        <Text color={"gray.500"}>
          Only Admin can access the Event Dashboard.
        </Text>
      </Box>
    );
  }

  return (
    <div>
      <Navbar />
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <DashboardSidebar eventId={params.eventId} />
      </Flex>
    </div>
  );
};

export default AnnouncementsPage;
