"use client";

import { authorState } from "@/atoms/authorAtom";
import { profileState } from "@/atoms/profileAtom";
import AddAuthors from "@/components/admin/AddAuthors";
import AuthorTable from "@/components/admin/table/AuthorTable";
import axiosInstance from "@/utils/axios";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Authors() {
  const setAuthors = useSetRecoilState(authorState);
  const profile = useRecoilValue(profileState);
  const [search, setSearch] = useState("");

  const getAuthors = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/author/all?search=${search}&sortBy=name&sortOrder=1`
      );
      setAuthors(data?.authors);
    } catch (error) {
    }
  };

  React.useEffect(() => {
    getAuthors();
  }, [search]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#f3f2f7ab]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            All Authors
          </h1>
          <p className="text-[#A3A3A3]">Manage and view all authors below.</p>
        </div>

        {profile?.userType === "admin" ? (
          <div>
            <AddAuthors getAuthors={getAuthors} setSearch={setSearch} />
          </div>
        ) : null}
      </div>

      <div className="bg-white shadow-sm rounded-xl flex-1 px-4">
        <AuthorTable
          setSearch={setSearch}
          search={search}
          getAuthors={getAuthors}
        />
      </div>
    </main>
  );
}
