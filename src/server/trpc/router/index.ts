// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { userRouter } from "./user";
import { authRouter } from "./auth";

export const appRouter = t.router({
  example: exampleRouter,
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
