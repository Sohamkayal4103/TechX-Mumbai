import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Form from "@/components/MultiStepForm/Form";
import styles from "../page.module.css";

const AddEvent = () => {
  return (
    <div className={styles.main}>
      <Navbar />
      <Form />
    </div>
  );
};

export default AddEvent;
