import {
	Center,
	Flex,
	Heading,
	Spinner,
	Text,
	useColorMode,
	VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "./Card";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../styles/timer.css";
import { EventContext } from "../pages/AuctionRoom";
import { ref, update } from "firebase/database";
import { rdb } from "../utils/firebase-config";

const renderTime = (dimension, time) => {
	return (
		<div className="time-wrapper">
			<div className="time">{time}</div>
			<div>{dimension}</div>
		</div>
	);
};

const ItemDetails = (props) => {
	console.log(props.eventStatus);
	const { colorMode } = useColorMode();
	const [currentItem, setCurrentItem] = useContext(EventContext);
	const [durationState, setDurationState] = useState(0);
	const minuteSeconds = parseInt(currentItem ? currentItem.timer : 60);
	const itemSold = () => {
		if (currentItem.status === "ongoing") {
			console.log("item sold");
			const updates = {};
			currentItem.status = "sold";
			updates["/items/" + currentItem.id] = currentItem;
			update(ref(rdb), updates);
			setCurrentItem(null);
		}
	};

	const getDuration = (itemTimer, bidTime) => {
		const duration = itemTimer * 1000 - (Date.now() - bidTime);
		console.log("Duration", duration / 1000);
		return duration / 1000;
	};

	// useEffect(() => {

	// }, [bid])

	useEffect(() => {
		if (currentItem === null) {
			// console.log("Current item is now null");
			props.nextItemFunc();
		}
	}, [currentItem]);

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
						<Text fontSize="md">{`Item(s) 2/${props.totalItems.length}`}</Text>
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
							isPlaying={props.eventStatus === "started" && true}
							duration={() => getDuration(currentItem.timer, 1644743640933)}
							{...(colorMode === "dark"
								? { colors: ["#12c2e9", "#c471ed", "#f64f59"] }
								: { colors: ["#000", "#000", "#000", "#000"] })}
							colorsTime={[7, 5, 0]}
						>
							{({ remainingTime }) => remainingTime}
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
