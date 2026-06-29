"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const { session, signOutUser } = useAuth();
  const [error, setError] = React.useState(null);

  const signOut = async () => {
    const { success, error } = await signOutUser();

    if (!success) {
      setError(error);
    }

    router.push("/auth");
  };

  return (
    <nav className="w-[90%] mx-auto flex justify-between items-center py-4">
      <Link href="/">Tracker</Link>

      <div className="flex gap-4 items-center">
        <input type="text" className="" />
        {session ? (
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm self-end">Welcome</p>
              <p className="text-sm font-medium">{session.user.email}</p>
            </div>
            <Link href="/expenses/new" className="font-medium text-sm">
              New request
            </Link>
            <button className="font-medium text-sm" onClick={signOut}>
              Sign out
            </button>
          </div>
        ) : (
          <Link href="/auth" className="font-medium text-sm">
            Sign in
          </Link>
        )}
      </div>

      {error && (
        <div role="alert" className="mt-4 text-sm text-red-500 font-medium">
          {error}
        </div>
      )}
    </nav>
  );
};

export default Header;
