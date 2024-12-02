"use client";

import Loader from "@/components/Loader";
import BreadcrumbComponent from "@/components/main/BreadcrumbConponent";
import Section4 from "@/components/main/sections/section4";
import { url_maker } from "@/lib/utils";
import { TOP_NEWS } from "@/static/data";
import axiosServer from "@/utils/axiosServer";
import { formatDate } from "@/utils/date";
import { getImageUrl } from "@/utils/getImageUrl";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoShareSocial } from "react-icons/io5";

type dataInstance = {
  title: string;
  content: string;
  author: {
    name: string;
  };
  publishedAt: string;
  url: string;
  thumbnail: string;
  slug: string;
};

const Details = () => {
  const { slug } = useParams();
  const router = useRouter();

  const fetchData = async (slug: string) => {
    const { data } = await axiosServer.get("/article/by/" + slug);
    return data.article;
  };

  const { isPending, data } = useQuery({
    queryKey: [slug],
    queryFn: () => fetchData(slug as string),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const fetchPopular = async () => {
    const { data } = await axiosServer.get(
      "/article/all?category=popular&limit=5"
    );
    return data.articles;
  };

  const { isPending: loading, data: populars } = useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchPopular(),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const fetchHighlight = async () => {
    const { data } = await axiosServer.get(
      "/article/all?category=highlights&limit=4"
    );
    return data.articles;
  };

  const { data: highlights } = useQuery({
    queryKey: ["highlights"],
    queryFn: () => fetchHighlight(),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (!isPending && !data) {
    return router.push("/");
  }

  return (
    <div className="min-h-screen">
      {isPending ? (
        <div className="container flex justify-center pt-10">
          <Loader />
        </div>
      ) : (
        <div className="container py-2 px-4 md:px-6 mt-3">
          <BreadcrumbComponent
            links={[
              { label: "Home", href: "/" },
              {
                label: data?.title,
              },
            ]}
          />

          <div className="grid grid-cols-3 gap-7  md:mt-20 mt-10">
            <div className="md:col-span-2 col-span-3">
              <div className="max-w-[842px]">
                <h1 className="md:text-2xl text-[21px] leading-tight md:leading-normal lora-bold">
                  {data?.title}
                </h1>
                <p className="mt-2.5 text-[#9B9B9B] md:text-sm text-xs roboto-regular">
                  Published on {formatDate(data?.publishedAt)}
                </p>
                <p className="text-[#9B9B9B] md:text-sm text-xs roboto-regular">
                  By{" "}
                  {data?.author?.name ? (
                    <Link
                      href={`/author/${data.author.username}`}
                      className="underline"
                    >
                      {data.author.name}
                    </Link>
                  ) : (
                    <span className="underline">Unknown Author</span>
                  )}
                </p>

                <div className="flex mt-2 items-center md:gap-10 gap-2">
                  <div className="flex flex-col items-center">
                    <IoShareSocial className="md:w-[23.45px] w-5  md:h-[34.49px] h-5" />

                    <p className="md:text-xs text-[10px] text-[#3D5A80]">
                      Share
                    </p>
                  </div>

                  <div>
                    <Image
                      width={30}
                      height={30}
                      src="/images/logos_telegram.svg"
                      alt="logos_telegram"
                      className="md:w-[30px] md:h-[30px] w-6 h-6"
                    />
                  </div>
                  <div>
                    <Image
                      width={34}
                      height={34}
                      src="/images/logos_whatsapp-icon.svg"
                      alt="logos_whatsapp-icon"
                      className="md:w-[34px] md:h-[34px] w-7 h-7"
                    />
                  </div>
                  <div>
                    <Image
                      width={30}
                      height={30}
                      src="/images/ant-design_message-filled.svg"
                      alt="ant-design_message-filled"
                      className="md:w-[30px] md:h-[30px] w-6 h-6"
                    />
                  </div>
                  <div>
                    <Image
                      width={30}
                      height={30}
                      src="/images/logos_facebook.svg"
                      alt="logos_facebook"
                      className="md:w-[30px] md:h-[30px] w-6 h-6"
                    />
                  </div>
                </div>

                <div className="md:mt-6 mt-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                    className="mt-5 md:mt-10 text-sm md:text-base content-custom lora-regular"
                  ></div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  {data?.tags?.map((item: string, i: number) => (
                    <Link
                      className="border  text-[#909090] text-xs px-3 py-2"
                      href={`/tag/${item
                        ?.toLocaleLowerCase()
                        ?.split(" ")
                        .join("-")}`}
                      key={i}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {populars?.length ? (
              <div className="md:col-span-1 col-span-3">
                <div className="flex justify-center md:mt-28 mt-8">
                  <div className="bg-[#002366] py-2 px-4 text-white md:text-lg text-base roboto-regular">
                    <p>MOST POPULAR</p>
                  </div>
                </div>

                <div className="flex flex-col md:gap-7 gap-2 md:mt-10 mt-7">
                  {populars?.map((item: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="">
                        <div className="md:w-[150px] w-[120px]">
                          <Link href={"/details/" + item?.slug}>
                            <Image
                              className="md:w-[150px] w-[120px] md:h-[150px] h-[120px] object-cover"
                              src={getImageUrl(item?.thumbnail)}
                              width={150}
                              height={150}
                              alt="image"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <Link href={"/details/" + item?.slug}>
                          <h2 className="text-[#080F18] lora-bold md:text-lg text-sm leading-tight md:leading-normal pb-2.5">
                            {item?.title.length > 50
                              ? item?.title.slice(0, 50).trim() + "..."
                              : item.title}{" "}
                          </h2>
                        </Link>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.content?.slice(0, 67) + "...",
                          }}
                          className="text-[#646464] md:text-sm text-xs md:pb-2.5"
                        ></div>
                        <p className="text-xs text-[#BBBBBB] hidden md:block">
                          {formatDate(item?.publishedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {highlights?.length ? (
            <Section4 data={highlights} heading="HIGHLIGHTS" />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Details;
