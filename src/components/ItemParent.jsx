import React, { useContext, useEffect, useState } from "react";
import ItemDetails from "./ItemDetails";
import ItemViewer from "./ItemViewer";
import { rdb } from "../utils/firebase-config";
import { child, onValue, push, ref, update } from "firebase/database";
import { EventContext, ItemsContext } from "../pages/AuctionRoom";

const ItemParent = (props) => {
	const [eventItems, setEventItems] = useContext(ItemsContext);
	const [currentItem, setCurrentItem] = useContext(EventContext);

	useEffect(() => {
		nextItem();
	}, [props.showItem]);

	const nextItem = () => {
		eventItems.every(function (element, index) {
			if (element.status === "hold") {
				// Write the new post's data simultaneously in the posts list and the user's post list.
				const updates = {};
				element.status = "ongoing";
				element.currentbid = "----";
				updates["/items/" + element.id] = element;
				update(ref(rdb), updates);
				setCurrentItem(element);
				return false;
			} else {
				return true;
			}
		});
	};

	return (
		<>
			<ItemViewer />
			<ItemDetails
				totalItems={eventItems}
				eventStatus={props.eventStatus}
				nextItemFunc={nextItem}
			/>
		</>
	);
};

export default ItemParent;
