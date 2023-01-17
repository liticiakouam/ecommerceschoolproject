import { Navigate } from "react-router-dom";

 function AuthprivateRoute({children}){
  const authR=JSON.parse(localStorage.getItem('role'));
  const auth=JSON.parse(localStorage.getItem('auth'));
  
  switch(auth){
    case authR==='admin' && auth===true:
        return children;
    default:
     return children;
  
    } 
}

export default AuthprivateRoute;