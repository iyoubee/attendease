import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";


export function randomPassword(){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const string_length = 8;
    let randomstring = '';
    let charCount = 0;
    let numCount = 0;
    
    for (let i=0; i<string_length; i++) {
        // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
        if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
            const rnum = Math.floor(Math.random() * 10);
            randomstring += rnum;
            numCount += 1;
        } else {
            // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
            const rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
            charCount += 1;
        }
    }

    return randomstring
}

export const AdminRouter = createTRPCRouter({
    createUser: protectedProcedure
        .input(
            z.object({
                email: z.string().min(1),
                name: z.string().min(1),
                companyId: z.string().min(1)
            })
        )    
        .query(async ({ ctx, input }) => {
            const email = input.email;
            const name = input.name;
            const companyId = input.companyId;

            const password = randomPassword();
            const hashedPassword = bcrypt.hashSync(password, 3);

            const createUserCompany = await ctx.db.user.create({
                data: {
                    name,
                    email,
                    role : 'user',
                    passwordHash: bcrypt.hashSync(hashedPassword, 3),
                    company: {
                        connect : {
                            id : companyId,
                        }
                    }

                }
            })
            return createUserCompany;

        
    }),



    deleteUser: protectedProcedure
        .input(
            z.object({
                email: z.string().min(1)
            })
        )    
        .query(async ({ ctx, input }) => {
            const email = input.email;
            return null;
    }),
})