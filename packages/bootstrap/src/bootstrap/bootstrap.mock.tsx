import * as React from "react";
import { useLoading } from "../loading/";

export function Loading () {
	const { setLoading } = useLoading();

	React.useEffect(() => {
		setLoading?.(true);
	}, [setLoading]);

	return <React.Fragment>test</React.Fragment>;
}
