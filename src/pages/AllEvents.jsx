import { Divider, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase-config";

const AllEvents = () => {
  const { signInWithGoogle } = useAuth();
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    db.collection("events").onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        // console.log(change.doc.data());
        let temp = change.doc.data();
        temp.id = change.doc.id;

        setAllEvents((prev) => {
          return [...prev, temp];
        });
      });
    });
  }, []);

  return (
    <div>
      <Heading mt={3}>Ongoing Events</Heading>
      <Divider my={2} />
      <Wrap>
        {allEvents
          ? allEvents.map((item) => (
              <>
                <WrapItem>
                  <EventCard item={item} />
                </WrapItem>
              </>
            ))
          : "brun"}
      </Wrap>
    </div>
  );
};

export default AllEvents;
