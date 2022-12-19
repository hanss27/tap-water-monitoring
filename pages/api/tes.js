import clientPromise from "../../lib/mongodb";
"2022/12/25/11:30"
export default async (req, res) => {
   try {
       const client = await clientPromise;
      
       const db = client.db("watermonitoring");
       switch (req.method){
        case "POST":
            var x = new Date();
            var x1=x.toUTCString();// changing the display to UTC string
          
            x = convertUTCDateToLocalDate(x);
            var month = x.getMonth() + 1;
            var x1=x.getFullYear() + "/" + month + "/" + x.getDate() + "/" + x.getHours() + ":" + x.getMinutes(); 
            req.body.time = x1;
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


function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}