"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SLIDE_CONTENT } from "@/static/data";
import Image from "next/image";

export default function BreakingNews() {
  return (
    <div className="mt-1.5">
      <div className="bg-[#002366] text-[#FFFFFF] lora-regular container py-2 px-4 md:px-6 h-12 flex items-center gap-9">
        <div className="text-white bg-[#CE3333] px-2 py-1 rounded-br-xl rounded-sm">
          BREAKING NEWS
        </div>
        <div>
          <h3 className="underline">
            ENPO temporarily suspends public emergency in eastern Nagaland
          </h3>
        </div>

        <div></div>
      </div>

      <div>
        <div className="bg-[#efefef] container px-4 md:px-6">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="md:w-[92%] w-[80%] mx-auto"
          >
            <CarouselContent>
              {SLIDE_CONTENT.map((slide, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div>
                    <SlideCard data={slide} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

const SlideCard = ({
  data,
}: {
  data: {
    title: string;
    image: string;
  };
}) => (
  <div className="flex items-center md:gap-8 gap-2 py-4 md:pr-20">
    <div>
      <Image
        width={133}
        className="rounded-md"
        height={112}
        src={data.image}
        alt={data?.title}
      />
    </div>
    <h3 className="text-sm roboto-regular leading-7">{data?.title}</h3>
  </div>
);
