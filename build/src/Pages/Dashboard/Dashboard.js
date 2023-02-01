import React, { useRef } from 'react'
import {  Col, Container, Row } from 'react-bootstrap'
import DashboardMenu from './DashboardMenu'
import server from '../../variable'

export default function Dashboard() {
  const msg=useRef()
  const html=useRef()
  const tittle=useRef()

  const NewsLetterSend = async(e)=>{
    e.preventDefault()
    let res = await fetch(`${server}/NewsLetterSend`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({ 
        "title":tittle.current.value,
        "message":msg.current.value,
        "html":html.current.value
        
    })
    })
    let data = await res.json()
    console.log(data)
    


  }

  return (
   <Container fluid className='mainContainer'>
    <Row>
      <DashboardMenu/>
</Row>
<Row>
  <Container className='pt-5 '>
    <Row><h3> Here you can send Email to all NewsLetter Member</h3></Row>
    <Row>  
      <Col className='d-flex justify-content-center'>
      <form className='d-flex flex-column justify-content-center align-item-center' >
      <input type='text'placeholder='tittle' className='p-5'name='tittle' ref={tittle}></input>
      <textarea rows="10" cols="30" placeholder='message'className='p-5' name='message' ref={msg}></textarea>
      <textarea rows="10" cols="30" placeholder='html'className='p-5' name='html' ref={html}></textarea>
      <button className='detailButton m-3 align-self-center' type='submit'  onClick={NewsLetterSend}>Send</button>

    </form>
    </Col>
    </Row> 

  </Container>
</Row>
   </Container>
  )
}
