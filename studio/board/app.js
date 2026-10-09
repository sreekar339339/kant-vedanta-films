/* Decision Mural: reads the records in the shared store's "decisions" collection, renders them by section,
   and writes back the viewer's picks, notes and new questions. Previews are painted live with the series engine. */
(()=>{
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const state={docs:new Map(),db:null,noDb:false,err:null,loaded:false,readOnly:false,tab:'call',film:'all',group:'all',busy:new Set(),drafts:new Map(),open:new Set()};
const TABS=[['call','Your call'],['style','Series style'],['symbols','Symbols'],['motifs','Motif library'],['films','Films']];
const STL={answered:'Answered',open:'Open',proposed:'Proposed',request:'Your question',settled:'Settled',review:'In review',next:'Next up',planned:'Planned',reopen:'Reopened'};
const chip=st=>`<span class="chip st-${esc(st)}">${esc(STL[st]||st)}</span>`;
const scope=d=>d.film?`Film ${d.film}${d.chapterName?' · '+esc(d.chapterName):''}`:'All films';
const when=iso=>{if(!iso)return'';const t=new Date(iso);return isNaN(t)?'':t.toLocaleString(undefined,{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});};
const list=sec=>[...state.docs.entries()].filter(([,d])=>d&&d.sec===sec).sort((a,b)=>(a[1].ord??0)-(b[1].ord??0));
const needs=d=>(d.status==='open'||d.status==='proposed'||d.status==='request')&&!d.pick&&!d.note;

/* ---------- previews ---------- */
const PVC=new Map();let fontsReady=false;
function compiled(key){if(PVC.has(key))return PVC.get(key);const f=PV[key];if(!f)return null;const S=new Scene();try{f(S);}catch(e){console.error('preview',key,e);PVC.set(key,null);return null;}
  const e={P:compilePaint(S,key.length*37+5)};PVC.set(key,e);return e;}
function bitmap(key){const e=compiled(key);if(!e)return null;if(!e.bmp){const dpr=Math.min(2,window.devicePixelRatio||1),w=Math.round(480*dpr),h=Math.round(270*dpr);const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.scale(w/960,h/540);boardBG(g);drawPaint(g,e.P,1,'water');e.bmp=c;}return e.bmp;}
const queue=[];let pumping=false;
function pump(){if(!fontsReady){pumping=false;return;}const t0=performance.now();while(queue.length&&performance.now()-t0<24){const cv=queue.shift();if(!cv.isConnected)continue;const b=bitmap(cv.dataset.pv);if(b){cv.width=b.width;cv.height=b.height;cv.getContext('2d').drawImage(b,0,0);}}
  if(queue.length)requestAnimationFrame(pump);else pumping=false;}
const io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){io.unobserve(en.target);queue.push(en.target);}});if(!pumping){pumping=true;requestAnimationFrame(pump);}},{rootMargin:'300px'});
function hookPreviews(root){root.querySelectorAll('canvas.pv[data-pv]').forEach(cv=>{const e=PVC.get(cv.dataset.pv);if(e&&e.bmp){cv.width=e.bmp.width;cv.height=e.bmp.height;cv.getContext('2d').drawImage(e.bmp,0,0);}else io.observe(cv);});}
function replay(cv){const e=compiled(cv.dataset.pv);if(!e||reduce)return;const g=cv.getContext('2d');const t0=performance.now(),dur=1700;
  const f=now=>{const p=Math.min(1,(now-t0)/dur);g.setTransform(cv.width/960,0,0,cv.height/540,0,0);boardBG(g);drawPaint(g,e.P,p,'water');g.setTransform(1,0,0,1,0,0);if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);}
const pvEl=(key,label)=>key&&PV[key]?`<canvas class="pv" data-pv="${esc(key)}" width="480" height="270" role="img" aria-label="${esc(label||key)} (click to watch it paint in)"></canvas>`:`<div class="pv-none">No picture yet</div>`;

/* the painted strip at the top */
function strip(){const cv=$('#strip'),g=cv.getContext('2d');const S=new Scene();PV._header(S);kumbamBand(S,0,960,0);const P=compilePaint(S,11);const sc=cv.width/960;
  const draw=p=>{g.setTransform(sc,0,0,sc,0,0);boardBG(g);drawPaint(g,P,p,'water');};if(reduce){draw(1);return;}const t0=performance.now();const f=now=>{const p=Math.min(1,(now-t0)/4200);draw(p);if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);}

/* ---------- writing ---------- */
let toastT;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2600);}
async function save(id,patch,msg){if(!state.db||state.readOnly||state.busy.has(id))return;state.busy.add(id);render();
  try{await state.db.doc('decisions/'+id).update({...patch,at:new Date().toISOString()});state.drafts.delete(id);toast(msg||'Saved');}
  catch(e){if(e&&e.code==='invalid_argument'){state.readOnly=true;toast('You can read this board but not change it.');}else toast('Not saved. '+(e&&e.message?e.message:'Try again.'));}
  finally{state.busy.delete(id);render();}}
async function ask(text,film){if(!state.db||state.readOnly)return false;const t=text.trim();if(!t)return false;const first=t.split(/\n/)[0];
  try{await state.db.collection('decisions').add({sec:'call',status:'request',film:+film||0,title:first.length>120?first.slice(0,117)+'…':first,body:t,ord:1000+Date.now()/1e10,at:new Date().toISOString()});toast('Added to Your call');return true;}
  catch(e){if(e&&e.code==='invalid_argument'){state.readOnly=true;toast('You can read this board but not change it.');}else toast('Not added. '+(e&&e.message?e.message:'Try again.'));return false;}}

/* ---------- rendering ---------- */
function stats(){const all=[...state.docs.values()];const c=s=>all.filter(d=>d.sec===s).length;const open=all.filter(needs).length;
  $('#stats').innerHTML=state.loaded?`<span><b>${open}</b> waiting for you</span><span><b>${c('style')}</b> settled rules</span><span><b>${c('symbol')}</b> symbols chosen</span><span><b>${c('motif')}</b> motifs</span><span><b>${c('film')}</b> films</span>`:'';}
function tabs(){const all=[...state.docs.values()];const n={call:all.filter(needs).length,style:all.filter(d=>d.sec==='style').length,symbols:all.filter(d=>d.sec==='symbol').length,motifs:all.filter(d=>d.sec==='motif').length,films:all.filter(d=>d.sec==='film').length};
  $('#tabs').innerHTML=TABS.map(([k,l])=>`<button type="button" role="tab" id="tab-${k}" aria-selected="${state.tab===k}" data-tab="${k}">${l}${state.loaded?`<span class="n${k==='call'&&n.call?' hot':''}">${n[k]}</span>`:''}</button>`).join('');}
function noteBox(id,d,label,btns){const v=state.drafts.has(id)?state.drafts.get(id):(d.note||'');const dis=state.readOnly||state.busy.has(id)?' disabled':'';
  return`<div class="respond"><label for="note-${esc(id)}">${label}</label><textarea id="note-${esc(id)}" data-draft="${esc(id)}" rows="2"${state.readOnly?' readonly':''}>${esc(v)}</textarea><div class="row">${btns.map(([act,t,cls])=>`<button type="button" class="btn ${cls||''}" data-act="${act}" data-id="${esc(id)}"${dis}>${t}</button>`).join('')}${savedLine(d)}</div></div>`;}
function reply(d){return d.reply?`<p class="reply"><b>Claude:</b> ${esc(d.reply)}</p>`:'';}
function savedLine(d){const bits=[];if(d.pick){const o=(d.opts||[]).find(o=>o.k===d.pick);bits.push(`Your pick: <b>${esc(o?o.label:d.pick)}</b>`);}if(d.verdict==='reopen')bits.push('<b>Reopened</b>');if(d.note&&!d.pick&&d.verdict!=='reopen')bits.push('<b>Note saved</b>');if(d.at)bits.push(when(d.at));return bits.length?`<span class="saved">${bits.join(' · ')}</span>`:'';}
function callCard([id,d]){const dis=state.readOnly||state.busy.has(id)?' disabled':'';
  const opts=(d.opts||[]).length?`<div class="opts">${d.opts.map(o=>`<div class="opt${d.pick===o.k?' picked':''}">${pvEl(o.pv,o.label)}<div class="txt"><strong>${esc(o.label)}</strong>${o.rec||o.now?`<div class="tags">${o.rec?'<span class="tag rec">Recommended</span>':''}${o.now?'<span class="tag now">In the film now</span>':''}</div>`:''}${o.note?`<p>${esc(o.note)}</p>`:''}</div><button type="button" class="btn" data-act="pick" data-id="${esc(id)}" data-k="${esc(o.k)}" aria-pressed="${d.pick===o.k}"${dis}>${d.pick===o.k?'Chosen':'Choose this'}</button></div>`).join('')}</div>`:'';
  return`<article class="sheet" id="d-${esc(id)}"><div class="meta">${chip(d.status)}<span>${scope(d)}</span></div><h3>${esc(d.title)}</h3>${d.body&&d.body!==d.title?`<p class="body">${esc(d.body)}</p>`:''}${opts}${reply(d)}${noteBox(id,d,'Note for Claude',[['note','Save note','primary']])}</article>`;}
function comment(id,d){const isOpen=state.open.has(id);return`${reply(d)}<details class="cm" data-open-id="${esc(id)}"${isOpen?' open':''}><summary>${d.verdict==='reopen'?'Reopened: edit your note':'Comment or reopen'}</summary>${noteBox(id,d,'Note for Claude',[['note','Save comment',''],['reopen','Reopen with this note','primary']])}</details>`;}
function paneCall(){const items=list('call');const order={request:0,open:1,proposed:2};items.sort((a,b)=>(order[a[1].status]??3)-(order[b[1].status]??3)||(a[1].ord??0)-(b[1].ord??0));
  const filmOpts=['<option value="0">All films</option>'].concat(Array.from({length:29},(_,i)=>`<option value="${i+1}">Film ${i+1}</option>`)).join('');
  const form=state.readOnly?'':`<form class="sheet" id="ask"><h3>Raise a question</h3><div class="field" style="display:grid;gap:6px"><label for="ask-text">What should be decided?</label><textarea id="ask-text" rows="2" placeholder="For example: what should stand for Vyasa in Film 7?">${esc(state.drafts.get('__ask')||'')}</textarea></div><div class="row"><label for="ask-film" class="saved">For</label><select id="ask-film" style="width:auto">${filmOpts}</select><button class="btn primary" type="submit">Add to the board</button></div></form>`;
  return`<section class="pane"><p class="intro">Open questions and proposals across the series. Choosing an option records your verdict; the recommended option is what the film shows now until you say otherwise. Click any picture to watch it paint in.</p>${items.map(callCard).join('')||'<div class="empty">Nothing waiting. New questions you raise will appear here.</div>'}${form}</section>`;}
function paneStyle(){const items=list('style');return`<section class="pane"><p class="intro">The rules every film follows. Reopen any of them with a note and it moves back into discussion.</p><div class="rules">${items.map(([id,d])=>`<article class="sheet rule" id="d-${esc(id)}"><div class="meta">${chip(d.verdict==='reopen'?'reopen':d.status)}</div><h3>${esc(d.title)}</h3><p class="body">${esc(d.choice)}</p>${d.why?`<p class="why">Why: ${esc(d.why)}</p>`:''}${comment(id,d)}</article>`).join('')}</div></section>`;}
function filmFilter(items){const films=[...new Set(items.map(([,d])=>d.film))].sort((a,b)=>a-b);if(films.length<2&&state.film==='all')return'';return`<div class="filters" role="group" aria-label="Film">${['all',...films].map(f=>`<button type="button" data-film="${f}" aria-pressed="${String(state.film)===String(f)}">${f==='all'?'All films':'Film '+f}</button>`).join('')}</div>`;}
function paneSymbols(){let items=list('symbol');const flt=filmFilter(items);if(state.film!=='all')items=items.filter(([,d])=>String(d.film)===String(state.film));
  const groups=[];items.forEach(it=>{const k=it[1].film+'|'+(it[1].chapterName||'');let g=groups.find(g=>g.k===k);if(!g)groups.push(g={k,film:it[1].film,name:it[1].chapterName,items:[]});g.items.push(it);});
  return`<section class="pane"><p class="intro">What stands for each thing the narration names, chapter by chapter. Later films add their own entries here as they are planned.</p>${flt}${groups.map(g=>`<h2 class="chap">Film ${g.film} · ${esc(g.name)}</h2><div class="grid">${g.items.map(([id,d])=>`<article class="card" id="d-${esc(id)}">${pvEl(d.pv,d.title)}<div class="txt"><h4>${esc(d.title)}</h4><p>${esc(d.choice)}</p>${d.verdict==='reopen'?chip('reopen'):''}${comment(id,d)}</div></article>`).join('')}</div>`).join('')||'<div class="empty">No symbols recorded yet.</div>'}</section>`;}
function paneMotifs(){let items=list('motif');const gs=[];items.forEach(([,d])=>{if(!gs.find(g=>g[0]===d.group))gs.push([d.group,d.groupName]);});
  const flt=`<div class="filters" role="group" aria-label="Group">${[['all','Everything'],...gs].map(([k,l])=>`<button type="button" data-group="${esc(k)}" aria-pressed="${state.group===k}">${esc(l)} <span>${k==='all'?items.length:items.filter(([,d])=>d.group===k).length}</span></button>`).join('')}</div>`;
  if(state.group!=='all')items=items.filter(([,d])=>d.group===state.group);
  return`<section class="pane"><p class="intro">Every object the engine can paint, grouped by world. Hindu and Indian motifs appear only where India is the subject.</p>${flt}<div class="grid">${items.map(([id,d])=>`<article class="card" id="d-${esc(id)}">${pvEl(d.pv,d.title)}<div class="txt"><h4>${esc(d.title)}</h4><p>${d.used&&d.used.length?'Film 1: '+esc(d.used.join(', ')):'Not used in a film yet'}</p>${d.verdict==='reopen'?chip('reopen'):''}${comment(id,d)}</div></article>`).join('')}</div></section>`;}
function paneFilms(){const items=list('film');return`<section class="pane"><p class="intro">The 29 lectures, one film each, with the new things each film will need drawn. These lists grow into symbol entries as each film is scripted.</p><div class="films">${items.map(([id,d])=>{const url=typeof d.url==='string'&&/^https:\/\/claude\.ai\//.test(d.url)?d.url:'';
  return`<article class="film" id="d-${esc(id)}"><div class="num">${esc(d.film)}</div><h4>${esc(d.title)} ${chip(d.status)}</h4><p class="where">${esc(d.lecture)} · ${esc(d.where)} · ${(d.chapters||[]).length} chapters${url?` · <a href="${esc(url)}" target="_blank" rel="noopener">Open the film</a>`:''}</p><div>${(d.design||[]).length?`<div class="todo" aria-label="To design">${d.design.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:'<p class="where">Everything drawn. Review the film and the symbols.</p>'}${comment(id,d)}</div></article>`;}).join('')}</div></section>`;}
function render(){const fa=document.activeElement,fid=fa&&fa.id,sel=fa&&'selectionStart'in fa?[fa.selectionStart,fa.selectionEnd]:null;
  stats();tabs();const m=$('#main');
  if(state.noDb)m.innerHTML=`<section class="pane"><div class="empty">The board keeps its records in the artifact’s shared store, which this view cannot reach. Open it on claude.ai while signed in.</div></section>`;
  else if(state.err)m.innerHTML=`<section class="pane"><div class="empty">The board could not load its records (${esc(state.err)}). Reload the page to try again.</div></section>`;
  else if(!state.loaded)m.innerHTML=`<section class="pane"><div class="empty">Loading the board: open questions, settled rules, symbols, motifs and the film slate.</div></section>`;
  else m.innerHTML=({call:paneCall,style:paneStyle,symbols:paneSymbols,motifs:paneMotifs,films:paneFilms}[state.tab])();
  if(state.loaded&&state.docs.size===0&&!state.noDb)m.innerHTML=`<section class="pane"><div class="empty">The board is empty. Claude fills it with the series decisions after publishing.</div></section>`;
  hookPreviews(m);if(fid){const el=document.getElementById(fid);if(el){el.focus({preventScroll:true});if(sel&&'setSelectionRange'in el)try{el.setSelectionRange(...sel);}catch(e){}}}}

/* ---------- events ---------- */
document.addEventListener('click',e=>{const t=e.target.closest('[data-tab],[data-act],[data-film],[data-group],canvas.pv');if(!t)return;
  if(t.dataset.tab){state.tab=t.dataset.tab;try{history.replaceState(null,'','#'+state.tab);}catch(err){}render();$('#tab-'+state.tab)?.focus();return;}
  if(t.dataset.film){state.film=t.dataset.film==='all'?'all':+t.dataset.film;render();return;}
  if(t.dataset.group){state.group=t.dataset.group;render();return;}
  if(t.matches('canvas.pv')){replay(t);return;}
  const id=t.dataset.id,d=state.docs.get(id);if(!d)return;const ta=document.getElementById('note-'+id);const note=ta?ta.value.trim():'';
  if(t.dataset.act==='pick')save(id,{pick:t.dataset.k,...(note!==(d.note||'')?{note}:{})},'Choice saved');
  else if(t.dataset.act==='note')save(id,{note},'Note saved');
  else if(t.dataset.act==='reopen')save(id,{verdict:'reopen',note},'Reopened');});
document.addEventListener('input',e=>{const id=e.target.dataset&&e.target.dataset.draft;if(id)state.drafts.set(id,e.target.value);if(e.target.id==='ask-text')state.drafts.set('__ask',e.target.value);});
document.addEventListener('toggle',e=>{const id=e.target.dataset&&e.target.dataset.openId;if(!id)return;if(e.target.open)state.open.add(id);else state.open.delete(id);},true);
document.addEventListener('submit',async e=>{if(e.target.id!=='ask')return;e.preventDefault();const ok=await ask($('#ask-text').value,$('#ask-film').value);if(ok){state.drafts.delete('__ask');render();}});
document.addEventListener('keydown',e=>{if(e.target.getAttribute&&e.target.getAttribute('role')==='tab'&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){const i=TABS.findIndex(t=>t[0]===state.tab);const n=(i+(e.key==='ArrowRight'?1:TABS.length-1))%TABS.length;state.tab=TABS[n][0];render();$('#tab-'+state.tab)?.focus();}});

/* ---------- boot ---------- */
const h=(location.hash||'').slice(1);if(TABS.some(t=>t[0]===h))state.tab=h;
render();
const fr=document.fonts?Promise.all(['20px "Patrick Hand SC"','20px "Tiro Devanagari Sanskrit"','italic 20px "Libre Baskerville"'].map(f=>document.fonts.load(f).catch(()=>{}))):Promise.resolve();
Promise.race([fr,new Promise(r=>setTimeout(r,2500))]).then(()=>{fontsReady=true;strip();if(!pumping&&queue.length){pumping=true;requestAnimationFrame(pump);}});
(async()=>{const cl=window.claude;let db=null;try{db=cl&&cl.use?await cl.use('db'):null;}catch(e){db=null;}
  if(!db){state.noDb=true;render();return;}state.db=db;
  try{const u=await cl.use('user');if(u){const c=await u.can('data.write');if(c===false)state.readOnly=true;}}catch(e){}
  db.collection('decisions').onSnapshot(snap=>{state.docs=new Map(snap.docs.map(x=>[x.id,x.data()]));state.loaded=true;render();},err=>{state.err=err&&err.code||'unavailable';render();});})();
})();
