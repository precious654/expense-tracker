"use server";

import { createClient } from "@/libs/supabase/server";

export async function addToTeam(teamId: string, memberId: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "You must be signed in." };
    }

    const { data: rows, error: teamError } = await supabase
      .from("team_member")
      .select("user_id, role")
      .eq("team_id", teamId)
      .in("user_id", [user.id, memberId]);

    if (teamError) {
      return { success: false, error: teamError.message };
    }

    // Sort the returned rows into the two we care about.
    const caller = rows.find((r) => r.user_id === user.id);
    const target = rows.find((r) => r.user_id === memberId);

    // The caller must exist on the team and be the owner.
    if (!caller) {
      return { success: false, error: "You are not a member of this team." };
    }
    if (caller.role !== "owner") {
      return {
        success: false,
        error: "You must be the owner of a team to add members to a team.",
      };
    }

    // The target must not already be a member.
    if (target) {
      return { success: false, error: "User is already a member of the team." };
    }

    const { error: memberError } = await supabase.from("team_member").insert({
      user_id: memberId,
      team_id: teamId,
      role: "member",
    });

    if (memberError) {
      return { success: false, error: memberError.message };
    }

    return {
      success: true,
      message: "User added to team successfully.",
    };
  } catch (error) {
    console.error("Error adding to team:", error);
    return {
      success: false,
      error: "An unexpected error occurred while adding to the team.",
    };
  }
}
