import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";

export const OnboardingRouter = createTRPCRouter({
  resetPassword: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.id;
      const password = input.password;
      const hashedPassword = bcrypt.hashSync(password, 3);
      return await ctx.db.user.update({
        where: {
          id,
        },
        data: {
          passwordHash: hashedPassword,
          isReset: true,
        },
      });
    }),

  check: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const id = input.id;
      return await ctx.db.user.findUnique({
        where: {
          id,
        },
        select: {
          isReset: true,
        },
      });
    }),
});
