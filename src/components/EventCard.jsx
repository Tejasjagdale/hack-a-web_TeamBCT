import {
	Badge,
	Box,
	Button,
	Flex,
	Image,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const EventCard = ({ item }) => {
	return (
		<Box m={4}>
			<Box
				bg={useColorModeValue("white", "gray.800")}
				w="xs"
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
			>
				<Image
					src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
					alt={item.id}
					roundedTop="lg"
				/>

				<Box p="4">
					<Text fontSize="20px" fontWeight="900" isTruncated>
						{item.name}
					</Text>
					<Text isTruncated>{item.description}</Text>
					<Flex direction="row" justifyContent="flex-end" mt={1}>
						<Button>Enter Event</Button>
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};

export default EventCard;
