import "@testing-library/jest-dom";
import { setProjectAnnotations } from "@storybook/nextjs";
import { afterAll, afterEach, beforeAll } from "vitest";
import { worker } from "./app/msw/browser";
import * as previewAnnotations from "./.storybook/preview";

const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(async () => {
	await annotations?.beforeAll?.();
	await worker.start({
		onUnhandledRequest: "warn",
	});
});

afterEach(() => {
	worker.resetHandlers();
});

afterAll(() => {
	worker.stop();
});
