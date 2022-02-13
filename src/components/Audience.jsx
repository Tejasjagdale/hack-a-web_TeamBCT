import { Avatar, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";

const Audience = ({ usersArr }) => {
	const [userDetails, setUserDetails] = useState([]);

	const toast = useToast();

	useEffect(() => {
		const getFunc = async () => {
			const snapshot = await firebase.firestore().collection("Users").get();
			setUserDetails([]);
			if (!snapshot.empty) {
				snapshot.forEach((ele) => {
					if (usersArr.includes(ele.id.toString())) {
						setUserDetails((prevState) => [...prevState, ele.data()]);
					}
				});
			}
		};

		getFunc();
	}, [usersArr]);

	//   useEffect(() => console.log(userDetails), [userDetails]);

	return (
		<div>
			<Wrap spacing="50px">
				{userDetails.map((user, index) => {
					return (
						<WrapItem key={index}>
							<Avatar
								key={index}
								size="lg"
								name={user.fname + " " + user.lname}
								src={user.photo}
							/>
						</WrapItem>
					);
				})}
			</Wrap>
		</div>
	);
};

export default Audience;
