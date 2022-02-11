import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import animationData from "../lottie/signin.json";
import Lottie from "react-lottie";

const SignInCard = ({ signIn,id }) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	return (
		<>
			<Box
				mt="40px"
				p={{ base: 4, md: 4 }}
				w="sm"
				bg={useColorModeValue("white", "gray.800")}
				shadow="lg"
				rounded="lg"
				overflow="hidden"
				mx="auto"
			>
				<Box py={5} textAlign="center">
					<Lottie options={defaultOptions} />
				</Box>
				<Button
					onClick={signIn}
					leftIcon={<FaGoogle />}
					colorScheme="red"
					w="full"
				>
					Sign-in using Google
				</Button>
			</Box>
		</>
	);
};

export default SignInCard;
