import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Audience from "../components/Audience";
import { Card } from "../components/Card";
import ItemDetails from "../components/ItemDetails";
import ItemViewer from "../components/ItemViewer";
import UserControls from "../components/UserControls";
import { ref, onValue } from "firebase/database";
import { rdb } from "../utils/firebase-config";

const AuctionRoom = () => {
	const getEventData = () => {
		console.log("i");
		const starCountRef = ref(rdb, "events/");
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			console.log(data);
		});
	};
	useEffect(() => {
		getEventData();
	}, []);
	return (
		<>
			<Grid
				h="100vh"
				templateRows="repeat(12, 1fr)"
				templateColumns="repeat(12, 1fr)"
				gap={1}
			>
				<GridItem rowSpan={4} colSpan={12} mt={2}>
					<Card p={2} overflow="hidden">
						<Flex direction="row" justifyContent="space-between">
							<ItemViewer />
							<ItemDetails />
						</Flex>
					</Card>
				</GridItem>
				<GridItem rowSpan={5} colSpan={12}>
					<Card overflow="hidden">
						<Audience />
					</Card>
				</GridItem>
				<GridItem rowSpan={3} colSpan={12}>
					<Flex direction="row" justifyContent="space-apart">
						<UserControls />
					</Flex>
				</GridItem>
			</Grid>
		</>
	);
};

export default AuctionRoom;
