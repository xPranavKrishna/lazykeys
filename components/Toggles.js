"use client";
import {useEffect,useState} from "react";
import {useLang} from "../lib/lang";
export default function Toggles(){
 const {m,toggle}=useLang(),[th,setTh]=useState("dark");
 useEffect(()=>{const s=localStorage.getItem("lk_theme")||"dark";setTh(s);document.documentElement.dataset.theme=s},[]);
 const flip=()=>{const s=th==="dark"?"light":"dark";setTh(s);localStorage.setItem("lk_theme",s);document.documentElement.dataset.theme=s};
 return <div className="toggles"><button onClick={flip}>{th==="dark"?"☀️ Light":"🌙 Dark"}</button><button onClick={toggle}>{m==="ml"?"🇬🇧 English":"മലയാളം 🌴"}</button></div>;
}
