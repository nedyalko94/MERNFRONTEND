
import React, { useRef, useState } from "react";
import { Container, Form, InputGroup, Alert, Row, Col } from "react-bootstrap";
import server from "../variable";
// import { GiTargetArrows } from "react-icons/gi";

export default function Register() {
  const [ErrorMSG, setErrorMSG] = useState(undefined)
  const messageRef = useRef(null)

  // const getFormData = useRef()
  const UserName = useRef('')
  const Email = useRef('')
  const Password = useRef('')
  const Password2 = useRef('')

  const FirstName = useRef('')
  const LastName = useRef('')
  // const [Gender, setGender] = useState('')

  const Country = useRef('')
  const City = useRef('')
  const PostCode = useRef('')
  const Street = useRef('')
  const NumberOfStreet = useRef('')
  // const genderRadio = (e) => {
  //   setGender(e.target.value)
  // }
  const Gender = useRef('')


  const AddNewUser = (e) => {
    e.preventDefault()
    fetch(`${server}/Users/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": UserName.current.value,
        "Email": Email.current.value,
        "password": Password.current.value,
        "Password2": Password2.current.value,
        "FirstName": FirstName.current.value,
        "LastName": LastName.current.value,
        "Gender": Gender.current.value,
        "Country": Country.current.value,
        "City": City.current.value,
        "PostCode": PostCode.current.value,
        "Street": Street.current.value,
        "NumberOfStreet": NumberOfStreet.current.value
      })
    })
      .then(res => res.json())
      .then(data => {
        setShow(true)
        setErrorMSG(data.msg)
      })
      .then((e) => messageRef.current?.scrollIntoView({ behavior: 'smooth' }))
  }

  // pop up msg 
  const [show, setShow] = useState(true);




  return (
    <Container className='mainContainer ' fluid >
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={6} md={6} lg={6} xl={4} xxl={4} className=' bg-success rounded-4 mt-5 p-5 mb-4' >
          <div ref={messageRef} ></div>
          < >


            {ErrorMSG !== undefined ?
              ErrorMSG[0].msg !== undefined ?
                (
                  show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    {ErrorMSG.map((e, index) => (<Alert.Heading key={index}>{e.msg}</Alert.Heading>
                    ))}
                    <div className="d-flex justify-content-end">

                    </div>
                  </Alert> : ''


                ) : (
                  show ? <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    {ErrorMSG.map((e, index) => (<Alert.Heading key={index}>{e.message}</Alert.Heading>
                    ))}
                    <Alert.Heading>{ErrorMSG.message}</Alert.Heading>

                    <div className="d-flex justify-content-end">

                    </div>
                  </Alert> : ''


                )


              : null
            }
          </>
          <Form>
            {/* // onSubmit={(e)=> }  */}
            {/* name={"user"} ref={getFormData} */}

            <Form.Label aria-label="Name" >Username</Form.Label>

            <InputGroup className="mb-3 ">
              <Form.Control
                placeholder="Username"
                aria-label="Name"
                aria-describedby="basic-addon1"
                required
                name="UserName"
                ref={UserName}


              />
            </InputGroup>
            <Form.Label>Email</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Email"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                name="Email"
                type="email"
                ref={Email}
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
                autoComplete="new-password"


              />
            </InputGroup>
            <Form.Label aria-label="Password2" >Repeat Password</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Repeat Password"
                aria-label="Repeat Password"
                aria-describedby="basic-addon1"
                type="password"
                required
                name="Password2"
                ref={Password2}
                autoComplete="new-password"


              />
            </InputGroup>




            <Form.Label>FirstName</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="First Name"
                aria-label="First Name"
                type="text"
                required
                name="FirstName"
                ref={FirstName}

              />
            </InputGroup>

            <Form.Label  aria-label="Last Name" >Last Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Last Name"
                aria-label="Last Name"
                name="LastName"
                ref={LastName}


              />
            </InputGroup>

            <Form.Label aria-label="Name" >Gender</Form.Label>



            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Gender"
                aria-label="Gender"
                required
                name="Gender"
                ref={Gender}


              />
            </InputGroup>

            <Form.Label aria-label="Name" >Country</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Country"
                aria-label="Country"
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
            <Form.Label aria-label="Post Code" >Post Code</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Post Code"
                aria-label="Post Code"

                required
                name="Post Code"
                ref={PostCode}


              />
            </InputGroup>
            <Form.Label aria-label="Street" >Street</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Street"
                aria-label="Street"
                required
                name="Street"
                ref={Street}


              />
            </InputGroup>
            <Form.Label aria-label="Number of Street" >Number Of Street</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Number of Street"
                aria-label="Number of Street"
                required
                name="NumberOfStreet"
                ref={NumberOfStreet}


              />
            </InputGroup>

            <button type="submit" onClick={AddNewUser} className='button'><span></span><span></span><span></span><span></span>Register</button>
            {/* type="submit" */}
          </Form>
        </Col>
      </Row>

    </Container>
  );
}





