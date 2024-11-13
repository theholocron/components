import { handlers as authHandlers } from "../../page/inbox/auth/handlers";
import { handlers as taskHandlers } from "../../page/inbox/tasks/handlers";

export const handlers = [...taskHandlers, ...authHandlers];
