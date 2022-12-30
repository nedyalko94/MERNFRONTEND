
import React, {useRef,useState} from "react";
import {  Button, Container, Form, InputGroup,Row, Alert } from "react-bootstrap";
// import { GiTargetArrows } from "react-icons/gi";
import DashboardMenu from "./DashboardMenu";
import server from "../../variable";

export default function CreateUser() {
const [ErrorMSG,setErrorMSG] = useState(undefined)

   const UserName = useRef('')
   const Email = useRef('')
   const Password = useRef('')
   const Password2 = useRef('')
   const FirstName = useRef('')
   const LastName = useRef('')
   const [Gender , setGender] = useState('') 
   const Country = useRef('')
   const City = useRef('')
   const PostCode = useRef('')
   const Street = useRef('')
   const NumberOfStreet = useRef('')
   const getFormData = useRef()
   const genderRadio = (e) =>{
     setGender(e.target.value)
   }
   
    const AddNewUser = (e)=> {
        fetch(`${server}/Users/register`,{ 
       method:'POST',
       headers:{
           "Content-Type":"application/json"
       },
       body:JSON.stringify({
         "username": UserName.current.value,
         "Email": Email.current.value,
         "password": Password.current.value,
         "Password2": Password2.current.value,
         "FirstName": FirstName.current.value, 
         "LastName": LastName.current.value,
         "Gender":  Gender,
         "Country": Country.current.value,
         "City":City.current.value,
         "PostCode":PostCode.current.value,
         "Street":Street.current.value,
         "NumberOfStreet":NumberOfStreet.current.value
       })
   })
  .then(res=>res.json())
  .then(data=>{
        console.log(data.msg)
        setErrorMSG(data.msg)
  }) 
 }

 // pop up msg 
 const [show, setShow] = useState(true);




  return (
    <Container fluid className='mainContainer'>
                <Row>
         <DashboardMenu/>
</Row >
    
    < >
    {ErrorMSG !== undefined ? 
    ( ErrorMSG.map((err,index)=>    <div key={index}>
    {  show?  <Alert key={index} variant="danger" onClose={() => setShow(false)} dismissible>
 
         <Alert.Heading>{err.msg}</Alert.Heading>
         <div className="d-flex justify-content-end">
         {/* // <Button onClick={() => setShow(true)}>Show Alert</Button> */}
           
         </div>
       </Alert>:"" }
 
     </div>)):''
    }

    </>
      <Row md={2} className=' justify-content-center pt-5 '>
      <Form  
      onSubmit={(e)=>e.preventDefault()} 
       name={"user"} ref={getFormData}
       >

      <Form.Label aria-label="Name" >Username</Form.Label>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Username"
          aria-label="Name"
          aria-describedby="basic-addon1"
          required
          name="UserName"
          ref={UserName}
          autoComplete='name'

          
        />
      </InputGroup>
      <Form.Label>Email</Form.Label>

      <InputGroup className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          required
          name="Email"
          ref={Email}
          autoComplete='username'
        />
      </InputGroup>
      <Form.Label aria-label="Password" >Password</Form.Label>

<InputGroup className="mb-3">
  <Form.Control
    placeholder="Password"
    aria-label="Password"
    aria-describedby="basic-addon1"
    type="password"
    required
    name="Password"
    ref={Password}
    autoComplete='new-password'

    
  />
</InputGroup>
<Form.Label aria-label="Password2" >Repeat Password</Form.Label>

<InputGroup className="mb-3">
  <Form.Control
    placeholder="Repeat Password"
    aria-label="Password2"
    aria-describedby="basic-addon1"
    type="password"
    required
    name="Password2"
    ref={Password2}
    autoComplete='Repeat-password'

    
  />
</InputGroup>




      <Form.Label>FirstName</Form.Label>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="First Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          type="text"
          required
          name="FirstName"
          ref={FirstName}

        />
        </InputGroup>
    
      <Form.Label>Last Name</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Last Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="LastName"
          ref={LastName}

          
        />
      </InputGroup>

      <Form.Label aria-label="Name" >Gender</Form.Label>

      {/* <InputGroup className="mb-3">
        <Form.Control
          placeholder="Gender"
          aria-label="Name"
          aria-describedby="basic-addon1"
          required
          name="Gender"
         

          
        /> 
              </InputGroup > */}

         <InputGroup className="mb-3"   onChange={genderRadio } >
       <InputGroup.Text label="men" name='Gender' checked value='men' defaultChecked={true} >Men</InputGroup.Text>
        <InputGroup.Radio label="men" name='Gender'  value='men'/>
        
        <InputGroup.Text aria-label="woman" value='woman' name='Gender'>Woman</InputGroup.Text>
        <InputGroup.Radio aria-label="woman"  value='woman'  name='Gender'/>
       
      </InputGroup >




     
    
      <Form.Label aria-label="Name" >Country</Form.Label>

<InputGroup className="mb-3">
  <Form.Control
    placeholder="Country"
    aria-label="Country"
    aria-describedby="basic-addon1"
    required
    name="Country"
    ref={Country}

    
  />
</InputGroup>
<Form.Label aria-label="City" >City</Form.Label>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="City"
          aria-label="City"
          required
          name="City"
          ref={City}

          
        />
      </InputGroup>
      <Form.Label aria-label="Name" >Post Code</Form.Label>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Post Code"
          aria-label="Name"
          aria-describedby="basic-addon1"
          required
          name="Post Code"
          ref={PostCode}

          
        />
      </InputGroup>
      <Form.Label aria-label="Name" >Street</Form.Label>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Username"
          aria-label="Name"
          aria-describedby="basic-addon1"
          required
          name="Street"
          ref={Street}

          
        />
      </InputGroup>
      <Form.Label aria-label="Name" >Number Of Street</Form.Label>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Username"
          aria-label="Name"
          aria-describedby="basic-addon1"
          required
          name="NumberOfStreet"
          ref={NumberOfStreet}

          
        />
      </InputGroup>

      <Button type="submit" onClick={AddNewUser} >Upload</Button>
      </Form>
      </Row>
    </Container>
  );
}



  

