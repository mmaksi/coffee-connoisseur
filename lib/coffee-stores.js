export const fetchCoffeeStores = async (query, latLong) => {
  const url =
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}`;
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
    return resultsArray;
  } catch (error) {
    console.log(error);
  }
};
