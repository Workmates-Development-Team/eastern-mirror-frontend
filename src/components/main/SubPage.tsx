"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";
import BreadcrumbComponent from "./BreadcrumbConponent";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Heading from "./Heading";
import { MOST_POPULAR } from "@/static/data";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { formatDate } from "@/utils/date";
import Loader from "../Loader";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import axiosServer from "@/utils/axiosServer";
import { useQuery } from "@tanstack/react-query";

const SubPage = ({
  categories,
  data,
  links,
  title,
  loading,
  totalPage,
  page,
  setPage,
}: {
  categories?: { name: string; href: string }[];
  data: any;
  links: {}[];
  title: string;
  loading: boolean;
  totalPage?: number;
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  // useEffect(() => {
  //   const queryPage = parseInt(router.query.page as string) || 1;
  //   setPage?.(queryPage);
  // }, [router.query.page, setPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`?page=${value}`);
    // router.push({
    //   pathname: router.pathname,
    //   query: {
    //     ...router.query,
    //     page: value,
    //   },
    // });
  };

  const fetchPopular = async () => {
    const { data } = await axiosServer.get(
      "/article/all?category=popular&limit=5"
    );
    return data.articles;
  };

  const { isPending, data: populars } = useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchPopular(),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <div className="min-h-screen">
      <div className="container py-2 px-4 md:px-6 mt-3">
        <BreadcrumbComponent links={[{ label: "Home", href: "/" }, ...links]} />
      </div>

      <Heading title={title} />

      {loading ? (
        <div className="container flex justify-center min-h-[50vh]">
          <Loader />
        </div>
      ) : (
        <div className="container py-2 px-4 md:px-6 grid md:grid-cols-3 grid-cols-1 gap-7 mt-3">
          <div className="md:col-span-2">
            {categories?.length ? (
              <div className="flex flex-wrap md:gap-3 gap-2">
                {categories.map((item, i: number) => (
                  <Link
                    key={i}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "md:h-10 h-9 text-xs md:text-sm px-3 md:px-4"
                    )}
                    href={item?.href}
                  >
                    {item?.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="md:mt-10 mt-8 flex flex-col md:gap-7 gap-4">
              {data?.length ? (
                data.map((item: any, i: string) => <Card key={i} data={item} />)
              ) : (
                <div className="flex justify-center">
                  <p>No data found</p>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-12">
              <Pagination
                color="primary"
                count={totalPage || 0}
                page={page || 1}
                onChange={handlePageChange}
              />
            </div>
          </div>

          {populars?.length ? (
            <div className="">
              <div className="flex justify-center">
                <div className="bg-[#002366]  md:text-lg text-base py-2 px-4 text-white roboto-regular">
                  <p>MOST POPULAR</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:mt-10 mt-7 ">
                {populars?.map((item: any, i: number) => (
                  <PopularCard
                    key={i}
                    isBorder={i !== populars?.length - 1}
                    data={item}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SubPage;

const PopularCard = ({
  data,
  isBorder,
}: {
  data: {
    thumbnail: string;
    title: string;
    slug?: string;
  };

  isBorder?: boolean;
}) => (
  <div
    className={cn(
      isBorder ? "md:border-b-2 border-b" : "",
      " border-[#DDDDDD] md:pb-4 pb-3 flex items-center md:gap-7 gap-4"
    )}
  >
    <div>
      <div className="w-[65px] h-[65px]">
        <Link href={"/details/" + data?.slug}>
          <img
            width={65}
            height={65}
            className="w-full h-full object-cover"
            src={getImageUrl(data.thumbnail)}
            alt="blog-image"
          />
        </Link>
      </div>
    </div>

    <div>
      <Link href={"/details/" + data?.slug}>
        <h2 className="text-[#646464] lora-regular md:text-lg text-sm">
          {data?.title}
        </h2>
      </Link>
    </div>
  </div>
);

const Card = ({ data }: { data: any }) => {
  function extractFirstText(html: string, charLimit: number): string {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    function collectText(node: Node, collectedText: string[]): void {
      if (collectedText.join("").length >= charLimit) {
        return;
      }

      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        collectedText.push(node.textContent.trim());
      }

      Array.from(node.childNodes).forEach((child) =>
        collectText(child, collectedText)
      );
    }

    const textPieces: string[] = [];
    collectText(tempDiv, textPieces);

    const fullText = textPieces.join(" ");
    return fullText.slice(0, charLimit).trim();
  }

  const firstText = extractFirstText(data?.content, 100);

  return (
    <div className="bg-[#F5F6F9] grid grid-cols-6 md:gap-7 gap-3">
      <div className="md:col-span-2 col-span-3 relative">
        <Link href={"/details/" + data?.slug} className="w-full h-[200px] ">
          <img
            width={300}
            height={200}
            className={`w-full h-full max-h-[200px] ${data.thumbnail ? 'object-cover': 'object-contain p-2'}`}
            src={getImageUrl(data?.thumbnail)}
            alt="blog-image"
          />
        </Link>
      </div>

      <div className="md:col-span-4 col-span-3 flex flex-col justify-center md:p-3 p-2 pl-0">
        <Link href={"/details/" + data?.slug}>
          <h2 className="text-[#080F18] lora-bold md:text-lg leading-tight md:leading-normal text-sm md:pb-2.5 pb-2">
            {data?.title}
          </h2>
        </Link>
        <div className="text-[#646464] md:text-sm text-xs pb-2.5 truncate md:whitespace-normal md:overflow-visible md:text-overflow-clip">
          {firstText}...
        </div>
        <p className="text-xs text-[#BBBBBB] hidden md:block">
          {formatDate(data?.publishedAt)}
        </p>
      </div>
    </div>
  );
};
