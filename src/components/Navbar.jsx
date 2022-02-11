import {
  Button,
  chakra,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GiHeadbandKnot } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import { db } from "../utils/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [utype, settype] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const ref = db.collection("counsellors");

  return (
    <>
	{console.log(currentUser)}
      <chakra.header w="full" px={{ xl: 4 }} py={4} shadow="md">
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <Link to="/">
              <GiHeadbandKnot size={30} />
              <VisuallyHidden>Mental-piece</VisuallyHidden>
            </Link>
            <Text fontSize="xl" fontWeight="bold" ml="2">
              MindAid
            </Text>
          </Flex>

          <HStack color="brand.500">
            <Menu>
              <MenuButton as={Button} leftIcon={<FaRegUserCircle />}>
                tejas jagdale
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/events">Events</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/auction">Auction</Link>
                </MenuItem><MenuItem>
                  <Link to="/items">Items</Link>
                </MenuItem>
                <MenuItem onClick={onOpen}>Profile</MenuItem>
              </MenuList>
            </Menu>
            <Button
              colorScheme="orange"
              variant="solid"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};

export default Navbar;
