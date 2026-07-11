"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { createTeam } from "@/actions/create-team";

const CreateTeamForm = () => {
  const router = useRouter();
  const [error, submitAction, isPending] = React.useActionState(
    async (prevState, formData: FormData) => {
      const teamName = formData.get("name");

      if (!teamName || typeof teamName !== "string") {
        return new Error("Please enter a team name");
      }

      const { success, error, data } = await createTeam(teamName);

      if (error) {
        console.error(error);
        return new Error(error);
      }

      if (success) {
        console.log(data);
        router.push(`/teams/${data.id}`);
        return null;
      }
    },
    null
  );

  return (
    <>
      <form
        action={submitAction}
        className="flex flex-col gap-4 w-[50%] mx-auto mt-10"
      >
        <input
          type="text"
          className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
          placeholder="Your team name"
          name="name"
          id="name"
        />
        <button
          type="submit"
          className="py-4 rounded-full bg-amber-400 w-full mt-3 text-white"
        >
          {isPending ? "creating" : "create"}
        </button>
      </form>
      {error && (
        <div role="alert" className="mt-4 text-sm text-red-500 font-medium">
          {error.message}
        </div>
      )}
    </>
  );
};

export default CreateTeamForm;
