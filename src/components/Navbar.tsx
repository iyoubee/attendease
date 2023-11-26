"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav
      className={
        (props.transparent
          ? "absolute top-0 z-50 w-full"
          : "relative bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-3 "
      }
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
          <a
            className={
              (props.transparent ? "text-white" : "text-gray-800") +
              " mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed"
            }
            href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
          >
            AttendEase
          </a>
          <button
            className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none outline-none focus:outline-none lg:hidden"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i
              className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " fas fa-bars"
              }
            ></i>
          </button>
        </div>
        <div
          className={
            "flex-grow items-center bg-white lg:flex lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
            {status == "authenticated" ? (
              <li className="flex items-center">
                <button
                  className={
                    (props.transparent
                      ? "bg-white text-gray-800 active:bg-gray-100"
                      : "bg-pink-500 text-white active:bg-pink-600") +
                    " mb-3 ml-3 rounded px-4 py-2 text-xs font-bold uppercase shadow outline-none hover:shadow-md focus:outline-none lg:mb-0 lg:mr-1"
                  }
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={async () => {
                    await signOut({
                      redirect: false,
                      callbackUrl: "/login",
                    })
                      .then((data) => {
                        router.replace(data.url);
                        toast.success("Logged Out!");
                      })
                      .catch(() => {
                        toast.error("Error");
                      });
                  }}
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Login
                </button>
              </li>
            ) : (
              <li className="flex items-center">
                <button
                  className={
                    (props.transparent
                      ? "bg-white text-gray-800 active:bg-gray-100"
                      : "bg-pink-500 text-white active:bg-pink-600") +
                    " mb-3 ml-3 rounded px-4 py-2 text-xs font-bold uppercase shadow outline-none hover:shadow-md focus:outline-none lg:mb-0 lg:mr-1"
                  }
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
