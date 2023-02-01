import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTheme } from '../Context/ColorMode'
import server from '../variable'
import ProductCard from './ProductCard'


// import { UserContexts } from '../App'

export default function Trending({AllProduct}) {
// const user = useContext(UserContexts) ,{useContext} 
const[Top10Trending,setTop10Trending]= useState()

useEffect(()=>{
  fetch(`${server}/Product/get_visit`)
 .then(res=>res.json())
 .then(data=>{
   setTop10Trending(data.Trending)
 }) 
},[Top10Trending]) 



  const darkTheme = useTheme() 

  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
  }
  return (
    <Container className='mainContainer' fluid style={themeStyle}>
      <Row>
{Top10Trending !== undefined ? Top10Trending.map((Product,index)=>
  <Col  key={index} xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}><ProductCard Product={Product.product} key={index}/></Col>

):<h1>no product have been found</h1> }
</Row>
      </Container> 

  )
}
 