import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./Data.css";
import { Chart as ChartJs, LineElement,CategoryScale,LinearScale,PointElement } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Navbar from "../Naavbar/Navbar";


function Data() {

    const [salesData,setSalesData]=useState(new Array(12).fill(0))


    const [totalAmount,setTotalAmount]=useState(0)

    const [codPay,setcodPay]=useState(0)

    const [razoPay,setRazoPay]=useState(0)

  



    const fetchDetails = async () => {
        try {


          const response=  await axios.get('http://localhost:4000/monthlysales')
            
            if(response.data){
              console.log("Fetched Data", response.data.monthlySales)
              setSalesData(response.data.monthlySales)

              console.log(salesData)


              setTotalAmount(response.data.totalAmount)
                   console.log("data",response.data.totalAmount)
            }

            

        } catch (error) {
            console.error("Error in API", error);
         }
    };



    const FetchPaymentMethod=async()=>{


      try{
      const response= await axios.get('http://localhost:4000/paymentMeth')

      if(response.data){

        setRazoPay(response.data.razo)
        setcodPay(response.data.cod)
        console.log(razoPay,codPay)

        

        
      }
    }
    catch(error){
      console.error("Error in paymentFetch API",error)
    }

    }






   useEffect(() => {
   fetchDetails();

   FetchPaymentMethod();
   },[]);


   useEffect(()=>{
    document.body.style.overflow = "auto";
    window.scrollTo(0,0)

   })



   const charData={
    labels: ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    datasets:[
      {
        label: `sales in ${new Date().getFullYear()}`,
        data:salesData,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.55)",
        tension: 0.4,
      }

    ]
   }



   const Doughnutdata = {
    labels: ['RazoPay', 'Cash On Delivery'],
    datasets: [{
  label: 'Total number of users preffered',
  data: [razoPay,codPay],
  backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
    ],
   hoverOffset: 4
  }]
}








  return (
    <div className="data">
      <div>
        
      </div>

      
      <div className="data-container">


        <div className="data-1-container">
        <Bar
          data={charData}
        />

        </div>
        <div className="data-2-container">
        <Doughnut
         data={Doughnutdata}



        />




        </div>
      </div>
      <div className="data-3-container">
        <Bar
          data={charData}
        />

         <div className="revenue-title">
          <p>Total Revenue:-</p>
        <h1> ${totalAmount}.00/-</h1>
        </div>

      
  
      </div>

    </div>
  );
}

export default Data;
