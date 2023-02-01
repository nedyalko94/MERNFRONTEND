// import React,{useContext,createContext, useState, useEffect} from 'react'
// import server from '../variable'

// export const userContexts = createContext()

//  export function useUser(){
//     return useContext(userContexts)
//  }



// export default function userContext({children}) {
//     const [user,setUser] = useState([])
    
//         const getUser = async() =>{
//           await fetch(`${server}/Users/user`,{
//               credentials:'include',})
//               .then(res=> res.json()     )
//               .then(data=> { if (!data.msg){return setUser(data)}else{return setUser(undefined)}})    
//       }
//       getUser()
    

//   return (
//     <userContext.Provider value={user}>
//         {children}

//     </userContext.Provider>
//   )

   
// }
