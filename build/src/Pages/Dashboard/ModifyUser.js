import React, { useRef, useState } from "react";
import {
  Popover,
  Button,
  Col,
  Container,
  Row,
  Table,
  OverlayTrigger,
  Form,
  InputGroup,
} from "react-bootstrap";
import DashboardMenu from "./DashboardMenu";
import server from "../../variable";

export default function ModifyUser({AdminGetAllUser, setAdminSortUserBy, setAdminInputSearchUser }) {
  const [AllUsers,setAllUsers] = useState(AdminGetAllUser)
  const [UserIdState,setUserId]= useState('')
  const UserId = (e)=> { return setUserId(e.target.id)}


  const UserName = useRef('')
  const Email = useRef('')
  const Password = useRef('')
  const Password2 = useRef('')
  const FirstName = useRef('')
  const LastName = useRef('')
  const Gender = useRef('') 
  const Country = useRef('')
  const City = useRef('')
  const PostCode = useRef('')
  const Street = useRef('')
  const NumberOfStreet = useRef('')
 const isAdmin=useRef(Boolean)
 const confirm = useRef(Boolean)

 const [Admin,setAdmin]= useState(false)
 const [Confirm,setConfirm]= useState(false)

 const checkAdmin = ()=>{ setAdmin(!Admin)}
 const checkConfirm = ()=>{setConfirm(!Confirm)}

  const Edit = async(e)=>{
    e.preventDefault()
    await fetch(`${server}/Users/Update/${UserIdState}`,{ 
      method:'PUT',
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
      "Gender":  Gender.current.value,
      "Country": Country.current.value,
      "City":City.current.value,  
      "PostCode":PostCode.current.value,
      "Street":Street.current.value,
      "NumberOfStreet":NumberOfStreet.current.value,
      "isAdmin":Admin,
      "confirm":Confirm
    })
})
.then(res=>res.json())
.then(data=>{
  setAllUsers(data.AllUsers)
    //  setErrorMSG(data.msg)
}) 
}




 
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Edit User</Popover.Header>
      <Popover.Body>
        <Container>
        <Row>    
        <form  onSubmit={(e)=>e.preventDefault()} >
        <input placeholder="UserName" name="username" className="mb-3 bg-light rounded-1"  ref={UserName} required></input>
        <input placeholder="Email" name="Email" className="mb-3 rounded-1" ref={Email} required ></input>
        <input placeholder="Password" name="password" className="mb-3 rounded-1" ref={Password} required></input>
        <input placeholder="Password" name="Password2" className="mb-3 rounded-1" ref={Password2} required></input>
        <input placeholder="FirstName" name="FirstName" className="mb-3 rounded-1" ref={FirstName} required ></input>
        <input placeholder="LastName" name="LastName" className="mb-3 rounded-1" ref={LastName} required></input> <br></br>
        <input placeholder="Gender" name="Gender" className="mb-3 rounded-1" ref={Gender} required></input>
        <input placeholder="Country" name="Country" className="mb-3 rounded-1" ref={Country} required></input>
        <input placeholder="City" name="City" className="mb-3 rounded-1" ref={City} required></input>
        <input placeholder="PostCode" name="PostCode" className="mb-3 rounded-1" ref={PostCode} required type='number'></input>
        <input placeholder="Street" name="Street" className="mb-3 rounded-1" ref={Street} required></input>
        <input placeholder="NumberOfStreet" name="NumberOfStreet" className="mb-3 rounded-1" ref={NumberOfStreet} required></input><br></br>
        <label for="isAdmin" className="fs-4"> Admin     </label>
        <input type="checkbox" id="isAdmin" name="isAdmin" className="mb-3 rounded-1 mx-2" ref={isAdmin} onChange={checkAdmin} required></input><br></br>
        <label for="confirm" className="fs-4">Confirm</label>
        <input type="checkbox" id="confirm" name="confirm" className="mb-3 rounded-1 mx-2" ref={confirm} onChange={checkConfirm} required></input><br></br>


        <Button onClick={Edit} type='submit' >Update</Button>
        </form> 
        </Row>
        </Container>
      </Popover.Body>
    </Popover> 
  );
  // search  by categories
  const FormSelect= (e)=>{ setAdminSortUserBy (e.target.value)}
  const getInputText = (e)=>{setAdminInputSearchUser (e.target.value)}
  const DeleteAll = async (e)=>{
    e.preventDefault()

    let res = await fetch(`${server}/Users/DeleteAll`, {
        method: 'DELETE'
})
    let data = await res.json();
    setAllUsers(data.AllUsers)
   } 

   const getDelete = async (e)=>{
    e.preventDefault()

    let res = await fetch(`${server}/Users/Delete/${e.target.id}`, {
        method: 'DELETE'
})
    let data = await res.json();
    setAllUsers(data.AllUsers)
} 

 

  return (
   
<Container fluid className='mainContainer'>
<Row>
      <DashboardMenu/>
</Row>
      <Row className="pt-5">         
         <Form.Label aria-label="Name" className="mt-4">Search</Form.Label>

        <Form className="d-flex " >
          <Col md={2}>
            <Form.Select onChange={FormSelect}  >
              <option value="username">User Name</option>
              <option value="email">Email</option>
              <option value="firstname">First Name</option>
              <option value="lastname">Last Name</option>
              <option value="gender">Gender</option>
              <option value="country">Country</option>
              <option value="city">City</option>
              <option value="postcode">Post Code</option>
             
            </Form.Select>
          </Col>
          <Col md={8}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search"
                aria-label="Name"
                aria-describedby="basic-addon1"
                required
                onChange={getInputText}
              />
            </InputGroup>
          </Col>
        </Form>
      </Row>
      <Row className="mt-4 d-flex" md={10}>
        <Table bordered responsive hover size="sm" variant="success"  >
          <thead>
            <tr >
              <th className="text-center" >ID</th>
              <th className="text-center"> UserName</th>
              <th className="text-center">Email</th>
              <th className="text-center">FirstName</th>
              <th className="text-center">LastName</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Country</th>
              <th className="text-center">City</th>
              <th className="text-center">PostCode</th>
              <th className="text-center">Street</th>
              <th className="text-center">NumberOfStreet</th>
              <th className="text-center">Delete / Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(AllProduct)} */}
            {AllUsers.map((e, index) => {
              return (
                <tr key={index}>
                  <td className="text-center" >{e._id}</td>
                  <td className="text-center">{e.username}</td>
                  <td className="text-center">{e.Email}</td>
                  <td className="text-center">{e.FirstName}</td>
                  <td className="text-center">{e.LastName}</td>
                  <td className="text-center">{e.Gender}</td>
                  <td className="text-center">{e.Country}</td>
                  <td className="text-center"> {e.City}</td>
                  <td className="text-center">{e.PostCode}</td>
                  <td className="text-center">{e.Street}</td>
                  <td className="text-center">{e.NumberOfStreet}</td>
                  <td >
                    <Button className="bg-danger" onClick={getDelete} id={e._id} >Delete</Button>
                    <OverlayTrigger 
                      trigger="click"
                      placement="bottom" 
                      overlay={popover}
                      rootClose
                    >
                      <Button variant="success" className="mx-2" onClick={UserId} id ={e._id}>Edit</Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button className="bg-danger" onClick={DeleteAll}>Delete All</Button>
        </Col>
      </Row>


  



</Container>
  )
          }
