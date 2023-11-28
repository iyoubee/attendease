import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const AttendanceRouter = createTRPCRouter({
    isTodayAttendanceExist: protectedProcedure
        .input(
            z.object({
                userId: z.string().min(1)
            })
        )    
        .query(async ({ ctx, input }) => {
            const getCurrentDate = () => {
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
        })
})