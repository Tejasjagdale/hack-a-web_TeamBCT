import React from "react";
import { db } from "../utils/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const Items = () => {
	const { currentUser } = useAuth();
	const ref = db.collection("items");

	const AddItem = async (e) => {
		e.preventDefault();
		var d = new Date();

		let data = {
			photos: ["blob1"],
			base: 500,
			description: "this is a good item plzzz buy.",
			bid_timer: 10,
			status: "hold",
		};

		await ref.add(data);
	};

	return (
		<>
			<FormControl>
				<FormLabel>Base prize</FormLabel>
				<Input id="name" type="text" />
				<FormLabel>Bid timer</FormLabel>
				<Input id="timer" type="number" />
				<FormLabel>Item Description</FormLabel>
				<Input id="desc" type="text" />
			</FormControl>
			<Button colorScheme="teal" size="md" onClick={AddItem}>
				Add item to market
			</Button>
		</>
	);
};

export default Items;
