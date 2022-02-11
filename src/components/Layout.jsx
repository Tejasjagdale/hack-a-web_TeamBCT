import { Container } from "@chakra-ui/react";
import React from "react";

const Layout = (props) => {
	return <Container maxW="container.xl">{props.children}</Container>;
};

export default Layout;
