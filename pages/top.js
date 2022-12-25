import clientPromise from "../lib/mongodb";
import {CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js"; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Title, Tooltip, Legend);
import {Bar, Line, Scatter, Bubble} from "react-chartjs-2"

import headerStyles from './header.module.css'
import bodyStyles from './body.module.css'
import footerStyles from './footer.module.css'

const options= {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  },

}



export default function Top({PHTable, TurbudityTable, TDSTable }) {
  return (

    <div>
      <title>Fountain Water FTUI</title>
      <div className={headerStyles.header}>
        <h1 className={headerStyles.headerH1}>Welcome!</h1>
        <p className = {headerStyles.headerP}>Tap Water Gedung K FTUI Monitoring System</p>
        <img src="/FTUI.png" alt="Vercel Logo"  className = {headerStyles.headerImage}>
        </img>
        
      </div>
  
      <div className = {bodyStyles.body}>
          <h1 className={bodyStyles.bodyH1}>
            Kondisi Tap Water Saat Ini
          </h1>  
          <h2 className={bodyStyles.bodyH2}>PH Meter</h2>  
          <div className={bodyStyles.graph}>
          <Line
              options={options}
              data = {PHTable}
              // responsive = "true" 
              // width= "600px"
              // heigh= "200px"
          />
          </div>
          
          <h2 className={bodyStyles.bodyH2}>TDS Meter</h2> 
          <div className={bodyStyles.graph}>
          <Line 
            options={options}
            data = {TDSTable} 
            // width="600px" 
            // height="150px" 
          />
          </div>

          <h2 className={bodyStyles.bodyH2}>Turbudity Meter</h2>  
          <div className={bodyStyles.graph}>
          <Line 
            options={options}
            data = {TurbudityTable} 
            // width="600px" 
            // height="150px" 
          />
          </div>

        </div>
      

          <div className={footerStyles.footer}>
            <p className={footerStyles.footerP}>Created by Desain Proyek Teknik Elektro 2022 Kelompok 2.14</p>
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
        const DateReadings = [];
        const TurbudityReadings = [];
   
        const sensor = await db
            .collection("waterdatabase")
            .find({})
            .sort({ time: 1 })
            .toArray();
        sensor.forEach(sensorRead => {
        PHReadings.push(sensorRead.PH)
        TurbudityReadings.push(sensorRead.Turbudity)
        TDSReadings.push(sensorRead.TDS)
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
              lineTension: 0,
              pointRadius: 3
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