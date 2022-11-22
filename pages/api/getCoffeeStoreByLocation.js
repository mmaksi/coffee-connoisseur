import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoreByLocation = async (req, res) => {
  try {
    const { coords, query, limit } = req.query;
    const response = await fetchCoffeeStores(coords, query, limit);
    res.status(200);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", err });
  }
};

export default getCoffeeStoreByLocation;
