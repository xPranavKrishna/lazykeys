"use client";
import {useLang} from "../../lib/lang";
import {useState,useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import AuthShell from "../../components/AuthShell";
import SocialLogin from "../../components/SocialLogin";
import {useAuth} from "../../components/AuthProvider";
import {signup,resendVerify,nice} from "../../lib/firebase";

export default function Signup(){
 const {t}=useLang();
 const {user}=useAuth();
 const r=useRouter(),[n,setN]=useState(""),[e,setE]=useState(""),[p,setP]=useState(""),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
 const [sent,setSent]=useState(false),[resending,setResending]=useState(false),[resendMsg,setResendMsg]=useState("");

 useEffect(()=>{if(user&&!user.isAnonymous&&!sent)r.replace("/play")},[user,sent]);

 const submit=async ev=>{
  ev.preventDefault();
  setBusy(true);
  setErr("");
  try{
   await signup(n,e,p);
   setSent(true);
  }catch(x){
   setErr(nice(x));
   setBusy(false);
  }
 };

 const resend=async()=>{
  setResending(true);
  setResendMsg("");
  try{
   await resendVerify();
   setResendMsg("Verification email sent! 📬");
  }catch(x){
   setErr(nice(x));
  }
  setResending(false);
 };

 if(sent){
  return(<AuthShell emoji="📬" title={t("Check your inbox! 📬")} sub={t("Click the link in the email to verify your account.")}>
   <div className="card-note">
    <p className="mute">{t("We sent a verification link to")}</p>
    <b>{e}</b>
   </div>
   <p className="okmsg">{t(resendMsg)}</p>
   <button className="full go-btn" onClick={()=>r.replace("/play")}>{t("Let's type →")}</button>
   <div className="links" style={{justifyContent:"center",marginTop:12}}>
    <button type="button" className="btn mini" onClick={resend} disabled={resending}>
     {t(resending?"Sending…":"Resend verification email")}
    </button>
   </div>
  </AuthShell>);
 }

 const subText=user?.isAnonymous
  ? t("Save your guest streak & XP forever. Never lose progress.")
  : t("Free forever. Your streak & XP follow you on every device.");

 return(<AuthShell emoji="🐣" title={t("Join the lazy squad")} sub={subText}>
  <form onSubmit={submit}>
   <input className="f" placeholder={t("nickname (shown on your profile)")} value={n} onChange={x=>setN(x.target.value)}/>
   <input className="f" type="email" placeholder={t("email")} value={e} onChange={x=>setE(x.target.value)} required/>
   <input className="f" type="password" placeholder={t("password (6+ chars)")} value={p} onChange={x=>setP(x.target.value)} required/>
   <p className="err">{t(err)}</p>
   <button className="full go-btn" disabled={busy}>{t(busy?"Creating…":"Create my account 🚀")}</button>
  </form>
  <div className="links"><Link href="/login">{t("Already have an account? Log in")}</Link></div>
  <SocialLogin onError={setErr} hideGuest={true}/>
 </AuthShell>);
}
