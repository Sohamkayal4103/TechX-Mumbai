//@ts-nocheck comment
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  InputLeftElement,
  useToast,
  VisuallyHidden,
  Stack,
  Icon,
  chakra,
  Text,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import axios from "axios";
import { Content } from "next/font/google";
import { title } from "process";

const obj = {
  answer1: "",
  answer2: "",
  eventId: "",
  userId: "",
};
console.log(obj);

// Multistep Form : Step 1

// const Form1 = () => {
//   const [show, setShow] = React.useState(false);
//   const handleClick = () => setShow(!show);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   // obj.name = name;
//   // obj.email = email;

//   return (
//     <div>
//       <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
//         Add Your Session Details
//       </Heading>
//       <FormControl isRequired>
//         <FormLabel fontWeight={"normal"}>Your Name</FormLabel>
//         <Input
//           placeholder="Your Full Name..."
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </FormControl>
//       <FormControl mt={8} isRequired>
//         <FormLabel fontWeight={"normal"}>Your Email</FormLabel>
//         <Input
//           placeholder="Your Email..."
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </FormControl>
//     </div>
//   );
// };

// Multistep Form : Step 2

const Form2 = () => {
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const inputRef = useRef();

  obj.answer1 = ans1;
  obj.answer2 = ans2;
  return (
    <div>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Volunteers Form
      </Heading>

      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="description" fontWeight={"normal"}>
          How can you help us organize this event better?
        </FormLabel>
        <Textarea
          placeholder="What kind of help or services are you willing to offer?"
          rows={3}
          shadow="sm"
          fontSize={{
            sm: "sm",
          }}
          onChange={(e) => setAns1(e.target.value)}
        />
        <FormHelperText>
          Brief description for the event. URLs are hyperlinked.
        </FormHelperText>
      </FormControl>
      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="description" fontWeight={"normal"}>
          Do you have any previous experience in Volunteering?
        </FormLabel>
        <Textarea
          placeholder="Please describe previous volunteering experiences if any..."
          rows={3}
          shadow="sm"
          fontSize={{
            sm: "sm",
          }}
          onChange={(e) => setAns2(e.target.value)}
        />
        <FormHelperText>
          Brief description for the event. URLs are hyperlinked.
        </FormHelperText>
      </FormControl>
    </div>
  );
};

// Multistep Form : Step 3

// const Form3 = () => {
//   const [linkedin, setLinkedin] = useState("");
//   const [twitter, setTwitter] = useState("");
//   const [otherLink, setOtherLink] = useState("");

//   obj.linkedin = linkedin;
//   obj.twitter = twitter;
//   obj.otherLink = otherLink;
//   console.log(obj);

//   return (
//     <div>
//       <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
//         Add Session Details
//       </Heading>
//       <FormControl mt="2%" isRequired>
//         <FormLabel fontWeight={"normal"}>Add Linkedin</FormLabel>

//         <Input
//           placeholder="Enter Linkedin"
//           min={1}
//           onChange={(e) => setLinkedin(e.target.value)}
//         />
//       </FormControl>
//       <FormControl mt="2%">
//         <FormLabel fontWeight={"normal"}>Add twitter</FormLabel>
//         <InputGroup>
//           <Input
//             placeholder="Enter Twitter Id"
//             onChange={(e) => setTwitter(e.target.value)}
//           />
//         </InputGroup>
//       </FormControl>
//       <FormControl mt="2%">
//         <FormLabel fontWeight={"normal"}>Add any other link</FormLabel>
//         <InputGroup>
//           <Input
//             placeholder="Enter any other link that showcases your work"
//             onChange={(e) => setOtherLink(e.target.value)}
//           />
//         </InputGroup>
//       </FormControl>
//     </div>
//   );
// };

// Multistep Form : Final Step

const Form = ({ eventId }) => {
  obj.eventId = eventId;
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [id, setId] = useState("");

  const { user } = useAuth0();
  const email = user?.email;
  useEffect(() => {}, []);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    // const formData = new FormData();
    // formData.append("title", obj.topic);
    // formData.append("description", obj.description);
    // formData.append("linkedin", obj.linkedin);
    // formData.append("twitter", obj.twitter);
    // formData.append("otherLink", obj.sampleLink);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${email}`
    );
    const data = await res.json();
    setId(data._id);
    obj.userId = data._id;
    console.log(id);
    // formData.append("userId", data._id);
    // formData.append("eventId", obj.eventId);
    console.log(eventId);
    // console.log(formData);

    // axios
    //   .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cfps/add`, formData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const volunteerRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteers/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: eventId,
          userId: data._id,
          answer1: obj.answer1,
          answer2: obj.answer2,
        }),
      }
    );
    const resData = await volunteerRes.json();
    console.log(resData);
    console.log(obj);

    toast({
      title: "Details Submitted.",
      description: "The organizers will review your application.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSubmitted(true);
  };
  return (
    <div>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
        bg={"black"}
        w={{ base: "400px", md: "600px", lg: "800px" }}
        borderRadius={"10px"}
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        <Form2 />
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 50);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 1}
                onClick={() => {
                  setStep(step + 1);

                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 50);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 1 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default Form;
