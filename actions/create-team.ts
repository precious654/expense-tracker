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

    const { data: team, error: teamError } = await supabase
      .from("teams")
      .insert({
        name: name,
        created_by: user.id,
      })
      .select()
      .single();

    if (teamError) {
      return { success: false, error: teamError.message };
    }

    const { error: memberError } = await supabase.from("team_member").insert({
      user_id: user.id,
      team_id: team.id,
      role: "owner",
    });

    if (memberError) {
      return { success: false, error: memberError.message };
    }

    return { success: true, data: team };
  } catch (error) {
    console.error("Error creating team:", error);
    return {
      success: false,
      error: "An unexpected error occurred while creating the team.",
    };
  }
}
