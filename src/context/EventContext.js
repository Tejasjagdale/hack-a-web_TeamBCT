import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext({
	scheduledEvents: [],
	setScheduledEvents: null,
});

export const useEvent = () => useContext(EventContext);

export default function AuthContextProvider({ children }) {
	const [scheduledEvents, setScheduledEvents] = useState([]);

	const value = {
		scheduledEvents,
		setScheduledEvents,
	};

	return (
		<EventContext.Provider value={value}>{children}</EventContext.Provider>
	);
}
