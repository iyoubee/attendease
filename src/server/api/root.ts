import { createTRPCRouter } from "~/server/api/trpc";
import { subscribeRouter } from "./routers/subscibe";
import { packageRouter } from "./routers/package";
import { AttendanceRouter } from "./routers/attendance";
import { AdminRouter } from "./routers/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  subscribe: subscribeRouter,
  package: packageRouter,
  attendance: AttendanceRouter,
  admin: AdminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
