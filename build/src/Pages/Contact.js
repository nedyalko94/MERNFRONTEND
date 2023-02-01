// import { useTheme } from '@emotion/react'
import React, { useRef } from 'react'
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import {useTheme} from '../Context/ColorMode'
import server from '../variable'

// import { GoogleMap, useJsApiLoader,useLoadScript,Marker } from '@react-google-maps/api';


 function Contact() {

  const name = useRef('')
  const email = useRef('')
  const subject = useRef('')
  const message = useRef('')

  const sendEmail = async(e)=>{
    // e.preventDefault()

        if (name.current.value ==='' || email.current.value === '' || subject.current.value === '' || message.current.value === '')
    { return } 
     await fetch(`${server}/sendEmail`,{
      credentials: 'include',
      method:'POST',
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({ 
          "name":name.current.value,
          "email":email.current.value,
          "subject":subject.current.value,
          "message":message.current.value,
      })

  } 
  )
  .then(res=>res.json())
  .then(data=>alert(data.msg))  
}
  const darkTheme = useTheme() 
  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
  }

 
  return (
    <Container className='mainContainer d-grid' fluid style={themeStyle}>
      <Row>
      <Container  className=' pt-5 d-flex'>
        <Col>
      <h4>End project for Web Developing  </h4>
      <ul className='fs-5'>
        <li>Name: Nedyalko Todorov</li>
        <li>Where : IntecBrussel</li>
        <li>When: May-February</li>
        <li>What: Web Developing (Html 5, Css3 ,Bootstrap 5, React,<br></br> React-Bootstrap, ExpressJS, NodeJS, Mongodb)</li>
        
      </ul>
      </Col>
      <Col>
      <Container>
          <Form>
        <Form.Label htmlFor="basic-url">For Contact</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control  aria-label="Name" placeholder="Name"  ref={name} required/>
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control aria-label="email" placeholder="email address"  ref={email} required/>
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control aria-label="Subject" placeholder="Subject"  ref={subject} required/>
      </InputGroup>
      <InputGroup>
        <Form.Control as="textarea" aria-label="question" placeholder="Ask your Question" ref={message} required/>
      </InputGroup >
      <InputGroup className=' mt-2  d-flex align-content-end justify-content-end'>
        <button type="submit"  onClick={sendEmail} className='button mt-2'><span></span><span></span><span></span><span></span>Send</button>
        </InputGroup >

      </Form>

        </Container>


      </Col>


      </Container>
      </Row>

      {/* <MyComponent/> */}
      <Row>
      <Container     fluid   className='  m-0 p-0 googleMap'
>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.7986536446915!2d4.405241406119079!3d50.81636906881149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dba5d9d41eed%3A0x2d602b06b16b42bc!2sDigitalcity.brussels!5e0!3m2!1sen!2sbe!4v1671797417682!5m2!1sen!2sbe" 
      width="100%" height="450"
       style={{border:"0"}}
       allowFullScreen={true} loading="lazy" 
       referrerPolicy="no-referrer-when-downgrade"
       title='map'
      //  scroll-blocking ={true}
       ></iframe>
     </Container>
     </Row>
      </Container>
  )
}
export default Contact
// https://tomchentw.github.io/react-google-maps/#usage--configuration

// https://www.npmjs.com/package/@react-google-maps/api
// https://developers.google.com/maps/documentation/javascript/get-api-key