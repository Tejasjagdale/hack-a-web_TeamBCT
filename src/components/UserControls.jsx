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
import React, { useContext, useState } from "react";
import { Card } from "./Card";
import { EventContext } from "../pages/AuctionRoom";
import { push, ref } from "firebase/database";
import { rdb } from "../utils/firebase-config";
import { useAuth } from "../context/AuthContext";

const UserControls = (props) => {
	console.log(props);
	const { currentUser } = useAuth();
	const [userBid, setUserBid] = useState(props.currentbid);
	const [currentItem, setCurrentItem] = useContext(EventContext);


	const newBid = () => {
		let temp = currentItem;
		temp.currentbid = `$${userBid}`;
		setCurrentItem(JSON.parse(JSON.stringify(temp)));
		let time = Date.now();

		let data = {
			event_id: props.eventId,
			item_id: currentItem.id,
			amount: userBid,
			by: currentUser.uid,
			status: "current",
			timestamp: time,
		};

		push(ref(rdb, "bids/"), data).then((res) => {
			const tempItem = data;
			tempItem.id = res.key;
		});
	};

	return (
		<Card w="full" h="full">
			<HStack align="center" spacing={15}>
				<Button onClick={() => setUserBid(userBid + 500)}> + 500</Button>
				<Button onClick={() => setUserBid(userBid + 1000)}> + 1000</Button>
				<Button onClick={() => setUserBid(userBid + 1500)}> + 1500</Button>
				<Button onClick={() => setUserBid(userBid + 5000)}> + 5000</Button>
				<Input w="25vw" type="number" placeholder="Enter Custom Bid"></Input>
				<Box borderWidth="1px" rounded="lg" px={10} py={3}>
					<VStack>
						<Flex direction="row" justifyContent="left" alignItems="center">
							<Text fontSize="sm" color="GrayText">
								Bid :
							</Text>
							<Heading ml={1}>${userBid}</Heading>
						</Flex>
						<Button onClick={newBid}>Lock-in Bid</Button>
					</VStack>
				</Box>
			</HStack>
		</Card>
	);
};

export default UserControls;
