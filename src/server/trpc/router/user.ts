import { t } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";

export const userRouter = t.router({
  userById: t.procedure
    .input((val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      return [];
    }),
  create: t.procedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      input.password = await new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.hash(input.password, saltRounds, function (err, hash) {
          if (err) return reject(err);
          resolve(hash);
        });
      });
      return ctx.prisma.user.create({
        data: input,
      });
    }),
});
