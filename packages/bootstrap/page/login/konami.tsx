import { Image } from "@mantine/core";
import NextImage from "next/image";
import konamiCode from "../../src/konami/konami.jpg";

export function AnimatedImage() {
	return (
		<div
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				visibility: "hidden",
				opacity: 0,
				animation: "slideInFromLeft 4s ease-out forwards",
			}}
		>
			<Image
				component={NextImage}
				src={konamiCode}
				alt="the konami code"
				unoptimized
				width={400}
				height={300}
			/>
			<style>{`
			@keyframes slideInFromLeft {
				0% {
					opacity: 0;
					visibility: hidden;
					transform: translateX(-100vw); /* Start from left off-screen */
				}
				25% {
					opacity: 1;
					visibility: visible;
					transform: translateX(0); /* Element is visible and in place */
				}
				100% {
					opacity: 0;
					visibility: hidden;
					transform: translateX(100vw); /* End off-screen */
				}
			}
		`}</style>
		</div>
	);
}
