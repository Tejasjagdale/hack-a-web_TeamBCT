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
	VStack,
	InputRightAddon,
	InputGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiTimer } from "react-icons/bi";
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
import { Card } from "../components/Card";

const Events = () => {
	const { currentUser } = useAuth();
	const ref = db.collection("events");
	const [eventDate, setEventDate] = useState(new Date());
	const [event, setEvent] = useState({
		created_by: currentUser.uid,
		created_on: "",
		items: [],
    description:"",
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
	const [allItems, setAllItems] = useState([]);

	const addToItemList = () => {
		setAllItems((prev) => {
			return [...prev, item];
		});
	};

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
				gap={2}
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
									</Flex>
								</FormControl>
							</WrapItem>
              <WrapItem>
								<FormControl>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<FormLabel htmlFor="email">3. Event description</FormLabel>
										<Input
											id="desc"
											name="description"
											type="text"
											onChange={handleEventChange}
										/>
									</Flex>
								</FormControl>
							</WrapItem>
						</Wrap>
					</Card>
				</GridItem>
				<GridItem rowSpan={1} colSpan={3} bg="papayawhip">
					<Card>
						<Heading>Add Items</Heading>
						<Divider my={2} />
						<Flex direction="row" justifyContent="space-between">
							<VStack>
								<FormControl>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<Input
											placeholder="1. Item Name"
											id="name"
											name="name"
											type="text"
											onChange={handleItemchange}
										/>
									</Flex>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<Input
											placeholder="2. Item Description"
											id="desc"
											name="description"
											type="text"
											onChange={handleItemchange}
										/>
									</Flex>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<InputGroup size="md">
											<Input
												placeholder="3. Base Price in us dollars"
												id="name"
												name="base"
												type="number"
												onChange={handleItemchange}
											/>
											<InputRightAddon children="$" />
										</InputGroup>
									</Flex>
                  <Flex direction="column" alignItems="flex-start" my={5}>
										<InputGroup size="md">
											<Input
												placeholder="4. Bid Timer in sec"
												id="timer"
												name="timer"
												type="number"
												onChange={handleItemchange}
											/>
											<InputRightAddon children={<BiTimer />} />
										</InputGroup>
									</Flex>
								</FormControl>
								<Button onClick={addToItemList}>Add Item</Button>
							</VStack>
							<Divider orientation="vertical" />
							<Box height="40vh" overflowY="scroll">
								<VStack>
									{allItems ? (
										allItems.map((item) => {
											return <ItemsCard item={item} />;
										})
									) : (
										<>No items</>
									)}
								</VStack>
							</Box>
						</Flex>
					</Card>
				</GridItem>
				<GridItem rowSpan={1} colSpan={3}>
					<Flex direction="row" justifyContent="flex-end">
						<Button
							isDisabled={event.items.length === 0 && event.time === ""}
							colorScheme="teal"
							size="md"
							onClick={addEvent}
						>
							Start New Event
						</Button>
					</Flex>
				</GridItem>
			</Grid>
		</>
	);
};

export default Events;
