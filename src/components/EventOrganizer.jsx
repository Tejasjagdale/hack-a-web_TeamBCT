import {
	Button,
	Flex,
	HStack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

const EventOrganizer = (props) => {
	return (
		<>
			<Card w="full">
				<Flex direction="column">
					<HStack spacing={5}>
						<Text>Event Controls: </Text>
						<Button bg="teal.800">Start Event</Button>
						<Button bg="blue.800" onClick={() => props.setShowItem(true)}>
							Next Item
						</Button>
						<Button bg="red.800">End Event</Button>
					</HStack>
				</Flex>
			</Card>
		</>
	);
};

export default EventOrganizer;
