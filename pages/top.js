import clientPromise from "../lib/mongodb";
import {CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js"; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Title, Tooltip, Legend);
import {Bar, Line, Scatter, Bubble} from "react-chartjs-2"

// import logo from "../resources/logo512.png";


export default function Top({PHTable, TurbudityTable, TDSTable }) {
  return (

    <div>
      <div className="Header"
        style={{
          padding: '0',
          backgroundColor:  'rgb(0, 0, 0)',
          position:'absolute',
          top: 0,
          right: 0,
          left: 0,
          paddingBottom: '10px',
          textAlign: 'center',
          width: '100%',
        }}>
        <img src="/FTUI.png" alt="Vercel Logo" style={{
          position:'absolute',
          float: 'right',
          top: '10px',
          right: '10px',
          height:'100px',
          width:'275px',
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
            margin-bottom:10px;
            padding-top: 5px;
            padding-bottom:0px;
            padding-left:5px;
          }
        p{
            color:rgb(255,255,255);
            padding-top: 20px;
            margin-top: 0px;
        }
            `}</style>
      </div>
  
      <div className = "Body"
        style={{
          textAlign: 'center',
          paddingTop: '60px',
          paddingBottom: '100px',
          margimBottom: '50px'
        }}>
          <h1>
            Kondisi Tap Water Saat Ini
          </h1>

          
        <h2> SENSOR</h2>
        <p>PH Meter</p>  
        <div style = {{
          marginTop: '10px',
          marginBottom: '10px',
          paddingBottom: '10px',
          paddingLeft: '200px',
          paddingRight: '200px'
        }}>
        <Line 
            data = {PHTable} 
            width="600px" 
            height="150px" 
        />
        </div>
        
        <p>TDS Meter</p> 
        <div style = {{
          marginTop: '10px',
          marginBottom: '10px',
          paddingBottom: '10px',
          paddingLeft: '200px',
          paddingRight: '200px'
        }}>
        <Line 
          data = {TDSTable} 
          width="600px" 
          height="150px" 
        />
        </div>

        <p>Turbudity Meter</p>  
        <div style = {{
          marginTop: '10px',
          marginBottom: '10px',
          paddingBottom: '10px',
          paddingLeft: '200px',
          paddingRight: '200px'
        }}>
        <Line 
          data = {TurbudityTable} 
          width="600px" 
          height="150px" 
        />
        </div>
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
            backgroundColor: 'rgb(255, 255,255)',
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



export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("watermonitoring");
        const PHReadings = [];
        const TDSReadings = [];
        const TempReadings = [];
        const DateReadings = [];
        const TurbudityReadings = [];
   
        const sensor = await db
            .collection("waterdatabase")
            .find({})
            .sort({ time: 1 })
            .limit(10)
            .toArray();
        sensor.forEach(sensorRead => {
        PHReadings.push(sensorRead.PH)
        TurbudityReadings.push(sensorRead.Turbudity)
        TDSReadings.push(sensorRead.TDS)
        TempReadings.push(sensorRead.Temp)
        DateReadings.push(sensorRead.time)
        })
        console.log("PH From MONGODB");
        console.log(PHReadings);
        const PHTable = {labels: DateReadings,
        datasets: [
          {
            label: "PH",
            data: PHReadings,
            fill: false,
            borderWidth: 2,
            borderColor: 'blue',
            lineTension: 0,
            lineWidth: 2,
            pointRadius: 3
          }
        ]};

        
        const TDSTable = {labels: DateReadings,
          datasets: [
            {
              label: "TDS",
              data: TDSReadings,
              fill: false,
              borderWidth: 2,
              borderColor: 'green',
              pointRadius: 3,
              tension: 0
            }
          ]};
          const TurbudityTable = {labels: DateReadings,
            datasets: [
              {
                label: "Turbudity",
                data: TurbudityReadings,
                fill: false,
                borderWidth: 2,
                borderColor: 'red',
                lineTension: 0,
                pointRadius: 3
              }
            ]};


        console.log("Turbudity From MONGODB");
        console.log(TurbudityReadings);
        console.log("TDS From MONGODB");
        console.log(TDSReadings);
        console.log("Temp From MONGODB");
        console.log(TempReadings);
        console.log("Date from MONGODB");
        console.log(DateReadings);

        return {
            props: { 
            PHTable: JSON.parse(JSON.stringify(PHTable))
            ,TurbudityTable: JSON.parse(JSON.stringify(TurbudityTable))
            ,TDSTable: JSON.parse(JSON.stringify(TDSTable))
          }
        };
    } catch (e) {
        console.error(e);
    }
}
// async function handler(req, res){
//   const client = await clientPromise;
//   const db = client.db("watermonitoring");
//   switch (req.method){
//     case "POST":
//       console.log("tes");
//       break;
//     case "GET":
//       console.log("GET tes");
//       getStaticProps();
//       break;
//   }
// }