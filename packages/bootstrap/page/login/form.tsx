"use client";

import {
	Button,
	Container,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import * as React from "react";
import { useLocation, useKonami, useStorage } from "../../src/";
import type { Credentials } from "../inbox/auth";
import { AnimatedImage } from "./konami";

export interface LoginFormProps extends React.HTMLProps<HTMLFormElement> {
	onSubmit: (formData: Credentials) => void;
}

export function LoginForm(props: LoginFormProps) {
	const { onSubmit, ...rest } = props;

	return (
		<form
			className="login-form-container"
			onSubmit={(event) => {
				event.preventDefault();
				const elementsArray = Array.from(
					event.currentTarget.elements
				) as HTMLInputElement[];
				const formData = elementsArray.reduce(
					(acc: Partial<Credentials>, elem: HTMLInputElement) => {
						if (elem.name) {
							acc[elem.name as keyof Credentials] = elem.value;
						}
						return acc;
					},
					{} as Partial<Credentials>
				);

				// Ensure `formData` includes both `username` and `password` before calling `onSubmit`
				if (formData.username && formData.password) {
					onSubmit(formData as Credentials); // Type assertion to `Credentials`
				} else {
					console.error("Both username and password are required.");
				}
			}}
			{...rest}
		>
			<TextInput
				name="email"
				type="email"
				autoComplete="email"
				required
				aria-required="true"
				label="Email address"
				radius="md"
				mb={10}
			/>
			<PasswordInput
				name="password"
				type="password"
				id="password"
				required
				aria-required="true"
				label="Password"
				radius="md"
			/>
			<Button fullWidth mt="xl" type="submit">
				Sign in
			</Button>
		</form>
	);
}

export interface LoginProps {
	onLogIn: (credentials: Credentials) => void;
}

export function Login(props: LoginProps) {
	const hasKonamiCodeEntered = useKonami();
	const { location } = useLocation();
	const storage = useStorage();

	React.useEffect(() => {
		storage.sendTo("user.isLoggedIn", false);
	}, []);

	return (
		<React.Fragment>
			<Container size={420} my={40}>
				<Title ta="center">Taskbox</Title>
				<Text c="dimmed" size="sm" ta="center" mt={5}>
					Sign in to your account
				</Text>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<LoginForm onSubmit={props.onLogIn} />
				</Paper>
			</Container>
			{hasKonamiCodeEntered && <AnimatedImage />}
			{location && (
				<Text c="dimmed" size="sm" ta="center" mt={5}>
					Current location: {location.latitude}, {location.longitude}
				</Text>
			)}
		</React.Fragment>
	);
}
