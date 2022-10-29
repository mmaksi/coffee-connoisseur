import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const { storeId } = params;
  return {
    // passed as props to this page FC
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id === Number(storeId)
      ),
    },
  };
}

export async function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        storeId: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();
  const { isFallback } = router; // Checks if route exists in getStaticPaths
  const { storeId } = router.query;

  if (isFallback) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <div>CoffeeStore {storeId}</div>
      <Link href="/">
        <a>Go Home</a>
      </Link>
      <p>{coffeeStore.address}</p> <br />
      <p>{coffeeStore.name}</p> <br />
      <p>{coffeeStore.neighbourhood}</p>
    </div>
  );
};

export default CoffeeStore;
