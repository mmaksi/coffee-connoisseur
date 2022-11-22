import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";

import Image from "next/image";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/coffeeStores.context";
import { isEmpty } from "../../utils/index.utils";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores(
    "33.893582981652145%2C35.47158364033414"
  );
  const foundStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.fsq_id === params.storeId
  );

  return {
    // passed as props to this page FC
    props: {
      coffeeStore: foundStoreById ? foundStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores(
    "33.893582981652145%2C35.47158364033414"
  );
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        storeId: coffeeStore.fsq_id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

function handleUpvoteClick() {}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const { isFallback } = router; // Checks if route exists in getStaticPaths
  const { storeId } = router.query;
  if (isFallback) return <div>Loading...</div>;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const foundStoreById = coffeeStores.find(
          (coffeeStore) => coffeeStore.fsq_id === storeId
        );
        setCoffeeStore(foundStoreById);
      }
    }
  });

  console.log(coffeeStore);

  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Go Home</a>
            </Link>
          </div>

          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{coffeeStore.name}</h1>
          </div>

          <div className={styles.storeImgWrapper}>
            <Image
              src={coffeeStore.imgUrl}
              width={600}
              height={360}
              className={styles.storeImg}
              alt={coffeeStore.name}
            />
          </div>
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width={24} height={24} />
            <p className={styles.text}>
              {coffeeStore.location?.formatted_address}
            </p>
          </div>

          {coffeeStore.location?.related_places?.children.length && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" width={24} height={24} />
              <p className={styles.text}>
                {coffeeStore.location?.related_places?.parent}
              </p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} />
            <p className={styles.text}>10</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteClick}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
