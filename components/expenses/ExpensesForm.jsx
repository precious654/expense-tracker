"use client";

import React from "react";

import { createClient } from "@/libs/supabase/client";

const ExpensesForm = () => {
  const supabase = React.useMemo(() => createClient(), []);

  const [error, submitAction, isPending] = React.useActionState(
    async (prevState, formData) => {
      const newExpense = {
        title: formData.get("title"),
        description: formData.get("description"),
        amount: formData.get("amount"),
      };

      const { error } = await supabase.from("expenses").insert(newExpense);

	  if(error) {
		console.error("Error adding a new expense: ", error.message);
		return new Error("Failed to request an expense");
	  }

      return null;
    },
    null
  );
  return (
    <form
      action={submitAction}
      className="flex flex-col gap-4 w-[50%] mx-auto mt-10"
    >
      <div className="flex flex-col gap-1.75">
        <label htmlFor="title">Expense title</label>
        <input
          type="text"
          className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
          name="title"
          id="title"
          disabled={isPending}
          required
        />
      </div>

      <div className="flex flex-col gap-1.75">
        <label htmlFor="description">Expense description</label>
        <input
          type="text"
          className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
          name="description"
          id="description"
          disabled={isPending}
          required
        />
      </div>

      <div className="flex flex-col gap-1.75">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          className="rounded-2xl py-4 px-3 bg-gray-300 outline-0"
          name="amount"
          id="amount"
          disabled={isPending}
          required
        />
      </div>

      <button
        className="py-4 rounded-full bg-amber-400 w-full mt-3 text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {error && (
        <div role="alert" className="text-red-400 text-sm">
          {error.message}
        </div>
      )}
    </form>
  );
};

export default ExpensesForm;
