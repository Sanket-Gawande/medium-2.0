import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../sanityClient";
import { Formatted } from "../utils/formatDate";

const Post = ({ post }) => {
  function savePost(event, id) {
    // event.target.attribute.src =
    console.log(id);
    event.target.src = "/icons/saved.svg";
  }

  return (
    <div className="flex justify-between items-center  cursor-pointer">
      {/* content div  */}
      <div className=" px-3 flex mr-4 flex-col justify-start w-full">
        {/* name and profile */}
        <div className="flex p-2 space-x-4 items-center">
          <img
            src={urlFor(post.author.profile)} //"/jessica.jpeg"
            className="rounded-full"
            width={25}
            height={25}
          />

          <p className=" text-sm">{post.author.name}</p>
        </div>
        <Link href={`/post/${post.slug.current}`}>
          <h4 className="font-extrabold my-1">{post.heading}</h4>
        </Link>
        <Link href={`/post/${post.slug.current}`}>
          <p className="text-gray-400 my-2 ">{post.desc}</p>
        </Link>
        <div className="text-gray-900 font-serif  font-extralight  flex justify-between items-center text-[12px] space-x-2">
          <div className="w-full space-x-4">
            <span>{Formatted(post._createdAt)}</span>
            <span>6 min read</span>
            <span className="bg-gray-200 text-gray-500 py-1 ml-2  px-2 rounded-full">
              {post.category || "education"}
            </span>
          </div>
          <img
            src="/icons/save.svg"
            alt="save it"
            className="w-6 h-6"
            onClick={(e) => savePost(e, post._id)}
          />
        </div>
      </div>
      {/* poster div */}
      <div className="w-96 ">
        <img
          src={urlFor(post?.poster)}
          width="100%"
          height="100%"
          className="aspect-video"
        />
      </div>
    </div>
  );
};

export default Post;
