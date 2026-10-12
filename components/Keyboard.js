import {ROWS,COL,F,plan} from "../lib/fingers";
// colour = finger. Glowing key = next key. Little bar on F and J = home bumps.
export default function Keyboard({target="",all}){
 const p=plan(target),sh=hand=>"key wide"+(p.shift&&hand?" go":"");
 return(<div className={"kb"+(all?" all":"")}>
  {ROWS.map((r,ri)=><div key={ri} className="row" style={{marginLeft:[0,16,26,0][ri]}}>
   {ri===3&&<div className={sh(p.fi>=4)}>⇧</div>}
   {[...r].map(k=><div key={k} className={"key"+(p.base===k?" go":"")+("fj".includes(k)?" bump":"")} style={{borderColor:COL[F[k]],color:COL[F[k]]}}>{k}</div>)}
   {ri===3&&<div className={sh(p.fi<4)}>⇧</div>}
  </div>)}
  <div className={"space"+(target===" "?" go":"")}>space</div></div>);
}
