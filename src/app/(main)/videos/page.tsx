"use client";

import Loader from "@/components/Loader";
import BreadcrumbComponent from "@/components/main/BreadcrumbConponent";
import Heading from "@/components/main/Heading";
import axiosInstance from "@/utils/axios";
import { getImageUrl } from "@/utils/getImageUrl";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";

interface Video {
  _id: string;
  link: string;
  thumbnail: string;
}

interface FetchCategoryResponse {
  videos: Video[];
  totalPages: number;
  currentPage: number;
}

const Videos = () => {
  const [page, setPage] = useState<number>(1);

  const fetchVideos = async (params: {
    page?: number;
  }): Promise<FetchCategoryResponse> => {
    const { data } = await axiosInstance.get(
      `/video?page=${params?.page}&limit=10`
    );
    return data;
  };

  const {
    data = { videos: [], totalPages: 1, currentPage: 1 },
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["videos", { page }],
    queryFn: () => fetchVideos({ page }),
    staleTime: 300000,
  });

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen">
      <div className="min-h-screen">
        <div className="container py-2 px-4 md:px-6 mt-3">
          <BreadcrumbComponent
            links={[
              { label: "Home", href: "/" },
              {
                label: "Video",
              },
            ]}
          />
        </div>

        <Heading title="Videos" />

        {isLoading ? (
          <div className="container flex justify-center min-h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div className="container py-2 px-4 md:px-6 mt-3">
            <div className="">
              <div className="md:mt-10 mt-8 md:gap-7 gap-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                {data?.videos?.length ? (
                  data?.videos?.map((item, i) => (
                    <a
                      href={item.link}
                      target="_blank"
                      key={i}
                      className="relative"
                    >
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-25"></div>
                      <Image
                        className="w-full h-[201.61px] object-cover"
                        src={getImageUrl(item.thumbnail)}
                        width={330}
                        height={201.61}
                        alt="image"
                      />
                      <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                        <FaRegPlayCircle className="w-[51.35px] h-[51.35px] text-red-500" />
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="flex justify-center">
                    <p>No data found</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center mt-12">
                <Pagination
                  color="primary"
                  count={data?.totalPages || 0}
                  page={page || 1}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
