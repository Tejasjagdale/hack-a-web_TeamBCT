import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Audience from "../components/Audience";
import { Card } from "../components/Card";
import ItemDetails from "../components/ItemDetails";
import ItemViewer from "../components/ItemViewer";
import UserControls from "../components/UserControls";
import { db } from "../utils/firebase-config";
import firebase from "firebase/compat/app";
// import 'firebase/compat/auth'
import "firebase/compat/firestore";

const AuctionRoom = () => {
  let { id } = useParams();
  const [eventObj, setEventObj] = useState({});

  const getEventData = async () => {
    const ref = db.collection("events").doc(id);
    const doc = await ref.get();
    setEventObj(doc.data());
  };

  //   useEffect(() => {
  //     getEventData();
  //   }, []);

  useEffect(() => {
    db.collection("events")
      .where(firebase.firestore.FieldPath.documentId(), "==", id)
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          console.log(change.doc.data());
          setEventObj(change.doc.data());
        });
      });
  }, []);

  useEffect(() => console.log(eventObj), [eventObj]);
  return (
    <>
      <Grid
        h="100vh"
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={1}
      >
        <GridItem rowSpan={4} colSpan={12} mt={2}>
          <Card p={2} overflow="hidden">
            <Flex direction="row" justifyContent="space-between">
              <ItemViewer />
              <ItemDetails />
            </Flex>
          </Card>
        </GridItem>
        <GridItem rowSpan={5} colSpan={12}>
          <Card overflow="hidden">
            {eventObj.total_users && (
              <Audience usersArr={eventObj.total_users} />
            )}
          </Card>
        </GridItem>
        <GridItem rowSpan={3} colSpan={12}>
          <Flex direction="row" justifyContent="space-apart">
            <UserControls />
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default AuctionRoom;
