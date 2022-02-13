import React, { useContext, useEffect, useState } from "react";
import ItemDetails from "./ItemDetails";
import ItemViewer from "./ItemViewer";
import { rdb } from "../utils/firebase-config";
import { child, onValue, push, ref, update } from "firebase/database";
import { EventContext } from "../pages/AuctionRoom";

const ItemParent = (props) => {
  const [eventItems, setEventItems] = useState([]);
  const [currentItem, setCurrentItem] = useContext(EventContext);

  useEffect(() => {
    const itemsRef = ref(rdb, "items/");
    onValue(itemsRef, (snapshot) => {
      const itemsDataObj = snapshot.val();
      let tempObj = [];
      Object.keys(itemsDataObj).map((ele, index) => {
        if (props.itemsArr.includes(ele)) {
          tempObj.push({ ...itemsDataObj[ele], id: ele });
        }
      });
      setEventItems(tempObj);
    });
  }, []);

  useEffect(() => {
    nextItem();
  }, [props.showItem]);

  const nextItem = () => {
    eventItems.every(function (element, index) {
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

  return (
    <>
      <ItemViewer />
      <ItemDetails showItem={props.showItem} nextItem={nextItem} totalItems={eventItems.length} />
    </>
  );
};

export default ItemParent;
