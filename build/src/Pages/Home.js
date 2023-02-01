import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ProductCard from './ProductCard'
import { useTheme } from '../Context/ColorMode'
 function Home({AllProduct,FilteredByCategories,ProductInputSearch}) {

  const darkTheme = useTheme()

  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
  }

  return (
    <Container fluid className='mainContainer' style={themeStyle}>
<Row>
  

              {
              
              ( ProductInputSearch === undefined || ProductInputSearch.length === AllProduct.length )?
             
              
              FilteredByCategories.length > 0 ? (FilteredByCategories.map((Product,index)=>
               <Col  key={index} xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}><ProductCard Product={Product} key={index}/></Col>)
              ) :( AllProduct.map((Product,index)=>
               <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}><ProductCard Product={Product}  key={index}/></Col>)
              )
              : ProductInputSearch.length=== 0? (<h3>Sorry we don't have this product.</h3>): ProductInputSearch.map((Product,index)=>
              <Col  key={index} xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}><ProductCard Product={Product} key={index}/></Col>)
              
              
              
              }

  
  
  </Row>
</Container>
)
}
export default Home


