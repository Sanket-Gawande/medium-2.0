import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";


import { client, urlFor } from "../sanityClient";
import TrendingItem from "../components/TrendingItem";
import Post from "../components/Post";

export default function Home({ posts  ,categories }) {
      
  return (
    <div className="h-screen">
      <Head>
        <title>Medium 2.0 - where good ideas find you.</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="hero mt-16 px-8  md:px-16 pt-16 w-full bg-yellow-400 border-b-2 border-gray-900">
        <div className="  w-full h-96 relative first-letter max-w-6xl mx-auto ">
          <div className="absolute right-0 bottom-0 hidden md:block">
            <Image
              src="/hero.png"
              width={400}
              height={300}
              
            />
          </div>
          <h1 className="font-extrathin xl:text-8xl font-serif my-8 text-black text-7xl">
            Stay curious
          </h1>
          <p className="text-2xl max-w-md my-4  font-serif">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <li className="my-8 w-48 list-none text-center py-2 text-white bg-black rounded-full">
            <Link href="/"> Start reading</Link>
          </li>
        </div>
      </div>
      {/* <Image src={urlFor(response[0].poster)} layout="responsive" /> */}
      
      
      {/* trending post section here */}

      <div className=" py-8 md:py-16 px-8  mx-auto   max-w-6xl">
        <div className="flex items-center">
          <Image width={25} height={25} src="/trending.png" />
          <h4 className="text-grey-400 ml-2 uppercase text-sm">
            Trending on medium
          </h4>
        </div>

        <div className="w-full grid grid-cols-1 mt-4   gap-4 grid-rows-6 justify-center md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
          {posts.map((post , index) => {
            return <TrendingItem key={post._id} post={post}  index={index}/>;
          })}
        </div>
      </div>
      <hr />


      {/* categories and post section  */}

      
      <div className="md:py-8 flex md:justify-between flex-col md:flex-row md:px-4 w-full max-w-7xl mx-auto ">
    
     {/*  categories/tags section */}
      <div className="w-full  md:ml-8 md:w-4/12 xl:w-5/12 md:order-2 flex flex-wrap space-x-4 h-0  py-6 mb-8  px-2">
{categories?.map(cat => <Link key={cat} href={`post/category/${cat}`}><li className=" cursor-pointer list-none m-0  my-2  bg-white border rounded-md px-4 py-1 text-sm  border-gray-200">{cat}</li></Link>)}
      </div>
      <hr/>
      <div className="py-4  w-full  space-y-8 px-10 md:w-7/12 xl:6/12">
       {posts.map(post => {
         return <Post key={post._id} post={post}/>
       })}
      </div>
      
    </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const postsQuery = `*[ _type == "post"]{
    heading , 
    desc,
    slug,
    poster,
    author -> {
      name , profile
    },
    _createdAt,
    _id,
    category,
  }`;
  const posts = await client.fetch(postsQuery);
  return {
    props: {
     posts,
     categories : ["self" , "education" , "war" , "data-science" , "programming"]
    },
  };
};
