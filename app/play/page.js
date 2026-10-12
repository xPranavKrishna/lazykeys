"use client";
import {useState} from "react";
import Link from "next/link";
import AppShell from "../../components/AppShell";
import Mascot from "../../components/Mascot";
import Heatmap from "../../components/Heatmap";
import {useAuth} from "../../components/AuthProvider";
import {useProgress} from "../../components/ProgressProvider";
import {useLang} from "../../lib/lang";
import {LEVELS,LESSONS,day,streakOf} from "../../lib/engine";
import {resendVerify} from "../../lib/firebase";

function Home(){
 const {user}=useAuth(),{d}=useProgress(),{L}=useLang();
 const [vmsg,setVmsg]=useState("");
 const resend=async()=>{try{await resendVerify();setVmsg("Sent! 📬")}catch{setVmsg("Wait a bit ⏳")}};
 const t=day(0),done=d?.days?.[t]||0,stars=Object.values(d?.stars||{}).reduce((a,b)=>a+b,0);
 const next=LESSONS.find(l=>!(d?.stars?.[l.id]>0)),name=user?.displayName||(user?.isAnonymous?"Guest":"Friend");
 const weak=Object.entries(d?.weak||{}).sort((a,b)=>b[1]-a[1]).slice(0,6);
 const quest=[[L("Do 1 lesson (saves your streak 🔥)","Oru lesson cheyyu (streak save aakum 🔥)"),done>=1],[L("Do 3 lessons (bonus!)","3 lesson cheyyu (bonus!)"),done>=3],[L("Fix your weak keys 🐛","Thettunna keys sheriyaakku 🐛"),d?.rescueDay===t]];
 return(<>
  <Mascot say={[`Hi ${name}! Ready for one tiny round?`,`Namaskaram ${name}! Oru cheriya round nokkamo?`]}/>
  {user?.isAnonymous&&<p className="warn">👻 {L("Guest mode: progress is tied to this browser.","Guest mode: progress ee browser-il maathram.")} <Link href="/signup">{L("Save it forever →","Eppozhum save cheyyu →")}</Link></p>}
  {user&&!user.isAnonymous&&user.email&&!user.emailVerified&&<p className="warn">📬 {L("Check your email to verify your account.","Account verify cheyyan email inbox nokku.")} <button type="button" className="btn mini" style={{marginLeft:8}} onClick={resend}>{vmsg||L("Resend email","Veendum ayakku")}</button></p>}
  <div className="card"><h2>📅 {L("Today's lazy quest","Innathe madiyan quest")}</h2>
   <ul className="quest">{quest.map(([q,ok],k)=><li key={k}>{ok?"✅":"⬜"} {q}</li>)}</ul>
   <div className="pills"><b>🔥 {streakOf(d.days)} {L("day streak","divasa streak")}</b><b>⭐ {stars}</b><b>{d.xp} XP</b></div><br/>
   {next?<Link className="btn go-btn" href={`/lesson/${next.id}`}>▶ {L("Continue","Thudaru")}: {next.title}</Link>:<b>👑 {L("Course complete! You are a pro.","Course theernnu! Ini nee pro aanu.")}</b>}{" "}
   <Link className="btn" href="/lesson/rescue">🐛 {L("Weak-key rescue","Thettu rescue")}</Link></div>
  <div className="fun-banner">
   <div>
    <h3>🌴 {L("Manglish Fun Arcade","Manglish Koodaram")}</h3>
    <p className="mute">{L("Type iconic Malayalam cinema dialogues, tea stall cravings & campus slang!","Cinema dialogues, chaya vibukal & nadan slang type cheythu rasikku!")}</p>
   </div>
   <Link href="/fun" className="btn go-btn">🎮 {L("Play Arcade →","Kalikkaam →")}</Link>
  </div>
  {LEVELS.map(lv=>{const ls=LESSONS.filter(l=>l.level===lv.id),got=ls.filter(l=>d.stars[l.id]>0).length;
   return(<section key={lv.id} className="card"><h3>{lv.emoji} {lv.name}<small>{lv.when} · {got}/{ls.length}</small></h3><p className="mute">{L(lv.d[0],lv.d[1])}</p>
    <div className="lessons">{ls.map(l=>{const i=LESSONS.indexOf(l),open=i===0||d.stars[LESSONS[i-1].id]>0;
     return open?<Link key={l.id} href={`/lesson/${l.id}`} className="lesson">{l.title}<b>{"⭐".repeat(d.stars[l.id]||0)||"▶"}</b></Link>:<span key={l.id} className="lesson lock">🔒 {l.title}</span>})}</div></section>)})}
  <section className="grid"><div className="card"><h3>🗓️ {L("Consistency (10 weeks)","Consistency (10 aazhcha)")}</h3><Heatmap days={d.days}/></div>
   <div className="card"><h3>🐛 {L("Weak keys","Thettunna keys")}</h3><div className="weak">{weak.length?weak.map(([k,v])=><b key={k}>{k===" "?"space":k} ×{v}</b>):L("None yet. Suspiciously good.","Onnum illa. Sammathichu, mass! 😎")}</div></div></section>
 </>);
}
export default function Page(){return <AppShell><Home/></AppShell>}
