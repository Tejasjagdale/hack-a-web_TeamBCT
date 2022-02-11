import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";

const AuctionRoom = () => {
	return (
		<>
			<Grid
				h="100vh"
				templateRows="repeat(12, 1fr)"
				templateColumns="repeat(12, 1fr)"
				gap={1}
			>
				<GridItem rowSpan={4} colSpan={12} bg="tomato" />
				<GridItem rowSpan={6} colSpan={12} bg="papayawhip" />
				<GridItem rowSpan={2} colSpan={12} bg="blue" />
			</Grid>
		</>
	);
};

export default AuctionRoom;
