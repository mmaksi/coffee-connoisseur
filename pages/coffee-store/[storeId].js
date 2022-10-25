import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  const { storeId } = router.query;

  return (
    <div>
      <div>CoffeeStore {storeId}</div>
      <Link href="/">
        <a>Go Home</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
