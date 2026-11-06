(()=>{const KEY="voicecampus_feedback_v2",$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CATS={Academics:["book","#5b3df5"],Administration:["building","#2f7de1"],Infrastructure:["grid","#d99100"],"Student Welfare":["heart","#e5497a"],Technology:["laptop","#16a57a"],Other:["spark","#7c7a99"]};
const ST=["Submitted","Under Review","In Progress","Resolved"],SC=["#7a6cf0","#d99100","#2f7de1","#16a57a"],H=36e5,N=Date.now();
const ic=n=>`<svg class="ic"><use href="#i-${n}"/></svg>`,esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const mk=(id,title,category,location,message,status,h,votes,name="")=>({id,title,category,location,message,anonymous:!name,name,status,date:N-h*H,votes});
const seed=[mk("VC-1048","Add charging points in the library","Infrastructure","Main Library","Most sockets are taken by mid-morning. A few more charging points would help students who work on laptops all day.","Submitted",3,14),
mk("VC-1047","Publish exam timetables earlier","Academics","Academic Office","Timetables appear only a few days before exams. Two weeks of notice would make planning travel and study much easier.","Under Review",9,31,"Alex M."),
mk("VC-1046","Quiet study areas open later in exam weeks","Infrastructure","Main Library","Extending access to quiet study areas into the evening during examination periods would help a lot of us.","In Progress",20,42),
mk("VC-1045","Wi-Fi drops in the Student Centre","Technology","Student Centre","The connection is inconsistent in shared spaces, which makes research and online classes difficult.","Under Review",31,27),
mk("VC-1044","One place for timetable changes","Academics","Academic Office","A single noticeboard or page for timetable updates would stop students missing changes.","In Progress",44,19,"Chanda K."),
mk("VC-1043","Counselling hours are hard to find","Student Welfare","Student Services","It is unclear when counsellors are available. Posting hours online and at the door would help.","Submitted",52,11),
mk("VC-1042","Shorter queues at fee payment","Administration","Finance Office","Queues at the start of term are very long. Extra counters or an online option would save hours.","Under Review",70,23),
mk("VC-1041","More drinking water points","Student Welfare","Sports Area","Extra water points near the sports area would make long days more comfortable.","Resolved",96,16,"M. Banda"),
mk("VC-1040","Fix broken lights on the hostel path","Infrastructure","Hostels","Several lights on the path are out, which makes walking back after evening classes feel unsafe.","Resolved",140,38)];
let fb=(()=>{try{const s=localStorage.getItem(KEY)||localStorage.getItem("voicecampus_feedback_v1");if(s)return JSON.parse(s).map(x=>({votes:0,...x}))}catch(e){}return seed})();
let voted=(()=>{try{return JSON.parse(localStorage.getItem("vc_voted")||"[]")}catch(e){return[]}})();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(fb));localStorage.setItem("vc_voted",JSON.stringify(voted))}catch(e){}};
const ago=d=>{const m=Math.max(1,Math.floor((Date.now()-d)/6e4));if(m<60)return m+" min ago";const h=Math.floor(m/60);if(h<24)return h+" hr ago";const x=Math.floor(h/24);return x+" day"+(x>1?"s":"")+" ago"};
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("show"),2400)};
const pill=s=>`<span class="pill" style="--c:${SC[ST.indexOf(s)]}">${s}</span>`;
const catIc=c=>`<span class="cat-ic" style="--c:${(CATS[c]||CATS.Other)[1]}">${ic((CATS[c]||CATS.Other)[0])}</span>`;
const track=s=>{const i=ST.indexOf(s);return`<ol class="track" style="--c:${SC[i]}">${ST.map((x,k)=>`<li class="${k<=i?"on":""}">${x}</li>`).join("")}</ol>`};
const stat=(n,l)=>`<div class="stat"><b>${n}</b><span>${l}</span></div>`;
const cnt=s=>fb.filter(x=>x.status===s).length;
const card=(x,full)=>`<article class="card item" data-id="${x.id}">
<div class="it">${catIc(x.category)}<div class="g"><h3>${esc(x.title)}</h3><div class="meta"><span>${esc(x.category)}</span><span>${esc(x.location||"Campus")}</span><span>${x.anonymous?"Anonymous":esc(x.name||"Student")}</span><span>${ago(x.date)}</span></div></div>${pill(x.status)}</div>
${full?`<p class="msg">${esc(x.message)}</p><div class="foot2"><button class="mini ${voted.includes(x.id)?"on":""}" data-vote aria-pressed="${voted.includes(x.id)}">${ic("up")}Me too · ${x.votes}</button><button class="mini" data-more aria-expanded="false">Details</button></div>
<div class="more"><div class="meta"><span>Reference ${x.id}</span></div>${track(x.status)}<label class="sw stf" hidden>Update status <select data-st>${ST.map(s=>`<option ${s===x.status?"selected":""}>${s}</option>`).join("")}</select></label></div>`:""}</article>`;
const P=document.body.dataset.page;
// theme + reset
const dark=()=>document.documentElement.dataset.theme?document.documentElement.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
const icon=()=>$("#theme").innerHTML=ic(dark()?"sun":"moon");icon();
$("#theme").onclick=()=>{const t=dark()?"light":"dark";document.documentElement.dataset.theme=t;try{localStorage.setItem("vc_theme",t)}catch(e){}icon()};
$("#reset").onclick=()=>{if(confirm("Reset all demo data in this browser?")){try{localStorage.removeItem(KEY);localStorage.removeItem("vc_voted")}catch(e){}location.reload()}};
const sorted=()=>[...fb].sort((a,b)=>b.date-a.date);
if(P==="index"){const l=sorted()[0];
$("#ticket").innerHTML=`<small>${esc(l.id)} · ${ago(l.date)}</small><b>${esc(l.title)}</b>${track(l.status)}`;
$("#stats").innerHTML=stat(fb.length,"Submissions")+stat(cnt("Under Review"),"Under review")+stat(cnt("In Progress"),"In progress")+stat(cnt("Resolved"),"Resolved");
$("#recent").innerHTML=sorted().slice(0,4).map(x=>card(x,false)).join("");
$("#topics").innerHTML=Object.entries(CATS).map(([c,[i,col]])=>`<a class="topic" href="feedback.html?cat=${encodeURIComponent(c)}" style="--c:${col}">${catIc(c)}<div><b>${c}</b><br><small>${fb.filter(x=>x.category===c).length} submissions</small></div></a>`).join("")}
if(P==="feedback"){const p=new URLSearchParams(location.search);let cat=CATS[p.get("cat")]?p.get("cat"):"all";if(p.get("q"))$("#q").value=p.get("q");
const chips=()=>$("#catChips").innerHTML=["all",...Object.keys(CATS)].map(c=>`<button class="chip" data-c="${c}" aria-pressed="${c===cat}">${c==="all"?"All topics":c}</button>`).join("");chips();
const draw=()=>{const q=$("#q").value.toLowerCase(),s=$("#st").value;let a=sorted().filter(x=>(cat==="all"||x.category===cat)&&(s==="all"||x.status===s)&&`${x.id} ${x.title} ${x.message} ${x.location}`.toLowerCase().includes(q));
if($("#sort").value==="top")a.sort((x,y)=>y.votes-x.votes);
$("#count").textContent=`${a.length} submission${a.length===1?"":"s"}`;
$("#list").innerHTML=a.length?a.map(x=>card(x,true)).join(""):`<div class="empty"><b>No matching feedback</b><br>Clear the search or filters, or <a class="link" href="submit.html">share something new</a>.</div>`;
$$(".stf").forEach(e=>e.hidden=!$("#staff").checked)};
$("#catChips").onclick=e=>{const b=e.target.closest("[data-c]");if(b){cat=b.dataset.c;chips();draw()}};
["#q","#st","#sort","#staff"].forEach(s=>$(s).addEventListener("input",draw));
$("#list").onclick=e=>{const c=e.target.closest("[data-id]");if(!c)return;const x=fb.find(y=>y.id===c.dataset.id);
if(e.target.closest("[data-more]")){const o=c.classList.toggle("open");e.target.closest("[data-more]").setAttribute("aria-expanded",o)}
if(e.target.closest("[data-vote]")){const i=voted.indexOf(x.id);i<0?(voted.push(x.id),x.votes++):(voted.splice(i,1),x.votes--);save();const o=c.classList.contains("open");draw();if(o)$(`[data-id="${x.id}"]`).classList.add("open")}};
$("#list").onchange=e=>{if(e.target.matches("[data-st]")){const x=fb.find(y=>y.id===e.target.closest("[data-id]").dataset.id);x.status=e.target.value;save();draw();toast("Status updated")}};draw()}
if(P==="submit"){let cat="";$("#catPick").innerHTML=Object.keys(CATS).map(c=>`<label class="chip"><input type="radio" name="cat" value="${c}">${ic(CATS[c][0])}${c}</label>`).join("");
$("#msg").oninput=e=>$("#cc").textContent=e.target.value.length+" / 900";$("#anon").onchange=e=>$("#nameF").hidden=e.target.checked;
$("#form").onreset=()=>setTimeout(()=>{$("#nameF").hidden=true;$("#cc").textContent="0 / 900";$("#err").textContent=""});
$("#form").onsubmit=e=>{e.preventDefault();const c=$("input[name=cat]:checked"),t=$("#title").value.trim(),m=$("#msg").value.trim(),an=$("#anon").checked,n=$("#name").value.trim();
const err=!c?"Choose a category.":!t?"Add a short title.":m.length<15?"Describe the issue in at least 15 characters.":!an&&!n?"Enter your name or switch on anonymous.":"";$("#err").textContent=err;if(err)return;
const id="VC-"+(1049+fb.length-seed.length+Math.floor(Math.random()*90));
fb.unshift({id,title:t,category:c.value,location:$("#loc").value.trim(),message:m,anonymous:an,name:an?"":n,status:"Submitted",date:Date.now(),votes:0});save();
$("#form").hidden=true;$(".aside").hidden=true;$("#done").hidden=false;$("#ref").textContent=id;$("#view").href="feedback.html?q="+id;scrollTo({top:0,behavior:"smooth"})};
$("#copy").onclick=()=>{navigator.clipboard?.writeText($("#ref").textContent).then(()=>toast("Reference copied"),()=>toast("Copy failed"))};
$("#again").onclick=()=>{$("#form").reset();$("#form").hidden=false;$(".aside").hidden=false;$("#done").hidden=true}}
if(P==="insights"){const t=fb.length,r=cnt("Resolved");
$("#istats").innerHTML=stat(t,"Submissions")+stat(fb.filter(x=>x.anonymous).length,"Anonymous")+stat(t?Math.round(r/t*100)+"%":"0%","Resolved");
const m=Math.max(1,...Object.keys(CATS).map(c=>fb.filter(x=>x.category===c).length));
$("#bars").innerHTML=Object.keys(CATS).map(c=>{const n=fb.filter(x=>x.category===c).length;return`<div class="bar-r" style="--c:${CATS[c][1]}"><span>${c}</span><div><i style="width:${n/m*100}%"></i></div><b>${n}</b></div>`}).join("");
let off=0;$("#donut").innerHTML=`<circle cx="50" cy="50" r="40" stroke="var(--line)"/>`+ST.map((s,i)=>{const n=cnt(s),L=n/Math.max(1,t)*251.3;const c=`<circle cx="50" cy="50" r="40" stroke="${SC[i]}" stroke-dasharray="${L} 251.3" stroke-dashoffset="${-off}"/>`;off+=L;return c}).join("");
$("#legend").innerHTML=ST.map((s,i)=>`<li style="--c:${SC[i]}"><i></i>${s}<b>${cnt(s)}</b></li>`).join("");
const d=[...Array(7)].map((_,i)=>{const day=new Date();day.setHours(0,0,0,0);day.setDate(day.getDate()-(6-i));return{l:day.toLocaleDateString("en",{weekday:"short"}),n:fb.filter(x=>{const z=new Date(x.date);z.setHours(0,0,0,0);return+z===+day}).length}}),dm=Math.max(1,...d.map(x=>x.n));
$("#days").innerHTML=d.map(x=>`<div><i style="height:${x.n/dm*100}%" title="${x.n}"></i><span>${x.l}</span></div>`).join("");
$("#top").innerHTML=[...fb].sort((a,b)=>b.votes-a.votes).slice(0,3).map(x=>card(x,false).replace("</article>",`<div class="meta"><span>${x.votes} students said “Me too”</span></div></article>`)).join("")}
})();
