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
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const collectData = async () => {
    try {
      let name = user.name;
      let email = user.email;
      let image = user.picture;
      let result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            image,
          }),
        }
      );

      result = await result.json();
      //console.log(result);
    } catch (e) {
      console.log("User Exists");
    }
  };

  if (isAuthenticated) {
    collectData();
  }

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.800")} px={10}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
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
            <Link to="/">TechXMumbai</Link>
          </HStack>
          <Flex alignItems={"center"}>
            {isAuthenticated && (
              <div style={{ display: "flex" }}>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  marginRight={4}
                >
                  <Link to="/explore">
                    <Button w="full" variant="ghost">
                      Explore
                    </Button>
                  </Link>
                </HStack>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  marginRight={4}
                >
                  <Link to="/add-event">
                    <Button w="full" variant="ghost">
                      Add Events
                    </Button>
                  </Link>
                </HStack>
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
                  <MenuItem>
                    Welcome, {user.given_name ? user.given_name : user.nickname}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    {" "}
                    <LogoutButton />{" "}
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
              >
                <LoginButton />
              </Button>
            )}
            {isLoading && <div>Loading...</div>}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link to="/explore">
                <Button w="full" variant="ghost">
                  Explore
                </Button>
              </Link>
            </Stack>
            <Stack as={"nav"} spacing={4}>
              <Link to="/add-event">
                <Button w="full" variant="ghost">
                  Add Events
                </Button>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
