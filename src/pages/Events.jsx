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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Events = () => {
  const { currentUser } = useAuth();
  const ref = db.collection("events");
  const [eventDate, setEventDate] = useState(new Date());
  const [event, setEvent] = useState({
    created_by: currentUser.uid,
    created_on: "",
    items: [],
    current_users: [],
    total_users: [],
    name: "",
    time: "",
  });
  let name, value;

  // useEffect(() => {
  //   console.log(event);
  // }, [event]);

  // useEffect(() => {
  //   console.log(eventDate);
  // }, [eventDate]);

  const handleEventChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    // console.log(name, value);
    setEvent((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleEventDateChange = (date) => {
    setEventDate(date);
    setEvent((prevState) => {
      return {
        ...prevState,
        time: date,
      };
    });
  };

  const addEvent = async (e) => {
    e.preventDefault();
    var d = new Date();
    let event_push = event;
    event_push = {
      ...event_push,
      created_by: currentUser.uid,
      created_on: d,
    };
    await ref.add(event_push);
  };

  const addItem = async (e) => {
    e.preventDefault();
    var d = new Date();
  };

  return (
    <>
      <Navbar />
      <FormControl>
        <FormLabel>Event name</FormLabel>
        <Input id="name" name="name" type="text" onChange={handleEventChange} />
        <DatePicker
          selected={eventDate}
          onChange={(date) => handleEventDateChange(date)}
          showTimeSelect
        />
      </FormControl>
      <Button
        isDisabled={event.items.length === 0 && event.time === ""}
        colorScheme="teal"
        size="md"
        onClick={addEvent}
      >
        Start New Event
      </Button>
      <Button colorScheme="red" size="md" onClick={addItem}>
        Add items
      </Button>
    </>
  );
};

export default Events;
