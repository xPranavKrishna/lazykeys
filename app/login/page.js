"use client";
import {useLang} from "../../lib/lang";
import {useState,useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import AuthShell from "../../components/AuthShell";
import SocialLogin from "../../components/SocialLogin";
import {useAuth} from "../../components/AuthProvider";
import {emailLogin,nice} from "../../lib/firebase";
export default function Login(){
 const {t}=useLang();
 const r=useRouter(),{user}=useAuth(),[e,setE]=useState(""),[p,setP]=useState(""),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
 useEffect(()=>{if(user&&!user.isAnonymous)r.replace("/play")},[user]);
 const submit=async ev=>{
  ev.preventDefault();
  setBusy(true);
  setErr("");
  try{
   await emailLogin(e,p);
   r.replace("/play");
  }catch(x){
   setErr(nice(x));
   setBusy(false);
  }
 };
 return(<AuthShell emoji="⚔️" title={t("Welcome back, keyboard warrior")} sub={t("Your streak is waiting. Don't let it die 🔥")}>
  <form onSubmit={submit}>
   <input className="f" type="email" placeholder={t("email")} value={e} onChange={x=>setE(x.target.value)} required/>
   <input className="f" type="password" placeholder={t("password")} value={p} onChange={x=>setP(x.target.value)} required/>
   <p className="err">{t(err)}</p>
   <button className="full go-btn" disabled={busy}>{t(busy?"Checking…":"Let me in →")}</button>
  </form>
  <div className="links"><Link href="/forgot">{t("Forgot password? 🤦")}</Link><Link href="/signup">{t("New here? Sign up")}</Link></div>
  <SocialLogin onError={setErr}/>
 </AuthShell>);
}
