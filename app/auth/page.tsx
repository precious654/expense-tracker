import React from "react";

import AuthForm from "@/components/auth/AuthForm";
import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

const page = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getSession();

  if(data.session) {
	redirect("/");
  }

  return (
    <main className="w-[90%] mx-auto">
      <AuthForm />
    </main>
  );
};

export default page;
