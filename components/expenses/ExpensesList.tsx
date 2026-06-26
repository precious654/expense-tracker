"use client";

import React from "react";

import { createClient } from "@/libs/supabase/client";
import ExpensesCard from "./ExpensesCard";

interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: string;
}

const ExpensesList = ({ initialExpenses }: { initialExpenses: Expense[] }) => {
  const supabase = React.useMemo(() => createClient(), []);
  const [expenses, setExpenses] = React.useState<Expense[]>(initialExpenses);

  React.useEffect(() => {
    const channel = supabase
      .channel("expense-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "expenses",
        },
        (payload) => {
          setExpenses((prevState) => {
            if (payload.eventType === "INSERT")
              return [...prevState, payload.new as Expense];
            if (payload.eventType === "UPDATE")
              return prevState.map((e) =>
                e.id === (payload.new as Expense).id
                  ? (payload.new as Expense)
                  : e
              );
            if (payload.eventType === "DELETE")
              return prevState.filter(
                (e) => e.id !== (payload.old as Expense).id
              );
            return prevState;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
  return (
    <>
      {expenses.map((expense) => (
        <ExpensesCard
          key={expense.id}
          variant={expense.status}
          title={expense.title}
          description={expense.description}
          amount={expense.amount}
        />
      ))}
    </>
  );
};

export default ExpensesList;
