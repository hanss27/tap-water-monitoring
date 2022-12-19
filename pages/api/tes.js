import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("watermonitoring");
       switch (req.method){
        case "POST":
            let bodyObject = JSON.parse(JSON.stringify(req.body));
            console.log(bodyObject);
            let myPost = await db.collection("waterdatabase").insertOne(bodyObject);
            res.json(myPost.ops[0]);
            break;                      
        case "GET":
            const water_data = await db
                .collection("waterdatabase")
                .find({})
                .sort({ time: 1 })
                .limit(10)
                .toArray();
                res.json(water_data);
            break;    
       }
       
   } catch (e) {
       console.error(e);
   }
};