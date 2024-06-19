// @ts-nocheck comment
"use client";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";

const NavLinks = [
  { id: 0, name: "Explore", route: "/Explore" },
  { id: 1, name: "Add Event", route: "/AddEvent" },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const router = useRouter();

  const handleLogout = async () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogin = async () => {
    loginWithRedirect();
  };

  const handleRouting = async (id) => {
    router.push(NavLinks[id].route);
  };

  const handleProfileRedirect = async () => {
    router.push("/Profile");
  };

  const handleHomeRouting = async () => {
    router.push("/");
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      px={10}
      borderBottomWidth={"0.1px "}
      borderBottomColor={"white.800"}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          spacing={8}
          alignItems={"center"}
          fontSize="26px"
          fontWeight={"bold"}
          ml="2"
          color="brand.00"
        >
          <Button
            variant={"link"}
            size="lg"
            fontSize={{ base: "20px", lg: "25px" }}
            onClick={() => {
              handleHomeRouting();
            }}
          >
            EventX
          </Button>
        </HStack>
        <Flex alignItems={"center"}>
          {isAuthenticated && (
            <div style={{ display: "flex" }}>
              {NavLinks.map(({ id, name, route }) => (
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  marginRight={4}
                  key={id}
                >
                  <Button
                    onClick={() => {
                      handleRouting(id);
                    }}
                    w="full"
                    variant="ghost"
                  >
                    {name || "Explore"}
                  </Button>
                </HStack>
              ))}
            </div>
          )}
          {isAuthenticated && (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={user.picture} />
              </MenuButton>
              <MenuList>
                <MenuItem as={Button}>
                  Welcome, {user.given_name ? user.given_name : user.nickname}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  as={Button}
                  onClick={() => {
                    handleProfileRedirect();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  as={Button}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  {" "}
                  Logout{" "}
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          {!isAuthenticated && !isLoading && (
            <Button
              display="flex"
              flexDir="row"
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<Icon as={CgProfile} boxSize={6} />}
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
          )}
          {isLoading && <div>Loading...</div>}
        </Flex>
      </Flex>

      {isAuthenticated && isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          {NavLinks.map(({ id, route, name }) => (
            <Stack key={id} as={"nav"} spacing={4}>
              <Button
                onClick={() => {
                  handleRouting(id);
                }}
                w="full"
                variant="ghost"
              >
                {name || "Explore"}
              </Button>
            </Stack>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
