// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios'

// const AuthContext = createContext({
//     auth: null,
//     setAuth: () => {},
//     user: null,
//   });
//   const  useAuth = () => useContext(AuthContext)


// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null);
//   const [user, setUser] = useState(null);

  

//   useEffect(() => {
//     const isAuth = async () => {
//       try {
//         const res = await axios.get(
//           'http://localhost:5000/api/logged-user/',
//           { withCredentials: true }
//         );
      
//         setUser(res.data);
//       } catch(error) {
//         setUser(null);
//       };
//     };

//     isAuth();
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


// //https://stackoverflow.com/questions/71960194/update-navbar-after-success-login-or-logout-redirection
// //https://www.youtube.com/watch?v=7vVqMR96T5o