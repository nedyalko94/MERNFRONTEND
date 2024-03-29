import React,{createContext, useEffect,useRef,useState} from 'react'
import { Route, Routes } from "react-router-dom"
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import Actions from './Pages/Actions'
import Register from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassword'
import Wishlist from './Pages/Wishlist'
import ShoppingCard from './Pages/ShoppingCard'
import Trending from './Pages/Trending'
import Detail from './Pages/ProductDetail'
import Profile from './Pages/Profile'
import Dashboard from './Pages/Dashboard/Dashboard'
import CreateProduct from './Pages/Dashboard/CreateProduct'
import ModifyProduct from './Pages/Dashboard/ModifyProduct'
import CreateUser from './Pages/Dashboard/CreateUser' 
import ModifyUser from './Pages/Dashboard/ModifyUser'
import ThankYou from './Pages/ThankYou'
import PasswordUpdate from './Pages/PasswordUpdate'
import server from './variable'
import PrivateRoutes from './Context/PrivateRoutes'
import { ThemeProvider } from './Context/ColorMode'
import History from './Pages/History'
import Page404 from './Pages/404'

//============================ context==========
export const UserContexts = createContext(null)

function App() {


  const[AllProduct,setAllProduct]= useState([])
  const username = useRef('')
  const password = useRef('') 
  const [categories,setCategories] = useState([])
  const [user,setUser]= useState()
  const [FilteredByCategories, setFilteredByCategories]= useState([])
  const[ProductInputSearch,setProductInputSearch]= useState(undefined)
  const [msgModal,setMsgModal] = useState("")
const [LoginMessage,setLoginMessage] = useState('')




  //=======================================================Admin/Dashboard====================

  const [AdminGetAllProduct,setAdminGetAllProduct]= useState([])
  const [ AdminCategoriesQueryProduct,setAdminCategoriesQueryProduct] =useState('name') 
  const [ AdminInputSearchProduct,setAdminInputSearchProduct] =useState('') 

  const[AdminGetAllUser,setAdminGetAllUser] = useState([])
  const[AdminSortUserBy,setAdminSortUserBy] = useState('username')
  const[AdminInputSearchUser,setAdminInputSearchUser]=useState('')
  const [Email,setEmail] = useState('')


//  const server= process.env.REACT_APP_SERVER
 
//Admin productControl information
useEffect(()=>{
  fetch(`${server}/Product/?${AdminCategoriesQueryProduct}=${AdminInputSearchProduct}`)
 .then(res=>res.json())
 .then(data=>{
   // console.log(data.Product)
   setAdminGetAllProduct(data.Product)
 }) 
},[AdminCategoriesQueryProduct,AdminInputSearchProduct]) 
//=============== 


//Admin userControls information

useEffect(
  ()=>{
    fetch(`${server}/Users/findUser?${AdminSortUserBy}=${AdminInputSearchUser}`)
   .then(res=>res.json())
   .then(data=>{
    //  console.log(data.User)
    setAdminGetAllUser(data.User)
   })
 } ,[AdminSortUserBy,AdminInputSearchUser])



  //================================User===========================
  //  getting user
useEffect(()=>{
  const getUser = async() =>{
    await fetch(`${server}/Users/user`,{
        credentials:'include',
       
     
      })
        .then(res=>res.json())
        .then(data=> { if (!data.msg){return setUser(data)}else{return setUser(undefined)}})    
}

getUser()
},[])



 
// login

  const login = async(e)=>{
    // e.preventDefault()
    await fetch(`${server}/Users/login`, {
       credentials: 'include',
       method:'POST',
       headers:{
           "Content-Type":"application/json"
       },
       body:JSON.stringify({ 
           "username":username.current.value,
           "password":password.current.value
       })
   })
   .then(res=> res.json())
   .then(result=>{
    setLoginMessage(result.msg) 
       if(result.user){ return setUser(result.user)  }
      
    })
  //  .then(data=>  console.log(data))
  //  .finally((data)=>{if (data !== undefined||null) { <Navigate to={'/'}/>}})
     
}
// http://localhost:3004/Users/logout


const logOut = async(e) =>{
  await fetch(`${server}/Users/logout`,{
      credentials:'include',})
      .then(res=>res.json())
      .then(data=>{ console.log(data)})
      .then(res=>{ setUser(res)})
      
  
}

 

//======================================================Product===================================


useEffect(() => {
  async function getProduct() {
      let res = await fetch(`${server}/Product/`)
      let data = await res.json()
      setAllProduct(data.Product)
  }
  getProduct()
}
  , [AllProduct])
  // AllProduct


  const inputHandler = (e=>{
    setFilteredByCategories([])
    const inputValue = e.target.value
    const  Search = AllProduct.filter((product)=>{
      if(product.Categories.includes(inputValue)
      ||
      product.Brand.includes(inputValue)
      ||
      product.Name.includes(inputValue)
      ||
      product.Description.includes(inputValue)

      )
      {return product}
      else{
        return undefined
      }
    }
      )  

      return setProductInputSearch(Search)  
  })
  
  const categoriesFilter = ( (e) => {
    const myFilter = AllProduct.filter((AllProduct)=>{ return AllProduct.Categories === e.target.text})
      return setFilteredByCategories(myFilter) }
     
     )
    
  

  useEffect(() => {
    async function categories() {
        let res = await fetch(`${server}/Product/?cate`)
        let data = await res.json()
        setCategories(data.Product)
    }
     categories()
  }
    , [])

    // ======================================================emails 


    const newsLetter = async(e)=>{
      // e.preventDefault()
      if (Email ==="" || Email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g)=== null)
      { if (Email !==" "){
        setEmail(" ")
      }
        return setMsgModal("wrong email or empty input field")}

      await fetch(`${server}/NewsLetter`, {
         credentials: 'include',
         method:'POST',
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             "email":Email
             
         }) 
     })
     .then(res=>res.json())
     .then(data=> setMsgModal(data.msg)) 
    }


  return (
    <UserContexts.Provider value={user}>
      <ThemeProvider>

<Layout username={username} user={user} password={password} login={login} logOut={logOut} categories={categories}
 categoriesFilter={categoriesFilter} inputHandler={inputHandler} setFilteredByCategories={setFilteredByCategories}
 setEmail={setEmail} newsLetter={newsLetter} msgModal={msgModal} setMsgModal={setMsgModal} LoginMessage={LoginMessage}
 >

   <Routes>

      <Route path='/' element={<Home AllProduct={AllProduct} ProductInputSearch={ProductInputSearch} FilteredByCategories={FilteredByCategories} />} />
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Actions' element={<Actions AllProduct={AllProduct}/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Wishlist' element={<Wishlist/>}/>
      <Route path='/Trending' element={<Trending AllProduct={AllProduct}/>}/>
      <Route path='/ShoppingCard' element={<ShoppingCard/>}/>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
      <Route path='/:id' element={<Detail/>}/>

      
         

      <Route path='/ThankYou' element={<ThankYou/>}/>
      <Route path='/PasswordUpdate/:id' element={<PasswordUpdate/>}/>
       {/* protected route  */}

      <Route element={<PrivateRoutes user={user}/>}>
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/Profile' element={<Profile user={user} />}/>
        <Route path='/History' element={<History user={user} />}/>
        <Route path='/CreateProduct' element={<CreateProduct  />} />
        <Route path='/ModifyProduct' element={<ModifyProduct AdminGetAllProduct={AdminGetAllProduct} setAdminCategoriesQueryProduct={setAdminCategoriesQueryProduct} setAdminInputSearchProduct={setAdminInputSearchProduct} />} />
        <Route path='/CreateUser' element={<CreateUser/>} />
        <Route path='/ModifyUser' element={<ModifyUser AdminGetAllUser={AdminGetAllUser} setAdminSortUserBy={setAdminSortUserBy} setAdminInputSearchUser ={setAdminInputSearchUser} />  } />

      </Route>
       <Route path='*' element={<Page404/>}/>

   </Routes>

   </Layout> 
   </ThemeProvider>
    </UserContexts.Provider>

  )
}

export default App