import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  apiVersion: "2022-02-22",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
});

export const urlFor = (src) => imageUrlBuilder(client).image(src);
