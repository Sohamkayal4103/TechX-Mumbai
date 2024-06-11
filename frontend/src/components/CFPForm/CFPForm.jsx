import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faLink, faBlog } from "@fortawesome/free-solid-svg-icons";

import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

function CFPForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [blog, setBlog] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/`
    );
    const data = await response.json();
    setUserId(data[0]._id);
    console.log(data[0]._id);
  };

  const handleSubmit = async (e) => {
    const eventId = window.location.pathname.split("/")[2];
    // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/`);
    // const data = await response.json();
    // setUserId(data[0]._id);
    // console.log(data[0]._id);
    e.preventDefault();
    const cfp = {
      title,
      description,
      isApproved,
      userId,
      eventId,
      github,
      linkedin,
      twitter,
      website,
      blog,
    };
    console.log(cfp);

    const res = fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cfps/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cfp),
    });
    console.log(res);
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 3px 3px rgba(0,0,0,0.3)"
        maxWidth={600}
        p={6}
        m="10px auto"
        as="form"
        my={10}
        py={10}
        px={10}
      >
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Call For Proposals!
        </Heading>
        <Flex>
          <FormControl mr="5%" isRequired>
            <FormLabel htmlFor="first-name" fontWeight={"normal"}>
              Title
            </FormLabel>
            <Input
              id="title"
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mr="5%" isRequired>
            <FormLabel fontWeight={"normal"} my={"2%"}>
              Description
            </FormLabel>
            <Textarea
              id="description"
              type="textarea"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="email" fontWeight={"normal"} my={"2%"}>
              GitHub
              <FontAwesomeIcon
                icon={faGithub}
                style={{ marginLeft: "10px" }}
                color={"white"}
              />
            </FormLabel>
            <Input
              id="github"
              type="text"
              onChange={(e) => {
                setGithub(e.target.value);
              }}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="text" fontWeight={"normal"} my={"2%"}>
              LinkedIn
              <FontAwesomeIcon
                icon={faLinkedin}
                style={{ marginLeft: "10px" }}
              />
            </FormLabel>
            <Input
              id="linkedin"
              type="text"
              onChange={(e) => {
                setLinkedin(e.target.value);
              }}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="text" fontWeight={"normal"} my={"2%"}>
              Twitter
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ marginLeft: "10px", color: "lightblue" }}
              />
            </FormLabel>
            <Input
              id="twitter"
              type="text"
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="email" fontWeight={"normal"} my={"2%"}>
              Website{" "}
              <FontAwesomeIcon icon={faLink} style={{ marginLeft: "10px" }} />
            </FormLabel>
            <Input
              id="website"
              type="text"
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="email" fontWeight={"normal"} my={"2%"}>
              Blog{" "}
              <FontAwesomeIcon icon={faBlog} style={{ marginLeft: "10px" }} />
            </FormLabel>
            <Input
              id="blog"
              type="text"
              onChange={(e) => {
                setBlog(e.target.value);
              }}
            />
          </FormControl>
        </Flex>
        <Button colorScheme="teal" my={10} mx={"35%"} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
}
export default CFPForm;
