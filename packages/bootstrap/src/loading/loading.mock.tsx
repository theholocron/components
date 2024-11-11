import * as React from "react";
import { useLoading } from "./loading";

const spinAnimation = `
	@keyframes spin {
		0% { transform: rotate(0deg) translate3d(0, 0, 0); }
		100% { transform: rotate(360deg) translate3d(0, 0, 0); }
	}
`;

export function Loader () {
	return (
		<div
			data-testid="loader"
			style={{
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "100vh",
			}}
		>
			<style dangerouslySetInnerHTML={{ __html: spinAnimation }} />
			<svg
				fill="none"
				height={64}
				style={{
					animation: "spin 0.88s linear infinite",
					willChange: "transform",
				}}
				viewBox="0 0 48 48"
				width={64}
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM4.8 24C4.8 34.6039 13.3961 43.2 24 43.2C34.6039 43.2 43.2 34.6039 43.2 24C43.2 13.3961 34.6039 4.8 24 4.8C13.3961 4.8 4.8 13.3961 4.8 24Z"
					fill="#2163e2"
					fillOpacity={0.15}
				/>
				<path
					d="M24 45.6C24 46.9255 25.0772 48.0125 26.3961 47.8802C31.8813 47.33 37.038 44.9031 40.9706 40.9706C45.4714 36.4697 48 30.3652 48 24C48 17.6348 45.4714 11.5303 40.9706 7.02944C37.038 3.09691 31.8813 0.67003 26.3961 0.119834C25.0772 -0.0124555 24 1.07452 24 2.4C24 3.72548 25.0787 4.78451 26.3938 4.94974C30.6034 5.47862 34.5447 7.39177 37.5765 10.4236C41.1772 14.0243 43.2 18.9078 43.2 24C43.2 29.0922 41.1771 33.9758 37.5765 37.5765C34.5447 40.6082 30.6034 42.5214 26.3938 43.0503C25.0787 43.2155 24 44.2745 24 45.6Z"
					fill="#2163e2"
				/>
			</svg>
		</div>
	);
}

// Example component that utilizes the Loading context
// @TODO: update to use msw
export const TestComponent = () => {
    const { setLoading } = useLoading();

	const fetchData = async () => {
		setLoading(true);
		await fetch("/api/data"); // Trigger a network request
		setLoading(false);
	};

    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            <p>Click the button to simulate loading.</p>
        </div>
    );
};

