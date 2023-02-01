import React, { useRef } from 'react'
import { Container, InputGroup,Form} from 'react-bootstrap'
import {  useParams } from 'react-router-dom'
import server from '../variable'

function PasswordUpdate() {
    const password = useRef('')
    const confirmPassword = useRef('')
    const {id} = useParams()

    const updateUser = async()=>{
        await fetch(`${server}/Users//Password_Update/${id}`, {
           
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ 
                "password":password.current.value,
                "Password2":confirmPassword.current.value
            })
        })
        .then(res=> res.json())
        .then(data=> alert(data.msg))

    }

  return (
    <Container className='mainContainer d-grid item-align-center justify-content-center' fluid>

            <form className='d-flex flex-column align-self-start justify-self-center  text-dark p-5 rounded-4'>
            {/* onSubmit={(e)=>e.preventDefault()} */}

            <h3> Password Reset</h3>
            <InputGroup className="mb-3">
        
        <Form.Control
        placeholder='New Password'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          ref = {password}

        />
         </InputGroup>
         <InputGroup className="mb-3">
       
        <Form.Control 
        placeholder='Confirm Password'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          ref={confirmPassword}
        />
      </InputGroup>
        <button onClick={updateUser} className='align-self-center m-3 px-3 py-2  button'><span></span><span></span><span></span><span></span> Update</button>
            </form>

    </Container>
  )
}

export default PasswordUpdate