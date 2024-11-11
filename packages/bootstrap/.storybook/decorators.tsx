import { type Decorator } from "@storybook/react";
import { Layout } from "../app/layout";

export function PageDecorator (Story): Decorator {
	return <Layout><Story /></Layout>;
}
