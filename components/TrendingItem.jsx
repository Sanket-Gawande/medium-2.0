import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../sanityClient";
import { Formatted } from "../utils/formatDate";

const TrendingItem = ({ post, index }) => {
  return (
    <Link
      href={`/post/${post.slug.current}`}
      >
      <div className="flex my-4 cursor-pointer">
        <h1 className="w-8 px-2 py-1  font-extrabold text-gray-400 text-2xl">
          {`0${index + 1}`}
        </h1>
        <div className="px-3 flex flex-col justify-start">
          <div className="flex p-2 space-x-4 items-center">
            <img
              src={urlFor(post.poster)}
              className="rounded-full"
              width={25}
              height={25}
            />
            <p className=" text-sm">{post.author.name}</p>
          </div>
          <h4 className="font-extrabold my-2">{post.heading}</h4>
          <div className="text-gray-900 font-serif  font-extralight text-[12px] space-x-1">
            <span>{Formatted(post._createdAt)}</span> <span>6 min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingItem;
