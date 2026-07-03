"use server";

import { createClient } from "@/libs/supabase/server";

export async function createTeam(name: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "You must be signed in to create a team.",
      };
    }

    const { data, error } = await supabase
      .from("teams")
      .insert({
        name: name,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("Error creating team:", error);
    return {
      success: false,
      error: "An unexpected error occurred while creating the team.",
    };
  }
}
