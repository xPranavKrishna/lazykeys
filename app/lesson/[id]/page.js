"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {useParams,useRouter} from "next/navigation";
import gsap from "gsap";
import AppShell from "../../../components/AppShell";
import Keyboard from "../../../components/Keyboard";
import {useProgress} from "../../../components/ProgressProvider";
import {useLang} from "../../../lib/lang";
import {LESSONS,RESCUE,makeText,day,merge,half,newKeys} from "../../../lib/engine";
import {COL,plan} from "../../../lib/fingers";
const MSG=[["So close! Accuracy needs 95%. Go slower, you've got this. 💪","Kurachu koodi! 95% accuracy venam. Mellay type cheyyu. 💪"],["Passed! Nice start. 👍","Pass aayi! Nalla thudakkam. 👍"],["Great job, lazy legend! 🌟","Kidilam, madiyan raja! 🌟"],["Perfect! Absolutely poli! 🎉","Poli! Perfect aanu! 🎉"]];
function Lesson({id}){
 const {d,update}=useProgress(),{L}=useLang(),r=useRouter();
 const idx=LESSONS.findIndex(l=>l.id===id),les=id==="rescue"?RESCUE:LESSONS[idx];
 const locked=!les||(id!=="rescue"&&idx>0&&!(d.stars[LESSONS[idx-1].id]>0));
 const [text,setText]=useState(""),[i,setI]=useState(0),[errs,setErrs]=useState(0),[combo,setCombo]=useState(0),[res,setRes]=useState(null),[blind,setBlind]=useState(false),[bad,setBad]=useState(false);
 const t0=useRef(0),box=useRef(),miss=useRef({}),badTimer=useRef();
 const start=()=>{setText(makeText(les,d.weak));setI(0);setErrs(0);setCombo(0);setRes(null);t0.current=0;miss.current={}};
 useEffect(()=>{if(locked)r.replace("/play");else start();return()=>clearTimeout(badTimer.current)},[]);
 const finish=e=>{
  const n=text.length,min=Math.max((performance.now()-t0.current)/60000,.01),wpm=Math.round(n/5/min),acc=Math.round(n/(n+e)*100),g=les.goal||0;
  const s=acc<95?0:1+(acc>=97&&wpm>=g?1:0)+(acc>=98&&wpm>=Math.round(g*1.3)+5?1:0),xp=Math.round(n*acc/100)+s*5,t=day(0);
  update(p=>{const w=merge(p.weak,miss.current);return{...p,xp:p.xp+xp,days:s>0?{...p.days,[t]:(p.days[t]||0)+1}:p.days,stars:{...p.stars,[id]:Math.max(p.stars[id]||0,s)},best:{...p.best,[id]:Math.max(p.best[id]||0,s?wpm:0)},weak:id==="rescue"&&s?half(w):w,rescueDay:id==="rescue"&&s?t:p.rescueDay}});
  setI(n);setRes({wpm,acc,s,xp});
 };
 useEffect(()=>{
  const h=ev=>{
   if(res){
    if(ev.key==="Enter"){ev.preventDefault();if(res.s>0&&nxt)r.push("/lesson/"+nxt.id);else start()}
    return;
   }
   if(!text||ev.ctrlKey||ev.metaKey||ev.altKey||ev.key.length!==1)return;
   ev.preventDefault();if(!t0.current)t0.current=performance.now();
   if(ev.key===text[i]){setCombo(c=>c+1);if(i+1===text.length)finish(errs);else setI(i+1)}
   else{miss.current[text[i]]=(miss.current[text[i]]||0)+1;setErrs(x=>x+1);setCombo(0);clearTimeout(badTimer.current);setBad(true);badTimer.current=setTimeout(()=>setBad(false),180);gsap.fromTo(box.current,{x:-8},{x:0,duration:.4,ease:"elastic.out(1,.4)"})}
  };
  addEventListener("keydown",h);return()=>removeEventListener("keydown",h);
 });
 useEffect(()=>{if(res)gsap.from(".res",{scale:.85,opacity:0,duration:.35,ease:"back.out(2)"})},[res]);
 if(!text)return null;
 const p=plan(text[i]||""),info=newKeys(les),nxt=id==="rescue"?null:LESSONS[idx+1];
 return(<>
  <p><Link href="/play">← {L("Map","Map")}</Link></p>
  <h2>{les.title}</h2>
  <p className="mute">{L("Goal: 95%+ accuracy","Lakshyam: 95%+ accuracy")}{les.goal?` · ${les.goal}+ WPM = ⭐⭐`:""}</p>
  {info&&<div className="card">🆕 {L("New keys","Pudiya keys")}: <b>{info}</b></div>}
  <div className="card" ref={box}>
   <div className="text">{[...text].map((c,k)=><span key={k} className={k<i?"ok":k===i?"cur"+(bad?" bad":""):""}>{c===" "?"\u00a0":c}</span>)}</div>
   <div className="meta"><span>{i}/{text.length}</span><span>{L("Mistakes","Thettukal")} {errs}</span><span>{L("Combo","Combo")} {combo}</span>
    <label><input type="checkbox" checked={blind} onChange={e=>setBlind(e.target.checked)}/> {L("Blind mode (hide keyboard)","Blind mode (keyboard maraykku)")}</label><button onClick={start}>↻</button></div>
   {!t0.current&&!res&&<p className="mute">{L("Just start typing. A wrong key won't move on, that's how fingers learn.","Type cheythu thudangu. Thettiyal munnottu pokilla, angane aanu viralukal padikkunnu.")}</p>}
  </div>
  {p.finger&&<div className="finger" style={{borderColor:COL[p.fi]||"var(--line)"}}>👉 <b>{text[i]===" "?"space":text[i]}</b> → <b>{p.finger}</b>{p.shift&&<> + <b>{p.fi<4?"Right":"Left"} Shift</b></>}</div>}
  {!blind&&<Keyboard target={text[i]}/>}
  {res&&<div className="res"><div className="big">{res.s?"⭐".repeat(res.s):"🦥"}</div><p>{L(MSG[res.s][0],MSG[res.s][1])}</p><p><b>{res.wpm} WPM · {res.acc}% · +{res.xp} XP</b></p>
   <div>{res.s>0&&nxt?<button className="go-btn" onClick={()=>r.push("/lesson/"+nxt.id)}>{L("Next lesson →","Adutha lesson →")}</button>:null} <button onClick={start}>↻ {L("Again","Veendum")}</button> <Link className="btn" href="/play">{L("Map","Map")}</Link></div></div>}
 </>);
}
export default function Page(){const {id}=useParams();return <AppShell><Lesson key={id} id={id}/></AppShell>}
