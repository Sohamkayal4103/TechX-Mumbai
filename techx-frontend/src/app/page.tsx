//@ts-nocheck comment
"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
  const handelClick = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cfps/checkPayment`,
      {
        method: "POST",
        body: JSON.stringify({
          checkoutSessionId:
            "cs_test_a1Owu3lQHxnXl0F2YnaWNGGWBULbFzQDtgvsD83dMxObp29fVExCtwFk9s",
          userId: "6670a935f59738f212a2a986",
          eventId: "66744d77bb9f3ad2f6a1e477",
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "checkoutSessionId",
      "cs_test_a1Owu3lQHxnXl0F2YnaWNGGWBULbFzQDtgvsD83dMxObp29fVExCtwFk9s"
    );
    formData.append("userId", "6670a935f59738f212a2a986");
    formData.append("eventId", "66744d77bb9f3ad2f6a1e477");
    console.log(formData);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/checkPayment`,
        JSON.stringify(formData)
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(events.json());
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <Button
        onClick={() => {
          handleSubmit();
        }}
      >
        Test Button
      </Button>
    </main>
  );
}
