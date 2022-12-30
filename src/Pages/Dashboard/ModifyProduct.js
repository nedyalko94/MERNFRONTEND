import React, { useEffect, useRef, useState} from "react";
import { Popover, Button, Col, Container, Row,Table, OverlayTrigger, Form,InputGroup,} from "react-bootstrap";
import DashboardMenu from "./DashboardMenu";
import server from "../../variable";

export default function ModifyProduct({ AdminGetAllProduct,setAdminCategoriesQueryProduct,setAdminInputSearchProduct }) {

  const [editId,setEditId]= useState('')
  const formRef = useRef({})
  const SearchInput = (e)=>{setAdminInputSearchProduct(e.target.value)}
  const FormSelect= (e)=>{ setAdminCategoriesQueryProduct(e.target.value)}
  const getEditId = (e)=> setEditId(e.target.id)


  useEffect(()=>{

  },[])
  
    const getDelete = async (e)=>{
        let res = await fetch(`${server}/Product/DeleteProduct/${e.target.id}`, {
            method: 'DELETE'
    })
        let data = await res.json();
        alert(data.msg)
    } 
    const DeleteAll = async ()=>{
      let res = await fetch(`${server}/Product/DeleteAll`, {
          method: 'DELETE'
  })
      let data = await res.json();
      alert(data.msg)
     } 

     const Edit = async(e) => {
      e.preventDefault()
    
  
      const formData = new FormData(formRef.current)
      
       await fetch(`${server}/Product/UpdateProduct/${editId}`,{
        method:'PUT',
        body:formData,
      })
      .then(res=>res.json())
      .then(data=>alert(data.msg))


        .catch((err)=>{
          console.log(err.msg)       
        })    
     }
     const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Edit Product</Popover.Header>
        <Popover.Body>
          <Container>
          <Row>      
          <form encType={'multipart/form-data'}  ref={formRef}>
          <input placeholder="Name" name="Name" className="mb-1 rounded-1"  required></input>
          <input placeholder="Brand" name="Brand" className="mb-1 rounded-1"required ></input>
          <input placeholder="CountOfStock" name="CountOfStock" className="mb-1 rounded-1"required ></input>
          <input placeholder="Categories" name="Categories" className="mb-1 rounded-1"required></input>
          <input placeholder="Description" name="Description" className="mb-1 rounded-1"required></input>
          <input placeholder="Price" name="Price" className="mb-1 rounded-1"required></input>
          <input placeholder="Rating" name="Rating" className="mb-1 rounded-1"required></input>
          <input placeholder="NumberOfVote" name="NumberOfVote" className="mb-1 rounded-1"required></input>
          <input placeholder="Picture	" name="Picture" className="mb-1 rounded-1"required type='file'multiple></input>
          <Button onClick={Edit} type='submit' >Update</Button>
          </form> 
          </Row>
          </Container>
        </Popover.Body>
      </Popover>
  
  
  
    );


  return (
    <Container fluid={true} className='mainContainer '>
         <Row>
      <DashboardMenu/>
</Row>

      <Row className="pt-5">         
         <Form.Label aria-label="Name" className="mt-4">Search</Form.Label>

        <Form className="d-flex ">
          <Col md={2}>
            <Form.Select onChange={FormSelect} >
              <option value="name">Name</option>
              <option value="categories">Categories</option>
              <option value="brand">Brand</option>
             
            </Form.Select>
          </Col>
          <Col md={8}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search"
                aria-label="Name"
                aria-describedby="basic-addon1"
                required
                onChange={SearchInput}
              />
            </InputGroup>
          </Col>
        </Form>
      </Row>
      <Row >
        <Col >
        <Table bordered responsive hover size="sm" variant="success">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Brand</th>
              <th className="text-center">CountOfStock</th>
              <th className="text-center">Categories</th>
              <th className="text-center">Description</th>
              <th className="text-center">Price</th>
              <th className="text-center">Rating</th>
              <th className="text-center">NumberOfVote</th>
              <th className="text-center">Delete / Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(AllProduct)} */}
            {AdminGetAllProduct.map((e, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{e._id}</td>
                  <td className="text-center">{e.Name}</td>
                  <td className="text-center">{e.Brand}</td>
                  <td className="text-center">{e.CountOfStock}</td>
                  <td className="text-center">{e.Categories}</td>
                  <td className="text-center">{e.Description}</td>
                  <td className="text-center">{e.Price}</td>
                  <td className="text-center">{e.Rating}</td>
                  <td className="text-center">{e.NumberOfVote}</td>
                  <td className=" modify-button  ">
                    <div className=" modify-button">
                    <Button className="bg-danger" id={e._id} onClick={ getDelete  }  >Delete</Button>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      overlay={popover}
                      id={e._id}
                      rootClose
                    >
                       <Button className="btn bg-success my-2 px-4" onClick={getEditId}  id={e._id}>Edit</Button>
                    </OverlayTrigger>
                    </div>
                  </td> 
                </tr>
              );
            })}
          </tbody>
        </Table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button className="bg-danger" onClick={DeleteAll}>Delete All</Button>
        </Col>
      </Row>
    </Container>
  );
}
