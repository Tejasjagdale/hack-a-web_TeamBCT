import { AspectRatio, Box, Image } from "@chakra-ui/react";
import React from "react";

const ItemViewer = () => {
	return (
		<>
			<Image
				boxSize="240px"
				objectFit="cover"
				src="https://bit.ly/dan-abramov"
				alt="Dan Abramov"
			/>
		</>
	);
};

export default ItemViewer;
