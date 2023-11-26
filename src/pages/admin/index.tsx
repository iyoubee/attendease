"use client";
import React from "react";
import FooterSmall from "~/components/FooterSmall";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "~/components/Navbar";

const Admin: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status == "authenticated") {
    if (session.user.name != "admin") {
      router.replace("/");
    }
  }

  return (
    <>
      <main>
        <section className="">
          <Navbar transparent />
          <div>INI halaman admin</div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Admin;
