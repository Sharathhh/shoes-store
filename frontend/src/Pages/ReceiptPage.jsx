import React, { useContext, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useReactToPrint } from "react-to-print";
import './CSS/ReceiptPage.css'
import { ShopContext } from "../Context/ShopContext";


function ReceiptPage() {
  const { orderId } = useParams();
  const printRef = React.useRef(null); 


  const {all_product}=useContext(ShopContext)
console.log(all_product)
const location= useLocation();
const order=location.state;
console.log(order)


 const handlePrint=async()=>{
  const element=printRef.current;
  if(!element){
    return
  }
  console.log(element)

  const canvas= await html2canvas(element)
  const data= canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4"
  });

 const imgOroperties= pdf.getImageProperties(data)
 const pdfwidth= pdf.internal.pageSize.getWidth()

 const pdfheight=(imgOroperties.height*pdfwidth)/imgOroperties.width;

  pdf.addImage(data, "PNG", 0, 0, pdfwidth,pdfheight)
   pdf.save('invoice.pdf');



 }


  return (
    <div className="receipt-page">
      
<div ref={printRef}  className='invoice-receipt' style={{padding:'20px'}}>
      <h2>Order Receipt</h2>

<div class="logo-container">
  
</div>

<table class="invoice-info-container">
  <tr>
    <td rowspan="2" class="client-name">
      <strong>{order.name}</strong>
      <p className="order-name">{order.address}</p>
    </td>

    <td>
      GLITCH STORE
    </td>
  </tr>
  <tr>
    
    <td>
      123 Main Street
    </td>
  </tr>
  <tr>
    <td>
    <strong> Invoice Date:</strong> {order.Date.slice(0,10)}
    </td>
    <td>
      San Francisco CA, 94103
    </td>
  </tr>
  <tr>
    <td>
    <strong>Invoice No:</strong> {order._id}
    </td>
    <td>
      hello@useanvil.com
    </td>
  </tr>
</table>


<table class="line-items-container">
  <thead>
    <tr>
      <th class="heading-quantity">Qty</th>
      <th class="heading-description">Description</th>
      <th class="heading-price">Price</th>
      <th class="heading-subtotal">Subtotal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2</td>
      <td>Blue large widgets</td>
      <td class="right">$15.00</td>
      <td class="bold">$30.00</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Green medium widgets</td>
      <td class="right">$10.00</td>
      <td class="bold">$40.00</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Red small widgets with logo</td>
      <td class="right">$7.00</td>
      <td class="bold">$35.00</td>
    </tr>
  </tbody>
</table>


<table class="line-items-container has-bottom-border">
  <thead>
    <tr>
      <th>Payment Info</th>
      <th>Due By</th>
      <th>Total Due</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="payment-info">
        <div>
          Account No: <strong>123567744</strong>
        </div>
        <div>
          Routing No: <strong>120000547</strong>
        </div>
      </td>
      <td class="large">{order.Date.slice(0,10)}</td>
      <td class="large total">${order.amount}</td>
    </tr>
  </tbody>
</table>
</div>
      <div className="download-btn">

      <button onClick={handlePrint}>Download PDF</button>
      </div>
     
     
    </div>
  );
}

export default ReceiptPage;
