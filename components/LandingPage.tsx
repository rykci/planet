import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, XIcon } from "@heroicons/react/solid";

function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div
        className={`${
          showModal ? "opacity-20" : ""
        } flex flex-col h-screen items-center bg-gray-100 pt-8 md:flex-row md:justify-around lg:justify-evenly`}
      >
        <div className="flex flex-col items-center md:items-start md:pb-20">
          <img
            className="h-28 md:-ml-8 md:-mb-2"
            src="/logo.svg"
            placeholder="LOGO"
          />
          <div className="leading-tight text-2xl text-center w-96 mb-10 md:text-left lg:text-3xl lg:w-[27rem]">
            Connect with friends and the world around you on Facebook.
          </div>
        </div>
        <form className="flex flex-col rounded-md items-center justify-center gap-4 bg-white shadow-2xl p-5 w-96">
          <input
            disabled={showModal}
            className="w-full border p-3 rounded-md"
            placeholder="Username"
          />
          <div className="focus-within:border-black focus-within:border-2 w-full flex justify-center items-center border rounded-md">
            <input
              disabled={showModal}
              className="w-full focus:outline-none p-3"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <EyeOffIcon
              onClick={() => {
                if (!showModal) setShowPassword(!showPassword);
              }}
              className={`${
                showModal ? "" : "cursor-pointer"
              } h-6 pr-3  stroke-2 text-gray-400 `}
            />
          </div>

          <button
            disabled={showModal}
            onClick={(e) => {
              e.preventDefault();
              console.log(showModal);
            }}
            className="bg-blue-500 border-blue-500 text-white w-full p-2 pl-4 pr-4 rounded-md border-2 enabled:hover:bg-blue-600 enabled:hover:border-blue-600 font-bold text-lg"
          >
            Log In
          </button>

          <div className="m-4 w-full border-t"></div>

          <button
            disabled={showModal}
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
            className="bg-green-500 border-green-500 p-3 pl-4 pr-4 rounded-lg border-2 enabled:hover:bg-green-600 enabled:hover:border-green-600 font-bold  text-white mb-3"
          >
            Create new account
          </button>
        </form>
      </div>
      <div
        className={`${
          showModal ? "" : "hidden"
        } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-md items-center justify-center  bg-white shadow-2xl`}
      >
        <div className="self-start space-y-1 p-5 pb-0 pt-3 relative w-full">
          <h1 className="font-bold  text-3xl">Sign Up</h1>
          <XIcon
            onClick={() => setShowModal(false)}
            className="h-6 stroke-1 cursor-pointer absolute right-3 top-3"
          />
          <h2 className=" text-gray-400">It’s quick and easy.</h2>
        </div>

        <div className="m-4 w-full border-t"></div>

        <form className="flex flex-col p-5 pt-1 w-96 gap-4 justify-center align-middle">
          <input
            className="w-full border p-3 rounded-md"
            placeholder="Username"
          />
          <input
            className="w-full border p-3 rounded-md"
            placeholder="Password"
            type="password"
          />
          <input
            className="w-full border p-3 rounded-md"
            placeholder="Confirm Your Password"
            type="password"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
            className="bg-green-500 border-green-500 rounded-lg  hover:bg-green-600 hover:border-green-600 font-bold p-2 mx-auto w-1/2  text-white my-3"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
