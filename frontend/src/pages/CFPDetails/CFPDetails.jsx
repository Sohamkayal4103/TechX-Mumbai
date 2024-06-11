import React, { useState, useEffect } from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const data = [
  {
    name: "Segun Adebayo",
    email: "sage@chakra.com",
  },
  {
    name: "Josef Nikolas",
    email: "Josef@mail.com",
  },
  {
    name: "Lazar Nikolov",
    email: "Lazar@mail.com",
  },
  {
    name: "Abraham",
    email: "abraham@anu.com",
  },
];

export default function CFPDetails() {
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  const [cfp, setCfp] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getCFP = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/cfps/event/${id}`
      );
      const data = await response.json();
      console.log(data);
      setCfp(data);
    };

    getCFP();
  }, []);

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "gray.800",
      }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{
          base: "column",
        }}
        w="full"
        bg={{
          md: bg,
        }}
        shadow="lg"
      >
        {cfp.map((proposal, pid) => {
          return (
            <Flex
              direction={{
                base: "row",
                md: "column",
              }}
              bg={dataColor}
              key={pid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{
                  base: 1,
                  md: 3,
                }}
                w={{
                  base: 120,
                  md: "full",
                }}
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={{
                  base: 1,
                  md: 4,
                }}
                px={{
                  base: 2,
                  md: 10,
                }}
                fontSize="md"
                fontWeight="hairline"
              >
                <span>Name</span>
                <span>Email</span>
                <chakra.span
                  textAlign={{
                    md: "right",
                  }}
                >
                  Actions
                </chakra.span>
              </SimpleGrid>
              <SimpleGrid
                spacingY={3}
                columns={{
                  base: 1,
                  md: 3,
                }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{proposal.title}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {proposal.userId.email}
                </chakra.span>
                <Flex
                  justify={{
                    md: "end",
                  }}
                >
                  <Button
                    variant="solid"
                    colorScheme={proposal.isApproved ? "green" : "red"}
                    size="sm"
                  >
                    {proposal.isApproved ? "Approved" : "Not Approved"}
                  </Button>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}
