import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTheme } from '../Context/ColorMode'
import ProductCard from './ProductCard'

// import { Popover } from 'react-bootstrap'

export default function Actions({AllProduct}) {
  const darkTheme = useTheme()

  const PromoProduct = AllProduct.filter((product)=> product.PromoPrice !== null)
  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
  }
  return (
    <Container fluid className='mainContainer' style={themeStyle}>
      <Row>
      {PromoProduct.length > 0 ? (PromoProduct.map((Product,index)=>
               <Col  key={index} xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}><ProductCard Product={Product} key={index}/></Col>)
              ):<h1>There isn't product on promotion </h1>}
  </Row> 
 </Container>
  ) 
}
  