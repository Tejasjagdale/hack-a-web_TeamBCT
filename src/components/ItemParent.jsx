import React, { useEffect, useState } from "react";
import ItemDetails from "./ItemDetails";
import ItemViewer from "./ItemViewer";
import { rdb } from "../utils/firebase-config";
import { onValue, ref } from "firebase/database";

const ItemParent = ({ itemsArr }) => {
  const [eventItems, setEventItems] = useState({});
  useEffect(() => {
    const itemsRef = ref(rdb, "items/");
    onValue(itemsRef, (snapshot) => {
      const itemsDataObj = snapshot.val();
      let tempObj = {};
      Object.keys(itemsDataObj).map((ele, index) => {
        if (itemsArr.includes(ele)) {
          tempObj[ele] = itemsDataObj[ele];
        }
      });
      console.log(tempObj);
      setEventItems(tempObj);
    });
  }, []);

  return (
    <>
      <ItemViewer />
      <ItemDetails />
    </>
  );
};

export default ItemParent;
