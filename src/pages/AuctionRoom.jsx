import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Card } from "../components/Card";

const AuctionRoom = () => {
	return (
		<>
			<Grid
				h="100vh"
				templateRows="repeat(12, 1fr)"
				templateColumns="repeat(12, 1fr)"
				gap={2}
			>
				<GridItem rowSpan={4} colSpan={12} p={3} bg="green.200">
					<Card>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
						laudantium eos, dolores, quos, esse molestias velit non ullam
						recusandae praesentium blanditiis corrupti quo provident quas enim
						quam. Aliquam, quas ipsum!
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
