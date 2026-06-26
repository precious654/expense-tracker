"use client";

import React from "react";

import { useAuth } from "@/context/AuthContext";

type step = "signup" | "signin";

const AuthForm = () => {
  const [step, setStep] = React.useState<step>("signup");

  const { session } = useAuth();
  console.log(session);

  return (
    <>
      {step === "signup" && (
        <form className="flex flex-col gap-4 w-[50%] mx-auto mt-10">
          <input
            type="text"
            className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
            placeholder="Your username"
            name="name"
            id="name"
          />
          <input
            type="email"
            className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
            placeholder="Your email"
            name="email"
            id="email"
          />
          <input
            type="password"
            className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
            placeholder="Password"
            name="password"
            id="password"
          />
          <input
            type="password"
            className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
            placeholder="Confirm password"
            name="confirmPassword"
            id="confirmPassword"
          />
          <button className="py-4 rounded-full bg-amber-400 w-full mt-3 text-white">
            sign up
          </button>
        </form>
      )}

      {step === "signin" && (
        <form className="flex flex-col gap-4 w-[50%] mx-auto mt-10">
          <input
            type="email"
            className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
            name="email"
            id="email"
          />
          <input
            type="password"
            className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
            name="password"
            id="password"
          />
          <button className="py-4 rounded-full bg-amber-400 w-full mt-3 text-white">
            sign in
          </button>
        </form>
      )}
    </>
  );
};

export default AuthForm;
