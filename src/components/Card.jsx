import { Box, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const Card = (props) => (
	<Box
		bg={useColorModeValue("white", "gray.700")}
		h="full"
		p={10}
		maxW="full"
		shadow="base"
		rounded={{ sm: "lg" }}
		{...props}
	/>
);
