"use client";
import React from "react";
import FooterSmall from "~/components/FooterSmall";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Button } from "@mantine/core";
import toast from "react-hot-toast";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status == "unauthenticated") {
    router.replace("/");
  }

  if (status == "authenticated") {
    if (session.user.name == "admin") {
      router.replace("/");
    }
  }

  const currentDate = new Date()
  const currentDateString = currentDate.toDateString()

  const attendanceRecs = api.attendance.isTodayAttendanceExist.useQuery({userId: session?.user.id as string}).data
  
  const submitAttendance = api.attendance.submitTodayAttendance.useMutation()

  const handleSubmit = (userId: string) => {
    submitAttendance.mutate({
      userId: userId
    })
    toast.success("Successfully submitting today's attendance, please refresh this page")
  }
  
  const renderButtonOrInfo = (attendanceData: object | undefined | null) => {
    if (attendanceData == null) {
      return (
        <div className="flex flex-col items-center">
          <div>Please record your attendance by clicking this button</div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 m-2 rounded" onClick={(e) => {
              e.preventDefault();
              handleSubmit(session!.user.id)
            }}>
              Submit Attendance
            </button>
        </div>
      )
    } else {
      return (
          <div>
            <div className="">You have already recorded your attendance for today :D</div>
          </div>
      )
    }
  }

  return (
    <>
      <main>
        <div className="flex flex-col h-screen w-full items-center justify-center bg-red-300">
          <div className="text-2xl">Hello, {' '}
            <span className="font-bold">{session?.user.name}</span>!
          </div>
          <div className="mb-4">Today's Date: {currentDateString}</div>
          {renderButtonOrInfo(attendanceRecs)} 
          <FooterSmall absolute />
        </div>
      </main>
    </>
  );
};

export default Dashboard;