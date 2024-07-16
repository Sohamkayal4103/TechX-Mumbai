"use client";

import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { SiGoogleforms } from "react-icons/si";
import { GrAnnounce } from "react-icons/gr";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdMicrophone } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  redirectLink: String;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, redirectLink: "" },
  { name: "Attendees", icon: FaPeopleGroup, redirectLink: "Attendees" },
  { name: "Speakers", icon: IoMdMicrophone, redirectLink: "Speakers" },
  { name: "Volunteers", icon: FiStar, redirectLink: "Volunteers" },
  {
    name: "Announcements",
    icon: HiOutlineSpeakerphone,
    redirectLink: "Announcements",
  },
];

const DashboardSidebar = ({ eventId }: { eventId: String }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        eventId={eventId}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent eventId={eventId} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
  eventId: String;
}

const SidebarContent = ({ eventId, onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderBottom="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 272 }}
      h="100vh"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Organizer's Dashboard
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          eventId={eventId}
          itemName={link.redirectLink}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  itemName: String;
  eventId: String;
}
const NavItem = ({
  icon,
  itemName,
  eventId,
  children,
  ...rest
}: NavItemProps) => {
  return (
    <Box
      as="a"
      href={`/Dashboard/${eventId}/${itemName}`}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Organizer's Dashboard
      </Text>
    </Flex>
  );
};

export default DashboardSidebar;
