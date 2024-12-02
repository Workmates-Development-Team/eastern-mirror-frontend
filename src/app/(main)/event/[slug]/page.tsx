"use client";

import Loader from "@/components/Loader";
import { CardVertical } from "@/components/main/Event";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

interface eventsInterface {
  _id: string;
  title: string;
  status: string;
  articles: {
    title: string;
    _id: string;
    thumbnail: string;
    slug: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Event = () => {
  const { slug } = useParams();

  const getEvents = async (): Promise<eventsInterface> => {
    const { data } = await axiosInstance.get(`/event/${slug}`);
    return data;
  };

  const { data, isLoading, isError, error, refetch } =
    useQuery<eventsInterface>({
      queryKey: ["events", slug],
      queryFn: () => getEvents(),
      staleTime: 300000,
    });

  return (
    <div>
      <section className="">
        {isLoading ? (
          <div className="container flex justify-center min-h-[50vh] mt-10">
            <Loader />
          </div>
        ) : (
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8">
              <div className="">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                  {data?.title}
                </h2>

                <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-8">
                  {data?.articles?.map((item, i) => (
                    <CardVertical key={i} data={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Event;
