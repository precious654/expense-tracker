"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { createClient } from "@/libs/supabase/client";
import { addToTeam } from "@/actions/add-team";

interface AddMemberModalProps {
  teamId: string;
  onClose: () => void;
}

interface FoundUser {
  id: string;
  name: string;
}

export function AddMemberModal({
  teamId,
  onClose,
}: AddMemberModalProps) {
  const supabase = useState(() => createClient())[0];
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "searching" | "adding">("idle");
  const [error, setError] = useState<string | null>(null);
  const [found, setFound] = useState<FoundUser | null>(null);

  // Step 1: look the user up by username to get their id.
  const handleSearch = async () => {
    const name = query.trim();
    if (!name) return;

    setStatus("searching");
    setError(null);
    setFound(null);

    const { data, error: lookupError } = await supabase
      .from("user_profiles")
      .select("id, name")
      .ilike("name", name)
      .maybeSingle();

    setStatus("idle");

    if (lookupError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    if (!data) {
      setError("No user found with that username.");
      return;
    }
    setFound(data);
  };

  // Step 2: add the found user's id to the team.
  const handleAdd = async () => {
    if (!found) return;

    setStatus("adding");
    setError(null);

    const { success, error, message } = await addToTeam(teamId, found.id);
    if (error) {
      console.error(error);
    }

    if (success) {
      console.log(message);
    }

    setStatus("idle");

    if (error) {
      // Unique constraint violation = already a member.
      setError(error);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg text-[#111312]">Add a member</p>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-[#E8E6DC] flex items-center justify-center hover:opacity-75 transition-opacity"
            aria-label="Close"
          >
            <X className="size-4 text-foreground" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setFound(null); // clear previous result when they retype
              setError(null);
            }}
            placeholder="Enter a username"
            className="w-full rounded-2xl bg-[#F2F3F3] px-4 py-3 text-sm outline-0"
          />

          {found ? (
            <p className="text-sm text-[#227B6F]">
              Found: <span className="font-medium">{found.name}</span>
            </p>
          ) : (
            <button
              onClick={handleSearch}
              disabled={status === "searching" || query.trim().length === 0}
              className="text-sm text-[#227B6F] font-medium self-start disabled:opacity-50"
            >
              {status === "searching" ? "Searching…" : "Search"}
            </button>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <button
          onClick={handleAdd}
          disabled={!found || status === "adding"}
          className="w-full py-3 rounded-full bg-[#227B6F] text-white font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {status === "adding" ? "Adding…" : "Add to team"}
        </button>
      </div>
    </div>
  );
}
