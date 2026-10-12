"use client";
import {createContext,useContext,useEffect,useRef,useState} from "react";
import {useAuth} from "./AuthProvider";
import {loadData,saveData} from "../lib/firebase";
const BLANK={xp:0,days:{},weak:{},best:{},stars:{}};
const C=createContext({d:BLANK,ready:false,update:()=>{}});
export const useProgress=()=>useContext(C);
export default function ProgressProvider({children}){
 const {user}=useAuth(),[d,setD]=useState(BLANK),[ready,setReady]=useState(false),ref=useRef(BLANK);
 useEffect(()=>{setReady(false);if(!user){setD(BLANK);ref.current=BLANK;return;}
  loadData(user.uid).then(x=>{const v={...BLANK,...(x||{})};ref.current=v;setD(v);setReady(true)})},[user?.uid]);
 const update=fn=>{const v=fn(ref.current);ref.current=v;setD(v);if(user)saveData(user.uid,v)};
 return <C.Provider value={{d,ready,update}}>{children}</C.Provider>;
}
