import { useFullStory } from "./analytics/fullstory.hook";
import { useSentry } from "./monitoring/sentry.hook";
import { toTitleCase, eventLog } from "./utils";

jest.mock("./analytics/fullstory.hook", () => ({
	useFullStory: jest.fn(),
}));

jest.mock("./monitoring/sentry.hook", () => ({
	useSentry: jest.fn(),
}));

describe("toTitleCase", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should convert a lowercase string to title case with default separator", () => {
		const input = "hello world";
		const expectedOutput = "Hello World";
		const result = toTitleCase(input);
		expect(result).toEqual(expectedOutput);
	});

	test("should convert a lowercase string to title case with a custom separator", () => {
		const input = "hello-world";
		const expectedOutput = "Hello World";
		const separator = "-";
		const result = toTitleCase(input, separator);
		expect(result).toEqual(expectedOutput);
	});

	test("should not modify an already title case string", () => {
		const input = "Hello World";
		const result = toTitleCase(input);
		expect(result).toEqual(input);
	});

	test("should handle an empty string", () => {
		const input = "";
		const result = toTitleCase(input);
		expect(result).toEqual(input);
	});

	test("should handle a single-word string", () => {
		const input = "hello";
		const result = toTitleCase(input);
		expect(result).toEqual("Hello");
	});
});

describe("eventLog", () => {
	test("should call fullstory.event and sentry.captureEvent with the correct arguments", () => {
		const mockFullStoryEvent = jest.fn();
		const mockSentryCaptureEvent = jest.fn();

		(useFullStory as jest.Mock).mockReturnValue({
			event: mockFullStoryEvent,
		});

		(useSentry as jest.Mock).mockReturnValue({
			captureEvent: mockSentryCaptureEvent,
		});

		const label = "Test Event";
		const data = { key: "value" };
		eventLog(label, data);

		expect(mockFullStoryEvent).toHaveBeenCalledWith(label, data);
		expect(mockSentryCaptureEvent).toHaveBeenCalledWith(label, data);
	});
});
