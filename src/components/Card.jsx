import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Card = (props) => {
	return (
		<Box
			mx="auto"
			rounded="lg"
			shadow="md"
			bg={useColorModeValue("white", "gray.800")}
			maxW="2xl"
		>
			{props.children}
		</Box>
	);
};

export default Card;
