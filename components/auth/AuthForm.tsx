"use client";

import React from "react";

import { useAuth } from "@/context/AuthContext";

type step = "signup" | "signin";

const AuthForm = () => {
  const { session, signInUser } = useAuth();
  const [step, setStep] = React.useState<step>("signup");

  const [error, submitAction, isPending] = React.useActionState(
    async (prevState, formData: FormData) => {
      let userData;
      const confirmPassword = formData.get("confirmPassword");

      if (step === "signup") {
        userData = {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        };

        if (userData.password !== confirmPassword) {
          return new Error("Passwords do not match");
        }

        // const{success, data, error: signUpError} = await signUp();

        // if(signInError) {
        //   return new Error(signUpError);
        // }

        // if(success && data.session) {
        //   return null;
        // }

        return null;
      } else if (step === "signin") {
        userData = {
          email: formData.get("email"),
          password: formData.get("password"),
        };

        const {
          success,
          data,
          error: signInError,
        } = await signInUser(userData.email, userData.password);

        if (signInError) {
          return new Error(signInError);
        }

        if (success && data.session) {
          return null;
        }

        return null;
      }
      console.log(userData);
    },
    null
  );

  return (
    <>
      <form
        action={submitAction}
        className="flex flex-col gap-4 w-[50%] mx-auto mt-10"
      >
        {step === "signup" && (
          <>
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
              {isPending ? "signing up" : "sign up"}
            </button>
            <p className="text-sm">
              Already have an account?{" "}
              <button
                className="text-sm font-semibold underline cursor-pointer"
                onClick={() => setStep("signin")}
              >
                sign in
              </button>
            </p>
          </>
        )}

        {step === "signin" && (
          <>
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
            <button className="py-4 rounded-full bg-amber-400 w-full mt-3 text-white">
              {isPending ? "signing in" : "sign in"}
            </button>
            <p className="text-sm">
              Already have an account?{" "}
              <button
                className="text-sm font-semibold underline cursor-pointer"
                onClick={() => setStep("signup")}
              >
                sign up
              </button>
            </p>
          </>
        )}
        {error && (
          <div role="alert" className="mt-4 text-sm text-red-500 font-medium">
            {error.message}
          </div>
        )}
      </form>
    </>
  );
};

export default AuthForm;
