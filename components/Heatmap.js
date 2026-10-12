import {day} from "../lib/engine";
export default function Heatmap({days}){
 const cells=Array.from({length:70},(_,k)=>days?.[day(69-k)]||0);
 return <div className="heat">{cells.map((c,k)=><i key={k} style={{opacity:c?Math.min(.4+c*.2,1):.12}}/>)}</div>;
}
