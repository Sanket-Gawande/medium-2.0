import React from "react";
import { Router, useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "../../sanityClient";
import PortableText from "react-portable-text";
import { Formatted } from "../../utils/formatDate";
import { BsSave, bshome } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineFileText,
} from "react-icons/ai";
import { FiBell, FiEdit } from "react-icons/fi";
const postid = ({ post }) => {
  return (
    <div>
      {/* // nav for  samller screns */}
      <nav className="fixed md:hidden z-10 fiexd top-0 w-full py-4 px-8 flex justify-between items-center bg-white shadow-md shadow-slate-600/10">
        <Link href="/" className="cursor-pointer">
          <Image
            width={60}
            height={40}
            objectFit="cover"
            src="/favicon.ico"
            className="cursor-pointer"
          />
        </Link>
        <ul className="flex items-center space-x-4 font-normal text-sm font-serif">
          <li className="text-lime-500">Sign in </li>
          <li className="text-white bg-black rounded-full py-2 px-4">
            Get started
          </li>
        </ul>
      </nav>
      {/* tab navigations for small screns */}

      {/* post grid from  medium screen */}
      <section className="flex h-screen justify-between ">
        {/* div for side menu */}

        <div className="hidden flex-col h-full items-center md:w-2/12 xl:w-1/12   relative  mx-auto px-4  border-r border-gray-400 py-8  md:flex justify-between">
          <Link passHref href="/">
            <img
              src="/favicon.ico"
              alt="logo"
              className="w-full py-4 px-6  cursor-pointer"
            />
          </Link>
          <div className="icons space-y-8 ">
            <AiOutlineHome className="w-6 h-6" />
            <FiBell className="w-6 h-6" />
            <AiOutlineFileText className="w-6 h-6" />
            <BsSave className="w-6 h-6" />
            <hr />
            <FiEdit className="w-6 h-6" />
          </div>
          {/* user-in logo div */}
          <AiOutlineUser className="w-6 h-6" />
        </div>

        {/* section for post content */}
        <div className="w-full overflow-y-auto   mx-auto lg:px-40 py-20 md:py-4 px-10 md:w-8/12 xl:w-9/12 h-full">
          {/* user info  */}
          <div className="flex pt-8 font-serif">
            {/* user profile photo */}
            <div className="w-11 h-11">
              <Image
                src={urlFor(post.author.profile).url()}
                alt="profile"
                className="rounded-full aspect-square"
                width="100%"
                height="100%"
              />
            </div>
            <div>
              <span className="text-sm mx-4 pt-2">{post.author.name}</span>{" "}
              <button className="bg-lime-600 py-1 px-2 rounded-full text-white text-[12px]">
                Follow+
              </button>
              <br />
              <span className="text-[12px] text-gray-500 ml-4 mr-2">
                {Formatted(post._createdAt)}
              </span>
              <span className="text-[12px] font-extralight text-gray-500 ">
                6 min read
              </span>
            </div>
          </div>
          {Router.isFallback && <h1>Loading..</h1>}
          <h1 className="text-2xl font-bold my-4">{post.heading}</h1>
          <p className="text-gray-800 font-serif"> by {post.author.name}</p>
          <h4 className="my-4"> {post.desc}</h4>
          <div>
            <Image
              src={urlFor(post.poster).url()}
              alt="poster"
              width="800"
              height="400"
              className="w-full my-8 mx-auto block aspect-video"
            />
          </div>
          {post.content && (
            <PortableText
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              content={post.content}
              serializers={{
                normal: (props) => (
                  <normal className=" break-words text-slate-700 font-serif text-lg" {...props} />
                ),
                h2: (props) => <h2 className="text-md " {...props} />,
                h4: (props) => (
                  <h4 className="text-xl text-slate-900 my-4" {...props} />
                ),
                h6: (props) => (
                  <h6 className=" text-slate-700 font-serif text-lg  my-4" {...props} />
                ),

                underline: (props) => (
                  <underline className="underline text-sm block  " {...props} />
                ),
                li: (props) => (
                  <li className="list-decimal text-sm my-4" {...props} />
                ),
                blockquote : props => <blockquote className="border-l-4 border-orange-400  pl-4 my-4 text-gray-500" {...props} />,
              code : props => <code className="p-2 bg-slate-100 font-mono block my-4"  {...props} />
              }}
            />
          )}
        </div>
        {/*current post  author section  */}

        <div className="hidden md:block w-3/12  border-l border-gray-400">
          <div className="my-2 py-4 w-full flex justify-center">
            <button className=" border text-black  border-black text-sm  block mx-4  rounded-full py-1 px-4">
              Get started
            </button>
            <button className="bg-lime-600 border  border-transparent text-white text-sm  block  rounded-full py-1 px-4">
              Sign in
            </button>
          </div>
          <hr />
          <div className="flex mt-8  font-serif  items-center mx-auto md:px-2 lg:px-8">
            <div className="w-14 h-14">
              <Image
                src={urlFor(post?.author.profile).url()}
                alt="profile"
                width="100%"
                height="100%"
                className="rounded-full"
              />
            </div>
            <div className="flex  items-center justify-center">
              <span className="text-sm mx-4 pt-2">{post.author.name}</span>{" "}
              <button className="bg-lime-600 py-1 px-2 rounded-full h-8 text-white text-[12px]">
                Follow+
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*  footer on small screens */}
      <div className="fixed bottom-0  bg-white md:hidden w-full py-4 shadow-[0_0_15px_rgba(0,0,0,.2)] ">
        <div className="flex w-10/12  mx-auto px-8 max-w-4xl justify-between">
          <Link passHref href="/">
            <Image
              src="/icons/home.png"
              height={25}
              width={25}
              alt="link icons"
            />
          </Link>
          <Image
            src="/icons/search.png"
            height={25}
            width={25}
            alt="link icons"
          />
          <Image
            src="/icons/write.png"
            height={25}
            width={25}
            alt="link icons"
          />
        </div>
      </div>
    </div>
  );
};

export default postid;

// export const getStaticPaths = async () => {
//   const query = `*[ _type == "post" ]{slug}`;
//   const data = await client.fetch(query);
//   const paths = data.map((obj) => {
//     return {
//       params: {
//         postid: obj.slug.current,
//       },
//     };
//   });
//   return {
//     paths :[],
//     fallback: true,
//   };
// };

export const getServerSideProps = async (req, res) => {
  const { postid } = req.params;
  const query = `*[ _type == "post" && slug.current =="${postid}"]{
    heading , desc , content , author -> {_id , name , profile}, _createdAt,poster
  }`;
  const post = await client.fetch(query);
  return {
    props: {
      post: post[0],
    },
  };
};
