import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
// import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase-config";
import {
	FormControl,
	FormLabel,
	// FormErrorMessage,
	// FormHelperText,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import ItemsCard from "../components/ItemsCard";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";

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
	const [item, setItem] = useState({
		photos: [],
		base: "0 rs",
		description: "Item Description in 10-20 words :)",
		timer: "0 sec",
		status: "hold",
		name: "Item Name",
	});

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
		item.id = event.items.length + 1;
		setEvent((prevState) => {
			return { ...prevState, ["items"]: [...prevState.items, item] };
		});
	};

	const handleItemchange = (e) => {
		name = e.target.name;
		value = e.target.value;
		// console.log(name, value);
		setItem((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	return (
		<>
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
			<ItemsCard
				list={event.items}
				addItem={addItem}
				item={item}
				handleItemchange={handleItemchange}
			/>
		</>
	);
};

export default Events;
