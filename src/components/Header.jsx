import React, { useEffect } from "react";
import {
  Button,
  chakra,
  Flex,
  Link,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { GiHeadbandKnot } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <>
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
        </Flex>
      </chakra.header>
    </>
  );
};

export default Header;
