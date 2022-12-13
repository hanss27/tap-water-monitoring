import clientPromise from "../lib/mongodb";

// import logo from "../resources/logo512.png";

export default function Top({ sensor }) {
  return (

    <div>
      <div className="Header"
        style={{
          padding: '0',
          backgroundColor:  'rgb(0, 0, 0)',
          textAlign: 'center',
          position:'fixed',
          top: 0,
          right: 0,
          left: 0,
          
          height : '15%',
          width: '100%',
        }}>
        <img src="/logo512.png" alt="Vercel Logo" style={{
          float:'right',
          height:'50px',
          width:'50px',
          backgroundSize: 'contain',
          backgroundPositionX:'right',
          margin: '0 0 0 0px',
          }} >
        </img>
        
        <h1 style={{
            
        }}>Welcome!</h1>

        <p>Kel 2.14: Tap Water Monitoring System</p>
        <style jsx>{`
        h1{
            color: rgb(255,255,255);
            margin-top: 10px;
            margin-bottom:0px;
            padding-top: 5px;
            padding-bottom:0px;
          }
        p{
            color:rgb(255,255,255);
            padding-top: 10px;
            margin-top: 0px;
        }
            `}</style>
      </div>
      <div className = "Body"
        style={{
          textAlign: 'center'
        }}>
          <h1>
            Kondisi Tap Water Saat Ini
          </h1>
          <ul>
            {sensor.map((water_data) => (
                    <li style= {{listStyleType:'none'}}>
                        <h2>{water_data.time}</h2>
                        <h3>{water_data.PH}</h3>
                        <p>{water_data.Turbudity}</p>
                        <p>{water_data.TDS}</p>
                        <p>{water_data.Temp}</p>
                    </li>
            ))}
          </ul>
          <style jsx>{`
        h1{
          margin: 100px 0px 0px 0px;
        }
        h2{
          
        }
        h3{

        }
        p{
            color: rgb(0,0,0);
            margin-top: 10px;
            margin-bottom:0px;
            padding-top: 5px;
            padding-bottom:0px;
          }
        ul{
            color:rgb(0,0,0);
            padding-top: 10px;
            margin-top: 0px;
        }

            `}</style>
        </div>
      

          <div className="footer"
          style={{
            backgroundColor: 'rgb(235, 195, 64)',
            textAlign: 'center',
            position:'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            width: "100%"
          }}>
          <p>Created by Desain Proyek Teknik Elektro 2019 Kelompok 2.14</p>
        </div>



    </div>

    
    
  )
}

export async function getStaticProps() {
    try {
        const client = await clientPromise;
        const db = client.db("watermonitoring");

       const sensor = await db
           .collection("waterdatabase")
           .find({})
           .sort({ time: 1 })
           .limit(10)
           .toArray();
        return {
            props: { sensor: JSON.parse(JSON.stringify(sensor)) },
        };
    } catch (e) {
        console.error(e);
    }
}