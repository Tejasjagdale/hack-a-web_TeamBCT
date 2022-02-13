import {
	// AspectRatio,
	Box,
	Button,
	chakra,
	Flex,
	Text,
	useColorModeValue,
	// Text,
} from "@chakra-ui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const ItemsCard = (props) => {
	return (
		<>
			<Flex
				w="40vw"
				mx={5}
				bg={useColorModeValue("white", "gray.800")}
				shadow="lg"
				rounded="lg"
				overflow="hidden"
			>
				<Box
					w={1 / 3}
					bgSize="cover"
					style={{
						backgroundImage: `url("${props.item.photos[0]}")`,
					}}
				></Box>

				<Box w={2 / 3} p={{ base: 4, md: 4 }}>
					<chakra.h1
						fontSize="2xl"
						fontWeight="bold"
						color={useColorModeValue("gray.800", "white")}
					>
						{props.item.name}
					</chakra.h1>
					<Text fontSize="sm">{props.item.id}</Text>

					<chakra.p
						mt={2}
						fontSize="sm"
						color={useColorModeValue("gray.600", "gray.400")}
					>
						{props.item.description}
					</chakra.p>

					<Flex mt={3} alignItems="center" justifyContent="space-between">
						Base Price : {props.item.base}
					</Flex>

					<Flex mt={3} alignItems="center" justifyContent="space-between">
						<Button
							colorScheme="red"
							size="md"
							id={props.id}
							onClick={props.removeItem}
							leftIcon={<AiFillDelete />}
						>
							Remove Item
						</Button>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default ItemsCard;
