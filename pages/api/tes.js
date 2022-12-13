import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("watermonitoring");

       const water_data = await db
           .collection("waterdatabase")
           .find({})
           .sort({ time: 1 })
           .limit(10)
           .toArray();

       res.json(water_data);
   } catch (e) {
       console.error(e);
   }
};