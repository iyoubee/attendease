"use client";
import React from "react";
import FooterSmall from "~/components/FooterSmall";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "~/components/Navbar";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status == "authenticated") {
    if (session.user.name != "user") {
      router.replace("/");
    }
  }

  return (
    <>
      <main>
        <section className="">
          <Navbar transparent />
          <div>INI halaman karyawan</div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
