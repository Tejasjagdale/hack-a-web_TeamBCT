import { Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

const ItemDetails = () => {
	return (
		<Card w="full" ml={5}>
			<Flex direction="row" justifyContent="space-between">
				<VStack>
					<Flex direction="column" justifyContent="center" alignItems="center">
						<Heading>$5000</Heading>
						<Text fontSize="sm" color="grey.">
							Current Bid
						</Text>
					</Flex>
				</VStack>
				<VStack>
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
				</VStack>
			</Flex>
		</Card>
	);
};

export default ItemDetails;
