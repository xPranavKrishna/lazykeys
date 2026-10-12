"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "./AuthProvider";
import {useProgress} from "./ProgressProvider";
import NavBar from "./NavBar";
// Login guard + top bar for every signed-in page
export default function AppShell({children}){
 const {user,loading}=useAuth(),{ready}=useProgress(),r=useRouter();
 useEffect(()=>{if(!loading&&!user)r.replace("/login")},[user,loading]);
 if(loading||!user||!ready)return <p className="center">🦥 …</p>;
 return <><NavBar user={user}/><div className="wrap">{children}</div></>;
}
