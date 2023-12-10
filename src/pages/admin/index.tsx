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
        <section className="flex h-screen w-full items-center justify-center gap-3 bg-red-300">
          <Button
            variant="filled"
            type="submit"
            className="bg-black"
            onClick={() => {
              router.push("/admin/create");
            }}
          >
            Buat user
          </Button>
          <Button
            variant="filled"
            type="submit"
            className="bg-black"
            onClick={() => {
              router.push("/admin/show-user");
            }}
          >
            Lihat daftar pengguna
          </Button>
          <Button
            variant="filled"
            type="submit"
            className="bg-black"
            onClick={() => {
              router.push("/attendance");
            }}
          >
            Lihat absensi
          </Button>
        </section>
      </main>
    </>
  );
};

export default Admin;
