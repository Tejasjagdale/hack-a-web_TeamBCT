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
	const { colorMode } = useColorMode();
	const [currentItem, setCurrentItem] = useContext(EventContext);
	const [duration, setDuration] = useState(0);
	const minuteSeconds = parseInt(currentItem ? currentItem.timer : 60);
	const itemSold = () => {
		if (currentItem && currentItem.status === "ongoing") {
			console.log("item sold");
			const updates = {};
			currentItem.status = "sold";
			updates["/items/" + currentItem.id] = currentItem;
			update(ref(rdb), updates);
			setCurrentItem(null);
		}
	};

	const getDuration = () => {
		console.log(props.recentBid.timestamp);
		let duration =
			currentItem.timer - (Date.now() - props.recentBid.timestamp) / 1000;
		console.log(duration);
		setDuration(duration);
	};

	useEffect(() => {
		if (props.recentBid.timestamp) {
			console.log(duration);
			getDuration();
		}
	}, [props.recentBid.timestamp]);

	// useEffect(() => {

	// }, [bid])

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
						<Text fontSize="md">
							{props.totalItems && currentItem
								? `Item(s) ${props.totalItems.indexOf(currentItem.id)}/${
										props.totalItems.length
								  }`
								: null}
						</Text>
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
							key={props.recentBid.amount > 0 ? props.recentBid.amount : 1}
							isPlaying={
								props.eventStatus === "started" && props.recentBid.timestamp
							}
							// onComplete={itemSold}
							duration={duration}
							{...(colorMode === "dark"
								? { colors: ["#12c2e9", "#c471ed", "#f64f59"] }
								: { colors: ["#000", "#000", "#000", "#000"] })}
							colorsTime={[7, 5, 0]}
						>
							{({ remainingTime }) => {
								if (remainingTime === 1) {
									itemSold();
								}
								return remainingTime;
							}}
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
