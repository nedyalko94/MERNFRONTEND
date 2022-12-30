// import { useTheme } from '@emotion/react'
import React, { useRef } from 'react'
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import {useTheme} from '../Context/ColorMode'
// import { GoogleMap, useJsApiLoader,useLoadScript,Marker } from '@react-google-maps/api';



// const containerStyle = {
//   width: '100%',
//   height: '20vw'
// };

// const center = {
//   lat: 50.81629678907021, 
//   lng: 4.407096001468849,
// };

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyCkTINyXr1CPSiUvAFmlXnhL0CfnvGji4s"
//   })

//   const [map, setMap] = useState(null)

//   const onLoad = useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map)
//   }, [])

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={9}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//   ) : <></>
// }




 function Contact() {

  const name = useRef('')
  const email = useRef('')
  const subject = useRef('')
  const message = useRef('')

  const sendEmail = async(e)=>{
    e.preventDefault()
     await fetch('http://localhost:3004/sendEmail',{
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
  .then(data=>console.log(data.msg))
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
        <Form.Control  aria-label="Name" placeholder="Name"  ref={name}/>
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control aria-label="email" placeholder="email address"  ref={email}/>
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control aria-label="Subject" placeholder="Subject"  ref={subject}/>
      </InputGroup>
      <InputGroup>
        <Form.Control as="textarea" aria-label="question" placeholder="Ask your Question" ref={message}/>
      </InputGroup >
      <InputGroup className=' mt-2  d-flex align-content-end justify-content-end'>
        <button type="submit" onSubmit={(e)=>e.preventDefault()}  onClick={sendEmail} className='button mt-2'><span></span><span></span><span></span><span></span>Send</button>
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