import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const getCurrentDate = () => {
    const currentDatetime = new Date();
    const currentDay = currentDatetime.getDate();
    const currentMonth = currentDatetime.getMonth() + 1;
    const currentYear = currentDatetime.getFullYear();
    const currentDate = currentYear + '-' + currentMonth + '-' + currentDay;
    
    return {
        startDay: new Date(currentDate + ' 00:00:00'),
        current: currentDatetime
    }
}

export const AttendanceRouter = createTRPCRouter({
    isTodayAttendanceExist: protectedProcedure
        .input(
            z.object({
                userId: z.string().min(1)
            })
        )    
        .query(async ({ ctx, input }) => {
            const { startDay, current } = getCurrentDate();

            const todayAttendance = await ctx.db.attendance.findFirst({
                where: {
                    AND: [
                        { date: { lt: current } },
                        { date: { gte: startDay } },
                        { userId: { equals: input.userId } }
                    ]
                }
            })

            return todayAttendance;
    }),

    submitTodayAttendance: protectedProcedure
        .input(
            z.object({
                userId: z.string().min(1)
            })
        )
        .mutation(async ({ ctx, input }) => {
            const createdAttendance = await ctx.db.attendance.create({
                data: {
                    user: {
                        connect: {
                            id: input.userId
                        }
                    }
                }
            })

            return createdAttendance;
    }),
    
    getAllTodayAttendance: protectedProcedure.input(z.object({
        companyID: z.string().min(1)
    })).query(async ({ ctx, input }) => {
        const { startDay } = getCurrentDate();

        return await ctx.db.attendance.findMany({
            where: {
              date: {
                gte: startDay,
                lt: new Date(startDay.getTime() + 24 * 60 * 60 * 1000)
              },
              user: {
                companyId: input.companyID
              }
            },
            select: {
              user: true
            }
           });
    }),

    // reverseTodayAttendance: protectedProcedure.input(z.object({ usersId:  })).mutation(async ({ ctx, input }) => {
        
    // })
})