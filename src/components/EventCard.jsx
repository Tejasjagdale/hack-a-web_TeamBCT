import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase-config";

const EventCard = ({ item }) => {
  const { currentUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const enterEvent = async () => {
    const EventCollection = await getDocs(collection(db, "events"));
    EventCollection.forEach(async (docref) => {
      console.log(docref.id);
      if (docref.id === item.id) {
        await setDoc(
          doc(db, "events", docref.id),
          {
            ...docref.data(),
            total_users: [...docref.data().total_users, currentUser.uid],
          },
          {
            merge: true,
          }
        );
        navigate(`/auction?id=${item.id}`);
      }
    });
  };

  return (
    <Box m={4}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w="xs"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Image
          src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
          roundedTop="lg"
        />

        <Box p="4">
          <Text fontSize="20px" fontWeight="900" isTruncated>
            {item.name}
          </Text>
          <Text isTruncated>{item.description}</Text>
          <Text isTruncated>Registered Users: {item.total_users.length}</Text>
          <Flex direction="row" justifyContent="flex-end" mt={1}>
            <Button onClick={enterEvent}>Enter Event</Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default EventCard;
