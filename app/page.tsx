import { JSX } from "react/jsx-runtime";

import { createClient } from "@/libs/supabase/server";
import ExpensesCard from "@/components/expenses/ExpensesCard";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expenses")
    .select(
      `
      id,
    title,
    description,
    amount,
    status
    `
    )
    .order("amount", { ascending: false })
    .limit(1);

  if (error) {
    console.error(error.message);
  }

  if (!data) return;

  return (
    <main className="w-[90%] mx-auto">
      {data.map((expense) => (
        <ExpensesCard
          key={expense.id}
          variant={expense.status}
          title={expense.title}
          description={expense.description}
          amount={expense.amount}
        />
      ))}
    </main>
  );
}
