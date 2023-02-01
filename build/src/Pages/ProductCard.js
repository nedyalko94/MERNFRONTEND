import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
// import { VscStarFull, VscStarHalf, VscStarEmpty } from "react-icons/vsc";
import { GiShoppingCart } from "react-icons/gi";
// , GiSwipeCard 
import { RiHeartAddFill, RiHeartAddLine } from "react-icons/ri";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdCard } from "react-icons/io";
import { Link } from "react-router-dom";
import server from "../variable";
import { UserContexts } from "../App";
import Rating from '@mui/material/Rating';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'


export default function ProductCard({ Product }) {

  const [Icon, SetIcon] = useState(true);
  const [Icon1, SetIcon1] = useState(true);
  const [AlreadyInCard, setAlreadyInCard] = useState(false)
  const [AlreadyInWish, setAlreadyInWish] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const user = useContext(UserContexts)


  const [value, setValue] = useState(2);
  const [AlreadyVote, setAlreadyVote] = useState(false)

  const SubmitVote = (e) => {
    e.preventDefault()
    fetch(`${server}/Product/vote`, {

      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "product": Product,
        "user": user,
        "value": value
      })
    })
      .then(res => res.json())
    // .then(data => console.log(data))
    // i got msg from back end but is onClick ...

  }



  useEffect(() => {
    if (user) {
      const vote_check = () => {
        fetch(`${server}/Product/vote_check`, {

          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "product": Product,
            "user": user,
            "value": value
          })
        })
          .then(res => res.json())
          .then(data => setAlreadyVote(data.vote))
        //console.log(data),
      }
      vote_check()

    } else {
      // console.log('no user')
      setAlreadyVote(false)
    }



  }, [Product, user, value])
  //Product, user, value




  const shoppingCard = (e) => {

    if (!localStorage.getItem("shoppingCard")) {
      localStorage.setItem('shoppingCard', JSON.stringify([Product]))
    } else {
      let shoppingStorage = JSON.parse(localStorage.getItem("shoppingCard"))
      let SingleMatch = shoppingStorage.filter((e) => { return e._id === Product._id })
      let allThatDonTMatch = shoppingStorage.filter((e) => { return e._id !== Product._id })
      if (SingleMatch.length > 0) {
        if (AlreadyInCard === true) {
          setAlreadyInCard(false)
          localStorage.setItem('shoppingCard', JSON.stringify(allThatDonTMatch))
        } else {
          setAlreadyInCard(true)

        }
      }
      else {
        setAlreadyInCard(true)
        shoppingStorage.push(Product)
        localStorage.setItem('shoppingCard', JSON.stringify(shoppingStorage))
      }


    }

  }


  useEffect(() => {
    const checkForWishlist = () => {
      if (!localStorage.getItem("Wishlist")) {
        return
      }
      const Wishlist = JSON.parse(localStorage.getItem("Wishlist"))
      let checkThis = Wishlist.filter((e) => { return e._id === Product._id })
      if (checkThis.length > 0) { setAlreadyInWish(true) }

    }
    checkForWishlist()
  }, [Product._id])

  useEffect(() => {
    const checkForCard = () => {
      if (!localStorage.getItem("shoppingCard")) {
        return
      }
      const Card = JSON.parse(localStorage.getItem("shoppingCard"))
      let checkThis = Card.filter((e) => { return e._id === Product._id })
      if (checkThis.length > 0) { setAlreadyInCard(true) }

    }
    checkForCard()
  }, [Product._id])




  //add to wish list with on click 
  const shoppingWishlist = (e) => {
    // check if Wishlist exist if don't exist // create && push in instantly
    if (!localStorage.getItem("Wishlist")) {
      localStorage.setItem('Wishlist', JSON.stringify([Product]))
    } else {
      let shoppingStorage = JSON.parse(localStorage.getItem("Wishlist"))
      // check if the product already exist in the list 
      let SingleMatch = shoppingStorage.filter((e) => { return e._id === Product._id })
      let allThatDonTMatch = shoppingStorage.filter((e) => { return e._id !== Product._id })

      if (SingleMatch.length > 0) {
        if (AlreadyInWish === true) {
          setAlreadyInWish(false)
          localStorage.setItem('Wishlist', JSON.stringify(allThatDonTMatch))


        } else { setAlreadyInWish(true) }

        return
      } else {
        shoppingStorage.push(Product)
        setAlreadyInWish(true)
      }


      localStorage.setItem('Wishlist', JSON.stringify(shoppingStorage))
      //  console.log(shoppingStorage)
    }
  }
  const SendData = async () => {
    fetch(`${server}/Product/visit`, {

      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "product": Product,
        "product_id": Product._id,
        "visits": 1,

      })
    })
      .then(res => res.json())
      .then(data => console.log(data))

  }

  return (

    <Card key={Product._id} className="m-3 z-index-1 text-dark" style={{ minHeight: "40vh" }}> 
      <Link to={`/${Product._id}`} onClick={SendData}>
        <Card.Img variant="top" style={{ height: "20vh",padding:"15px",objectFit:"contain" }} src={`${Product.Picture[0]}`} alt="no image" />
        {/* src={`${server}/${Product.Picture[0]}`} */}
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="CardTittle" >{Product.Brand} {Product.Categories} {Product.Name}</Card.Title>
        <div className="d-flex flex-column justify-content-end"> 
        <Card.Subtitle className="mb-2 text-muted ">
          {user === undefined ? <Rating name="simple-controlled" className="text-warning" value={Product.Rating} size="large" readOnly />
            : AlreadyVote ? <Rating name="simple-controlled" value={Product.Rating} onChangeActive={(event, newValue) => {
              setValue(newValue);
            }} precision={0.5} size="large" onClick={SubmitVote} />
              : <Rating name="read-only" precision={0.1} className="text-danger" value={Product.Rating} size="large" readOnly />

          }
          <span>{Product.Rating.toFixed(1)}</span>
          <span>({Product.NumberOfVote})</span>
        </Card.Subtitle>

        {Product.PromoPrice === null ?
          <Card.Text className="d-flex"> <Card.Subtitle className="mb-2 " >Price: {Product.Price} €</Card.Subtitle></Card.Text>
          : <Card.Text className="d-flex">
            <Card.Subtitle className="mb-2 text-danger text-decoration-line-through" >Price: {Product.Price} €</Card.Subtitle>
            <Card.Subtitle className="mb-2  px-3" >{Product.PromoPrice} €</Card.Subtitle>
          </Card.Text>}




        <Row className="p-1">
          <Col >


            <div>

              <IoMdCard className="text-dark fs-2 " onClick={() => setModalShow(true)} />

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                Product={Product}
              />
            </div>

          </Col>
          <Col>

            <div onClick={shoppingWishlist} onMouseEnter={() => SetIcon(false)} onMouseLeave={() => SetIcon(true)} >
              {AlreadyInWish === false ? Icon ? (
                <RiHeartAddLine
                  fill="dark"
                  className=" fs-2 bg-white rounded"
                />
              ) : (
                <RiHeartAddFill
                  fill="red"
                  className="text-danger fs-2   "
                />
              ) : <RiHeartAddFill
                fill="red"
                className="text-danger fs-2 "
              />}
            </div>
          </Col>
          <Col>

            <div onClick={shoppingCard} onMouseEnter={() => SetIcon1(false)} onMouseLeave={() => SetIcon1(true)}  >
              {AlreadyInCard === false ? Icon1 ? (
                <GiShoppingCart className="text-dark fs-2 shoppingCard" />
              ) : (
                <MdOutlineAddShoppingCart className="text-primary fs-2 shoppingCard" />
              ) : <MdOutlineAddShoppingCart className="text-primary fs-2 shoppingCard " />
              }
            </div>
          </Col>
        </Row>
        </div> 

      </Card.Body>
    </Card>

  );
}
