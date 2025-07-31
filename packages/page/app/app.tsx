import { Container, Title } from "@mantine/core";
import { AddAdditional } from "../src/";

import "@mantine/core/styles.css";

export function App () {
	return (
		<Container m={20}>
			<Title order={2}>Interactions</Title>
			<AddAdditional>
				{(id) => (
					<div data-testid={`row-${id}`} style={{ flex: 1 }}>Row {id}</div>
				)}
			</AddAdditional>
		</Container>
	);
}
