import {
  Center,
  Flex,
  Heading,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Card } from "./Card";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../styles/timer.css";
import { EventContext } from "../pages/AuctionRoom";

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const ItemDetails = (props) => {
  const { colorMode } = useColorMode();
  const [currentItem, setCurrentItem] = useContext(EventContext);
  const minuteSeconds = parseInt(currentItem ? currentItem.timer : 0);
  const itemSold = (e) => {
    console.log("item sold");
    setCurrentItem(null)
  };
  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;

  return (
    <Card w="full" h="100%" mx={5} mt={1} p={7}>
      <Flex direction="row" justifyContent="space-between">
        <VStack align="flex-start">
          <Flex
            direction="column"
            justifyContent="left"
            alignItems="flex-start"
          >
            <Text fontSize="md">{`Item(s) 2/${props.totalItems}`}</Text>
          </Flex>
          <Flex
            direction="column"
            justifyContent="left"
            alignItems="flex-start"
          >
            <Heading>{currentItem ? currentItem.name : ""}</Heading>
            <Text fontSize="sm" color="GrayText">
              Current Item
            </Text>
          </Flex>
          <Flex
            direction="column"
            justifyContent="left"
            alignItems="flex-start"
          >
            <Heading>{currentItem ? currentItem.currentbid : ""}</Heading>
            <Text fontSize="sm" color="GrayText">
              Current Bid
            </Text>
          </Flex>
          <Flex
            direction="column"
            justifyContent="left"
            alignItems="flex-start"
          >
            <Text fontSize="xl" fontWeight={800}>
              {currentItem ? currentItem.base : ""}
            </Text>
            <Text fontSize="sm" color="GrayText">
              Base Price
            </Text>
          </Flex>
        </VStack>
        <Center mr={{ base: 4, lg: 10 }}>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <CountdownCircleTimer
              size={150}
              isPlaying
              duration={minuteSeconds}
              {...(colorMode === "dark"
                ? { colors: ["#12c2e9", "#c471ed", "#f64f59"] }
                : { colors: ["#000", "#000", "#000", "#000"] })}
              colorsTime={[7, 5, 0]}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("seconds", getTimeSeconds(elapsedTime))}
                  {getTimeSeconds(elapsedTime) === 0 ? itemSold() : null}
                </span>
              )}
            </CountdownCircleTimer>
            <Text fontSize="sm" mt={2} color="GrayText">
              Until next bid
            </Text>
          </Flex>
        </Center>
      </Flex>
    </Card>
  );
};

export default ItemDetails;
