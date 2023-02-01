import React, {useRef, useState } from "react";
import {  Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import DashboardMenu from "./DashboardMenu";
import server from "../../variable";
import {storage} from '../../firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'





export default function CreateProduct( ) {
  const [Image,setImage] = useState(null)
  // const [Url, setUrl] = useState(null)
  // const formRef = useRef({})

  const [ImagesArray,setImagesArray]= useState([])
  const Name =useRef()
  const Brand=useRef()
  const CountOfStock=useRef()
  const Categories=useRef()
  const Description=useRef()
  const Price=useRef()
  const Rating=useRef()
  const NumberOfVote=useRef()

  const handleImageChange = async(e)=>{
    // console.log(e.target.files)
    if (e.target.files[0]){
      setImage(e.target.files[0])
    }
  }
  const handleSubmit=()=>{


    // const storageRef = ref(storage, 'some-child');
    // // no time to waste with this type of array 
    // const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
    // uploadBytes(storageRef, bytes).then((snapshot) => {
    //   console.log('Uploaded an array!');
    // });

    const imageRef = ref(storage, "aAa"+Image.lastModifiedDate) 
    
      uploadBytes(imageRef,Image).then((e)=>{ 
        getDownloadURL(imageRef).then((url)=>{ 
          setImagesArray([...ImagesArray,url])

        })
        .catch((err)=>{console.log(err,"error message getDownloadURL")})
        setImage(null)
      })
      .catch((err)=>{console.log(err,"error message   uploadBytes ")})

    

  }






  const AddNewProduct = async(e,index) => {
    // e.preventDefault()


    if( Name.current.value ===''|| Brand.current.value ===''||CountOfStock.current.value===''|| Categories.current.value===''|| Description.current.value===''||
 Price.current.value===''|| Rating.current.value===''|| NumberOfVote.current.value===''|| ImagesArray.length===0 ){return}

    //! with form data and multer 
    // const formData = new FormData(formRef.current)
    //  await fetch(`${server}/Product/AddProduct`,{  
    //   method:'POST',
    //   body:formData,
    // })
    // .then(res => res.json()) 
    // .then(data => alert(data.msg)) 
    //   .catch((err)=>{
    //     alert(err.msg)       
    //   })    


    await fetch(`${server}/Product/AddProduct`,{ 
      method:'POST',
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "Name": Name.current.value,
        "Brand": Brand.current.value,
        "CountOfStock": CountOfStock.current.value,
        "Categories": Categories.current.value,
        "Description": Description.current.value, 
        "Price": Price.current.value,
        "Rating":  Rating.current.value,
        "NumberOfVote": NumberOfVote.current.value,
        "Picture":ImagesArray
      })
  })
 .then(res=>res.json())
//  .then(data=>{
//        console.log(data)
//       //  setErrorMSG(data.msg)
//  }) 


   }
  return (
    <Container fluid className='mainContainer'>
        <Row>
         <DashboardMenu/>
</Row>
<Row md={2} className='justify-content-center pt-5'>
{/* ref={formRef} encType={'multipart/form-data'} */}
      <Form    >
      {/* onSubmit={(e) => e.preventDefault()} */}
        <Form.Label >Product Name</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Name Of The Product"
            aria-label="Name"
            name="Name"
            required={true} 
            ref={Name}
          />
        </InputGroup>
        <Form.Label >Product Brand</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Brand"
            aria-label="Brand"
            name="Brand"
            required={true}
            ref={Brand}

          />
        </InputGroup>
{/* {        console.log(Url)}  */}
       <Form.Label>Product CountOfStock</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Number of stock"
            aria-label="Recipient's username"
            type='number'
            name="CountOfStock"
            required={true}
            ref={CountOfStock}


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
            ref={Categories}

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
            ref={Description}

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
            ref={Price}

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
            ref={Rating}

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
            ref={NumberOfVote}

          />
        </InputGroup>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Picture of te Product</Form.Label>
          <Form.Control
            type="file"
            name="Picture" 
            required={true}
            multiple
            onChange={handleImageChange}

            />
        </Form.Group>

        <Form.Group className="position-relative mb-3">

        <Button onClick={handleSubmit}>Upload Photo</Button>

        </Form.Group >
        <div className="m-3">Wait to be Upload link will be display on Bottom</div>
        {ImagesArray.length!==0? ImagesArray.map((e,index)=>
          (<div><a href={e} className="m-3" key={index}>link {index}</a></div>))
        :<div>no link for now</div>}

        {/* handleSubmit */}
        {/* AddNewProduct */}
        
        <Button type="submit" onClick={AddNewProduct} className='button' ><span></span><span></span><span></span><span></span>Upload</Button>
       
      </Form>
      
      {/* {console.log(ImagesArray)} */}

      </Row>
    </Container> 
  ); 
}    