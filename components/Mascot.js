"use client";
import {useEffect,useState} from "react";
import {useLang} from "../lib/lang";
export const TIPS=[
["Eyes on the screen, not the keys. Trust your fingers! 👀","Kannu screen-il, key-il alla. Viralukale viswasikku! 👀"],
["Slow and correct beats fast and wrong. Speed comes by itself.","Thettathe mellay type cheyyu. Speed thaanay varum."],
["Sit straight, wrists relaxed. Your back says thanks 🙏","Nere irikku, manikattu relax aayirikkatte. Nadumbu nanni parayum 🙏"],
["Tired? Stop. One good round beats ten sleepy ones. 😴","Kshenichu poyo? Nirthu. Oru nalla round mathi. 😴"],
["Every 20 minutes, look far away for 20 seconds. Eyes need rest 👁️","20 minute koodumbol 20 second dooreykku nokku. Kannin vishramam 👁️"],
["Mistakes are free here. They show us what to practise! 🐛","Ivide thettukal free aanu. Enthu practice cheyyanam ennu ath kaanikkum! 🐛"],
["F and J have little bumps. Feel them and you're home. 🏠","F-lum J-yilum chinna bump undu. Thottaal veetil ethi. 🏠"]];
export default function Mascot({say}){
 const {L}=useLang(),[i,setI]=useState(0);
 useEffect(()=>setI(Math.floor(Math.random()*TIPS.length)),[]);
 const s=say||TIPS[i];
 return <div className="mascot"><span className="sloth">🦥</span><p>{L(s[0],s[1])}</p></div>;
}
