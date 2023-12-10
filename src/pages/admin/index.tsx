"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
        <section className="flex h-screen w-full items-center justify-center bg-red-300">
          <button
            onClick={() => {
              router.push("/admin/create");
            }}
          >
            Buat user
          </button>
          <button
            onClick={() => {
              router.push("/admin/show-user");
            }}
          >
            Lihat daftar pengguna
          </button>
        </section>
      </main>
    </>
  );
};

export default Admin;
