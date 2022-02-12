import {
	Button,
	chakra,
	Flex,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorMode,
	VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import { GiHeadbandKnot } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDisclosure } from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
	const { currentUser, logout } = useAuth();
	const { onOpen } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<chakra.header w="full" px={{ xl: 4 }} py={4} shadow="md">
				<Flex alignItems="center" justifyContent="space-between" mx="auto">
					<Flex>
						<Link to="/">
							<GiHeadbandKnot size={30} />
							<VisuallyHidden>Mental-piece</VisuallyHidden>
						</Link>
						<Text fontSize="xl" fontWeight="bold" ml="2">
							Auxn
						</Text>
					</Flex>

					<HStack color="brand.500">
						<Button onClick={() => toggleColorMode()}>
							{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
						</Button>
						<Menu>
							<MenuButton as={Button} leftIcon={<FaRegUserCircle />}>
								{currentUser ? currentUser.displayName : ""}
							</MenuButton>
							<MenuList>
								<Link to="/events">
									<MenuItem>Events</MenuItem>
								</Link>
								<Link to="/allevents">
									<MenuItem>All Events</MenuItem>
								</Link>
								<Link to="/auction">
									<MenuItem>Auction</MenuItem>
								</Link>
								<Link to="/items">
									<MenuItem>Items</MenuItem>
								</Link>
								<MenuItem onClick={onOpen}>Profile</MenuItem>
							</MenuList>
						</Menu>
						<Button
							colorScheme="orange"
							variant="solid"
							onClick={(e) => {
								e.preventDefault();
								logout();
							}}
						>
							Logout
						</Button>
					</HStack>
				</Flex>
			</chakra.header>
		</>
	);
};

export default Navbar;
