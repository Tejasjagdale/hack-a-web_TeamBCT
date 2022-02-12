import { Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
	return (
		<>
			<Navbar />
			<Container maxW="container.xl">{props.children}</Container>
		</>
	);
};

export default Layout;
