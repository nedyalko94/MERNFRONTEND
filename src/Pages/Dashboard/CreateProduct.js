import React, {   useRef } from "react";
import {  Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import DashboardMenu from "./DashboardMenu";
import server from "../../variable";





export default function CreateProduct( ) {



  const formRef = useRef({})

  const AddNewProduct = async(e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)
     await fetch(`${server}/Product/AddProduct`,{
      method:'POST',
      body:formData,
    })
    .then(res => res.json()) 
    .then(data => alert(data.msg)) 
      .catch((err)=>{
        alert(err.msg)       
      })    
   }
  return (
    <Container fluid className='mainContainer'>
        <Row>
         <DashboardMenu/>
</Row>
<Row md={2} className='justify-content-center pt-5'>

      <Form  ref={formRef} encType={'multipart/form-data'} onSubmit={(e) => e.preventDefault()} >
        <Form.Label >Product Name</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Name Of The Product"
            aria-label="Name"
            name="Name"
            required={true} 
          />
        </InputGroup>
        <Form.Label >Product Brand</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Brand"
            aria-label="Brand"
            name="Brand"
            required={true}
          />
        </InputGroup>
        <Form.Label>Product CountOfStock</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Number of stock"
            aria-label="Recipient's username"
            type='number'
            name="CountOfStock"
            required={true}

          />
        </InputGroup>
        {/* <Form.Label>Existing Product Categories</Form.Label>
      <Form.Select >
        <option >Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select> */}
        <Form.Label aria-label="New Product Categories">Create new Product Categories</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="New Product Categories"
            aria-label="New Product Categories"
            name="Categories"
            required={true}

          />
        </InputGroup>
        <Form.Label aria-label="Description">Product Description</Form.Label>
        <InputGroup>
          <Form.Control 
            as="textarea"
            aria-label="Description"
            placeholder="Description"
            name="Description"
            required={true}

          />
        </InputGroup>
        <Form.Label  aria-label="Product Price">Product Price</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Price"
            aria-label="Product Price"
            name="Price"
            type='number'
            required={true}

          />
        </InputGroup>
        <Form.Label>Rating</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Rating"
            aria-label="Recipient's username"
            name="Rating"
            type='number'
            required={true}

          />
        </InputGroup>
        <Form.Label >NumberOfVote</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="NumberOfVote"
            aria-label="NumberOfVote"
            name="NumberOfVote"
            type='number'
            required={true}

          />
        </InputGroup>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Picture of te Product</Form.Label>
          <Form.Control
            type="file"
            name="Picture" 
            required={true}
            multiple

            />
            
        </Form.Group>

  
        
        
        <Button type="submit" onClick={AddNewProduct} className='button' ><span></span><span></span><span></span><span></span>Upload</Button>
      </Form>
     
      </Row>
    </Container> 
  ); 
}    