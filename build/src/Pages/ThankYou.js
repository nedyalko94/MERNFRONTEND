import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import {MdVerified} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
// Verif
export default function ThankYou() {
  const [time,setTime]=useState(8)
  const [joke,setJoke]=useState('')
  const x = useNavigate()
  useEffect(()=>{
    const navigateHome =()=>{
      let myTime = 8
      setInterval(()=>{
        
        setTime(myTime-1)
        myTime--

      },1000)
      setTimeout(()=>{
       
        setJoke(" Nothing wrong here. I'm just joking 😂 let's goo ...")
      },10000)

      setTimeout(()=>{
        x("/")
        
      },14000)
    }

      navigateHome() 

    
  },[x])
  


  return (
    <Container fluid className='mainContainer d-flex flex-column justify-content-center align-items-center'>
      <h1> Thank you for verify your Email Address!  </h1>

      <h1> You will be navigate to Home page after {time} sec ... </h1>
      {joke !== ''?<h1 >{joke}</h1>:''}

      <MdVerified className='text-success  verifySuccessIcon' />
      </Container>
  )
}
