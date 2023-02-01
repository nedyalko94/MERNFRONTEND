import React, { useEffect, useRef, useState} from "react";
import { Popover, Button, Col, Container, Row,Table, OverlayTrigger, Form,InputGroup,} from "react-bootstrap";
import DashboardMenu from "./DashboardMenu";
import server from "../../variable";
import {storage} from '../../firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
// import {deleteObjectfromStorage} from '../../firebase'

export default function ModifyProduct({ AdminGetAllProduct,setAdminCategoriesQueryProduct,setAdminInputSearchProduct }) {

  const [editId,setEditId]= useState('')
  const formRef = useRef({})
  const SearchInput = (e)=>{setAdminInputSearchProduct(e.target.value)}
  const FormSelect= (e)=>{ setAdminCategoriesQueryProduct(e.target.value)}
  const getEditId = (e)=> setEditId(e.target.id)
  const [Image,setImage] = useState(null)
  const [Product,setProduct] = useState(AdminGetAllProduct)

  // const [Url, setUrl] = useState(null)
  // const formRef = useRef({})
  // const formData = new FormData(formRef.current)


  const [ImagesArray,setImagesArray]= useState([])
  const Name =useRef()
  const Brand=useRef()
  const CountOfStock=useRef()
  const Categories=useRef()
  const Description=useRef()
  const Price=useRef()
  const PromoPrice = useRef()
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
        // console.log(e)
        getDownloadURL(imageRef).then((url)=>{ 
          setImagesArray([...ImagesArray,url])
          // setUrl(url)

        })
        .catch((err)=>{console.log(err,"error message getDownloadURL")})
        setImage(null)
      })
      .catch((err)=>{console.log(err,"error message   uploadBytes ")})

    

  }


  useEffect(()=>{

  },[])
  
    const getDelete = async (e)=>{
      e.preventDefault()

      // let imageForDeletion = AdminGetAllProduct.filter(e=>e===e.target.id)
      // const imageRef = ref(storage,imageForDeletion[0].Picture ) 
      // deleteObjectfromStorage(imageRef).then(()=>{
      //   console.log('file deleted')
      // }).catch((err)=>{
      //   console.log('err with file deletion')
      // })
      // aAaWed%20Dec%2028%202022%2010%3A43%3A12%20GMT%2B0100%20(Централноевропейско%20стандартно%20време)

        let res = await fetch(`${server}/Product/DeleteProduct/${e.target.id}`, {
            method: 'DELETE'
    })
        let data = await res.json();
        setProduct(data.data)
    } 
    const DeleteAll = async (e)=>{
      e.preventDefault()

      let res = await fetch(`${server}/Product/DeleteAll`, {
          method: 'DELETE'
  })
      let data = await res.json();
      setProduct(data.data)
     } 
 
     const EditProduct = async(e) => {
      // e.preventDefault()
    
      
      
       await fetch(`${server}/Product/UpdateProduct/${editId}`,{
        method:'PUT',
        // body:formData,
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
        "PromoPrice": PromoPrice.current.value, 
        "Rating":  Rating.current.value,
        "NumberOfVote": NumberOfVote.current.value,
        "Picture":ImagesArray
      })
      })
      .then(res=>res.json())
      .then(data=>setProduct(data.data))
      // .then(data=>setProduct(data.data))


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
          <div className="m-1">Wait to be Upload </div>
          <div className="m-1">link will be display Here</div>
         {ImagesArray.length!==0? ImagesArray.map((e,index)=>
          (<div><a href={e} className="m-3" key={index}>link {index}</a></div>))
        :<div>no link for now</div>}
          <input placeholder="Name" name="Name" className="mb-1 rounded-1"  required ref={Name}></input>
          <input placeholder="Brand" name="Brand" className="mb-1 rounded-1"required ref={Brand}></input>
          <input placeholder="CountOfStock" name="CountOfStock" className="mb-1 rounded-1"required ref={CountOfStock} type='number'></input>
          <input placeholder="Categories" name="Categories" className="mb-1 rounded-1"required ref={Categories}></input>
          <textarea placeholder="Description"  name="Description" className="mb-1 rounded-1"required ref={Description}/>
          <input placeholder="Price" name="Price" className="mb-1 rounded-1"required ref={Price}></input>
          <input placeholder="PromoPrice" name="PromoPrice" className="mb-1 rounded-1"required ref={PromoPrice}></input>
          <input placeholder="Rating" name="Rating" className="mb-1 rounded-1"required ref={Rating}></input>
          <input placeholder="NumberOfVote" name="NumberOfVote" className="mb-1 rounded-1"required ref={NumberOfVote}></input>
          <input placeholder="Picture	" name="Picture" className="mb-1 rounded-1"required onChange={handleImageChange} type='file'></input>
          {/* multiple */}
          <Button onClick={handleSubmit}  className='m-3'>Upload Single Image</Button>
          <Button onClick={EditProduct} className='m-3'  >Update</Button>
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
            {Product.map((e, index) => {
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
