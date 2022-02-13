import { Flex, Grid, GridItem, toast, useToast } from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Audience from "../components/Audience";
import { Card } from "../components/Card";
import UserControls from "../components/UserControls";
import { db, rdb } from "../utils/firebase-config";
import firebase from "firebase/compat/app";
// import 'firebase/compat/auth'
import "firebase/compat/firestore";
import ItemParent from "../components/ItemParent";
import EventOrganizer from "../components/EventOrganizer";
import { useAuth } from "../context/AuthContext";
import { onValue, ref, update } from "firebase/database";
export const EventContext = createContext({});
export const ItemsContext = createContext([]);
export const BidContext = createContext([]);

const AuctionRoom = () => {
  let { id } = useParams();
  const toast = useToast();
  const { currentUser } = useAuth();
  const [showItem, setShowItem] = useState(false);
  const [eventObj, setEventObj] = useState({});
  const [currentItem, setCurrentItem] = useState(null);
  const [eventItems, setEventItems] = useState([]);
  const [currentItemBids, setCurrentItemBids] = useState([]);
  const [recentBid, setRecentBid] = useState({});

  const getEventData = async () => {
    const ref = db.collection("events").doc(id);
    const doc = await ref.get();
    setEventObj(doc.data());
  };

  useEffect(() => {
    if (Object.keys(eventObj).length > 0 && eventObj.items.length > 0) {
      // console.log(eventObj);
      const itemsRef = ref(rdb, "items/");
      onValue(itemsRef, (snapshot) => {
        const itemsDataObj = snapshot.val();
        let tempObj = [];
        Object.keys(itemsDataObj).map((ele, index) => {
          if (eventObj.items.includes(ele)) {
            tempObj.push({ ...itemsDataObj[ele], id: ele });
          }
        });
        setEventItems(tempObj);
      });
    }
  }, [eventObj]);

  useEffect(() => {
    if (currentItem) {
      // console.log("Current item", currentItem);
      const bidRef = ref(rdb, "bids/");
      let tempObj = [];
      onValue(bidRef, (snapshot) => {
        const bidsDataObj = snapshot.val();
        Object.keys(bidsDataObj).forEach((ele, index) => {
          if (bidsDataObj[ele].item_id === currentItem.id) {
            tempObj.push(bidsDataObj[ele]);
          }
        });
      });
      setCurrentItemBids(tempObj);
      // console.log(tempObj);
    }
  }, [currentItem]);

  useEffect(() => {
    if (currentItemBids.length > 0) {
      const res = Math.max.apply(
        Math,
        currentItemBids.map(function (o) {
          return o.timestamp;
        })
      );
      const recent_bid = currentItemBids.find(function (o) {
        return o.timestamp === res;
      });
      setRecentBid(recent_bid);
    }
  }, [currentItemBids]);

  useEffect(() => {
    db.collection("events")
      .where(firebase.firestore.FieldPath.documentId(), "==", id)
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          setEventObj(change.doc.data());
        });
      });
  }, []);

  // useEffect(() => console.log(showItem), [showItem]);
  useEffect(() => {
    if (eventObj.status === "hold") {
      toast({
        title: "Waiting for event to start",
        description: "Please wait for the owner to start the auction.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }

    if (eventObj.status === "started") {
      toast({
        title: "The Event has Started! ",
        description: "Place your bids for this item.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [eventObj]);

  useEffect(() => console.log(recentBid), [recentBid]);

  const firstItem = () => {
    eventItems.every(function (element, index) {
      if (element.status === "ongoing") {
        setCurrentItem(element);
        return false;
      }
      if (element.status === "hold") {
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        element.status = "ongoing";
        element.currentbid = "----";
        updates["/items/" + element.id] = element;
        update(ref(rdb), updates);
        setCurrentItem(element);
        return false;
      } else {
        return true;
      }
    });
  };

  useEffect(() => {
    if (eventItems.length > 0) {
      let all_hold = false;
      eventItems.every((ele, index) => {
        if (ele.status === "hold") {
          all_hold = true;
        }
      });
      // console.log("All hold", all_hold);
      if (all_hold) {
        firstItem();
      }
    }
  }, [eventItems]);

  return (
    <>
      <EventContext.Provider value={[currentItem, setCurrentItem]}>
        <ItemsContext.Provider value={[eventItems, setEventItems]}>
          <BidContext.Provider value={[currentItemBids, setCurrentItemBids]}>
            {currentUser.uid === eventObj.created_by ? (
              <EventOrganizer setShowItem={setShowItem} id={id} />
            ) : null}
            <Grid
              h="100vh"
              templateRows="repeat(12, 1fr)"
              templateColumns="repeat(12, 1fr)"
              gap={1}
            >
              <GridItem rowSpan={4} colSpan={12} mt={2}>
                <Card p={2} overflow="hidden">
                  <Flex direction="row" justifyContent="space-between">
                    {eventObj.items && (
                      <ItemParent
                        itemsArr={eventObj.items}
                        recentBid={recentBid}
                        eventStatus={eventObj.status}
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
                        showItem={showItem}
                      />
                    )}
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
                  <UserControls
                    eventId={id}
                    setShowItem={setShowItem}
                    currentbid={currentItem ? currentItem.currentbid : 100}
                  />
                </Flex>
              </GridItem>
            </Grid>
          </BidContext.Provider>
        </ItemsContext.Provider>
      </EventContext.Provider>
    </>
  );
};

export default AuctionRoom;
