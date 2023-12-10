"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@mantine/core";

const Admin: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status == "unauthenticated") {
    router.replace("/");
  }

  if (status == "authenticated") {
    if (session.user.role != "admin") {
      router.replace("/");
    }
  }

  return (
    <>
      <main>
        <section className="flex flex-col gap-4 h-screen w-full items-center justify-center gap-3 bg-red-300">
          <div className="bg-black text-white font-2xl p-4 text-2xl rounded-xl">
            <span>
              DASHBOARD ADMIN
            </span>
          </div>
          <Button
            variant="filled"
            type="submit"
            className=" bg-yellow-300 p-2 rounded-xl text-black"
            onClick={() => {
              router.push("/admin/create");
            }}
          >
            Buat User
          </Button>
          <Button
            variant="filled"
            type="submit"
            className=" bg-green-400 text-black p-2 rounded-xl"
            onClick={() => {
              router.push("/admin/show-user");
            }}
          >
            Lihat Daftar Pengguna
          </Button>
          <Button
            variant="filled"
            type="submit"
            className=" bg-red-500 p-2 rounded-xl"
            onClick={() => {
              router.push("/attendance");
            }}
          >
            Lihat Absensi
          </Button>
        </section>
      </main>
    </>
  );
};

export default Admin;
