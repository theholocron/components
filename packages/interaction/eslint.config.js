import { cypress, holocron, storybook } from "@theholocron/eslint-config";

/**
 * @see https://eslint.org/docs/latest/use/configure/
 * @type {import("eslint").Linter.Config}
 */
const config = [...holocron, ...storybook, ...cypress];

export default config;
