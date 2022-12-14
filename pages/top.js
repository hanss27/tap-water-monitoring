import clientPromise from "../lib/mongodb";
import {CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js"; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Title, Tooltip, Legend);
import {Bar, Line, Scatter, Bubble} from "react-chartjs-2"

// import logo from "../resources/logo512.png";

const weight = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2];

   


const options = {
  plugins:{
    legend:{
      display: false,
    },
  },
  elements: {
    line:{
      tension: 0,
      borderWidth: 2,
      borderColor: "rgba(47,97,68,1)",
      fill: "start",
      backgroundColor: "rgba(47,97,68, 0.3)"
    },
    point:{
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    },
  },
};
export default function Top({ sensor, PHTable, TurbudityTable, TDSTable }) {
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
        <img src="/logo512.png" alt="Vercel Logo" style={{
          position:'absolute',
          float: 'right',
          top: 0,
          right: '0px',
          height:'50px',
          width:'50px',
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
          <img src="/logo512.png" alt="New Logo" style={{
    
    height:'50px',
    width:'50px',
    margin: '0 0 0 0px',
    }} >
  </img>

          
        <h2> SENSOR</h2>
        <p>PH Meter</p>  
        <div style = {{
          marginTop: '200px',
          marginBottom: '200px',
          paddingBottom: '200px',
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
          marginTop: '200px',
          marginBottom: '200px',
          paddingBottom: '200px',
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
          marginTop: '200px',
          marginBottom: '200px',
          paddingBottom: '200px',
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
       console.log("testing")
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
            fill: true,
            borderWidth: 2,
            lineTension: 1,
            pointRadius: 3
          }
        ]};

        const TurbudityTable = {labels: DateReadings,
          datasets: [
            {
              label: "Turbudity",
              data: TurbudityReadings,
              fill: true,
              borderWidth: 2,
              lineTension: 1,
              pointRadius: 3
            }
          ]};
        const TDSTable = {labels: DateReadings,
          datasets: [
            {
              label: "TDS",
              data: TDSReadings,
              fill: true,
              borderWidth: 2,
              lineTension: 1,
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
             sensor: JSON.parse(JSON.stringify(sensor))
            ,PHTable: JSON.parse(JSON.stringify(PHTable))
            ,TurbudityTable: JSON.parse(JSON.stringify(TurbudityTable))
            ,TDSTable: JSON.parse(JSON.stringify(TDSTable))
          }
        };
    } catch (e) {
        console.error(e);
    }
}