import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { db } from "../utils/firebase-config";
import { Card } from "./Card";

const EventOrganizer = (props) => {
	console.log(props);

	const startEvent = () => {
		const UserCollection = db.collection("events");

		UserCollection.doc(props.id.toString()).set(
			{
				status: "started",
			},
			{ merge: true }
		);
	};
	return (
		<>
			<Card w="full">
				<Flex direction="column">
					<HStack spacing={5}>
						<Text>Event Controls: </Text>
						<Button bg="teal.800" onClick={startEvent}>
							Start Event
						</Button>

						<Button bg="red.800">End Event</Button>
					</HStack>
				</Flex>
			</Card>
		</>
	);
};

export default EventOrganizer;
