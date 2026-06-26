import { JSX } from "react/jsx-runtime";

import { createClient } from "@/libs/supabase/server";
import ExpensesList from "@/components/expenses/ExpensesList";

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

  if (error) {
    console.error(error.message);
  }

  if (!data) return;

  return (
    <main className="w-[90%] mx-auto">
      <ExpensesList initialExpenses={data ?? []} />
    </main>
  );
}
