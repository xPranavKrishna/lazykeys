"use client";
import AppShell from "../../components/AppShell";
import Keyboard from "../../components/Keyboard";
import Mascot from "../../components/Mascot";
import {useLang} from "../../lib/lang";
import {FING,COL,F} from "../../lib/fingers";
const POSTURE=[["Sit straight, feet flat on the floor.","Nere irikku, kaal nilathu vekku."],["Elbows about 90°, wrists relaxed (don't press them hard on the desk).","Kai muttu ~90°, manikattu relax aayirikkatte."],["Screen in front of your eyes, an arm's length away.","Screen kannin nere, kai-dooram akale."],["Eyes on the screen. Never on the keys!","Kannu screen-il. Key-il nokkalle!"],["Every 20 minutes, look far away for 20 seconds.","20 minute koodumbol 20 second dooreykku nokku."]];
const HOME=[["Left fingers: A S D F. Right fingers: J K L ;. Thumbs on space.","Idathu viral: A S D F. Valathu viral: J K L ;. Thumb space-il."],["Feel the little bumps on F and J. They tell your index fingers they are home.","F-lum J-yilum chinna bump undu. Index viral veettil ethiyathu athu parayum."],["After every key, come back home.","Ethu key adichaalum veettil thirichu varu."]];
const RULES=[["Accuracy first. Speed is a free gift later.","Aadyam accuracy. Speed pinneed thaanay varum."],["5 to 10 minutes every day beats 1 hour once a week.","Aazhchayil oru manikkoorekkal dhinam 5-10 minute nallathu."],["Made a mistake? Slow down, don't rush.","Thettiyo? Mellay, dhritti vendaa."]];
const List=({a,L})=><ul>{a.map((x,k)=><li key={k}>{L(x[0],x[1])}</li>)}</ul>;
function Guide(){
 const {L}=useLang();
 return(<>
  <Mascot/>
  <div className="card"><h2>🪑 {L("Sit like a pro","Pro pole irikku")}</h2><List a={POSTURE} L={L}/></div>
  <div className="card"><h2>🏠 {L("Home position","Home position")}</h2><Keyboard all/><List a={HOME} L={L}/></div>
  <div className="card"><h2>🖐 {L("Which finger types what","Ethu viral ethu key")}</h2>
   {FING.map((n,f)=><div key={f} className="frow" style={{borderColor:COL[f]}}><b style={{color:COL[f]}}>{n}</b><span>{Object.keys(F).filter(k=>F[k]===f).join("  ").toUpperCase()}</span></div>)}
   <div className="frow" style={{borderColor:"var(--mute)"}}><b>{L("Thumbs","Thumbs")}</b><span>space</span></div></div>
  <div className="card"><h2>🎯 {L("Lazy golden rules","Madiyan swarna niyamangal")}</h2><List a={RULES} L={L}/></div>
 </>);
}
export default function Page(){return <AppShell><Guide/></AppShell>}
