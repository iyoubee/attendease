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
        <section className="h-screen w-full items-center justify-center bg-red-300 gap-4 flex flex-col">
          <div className=" bg-white text-2xl rounded-2xl p-4">Dashboard Admin</div>

          <button className=" bg-yellow-400 py-2 px-2 rounded-xl" onClick={()=> {
            router.replace('/attendance')
          }}>Lihat Rekap Absen</button>

          <button className=" bg-green-400 py-2 px-2 rounded-xl" onClick={()=> {
            router.replace('/admin/create')
          }}>Buat user</button>

          <button className=" bg-sky-400 p-2 rounded-xl" onClick={()=> {
            router.replace('/admin/show-user')
          }}>Lihat daftar pengguna</button>
        </section>
      </main>
    </>
  );
};

export default Admin;
