import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import server from '../variable'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useTheme } from '../Context/ColorMode'
import { UserContexts } from '../App';



export default function ProductDetail() {

  const { id } = useParams()
  const [ProductId, setProductId] = useState({})
  const [Pictures, setPictures] = useState([])
  const [GetTotalPrice, setGetTotalPrice] = useState()
  const [ClientID, setClientID] = useState('')
  const style = { "layout": "vertical" };
  const [GetPic, setGetPic] = useState('')
  const [Quantity, setQuantity] = useState(1)
  const [GetComments, setGetComments] = useState([])
  const Comment = useRef('')
  const user = useContext(UserContexts)
  const [ReplyState, setReplyState] = useState([])
  const ResponseComment = useRef()
  const [SeeResponses, setSeeResponses] = useState(false)



  const darkTheme = useTheme()
  const themeStyle = {
    backgroundColor: darkTheme ? '#333 ' : '#f6f6f6',
    color: darkTheme ? '#f6f6f6' : '#333',
  }

  const ButtonStyle = {
    backgroundColor: darkTheme ? '#f6f6f6' : '#333 ',
    color: darkTheme ? '#333' : '#f6f6f6',
  }
  const Reply = (e) => {
    if (!user) { return }
    console.log(e.target.id)
    if (ReplyState[1] === false) {
      setReplyState([e.target.id, true])
    } else {
      setReplyState([e.target.id, false])

    }

  }
  useEffect(() => {
    async function getByName() {
      let res = await fetch(`${server}/Product/${id}`)
      let data = await res.json()
      setPictures(data.Picture)
      setProductId(data)
    }
    getByName()
  }
    , [id])


  const Change = (e) => {
    setGetPic(e.target.src)
  }
  let arr = []

  for (let n of Pictures) {
    let baseUrl = `${server}/`
    arr.push(baseUrl + n)
  }




  let stockCount = []
  const stock = ProductId.CountOfStock

  for (let i = 1; i <= stock; i++) {
    stockCount.push(i)
  }



  const FormSelect = (e) => { setQuantity(e.target.value) }

  useEffect(() => {

    const TotalPrice = () => {
      const total = ProductId.Price * Quantity
      setGetTotalPrice(total)
    }
    TotalPrice()

  }, [Quantity, ProductId.Price])


  // paypal



  useEffect(() => {
    const payID = async () => {
      let res = await fetch(`${server}/PayPalClientID`)
      let data = await res.json()
      setClientID(data.paypalClientId)


    }
    payID()


  }, [])

  const AddToCard = (e) => {

    if (!localStorage.getItem("shoppingCard")) {
      localStorage.setItem('shoppingCard', JSON.stringify([ProductId]))
    } else {
      let shoppingStorage = JSON.parse(localStorage.getItem("shoppingCard"))
      let checkThis = shoppingStorage.filter((e) => { return e._id === ProductId._id })
      if (checkThis.length > 0) {
        return
      }
      else {
        shoppingStorage.push(ProductId)
      }
      localStorage.setItem('shoppingCard', JSON.stringify(shoppingStorage))
      console.log(shoppingStorage)
    }

  }

  const AddToWishlist = (e) => {
    // check if Wishlist exist if don't exist // create && push in instantly
    if (!localStorage.getItem("Wishlist")) {
      localStorage.setItem('Wishlist', JSON.stringify([ProductId]))
    } else {
      let shoppingStorage = JSON.parse(localStorage.getItem("Wishlist"))
      // check if the product already exist in the list 
      let checkThis = shoppingStorage.filter((e) => { return e._id === ProductId._id })

      if (checkThis.length > 0) {
        return
      } else {
        shoppingStorage.push(ProductId)
      }


      localStorage.setItem('Wishlist', JSON.stringify(shoppingStorage))
      console.log(shoppingStorage)
    }


  }

  const PostComment = async () => {
    if (Comment.current.value === '') { return }
    await fetch(`${server}/Product/Comments/${id}`, {

      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "product_id": id,
        "user_id": user ? user._id : '',
        "username": user.username,
        "comment": Comment.current.value,
        "child_of": null
      })
    })
      .then(res => res.json())
      .then(result => {
        let comment = result.comment
        let rotatedComment = []
        for (let i = comment.length - 1; i >= 0; i--) {
          rotatedComment.push(comment[i])
          //    console.log(arr)

        }
        return setGetComments(rotatedComment)
      }


      )
  }

  const ReplyComment = async (e) => {
    if (ResponseComment.current.value === '') { return }
    // console.log(e.target.id)
    await fetch(`${server}/Product/Comments/${id}`, {

      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "product_id": id,
        "user_id": user ? user._id : '',
        "username": user ? user.username : '',
        "comment": ResponseComment.current.value,
        "child_of": e.target.id
      })
    }).then(() => setReplyState(['', false])
    )

  }





  useEffect(() => {
    const getComment = async () => {
      let res = await fetch(`${server}/Product/getComments/${id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        }
      })
      let data = await res.json()
      //  console.log(data.comment.length)
      let comment = data.comment
      let rotatedComment = []
      for (let i = comment.length - 1; i >= 0; i--) {
        rotatedComment.push(comment[i])
        //    console.log(arr)

      }
      // console.log(rotatedComment)

      data.comment.length === 0 ? setGetComments(undefined) : setGetComments(rotatedComment)


    }
    getComment()


  }, [GetComments, id])

  // useEffect(()=>{

  //   const rotateComment = function(GetComments, k) {
  //     let newComment = GetComments
  //     for (let i = 0; i < k; i++) {
  //       newComment.unshift(newComment.pop());
  //     }

  //     return setGetComments(newComment);
  //   }
  //   rotateComment()


  // },[])

  const CommentResponses = (e) => {
    if (SeeResponses[1] === false) {
      setSeeResponses([e.target.id, true])
    } else {
      setSeeResponses([e.target.id, false])
    }
  }


  return (





    <Container fluid className='mainContainer' style={themeStyle}>
      <Row>
        <Col md={5} >
          <Row>
            <Col className='m-0 p-0' md={11} sm={11} xs={12}>
              <div className="bg-light" >
                <img
                  style={{ maxHeight: "40vh", minHeight: "20vh" }}
                  className="d-flex  w-100 rounded-1"
                  src={GetPic || arr[0]}
                  alt="First img"


                />
              </div>
            </Col>
            <Col md={1} sm={1} xs={2} className='m-0 p-0'  >
              <div className="bg-light d-flex w-100 flex-sm-column ">
                {arr !== undefined ? (arr.map((arr, index) =>
                  <img key={index}
                    style={{ maxHeight: "10vw", minHeight: "3vw" }}

                    className="d-flex 
                     w-100  imgCol  border-3"
                    src={arr}
                    alt="First img"
                    onMouseOver={Change}


                  />

                )) : ''}

              </div>

            </Col>
          </Row>
        </Col>
        <Col md={4} className='d-flex flex-column justify-content-start align-items-end'>



          <h3> {ProductId.Categories} {ProductId.Brand} {ProductId.Name}</h3>
          <div >{ProductId.Description}
          </div>






        </Col>
        <Col className='d-flex flex-column justify-content-start align-items-end mt-4 mr-2  rounded-2'>
          <h3>Price</h3>
          <h5>{ProductId.Price} euro</h5>
          <div className='d-flex flex-column justify-content-start align-items-end' >

            <button className=' mt-3 detailButton' style={ButtonStyle} onClick={AddToCard}>Add To Card</button>
            <button className=' mt-3 detailButton' style={ButtonStyle} onClick={AddToWishlist}>Add As Wish</button>
            <div className="mt-3">  Amount</div>
            <Form.Select onChange={FormSelect} className='mb-3'>
              {stockCount.map((e, index) => (<option value={e} key={index}>{e}</option>))}
            </Form.Select>



            {ClientID !== '' ? <PayPalScriptProvider options={{ "client-id": ClientID, currency: "EUR", }}>
              <PayPalButtons
                style={style}
                forceReRender={[GetTotalPrice]}
                disabled={false}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: GetTotalPrice,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  // const name = details.payer.name.given_name;
                  // console.log(details)
                  const info = async () => {
                    await fetch(`${server}/onApprove`, {

                      method: 'POST',
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        "PaymentDetail": details,
                        "NumberOfProduct": Quantity,
                        "Product": ProductId,
                        "user": user ? user : '',
                        "user_id": user ? user._id : ''


                      })
                    })
                      .then(res => res.json())
                      .then(result => console.log(result))
                  }
                  info()
                }
                }

              />
            </PayPalScriptProvider> : 'Payment System can\'t be found'}


          </div>



        </Col>

      </Row>
      <Row>




      </Row>

      {/*----------------------- Comments---------------------------------- */}
      <Container fluid >

        {user !== undefined ? <Row > <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>

          <h4 className='pt-1 pb-1 px-1'>{user.username}</h4>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" placeholder='comment' rows={2} ref={Comment} required={true} />
          </Form.Group>

        </Col>
          <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2} className='d-flex d-flex-column justify-content-start align-items-end mb-4'>
            <Button onClick={PostComment}>POST</Button> </Col>

        </Row> : ''}



        {/* map comment && check if they are child */}
        {GetComments !== undefined ? GetComments.map((comment, index) => comment.child_of !== null ? '' :
          (<div>
            <Row key={index} className='pb-1'>
              <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className='pb-2  border border-4 rounded-2 mb-2' key={index}>
                <div className='d-flex justify-content-between '>
                  <h4 className='pt-3 pb-3 px-3'>{comment.username}</h4>
                  {comment.verifiedBuyer === true ? <span>Verified Buyer</span> : ''}
                </div>
                <div>{comment.comment} </div>

                <div className='mx-1 my-2 d-flex justify-content-between'>
                  <div>
                  <button className='border border-0  px-2 py-0 fs-6' onClick={Reply} id={index}>Reply</button>
                  {/* response button */}
                  {GetComments.map(e => e.child_of).includes(comment._id) ?
                    <button className='border border-0' onClick={CommentResponses} id={index}>
                      
                       {GetComments.filter(e => e.child_of == comment._id).length} response </button> : ''}
                      </div>
                  <span>{comment.Last_Update !== null ?
                    "Last Update " +
                    new Date(comment.Last_Update).toLocaleString('nl-BE', { day: '2-digit', month: 'long', year: 'numeric' }) :
                    "comment at " +
                    new Date(comment.CommentAt).toLocaleString('nl-BE', { day: '2-digit', month: 'long', year: 'numeric' })
                  }</span>
                </div>
              </Col>
            </Row>
            {/* responses map */} 
            {Number(SeeResponses[0]) === Number(index) && SeeResponses[1] === true ?

              GetComments.map((e, index) => e.child_of !== comment._id ? '' : <Row key={index + "res"} className='pb-1 mx-4'>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className='pb-2  border border-4 rounded-2 mb-2' key={index}>
                  <div className='d-flex justify-content-between '>
                    <h4 className='pt-3 pb-3 px-3'>{e.username}</h4>
                    {e.verifiedBuyer === true ? <span>Verified Buyer</span> : ''}
                  </div>
                  <div>{e.comment} </div>

                  <div className='mx-1 my-2 d-flex justify-content-between'>
                    <div>
                    {/* <button className='border border-0  px-2 py-0 fs-6'onClick={Reply} id={index}>Reply</button> */}
                    {/* { GetComments.map((e,index)=>e.child_of).includes(comment._id)? 
                   <button key={index} className='border border-0' onClick={CommentResponses}>
                      responses {GetComments.filter(e=>e.child_of ==comment._id).length} </button>:''} */}
                    </div>
                    <span>{comment.Last_Update !== null ?
                      "Last Update " +
                      new Date(comment.Last_Update).toLocaleString('nl-BE', { day: '2-digit', month: 'long', year: 'numeric' }) :
                      "comment at " +
                      new Date(comment.CommentAt).toLocaleString('nl-BE', { day: '2-digit', month: 'long', year: 'numeric' })

                    }</span>
                  </div>
                </Col>
              </Row>) : ''
            }
            {/* open response Form on click if the state is true && id match with button index */}
            {Number(ReplyState[0]) === Number(index) && ReplyState[1] === true ?
              <Row >

                <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <h4 className='pt-1 pb-1 px-1'>{user.username}</h4>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" placeholder='comment' rows={2} ref={ResponseComment} required={true} />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2} className='d-flex d-flex-column justify-content-start align-items-end mb-4'>
                  <Button onClick={ReplyComment} id={comment._id}>Reply</Button>
                  <Button onClick={(e) => setReplyState([index, false])} className='mx-2'>Cancel</Button></Col>
              </Row>


              : ''}</div>)
        ) : ''}


      </Container>
    </Container>
  )
}
