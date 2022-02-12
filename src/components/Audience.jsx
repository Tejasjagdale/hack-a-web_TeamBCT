import { Avatar, AvatarGroup, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

const Audience = () => {
	return (
		<div>
			<Wrap spacing="50px">
				<WrapItem>
					<Avatar
						size="lg"
						name="Dan Abrahmov"
						src="https://bit.ly/dan-abramov"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Kola Tioluwani"
						src="https://bit.ly/tioluwani-kolawole"
					/>
				</WrapItem>

				<WrapItem>
					<Avatar
						size="lg"
						name="Kola Tioluwani"
						src="https://bit.ly/tioluwani-kolawole"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Kent Dodds"
						src="https://bit.ly/kent-c-dodds"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Ryan Florence"
						src="https://bit.ly/ryan-florence"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Prosper Otemuyiwa"
						src="https://bit.ly/prosper-baba"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Christian Nwamba"
						src="https://bit.ly/code-beast"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Segun Adebayo"
						src="https://bit.ly/sage-adebayo"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Dan Abrahmov"
						src="https://bit.ly/dan-abramov"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Kola Tioluwani"
						src="https://bit.ly/tioluwani-kolawole"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Kent Dodds"
						src="https://bit.ly/kent-c-dodds"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Ryan Florence"
						src="https://bit.ly/ryan-florence"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Prosper Otemuyiwa"
						src="https://bit.ly/prosper-baba"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Christian Nwamba"
						src="https://bit.ly/code-beast"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Segun Adebayo"
						src="https://bit.ly/sage-adebayo"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Dan Abrahmov"
						src="https://bit.ly/dan-abramov"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Kola Tioluwani"
						src="https://bit.ly/tioluwani-kolawole"
					/>
				</WrapItem>
				<WrapItem>
					<Avatar
						size="lg"
						name="Kent Dodds"
						src="https://bit.ly/kent-c-dodds"
					/>
				</WrapItem>

				<WrapItem>
					<AvatarGroup size="lg" max={2}>
						<Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
						<Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
						<Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
						<Avatar
							name="Prosper Otemuyiwa"
							src="https://bit.ly/prosper-baba"
						/>
						<Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
					</AvatarGroup>
				</WrapItem>
			</Wrap>
		</div>
	);
};

export default Audience;
