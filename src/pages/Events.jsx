import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase-config";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from "@chakra-ui/react";

const Events = () => {
	const { currentUser } = useAuth();
	const ref = db.collection("events");

	const AddEvents = async (e) => {
		e.preventDefault();
		var d = new Date();

		let data = {
			created_by: currentUser.uid,
			created_on: d.toLocaleString(),
			items: ["12x424124c1"],
			current_users: [],
			total_users: [],
			name: "auction 1",
		};

		await ref.add(data);
	};

	return (
		<>
			<FormControl>
				<FormLabel>Event name</FormLabel>
				<Input id="name" type="text" />
			</FormControl>
			<Button colorScheme="teal" size="md" onClick={AddEvents}>
				Start New Event
			</Button>
			<Button colorScheme="red" size="md" onClick={AddEvents}>
				Add items
			</Button>
		</>
	);
};

export default Events;
