import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function DashboardMenu() {
    
   


  return (
    <Nav  fill justify variant="dark" defaultActiveKey='Dashboard' className='bg-dark p-0' >
    <Nav.Item >
       <Nav.Link eventKey="Dashboard"  className=' text-decoration-none navMenuLink  border border-right-3 border-light' ><Link to="/Dashboard" className='text-light text-decoration-none'><h4>Dashboard</h4></Link> </Nav.Link> 
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  eventKey="CreateProduct" className='  navMenuLink   border border-right-3 border-light' ><Link to="/CreateProduct" className='text-light text-decoration-none'><h4>CreateProduct</h4> </Link></Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  eventKey="ModifyProduct" className=' t navMenuLink  border border-right-3 border-light' ><Link to="/ModifyProduct" className='text-light text-decoration-none'><h4>ModifyProduct</h4></Link> </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  eventKey="CreateUser" className='  navMenuLink  border border-right-3 border-light' ><Link to="/CreateUser" className='text-light text-decoration-none'><h4>CreateUser</h4></Link> </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  eventKey="ModifyUser" className='  navMenuLink  border border-right-3 border-light' > <Link to="/ModifyUser" className='text-light text-decoration-none'><h4>ModifyUser</h4></Link> </Nav.Link>
    </Nav.Item>
  </Nav>



  )
}
 