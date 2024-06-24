//@ts-nocheck comment
"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Form from "@/components/MultiStepForm3/Form";
import styles from "../../page.module.css";

const SpeakerForm = ({ params }: { params: { eventId: string } }) => {
  return (
    <div className={styles.main}>
      <Navbar />
      <Form eventId={params.eventId} />
    </div>
  );
};

export default SpeakerForm;
