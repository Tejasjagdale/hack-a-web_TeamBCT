import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "./Card";

const UserControls = () => {
	const [userBid, setUserBid] = useState(5000);

	return (
		<Card w="full" m="3" h="full">
			<HStack align="center" spacing={15}>
				<Button onClick={() => setUserBid(userBid + 500)}> + 500</Button>
				<Button onClick={() => setUserBid(userBid + 1000)}> + 1000</Button>
				<Button onClick={() => setUserBid(userBid + 1500)}> + 1500</Button>
				<Button onClick={() => setUserBid(userBid + 5000)}> + 5000</Button>
				<Input w="20vw" type="number" placeholder="Enter Custom Bid"></Input>
				<Box borderWidth="1px" rounded="lg" p={3}>
					<VStack>
						<Flex direction="row" justifyContent="left" alignItems="center">
							<Text fontSize="sm" color="GrayText">
								Bid :
							</Text>
							<Heading ml={1}>${userBid}</Heading>
						</Flex>
						<Button>Lock-in Bid</Button>
					</VStack>
				</Box>
			</HStack>
		</Card>
	);
};

export default UserControls;
