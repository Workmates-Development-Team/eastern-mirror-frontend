"use client";

import SubPage from "@/components/main/SubPage";
import { convertString } from "@/lib/utils";
import axiosServer from "@/utils/axiosServer";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SubMenu = () => {
  const { menu, subMenu } = useParams();
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");

  const [page, setPage] = useState(Number(currentPage) || 1);

  useEffect(() => {
    if (currentPage) {
      setPage(Number(currentPage));
    }
  }, [currentPage]);

  const fetchCategoryArticles = async (category: string) => {
    const { data } = await axiosServer.get(`/article/all?category=${category}`);
    return data;
  };
  const fetchTagArticles = async (tag: string) => {
    const { data } = await axiosServer.get(`/article/all?tag=${tag}`);
    return data;
  };
  const fetchAuthorrticles = async (author: string) => {
    const { data } = await axiosServer.get(`/article/all?author=${author}`);
    return data;
  };

  const { isPending, data } = useQuery({
    queryKey: [subMenu, page],
    queryFn: () =>
      menu === "tag"
        ? fetchTagArticles(subMenu as string)
        : menu === "author"
        ? fetchAuthorrticles(subMenu as string)
        : fetchCategoryArticles(subMenu as string),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <SubPage
      loading={isPending}
      data={data?.articles}
      page={page}
      setPage={setPage}
      totalPage={data?.totalPages}
      links={[
        { label: convertString(menu as string), href: `/${menu}` },
        { label: convertString(subMenu as string) },
      ]}
      title={menu === "tag" ? "Tag" : convertString(subMenu as string)}
    />
  );
};

export default SubMenu;
