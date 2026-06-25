"use client";

import React from "react";
import clsx from "clsx";

interface Expense {
  key: string;
  title: string;
  amount: number;
  description: string;
  variant: string;
}

const ExpensesCard = ({
  key,
  variant = "pending",
  title,
  amount,
  description,
}: Expense) => {
  return (
    <div
      key={key}
      className={clsx(
        "px-3 py-4 rounded-2xl flex justify-between items-start",
        variant === "pending" && "hover:bg-[#EFF6FF] hover:border hover:border-blue-500",
        variant === "approved" && "hover:bg-[#F0FDF4] hover:border hover:border-green-500",
        variant === "rejected" && "hover:bg-[#FEF2F2] hover:border hover:border-red-500"
      )}
    >
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-3xl">{title}</p>
        <p className="text-sm">{description}</p>
      </div>

      <p className={clsx("font-bold",
		variant === "pending" && "text-[#1E3A8A]",
        variant === "approved" && "text-[#14532D]",
        variant === "rejected" && "text-[#7F1D1D]"
	  )}>#{amount}</p>
    </div>
  );
};

export default ExpensesCard;
