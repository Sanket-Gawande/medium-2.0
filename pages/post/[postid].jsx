import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "../../sanityClient";
import PortableText from "react-portable-text";
import { Formatted } from "../../utils/formatDate";

const postid = ({ post }) => {
  return (
    <div>
      {/* // nav for  samller screns */}
      <nav className="fixed md:hidden z-10 fiexd top-0 w-full py-4 px-8 flex justify-between items-center bg-white shadow-md shadow-slate-600/10">
        <Image width={60} height={40} objectFit="cover" src="/favicon.ico" />
        <ul className="flex items-center space-x-4 font-normal text-sm font-serif">
          <li className="text-lime-500">Sign in </li>
          <li className="text-white bg-black rounded-full py-2 px-4">
            Get started
          </li>
        </ul>
      </nav>
      {/* tab navigations for small screns */}

      {/* post grid from  medium screen */}
      <section className="flex h-screen">
        {/* div for side menu */}

        <div className="hidden flex-col h-full items-center md:w-2/12 xl:w-1/12   mx-auto px-4  space-y-8 border-r border-gray-400  md:flex justify-center">
          <Link passHref href="/">
            <Image alt="icon" src="/icons/home.png" height={25} width={25} />
          </Link>
          <Link passHref href="/">
            <Image alt="icon" src="/icons/search.png" height={25} width={25} />
          </Link>
          <Link passHref href="/">
            <Image alt="icon" src="/icons/write.png" height={25} width={25} />
          </Link>
          <Link passHref href="/">
            <Image alt="icon" src="/icons/save.svg" height={25} width={25} />
          </Link>
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
                  <normal className="text-sm break-words" {...props} />
                ),
                h2: (props) => <h2 className="text-md " {...props} />,
                h4: (props) => (
                  <h4 className="text-xl text-slate-900 my-4" {...props} />
                ),

                underline: (props) => (
                  <underline className="underline text-sm block  " {...props} />
                ),
                li: (props) => (
                  <li className="list-decimal text-sm my-4" {...props} />
                ),
                // link: (props) => (
                //   <link passHref className="text-sm text-sky-600" {...props} />
                // ),
              }}
            />
          )}
        </div>
        {/*current post  author section  */}

        <div className="hidden md:block w-3/12  border-l border-gray-400">
          <div className="my-2 py-4">
            <button className="bg-black text-white text-sm  block mx-auto  rounded-full py-1 px-4">
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
            <Image src="/icons/home.png" height={25} width={25}  alt="link icons"/>
          </Link>
          <Image src="/icons/search.png" height={25}  width={25} alt="link icons"/>
          <Image src="/icons/write.png" height={25} width={25} alt="link icons"/>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(postid);

export const getStaticPaths = async () => {
  const query = `*[ _type == "post" ]{slug}`;
  const data = await client.fetch(query);
  const paths = data.map((obj) => {
    return {
      params: {
        postid: obj.slug.current,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (req, res) => {
  const { postid } = req.params;
  const query = `*[ _type == "post" && slug.current =="${postid}"]{
    heading , desc , content , author -> {_id , name , profile}, _createdAt,poster
  }`;
  const post = await client.fetch(query);
  return {
    props: {
      
      post: post[0] || {}
    },
  };
};
