import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";
import ItemDetails from "../components/ItemDetails";
import ItemViewer from "../components/ItemViewer";

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
					<Card>
						<Flex direction="row" justifyContent="space-between">
							<ItemViewer />
							<ItemDetails />
						</Flex>
					</Card>
				</GridItem>
				<GridItem rowSpan={6} colSpan={12}>
					{" "}
					<Card>hello</Card>
				</GridItem>
				<GridItem rowSpan={2} colSpan={12}>
					{" "}
					<Card>hello</Card>
				</GridItem>
			</Grid>
		</>
	);
};

export default AuctionRoom;
