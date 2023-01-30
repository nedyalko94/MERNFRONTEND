import React, { useState } from 'react'
import {  Container, Nav, Navbar, NavDropdown,Form, Row, Col,Badge } from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import { GiShoppingCart,GiHearts } from 'react-icons/gi';
import {Popover,OverlayTrigger} from 'react-bootstrap'
import{MdModeNight,MdLightMode} from 'react-icons/md'
import {useTheme,useThemeUpdate} from '../Context/ColorMode'


 function Header({username,password,login,user,logOut ,categories,categoriesFilter,inputHandler,setFilteredByCategories }) {

  const [NavBarVariant,setNavBarVariant]= useState('light')
  const darkTheme = useTheme()
  const toggleTheme = useThemeUpdate()
  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
    // color:h : darkTheme?'#f6f6f6':'#333'
  }
 
  const checkColor = darkTheme?<div style={{ width:"7rem" ,cursor:"pointer"}} className='d-flex flex-column justify-content-start align-items-center fs-3 my-1'><MdModeNight className='text-primary' /><h6 >Dark Mode</h6></div> :<div style={{ width:"7rem",cursor:"pointer"}} className='d-flex flex-column justify-content-start align-items-center fs-3 my-1'><MdLightMode className=' text-warning' /><h6>Light Mode</h6></div>

  const Mode = ()=>{
    darkTheme? setNavBarVariant('light'): setNavBarVariant('dark')
  toggleTheme()
  }
  
  const LoginPopOver = (
  <Popover id="popover-basic"  className='rounded-3'>
      <Popover.Header as="h3" className='secondary' > Login</Popover.Header>
      <Popover.Body>
        <Container fluid>
        <Row md={12}>    
        <form >
        <input placeholder="UserName" name="UserName" className="mt-2 rounded-2" ref={username} required autoComplete='username'></input>
        <input placeholder="password" name="password" className="mt-2 rounded-2"required ref={password} type="password"  autoComplete='current-password' ></input>
          <Row><Link to="/Register" className='mt-2'> You don't have Account yet ?</Link></Row>
          <Row><Link to="/ForgotPassword" className='mt-1 '> Forgot your Password ?</Link></Row>
        <button onClick={login}  className='mt-3 px-3 py-2 button'><span></span><span></span><span></span><span></span>Login</button>
        </form> 
        </Row>
        </Container>
      </Popover.Body>
    </Popover>

  

  );
  const nav = useNavigate()
  const myNav = ()=>{
    nav("/")
  }
  const getHome = () => {return  setFilteredByCategories([])}

  const Wishlist= JSON.parse(localStorage.getItem("Wishlist"))
  const ShopList= JSON.parse(localStorage.getItem("shoppingCard"))
  const x = useNavigate();
    const RedirectToHome =(e)=>{
       
        if(e.key==='Enter'){
          e.preventDefault()
            return x('/')
        }
    }

 
  return (
<Container fluid  style={themeStyle} >
  <Row className='pb-3 m-0'>
    <Col>
     
        <Link to='/' className="d-flex nav-link text-decoration-none mx-2 mt-4 justify-content-center"
         sm={4} md={1} xl={2} xxl={2} onClick={getHome}>
          <h2 className='button rounded-2'><span></span><span></span><span></span><span></span>CyberTech</h2></Link>
        </Col>
        <Col md={12} sm={12} lg={12} xl={12} xxl={6}>
            <Form className="mx-2 my-2 mt-5 ">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search" 
              onKeyDown={RedirectToHome}
              onChange={inputHandler}
            />
            </Form>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} 	xxl={4} className='d-flex mt-5 justify-content-evenly p-0'>
              {/* {console.log(user)} */}
              { user !== undefined?(<> <h5><NavDropdown title= {`  ${user.username}`} id="navbarScrollingDropdown" className="nav-link text-decoration-none  navMenuLink">
              <NavDropdown.Item className="navMenuLink dropDownLink">
                <Link to="/Profile"className="nav-link text-decoration-none ">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="navMenuLink dropDownLink">
                <Link to="/History"className="nav-link text-decoration-none ">History</Link>
                </NavDropdown.Item>
                
                {user.isAdmin? <NavDropdown.Item  className="navMenuLink dropDownLink">
                
                <Link to="/Dashboard"className="nav-link text-decoration-none dropDownLink">Dashboard</Link>
                </NavDropdown.Item>:""}
              
              <NavDropdown.Item  className="navMenuLink dropDownLink">
              <Link to="/"className="nav-link text-decoration-none   dropDownLink" onClick={logOut} type='submit' >Logout</Link>
              </NavDropdown.Item>
            </NavDropdown>
            
          
            
            
            </h5> <h5 onClick={Mode} className='ColorMode'>{checkColor} </h5></> ):
              
              <>
         
              <Link to="/Register"className="nav-link text-decoration-none  navMenuLink"><h5>Register</h5></Link>
            
            <div className='text-decoration-none nav-link navMenuLink '>
            <div className=""> 
            <OverlayTrigger
           trigger="click"
           placement="bottom"
           overlay={LoginPopOver}
           rootClose >
        <h5 >Login </h5>
        </OverlayTrigger>
        </div>
        </div>
        </>}
      
          <Link to="/Wishlist"  ><GiHearts className=' HeaderIcon2 ' style={themeStyle} /> 
        <Badge className="d-absolute top-50 start-100 translate-middle py-1 bg-danger border border-light rounded-circle badgeSize">
      {Wishlist !== null ? Wishlist.length>0?Wishlist.length:null:null}
  </Badge>
  </Link>

        <Link to="/ShoppingCard" ><GiShoppingCart className=' HeaderIcon' style={themeStyle} /> 
        <Badge className="d-absolute top-0 start-100 translate-middle py-1 bg-danger border border-light rounded-circle badgeSize">
         {ShopList !== null? ShopList.length>0?ShopList.length:null:null}
        </Badge>
        </Link>
       
        </Col>

     
    </Row>
  <Row className='pb-2'>
   <Navbar collapseOnSelect={true}  variant={NavBarVariant}   expand="lg"   >
      <Container fluid  className='d-flex justify-content-end'>
        {/* <Navbar.Brand ><Link to='/' className="nav-link text-decoration-none mx-2">ICTsiktir</Link></Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
        <Navbar.Collapse id="responsive-navbar-nav" >
       
         {/* <Nav className="me-auto"> */}

           
            <Nav.Link href="#"> <Link to="/"className=" text-decoration-none mx-4 nav-link mt-2" onClick={getHome}><h5 style={themeStyle} className="navMenuLink">Home</h5></Link></Nav.Link>
            <Nav.Link href='#'><Link to="/Actions"className="  text-decoration-none mx-4 nav-link mt-2"><h5 style={themeStyle} className="navMenuLink">Actions </h5></Link></Nav.Link>
          
              
            
              <h5>
            <NavDropdown title="Categories" id="navbarScrollingDropdown"    className=" text-decoration-none mx-3 navMenuLink mt-2">
              {categories !== undefined ? 
            categories.map(( categories,index) =>
              (  <NavDropdown.Item key={index} value={categories} onClick={categoriesFilter}    className="  text-decoration-none navMenuLink dropDownLink">
                <Nav.Link to="/"className=" text-dark text-decoration-none  " onClick={myNav} >{categories.Categories}</Nav.Link>
                </NavDropdown.Item>)


            ) 
            :''}
            
            </NavDropdown>
            </h5>
            
            <Nav.Link href='#'><Link to="/Trending"className="  text-decoration-none mx-4 mt-2 nav-link" ><h5 className='navMenuLink'  style={themeStyle}>Trending</h5></Link></Nav.Link>

            <Nav.Link href='#'><Link to="/Contact"className="  text-decoration-none mx-4  mt-2 nav-link" ><h5 className='navMenuLink'  style={themeStyle}>Contact</h5></Link></Nav.Link>
            
      
        
         
           {/* </Nav> */}


        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Row>
    </Container>
 

  )
}
export default Header

