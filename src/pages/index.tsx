"use client";
import Link from "next/link";
import React from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

const Landing: React.FC = () => {
  return (
    <>
      <Navbar transparent />
      <main>
        <div
          className="relative flex content-center items-center justify-center pb-32 pt-16"
          style={{
            minHeight: "75vh",
          }}
        >
          <div
            className="absolute top-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="absolute h-full w-full bg-black opacity-75"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-6/12">
                <div className="pr-12">
                  <h1 className="text-5xl font-semibold text-white">
                    AttendEase
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Empowering Productivity, One Clock-In at a Time: Your
                    Gateway to Seamless Attendance Management with AttendEase
                  </p>
                  <Link href={"/subscribe"}>
                    <button
                      className={
                        "mt-5 bg-white text-gray-800 active:bg-gray-100" +
                        " rounded px-4 py-2 text-xs font-bold uppercase shadow outline-none hover:shadow-md focus:outline-none lg:mb-0 lg:mr-1"
                      }
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      <i className="fas fa-arrow-alt-circle-down"></i> Subscribe
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current text-gray-300"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="-mt-24 bg-gray-300 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="w-full px-4 pt-6 text-center md:w-4/12 lg:pt-12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-400 p-3 text-center text-white shadow-lg">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Streamline Your Workforce Management
                    </h6>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 text-center md:w-4/12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-400 p-3 text-center text-white shadow-lg">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Effortless Employee Attendance Management
                    </h6>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 pt-6 text-center md:w-4/12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-400 p-3 text-center text-white shadow-lg">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Revolutionize Work Attendance with Ease
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
