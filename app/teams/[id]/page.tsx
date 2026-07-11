import React from "react";

import { createClient } from "@/libs/supabase/server";
import AddToTeam from "@/components/teams/AddToTeam";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: team, error: teamError }, { data: teamMembers, error }] = [
    await supabase.from("teams").select().eq("id", id).single(),
    await supabase
      .from("team_member")
      .select(
        `
        user_id,
        role,
        user_profiles (name)
      `
      )
      .eq("team_id", id),
  ];

  if (teamError) {
    console.error(teamError.message);
  }

  if (error) {
    console.error(error.message);
  }

  return (
    <main className="w-[90%] mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">{team.name}</p>
        <AddToTeam teamId={team.id} />
      </div>

      <div className="mt-5">
        {teamMembers && teamMembers.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {teamMembers.map((member) => (
              <li
                key={member.user_id}
                className="flex justify-between items-center border rounded-lg p-3"
              >
                <p>{member.user_profiles.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members found.</p>
        )}
      </div>
    </main>
  );
};

export default page;
