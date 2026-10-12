"use client";
import {createContext,useContext,useEffect,useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {A} from "../lib/firebase";
const C=createContext({user:null,loading:true});
export const useAuth=()=>useContext(C);
export default function AuthProvider({children}){
 const [s,setS]=useState({user:null,loading:true});
 useEffect(()=>{
  const unsub=onAuthStateChanged(A(),u=>setS({user:u,loading:false}));
  const sync=()=>{const u=A().currentUser;if(u)setS({user:Object.assign(Object.create(Object.getPrototypeOf(u)),u),loading:false})};
  addEventListener("lk_auth_sync",sync);
  return()=>{unsub();removeEventListener("lk_auth_sync",sync)};
 },[]);
 return <C.Provider value={s}>{children}</C.Provider>;
}
