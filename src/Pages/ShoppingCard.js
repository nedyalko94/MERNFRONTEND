import React, { useContext, useEffect,  useState } from 'react'
import { CloseButton, Col, Container, Form, Row } from 'react-bootstrap'
import ProductCard from './ProductCard'
import { useTheme } from '../Context/ColorMode'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import server from '../variable'
import { UserContexts } from '../App';



export default function ShoppingCard() {
  const [ButtonVariant, setButtonVariant] = useState('dark')
  const [GetTotalPrice, setGetTotalPrice] = useState()
  const [ClientID, setClientID] = useState('')
  const style = { "layout": "vertical" };
  const user = useContext(UserContexts)

  
  const [ShopListWithQuantity, setShopListWithQuantity] = useState([])
  const [ShopList,setShopList] = useState([])
  // const [ Options,setOptions] = useState()

  

  useEffect(() => {
    const payID = async () => {
      let res = await fetch(`${server}/PayPalClientID`)
      let data = await res.json()
      setClientID(data.paypalClientId)
    }
    payID()
  }, [ClientID])

  const darkTheme = useTheme()
  useEffect(
    () => {

      const check = () => {
        darkTheme ? setButtonVariant('white') : setButtonVariant('dark')
      }
      check()


    }, [darkTheme])

  const themeStyle = {
    backgroundColor: darkTheme ? '#333 ' : '#f6f6f6',
    color: darkTheme ? '#f6f6f6' : '#333',
  }
  const Shopping=JSON.parse(localStorage.getItem("shoppingCard"))

useEffect(()=>{
  const getShopList =()=>{
    const Shop=JSON.parse(localStorage.getItem("shoppingCard")
    )
    if(Shop.length === ShopList.length){return}else{setShopList(Shop)}
  }
  
  getShopList()
  
},[Shopping])

 

useEffect(()=>{
 let DefaultShoppingList=()=>{
  let variable = []
   ShopList.forEach(element =>  variable.push([1, element]))
  // console.log(ShopListWithQuantity)
  setShopListWithQuantity(variable)
} 
DefaultShoppingList()

}
,[ShopList])
 
     
     


     // calculate total
     
     useEffect(()=>{
      const TotalPrice = ()=>{
        const total= []

        ShopListWithQuantity.forEach(ele=>{
          let Single= ele[0]*ele[1].Price
          return total.push(Single)
        })
        const sum = total.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        return setGetTotalPrice(sum)
       }
       TotalPrice()
     },[ShopListWithQuantity])
      
// useEffect(()=>{

// },[])
  const DeleteItem = (e) => {
    // console.log(e.target.id)
    let matchWish = ShopList.filter(ShopList => ShopList._id !== e.target.id)
    // console.log(e.target.parentElement)
    localStorage.setItem('shoppingCard', JSON.stringify(matchWish))
    setShopList(matchWish)
  }

  return (
    <Container fluid className='mainContainer' style={themeStyle}>
      {/* {console.log(ShopListWithQuantity,GetTotalPrice)} */}
      <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Col  xs={12} sm={12} md={12} lg={9} xl={9} xxl={9}>
          <Row xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {ShopList !== null && ShopList.length !== 0 ?
              (ShopList.map((Product, index) => (
                <Col className='position-relative px-3' xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} key={index+"c"}>
                  <CloseButton className=' position-absolute top-0 end-0 translate-middle ' key={index+"cb"}
                  onClick={DeleteItem} id={Product._id} variant={ButtonVariant}></CloseButton ><ProductCard Product={Product} key={Product._id} />
                  <Form.Select className='mb-3' key={index+"fs"}
                  // onClick={() => console.log(ShopListWithQuantity)}
                    onChange={
                      (e) => {
                        let change = [] 
                        ShopListWithQuantity.forEach((ele,index) => {
                          if (ele[1]._id === Product._id) {
                            // ShopListWithQuantity[index] = [e.target.value,ele[1]]
                            change.push([e.target.value,ele[1]])
                          }else{
                            change.push(ele)
                          }
                        }
                        );
                        setShopListWithQuantity(change)
                        }
                    } >
                    

                  {      Product.CountOfStock !== undefined? new Array(Product.CountOfStock ).fill(true).map((e, i) => i+1).map((e,index)=><option value={e} key={index+"opt"}>{e}</option>):""
                }
                   
                   

                  </Form.Select>
                </Col>)
              ))
              : <h3 className='d-flex justify-content-center '>  Shopping Car is Empty</h3>

            }
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3} className="mr-5">
          <Container fluid className='p-3 d-flex flex-column justify-content-end'>
<h3 className='mb-5'> {`Total Price: ${GetTotalPrice}€`}</h3>

            {ClientID !== '' ? <PayPalScriptProvider options={{ "client-id": ClientID, currency: "EUR", }}>
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
                  console.log(details)
                  console.log(actions)
                  const info = async () => {
                    await fetch(`${server}/onApproveShoppingCard`, {
 
                      method: 'POST',
                      headers: {
                        "Content-Type": "application/json" 
                      },  
                      body: JSON.stringify({
                        "PaymentDetail": details,
                        "ShopListWithQuantity": ShopListWithQuantity,
                        "TotalPrice":GetTotalPrice,
                        "user":user?user:'',
                        "user_id":user?user._id:'' 

                      })
                    })
                      .then(res => res.json())
                      // .then(result => console.log(result))
                  }
                  info()
                }
                }

              />
            </PayPalScriptProvider> : 'Payment System can\'t be found'}

          </Container>

        </Col>
      </Row>
    </Container>
  )
}
