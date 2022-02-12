import {
	// AspectRatio,
	Box,
	Button,
	chakra,
	Flex,
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
						backgroundImage:
							"url('https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')",
					}}
				></Box>

				<Box w={2 / 3} p={{ base: 4, md: 4 }}>
					<chakra.h1
						fontSize="2xl"
						fontWeight="bold"
						color={useColorModeValue("gray.800", "white")}
					>
						{props.item.id}
					</chakra.h1>

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
