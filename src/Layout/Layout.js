import React from 'react'
import { BrowserRouter } from "react-router-dom"
import Footer from './Footer'
import Header from './Header'
 function Layout({children,  username,password,login,user,logOut,categories,categoriesFilter,inputHandler,setFilteredByCategories,setEmail,newsLetter}) {
  return (
    <BrowserRouter>
    <Header   username={username}  password={password} user={user} login={login} logOut={logOut} categories={categories} categoriesFilter={categoriesFilter} inputHandler={inputHandler} setFilteredByCategories={setFilteredByCategories}/>
    {children}
    <Footer setEmail={setEmail} newsLetter={newsLetter} />
  </BrowserRouter>
  )
}
export default Layout