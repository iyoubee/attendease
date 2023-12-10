"use client";
import React, { useEffect, useState } from "react";
import FooterSmall from "~/components/FooterSmall";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Button, Group, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import toast from "react-hot-toast";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

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

  const check = api.onboarding.check.useQuery({
    id: session?.user.id as string,
  }).data;
  const resetPassword = api.onboarding.resetPassword.useMutation({
    onSuccess: () => {
      close();
      setLoading(false);
      toast.success("Success reset password!");
    },
    onError: (error) => {
      toast.error("Error," + error.message);
    },
  });
  const currentDate = new Date();
  const currentDateString = currentDate.toDateString();

  const attendanceRecs = api.attendance.isTodayAttendanceExist.useQuery({
    userId: session?.user.id as string,
  }).data;

  const submitAttendance = api.attendance.submitTodayAttendance.useMutation();

  const handleSubmit = (userId: string) => {
    submitAttendance.mutate({
      userId: userId,
    });
    toast.success(
      "Successfully submitting today's attendance, please refresh this page",
    );
  };

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (check) {
      if (!check.isReset) {
        open();
      }
    }
  }, [check?.isReset]);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
      termsOfService: false,
    },

    validate: {
      password: (value) =>
        value.length < 8 ? "Password must be more than 8 character" : null,
    },
  });

  const renderButtonOrInfo = (attendanceData: object | undefined | null) => {
    if (attendanceData == null) {
      return (
        <div className="flex flex-col items-center">
          <div>Please record your attendance by clicking this button</div>
          <button
            className="m-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(session!.user.id);
            }}
          >
            Submit Attendance
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="">
            You have already recorded your attendance for today :D
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <main>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-red-300">
          <div className="text-2xl">
            Hello, <span className="font-bold">{session?.user.name}</span>!
          </div>
          <div className="mb-4">Today's Date: {currentDateString}</div>
          {renderButtonOrInfo(attendanceRecs)}
          <FooterSmall absolute />
        </div>
        <Modal opened={opened} onClose={close} title="Reset Password">
          <form
            onSubmit={form.onSubmit((values) => {
              resetPassword.mutate({
                id: session?.user.id as string,
                password: values.password,
              });
            })}
            className="flex flex-col gap-3"
          >
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />

            <TextInput
              data-autofocus
              withAsterisk
              label="Password"
              placeholder="password"
              type="password"
              {...form.getInputProps("password")}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="filled" type="submit" className="bg-black">
                Submit
              </Button>
            </Group>
          </form>
        </Modal>
      </main>
    </>
  );
};

export default Dashboard;
