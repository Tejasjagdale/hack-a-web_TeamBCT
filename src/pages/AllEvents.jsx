import { Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { db } from "../utils/firebase-config";

const AllEvents = () => {
	const [allEvents, setAllEvents] = useState([]);

	useEffect(() => {
		db.collection("events").onSnapshot(function (snapshot) {
			snapshot.docChanges().forEach(function (change) {
				// console.log(change.doc.data());

				setAllEvents((prev) => {
					return [...prev, change.doc.data()];
				});
			});
		});
	}, []);

	return (
		<div>
			<Wrap>
				{allEvents
					? allEvents.map((item) => (
							<>
								<WrapItem>
									<EventCard item={item} />
								</WrapItem>
							</>
					  ))
					: "brun"}
			</Wrap>
		</div>
	);
};

export default AllEvents;
