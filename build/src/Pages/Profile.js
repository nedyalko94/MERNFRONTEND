import React from 'react'
import { Col, Container, ListGroup } from 'react-bootstrap'
import { useTheme } from '../Context/ColorMode'

function Profile({user}) {


  const darkTheme = useTheme()

  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
  }


  return ( 
    <Container fluid className='mainContainer' style={themeStyle}>
        <Col md={4} className='d-flex '>

    {user !== undefined ?   <ListGroup className='mt-4'>
      <ListGroup.Item>{`User Name : ${user.username}`}</ListGroup.Item>
      <ListGroup.Item>{`First Name : ${user.FirstName}`}</ListGroup.Item>
      <ListGroup.Item>{`Last Name : ${user.LastName}`}</ListGroup.Item>
      <ListGroup.Item>{`Email : @ ${user.Email}`}</ListGroup.Item>
      <ListGroup.Item>{`Country : ${user.Country}`}</ListGroup.Item>
      <ListGroup.Item>{`City :${user.City}`}</ListGroup.Item>
      <ListGroup.Item>{`Post Code : ${user.PostCode}`}</ListGroup.Item>
      <ListGroup.Item>{`Street : ${user.Street}`}</ListGroup.Item>
      <ListGroup.Item>{`Street # ${user.NumberOfStreet}`}</ListGroup.Item>
     

     
    </ListGroup> : ""}

      
    </Col>

    </Container>
  )
}

export default Profile