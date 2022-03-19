import React, { useState } from "react";
import { Router, useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "../../sanityClient";
import PortableText from "react-portable-text";
import { Formatted } from "../../utils/formatDate";
import { BsSave } from "react-icons/bs";
import { useForm } from "react-hook-form";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineFileText,
} from "react-icons/ai";
import { FiBell, FiEdit } from "react-icons/fi";
const Postid = ({ post, comments }) => {
  const [showForm, setShowForm] = useState(true);
  const { postid } = useRouter().query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const submitForm = async (data) => {
    data.slug = postid;
    const { name, email, comment, slug } = data;
    const response = await client.create({
      _type: "comments",
      name,
      email,
      post_id: slug,
      comment,
    });

    setShowForm(false);
  };

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
                  <normal
                    className=" break-words text-slate-700 font-serif text-lg"
                    {...props}
                  />
                ),
                h2: (props) => <h2 className="text-md " {...props} />,
                h4: (props) => (
                  <h4 className="text-xl text-slate-900 my-4" {...props} />
                ),
                h6: (props) => (
                  <h6
                    className=" text-slate-700 font-serif text-lg  my-4"
                    {...props}
                  />
                ),

                underline: (props) => (
                  <underline className="underline text-sm block  " {...props} />
                ),
                li: (props) => (
                  <li className="list-decimal text-sm my-4" {...props} />
                ),
                blockquote: (props) => (
                  <blockquote
                    className="border-l-4 border-orange-400  pl-4 my-4 text-gray-500"
                    {...props}
                  />
                ),
                code: (props) => (
                  <code
                    className="p-2 bg-slate-100 font-mono block my-4"
                    {...props}
                  />
                ),
              }}
            />
          )}
          {/* comments section  */}

          <div className="my-24 border-t-2 border-lime-600">
            <p className="text-lime-600 mt-8">Enjoyed post ,</p>
            <h4 className="text-gray-800 text-xl w-full mb-8">
              Comment down below
            </h4>
            
            {showForm && (
              <form onSubmit={handleSubmit(submitForm)} className="w-full">
                {/* input field */}
                <div className="w-full max-w-xl ">
                  <label htmlFor="name" className="text-gray-600 font-sm">
                    {" "}
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block  w-full outline-none  focus:ring-1 ring-lime-600 border border-gray-400  px-4 mb-2  py-1 mt-2 rounded-md "
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <span className="text-sm mb-6 block text-rose-600">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                {/* input field */}
                <div className="w-full max-w-xl ">
                  <label htmlFor="email" className="text-gray-600 font-sm">
                    {" "}
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block  w-full outline-none  focus:ring-1 ring-lime-600 border border-gray-400  px-4 mb-6  py-1 mt-2 rounded-md "
                    {...register("email", {
                      required: "Empty comments are not allowed.",
                    })}
                  />
                  {errors.email && (
                    <span className="text-sm mb-6 block text-rose-600">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                {/* input field */}
                <div className="w-full max-w-xl ">
                  <label htmlFor="comment" className="text-gray-600 font-sm">
                    {" "}
                    Comment*
                  </label>
                  <textarea
                    type="text"
                    name="name"
                    id="comment"
                    className="block  w-full outline-none  focus:ring-1 ring-lime-600 border border-gray-400  px-4 mb-6  py-1 mt-2 rounded-md "
                    {...register("comment", { required: "Please enter email" })}
                  />
                  {errors.comment && (
                    <span className="text-sm mb-6 block text-rose-600">
                      {errors.comment.message}
                    </span>
                  )}
                </div>
                <input
                  type="submit"
                  className="bg-lime-600 hover:bg-lime-700 text-white rounded-md py-2 px-8"
                  value="Comment"
                />
               
              </form>
            )}
            {!showForm && (
              <div className="my-8 p-6 w-full bg-lime-600 text-white ">
                <h2 className="text-md font-semibold">
                  {" "}
                  Hello there , your Comment has been stored ,& well be shown
                  below very soon .
                </h2>
              </div>
            )}
            <div className="my-8 w-full">
              {comments?.map((obj) => {
                return (
                  <div key={obj._id} className="border-l-lime-600 border-l-4  relative rounded border-gray-400  border my-4 px-4 py-2">
                    <h4 className="py-2 font-bold"> {obj.name}</h4>
                    <p className="text-slate-600">{obj.comment}</p>
                    <span className="block text-right text-sm5 text-slate-500">{Formatted(obj._createdAt)}</span>
                  </div>
                );
              })}
            </div>
          </div>
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

export default Postid;


export const getServerSideProps = async (req, res) => {
  const { postid } = req.params;
  const query = `*[ _type == "post" && slug.current =="${postid}"]{
    heading , desc , content , author -> {_id , name , profile}, _createdAt,poster
  }`;
  const post = await client.fetch(query);

  const commentQuery = `*[ _type == "comments" && post_id == "${postid}"]{name , _id , _createdAt , comment , email}`;
  const comments = await client.fetch(commentQuery);

  
  return {
    props: {
      post: post[0],
      comments,
    },
  };
};

