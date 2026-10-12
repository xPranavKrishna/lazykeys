"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {logout} from "../lib/firebase";
import {useLang} from "../lib/lang";
import {useProgress} from "./ProgressProvider";
import {streakOf} from "../lib/engine";
export default function NavBar({user}){
 const {L}=useLang(),{d}=useProgress(),r=useRouter();
 const out=async()=>{if(user?.isAnonymous&&!confirm(L("Guests lose progress after logout. Sure?","Logout cheythal guest progress povum. Urappano?")))return;await logout();r.replace("/login")};
 return <nav className="nav"><b>LazyKeys 🦥</b><Link href="/play">🏠 {L("Home","Veedu")}</Link><Link href="/fun">🌴 {L("Arcade","Koodaram")}</Link><Link href="/guide">🖐 {L("Finger guide","Viral guide")}</Link>
  <span className="pills"><b>🔥 {streakOf(d.days)}</b><b>{d.xp} XP</b></span><button onClick={out}>{L("Logout","Logout")}</button></nav>;
}
