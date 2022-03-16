import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanityClient";

const postid = (props) => {
  return (
    <div>
      {/* // nav for  samller screns */}
      <nav className="fixed md:hidden fiexd top-0 w-full py-4 px-8 flex justify-between items-center shadow-md shadow-slate-600/10">
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
            <Link href="/">
              <img src="/icons/home.png" height={25} width={25} />
            </Link>
            <Link href="/">
              <img src="/icons/search.png" height={25} width={25} />
            </Link>
            <Link href="/">
              <img src="/icons/write.png" height={25} width={25} />
            </Link>
            <Link href="/">
              <img src="/icons/save.svg" height={25} width={25} />
            </Link>
          </div>
        
        {/* section for post content */}
        <div className="w-full mx-auto  py-20 md:py-4 px-10 md:w-8/12 xl:w-9/12 h-full">
          Sanket Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Accusamus, fuga eum placeat in quisquam similique earum alias non
          sapiente doloribus cum aliquam quidem ratione incidunt ab. Hic quod
          quasi nostrum, nisi ducimus praesentium tempore cum assumenda dolores
          quis! Sed laborum quod nihil aperiam assumenda a totam ipsa
          consequatur provident nostrum ab eaque, nam ipsam mollitia? Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Quae quia quis
          porro beatae! Deleniti quisquam repellendus recusandae consectetur
          inventore amet magnam velit eos officiis laboriosam dolorum quo
          molestias adipisci, temporibus ad praesentium maiores veritatis. Et
          pariatur impedit id culpa nulla temporibus ipsa blanditiis architecto.
        </div>
        {/*current post  author section  */}

        <div className="hidden md:block w-3/12  border-l border-gray-400"></div>
      </section>
      <div className="fixed bottom-0  md:hidden w-full py-4 shadow-[0_0_15px_rgba(0,0,0,.2)] ">
        <div className="flex w-10/12  mx-auto px-8 max-w-4xl justify-between">
          <Link href="/">
            <Image src="/icons/home.png" height={25} width={25} />
          </Link>
          <Image src="/icons/search.png" height={25} width={25} />
          <Image src="/icons/write.png" height={25} width={25} />
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
    fallback: false,
  };
};

export const getStaticProps = async (req, res) => {
  const { postid } = req.params;
  return {
    props: {
      postid,
    },
  };
};
