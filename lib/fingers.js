export const ROWS=["1234567890-=","qwertyuiop[]","asdfghjkl;'","zxcvbnm,./"];
export const FING=["Left pinky","Left ring","Left middle","Left index","Right index","Right middle","Right ring","Right pinky"];
export const COL=["#e58fa8","#e8a77b","#e5d07b","#8fd6a2","#8ccbe0","#93a4ee","#b99be8","#e49bd4"];
export const F={};
const as=(s,f)=>[...s].forEach(k=>F[k]=f);
as("1qaz",0);as("2wsx",1);as("3edc",2);as("45rtfgvb",3);as("67yuhjnm",4);as("8ik,",5);as("9ol.",6);as("0-=p[];'/",7);
const SH={"!":"1","@":"2","#":"3","$":"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0","_":"-","+":"=","{":"[","}":"]",":":";",'"':"'","<":",",">":".","?":"/"};
// which key, which finger, do we need Shift?
export function plan(ch){
 if(ch===" ")return {base:" ",finger:"Thumb"};
 let b=ch,shift=false;
 if(SH[ch]){b=SH[ch];shift=true}else if(/[A-Z]/.test(ch)){b=ch.toLowerCase();shift=true}
 const fi=F[b];return {base:b,shift,fi,finger:fi===undefined?null:FING[fi]};
}
