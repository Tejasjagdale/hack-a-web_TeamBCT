import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Audience from "../components/Audience";
import { Card } from "../components/Card";
import ItemDetails from "../components/ItemDetails";
import ItemViewer from "../components/ItemViewer";
import UserCard from "../components/UserCard";
import UserControls from "../components/UserControls";

const AuctionRoom = () => {
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
