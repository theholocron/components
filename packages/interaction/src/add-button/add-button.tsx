import { Button } from "@mantine/core";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import * as React from "react";

interface BtnProps {
	children?: React.ReactNode;
	isSuccess?: boolean;
}

const BtnIcon = ({ children, isSuccess }: BtnProps) => isSuccess ? <React.Fragment>{children}</React.Fragment> : <IconPlus size={16} />;
const BtnText = ({ children, isSuccess }: BtnProps) => isSuccess ? <IconCheck size={24} /> : <React.Fragment>{children}</React.Fragment>;

export interface AddButtonProps {
	onClick: () => Promise<void>; // Accepts a function that returns a promise
	onError?: (error: Error) => void; // Optional error handler for the parent
	timeout?: number;
}

export function AddButton(props: AddButtonProps) {
	const {
		children,
		leftSection,
		onClick,
		onError,
		timeout = 5000,
		...rest
	} = props;
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

	const handleClick = async () => {
		setIsLoading(true);
		setIsSuccess(false);

		try {
			await onClick(); // Call the passed onClick handler
			setIsSuccess(true);

			// Keep the success state for 5 seconds
			setTimeout(() => {
				setIsSuccess(false);
			}, timeout);
		}
		catch (error) {
			setIsSuccess(false);
			if (onError && error instanceof Error) {
				onError(error); // Pass the error to the parent if onError is defined
			}
		}
		finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			color={isSuccess ? "green" : "blue"}
			leftSection={<BtnIcon isSuccess={isSuccess}>{leftSection}</BtnIcon>}
			loading={isLoading}
			onClick={handleClick}
			{...rest}
		>
			<BtnText isSuccess={isSuccess}>{children}</BtnText>
		</Button>
	);
}
