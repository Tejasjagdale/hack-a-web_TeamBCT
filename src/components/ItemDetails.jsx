import { Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../styles/timer.css";

const renderTime = (dimension, time) => {
	return (
		<div className="time-wrapper">
			<div className="time">{time}</div>
			<div>{dimension}</div>
		</div>
	);
};

const ItemDetails = () => {
	const minuteSeconds = 60;
	const hourSeconds = 3600;
	const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;

	return (
		<Card w="full" h="100%" mx={5} mt={1} p={7}>
			<Flex direction="row" justifyContent="space-between">
				<VStack align="flex-start">
					<Flex
						direction="column"
						justifyContent="left"
						alignItems="flex-start"
					>
						<Text fontSize="md">Item(s) 2/5</Text>
					</Flex>
					<Flex
						direction="column"
						justifyContent="left"
						alignItems="flex-start"
					>
						<Heading>Mona Lisa </Heading>
						<Text fontSize="sm" color="GrayText">
							Current Item
						</Text>
					</Flex>
					<Flex
						direction="column"
						justifyContent="left"
						alignItems="flex-start"
					>
						<Heading>$5000</Heading>
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
							$500
						</Text>
						<Text fontSize="sm" color="GrayText">
							Base Price
						</Text>
					</Flex>
				</VStack>
				<Center>
					<CountdownCircleTimer
						size={150}
						isPlaying
						duration={60}
						colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
						colorsTime={[7, 5, 2, 0]}
					>
						{({ elapsedTime, color }) => (
							<span style={{ color }}>
								{renderTime(
									"minutes",
									getTimeMinutes(hourSeconds - elapsedTime)
								)}
							</span>
						)}
					</CountdownCircleTimer>
				</Center>
			</Flex>
		</Card>
	);
};

export default ItemDetails;
