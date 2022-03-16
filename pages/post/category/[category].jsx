import { useRouter } from "next/router";
import React from "react";

const category = () => {
  const category = useRouter().query.category;
  console.log({category})
  return <div>post from category : {category}</div>;
};

export default category;
