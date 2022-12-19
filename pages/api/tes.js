import clientPromise from "../../lib/mongodb";
"2022/12/25/11:30"
export default async (req, res) => {
   try {
       const client = await clientPromise;
      
       const db = client.db("watermonitoring");
       switch (req.method){
        case "POST":
            var x = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
            console.log(x)
            let readDate = x.split(",")
            let readTime = readDate[1].split(":") 
            const timeZone = readTime[2];
            let hours;
            if (timeZone.includes('PM')){
                hours = parseInt(readTime[0])+12;
            }
            else{
                hours = parseInt(readTime[0]);
            }
            var curTime = readDate[0] + "/" + hours + ":" + readTime[1];
            req.body.time = curTime;
            let myPost = await db.collection("waterdatabase").insertOne(req.body);
            res.status(201).json(myPost);
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

