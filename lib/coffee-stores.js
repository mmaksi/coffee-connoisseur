export const fetchCoffeeStores = async (query, latLong) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const resultsArray = data.results;

    const imagesData = await fetchCoffeeStoresImages("coffee stores");

    for (let i = 0; i < resultsArray.length; i++) {
      const store = resultsArray[i];
      store.imgUrl = imagesData.urls[i];
      store.description = imagesData.description
    }

    return resultsArray;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCoffeeStoresImages = async (
  query,
  orientation = "landscape",
  per_page = 50
) => {
  const url = `https://api.unsplash.com/search/photos/?client_id=n_5JjTaBBrTZTNtOxrcjv4zwUf7cVGbvIfTj0wr0MCo&query=${query}&orientation=${orientation}&per_page=${per_page}`;
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const secretKey = process.env.UNSPLASH_SECRET_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const resultsArray = data.results;
    const urls = resultsArray.map(
      (storeImage) => storeImage.urls.small
    );
    const description = resultsArray.map(
      (storeImage) => storeImage.description
    );
    return { urls, description }
  } catch (error) {
    console.log(error);
  }
};
