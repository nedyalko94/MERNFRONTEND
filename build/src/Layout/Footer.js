import React, { useRef,useState} from "react";
import {
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaInstagram,FaLinkedin,FaTwitter,FaDiscord,FaTiktok,FaTwitch,FaYoutube} from "react-icons/fa";
import server from '../variable'
import ResponseModal from '../Pages/ResponseModal'


function Footer({setEmail,newsLetter,msgModal,setMsgModal}) {
  const [modalShow, setModalShow] = useState(false);


  const name = useRef('')
  const email = useRef('')
  const subject = useRef('')
  const message = useRef('')
  const getEmail = (e)=>setEmail(e.target.value)

const getNewsLetterEmail=(e)=>{
  e.preventDefault()
  newsLetter()
   setModalShow(true)
  
  return


}
  const sendEmail = async(e)=>{
    e.preventDefault()
    setModalShow(true)
    if (name.current.value ==='' || email.current.value === '' || subject.current.value === '' || message.current.value === '')
    { if(name.current.value !== '' || email.current.value !== ''||subject.current.value === '' || message.current.value === '')
    {name.current.value = '';email.current.value = '';subject.current.value = '' ; message.current.value = ''}
      return  setMsgModal('fill all field please and try again')  }  
    // setMsgModal('fill all fill please and try again') &&

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
  .then(data=>setMsgModal(data.msg) )
//   .then(()=>{return Form.reset()}) 
}


  return (
    <Container fluid className="bg-dark text-light justify-content-center fs-3">
      <Row>
        <Col >
        <div className=" fs-5 mx-0 mt-3"> Sign in for Newsletter to be up to date with the latest offer! <span className="fs-2" role="img" aria-label='img'>🆒🆕👨🏼‍💻</span>  </div>
          <Form >
          <InputGroup className="mt-3 " >
            <Form.Control
              aria-label="email"
              aria-describedby="inputGroup-sizing-default"
              placeholder="email address"
              type="email"
              onChange={getEmail}
              required
              />
             {/* <input type="checkbox" className="big-checkbox"></input> */}
              
            <button  onClick={getNewsLetterEmail} className='button mx-2' ><span></span><span></span><span></span><span></span>Sign In</button> 
          </InputGroup>
          </Form>
        </Col>
        <Col className=" item-align-center">
        <div className=" fs-5 mx-0 mt-3 d-flex flex-row justify-content-center "> Follow us on social media. </div>
          <div className="d-flex flex-row mx-2 justify-content-center">
            <a href="https://twitter.com/">
              <FaTwitter
                fill="white"
                className="display-6 mx-1 bg-primary p-1 rounded-1 mx-1 border"
              />
            </a>
            <a href="https://www.linkedin.com/">
              <FaLinkedin
                fill="white"
                className="display-6 mx-1 bg-primary p-1 rounded-1 me-1 border"
              />
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram
                fill="white"
                className="display-6 mx-1 p-1 rounded-1 border bg-instagram"
              />
            </a>
            <a href="https://discord.com/">
              <FaDiscord
                fill="white"
                className=" mx-1 display-6  p-1 rounded-1 me-1 border bg-primary"
              />
            </a>
            <a href="https://www.tiktok.com/en/">
              <FaTiktok
                fill="white"
                className=" mx-1 display-6 bg-dark text-light p-1 rounded-1 me-1 border"
              />
            </a>
            <a href="https://www.twitch.tv/">
              <FaTwitch
                fill="white"
                className=" mx-1 display-6  text-light p-1 rounded-1 me-1 border twitch"
              />
            </a>
            <a href="https://www.youtube.com/">
              <FaYoutube
                fill="white"
                className=" mx-1 display-6 bg-danger text-danger p-1 rounded-1 me-1 border "
              />
            </a>
            
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
        <Container className="d-flex">
          <ListGroup className="bg-dark mt-5">
            <ListGroup.Item className="bg-dark text-light border-0">Navigation</ListGroup.Item>
            <ListGroup.Item className="bg-dark border-0"><Link to='/' className="nav-link text-decoration-none text-light fs-5 border-0 navLink">Home</Link></ListGroup.Item>
            <ListGroup.Item className="bg-dark border-0"><Link to='/Actions' className="nav-link text-decoration-none bg-dark text-light fs-5 navLink">Actions</Link></ListGroup.Item>
            <ListGroup.Item className="bg-dark border-0"><Link to='/Trending' className="nav-link text-decoration-none bg-dark text-light fs-5 navLink">Trending</Link></ListGroup.Item>
            <ListGroup.Item className="bg-dark border-0"><Link to='/ShoppingCard' className="nav-link text-decoration-none bg-dark text-light fs-5 navLink">Basket</Link></ListGroup.Item>
           
          </ListGroup>
          </Container>
        </Col>

        <Col>
        <Container>
          <Form>
        <Form.Label htmlFor="basic-url">Your have a  Question?</Form.Label>
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
      <InputGroup className=' mt-2  d-flex align-content-center justify-content-center'>
        <button     onClick={sendEmail} className='button mt-2'><span></span><span></span><span></span><span></span>Send</button>
        </InputGroup >

      </Form>
     
      

      <ResponseModal  
        show={modalShow}
        onHide={() => setModalShow(false)}
        msg={msgModal}
      />
 
        </Container>
        
        
        </Col>
      </Row>
      <Row className="bg-dark text-light justify-content-center ">
        {" "}
        &copy; E-commerce 2022 Cyber Tech
      </Row>
    </Container>
  );
}
export default Footer;
