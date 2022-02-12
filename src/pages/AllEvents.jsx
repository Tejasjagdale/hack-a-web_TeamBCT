import React from "react";
import { db } from "../utils/firebase-config";

const AllEvents = () => {
	db.collection("events").onSnapshot(function (snapshot) {
		snapshot.docChanges().forEach(function (change) {
		  console.log(change.doc.data())
		});
	  });
	return <div>AllEvents</div>;
};

export default AllEvents;
