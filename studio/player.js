
const CH=DATA.chapters,DUR=DATA.duration;
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');const dpr=Math.min(2,devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;ctx.scale(dpr,dpr);
CH.forEach(ch=>{ch.B=ch.lines.map(l=>l.start-ch.start);});
function chAt(T){let k=0;CH.forEach((ch,i)=>{if(T>=ch.start-(i?0.2:99))k=i;});return k;}
function drawScene(c,i,T){const ch=CH[i];c.save();try{const q=typeof QUOTE==='function'&&ch.lines.find((l,j)=>l.q&&T>=l.start-.05&&T<(j+1<ch.lines.length?ch.lines[j+1].start-.05:1e9));if(q)QUOTE(c,q.text,T-q.start,q.end-q.start,ch,i);else SC[ch.id](c,T-ch.start,ch.B);}catch(e){console.error(ch.id,e);}c.restore();}
function frame(T){const k=chAt(T),n=k+1;drawScene(ctx,k,T);
  if(n<CH.length&&typeof TRANSITION==='function')TRANSITION(ctx,T,k,n,drawScene,CH);
  else if(n<CH.length){const ws=CH[n].start-1.1,w=ease(seg(T,ws,ws+.9));if(w>0){ctx.save();ctx.beginPath();ctx.moveTo(0,0);for(let y=0;y<=H;y+=12)ctx.lineTo(W*w+Math.sin(y*.05+T)*10,y);ctx.lineTo(0,H);ctx.closePath();ctx.clip();drawScene(ctx,n,T);ctx.restore();
    if(w<1){ctx.strokeStyle=INK;ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();for(let y=-10;y<=H+10;y+=12){const x=W*w+Math.sin(y*.05+T)*10;y<0?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}}}
  if(T<.5){ctx.fillStyle=`rgba(0,0,0,${1-T/.5})`;ctx.fillRect(0,0,W,H);}
  if(T>DUR-.8){ctx.fillStyle=`rgba(0,0,0,${seg(T,DUR-.8,DUR)})`;ctx.fillRect(0,0,W,H);}}
const _O={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9},_T={twenty:2,thirty:3,forty:4,fifty:5,sixty:6,seventy:7,eighty:8,ninety:9};const disp=s=>s.replace(/\b(eighteen|nineteen) (twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(?:-(one|two|three|four|five|six|seven|eight|nine))?\b/gi,(m,c,t,o)=>`${/^e/i.test(c)?18:19}${_T[t.toLowerCase()]}${o?_O[o.toLowerCase()]:0}`).replace(/\b(eighteen|nineteen) oh (one|two|three|four|five|six|seven|eight|nine)\b/gi,(m,c,o)=>`${/^e/i.test(c)?18:19}0${_O[o.toLowerCase()]}`).replace(/\bMaya\b/g,'Māyā').replace(/Muller/g,'Müller');
const au=document.getElementById('au'),cap=document.getElementById('cap'),tc=document.getElementById('tc'),chn=document.getElementById('chn'),pp=document.getElementById('pp'),big=document.getElementById('big'),ph=document.getElementById('ph'),tl=document.getElementById('tl');
let playing=false,T=DATA.poster||0,useAudio=true,lastNow=performance.now(),started=false,capsOn=true;
au.addEventListener('error',()=>{useAudio=false;});
const fmt=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
CH.forEach((ch,i)=>{const d=document.createElement('div');const end=i<CH.length-1?CH[i+1].start:DUR;d.style.width=((end-(i?ch.start:0))/DUR*100)+'%';d.style.background=STY[ch.style][1];d.title=`${i+1}. ${ch.title}`;tl.insertBefore(d,ph);ch.seg=d;
  const li=document.createElement('li');li.style.setProperty('--c',STY[ch.style][1]);li.innerHTML=`<em>${String(i+1).padStart(2,'0')} · ${STY[ch.style][0]} · ${fmt(ch.start)}</em><b>${ch.title}</b><small>${ch.src}</small>`;li.onclick=()=>seek(Math.max(0,ch.start-.9),true);document.getElementById('chs').appendChild(li);});
Object.entries(STY).forEach(([k,[n,c]])=>{const s=document.createElement('span');s.style.setProperty('--c',c);s.textContent=n;document.getElementById('lg').appendChild(s);});
function seek(x,play){T=clamp(x,0,DUR);started=true;if(useAudio){try{au.currentTime=T;}catch(e){}}if(play)setPlay(true);ui();}
function setPlay(v){playing=v;started=true;big.hidden=true;pp.textContent=v?'Pause':'Play';if(useAudio){if(v){const p=au.play();if(p&&p.catch)p.catch(()=>{useAudio=false;});}else au.pause();}lastNow=performance.now();}
pp.onclick=()=>{if(!started){seek(0,true);return;}setPlay(!playing);};big.onclick=()=>seek(0,true);cv.onclick=()=>{if(!started)seek(0,true);else setPlay(!playing);};
document.getElementById('cc').onclick=e=>{capsOn=!capsOn;e.target.textContent=capsOn?'Captions on':'Captions off';cap.classList.toggle('off',!capsOn);};
tl.onclick=e=>{const r=tl.getBoundingClientRect();seek((e.clientX-r.left)/r.width*DUR,playing||!started);};
document.addEventListener('keydown',e=>{if(e.code==='Space'&&e.target===document.body){e.preventDefault();pp.click();}});
au.addEventListener('ended',()=>{playing=false;pp.textContent='Play';});
function ui(){let line='',q=false;CH.forEach(ch=>ch.lines.forEach(l=>{if(T>=l.start-.15&&T<l.end+.4){line=l.text;q=!!l.q;}}));cap.textContent=started&&line?(q?`“${disp(line)}”`:disp(line)):'';cap.classList.toggle('q',started&&q);
  const k=chAt(T);chn.textContent=started?`${k+1}. ${CH[k].title}`:'';CH.forEach((ch,i)=>ch.seg.classList.toggle('on',i===k));
  ph.style.left=(T/DUR*100)+'%';tc.textContent=`${fmt(started?T:0)} / ${fmt(DUR)}`;}
function loop(now){const dt=Math.min(.1,(now-lastNow)/1000);lastNow=now;
  if(playing){if(useAudio&&!au.paused)T=au.currentTime;else T+=dt;if(T>=DUR){T=DUR;playing=false;pp.textContent='Play';}}
  frame(T);ui();requestAnimationFrame(loop);}
(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>requestAnimationFrame(loop));
frame(T);ui();
window.__film={frame,CH,DUR};
