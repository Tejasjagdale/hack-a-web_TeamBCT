import { Button, Heading, HStack, Input } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

const UserControls = () => {
	return (
		<Card w="full" m="3" h="full">
			<HStack align="center" spacing={15}>
				<Button> + 500</Button>
				<Button> + 1000</Button>
				<Button> + 1500</Button>
				<Button> + 5000</Button>
				<Input type="number" placeholder="Enter Custom Bid"></Input>
				<Heading></Heading>
			</HStack>
		</Card>
	);
};

export default UserControls;
