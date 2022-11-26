import { getMinifiedRecords, table } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, voting, imgUrl, neighbourhood } = req.body;
    // find a record
    if (id) {
      try {
        const coffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        // data transformation
        const records = getMinifiedRecords(coffeeStoreRecords);

        if (coffeeStoreRecords.length > 0) {
          return res.json(records);
        } else {
          // create record
          if (name) {
            const createdRecords = await table.create([
              {
                fields: { id, name, address, voting, imgUrl, neighbourhood },
              },
            ]);

            const records = getMinifiedRecords(createdRecords);

            return res.json({
              message: "created successfully",
              records: records,
            });
          } else {
            return res.json({
              message: "Record name is missing",
            });
          }
        }
      } catch (error) {
        return res.json({
          message: "Error finding or creating the record",
          error,
        });
      }
    } else {
      res.status(400).json({ message: "Record id is missing" });
    }
  }
};

export default createCoffeeStore;
