import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [scrollY, setScroll] = useState(0);
  useEffect(() => {
    document.onscroll = () => {
      setScroll(window.scrollY);
    };
  });
  let bg = scrollY > 250 ? "bg-white" : "bg-yellow-400";
  let btnbg = scrollY > 250 ? "bg-green-700" : "bg-black";
  return (
    <>
      <nav
        className={`w-screen z-10 fixed top-0 left-0  py-2 border-b-2 ${bg} border-gray-900`}
      >
        <div className="navbar  flex justify-between w-11/12 mx-auto ">
          <Link href="/">
            <Image src="/logo.svg" width={200} height={60} />
          </Link>
          <ul className="text-sm  font-extralight  menu flex space-x-4 text-gray-900 items-center">
            <li className="hidden md:block">
              <Link href="/">Our story</Link>
            </li>
            <li className="hidden md:block">
              <Link href="/">Membership</Link>
            </li>
            <li className="hidden md:block">
              <Link href="/">Write</Link>
            </li>
            <li className="hidden md:block">
              <Link href="/">Sign in</Link>
            </li>
            <li
              className={`text-white rounded-full py-2 px-4 text-sm ${btnbg}`}
            >
              <Link href="/">Get started</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
