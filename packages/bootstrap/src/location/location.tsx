import {
	location,
	type IGeolocationCoordinates,
} from "@theholocron/utils-location";
import * as React from "react";
import { useStorage } from "../storage/";
import type { WithChildren } from "../type";

export type TLocation = {
	location: IGeolocationCoordinates | null;
	isLoading: boolean;
};

type CachedLocationData = {
	coords: IGeolocationCoordinates;
	timestamp: number;
};

const Context = React.createContext<TLocation | undefined>(undefined);
Context.displayName = "@theholocron/bootstrap/Location";

export function Provider(props: WithChildren) {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [userLocation, setUserLocation] =
		React.useState<IGeolocationCoordinates | null>(null);
	const storage = useStorage();

	React.useEffect(() => {
		const storageKey = "user.location";
		const maximumAge = 1000 * 60 * 15; // 15 minutes
		const now = Date.now();

		const fetchLocation = async () => {
			const cachedData = storage.getFrom<CachedLocationData>(storageKey);
			if (cachedData && now - cachedData.timestamp < maximumAge) {
				setUserLocation(cachedData.coords);
				setIsLoading(false);
				return;
			}

			try {
				const coords = await location.getCurrent();
				setUserLocation(coords);
				storage.sendTo(storageKey, {
					coords,
					timestamp: now,
				});
			} catch (error) {
				console.error("Failed to fetch location:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLocation();
	}, [storage]);

	const value = React.useMemo(
		() => ({ location: userLocation, isLoading }),
		[userLocation, isLoading]
	);

	return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
Provider.displayName = "@theholocron/bootstrap/Location";

export function useLocation(): TLocation {
	const context = React.useContext(Context);

	if (context === undefined) {
		throw new Error("useLocation must be used within a Location.Provider!");
	}

	return context;
}
