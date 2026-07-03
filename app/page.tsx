import Link from "next/link";

import { createClient } from "@/libs/supabase/server";
import ExpensesList from "@/components/expenses/ExpensesList";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const [{ data, error }, { data: sessionData }] = [
    await supabase
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
      .order("amount", { ascending: false }),
    await supabase.auth.getSession(),
  ];

  if (!sessionData.session) {
    redirect("/auth");
  }

  if (error) {
    console.error(error.message);
  }

  if (!data) return;

  return (
    <main className="w-[90%] mx-auto">
      <ExpensesList initialExpenses={data ?? []} />
      
      <Link href="/teams/create" className="underline text-sm font-semibold">Create team</Link>
    </main>
  );
}
