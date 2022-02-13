import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

const EventOrganizer = (props) => {
  return (
    <>
      <Card w="full" m="3" h="full">
        <Text>Event org control</Text>
        <Button>Start Event</Button>
        <Button >Next Item</Button>
        <Button>End Event</Button>
      </Card>
    </>
  );
};

export default EventOrganizer;
