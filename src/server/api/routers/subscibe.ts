import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";

export const subscribeRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        domain: z.string().min(1),
        password: z.string().min(1),
        package: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const passwordHash = bcrypt.hashSync(input.password, 3);

      const createCompany = await ctx.db.company.create({
        data: {
          name: input.name,
          domain: input.domain,
          package: {
            connect: {
              id: input.package,
            },
          },
        },
      });

      const createUserAdmin = await ctx.db.user.create({
        data: {
          name: "admin",
          email: "admin@" + input.domain,
          role: "admin",
          passwordHash: passwordHash,
          company: {
            connect: {
              id: createCompany.id,
            },
          },
        },
      });

      return createUserAdmin;
    }),
});
