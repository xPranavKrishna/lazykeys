"use client";
import {useEffect,useRef} from "react";
import gsap from "gsap";
// Shared look for login / signup / forgot pages
export default function AuthShell({emoji,title,sub,children}){
 const ref=useRef();
 useEffect(()=>{
  const ctx=gsap.context(()=>{
   gsap.from(ref.current,{y:40,opacity:0,duration:.6,ease:"power2.out"});
   gsap.to(".bob",{y:-8,repeat:-1,yoyo:true,duration:1.2,ease:"sine.inOut"});
  },ref);
  return()=>ctx.revert();
 },[]);
 return(<main className="auth-page"><div className="wrap narrow"><div className="card auth" ref={ref}>
  <div className="bob big">{emoji}</div><h1>{title}</h1><p className="tag">{sub}</p>{children}</div></div></main>);
}
