"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
export default function Home(){
 const r=useRouter();useEffect(()=>{r.replace("/play")},[]);
 return <p style={{textAlign:"center",padding:40}}>Warming up fingers… ⌨️</p>;
}
