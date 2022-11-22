export const fetchCoffeeStores = async (
  coords,
  query = "coffee",
  limit = 12
) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${coords}&limit=${limit}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
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
      store.description = imagesData.description;
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

  try {
    const response = await fetch(url);
    const data = await response.json();
    const resultsArray = data.results;
    const urls = resultsArray.map((storeImage) => storeImage.urls.small);
    const description = resultsArray.map(
      (storeImage) => storeImage.description
    );
    return { urls, description };
  } catch (error) {
    console.log(error);
  }
};
