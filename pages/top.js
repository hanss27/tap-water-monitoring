import clientPromise from "../lib/mongodb";

export default function Top({ water_datas }) {
  return (
    <div>
      <h1>Top 1000 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
            {water_datas.map((water_data) => (
                    <li>
                        <p>Tes</p>
                        <h2>{water_data.time}</h2>
                        <h3>{water_data.PH}</h3>
                        <p>{water_data.Turbudity}</p>
                        <p>{water_data.TDS}</p>
                        <p>{water_data.Temp}</p>


                    </li>
            ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
    try {
        const client = await clientPromise;
        const db = client.db("watermonitoring");

       const water_datas = await db
           .collection("waterdatabase")
           .find({})
           .sort({ time: 1 })
           .limit(10)
           .toArray();
        return {
            props: { water_datas: JSON.parse(JSON.stringify(water_datas)) },
        };
    } catch (e) {
        console.error(e);
    }
}