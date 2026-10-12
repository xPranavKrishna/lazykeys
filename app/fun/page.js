"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import gsap from "gsap";
import AppShell from "../../components/AppShell";
import Keyboard from "../../components/Keyboard";
import {useProgress} from "../../components/ProgressProvider";
import {useLang} from "../../lib/lang";
import {MANGLISH_PACKS,day} from "../../lib/engine";
import {COL,plan} from "../../lib/fingers";

export default function FunPage(){
 const {d,update}=useProgress();
 const {L,t}=useLang();
 const [packIdx,setPackIdx]=useState(0);
 const [itemIdx,setItemIdx]=useState(0);
 const [text,setText]=useState("");
 const [i,setI]=useState(0);
 const [errs,setErrs]=useState(0);
 const [combo,setCombo]=useState(0);
 const [bad,setBad]=useState(false);
 const [blind,setBlind]=useState(false);
 const [done,setDone]=useState(null);
 const t0=useRef(0),boxRef=useRef(),comboRef=useRef(),confettiRef=useRef(),badTimer=useRef();

 const curPack=MANGLISH_PACKS[packIdx];
 const curItem=curPack.items[itemIdx];

 const loadDialogue=(pIdx,iIdx)=>{
  const p=MANGLISH_PACKS[pIdx];
  const item=p.items[iIdx];
  setText(item.text);
  setI(0);
  setErrs(0);
  setCombo(0);
  setDone(null);
  t0.current=0;
  if(boxRef.current){
   gsap.fromTo(boxRef.current,{opacity:0.4,y:10},{opacity:1,y:0,duration:0.35,ease:"power2.out"});
  }
 };

 useEffect(()=>{loadDialogue(packIdx,itemIdx)},[packIdx,itemIdx]);

 const launchConfetti=()=>{
  if(!confettiRef.current)return;
  const container=confettiRef.current;
  container.innerHTML="";
  const emojis=["🌴","✨","🔥","🎉","🥥","⭐","⚡"];
  for(let j=0;j<24;j++){
   const el=document.createElement("span");
   el.textContent=emojis[j%emojis.length];
   el.className="fun-particle";
   el.style.left="50%";
   el.style.top="50%";
   container.appendChild(el);
   gsap.to(el,{
    x:(Math.random()-0.5)*360,
    y:(Math.random()-0.5)*260-40,
    rotation:Math.random()*720-360,
    scale:Math.random()*1.4+0.6,
    opacity:0,
    duration:1.2+Math.random()*0.6,
    ease:"power2.out",
    onComplete:()=>el.remove()
   });
  }
 };

 const finishDialogue=e=>{
  const n=text.length;
  const min=Math.max((performance.now()-t0.current)/60000,0.01);
  const wpm=Math.round(n/5/min);
  const acc=Math.round(n/(n+e)*100);
  const xpAward=acc>=90?15:8;
  const today=day(0);

  update(p=>({
   ...p,
   xp:p.xp+xpAward,
   days:{...p.days,[today]:(p.days[today]||0)+1}
  }));

  setI(n);
  setDone({wpm,acc,xpAward});
  launchConfetti();
 };

 const nextDialogue=()=>{
  if(itemIdx+1<curPack.items.length){
   setItemIdx(itemIdx+1);
  }else{
   setItemIdx(0);
  }
 };

 const randomDialogue=()=>{
  const rPack=Math.floor(Math.random()*MANGLISH_PACKS.length);
  const rItem=Math.floor(Math.random()*MANGLISH_PACKS[rPack].items.length);
  setPackIdx(rPack);
  setItemIdx(rItem);
 };

 useEffect(()=>{
  const h=ev=>{
   if(done){
    if(ev.key==="Enter"){ev.preventDefault();nextDialogue()}
    return;
   }
   if(!text||ev.ctrlKey||ev.metaKey||ev.altKey||ev.key.length!==1)return;
   ev.preventDefault();
   if(!t0.current)t0.current=performance.now();

   if(ev.key===text[i]){
    const nextCombo=combo+1;
    setCombo(nextCombo);
    if(nextCombo>1&&nextCombo%5===0&&comboRef.current){
     gsap.fromTo(comboRef.current,{scale:1.6,rotation:nextCombo%2?8:-8},{scale:1,rotation:0,duration:0.4,ease:"back.out(3)"});
    }
    if(i+1===text.length){
     finishDialogue(errs);
    }else{
     setI(i+1);
    }
   }else{
    setErrs(x=>x+1);
    setCombo(0);
    clearTimeout(badTimer.current);
    setBad(true);
    badTimer.current=setTimeout(()=>setBad(false),180);
    if(boxRef.current){
     gsap.fromTo(boxRef.current,{x:-8},{x:0,duration:0.35,ease:"elastic.out(1,.4)"});
    }
   }
  };
  addEventListener("keydown",h);
  return()=>removeEventListener("keydown",h);
 });

 const p=plan(text[i]||"");

 const comboLabel=combo>=20?L("👑 Mass Raja!","👑 Mass Raja!"):
  combo>=15?L("💥 Poli Saanam!","💥 Poli Saanam!"):
  combo>=10?L("⚡ Theeppori!","⚡ Theeppori!"):
  combo>=5?L("🔥 On Fire!","🔥 Thee Thudangi!"):
  combo>0?`${combo} ${L("Combo","Combo")}`:"";

 return(
  <AppShell>
   <div className="fun-wrap">
    <div className="fun-header">
     <div className="fun-title-row">
      <Link href="/play" className="btn mini">← {L("Home Map","Veedu")}</Link>
      <h1>🌴 {L("Manglish Arcade","Manglish Koodaram")}</h1>
     </div>
     <p className="mute">{L("Type iconic Malayalam movie punchlines, food cravings & campus slang!","Cinemayum chaya-yum nadan thallum type cheythu rasikku!")}</p>
    </div>

    {/* Pack Selector Tabs */}
    <div className="fun-packs">
     {MANGLISH_PACKS.map((pack,idx)=>(
      <button
       key={pack.id}
       type="button"
       className={"pack-btn"+(packIdx===idx?" active":"")}
       onClick={()=>{setPackIdx(idx);setItemIdx(0)}}
      >
       <span>{pack.emoji}</span> <b>{L(pack.name,pack.name)}</b>
      </button>
     ))}
    </div>

    {/* Active Item Card */}
    <div className="card fun-arena" ref={boxRef}>
     <div className="fun-meta-bar">
      <span className="fun-badge">{curItem.tag}</span>
      <span className="mute" style={{fontSize:".85rem"}}>{curItem.hint}</span>
      <span className="pills" style={{marginLeft:"auto"}}>
       <b>{itemIdx+1}/{curPack.items.length}</b>
       {comboLabel&&<b ref={comboRef} className="combo-pill">{comboLabel}</b>}
      </span>
     </div>

     {/* Typing Text Area */}
     <div className="text fun-text">
      {[...text].map((c,k)=>(
       <span key={k} className={k<i?"ok":k===i?"cur"+(bad?" bad":""):""}>
        {c===" "?"\u00a0":c}
       </span>
      ))}
     </div>

     {/* Controls */}
     <div className="meta">
      <span>{i}/{text.length}</span>
      <span>{L("Mistakes","Thettukal")}: {errs}</span>
      <label>
       <input type="checkbox" checked={blind} onChange={e=>setBlind(e.target.checked)}/> {L("Blind mode","Blind mode")}
      </label>
      <button type="button" className="btn mini" onClick={()=>loadDialogue(packIdx,itemIdx)}>↻ {L("Retry","Veendum")}</button>
      <button type="button" className="btn mini" onClick={randomDialogue}>🎲 {L("Random","Random")}</button>
     </div>
    </div>

    {/* Live Finger Guide */}
    {p.finger&&!done&&(
     <div className="finger" style={{borderColor:COL[p.fi]||"var(--line)"}}>
      👉 <b>{text[i]===" "?"space":text[i]}</b> → <b>{p.finger}</b>{p.shift&&<> + <b>{p.fi<4?"Right":"Left"} Shift</b></>}
     </div>
    )}

    {/* Keyboard */}
    {!blind&&!done&&<Keyboard target={text[i]}/>}

    {/* Celebration Modal */}
    {done&&(
     <div className="res fun-res">
      <div ref={confettiRef} className="confetti-holder"/>
      <div className="big">🎉</div>
      <h2>{L("Dialogue Cleared! Poli!","Dialogue theernnu! Poli! 🎉")}</h2>
      <p className="mute"><i>"{text}"</i></p>
      <p><b>{done.wpm} WPM · {done.acc}% accuracy · +{done.xpAward} XP</b></p>
      <div className="fun-res-btns">
       <button type="button" className="go-btn" onClick={nextDialogue}>
        ▶ {L("Next Dialogue → (Enter)","Adutha Dialogue → (Enter)")}
       </button>
       <button type="button" onClick={()=>loadDialogue(packIdx,itemIdx)}>↻ {L("Again","Veendum")}</button>
       <button type="button" onClick={randomDialogue}>🎲 {L("Random","Random")}</button>
      </div>
     </div>
    )}
   </div>
  </AppShell>
 );
}
