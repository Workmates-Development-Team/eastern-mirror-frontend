"use client";

import SubPage from "@/components/main/SubPage";
import { convertString } from "@/lib/utils";
import {
  artsAndEntertainment,
  nagaland,
  opinion,
  scienceAndTech,
  sports,
} from "@/static/submenu";
import axiosServer from "@/utils/axiosServer";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Menu = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");

  const { menu } = useParams();
  const router = useRouter();
  const [page, setPage] = useState(Number(currentPage) || 1);

  const fetchCategoryArticles = async (category: string) => {
    const { data } = await axiosServer.get(
      `/article/all?category=${category}&limit=10&page=${page}`
    );
    return data;
  };

  useEffect(() => {
    if (currentPage) {
      setPage(Number(currentPage));
    }
  }, [currentPage]);

  const { isPending, data } = useQuery({
    queryKey: [menu, page],
    queryFn: () => fetchCategoryArticles(menu as string),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // if (!isPending && (!data?.articles?.length || !data)) {
  //   return router.push("/");
  // }

  return (
    <SubPage
      loading={isPending}
      data={data?.articles}
      page={page}
      setPage={setPage}
      totalPage={data?.totalPages}
      categories={
        menu === "nagaland"
          ? nagaland
          : menu === "opinion"
          ? opinion
          : undefined
      }
      links={[{ label: menu === "editorial"? 'Opinion': convertString(menu as string) }]}
      title={ menu === "editorial"? 'Opinion': convertString(menu as string)}
    />
  );
};

export default Menu;
