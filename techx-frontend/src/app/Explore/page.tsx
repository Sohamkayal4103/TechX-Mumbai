//@ts-nocheck comment
"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import { Grid, Flex, Center, HStack, VStack, Heading } from "@chakra-ui/react";
import EventCard from "@/components/EventCard/EventCard";

const Explore = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`
      );
      const data = await response.json();
      setEvents(data);
      console.log(data);
    };

    getEvents();
  }, []);
  return (
    <div className={styles.main}>
      <Navbar />
      {events.length == 0 ? (
        <VStack h={"80vh"}>
          <Center mt={"300px"}>
            <Heading as="h3" size="2xl" noOfLines={1}>
              No events found
            </Heading>
          </Center>
        </VStack>
      ) : (
        <div>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} minW={100} m={8}>
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Explore;
