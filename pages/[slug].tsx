// @ts-ignore
import fetchMeta from "fetch-meta-tags";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { domain } from "../domain";

export async function getServerSideProps(context: any) {
  const userAgent = context.req.headers["user-agent"];
  if (!userAgent?.includes("facebook")) {
    return {
      redirect: {
        permanent: false,
        destination: domain + "/" + context.params.slug,
      },
    };
  }

  const data = await fetchMeta(domain + "/" + context.params.slug);
  return {
    props: data,
  };
}

export default function App({ url, title, description, icon, image }: any) {
  const router = useRouter();

  useEffect(() => {
    router.replace(url);
  }, []);

  return (
    <>
      <Head>       
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon} />
      </Head>
    </>
  );
}
