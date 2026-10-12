"use client";
import {useState} from "react";
import {useLang} from "../lib/lang";
import {useRouter} from "next/navigation";
import {useAuth} from "./AuthProvider";
import {google,guest,nice} from "../lib/firebase";

export default function SocialLogin({onError,hideGuest}){
 const {t}=useLang();
 const {user}=useAuth();
 const r=useRouter();
 const [busy,setBusy]=useState(false);
 const go=fn=>async()=>{
  if(busy)return;
  setBusy(true);
  try{
   await fn();
   r.replace("/play");
  }catch(e){
   onError(nice(e));
   setBusy(false);
  }
 };
 const showGuest=!hideGuest&&!user?.isAnonymous;
 return(<div className="social">
  <button type="button" onClick={go(google)} disabled={busy}>{t(busy?"Connecting…":"🚀 Continue with Google")}</button>
  {showGuest&&<>
   <div className="or">{t("— or —")}</div>
   <button type="button" onClick={go(guest)} disabled={busy}>{t("👻 Play as guest (no signup)")}</button>
  </>}
 </div>);
}
