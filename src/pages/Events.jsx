import {
	Button,
	Divider,
	Flex,
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
import { useNavigate } from "react-router-dom";
import { BiTimer } from "react-icons/bi";
// import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { rdb, db } from "../utils/firebase-config";
import { push, ref, set } from "firebase/database";
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

	const [eventDate, setEventDate] = useState(new Date());
	const [event, setEvent] = useState({
		created_by: currentUser.uid,
		created_on: "",
		items: [],
		description: "",
		current_users: [],
		total_users: [],
		photo: "",
		name: "",
		time: "",
		status: "hold",
	});
	let name, value;
	const [item, setItem] = useState({
		photos: [
			"https://wallpaperaccess.com/full/1585987.jpg",
			"https://ak.picdn.net/shutterstock/videos/1037983121/thumb/1.jpg",
			"https://thumbs.dreamstime.com/b/antique-statue-bust-david-pixel-mouse-pointer-audio-cassette-antique-statue-bust-david-pixel-mouse-pointer-239556058.jpg",
			"https://t4.ftcdn.net/jpg/03/62/41/99/360_F_362419959_PDIKLQzAdABz2xBr64DyuBd1QEXuZA7p.jpg",
		],
		base: "",
		description: "",
		timer: "",
		status: "hold",
		name: "",
	});
	const [allItems, setAllItems] = useState([]);
	const [allPhotos, setAllPhotos] = useState(["", "", "", ""]);
	const navigate = useNavigate();

	const addToItemList = () => {
		push(ref(rdb, "items/"), item).then((res) => {
			const tempItem = item;
			tempItem.id = res.key;
			setAllItems((prev) => {
				return [...prev, tempItem];
			});
			setItem({
				photos: [
					"https://wallpaperaccess.com/full/1585987.jpg",
					"https://ak.picdn.net/shutterstock/videos/1037983121/thumb/1.jpg",
					"https://thumbs.dreamstime.com/b/antique-statue-bust-david-pixel-mouse-pointer-audio-cassette-antique-statue-bust-david-pixel-mouse-pointer-239556058.jpg",
					"https://t4.ftcdn.net/jpg/03/62/41/99/360_F_362419959_PDIKLQzAdABz2xBr64DyuBd1QEXuZA7p.jpg",
				],
				base: "",
				description: "",
				timer: "",
				status: "hold",
				name: "",
			});
			setEvent((prevState) => {
				return {
					...prevState,
					items: [...prevState.items, res.key],
				};
			});
		});
	};

	const removeItem = (e) => {
		e.preventDefault();
		set(ref(rdb, "items/" + e.target.id), null).catch((err) => {
			console.log(err);
		});
		let temp = allItems;
		temp.splice(e.target.id, 1);
		setAllItems(JSON.parse(JSON.stringify(temp)));
		setEvent((prevState) => {
			let itemsModified = prevState.items;
			let index = itemsModified.indexOf(e.target.id);
			itemsModified.splice(index, 1);
			return {
				...prevState,
				items: itemsModified,
			};
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
		const docRef = db.collection("events");
		await docRef.add(event_push);
		navigate("/allevents");
	};

	const handleItemchange = (e) => {
		e.preventDefault();
		name = e.target.name;
		value = e.target.value;
		// console.log(name, value);
		setItem((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handlePhotochange = (e) => {
		e.preventDefault();
		name = e.target.name;
		let id = parseInt(e.target.id);
		value = e.target.value;
		// console.log(name, value);
		let temp = item.photos;
		temp[id] = value;
		let temp2 = allPhotos;
		temp2[id] = value;
		setAllPhotos(temp2);
		setItem((prevState) => {
			return { ...prevState, [name]: temp };
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
											value={event.name}
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
											value={event.description}
											id="desc"
											name="description"
											type="text"
											onChange={handleEventChange}
										/>
									</Flex>
								</FormControl>
							</WrapItem>
							<WrapItem>
								<FormControl>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<FormLabel htmlFor="email">
											4. Event wallpaper url
										</FormLabel>
										<Input
											value={event.photo}
											id="epic"
											name="photo"
											type="text"
											onChange={handleEventChange}
										/>
									</Flex>
								</FormControl>
							</WrapItem>
						</Wrap>
					</Card>
				</GridItem>
				<GridItem rowSpan={1} colSpan={3}>
					<Card>
						<Heading>Add Items</Heading>
						<Divider my={2} />
						<Flex direction="row" justifyContent="space-between">
							<VStack>
								<FormControl>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<Input
											required
											placeholder="1. Item Name"
											value={item.name}
											id="name"
											name="name"
											type="text"
											onChange={handleItemchange}
										/>
									</Flex>
									<Flex direction="column" alignItems="flex-start" my={5}>
										<Input
											required
											value={item.description}
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
												required
												value={item.base}
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
												required
												value={item.timer}
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
								<Flex direction="column" alignItems="flex-start" my={5}>
									<Input
										required
										value={allPhotos[0]}
										placeholder="1. Item picture url"
										name="photos"
										id="0"
										type="text"
										onChange={handlePhotochange}
									/>
									<Input
										required
										value={allPhotos[1]}
										placeholder="2. Item picture url"
										name="photos"
										id="1"
										type="text"
										onChange={handlePhotochange}
									/>
									<Input
										required
										value={allPhotos[2]}
										placeholder="3. Item picture url"
										name="photos"
										id="2"
										type="text"
										onChange={handlePhotochange}
									/>
									<Input
										required
										value={allPhotos[3]}
										placeholder="4. Item picture url"
										name="photos"
										id="3"
										type="text"
										onChange={handlePhotochange}
									/>
								</Flex>
								<Button onClick={addToItemList}>Add Item</Button>
							</VStack>
							<Divider orientation="vertical" />
							<Box height="45vh" overflowY="scroll">
								<VStack>
									{allItems ? (
										allItems.map((item, index) => {
											return (
												<ItemsCard
													id={item.id}
													key={index}
													item={item}
													removeItem={removeItem}
												/>
											);
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
							isDisabled={allItems.length === 0 || event.time === ""}
							colorScheme="teal"
							size="md"
							mb={3}
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
