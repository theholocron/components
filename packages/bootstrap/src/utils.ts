import { LogLevel } from "@fullstory/browser";
import * as str from "@theholocron/utils-string";
import { useFullStory } from "./analytics/fullstory.hook";
import type { IApplication } from "./configuration/";
import { useSentry } from "./monitoring/sentry.hook";

export function eventLog (label: string, data: object): void {
	const fullstory = useFullStory();
	const sentry = useSentry();

	fullstory.event(label, data);
	sentry.captureEvent(label, { ...data });
}

export function setLog (conf: IApplication, serviceName: string, message: string, level: LogLevel = "log") {
	const title = conf?.title ?? conf?.name ?? conf?.slug ?? conf?.id;

	console[level](`[${str.toTitleCase(title, "-").toUpperCase()}]: ${serviceName} - ${message}`);
}
