//@ts-nocheck comment
"use client";

import { Box, Heading, Text, useRadio, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const obj = {
  userId: "",
  eventId: "",
  checkoutSessionId: "",
  name: "",
};

const SuccessPage = () => {
  const { user } = useAuth0();
  const router = useRouter();

  const checkStatus = async () => {
    obj.checkoutSessionId = localStorage.getItem("sessionId");
    obj.eventId = localStorage.getItem("eventId");
    obj.userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("checkoutSessionId", obj.checkoutSessionId);
    formData.append("eventId", obj.eventId);
    formData.append("userId", obj.userId);
    //formData.append("name", name);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/checkPayment`,
        formData
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkStatus();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Payment Processing
        </Heading>
        <Text color={"gray.500"}>
          We are taking a note of your payment. You will soon be redirected. You
          can view your ticket in your profile and it will also be emailed to
          you.
        </Text>
      </Box>
    </div>
  );
};

export default SuccessPage;
