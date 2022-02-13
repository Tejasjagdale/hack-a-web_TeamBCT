import { Flex, Grid, GridItem, toast, useToast } from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Audience from "../components/Audience";
import { Card } from "../components/Card";
import UserControls from "../components/UserControls";
import { db } from "../utils/firebase-config";
import firebase from "firebase/compat/app";
// import 'firebase/compat/auth'
import "firebase/compat/firestore";
import ItemParent from "../components/ItemParent";
import EventOrganizer from "../components/EventOrganizer";
import { useAuth } from "../context/AuthContext";
export const EventContext = createContext({});

const AuctionRoom = () => {
	let { id } = useParams();
	const toast = useToast();
	const { currentUser } = useAuth();
	const [showItem, setShowItem] = useState(false);
	const [eventObj, setEventObj] = useState({});
	const [currentItem, setCurrentItem] = useState(null);

	const getEventData = async () => {
		const ref = db.collection("events").doc(id);
		const doc = await ref.get();
		setEventObj(doc.data());
	};

	//   useEffect(() => {
	//     getEventData();
	//   }, []);

	useEffect(() => {
		db.collection("events")
			.where(firebase.firestore.FieldPath.documentId(), "==", id)
			.onSnapshot(function (snapshot) {
				snapshot.docChanges().forEach(function (change) {
					setEventObj(change.doc.data());
				});
			});
	}, []);

	// useEffect(() => console.log(showItem), [showItem]);
	useEffect(() => {
		toast({
			title: "Waiting for event to start",
			description: "Please wait for the owner to start the auction.",
			status: "info",
			duration: 9000,
			isClosable: true,
		});
		console.log(currentItem);
	}, [currentItem]);

	return (
		<>
			<EventContext.Provider value={[currentItem, setCurrentItem]}>
				<Grid
					h="100vh"
					templateRows="repeat(12, 1fr)"
					templateColumns="repeat(12, 1fr)"
					gap={1}
				>
					<GridItem rowSpan={4} colSpan={12} mt={2}>
						<Card p={2} overflow="hidden">
							<Flex direction="row" justifyContent="space-between">
								{eventObj.items && (
									<ItemParent
										itemsArr={eventObj.items}
										currentItem={currentItem}
										setCurrentItem={setCurrentItem}
										showItem={showItem}
									/>
								)}
							</Flex>
						</Card>
					</GridItem>
					<GridItem rowSpan={5} colSpan={12}>
						<Card overflow="hidden">
							{eventObj.total_users && (
								<Audience usersArr={eventObj.total_users} />
							)}
						</Card>
					</GridItem>
					<GridItem rowSpan={3} colSpan={12}>
						<Flex direction="row" justifyContent="space-apart">
							<UserControls
								setShowItem={setShowItem}
								currentbid={currentItem ? currentItem.currentbid : 100}
							/>
							{currentUser.uid === eventObj.created_by ? (
								<EventOrganizer setShowItem={setShowItem} />
							) : null}
						</Flex>
					</GridItem>
				</Grid>
			</EventContext.Provider>
		</>
	);
};

export default AuctionRoom;
