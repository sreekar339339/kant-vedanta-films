/* ===== From Colombo to Almora · HOLO-CHART MISSION LOG =====
   Home look: 3D wireframe map flown by a virtual camera, HUD instruments, glitch cuts on every beat.
   Quotes ({"q": ...} lines): full-frame kinetic type (QUOTE). Chapter changes: yantra-tunnel flight (TRANSITION).
   Every function is a pure function of time, so films stay seekable and renderable. */
['kalighat','papercut','lantern','percept','plate','palmleaf','chart'].forEach(k=>delete STY[k]);
Object.assign(STY,{map:['Chart flight','#6ff3ff'],panel:['Data panel','#8fa8ff'],signal:['Transmission','#ffa64d'],sim:['Simulation','#7dffb0'],dossier:['Dossier','#f2d16b'],alert:['Red alert','#ff4d5a'],quote:['Quote cut','#ece6d8']});
const HX={bg:'#020a10',cy:'#6ff3ff',sf:'#ffa64d',rd:'#ff4d5a',gr:'#7dffb0',gd:'#f2d16b',bl:'#8fa8ff',ink:'#d8f6ff',bone:'#ece6d8'};
const HM='"JetBrains Mono",monospace',HD='Anton,"Cormorant Garamond",Impact,sans-serif',HS='"Cormorant Garamond",Georgia,serif';
const MODE={map:HX.cy,panel:HX.bl,signal:HX.sf,sim:HX.gr,dossier:HX.gd,alert:HX.rd};
const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,eo=x=>1-Math.pow(1-x,3);
const hash=i=>{const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s);};
function rng(seed){let s=(seed>>>0)||1;return()=>(s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296;}
function rgba(hex,a){const v=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));return`rgba(${v[0]},${v[1]},${v[2]},${a})`;}
function fitpx(c,s,fam,maxW,maxPx){c.save();c.font=`${maxPx}px ${fam}`;const w=c.measureText(s).width;c.restore();return Math.min(maxPx,maxPx*maxW/Math.max(1,w));}
function ht(c,s,x,y,font,col,al='left',a=1){if(a<=0||!s)return;c.save();c.globalAlpha*=Math.min(1,a);c.font=font;c.fillStyle=col;c.textAlign=al;c.textBaseline='middle';c.fillText(s,x,y);c.restore();}
function chroma(c,s,x,y,font,col,al='center',k=1,a=1){if(a<=0)return;if(k>.02){ht(c,s,x-3*k,y,font,'rgba(255,60,80,.75)',al,a);ht(c,s,x+3*k,y,font,'rgba(80,220,255,.75)',al,a);}ht(c,s,x,y,font,col,al,a);}
/* beat = narration line; every beat is a cut */
function beat(t,B){let i=0;for(let k=0;k<B.length;k++)if(t>=B[k]-.05)i=k;return{i,l:t-B[i]};}

/* ---------- geography ---------- */
const COAST=[[66.6,25.4],[68.2,23.7],[69,22.3],[70,21],[72.6,21.1],[72.8,19],[73.4,16.5],[74.1,14.8],[74.8,12.8],[75.5,11.5],[76.3,9.5],[77.5,8.1],[78.2,8.9],[79.2,10.3],[79.9,11.2],[80.3,13.1],[80.1,15.5],[81.3,16.3],[82.3,17],[84.1,18.3],[85.8,19.8],[86.9,20.8],[87.4,21.6],[88.2,21.8],[89.1,21.9],[90.5,22.3],[91.8,22.4],[92.3,21],[93,19.6]];
const NORTH=[[93,19.6],[95,27],[88,28.2],[81,30.5],[77,35.5],[74,36.8],[71,34],[66.6,25.4]];
const INDIA=[...COAST,...NORTH.slice(1)];
const CEYLON=[[79.85,9.8],[80.2,9.8],[80.8,9.0],[81.3,8.3],[81.9,7.4],[81.7,6.4],[80.6,5.92],[80.0,6.2],[79.8,7.2],[79.75,8.2],[79.9,9.0],[79.85,9.8]];
const OLDW=[[[7.5,44],[9,44.4],[10.5,43.5],[12.3,41.7],[14.2,40.8],[15.6,40],[16.1,38.3],[15.6,38],[16.6,38.4],[17.1,39],[16.5,40.1],[18.4,40.2],[17,41],[16,41.9],[14.2,42.3],[13.6,43.5],[12.3,44.2],[12.4,45.4],[13.7,45.7]],
 [[19.4,41.8],[20,39.5],[21.1,38.3],[21.6,37],[22.5,36.5],[23.1,37.5],[23.6,38],[24,38.2],[23,39],[22.6,40.5],[23.8,40.7],[26,40.8]],
 [[-9,38.7],[-5,35.8],[3,36.8],[10,37.2],[11,35.5],[10.2,34.2],[15,32.4],[20,30.9],[20.5,32.5],[25,31.6],[29.9,31.2],[32.5,31.2],[34.3,31.3],[35.5,33.5],[36,35.8],[33,36.2],[30,36.3],[27.3,37],[26.3,39],[26.5,40.4],[29,41.2],[31,41.1],[35,42],[41.5,41.5]],
 [[32.5,29.9],[35,28],[39,22],[42.6,16.5],[43.4,12.6],[45,12.8],[52,15.7],[57.5,19],[59.8,22.5],[56.3,26.2],[51.5,24.5],[50,26.6],[48,29.9],[51,28],[56.3,27],[61.5,25.2],[66.6,25.4]],
 [[-9,38.7],[-9,43],[-1.5,43.4],[-4.5,48.5],[-1,49.5],[1.6,50.9],[4,51.5],[8,53.6],[9,57],[11,54],[14,54],[21,55],[24,57.5]],
 [[-5.7,50],[-3,51.5],[-4.8,52],[-3,53.4],[-3,54.5],[-5,55],[-5,58.5],[-2,57.6],[0,53.5],[1.7,52.6],[1,51],[-5.7,50]],
 [[93,19.6],[94.5,16],[97.6,16.5],[98.5,12],[100.3,13.5],[103,10.5],[106.5,10.5],[109,13],[108,16.5],[106,20],[108,21.5],[111,21.5],[114,22.3],[117,23.5],[119,26],[121.5,31],[120,35],[122,37],[117.7,38.9],[121,40.9],[124,40]],
 [[130,31.2],[132,33.8],[135,34],[139.7,35.7],[141,38.5],[141.5,41],[140,40],[139.5,38],[136.5,37],[133,35.5],[130.5,33.8],[130,31.2]]];
const PLACES={COLOMBO:[79.86,6.93],JAFFNA:[80.01,9.66],PAMBAN:[79.21,9.28],MADRAS:[80.27,13.08],CALCUTTA:[88.36,22.57],ALMORA:[79.66,29.6],LAHORE:[74.34,31.55],ATHENS:[23.73,37.98],ROME:[12.5,41.9],LONDON:[-.12,51.5],PARIS:[2.35,48.85],GERMANY:[8.7,50.1],PEKING:[116.4,39.9],TOKYO:[139.7,35.7],ALEXANDRIA:[29.9,31.2],PERSEPOLIS:[52.9,29.9],BABYLON:[44.4,32.5],JERUSALEM:[35.2,31.8],MECCA:[39.8,21.4],DELHI:[77.2,28.6],BAGHDAD:[44.4,33.3]};
const ROUTE=[['Colombo',79.86,6.93],['Jaffna',80.01,9.66],['Pamban',79.21,9.28],['Rameswaram',79.31,9.29],['Ramnad',78.83,9.37],['Paramakudi',78.59,9.54],['Manamadura',78.48,9.68],['Madura',78.12,9.93],['Kumbakonam',79.39,10.96],
 ['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],
 ['Calcutta',88.36,22.57],['Calcutta',88.36,22.57],['Almora',79.66,29.6],['Almora',79.66,29.6],['Sialkot',74.53,32.49],['Lahore',74.34,31.55],['Lahore',74.34,31.55],['Lahore',74.34,31.55],
 ['Khetri',75.79,28.0],['Calcutta',88.36,22.57],['Belur',88.35,22.63],['Dacca',90.41,23.81],['Dacca',90.41,23.81]];
const STOPS=(()=>{const o=[];ROUTE.forEach(([n,lo,la],i)=>{const l=o[o.length-1];if(l&&l.n===n)l.films.push(i+1);else o.push({n,lo,la,films:[i+1]});});return o;})();

/* ---------- camera: a pinhole flying over a lon/lat plane ---------- */
function cam(lon,lat,d,p,yaw=0,F=720){const sp=Math.sin(p),cp=Math.cos(p),cy_=Math.cos(yaw),sy=Math.sin(yaw);const ch=d*sp,back=d*cp;
  return(x,z,y=0)=>{let dx=x-lon,dz=z-lat;const rx=dx*cy_-dz*sy,rz=dx*sy+dz*cy_;const vx=rx,vy=y-ch,vz=rz+back;const Y=vy*cp+vz*sp,Z=-vy*sp+vz*cp;if(Z<=.6)return null;return[W/2+vx*F/Z,H/2-Y*F/Z,Z];};}
const poseLerp=(a,b,k)=>a.map((v,i)=>lerp(v,b[i]??v,k));
function hbg(c,red){c.fillStyle=red?'#12040a':HX.bg;c.fillRect(0,0,W,H);const g=c.createRadialGradient(W/2,H*.55,40,W/2,H*.55,620);g.addColorStop(0,red?'rgba(255,60,80,.10)':'rgba(60,160,200,.10)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);}
function hgrid(c,pr,col=HX.cy,a=1,step=5){c.strokeStyle=rgba(col,.15*a);c.lineWidth=1;for(let lo=-30;lo<=150;lo+=step){c.beginPath();let on=false;for(let la=-20;la<=70;la+=2.5){const p=pr(lo,la);if(!p){on=false;continue;}on?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);on=true;}c.stroke();}
  for(let la=-20;la<=70;la+=step){c.beginPath();let on=false;for(let lo=-30;lo<=150;lo+=2.5){const p=pr(lo,la);if(!p){on=false;continue;}on?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);on=true;}c.stroke();}}
function hpoly(c,pr,pts,col,w=2,fill){c.beginPath();let on=false;pts.forEach(([lo,la])=>{const p=pr(lo,la);if(!p){on=false;return;}on?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);on=true;});if(fill){c.fillStyle=fill;c.fill();}c.strokeStyle=col;c.lineWidth=w;c.stroke();}
function world(c,pr,col=HX.cy,a=1,indiaFill){hpoly(c,pr,INDIA,rgba(col,.95*a),2,indiaFill||rgba(col,.06*a));hpoly(c,pr,CEYLON,rgba(col,.95*a),2,rgba(col,.06*a));OLDW.forEach(o=>hpoly(c,pr,o,rgba(col,.5*a),1.3));}
function hdot(c,pr,ll,label,col,a=1,o={}){const p=pr(ll[0],ll[1],o.alt||0);if(!p||a<=0)return null;c.save();c.globalAlpha*=a;c.fillStyle=col;c.beginPath();c.arc(p[0],p[1],o.r||4,0,7);c.fill();c.restore();if(label)ht(c,label,p[0]+(o.dx??10),p[1]+(o.dy??-10),`500 ${o.sz||12}px ${HM}`,col,(o.dx??10)<0?'right':'left',a);return p;}
function reticle(c,x,y,k,col,t,a=1){if(a<=0)return;c.save();c.globalAlpha*=a;const r=lerp(90,22,eo(clamp(k)));c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.arc(x,y,r,0,7);c.stroke();for(let i=0;i<4;i++){const an=i*Math.PI/2+t*.8;c.beginPath();c.moveTo(x+Math.cos(an)*(r+6),y+Math.sin(an)*(r+6));c.lineTo(x+Math.cos(an)*(r+18),y+Math.sin(an)*(r+18));c.stroke();}c.restore();}
function brackets(c,x,y,w,h,col,a=1){c.save();c.globalAlpha*=a;c.strokeStyle=col;c.lineWidth=2;[[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]].forEach(([p,q,sx,sy])=>{c.beginPath();c.moveTo(p,q+14*sy);c.lineTo(p,q);c.lineTo(p+14*sx,q);c.stroke();});c.restore();}
function panel(c,x,y,w,h,col,a=1,title){if(a<=0)return;c.save();c.globalAlpha*=a;c.fillStyle='rgba(2,10,16,.82)';c.fillRect(x,y,w,h);c.strokeStyle=rgba(col,.25);c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);c.restore();brackets(c,x,y,w,h,col,a);if(title)ht(c,title,x+16,y+20,`500 11px ${HM}`,col,'left',a);}
function hbar(c,x,y,w,h,v,col,a=1){c.save();c.globalAlpha*=a;c.strokeStyle=rgba(col,.45);c.lineWidth=1;c.strokeRect(x,y,w,h);c.fillStyle=col;c.fillRect(x,y,w*clamp(v),h);c.restore();}
function route(c,pr,pts,p,col,w=2.4,dash=[3,6]){if(p<=0)return null;const P_=pts.map(q=>pr(q[0],q[1])).filter(Boolean);if(P_.length<2)return null;let tot=0;const L=[];for(let i=1;i<P_.length;i++){const d=Math.hypot(P_[i][0]-P_[i-1][0],P_[i][1]-P_[i-1][1]);L.push(d);tot+=d;}
  const tg=p*tot;let acc=0,pos=P_[0];c.strokeStyle=col;c.lineWidth=w;c.setLineDash(dash);c.beginPath();c.moveTo(P_[0][0],P_[0][1]);for(let i=1;i<P_.length;i++){if(acc+L[i-1]<=tg){c.lineTo(P_[i][0],P_[i][1]);acc+=L[i-1];pos=P_[i];}else{const f=(tg-acc)/L[i-1];pos=[lerp(P_[i-1][0],P_[i][0],f),lerp(P_[i-1][1],P_[i][1],f)];c.lineTo(pos[0],pos[1]);break;}}c.stroke();c.setLineDash([]);return pos;}
function arc3(c,pr,a,b,h,p,col,w=2){if(p<=0)return null;c.strokeStyle=col;c.lineWidth=w;c.beginPath();let first=true,last=null;for(let s=0;s<=p+1e-6;s+=.02){const q=pr(lerp(a[0],b[0],s),lerp(a[1],b[1],s),Math.sin(Math.PI*s)*h);if(!q)continue;first?c.moveTo(q[0],q[1]):c.lineTo(q[0],q[1]);first=false;last=q;}c.stroke();return last;}
function glow(c,x,y,r,col,a=1){if(a<=0)return;const g=c.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,rgba(col,.9*a));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r);}
function heartbeat(c,y,t,col,amp=60,a=1){c.save();c.globalAlpha*=a;c.strokeStyle=col;c.lineWidth=2.5;c.beginPath();for(let x=0;x<=W;x+=4){const u=((x/60+t*2.5)%6);const dy=u>2.4&&u<2.7?-amp:u>2.7&&u<3?amp*.7:0;x?c.lineTo(x,y+dy):c.moveTo(x,y+dy);}c.stroke();c.restore();}
function spectrum(c,t,k,col,base=H-40,maxh=220,a=1){c.save();c.globalAlpha*=a;const r=rng(17);for(let i=0;i<96;i++){const h=(Math.pow(Math.abs(Math.sin(i*.7+t*5)),2)*.6+r()*.4)*k*maxh;c.fillStyle=rgba(col,.3+.45*(i%3===0));c.fillRect(i*10,base-h,7,h);}c.restore();}
/* text that resolves out of noise */
const GLY='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/',DGLY='अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह';
function decode(c,s,x,y,font,col,p,seed=1,al='left',a=1){if(a<=0)return;const dev=/[ऀ-ॿ]/.test(s);if(dev){const r=rng(seed+Math.floor(p*30));const n=s.length;const shown=Math.floor(clamp(p)*n);let out=s.slice(0,shown);for(let i=shown;i<n;i++)out+=s[i]===' '?' ':DGLY[Math.floor(r()*DGLY.length)];ht(c,out,x,y,font,col,al,a*(p<1?.85:1));return;}
  const r=rng(seed+Math.floor(p*40));let out='';for(let i=0;i<s.length;i++){const ch=s[i];out+=(ch===' '||i/s.length<p*1.15-.15)?ch:GLY[Math.floor(r()*GLY.length)];}ht(c,out,x,y,font,col,al,a);}
/* wireframe figure for dossiers and crowds */
function figure(c,x,y,s,col,a=1,o={}){if(a<=0)return;c.save();c.globalAlpha*=a;c.strokeStyle=col;c.lineWidth=Math.max(1,2*s);c.fillStyle=rgba(col,.08);c.beginPath();c.ellipse(x,y-150*s,22*s,27*s,0,0,7);c.fill();c.stroke();
  if(o.turban){c.beginPath();c.ellipse(x,y-168*s,30*s,17*s,0,Math.PI,0);c.lineTo(x+28*s,y-160*s);c.quadraticCurveTo(x,y-152*s,x-28*s,y-160*s);c.closePath();c.fillStyle=rgba(HX.sf,.35);c.fill();c.strokeStyle=HX.sf;c.stroke();c.strokeStyle=col;}
  if(o.hat){c.strokeRect(x-18*s,y-196*s,36*s,22*s);c.beginPath();c.moveTo(x-34*s,y-174*s);c.lineTo(x+34*s,y-174*s);c.stroke();}
  c.beginPath();c.moveTo(x-60*s,y);c.quadraticCurveTo(x-64*s,y-96*s,x-26*s,y-116*s);c.lineTo(x+26*s,y-116*s);c.quadraticCurveTo(x+64*s,y-96*s,x+60*s,y);c.closePath();c.fill();c.stroke();
  if(o.mark){c.fillStyle=HX.rd;c.fillRect(x-2*s,y-172*s,4*s,14*s);}
  for(let k=1;k<4;k++){c.globalAlpha=a*.25;c.beginPath();c.moveTo(x-56*s+k*4*s,y-k*28*s);c.lineTo(x+56*s-k*4*s,y-k*28*s);c.stroke();}c.restore();}
/* frame furniture: sequence label, mode chip, source line */
function hudHead(c,n,title,mode,a=1){const col=MODE[mode]||HX.cy;ht(c,`SEQ ${String(n).padStart(2,'0')} · ${title.toUpperCase()}`,32,32,`500 12px ${HM}`,col,'left',a);ht(c,STY[mode][0].toUpperCase(),W-32,32,`500 11px ${HM}`,rgba(col,.75),'right',a);}
function hudSrc(c,s,col=HX.cy){ht(c,s,W-32,H-20,`10px ${HM}`,rgba(col,.55),'right');}
/* scanlines, vignette and a glitch tear + flash on every beat (the cut) */
function hudFX(c,t,B,col=HX.cy,o={}){c.fillStyle='rgba(0,0,0,.16)';for(let y=0;y<H;y+=3)c.fillRect(0,y,W,1);
  const g=c.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.62);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.55)');c.fillStyle=g;c.fillRect(0,0,W,H);
  const {i,l}=beat(t,B);const cl=(i===0?t:l);if(cl<.16&&!o.noCut&&!(i===0&&t<.3)){const r=rng(i*97+Math.floor(t)),cv=c.canvas,m=c.getTransform(),s=m.a;c.save();c.setTransform(1,0,0,1,0,0);for(let k=0;k<9;k++){const y=r()*H,h=6+r()*36,dx=(r()-.5)*90;c.drawImage(cv,0,y*s,cv.width,h*s,dx*s,y*s,cv.width,h*s);}c.restore();c.fillStyle=rgba(col,.12*(1-cl/.16));c.fillRect(0,0,W,H);}}

/* ---------- QUOTE: the speaker's exact words as full-frame kinetic type ---------- */
const QSTOP=new Set('of the a an to in on my your and or you we that which is are be by for with at as its our their may will it i have has not but so if from this these those his her he she they them us me no'.split(' '));
function qchunks(s){const parts=s.replace(/\s+/g,' ').split(/(?<=[,;:.!?—])\s+|\s+(?=—)/).map(p=>p.trim()).filter(Boolean);const out=[];parts.forEach(p=>{const w=p.split(' ');if(w.length<=4){out.push(p);return;}let cur=[];w.forEach((x,k)=>{cur.push(x);const left=w.length-k-1,last=x.toLowerCase().replace(/[^a-z']/g,'');if(left===0||(cur.length>=3&&!QSTOP.has(last)&&left>=2)||cur.length>=5){out.push(cur.join(' '));cur=[];}});if(cur.length)out.push(cur.join(' '));});return out;}
const QBG=[['#05070b','#ece6d8','#ff7a1a'],['#ece6d8','#05070b','#d81e1e'],['#ff7a1a','#05070b','#05070b'],['#05070b','#ffa64d','#ece6d8'],['#d81e1e','#05070b','#ece6d8']];
function QUOTE(c,text,lt,dur,ch,ci){const ck=qchunks(text);const wts=ck.map(s=>s.split(' ').length+1.2),tot=wts.reduce((a,b)=>a+b,0);let acc=0,j=0,st=0;for(let k=0;k<ck.length;k++){const d=wts[k]/tot*dur;if(lt>=acc-1e-6){j=k;st=acc;}acc+=d;}
  const l=lt-st,seed=(ci*31+text.length)%QBG.length,[bg,fg,ac]=QBG[(seed+j)%QBG.length];c.fillStyle=bg;c.fillRect(0,0,W,H);
  const s=ck[j].toUpperCase().replace(/[,;:]$/,'');const words=s.split(' ');const sc=1.08-.08*eo(clamp(l/.25));
  let lines=[s];let px=fitpx(c,s,HD,860,250);if(px<120&&words.length>1){const m=Math.ceil(words.length/2);lines=[words.slice(0,m).join(' '),words.slice(m).join(' ')];px=Math.min(...lines.map(x=>fitpx(c,x,HD,860,210)));}
  if(lines.length>2)lines=[s];
  c.save();c.translate(W/2,H/2);c.scale(sc,sc);c.translate(-W/2,-H/2);lines.forEach((ln,k)=>{const y=H/2+(k-(lines.length-1)/2)*px*1.02+px*.04;ht(c,ln,W/2,y,`${px}px ${HD}`,k===lines.length-1&&lines.length>1?ac:fg,'center');});c.restore();
  const lab=bg==='#ece6d8'||bg==='#ff7a1a'?'rgba(5,7,11,.6)':'rgba(236,230,216,.6)';c.strokeStyle=lab.replace(/[\d.]+\)$/,'.12)');c.lineWidth=1;[W/3,2*W/3].forEach(x=>{c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke();});[H/3,2*H/3].forEach(y=>{c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();});
  ht(c,'◉ SWAMI VIVEKANANDA · VERBATIM',32,32,`500 12px ${HM}`,lab);ht(c,`${String(j+1).padStart(2,'0')} / ${String(ck.length).padStart(2,'0')}`,W-32,32,`500 12px ${HM}`,lab,'right');
  const f=Math.floor((lt%1)*24);ht(c,`TC ${String(Math.floor(lt)).padStart(2,'0')}:${String(f).padStart(2,'0')}`,32,H-24,`500 11px ${HM}`,lab);
  if(l<.1){c.fillStyle=`rgba(255,255,255,${.25*(1-l/.1)})`;c.fillRect(0,0,W,H);}}

/* ---------- TRANSITION: fly through a yantra into the next chapter ---------- */
function yantraRing(c,s,rot,col,t,id,petals=12){c.save();c.rotate(rot);c.strokeStyle=col;c.lineWidth=Math.max(1,s*.012);const q=s,g=s*.22;
  for(let side=0;side<4;side++){c.save();c.rotate(side*Math.PI/2);c.beginPath();c.moveTo(-q,q);c.lineTo(-g,q);c.lineTo(-g,q+g*.6);c.lineTo(-g*1.6,q+g*.6);c.lineTo(-g*1.6,q+g*1.2);c.lineTo(g*1.6,q+g*1.2);c.lineTo(g*1.6,q+g*.6);c.lineTo(g,q+g*.6);c.lineTo(g,q);c.lineTo(q,q);c.stroke();c.restore();}
  const rr=s*.86;c.beginPath();c.arc(0,0,rr,0,7);c.stroke();for(let i=0;i<petals;i++){const a=i/petals*Math.PI*2,r1=s*.6;c.beginPath();c.moveTo(Math.cos(a-.18)*r1,Math.sin(a-.18)*r1);c.quadraticCurveTo(Math.cos(a)*rr*1.05,Math.sin(a)*rr*1.05,Math.cos(a+.18)*r1,Math.sin(a+.18)*r1);c.stroke();}
  const tr=s*.5;[0,Math.PI].forEach(o=>{c.beginPath();for(let i=0;i<3;i++){const a=o-Math.PI/2+i*Math.PI*2/3;i?c.lineTo(Math.cos(a)*tr,Math.sin(a)*tr):c.moveTo(Math.cos(a)*tr,Math.sin(a)*tr);}c.closePath();c.stroke();});c.restore();}
function TRANSITION(ctx,T_,k,n,drawScene,CH){const ws=CH[n].start-1.15,u=seg(T_,ws,ws+1.1);if(u<=0||u>=1)return;
  ctx.fillStyle='#020308';ctx.fillRect(0,0,W,H);
  if(u<.5){const v=eio(u/.5);ctx.save();ctx.globalAlpha=1-v;ctx.translate(W/2,H/2);ctx.scale(1+v*2.4,1+v*2.4);ctx.translate(-W/2,-H/2);drawScene(ctx,k,T_);ctx.restore();}
  else{const v=eio((u-.5)/.5);ctx.save();ctx.globalAlpha=v;ctx.translate(W/2,H/2);const s=.12+.88*v;ctx.scale(s,s);ctx.translate(-W/2,-H/2);drawScene(ctx,n,T_);ctx.restore();}
  const tv=u*6,N=10,col=STY[CH[n].style][1];ctx.save();ctx.translate(W/2,H/2);ctx.rotate(u*1.2);ctx.globalCompositeOperation='lighter';
  for(let j=N-1;j>=0;j--){const zr=((j-tv)%N+N)%N+.3,s=240/zr,a=clamp(1-zr/N)*clamp((zr-.3)/.5)*Math.sin(Math.PI*u);if(a<=0||s>2400)continue;ctx.globalAlpha=a;yantraRing(ctx,s,j*.4,j%2?col:HX.sf,T_,j,j%2?8:16);}
  ctx.restore();ctx.globalCompositeOperation='source-over';glow(ctx,W/2,H/2,50+Math.sin(Math.PI*u)*150,'#fff2d0',.75*Math.sin(Math.PI*u));
  const lab=`${String(n+1).padStart(2,'0')} · ${CH[n].title.toUpperCase()}`,z=lerp(5,.6,u);ht(ctx,lab,W/2,H/2,`${Math.min(150,40/z)}px ${HD}`,'#fff4dc','center',clamp(Math.sin(Math.PI*u)*1.6)*clamp((z-.6)/.6));
  if(Math.abs(u-.5)<.05){ctx.fillStyle=`rgba(255,250,235,${.5*(1-Math.abs(u-.5)/.05)})`;ctx.fillRect(0,0,W,H);}}
