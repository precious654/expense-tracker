"use client";

import React from "react";

import { AddMemberModal } from "@/components/teams/AddMemberModal";

const AddToTeam = ({
  teamId,
}: {
  teamId: string;
}) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className="text-sm font-semibold underline"
        onClick={() => setShowModal(true) }
      >
        Add to Team
      </button>

	  { showModal && <AddMemberModal teamId={teamId} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AddToTeam;
