import { createContext, useEffect, useState } from "react";
import ProductAPI from "./components/pages/api/productAPI";
import UserAPI from './components/pages/api/UserAPI'
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

  const [token,setToken] =useState(false)

  const refreshToken=async()=>{
    const res = await axios.get("/user/refreshtoken");

    setToken(res.data.accessToken)
  }

  useEffect(()=>{
    const firstLogin = localStorage.setItem('firstlogin',()=>{
      
    })
    if(firstLogin)   refreshToken();
  },[])
 const state = {
   token: [token, setToken],
   ProductAPI: ProductAPI(),
   userApi: UserAPI(token),
 };
  return (

    <GlobalState.Provider value={state}>
      {children}
     
    </GlobalState.Provider>
  );
};
