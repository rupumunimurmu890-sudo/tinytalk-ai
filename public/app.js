"use strict";
// ---- Data (English words are separate from Hindi labels) ----
const LET="Apple,सेब,🍎;Ball,गेंद,⚽;Cat,बिल्ली,🐱;Dog,कुत्ता,🐶;Elephant,हाथी,🐘;Fish,मछली,🐟;Grapes,अंगूर,🍇;Hat,टोपी,🎩;Ice cream,आइसक्रीम,🍦;Juice,जूस,🧃;Kite,पतंग,🪁;Lion,शेर,🦁;Moon,चाँद,🌙;Nest,घोंसला,🪺;Orange,संतरा,🍊;Pencil,पेंसिल,✏️;Queen,रानी,👑;Rabbit,खरगोश,🐰;Sun,सूरज,☀️;Tree,पेड़,🌳;Umbrella,छाता,☂️;Van,वैन,🚐;Watch,घड़ी,⌚;Xylophone,जाइलोफ़ोन,🎶;Yo-yo,योयो,🪀;Zebra,ज़ेबरा,🦓".split(";").map((s,i)=>{const[w,h,e]=s.split(",");return{l:String.fromCharCode(65+i),w,h,e}});
const ANI=[["Cat","Meow","बिल्ली","🐱"],["Dog","Woof","कुत्ता","🐶"],["Cow","Moo","गाय","🐮"],["Lion","Roar","शेर","🦁"],["Duck","Quack","बत्तख","🦆"],["Sheep","Baa","भेड़","🐑"],["Horse","Neigh","घोड़ा","🐴"],["Elephant","Toot toot","हाथी","🐘"]].map(([n,s,h,e])=>({n,s,h,e}));
// ---- State (local only) ----
const KEY="tinytalk.v1";
let S={letters:[],words:[],games:0,correct:0,secs:0,mute:false};
try{S=Object.assign(S,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const mark=(k,v)=>{if(!S[k].includes(v)){S[k].push(v);save()}};
setInterval(()=>{if(!document.hidden){S.secs++;if(S.secs%15==0)save()}},1000);
// ---- Audio: browser TTS fallback (no recorded audio files shipped) ----
const say=(t,lang="en-US",rate=.8)=>{if(S.mute||!("speechSynthesis"in window))return;
speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=lang;u.rate=rate;u.pitch=1.2;speechSynthesis.speak(u)};
const $=s=>document.querySelector(s),app=$("#app");
const pop=el=>{el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop")};
const shuf=a=>[...a].sort(()=>Math.random()-.5);
const pick=(a,n)=>shuf(a).slice(0,n);
const cheer=()=>say(pick(["Great!","Well done!","Super!","Yay!"],1)[0]);
// ---- Screens ----
function home(){app.innerHTML=`<div class="big bob" id="t">🦉</div>
<p><b>देखो, सुनो, बोलो और अंग्रेज़ी सीखो!</b></p>
<div class="menu"><button onclick="az()">🔤 A–Z</button><button class="b" onclick="animals()">🐾 Animals</button><button class="c" onclick="games()">🎮 Games</button><button style="background:#7b2cbf" onclick="phrases()">🗣️ Speak</button><button style="background:#555" onclick="parent()">👨‍👩‍👧 Parents</button></div>`;
$("#t").onclick=()=>{pop($("#t"));say("Hello! I am Tiny Owl.");setTimeout(()=>say("नमस्ते! चलो अंग्रेज़ी सीखें!","hi-IN",.9),1800)}}
function az(){app.innerHTML=`<h2>A–Z</h2><div class="grid">${LET.map((x,i)=>`<button onclick="letter(${i})">${x.l}${x.l.toLowerCase()}</button>`).join("")}</div>`}
function letter(i){const x=LET[i];mark("letters",x.l);mark("words",x.w);
app.innerHTML=`<div class="card"><h2 style="font-size:3rem">${x.l} ${x.l.toLowerCase()}</h2>
<div class="big" id="p">${x.e}</div><h2>${x.w}</h2><p>${x.h}</p><p>${x.l} is for ${x.w}.</p>
<div class="row"><button onclick="say('${x.l}')">🔊 Letter</button><button class="b" id="r">🔁 Word</button></div></div>
<div class="card"><p>✍️ उँगली से लिखो / Trace</p><canvas id="cv" width="320" height="220"></canvas>
<div class="row"><button class="c" id="cl">🧽 Clear</button></div></div>
<div class="row"><button ${i?`onclick="letter(${i-1})"`:"disabled"}>⬅️</button><button class="b" onclick="az()">🔤</button><button ${i<25?`onclick="letter(${i+1})"`:"disabled"}>➡️</button></div>`;
const hear=()=>{pop($("#p"));say(x.w+". "+x.l+" is for "+x.w)};$("#p").onclick=hear;$("#r").onclick=hear;hear();trace(x.l)}
function trace(ch){const c=$("#cv"),g=c.getContext("2d");
const draw=()=>{g.clearRect(0,0,320,220);g.fillStyle="#e0e0e0";g.font="bold 170px sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText(ch+ch.toLowerCase(),160,115)};draw();
g.lineWidth=14;g.lineCap=g.lineJoin="round";g.strokeStyle="#e71d36";let d=false;
const p=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*320/r.width,(e.clientY-r.top)*220/r.height]};
c.onpointerdown=e=>{d=true;c.setPointerCapture(e.pointerId);g.beginPath();g.moveTo(...p(e))};
c.onpointermove=e=>{if(d){g.lineTo(...p(e));g.stroke()}};c.onpointerup=()=>d=false;$("#cl").onclick=draw}
function animals(){app.innerHTML=`<h2>Animals</h2><div class="grid">${ANI.map((a,i)=>`<button style="font-size:2.6rem;background:var(--card)" onclick="animal(${i})">${a.e}</button>`).join("")}</div>`}
function animal(i){const a=ANI[i];mark("words",a.n);
app.innerHTML=`<div class="card"><div class="big" id="p">${a.e}</div><h2>${a.n}</h2><p>${a.h}</p><p>This is a ${a.n.toLowerCase()}.</p><p>🔊 “${a.s}!”</p><button id="r">🔁 Hear</button></div><div class="row"><button onclick="animals()">🐾</button></div>`;
const h=()=>{pop($("#p"));say(a.n+". "+a.s+"! This is a "+a.n.toLowerCase()+".")};$("#p").onclick=h;$("#r").onclick=h;h()}
const PH=[["Hello!","नमस्ते!"],["How are you?","आप कैसे हैं?"],["My name is …","मेरा नाम … है"],["Thank you.","धन्यवाद"],["Please help me.","कृपया मेरी मदद करो"],["What is this?","यह क्या है?"],["I am happy.","मैं खुश हूँ"],["Good morning.","सुप्रभात"],["I want water.","मुझे पानी चाहिए"]];
function phrases(){app.innerHTML=`<h2>Speak English</h2><p>सुनो, फिर दोहराओ। कोई गलती नहीं होती! (Listen, then repeat.)</p>`+PH.map((p,i)=>`<div class="card"><h2>${p[0]}</h2><p>${p[1]}</p><button onclick="say(PH[${i}][0])">🔊 Listen</button></div>`).join("")}
// ---- Games (shared quiz engine) ----
function games(){app.innerHTML=`<h2>Games</h2><div class="menu"><button onclick="quiz('listen')">👂 Listen & Choose</button><button class="b" onclick="quiz('letter')">🔎 Find the Letter</button><button class="c" onclick="quiz('sound')">🐮 Animal Sound</button><button style="background:#7b2cbf" onclick="quiz('match')">🖼️ Match Picture</button></div>`}
function quiz(kind,n=0,score=0){if(n==5){S.games++;S.correct+=score;save();app.innerHTML=`<div class="card"><div class="big">⭐</div><h2>${score}/5</h2><p>बहुत बढ़िया! Well done!</p><div class="row"><button onclick="quiz('${kind}')">🔁</button><button class="b" onclick="games()">🎮</button></div></div>`;cheer();return}
let q,opts,ans,say1;
if(kind=="letter"){const l=pick(LET,4);ans=l[0];opts=shuf(l).map(x=>x.l);q=`Find the letter ${ans.l}`;ans=ans.l;say1=q}
else if(kind=="sound"){const l=pick(ANI,4);const a=l[0];opts=shuf(l).map(x=>x.e);ans=a.e;q="Who says “"+a.s+"”?";say1=a.s+"! Who says "+a.s+"?"}
else{const l=pick(LET,4);const a=l[0];opts=shuf(l).map(x=>x.e);ans=a.e;q=kind=="match"?a.w:"👂 Listen";say1=a.w}
app.innerHTML=`<h2>${q}</h2><p>${n+1}/5</p><div class="row"><button id="rp">🔁</button></div><div class="opts">${opts.map(o=>`<button>${o}</button>`).join("")}</div>`;
$("#rp").onclick=()=>say(say1);say(say1);let miss=0;
document.querySelectorAll(".opts button").forEach(b=>b.onclick=()=>{if(b.textContent==ans){b.classList.add("ok");pop(b);cheer();setTimeout(()=>quiz(kind,n+1,score+(miss?0:1)),900)}else{miss++;b.classList.add("try");say("Try again")}})}
// ---- Parent area (simple gate; no accounts, no data leaves device) ----
function parent(){const a=2+Math.floor(Math.random()*7),b=3+Math.floor(Math.random()*6);
app.innerHTML=`<div class="card"><h2>Parents only</h2><p>${a} + ${b} = ?</p><input id="gi" type="number" inputmode="numeric"> <button id="go">OK</button></div>`;
$("#go").onclick=()=>{if(+$("#gi").value==a+b)dash();else{$("#gi").value="";$("#gi").placeholder="❌"}}}
function dash(){app.innerHTML=`<div class="card" style="text-align:left"><h2>Progress (this device only)</h2>
<p>Letters opened: <b>${S.letters.length}/26</b></p><p>Words heard: <b>${S.words.length}</b></p><p>Games played: <b>${S.games}</b> (${S.correct} correct first try)</p><p>Time in app: <b>${Math.round(S.secs/60)} min</b></p>
<p style="opacity:.75">These show what was practiced, not mastery.</p></div>
<div class="row"><button id="mu">${S.mute?"🔇 Sound off":"🔊 Sound on"}</button><button class="c" id="rs">🗑️ Reset</button></div>
<p><a href="privacy.html">Privacy</a> · <a href="parent-guide.html">Parent guide</a></p>`;
$("#mu").onclick=()=>{S.mute=!S.mute;save();syncMute();dash()};
$("#rs").onclick=()=>{if(confirm("Reset all progress?")){S={letters:[],words:[],games:0,correct:0,secs:0,mute:S.mute};save();dash()}}}
const syncMute=()=>$("#mute").textContent=S.mute?"🔇":"🔊";
$("#home").onclick=home;$("#mute").onclick=()=>{S.mute=!S.mute;save();syncMute();if(S.mute&&window.speechSynthesis)speechSynthesis.cancel()};
const net=()=>$("#off").hidden=navigator.onLine;addEventListener("online",net);addEventListener("offline",net);net();syncMute();home();
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js").catch(()=>{}));
