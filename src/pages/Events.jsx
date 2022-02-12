import { Button, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import ItemsCard from "../components/ItemsCard";

const Events = () => {
  const { currentUser } = useAuth();
  const ref = db.collection("events");
  const [event, setEvent] = useState({
    created_by: currentUser.uid,
    created_on: "",
    items: [],
    current_users: [],
    total_users: [],
    name: "",
  });

  const [item, setItem] = useState({
    photos: [],
    base_Prize: "0 rs",
    description: "Item Description in 10-20 words :)",
    bid_timer: "0 sec",
    status: "hold",
    name: "Item Name",
  });

  let name, value;

  useEffect(() => {
    console.log(event,item);
  }, [event,item]);

  const handleEventChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    // console.log(name, value);
    setEvent((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const addEvent = async (e) => {
    e.preventDefault();
    var d = new Date();
    let event_push = event;
    event_push = {
      ...event_push,
      created_by: currentUser.uid,
      created_on: d.toLocaleString(),
    };
    await ref.add(event_push);
  };

  const addItem = async (e) => {
    e.preventDefault()
    item.id = event.items.length + 1;
    setEvent((prevState) => {
      return { ...prevState, ["items"]: [...prevState.items,item] };
    });
  };

  const handleItemchange = (e) => {
    name = e.target.name;
    value = e.target.value;
    // console.log(name, value);
    setItem((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <>
      <Navbar />
      <FormControl>
        <FormLabel>Event name</FormLabel>
        <Input id="name" name="name" type="text" onChange={handleEventChange} />
      </FormControl>
      <Button
        isDisabled={event.items.length === 0}
        colorScheme="teal"
        size="md"
        onClick={addEvent}
      >
        Start New Event
      </Button>
      <ItemsCard
        list={event.items}
        addItem={addItem}
        item={item}
        handleItemchange={handleItemchange}
      />
    </>
  );
};

export default Events;
