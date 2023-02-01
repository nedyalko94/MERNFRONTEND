import React, { useEffect, useState } from 'react'
import { CloseButton, Col, Container, Row } from 'react-bootstrap'
import ProductCard from './ProductCard'
import { useTheme } from '../Context/ColorMode'

export default function Wishlist() {
  const [ButtonVariant ,setButtonVariant]=useState('dark')


  const darkTheme = useTheme()
  useEffect(
    ()=>{

    const check = ()=>{
      darkTheme?   setButtonVariant('white'):setButtonVariant('dark')
    }
    check()


  },[darkTheme])
  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
  }



  const Wishlist= JSON.parse(localStorage.getItem("Wishlist"))

  const DeleteWishItem = (e)=>{
      // console.log(e.target.id)
      let matchWish = Wishlist.filter(Wishlist=> Wishlist._id !== e.target.id)
      // console.log(e.target.parentElement)
      localStorage.setItem('Wishlist', JSON.stringify(matchWish))
      // console.log(matchWish)
  }
 

  return (
    
    <Container fluid className='mainContainer' style={themeStyle}>
<Row className='p-3'>
        { Wishlist !== null && Wishlist.length !== 0 ?
        (Wishlist.map((Product,index)=>(
          <Col className='position-relative px-3' xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}  key={index}><CloseButton variant={ButtonVariant} className=' position-absolute top-0 end-0 translate-middle' onClick={DeleteWishItem} id={Product._id}></CloseButton><ProductCard Product={Product} key={index} /> 
          </Col>)

         ) )
      :<h3 className='d-flex justify-content-center '>  Wishlist is Empty</h3>
      
      }
</Row>
    </Container>
  )
}
