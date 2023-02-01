import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useContext, useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { UserContexts } from "../App";
import server from "../variable";


export default function MyVerticallyCenteredModal(props) {
    const [ClientID,setClientID] = useState('')
   const Product = props.Product
   const user = useContext(UserContexts)
   useEffect(()=>{
       const payID = async()=>{
         let res = await fetch(`${server}/PayPalClientID`)
         let data = await res.json()
          setClientID(data.paypalClientId)
       
        
       }
       payID()
     
     
     },[])
 
     const style = {"layout":"vertical"};
     const [GetTotalPrice,setGetTotalPrice] = useState()
     const [Quantity, setQuantity] = useState(1)
     let stockCount = []
     const stock = Product.CountOfStock
 
 for ( let i = 1; i <= stock ; i++){
   stockCount.push(i)
 }
 const FormSelect= (e)=>{ setQuantity(e.target.value)}
 
 useEffect(()=>{
 
   const TotalPrice = ()=>{
     const total = Product.PromoPrice === null ? Product.Price * Quantity :Product.PromoPrice * Quantity
     setGetTotalPrice(total)
   }
   TotalPrice()
 
 },[Quantity,Product.Price,Product.PromoPrice])
   
   return (
     <Modal
       {...props}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
           Checkout
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <h4>{Product.Brand} {Product.Categories} {Product.Name}  Price: {Product.PromoPrice === null ? Product.Price : Product.PromoPrice }€</h4>
         <div>
           <div>Quantity</div>
         <Form.Select onChange={FormSelect}  className='mb-3'>
                 {stockCount.map((e,index)=>(<option value={e} key={index}>{e}</option>))}
               </Form.Select>
               <h4>Total Price: {GetTotalPrice}€</h4>
         {ClientID !== '' ?<PayPalScriptProvider options={{ "client-id":ClientID, currency: "EUR",}}>
                <PayPalButtons 
                 style={style}
                 forceReRender={[GetTotalPrice]}
                  disabled={false}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                 return actions.order.create({
                   purchase_units: [
                     {
                       amount: {
                         value: GetTotalPrice,
                       },
                     },
                   ],
                 });
               }}
               onApprove={async (data, actions) => {
                 const details = await actions.order.capture();
                 // const name = details.payer.name.given_name;
                 // console.log(details)
                  const info = async()=>{
                   await fetch(`${server}/onApprove`, {
                    
                     method:'POST',
                     headers:{
                         "Content-Type":"application/json"
                     },
                     body:JSON.stringify({ 
                         "PaymentDetail":details,
                         "NumberOfProduct":Quantity,
                         "Product":Product,
                         "user":user?user:'',
                         "user_id":user?user._id:''
                     })
                 })
                 .then(res=> res.json())
                 .then(result=>console.log(result) ) }
                 info()
                }
              }
                
    />
  </PayPalScriptProvider>:'Payment System can\'t load' }
         </div>
         </Modal.Body>
       <Modal.Footer>
         <Button onClick={props.onHide}>Close</Button>
       </Modal.Footer>
     </Modal>
   );
 }
 