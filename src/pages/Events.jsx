import {
	Button,
	Divider,
	Flex,
	FormHelperText,
	Grid,
	GridItem,
	Heading,
	Input,
	Wrap,
	WrapItem,
	Box,
} from "@chakra-ui/react";
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
import { Card } from "../components/Card";

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
			<Grid
				h="90vh"
				templateRows="repeat(3, 1fr)"
				templateColumns="repeat(3, 1fr)"
				gap={4}
			>
				<GridItem rowSpan={1} colSpan={3} mt={5}>
					<Card>
						<Heading>Create an Event</Heading>
						<Divider my={2} />
						<Wrap spacing={10}>
							<WrapItem>
								<FormControl>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<FormLabel htmlFor="email">1. Event Name</FormLabel>
										<Input
											id="name"
											name="name"
											type="text"
											onChange={handleEventChange}
										/>
										<FormHelperText>
											We'll never share your email.
										</FormHelperText>
									</Flex>
								</FormControl>
							</WrapItem>
							<WrapItem>
								<FormControl>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<FormLabel htmlFor="email">2. Event Date</FormLabel>
										<Box as="button" p={2} borderWidth="1px" borderRadius="lg">
											<DatePicker
												selected={eventDate}
												onChange={(date) => handleEventDateChange(date)}
												showTimeSelect
											/>
										</Box>

										<FormHelperText>
											We'll never share your email.
										</FormHelperText>
									</Flex>
								</FormControl>
							</WrapItem>
						</Wrap>
					</Card>
				</GridItem>
				<GridItem rowSpan={2} colSpan={3} bg="papayawhip">
					<Card>
						<Heading>Add Items</Heading>
						<Flex direction="row" justifyContent="space-between">
							{/* <ItemsCard
							list={event.items}
							addItem={addItem}
							item={item}
							handleItemchange={handleItemchange}
						/> */}
						</Flex>
					</Card>
				</GridItem>
				<GridItem rowSpan={1} colSpan={3} bg="papayawhip">
					<Button
						isDisabled={event.items.length === 0 && event.time === ""}
						colorScheme="teal"
						size="md"
						onClick={addEvent}
					>
						Start New Event
					</Button>
				</GridItem>
			</Grid>
		</>
	);
};

export default Events;
