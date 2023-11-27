import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const AdminRouter = createTRPCRouter({
    createUser: protectedProcedure
        .input(
            z.object({
                email: z.string().min(1),
                name: z.string().min(1)
            })
        )    
        .query(async ({ ctx, input }) => {

            return null;
    }),



    deleteUser: protectedProcedure
        .input(
            z.object({
                email: z.string().min(1)
            })
        )    
        .query(async ({ ctx, input }) => {

            return null;
    }),
})