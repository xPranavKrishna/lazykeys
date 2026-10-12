"use client";
import {useLang} from "../../lib/lang";
import {useState} from "react";
import Link from "next/link";
import AuthShell from "../../components/AuthShell";
import {resetPw,nice} from "../../lib/firebase";
export default function Forgot(){
 const {t}=useLang();
 const [e,setE]=useState(""),[msg,setMsg]=useState(""),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
 const submit=async ev=>{
  ev.preventDefault();
  setBusy(true);
  setErr("");
  setMsg("");
  try{
   await resetPw(e);
   setMsg("Reset link sent! 📬 Check your inbox (and spam folder).");
  }catch(x){
   setErr(nice(x));
  }
  setBusy(false);
 };
 return(<AuthShell emoji="🧠💨" title={t("Forgot your password?")} sub={t("Happens to the best typists. We'll email you a reset link.")}>
  <form onSubmit={submit}>
   <input className="f" type="email" placeholder={t("your email")} value={e} onChange={x=>setE(x.target.value)} required/>
   <p className="err">{t(err)}</p><p className="okmsg">{t(msg)}</p>
   <button className="full go-btn" disabled={busy}>{t(busy?"Sending…":"Send reset link")}</button>
  </form>
  <div className="links"><Link href="/login">{t("← Back to login")}</Link></div>
 </AuthShell>);
}
