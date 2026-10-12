import {F,FING} from "./fingers";
export const day=n=>{const d=new Date();d.setDate(d.getDate()-n);const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),dayNum=String(d.getDate()).padStart(2,"0");return `${y}-${m}-${dayNum}`};
export const streakOf=ds=>{if(!ds)return 0;let i=ds[day(0)]?0:1,s=0;while(ds[day(i)]){s++;i++}return s};
const many=(a,n)=>[...a].sort(()=>Math.random()-.5).slice(0,n);
const rnd=(s,n)=>Array.from({length:n},()=>s[Math.floor(Math.random()*s.length)]).join("");
const pick=(a,w)=>{let t=a.reduce((s,k)=>s+w(k),0),r=Math.random()*t;for(const k of a){r-=w(k);if(r<=0)return k}return a[0]};
const W=w=>w.split(/\s+/);
const WORDS=W(`a as ad add all ask dad dads fall falls flask gas glad glass had hall half has lad lads lash sad salad shall slash alfalfa
see seek feed feel heal head hide side life like file fish desk deal lead leaf ideal jail kid kids lie lies sell self shed shelf slide field sick silk skill skid slid seed said sail fail fake lake sake shake flake ease easy idea if is it in
the and you that with have this from they will would there their what about which when make time just know people into year your good some could them other than then now look only come over think also back after use two how our work first well way even new want because any these give day most us out up so do go he me my no of on or to we be by an at am
run fun sun sky try dry fly why who wow row low show grow slow town down brown tree free three green street speed type fast quick lazy keys typing finger fingers practice rest happy funny tea chai rain sleep dream music movie phone water drink food rice fruit mango coconut kerala boat beach hills
zero zoo zone size quiz quote queen quite quiet jazz jump jelly box fix six exam next relax extra expert maybe very every again always never before little great small large right left write read learn study teach school friend family night light bright flight thought through enough around between important together`);
const NAMES=W("Anu Ravi Priya Arun Maya Hari Sneha Kiran Meera Nikhil Divya Rahul Pranav Anjali Vishnu Lakshmi");
const PLACES=W("Kerala Kochi Kasaragod Chennai Delhi Mumbai Goa Munnar Alleppey Mysore Pune Vizag");
const SENT=["The quick brown fox jumps over the lazy dog.","Practice a little every day, and you will get fast.","Slow and steady wins the race.","Do you like tea, or do you like coffee?","I will not look at the keys today!","Typing is a skill, not a talent.","Mistakes help us learn, so don't be afraid.","A lazy cat sleeps in the warm sun.","What is your favourite food? Mine is biryani.","It's raining outside, so let's stay in and type.","Good habits start small, and small habits grow.","Rest your wrists, relax your shoulders, and keep going.","Every expert was once a beginner.","Can you type this without looking down?","The best time to start was yesterday, the next best time is now.","Kerala has beaches, backwaters, and delicious food."];
const CODE=['let total = a + b;','if (x > 10) { run(); }','const list = [1, 2, 3];','for (let i = 0; i < 5; i++) {}','print("Hello, World!")','def add(a, b): return a + b','SELECT * FROM users;','console.log(name);','items.map((n) => n * 2)','x = (a + b) * c - d / e','<div class="box">Hi</div>',"user_name = 'lazy'"];
const MAL=[
 "Sukhamano? Njan nalla sukhathil aanu.",
 "Chaya kudichittu type cheyyam.",
 "Madi kalanju type cheyyu.",
 "Ente viralukal ippo poli aanu!",
 "Innu oru round koodi, pinne vishramam.",
 "Mazha peyyunnu, nalla chaya venam.",
 "Thettathe type cheythal speed thaanay varum.",
 "Sadya kazhinju urangi poyi.",
 "Enthaa vishesham? Sukham thanne alle?",
 "Kerala pole oru nadu vere illa.",
 "Sadhanam kayyil undo? Sadhanam kayyil und!",
 "Kathi thazhe ideda! Njan paranjille kathi thazhe idan!",
 "Nalla choodu pazhampori-yum beef roast-um mathi.",
 "Scene contra aanu machane, viral ippo theeppori!",
 "Poli saanam, vere level typing speed da!"
];
const DATES=["12/10/2026","108","9:30","24x7","405","7:45","15-08-2026","100","2026","3.14"];

export const MANGLISH_PACKS=[
 {id:"cinema",name:"Cinema Punch",emoji:"🎬",desc:"Iconic Malayalam movie dialogues",
  items:[
   {text:"Sadhanam kayyil undo? Sadhanam kayyil und!",tag:"Nadodikkattu",hint:"CID Ramdas & Vijayan"},
   {text:"Kathi thazhe ideda! Njan paranjille kathi thazhe idan!",tag:"Kireedam",hint:"Sethumadhavan peak"},
   {text:"Poland-ine patti oraksharam parayaruthu!",tag:"Sandesham",hint:"Sathyan Anthikad classic"},
   {text:"Enthokkeyaada ee kochu keralathil nadakkunne!",tag:"Kilukkam",hint:"Nischal frustration"},
   {text:"Nee aaraada? Njan aaraannu enikku thanne ariyilla!",tag:"Manichitrathazhu",hint:"Nagavalli vibes"},
   {text:"Ormayundo ee mukham? IPS aaneda!",tag:"Commissioner",hint:"Bharat Chandran IPS"},
   {text:"Namukku oru chaya kudichalo machane?",tag:"Bangalore Days",hint:"Chilling with gang"},
   {text:"Pavanayi shavamayi! Athu oru vithathil nallathaa.",tag:"Vietnam Colony",hint:"Innocent & Mohanlal"},
   {text:"Dhe pinneyum madiyan! Viralukal ippo rocket aakum.",tag:"LazyKeys Special",hint:"Madiyan motivation"}
  ]},
 {id:"food",name:"Chaya & Kadi",emoji:"☕",desc:"Kerala food vibes & tea stall talks",
  items:[
   {text:"Nalla choodu pazhampori-yum beef roast-um mathi.",tag:"Chaya Kada",hint:"Classic evening combo"},
   {text:"Oru sulaimani-yil oru kashnam lemon, swargam!",tag:"Malabar Special",hint:"After-biryani refresher"},
   {text:"Porotta-yum beef fry-um kazhichu nalla urakkam.",tag:"Thattukada",hint:"Midnight food craving"},
   {text:"Kattan chaya kudichu keyboard pottikku machane.",tag:"Chaya Vibe",hint:"High caffeine boost"},
   {text:"Unniyappam, kozhukkatta, achappam, pinne choodu chaya.",tag:"Naadan Bakshanam",hint:"Traditional snacks"},
   {text:"Kozhikodan biryani kazhinju oru dum chaya.",tag:"Malabar",hint:"Fragrant kaima bliss"}
  ]},
 {id:"slang",name:"Nadan Slang",emoji:"⚡",desc:"Campus & youth slang",
  items:[
   {text:"Scene contra aanu machane, viral ippo theeppori!",tag:"Campus Slang",hint:"High tension, high speed"},
   {text:"Poli saanam, vere level typing speed da!",tag:"Freak Vibes",hint:"Appreciation 100"},
   {text:"Madi kalanju type cheyyu, veruthe irunnal madiyan aakum.",tag:"Advice",hint:"Wake up and grind"},
   {text:"Mass da! Viralukal ippo butter pole smooth aayi.",tag:"Pro Mode",hint:"Peak touch typing flow"},
   {text:"Oru round koodi, athode innu full scene oke aakum.",tag:"Night Owl",hint:"Just one more round"},
   {text:"Njan oru lazy legend aanu, keyboard-inte thalavan.",tag:"Swagger",hint:"Ultimate flex"}
  ]},
 {id:"wisdom",name:"Madiyan Wisdom",emoji:"🦥",desc:"Madiyan the Sloth's golden rules",
  items:[
   {text:"Innathe pani naale cheyyam, innu oru round mathi.",tag:"Sloth Rule #1",hint:"Consistency over cramming"},
   {text:"Type cheythu maduthaal oru cheruthayi urangikko.",tag:"Sloth Rule #2",hint:"Rest is part of training"},
   {text:"Fast aavan dhrithi venda, 95% accuracy aanu main.",tag:"Golden Rule",hint:"Accuracy builds speed"},
   {text:"Kannu screen-il mathram, keys-ilekku nokkalle koche.",tag:"Touch Typing",hint:"Trust your finger memory"},
   {text:"Viralukal nalla speed-il poyal innu biryani medikkam.",tag:"Reward System",hint:"Motivation through food"}
  ]}
];

export const LEVELS=[
{id:"home",name:"Home Row",emoji:"🏠",when:"Week 1",d:["Learn where your fingers live.","Viralukal thaamasikkunna idam padikkam."]},
{id:"top",name:"Top Row",emoji:"⬆️",when:"Week 2",d:["Reach up, then come back home.","Mukalilekku ethi, veendum veettil varu."]},
{id:"bottom",name:"Bottom Row",emoji:"⬇️",when:"Week 3",d:["Reach down and stay relaxed.","Thazhekku ethu, relax aayirikku."]},
{id:"words",name:"Real Words",emoji:"📖",when:"Week 4",d:["Real words, finally!","Ini sherikkum vaakkukal!"]},
{id:"caps",name:"Shift & Capitals",emoji:"🔠",when:"Week 4",d:["Shift key time.","Shift key samayam."]},
{id:"punct",name:"Sentences",emoji:"✍️",when:"Week 5",d:["Commas, dots and full sentences.","Comma, dot, poorna vaakyangal."]},
{id:"nums",name:"Numbers",emoji:"🔢",when:"Week 5-6",d:["The number row.","Number row."]},
{id:"code",name:"Code & Symbols",emoji:"💻",when:"Week 6",d:["Brackets and symbols (great for coders!).","Bracket-um symbols-um (coders-inu nallathu!)."]},
{id:"speed",name:"Speed Builder",emoji:"🚀",when:"Week 7-8",d:["Build speed, keep accuracy.","Speed koottu, accuracy kalayalle."]},
{id:"pro",name:"Pro Zone",emoji:"👑",when:"Week 9-10",d:["Long text, real pro skills.","Neelam koodiya text, pro skills."]},
{id:"fun",name:"Manglish Fun",emoji:"🌴",when:"Bonus",d:["Type Manglish for fun!","Manglish type cheythu rasikku!"]}];
// new keys are taught in pairs (left + right hand), in an order used by good typing courses
const GROUPS=["fj","dk","sl","a;","gh","ei","ru","ty","ow","qp","vm","c,","bn","x.","z/"];
const X=[["words","First real words","words",8],["words","Common words","words",12],["words","Longer words","words",15],["words","Word sprint","words",18],
["caps","Shift: names","caps",12,"names"],["caps","Shift: places","caps",14,"places"],["caps","Capital sentences","sent",16],
["punct","Commas & full stops","sent",16],["punct","Questions & quotes","sent",18],["punct","Short stories","sent",20],
["nums","Left-hand numbers","num",10,"12345"],["nums","Right-hand numbers","num",10,"67890"],["nums","Number mix","num",14,"1234567890"],["nums","Dates & phone numbers","num",16,"dates"],
["code","Brackets & maths","code",12],["code","Tiny code","code",14],["code","Code sprint","code",18],
["speed","Speed 25","sent",25],["speed","Speed 30","sent",30],["speed","Speed 35","sent",35],["speed","Speed 40","sent",40],
["pro","Pro 45","sent",45],["pro","Pro 50","sent",50],["pro","Pro 60","sent",60],["pro","Boss level 70","sent",70],
["fun","Manglish type-along 1","mal",15],["fun","Manglish type-along 2","mal",20],["fun","Manglish type-along 3","mal",25]];
export const LESSONS=(()=>{const o=[];let pool="";
 GROUPS.forEach((g,i)=>{pool+=g;const level=i<5?"home":i<10?"top":"bottom";
  o.push({id:`k${i}a`,level,title:"Meet "+[...g].map(c=>c.toUpperCase()).join(" & "),kind:"meet",keys:g,pool,goal:0});
  o.push({id:`k${i}b`,level,title:i<3?"Mix it up":"Real words",kind:i<3?"drill":"words",keys:g,pool,goal:0})});
 X.forEach(([level,title,kind,goal,keys],j)=>o.push({id:`x${j}`,level,title,kind,goal,keys:keys||"",pool:""}));
 return o})();
export const RESCUE={id:"rescue",level:"rescue",title:"Weak-key rescue",kind:"rescue",goal:0,keys:"",pool:""};

const lett=s=>[...s].filter(c=>/[a-z]/.test(c));
const fits=(w,pl)=>[...w].every(c=>pl.includes(c));
// short chunks; punctuation only shows up when it is the NEW key (no more ;;;; spam)
function chunks(L,weak,n){const nk=[...L.keys],pl=lett(L.pool).concat(nk.filter(k=>!/[a-z]/.test(k)));
 return Array.from({length:n},()=>Array.from({length:2+Math.floor(Math.random()*3)},()=>pick(Math.random()<.6?nk:pl,k=>1+(weak[k]||0)*3)).join(""))}
function words(L,weak){const pl=L.pool?lett(L.pool):[..."abcdefghijklmnopqrstuvwxyz"],ws=WORDS.filter(w=>fits(w,pl));
 if(ws.length<6)return chunks(L,weak,9).join(" ");
 const n=8+Math.round((L.goal||0)/5);
 return Array.from({length:n},()=>pick(ws,w=>1+([...L.keys].some(k=>w.includes(k))?3:0)+[...w].reduce((a,c)=>a+(weak[c]||0)*2,0))).join(" ")}
function meet(L,weak){const pl=lett(L.pool),fresh=WORDS.filter(w=>fits(w,pl)&&[...w].some(c=>L.keys.includes(c)));
 return fresh.length>=3?chunks(L,weak,4).join(" ")+" "+many(fresh,5).join(" "):chunks(L,weak,9).join(" ")}
export function makeText(L,weak={}){
 const k=L.kind;
 if(k==="meet")return meet(L,weak);
 if(k==="drill")return chunks(L,weak,9).join(" ");
 if(k==="words")return words(L,weak);
 if(k==="rescue"){const ks=Object.entries(weak).filter(([c])=>/[a-z]/.test(c)).sort((a,b)=>b[1]-a[1]).slice(0,4).map(e=>e[0]),p=WORDS.filter(w=>ks.some(c=>w.includes(c)));return many(p.length>5?p:WORDS,9).join(" ")}
 if(k==="caps")return many(L.keys==="places"?PLACES:NAMES,6).join(" ");
 if(k==="num")return L.keys==="dates"?many(DATES,5).join(" "):Array.from({length:6},()=>rnd(L.keys,2+Math.floor(Math.random()*3))).join(" ");
 if(k==="code")return many(CODE,2).join(" ");
 if(k==="mal")return many(MAL,2).join(" ");
 return many(SENT,Math.max(2,Math.round(L.goal/12))).join(" ");
}
export const merge=(w,m)=>{const o={...w};for(const k in m)o[k]=(o[k]||0)+m[k];return o};
export const half=w=>Object.fromEntries(Object.entries(w).map(([k,v])=>[k,Math.floor(v/2)]).filter(e=>e[1]>0));
export const newKeys=L=>["meet","drill"].includes(L.kind)?[...L.keys].filter(k=>F[k]!==undefined).map(k=>`${k.toUpperCase()} → ${FING[F[k]]}`).join("  ·  "):"";
