//@ts-nocheck comment
"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import styles from "../../page.module.css";
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
import { useAuth0 } from "@auth0/auth0-react";
import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

const obj = {};

const EventDashboard = ({ params }: { params: { eventId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState();
  const [processedDate, setProcessedDate] = useState("");
  const [displayDate, setDisplayData] = useState("main");

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
        processDate(eventData?.date);
        setLoading(false);
      } else {
        console.log("Unauthorized User");
      }
    } else {
      console.log("user still not defined");
    }
  };

  const loadEvents = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`
    );
    const data = await res.json();
    console.log(data);
    if (obj?.eventList1?.length == data.length) {
      obj.eventList2 = data;
    } else {
      obj.eventList1 = data;
    }
    console.log(obj);
  };

  const processDate = async (eventDate) => {
    let ans = "";

    ans += eventDate.substring(8, 10);
    ans += "-";
    ans += eventDate.substring(5, 7);
    ans += "-";
    ans += eventDate.substring(0, 4);
    setProcessedDate(ans);
  };

  const changeDisplayData = async (newDisplay) => {
    setDisplayData(newDisplay);
    console.log(`Data changed to: ${newDisplay}`);
  };

  useEffect(() => {
    loadAndCheck();
  }, [user]);

  // useEffect(() => {
  //   loadEvents();
  // }, []);

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
        <Box mt={{ md: 4 }} ml={{ md: 4 }}>
          <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
              textAlign={"center"}
              fontSize={"4xl"}
              py={10}
              fontWeight={"bold"}
            >
              Welcome {user?.name} !
            </chakra.h1>
            <Divider w={"100vw"} />
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 5, lg: 8 }}
              mt={"20px"}
            >
              <StatsCard
                title={"Event Name"}
                stat={eventDetails?.title || "Event Title"}
                icon={<BsPerson size={"3em"} />}
              />
              <StatsCard
                title={"Speaker Requests"}
                stat={eventDetails?.speakerApplications?.length || "-"}
                icon={<FiServer size={"3em"} />}
              />
              <StatsCard
                title={"Volunteer Requests"}
                stat={eventDetails?.volunteerApplications?.length || "-"}
                icon={<GoLocation size={"3em"} />}
              />
              <StatsCard
                title={"Total Applications"}
                stat={eventDetails?.attendees?.length || "-"}
                icon={<GoLocation size={"3em"} />}
              />
              <StatsCard
                title={"Location"}
                stat={eventDetails?.location || "-"}
                icon={<GoLocation size={"3em"} />}
              />
              <StatsCard
                title={"Date"}
                stat={processedDate || "1st Jan 2024"}
                icon={<GoLocation size={"3em"} />}
              />
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default EventDashboard;
