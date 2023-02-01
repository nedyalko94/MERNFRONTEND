import React, { useRef } from 'react'
import {  Container, InputGroup,Form } from 'react-bootstrap'
import server from '../variable'


export default function ForgotPassword() {

const Email = useRef('')
 const passwordReset = async(e)=>{

   await fetch(`${server}/Users/PasswordReset`, {
           
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ 
                "Email":Email.current.value, 
            })
        })
        .then(res=> res.json())
        .then(data=> console.log(data))
 } 
  return (
    <Container fluid className='mainContainer d-grid item-align-center justify-content-center'>
    
<form  className='d-flex flex-column align-self-start justify-self-center  text-dark p-5 rounded-4' >
          <h3 className='align-self-center m-3'> Password reset. </h3>
            <InputGroup className='align-self-center'>
            
            
        <Form.Control
        placeholder='Email'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          ref = {Email}
        />
</InputGroup>

<button onClick={passwordReset} className='align-self-center m-3 px-3 py-2  button' >
  <span> </span>
	<span> </span>
	<span> </span>
	<span> </span>
  Reset
  </button>

            </form>
          
    </Container>
  )
}
