/* ===== From Colombo to Almora · WHITEBOARD MURAL =====
   Each chapter is one continuous whiteboard mural. A new shaded drawing appears every one or two narration lines:
   ink outlines first, then cross-hatching derived from a tone map, then marker colour scribbled underneath.
   The camera pans right to the next drawing and pulls back at the end of the chapter to show the whole mural.
   Everything is a pure function of time, so films stay seekable and renderable. */
['kalighat','papercut','lantern','percept','plate','palmleaf','chart'].forEach(k=>delete STY[k]);
Object.assign(STY,{ink:['Ink and hatch','#55555c'],marker:['Saffron marker','#ee7a1c'],blood:['Red marker','#d42326'],light:['Rainbow light','#f2c014'],sea:['Sea and sky','#2c7fe0'],earth:['Earth and leaf','#3aa64a'],portrait:['Portrait','#8b4fe0']});
const MINK='#141416',MRED='#d42326',MSAF='#ee7a1c',MYEL='#ffd21a',MGRN='#3aa64a',MBLU='#2c7fe0',MPNK='#ff4f9a',MPUR='#8b4fe0',MCYN='#22c3e6',MSKIN='#d99a6c',MBRZ='#d3a24a',MSTONE='#e9dcc0',MBROWN='#8a5a32';
const LETF='"Patrick Hand SC","Comic Sans MS",cursive',QF='"Libre Baskerville",Georgia,serif';
const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
function rng(seed){let s=(seed>>>0)||1;return()=>(s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296;}
const mkc=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};

/* ---------- geometry ---------- */
const ell=(cx,cy,rx,ry,n=40,a0=0,a1=Math.PI*2)=>{const o=[];for(let i=0;i<=n;i++){const a=lerp(a0,a1,i/n);o.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]);}return o;};
const rect=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
const bz=(p0,p1,p2,p3,n=16)=>{const o=[];for(let i=0;i<=n;i++){const t=i/n,u=1-t;o.push([u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0],u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]]);}return o;};
const tf=(pts,x,y,s=1,fl=1)=>pts.map(([a,b])=>[x+a*s*fl,y+b*s]);
const rot=(pts,cx,cy,a)=>pts.map(([x,y])=>{const dx=x-cx,dy=y-cy;return[cx+dx*Math.cos(a)-dy*Math.sin(a),cy+dx*Math.sin(a)+dy*Math.cos(a)];});
function bbox(p){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[x,y]of p){if(x<x0)x0=x;if(y<y0)y0=y;if(x>x1)x1=x;if(y>y1)y1=y;}return[x0,y0,x1,y1];}
const plen=p=>{let s=0;for(let i=1;i<p.length;i++)s+=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);return s;};
function subdiv(pts,step=3){const o=[pts[0]];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],d=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.round(d/step));for(let k=1;k<=n;k++)o.push([lerp(a[0],b[0],k/n),lerp(a[1],b[1],k/n)]);}return o;}
function wob(pts,seed,amp=1.1){const r=rng(seed),ph=r()*6.28,ph2=r()*6.28;const o=[];let s=0;for(let i=0;i<pts.length;i++){if(i)s+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);const a=pts[Math.min(i+1,pts.length-1)],b=pts[Math.max(i-1,0)];let nx=-(a[1]-b[1]),ny=a[0]-b[0];const nl=Math.hypot(nx,ny)||1;const d=amp*(Math.sin(s*.05+ph)+.5*Math.sin(s*.17+ph2));o.push([pts[i][0]+nx/nl*d,pts[i][1]+ny/nl*d]);}return o;}
function mpath(c,p){c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.closePath();}
const flat=a=>{const o=[];for(let i=0;i<a.length;i+=2)o.push([a[i],a[i+1]]);return o;};

/* ---------- scene builder ---------- */
class Scene{constructor(){this.items=[];this.n=0;this.obj=-1;}
  g(){this.obj++;return this;}
  S(pts,o={}){this.items.push({k:'S',pts,idx:this.n++,obj:this.obj,tone:o.tone||[.95,.62],dir:o.dir??.8,rad:o.rad,lw:o.lw??2.4,col:o.col,cA:o.cA??.9,noline:o.noline,cang:o.cang??-.62});return this;}
  L(pts,o={}){this.items.push({k:'L',pts,layer:this.n-1,obj:this.obj,lw:o.lw??1.7,closed:o.closed,col:o.col,any:o.any});return this;}
  T(segs,x,y,size,o={}){this.items.push({k:'T',segs,x,y,size,rot:o.rot||0,al:o.al||'left',font:o.font||LETF,style:o.style||'',obj:this.obj});return this;}
  G(x,y,r,col,o={}){this.items.push({k:'G',x,y,r,col,a:o.a??.55,obj:this.obj,sx:o.sx||1});return this;}
  A(name,x,y,s,o={}){const a=ASSETS[name];this.g();const out=tf(flat(a.outline),x,y,s);this.items.push({k:'S',pts:out,idx:this.n++,obj:this.obj,tone:[1,1],dir:0,noline:1});this.items.push({k:'A',a,x,y,s,obj:this.obj,mono:o.mono,tint:o.tint});return this;}}
/* hand lettering: wraps text to maxW; words listed in hi:{WORD:colour} are coloured */
function letter(S,str,x,y,size,maxW,o={}){S.g();const c=document.createElement('canvas').getContext('2d');c.font=`${size}px ${LETF}`;const words=str.toUpperCase().split(/\s+/);const lines=[];let cur=[];
  words.forEach(w=>{const t=[...cur,w].join(' ');if(c.measureText(t).width>maxW&&cur.length){lines.push(cur);cur=[w];}else cur.push(w);});if(cur.length)lines.push(cur);
  const hi=o.hi||{};lines.forEach((ln,i)=>{const segs=[];ln.forEach((w,j)=>{const key=w.replace(/[^A-Z']/g,'');const col=hi[key]||o.col||MINK;const txt=w+(j<ln.length-1?' ':'');if(segs.length&&segs[segs.length-1][1]===col)segs[segs.length-1][0]+=txt;else segs.push([txt,col]);});
    S.T(segs,x,y+i*size*1.12,size,{rot:o.rot??-.015,al:o.al||'left'});});return y+lines.length*size*1.12;}

/* a block of lettering: items [[text,size,{WORD:colour}],...] stacked downward from (x,y); returns the y below it */
function stack(S,x,top,maxW,items,o={}){let yy=top;items.forEach(([t,sz,hi])=>{const after=letter(S,t,x,yy+sz*.85,sz,maxW,{hi:hi||{},al:o.al,rot:o.rot});yy=after-sz*1.12+sz*.65;});return yy;}
/* soft pastel airbrush wash */
function wash(S,x,y,r,col,a=.32,sx=1.5){S.g();S.G(x,y,r,col,{a,sx});}
/* compile: tone map → cross-hatching */
const HLAY=[{th:.88,a:-.78,g:7.2},{th:.7,a:.74,g:6.8},{th:.5,a:-.18,g:5.4},{th:.3,a:1.3,g:4.4},{th:.16,a:-1.1,g:3.6}];
function compileScene(sc,seed){
  const shapes=sc.items.filter(i=>i.k==='S');const tc=mkc(W,H),tg=tc.getContext('2d',{willReadFrequently:true});tg.fillStyle='#fff';tg.fillRect(0,0,W,H);
  const ic=mkc(W,H),ig=ic.getContext('2d',{willReadFrequently:true});ig.fillStyle='#000';ig.fillRect(0,0,W,H);
  for(const s of shapes){const[x0,y0,x1,y1]=bbox(s.pts),cx=(x0+x1)/2,cy=(y0+y1)/2,R=Math.max(x1-x0,y1-y0)/2+1;let gr;
    if(s.rad)gr=tg.createRadialGradient(cx-R*.38,cy-R*.42,R*.04,cx,cy,R*1.02);else{const ux=Math.cos(s.dir),uy=Math.sin(s.dir);gr=tg.createLinearGradient(cx-ux*R,cy-uy*R,cx+ux*R,cy+uy*R);}
    const g0=Math.round(s.tone[0]*255),g1=Math.round(s.tone[1]*255);gr.addColorStop(0,`rgb(${g0},${g0},${g0})`);gr.addColorStop(1,`rgb(${g1},${g1},${g1})`);tg.fillStyle=gr;mpath(tg,s.pts);tg.fill();
    const id=s.idx+1;ig.fillStyle=`rgb(${id&255},${(id>>8)&255},0)`;mpath(ig,s.pts);ig.fill();}
  const td=tg.getImageData(0,0,W,H).data,idd=ig.getImageData(0,0,W,H).data;
  const idAt=(x,y)=>{x|=0;y|=0;if(x<0||y<0||x>=W||y>=H)return 0;const p=(y*W+x)*4;return idd[p]+(idd[p+1]<<8);};
  const vis=(x,y,lim)=>{for(let dy=-2;dy<=2;dy+=2)for(let dx=-2;dx<=2;dx+=2)if(idAt(x+dx,y+dy)<=lim)return true;return false;};
  const objOf=id=>shapes[id-1]?shapes[id-1].obj:0;
  const r=rng(seed*977+5);const R=Math.hypot(W,H)/2+4;const hatch={};
  HLAY.forEach((Ly,li)=>{const ux=Math.cos(Ly.a),uy=Math.sin(Ly.a),nx=-uy,ny=ux;
    for(let d=-R;d<=R;d+=Ly.g){const dd=d+(r()-.5)*1.4,th=Ly.th+(r()-.5)*.07;let run=null;
      const push=()=>{if(!run)return;const L=Math.hypot(run.e[0]-run.b[0],run.e[1]-run.b[1]);if(L>4){const a=r()*2.5,b=r()*3;const o=objOf(run.id);(hatch[o]=hatch[o]||[]).push({pts:[[run.b[0]-ux*a,run.b[1]-uy*a],[run.e[0]+ux*b,run.e[1]+uy*b]],lw:li>2?1.05:1.25,li,d:dd,len:L});}run=null;};
      for(let s=-R;s<=R;s+=2){const x=W/2+nx*dd+ux*s,y=H/2+ny*dd+uy*s;let ok=false,id=0;if(x>=0&&y>=0&&x<W&&y<H){const p=((y|0)*W+(x|0))*4;id=idd[p]+(idd[p+1]<<8);ok=id>0&&td[p]/255<th;}
        if(ok&&run&&run.id===id)run.e=[x,y];else{push();if(ok)run={id,b:[x,y],e:[x,y]};}}push();}});
  const byObj={};const add=(o,op)=>(byObj[o]=byObj[o]||[]).push(op);let sd=seed*31;
  const runs=(pts,lim,any)=>{const out=[];let cur=[];for(const p of pts){if(any||vis(p[0],p[1],lim))cur.push(p);else{if(cur.length>2)out.push(cur);cur=[];}}if(cur.length>2)out.push(cur);return out;};
  const assetColour=[];
  sc.items.forEach(it=>{if(it.k==='S'&&!it.noline){runs(subdiv(it.pts.concat([it.pts[0]]),3),it.idx+1).forEach(rn=>{const w=wob(rn,sd++);add(it.obj,{k:'L',pts:w,lw:it.lw,len:plen(w)});});}
    else if(it.k==='L'){runs(subdiv(it.closed?it.pts.concat([it.pts[0]]):it.pts,3),it.layer+1,it.any).forEach(rn=>{const w=wob(rn,sd++,.8);add(it.obj,{k:'L',pts:w,lw:it.lw,len:plen(w),col:it.col});});}
    else if(it.k==='T')add(it.obj,{k:'T',it,len:it.segs.reduce((a,q)=>a+q[0].length,0)*15});
    else if(it.k==='A'){const a=it.a,T=p=>tf(flat(p),it.x,it.y,it.s);a.contour.forEach(cn=>{const p=T(cn);add(it.obj,{k:'L',pts:p,lw:Math.max(1.2,2*it.s),len:plen(p)});});
      const hs=a.hatch.map(h=>({pts:[[it.x+h[1]*it.s,it.y+h[2]*it.s],[it.x+h[3]*it.s,it.y+h[4]*it.s]],li:h[0]}));hs.forEach(h=>{const L=Math.hypot(h.pts[1][0]-h.pts[0][0],h.pts[1][1]-h.pts[0][1]);add(it.obj,{k:'L',pts:h.pts,lw:h.li>2?1:1.15,len:L*.42,hatch:1});});
      if(!it.mono)a.colour.forEach(cr=>cr.poly.forEach(pl=>assetColour.push({obj:it.obj,poly:T(pl),col:it.tint||cr.col})));}});
  Object.keys(hatch).forEach(o=>{hatch[o].sort((a,b)=>a.li-b.li||a.d-b.d);hatch[o].forEach(h=>add(+o,{k:'L',pts:h.pts,lw:h.lw,len:h.len*.42,hatch:1}));});
  const ink=[];Object.keys(byObj).map(Number).sort((a,b)=>a-b).forEach(o=>{const ops=byObj[o];ops.sort((a,b)=>(a.hatch||0)-(b.hatch||0)||(a.k==='T')-(b.k==='T'));ink.push(...ops);});
  let tot=ink.reduce((a,o)=>a+o.len,0)||1,acc=0;ink.forEach(o=>{o.t0=acc/tot;acc+=o.len;o.t1=acc/tot;});
  const col=[];const scribble=(poly,ang,colr,a,obj)=>{const[x0,y0,x1,y1]=bbox(poly),cx=(x0+x1)/2,cy=(y0+y1)/2,Rr=Math.hypot(x1-x0,y1-y0)/2+6,ux=Math.cos(ang),uy=Math.sin(ang),nx=-uy,ny=ux;const zz=[];let k=0;
    for(let d=-Rr;d<=Rr;d+=7,k++){const p=[cx+nx*d-ux*Rr,cy+ny*d-uy*Rr],q=[cx+nx*d+ux*Rr,cy+ny*d+uy*Rr];if(k%2)zz.push(q,p);else zz.push(p,q);}col.push({k:'F',poly,pts:zz,col:colr,a,len:Math.sqrt(Rr)*Rr*.12+30,obj});};
  sc.items.forEach(it=>{if(it.k==='S'&&it.col)scribble(it.pts,it.cang,it.col,it.cA,it.obj);else if(it.k==='G')col.push({k:'G',it,len:it.r*.5,obj:it.obj});});
  assetColour.forEach(a=>scribble(a.poly,-.62,a.col,.82,a.obj));
  col.sort((a,b)=>a.obj-b.obj);let tt=col.reduce((a,o)=>a+o.len,0)||1,ac=0;col.forEach(o=>{o.t0=ac/tt;ac+=o.len;o.t1=ac/tt;});
  return{ink,col,cache:{}};}

/* ---------- drawing ---------- */
function partial(c,pts,k){if(k<=0)return;const tot=plen(pts),tg=k*tot;let acc=0;c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);if(acc+d<=tg){c.lineTo(pts[i][0],pts[i][1]);acc+=d;}else{const f=(tg-acc)/d;c.lineTo(lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f));break;}}}
function textOp(c,it,k){c.save();c.translate(it.x,it.y);c.rotate(it.rot);c.font=`${it.style} ${it.size}px ${it.font}`;c.textBaseline='alphabetic';const ws=it.segs.map(q=>c.measureText(q[0]).width),w=ws.reduce((a,b)=>a+b,0),x0=it.al==='center'?-w/2:it.al==='right'?-w:0;
  c.beginPath();c.rect(x0-4,-it.size*1.15,(w+8)*k,it.size*1.6);c.clip();let xx=x0;it.segs.forEach((q,i)=>{c.fillStyle=q[1]||MINK;c.fillText(q[0],xx,0);xx+=ws[i];});c.restore();}
function drawInk(c,P,p){c.save();c.lineCap='round';c.lineJoin='round';c.strokeStyle=MINK;let curW=-1;c.beginPath();
  for(const o of P.ink){if(p<=o.t0)break;const k=p>=o.t1?1:(p-o.t0)/(o.t1-o.t0);
    if(o.k==='T'){c.stroke();textOp(c,o.it,k);c.beginPath();continue;}
    if(o.lw!==curW||o.col){c.stroke();c.beginPath();curW=o.lw;c.lineWidth=o.lw;c.strokeStyle=o.col||MINK;}
    partial(c,o.pts,k);if(o.col){c.stroke();c.beginPath();c.strokeStyle=MINK;curW=-1;}}
  c.stroke();c.restore();}
function drawCol(c,P,p){for(const o of P.col){if(p<=o.t0)break;const k=p>=o.t1?1:(p-o.t0)/(o.t1-o.t0);
  if(o.k==='F'){c.save();mpath(c,o.poly);c.clip();c.globalAlpha=o.a;c.strokeStyle=o.col;c.lineWidth=11;c.lineCap='round';c.lineJoin='round';c.beginPath();partial(c,o.pts,k);c.stroke();c.restore();}
  else{const it=o.it;c.save();c.globalAlpha=it.a*k;c.translate(it.x,it.y);c.scale(it.sx,1);const g=c.createRadialGradient(0,0,2,0,0,it.r);g.addColorStop(0,it.col);g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.beginPath();c.arc(0,0,it.r,0,7);c.fill();c.restore();}}}
const MCS=1.5;let MLRU=[];
function mcache(P,key,fn){if(!P.cache[key]){const cv=mkc(W*MCS,H*MCS),g=cv.getContext('2d');g.scale(MCS,MCS);fn(g);P.cache[key]=cv;MLRU.push([P,key]);if(MLRU.length>16){const[q,kk]=MLRU.shift();delete q.cache[kk];}}return P.cache[key];}
function renderPanel(c,P,inkP,colP){if(P.paint){const p=Math.min(inkP,1);if(p>=1)c.drawImage(mcache(P,'full-'+MSTYLE,g=>drawPaint(g,P,1,MSTYLE)),0,0,W,H);else if(p>0)drawPaint(c,P,p,MSTYLE);return;}
  if(inkP>=1&&colP>=1){c.drawImage(mcache(P,'full',g=>{drawCol(g,P,1);drawInk(g,P,1);}),0,0,W,H);return;}
  if(colP>0)drawCol(c,P,colP);
  if(inkP>=1)c.drawImage(mcache(P,'ink',g=>drawInk(g,P,1)),0,0,W,H);else if(inkP>0)drawInk(c,P,inkP);}
function boardBG(c){if(typeof MSTYLE!=='undefined'&&MSTYLE==='water'){c.drawImage(paperTex(),0,0,W,H);return;}c.fillStyle='#fdfdfb';c.fillRect(0,0,W,H);const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.035)');c.fillStyle=g;c.fillRect(0,0,W,H);}

/* ---------- the mural: chapters of panels on one board ---------- */
const MURAL={},MPANELS=new Map(),PW=960;
const fontsOK=()=>!document.fonts||document.fonts.status==='loaded'||document.fonts.check('20px "Patrick Hand SC"');
function mpanel(id,i){const key=id+'#'+i;if(!MPANELS.has(key)){const S=new Scene();MURAL[id][i].draw(S);const P=MSTYLE==='hatch'?compileScene(S,(id.length*131+i*17)|0):compilePaint(S,(id.length*131+i*17)|0);if(!fontsOK())return P;MPANELS.set(key,P);}return MPANELS.get(key);}
function chapterInfo(id){const k=CH.findIndex(c=>c.id===id),ch=CH[k];const end=k+1<CH.length?CH[k+1].start:DUR;return{len:end-ch.start};}
function muralScene(id){return(c,t,B)=>{const ps=MURAL[id],n=ps.length,len=chapterInfo(id).len;boardBG(c);
  const st=ps.map(p=>B[Math.min(p.at,B.length-1)]+.1),en=st.map((s,i)=>i+1<n?st[i+1]:len-2.4);
  let cur=0;for(let i=0;i<n;i++)if(t>=st[i]-.05)cur=i;
  const prog=i=>{if(i<cur)return[1,1];if(i>cur)return[0,0];const D=en[i]-st[i],a=st[i];if(MSTYLE!=='hatch'){const e=seg(t,a,Math.max(a+1.2,en[i]-1.0));return[e,e];}const inkEnd=a+Math.max(1.6,Math.min(D*.6,D-1.6)),colEnd=Math.max(inkEnd+.4,en[i]-.95);return[seg(t,a,inkEnd),seg(t,inkEnd,colEnd)];};
  const panT=cur+1<n?eio(seg(t,en[cur]-.9,en[cur])):0;let camX=cur*PW+W/2+panT*PW,z=1,camY=H/2;
  const total=(n-1)*PW+W,zf=Math.min(1,(W-60)/total),pb=eio(seg(t,len-2.4,len-1.3));z=lerp(1,zf,pb);camX=lerp(camX,total/2,pb);camY=lerp(H/2,H/2,pb);
  c.save();c.translate(W/2,H/2);c.scale(z,z);c.translate(-camX,-camY);
  for(let i=0;i<=Math.min(n-1,cur+1);i++){const ox=i*PW;if(ox+W<camX-W/2/z-4||ox>camX+W/2/z+4)continue;const[a,b]=prog(i);if(a<=0&&b<=0)continue;c.save();c.translate(ox,0);renderPanel(c,mpanel(id,i),a,b);c.restore();}
  c.restore();
  if(pb>0){c.save();c.globalAlpha=pb*.5;c.strokeStyle='#cfcfc8';c.lineWidth=1;c.strokeRect(W/2-total*z/2,H/2-H*z/2,total*z,H*z);c.restore();}};}
function TRANSITION(ctx,T_,k,n,drawScene,CH){const ws=CH[n].start-1.1,u=seg(T_,ws,ws+1.05);if(u<=0||u>=1)return;
  if(u<.55){ctx.fillStyle=`rgba(253,253,251,${eio(u/.55)})`;ctx.fillRect(0,0,W,H);}else{ctx.fillStyle='#fdfdfb';ctx.fillRect(0,0,W,H);}}

/* ---------- object library (all original drawings) ---------- */
function hoplite(S,x,y,s,fl=1){const T=p=>tf(p,x,y,s,fl);S.g();
  S.S(T([[-22,-92],[-8,-92],[-12,-4],[-30,-4]]),{tone:[.85,.4],dir:0,col:'#b8862e'}).S(T([[6,-92],[22,-92],[32,-4],[14,-4]]),{tone:[.8,.35],dir:0,col:'#b8862e'});
  S.S(T([[-36,-134],[36,-134],[44,-88],[-44,-88]]),{tone:[.97,.72],dir:0,col:'#f2ead8'});for(let k=-30;k<=30;k+=8)S.L(T([[k,-130],[k*1.2,-92]]),{lw:1.2});
  S.S(T([[-33,-204],[31,-204],[38,-134],[-38,-134]]),{tone:[.82,.3],dir:.35,col:MBRZ});S.L(T(bz([-24,-176],[-10,-168],[10,-168],[24,-176],8)),{lw:1.4}).L(T(bz([-26,-152],[-10,-146],[10,-146],[26,-152],8)),{lw:1.4});
  S.L(T([[46,-40],[84,-372]]),{lw:2.4});S.S(T([[78,-366],[86,-396],[92,-364]]),{tone:[.7,.25]});
  S.S(T([[-26,-208],[-28,-238],[-20,-260],[2,-266],[22,-256],[28,-234],[24,-214],[14,-206],[12,-222],[2,-226],[-4,-212]]),{tone:[.78,.22],dir:.6,col:MBRZ});S.L(T([[4,-238],[20,-236]]),{lw:2.6});
  S.S(T(ell(-4,-266,38,26,20,Math.PI,Math.PI*2).concat([[30,-260],[-40,-260]])),{tone:[.92,.55],dir:1.4,col:MRED,lw:2});
  S.S(T(ell(36,-154,46,50,36)),{rad:1,tone:[.92,.32],col:MBRZ,lw:2.8});S.L(T(ell(36,-154,38,42,36)),{closed:1,lw:1.4});S.L(T([[16,-130],[36,-182],[56,-130]]),{lw:3.2});}
function temple(S,x,y,s,broken){const T=p=>tf(p,x,y,s);S.g();S.S(T([[-170,0],[170,0],[160,-14],[-160,-14]]),{tone:[.95,.6],dir:1.5,col:MSTONE});S.S(T([[-160,-14],[160,-14],[150,-28],[-150,-28]]),{tone:[.95,.6],dir:1.5,col:MSTONE});
  for(let k=0;k<8;k++){const cx=-130+k*37.1,h=broken&&k%3===1?60+(k*13)%40:150;const top=broken&&k%3===1?[[cx-12,-28-h],[cx-3,-38-h],[cx+6,-23-h],[cx+12,-32-h]]:[[cx-12,-28-h],[cx+12,-28-h]];S.S(T([[cx-12,-28],...top,[cx+12,-28]]),{tone:[.97,.38],dir:0,col:MSTONE,lw:1.8});S.L(T([[cx-4,-30],[cx-4,-26-h]]),{lw:.9}).L(T([[cx+4,-30],[cx+4,-26-h]]),{lw:.9});}
  if(!broken){S.S(T([[-156,-178],[156,-178],[156,-198],[-156,-198]]),{tone:[.92,.55],dir:1.5,col:MSTONE});S.S(T([[-162,-198],[162,-198],[0,-250]]),{tone:[.95,.6],dir:1.2,col:MSTONE});S.L(T([[-130,-204],[0,-240],[130,-204],[-130,-204]]),{lw:1.2});}}
function column(S,x,y,h,s=1,broken=0){const T=p=>tf(p,x,y,s);S.g();const top=broken?[[-16,-h],[-6,-h-12],[3,-h+4],[10,-h-6],[16,-h]]:[[-16,-h],[16,-h]];S.S(T([[-16,0],...top,[16,0]]),{tone:[.97,.36],dir:0,col:'#ddd6c8',lw:2});for(let q=-8;q<=8;q+=8)S.L(T([[q,-4],[q,-h+2]]),{lw:.9});
  if(!broken){S.S(T([[-24,-h],[24,-h],[24,-h-12],[-24,-h-12]]),{tone:[.92,.5],dir:1.5,col:'#ddd6c8'});}S.S(T([[-22,0],[22,0],[22,-10],[-22,-10]]),{tone:[.9,.5],dir:1.5,col:'#ddd6c8'});}
function dust(S,x,y,w,h,seed){const r=rng(seed);S.g();for(let k=0;k<9;k++){const cx=x+(r()-.5)*w,cy=y-r()*h*.6,rr=18+r()*h*.35;S.S(ell(cx,cy,rr*1.3,rr,24),{rad:1,tone:[.99,.72],col:'#dcc9a3',cA:.7,lw:1.6});}}
function cloud(S,x,y,w,seed,col='#e8f2fb'){const r=rng(seed);S.g();for(let k=0;k<6;k++){const cx=x+(k-2.5)*w*.16+(r()-.5)*10,cy=y-Math.sin(k/5*Math.PI)*w*.12,rr=w*.12+r()*w*.06;S.S(ell(cx,cy,rr*1.2,rr,22),{rad:1,tone:[1,.8],col,cA:.6,lw:1.8});}}
function seated(S,x,y,s,robe=MSAF){const T=p=>tf(p,x,y,s);S.g();
  S.S(T(ell(0,6,140,20,30)),{tone:[.7,.45],noline:1});
  S.S(T([[-128,0],[-112,-38],[-60,-62],[60,-62],[112,-38],[128,0],[60,10],[-60,10]]),{tone:[.95,.48],dir:1.2,col:robe,lw:2.8});S.L(T(bz([-110,-20],[-60,-44],[-20,-40],[10,-30],10)),{lw:1.6}).L(T(bz([110,-24],[60,-46],[30,-40],[0,-30],10)),{lw:1.6});
  S.S(T([[-64,-56],[-60,-150],[-38,-188],[38,-188],[60,-150],[64,-56]]),{tone:[.95,.42],dir:.25,col:robe,lw:2.8});S.L(T(bz([-36,-186],[-10,-140],[24,-110],[60,-80],12)),{lw:1.8}).L(T(bz([-50,-150],[-30,-120],[0,-96],[40,-70],12)),{lw:1.3});
  S.S(T([[-62,-150],[-80,-90],[-62,-58],[-30,-60],[-48,-94],[-42,-140]]),{tone:[.92,.4],dir:.1,col:robe});S.S(T([[62,-150],[80,-90],[62,-58],[30,-60],[48,-94],[42,-140]]),{tone:[.9,.36],dir:.1,col:robe});
  S.S(T(ell(-20,-62,22,12,16)),{tone:[.95,.6],col:MSKIN}).S(T(ell(16,-62,22,12,16)),{tone:[.92,.55],col:MSKIN});
  S.S(T([[-14,-186],[-12,-206],[12,-206],[14,-186]]),{tone:[.85,.45],dir:0,col:MSKIN});
  S.S(T(ell(0,-232,30,36,30)),{tone:[.97,.6],dir:.35,col:MSKIN,lw:2.6});
  S.L(T(ell(-12,-232,9,4,10,Math.PI*.05,Math.PI*.95)),{lw:2}).L(T(ell(12,-232,9,4,10,Math.PI*.05,Math.PI*.95)),{lw:2}).L(T([[-22,-242],[-14,-245],[-4,-243]]),{lw:2.6}).L(T([[22,-242],[14,-245],[4,-243]]),{lw:2.6});
  S.L(T([[1,-238],[-3,-218],[5,-216]]),{lw:1.8}).L(T(bz([-10,-206],[-4,-203],[4,-203],[10,-206],6)),{lw:2});
  S.S(T(ell(0,-262,38,22,24,Math.PI*.95,Math.PI*2.05).concat([[34,-250],[-34,-250]])),{tone:[.95,.5],dir:.4,col:robe,lw:2.6});for(let k=0;k<3;k++)S.L(T(bz([-34,-256-k*5],[-10,-270-k*4],[14,-268-k*5],[34,-258-k*4],8)),{lw:1.3});}
/* standing person: o.head 'turban'|'hat'|'hair'|'veil'|'helmet'|'beard', o.arms 'up'|'down'|'out'|'hold', o.mark (tilak) */
function person(S,x,y,s,o={}){const T=p=>tf(p,x,y,s);S.g();const robe=o.col||MBLU;
  S.S(T([[-26,0],[-22,-110],[-30,-150],[-16,-176],[16,-176],[30,-150],[22,-110],[26,0]]),{tone:[.93,.4],dir:.2,col:robe,lw:2.2});S.L(T(bz([-4,-170],[0,-120],[-6,-60],[0,-6],8)),{lw:1.2});
  const arm=o.arms||'down';const A=arm==='up'?[[[-18,-166],[-44,-210],[-50,-246]],[[18,-166],[44,-210],[50,-246]]]:arm==='out'?[[[-18,-160],[-60,-150],[-86,-160]],[[18,-160],[60,-150],[86,-160]]]:arm==='hold'?[[[-18,-160],[-30,-120],[-6,-104]],[[18,-160],[30,-120],[6,-104]]]:[[[-20,-162],[-30,-110],[-28,-70]],[[20,-162],[30,-110],[28,-70]]];
  A.forEach(a=>S.L(T(a),{lw:Math.max(2,9*s)}));
  S.S(T(ell(0,-194,17,21,20)),{tone:[.96,.55],dir:.3,col:o.skin||MSKIN,lw:2});S.L(T([[-7,-198],[-3,-198]]),{lw:2}).L(T([[3,-198],[7,-198]]),{lw:2}).L(T([[-5,-184],[5,-184]]),{lw:1.6});
  const hd=o.head||'hair';
  if(hd==='turban'){S.S(T(ell(0,-212,22,14,18,Math.PI*.95,Math.PI*2.05).concat([[20,-204],[-20,-204]])),{tone:[.95,.5],col:o.tcol||MSAF,lw:2});}
  else if(hd==='hat'){S.S(T([[-14,-210],[-14,-236],[14,-236],[14,-210]]),{tone:[.6,.25],col:'#3a3a40'});S.S(T([[-26,-208],[26,-208],[26,-213],[-26,-213]]),{tone:[.55,.25]});}
  else if(hd==='veil'){S.S(T([[-24,-176],[-22,-210],[0,-222],[22,-210],[24,-176],[16,-188],[0,-216],[-16,-188]]),{tone:[.95,.5],col:o.tcol||MPNK,lw:2});}
  else if(hd==='helmet'){S.S(T([[-20,-196],[-20,-220],[0,-228],[20,-220],[20,-196]]),{tone:[.75,.25],col:'#7a7a80'});}
  else if(hd==='beard'){S.S(T([[-14,-186],[0,-160],[14,-186],[8,-180],[0,-176],[-8,-180]]),{tone:[.9,.6],col:'#eeeeee',lw:1.6});S.S(T(ell(0,-212,18,8,14,Math.PI,Math.PI*2)),{tone:[.95,.6],col:'#eeeeee'});}
  else S.S(T(ell(0,-208,18,9,14,Math.PI,Math.PI*2)),{tone:[.5,.2],col:'#2a1d14'});
  if(o.mark){S.S(T([[-2,-212],[2,-212],[2,-202],[-2,-202]]),{tone:[.3,.2],col:MRED});}}
function crowd(S,x0,x1,y,s,seed,o={}){const r=rng(seed);const cols=[MBLU,MRED,MGRN,MPUR,MSAF,'#2f6a6a','#8a5a2c',MPNK];const heads=o.heads||['turban','hair','veil','turban','hair'];const n=o.n||Math.round((x1-x0)/(60*s));
  for(let k=0;k<n;k++){const x=lerp(x0,x1,(k+.5)/n)+(r()-.5)*20*s,sc=s*(.85+r()*.3);person(S,x,y+(r()-.5)*10*s,sc,{col:cols[(k+seed)%cols.length],head:heads[k%heads.length],arms:o.arms||(r()<.3?'up':'down'),mark:o.mark});}}
function banyan(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();const r=rng(3);
  S.S(T([[-44,0],[-30,-150],[-74,-216],[-24,-204],[0,-250],[18,-204],[70,-222],[30,-150],[48,0]]),{tone:[.82,.28],dir:0,col:MBROWN});for(let k=0;k<7;k++){const xx=-26+k*9;S.L(T(bz([xx,-4],[xx-6,-60],[xx+6,-110],[xx-2,-160],10)),{lw:1.1});}
  for(let k=0;k<22;k++){const a=Math.PI*(1.02+r()*.96),d=60+r()*150,cx=Math.cos(a)*d*1.25,cy=-250+Math.sin(a)*d*.55+20;S.S(T(ell(cx,cy,40+r()*24,26+r()*14,22)),{tone:[.95,.42],dir:2.1,col:k%3?'#4aa64a':'#6bc04a',cA:.85,lw:1.8});}
  for(let k=0;k<9;k++){const rx=-180+k*45+r()*10;S.L(T(bz([rx,-200],[rx+4,-140],[rx-6,-80],[rx+2,-6],10)),{lw:1.1});}}
function palm(S,x,y,s,lean=.15){const T=p=>tf(p,x,y,s);S.g();const top=[lean*200,-260];S.S(T([[-10,0],[top[0]-6,top[1]],[top[0]+6,top[1]],[12,0]]),{tone:[.85,.35],dir:0,col:'#9a6a3a',lw:2});for(let k=1;k<12;k++){const f=k/12;S.L(T([[lerp(-10,top[0]-6,f),lerp(0,top[1],f)],[lerp(12,top[0]+6,f),lerp(0,top[1],f)+4]]),{lw:1});}
  for(let k=0;k<7;k++){const a=-Math.PI*.95+k*Math.PI*.3,L=100+(k%2)*20;const tip=[top[0]+Math.cos(a)*L,top[1]+Math.sin(a)*L*.6+30];const mid=[top[0]+Math.cos(a)*L*.5,top[1]+Math.sin(a)*L*.4-12];S.S(T(bz(top,mid,mid,tip,10).concat(bz(tip,[mid[0],mid[1]+16],[mid[0],mid[1]+16],top,10))),{tone:[.92,.45],dir:1.5,col:MGRN,lw:1.8});}}
function diya(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(ell(0,0,48,18,24,0,Math.PI).concat([[-48,0]])),{tone:[.85,.35],dir:1.3,col:'#b5652a'});S.S(T(ell(0,0,48,8,24)),{tone:[.7,.4],col:'#6a3a1a'});S.S(T([[40,-4],[62,-12],[46,4]]),{tone:[.8,.4],col:'#b5652a'});
  S.S(T(bz([58,-14],[78,-44],[62,-70],[58,-90],10).concat(bz([58,-90],[50,-66],[40,-44],[58,-14],10))),{tone:[1,.86],dir:1.5,col:MYEL,lw:2});S.G(x+58*s,y-46*s,70*s,'rgba(255,190,60,.9)',{a:.7});}
function globe(S,x,y,R,o={}){S.g();S.S(ell(x,y,R,R,60),{rad:1,tone:[.98,.38],col:'#7cc4ee',lw:3});for(const k of[-.6,-.3,0,.3,.6])S.L(ell(x,y+k*R,Math.sqrt(1-k*k)*R,Math.sqrt(1-k*k)*R*.14,30,0,Math.PI),{lw:1.1});for(const rx of[.35,.7])S.L(ell(x,y,rx*R,R,30,-Math.PI/2,Math.PI/2),{lw:1.1}).L(ell(x,y,rx*R,R,30,Math.PI/2,Math.PI*1.5),{lw:1.1});
  const pj=(lo,la)=>[x+(lo-82)*R*.016,y+(20-la)*R*.017-R*.12];S.S(INDIA_LL.map(p=>pj(...p)),{tone:[.9,.55],dir:.8,col:MGRN,lw:2.4});S.S(ell(...pj(80.7,7.6),R*.035,R*.055,10),{tone:[.9,.55],col:MGRN,lw:1.6});return pj(78,21);}
const INDIA_LL=[[66.6,25.4],[69,22.3],[72.6,21.1],[73.4,16.5],[74.8,12.8],[77.5,8.1],[79.9,11.2],[80.1,15.5],[84.1,18.3],[87.4,21.6],[91.8,22.4],[93,19.6],[95,27],[88,28.2],[81,30.5],[77,35.5],[74,36.8],[71,34]];
const CEYLON_LL=[[79.85,9.8],[80.2,9.8],[80.8,9.0],[81.3,8.3],[81.9,7.4],[81.7,6.4],[80.6,5.92],[80.0,6.2],[79.8,7.2],[79.75,8.2],[79.9,9.0]];
/* a shaded map of India and Ceylon; returns the projection */
function indiaMap(S,x,y,w,o={}){const lo0=66,lo1=96,la0=37,la1=5;const h=w*(la0-la1)/(lo1-lo0)*1.05;const pj=(lo,la)=>[x+(lo-lo0)/(lo1-lo0)*w,y+(la0-la)/(la0-la1)*h];S.g();
  S.S(INDIA_LL.map(p=>pj(...p)),{tone:[.95,.55],dir:.9,col:o.col||'#9fcf6a',cA:.8,lw:2.6});S.S(CEYLON_LL.map(p=>pj(...p)),{tone:[.95,.55],dir:.9,col:o.col||'#9fcf6a',cA:.8,lw:2.2});
  if(o.hills!==false){for(let k=0;k<9;k++){const p=pj(74+k*2.4,33-Math.sin(k*.7)*1.5-k*.35);S.L([[p[0]-10,p[1]+7],[p[0],p[1]-7],[p[0]+10,p[1]+7]],{lw:1.8});}}return pj;}
function bulb(S,cx,cy,R){S.g();S.S(ell(cx,cy,R,R,60,Math.PI*.7,Math.PI*2.3).concat([[cx+R*.42,cy+R*.85],[cx-R*.42,cy+R*.85]]),{rad:1,tone:[1,.72],col:'#fff3a8',cA:.75,lw:3.4});
  S.L([[cx-22,cy+R*.82],[cx-14,cy],[cx-7,cy+30],[cx,cy-8],[cx+7,cy+30],[cx+14,cy],[cx+22,cy+R*.82]],{lw:2});S.L(ell(cx-R*.42,cy-R*.36,R*.42,R*.42,14,Math.PI*1.05,Math.PI*1.45),{lw:3});
  for(let k=0;k<5;k++)S.S(rect(cx-R*.46+k*2,cy+R*.85+k*18,R*.92-k*4,18),{tone:[.92,.3],dir:0,col:'#a8a8b0',lw:2});}
function helmetX(S,x,y,s,a){const P=rot(tf([[-26,0],[-28,-30],[-20,-52],[2,-58],[22,-48],[28,-26],[24,-6],[14,2],[12,-14],[2,-18],[-4,-4]],x,y,s),x,y,a);S.S(P,{tone:[.75,.2],dir:.6,col:MBRZ});}
function sword(S,x,y,L,a,s=1){const P=rot([[x,y-3*s],[x+L,y-1],[x+L+14*s,y],[x+L,y+1],[x,y+3*s]],x,y,a);S.S(P,{tone:[.95,.45],dir:1.5,col:'#cfd0d6',lw:1.6});S.S(rot(rect(x-8*s,y-12*s,6*s,24*s),x,y,a),{tone:[.6,.3],col:'#8a6a3a'});}
function bird(S,x,y,s){S.L([[x-16*s,y-6*s],[x-6*s,y-2*s],[x,y],[x+6*s,y-3*s],[x+16*s,y-8*s]],{lw:2,any:1});}
function sun(S,x,y,R,o={}){S.g();S.S(ell(x,y,R,R,40),{rad:1,tone:[1,.82],col:MYEL,lw:2.6});for(let k=0;k<14;k++){const a=k/14*Math.PI*2;S.L([[x+Math.cos(a)*(R+10),y+Math.sin(a)*(R+10)],[x+Math.cos(a)*(R+(k%2?26:40)),y+Math.sin(a)*(R+(k%2?26:40))]],{lw:2.4,any:1});}S.G(x,y,R*2.4,'rgba(255,215,90,.9)',{a:.45});}
function waves(S,x0,x1,y,amp,seed,col='#5fb4e8'){S.g();const wv=[];for(let x=x0;x<=x1;x+=12)wv.push([x,y+Math.sin(x*.03+seed)*amp+Math.sin(x*.09+seed*2)*amp*.3]);S.S(wv.concat([[x1,H+10],[x0,H+10]]),{tone:[.9,.5],dir:1.5,col,cA:.75,lw:2.6});
  for(let k=0;k<Math.floor((x1-x0)/70);k++){const xx=x0+30+k*70,yy=y+Math.sin(xx*.03+seed)*amp;const c=[];for(let a=0;a<Math.PI*1.4;a+=.3)c.push([xx+Math.cos(a+Math.PI)*(3+a*5),yy-3+Math.sin(a+Math.PI)*(3+a*4)]);S.L(c,{lw:1.4});}}
function steamship(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T([[-200,-40],[210,-40],[180,0],[-170,0]]),{tone:[.6,.2],dir:1.5,col:'#2a2a30',lw:2.6});S.S(T([[-200,-40],[210,-40],[206,-30],[-196,-30]]),{tone:[.95,.6],col:MRED});
  S.S(T([[-130,-40],[120,-40],[120,-72],[-130,-72]]),{tone:[.98,.62],dir:1.5,col:'#f4f0e6'});for(let k=0;k<11;k++)S.L(T(ell(-112+k*22,-56,4,4,8)),{closed:1,lw:1.3});
  [[-60,-72,-150],[20,-72,-160]].forEach(([fx,b,tp])=>{S.S(T([[fx-14,b],[fx-12,tp],[fx+12,tp],[fx+14,b]]),{tone:[.9,.35],dir:0,col:'#d8a040'});S.S(T([[fx-13,tp],[fx+13,tp],[fx+13,tp+12],[fx-13,tp+12]]),{tone:[.5,.2],col:'#2a2a30'});});
  S.L(T([[150,-40],[150,-190]]),{lw:2.2}).L(T([[-170,-40],[-170,-170]]),{lw:2.2}).L(T([[-170,-170],[150,-190]]),{lw:1}).L(T([[150,-190],[210,-40]]),{lw:1});
  const r=rng(5);for(let k=0;k<6;k++)S.S(T(ell(-60+k*14+r()*6,-170-k*18,14+k*3,10+k*2,16)),{rad:1,tone:[.95,.62],col:'#cfcfd6',cA:.6,lw:1.4});}
function scroll(S,x,y,w,h,o={}){S.g();S.S(rect(x,y,w,h),{tone:[.99,.82],dir:1.5,col:o.col||'#f6eccf',lw:2.2});S.S(ell(x,y+h/2,12,h/2+6,20),{tone:[.9,.45],dir:0,col:'#d8c49a'});S.S(ell(x+w,y+h/2,12,h/2+6,20),{tone:[.9,.45],dir:0,col:'#d8c49a'});}
function palmleaf(S,x,y,w,h){S.g();S.S([[x,y+h*.2],[x+16,y],[x+w-16,y],[x+w,y+h*.2],[x+w,y+h*.8],[x+w-16,y+h],[x+16,y+h],[x,y+h*.8]],{tone:[.97,.72],dir:1.5,col:'#e3c98d',lw:2.4});for(let k=1;k<6;k++)S.L([[x+20,y+k*h/6],[x+w-20,y+k*h/6]],{lw:.7});S.S(ell(x+40,y+h/2,7,7,10),{tone:[.3,.2]});S.S(ell(x+w-40,y+h/2,7,7,10),{tone:[.3,.2]});}
function building(S,x,y,w,h){S.g();S.S(rect(x,y-h*.75,w,h*.75),{tone:[.98,.6],dir:0,col:'#f2e6cc'});const n=Math.round(w/44);for(let k=0;k<n;k++){const cx=x+22+k*(w-44)/(n-1);S.S(rect(cx-8,y-h*.72,16,h*.7),{tone:[.98,.4],dir:0,col:'#f8f0dc',lw:1.6});}
  S.S([[x-14,y-h*.75],[x+w+14,y-h*.75],[x+w/2,y-h]],{tone:[.96,.55],dir:1.3,col:'#f2e6cc'});S.S(rect(x-16,y-6,w+32,10),{tone:[.9,.5],dir:1.5,col:'#e0d2b4'});}
function gopuram(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();for(let k=0;k<6;k++){const w=120-k*16,b=-k*34;S.S(T([[-w/2,b],[w/2,b],[w/2-6,b-34],[-w/2+6,b-34]]),{tone:[.95,.45],dir:0,col:k%2?'#e8b46a':'#f0c47a',lw:1.8});for(let q=-w/2+12;q<w/2-8;q+=14)S.L(T([[q,b-6],[q,b-28]]),{lw:.8});}S.S(T([[-14,-204],[14,-204],[0,-230]]),{tone:[.9,.4],col:MBRZ});}
function church(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(rect(-50,-90,100,90)),{tone:[.97,.55],dir:0,col:'#e9e2d4'});S.S(T([[-58,-90],[58,-90],[0,-140]]),{tone:[.9,.45],dir:1,col:'#c56a4a'});S.S(T(rect(-14,-200,28,110)),{tone:[.97,.5],dir:0,col:'#e9e2d4'});S.S(T([[-18,-200],[18,-200],[0,-240]]),{tone:[.9,.4],col:'#c56a4a'});S.L(T([[0,-240],[0,-268]]),{lw:2.4}).L(T([[-10,-258],[10,-258]]),{lw:2.4});S.S(T(ell(0,-40,16,26,14,Math.PI,Math.PI*2).concat([[16,0],[-16,0]])),{tone:[.5,.25]});}
function mosque(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(rect(-70,-80,140,80)),{tone:[.98,.55],dir:0,col:'#eef0f4'});S.S(T(ell(0,-80,52,56,30,Math.PI,Math.PI*2)),{rad:1,tone:[.98,.5],col:'#7fc2a8'});S.L(T([[0,-136],[0,-156]]),{lw:2});[-82,82].forEach(mx=>{S.S(T(rect(mx-8,-170,16,170)),{tone:[.97,.5],dir:0,col:'#eef0f4'});S.S(T(ell(mx,-170,10,14,12,Math.PI,Math.PI*2)),{tone:[.9,.5],col:'#7fc2a8'});});S.S(T(ell(0,-30,16,26,14,Math.PI,Math.PI*2).concat([[16,0],[-16,0]])),{tone:[.5,.25]});}
function caaba(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T([[-60,0],[-60,-90],[0,-110],[0,-20]]),{tone:[.35,.15],dir:0,col:'#222226'});S.S(T([[0,-20],[0,-110],[70,-96],[70,-6]]),{tone:[.25,.1],dir:0,col:'#222226'});S.S(T([[-60,-70],[0,-90],[70,-76],[70,-66],[0,-80],[-60,-60]]),{tone:[.9,.6],col:MBRZ});}
function stupa(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(rect(-90,-20,180,20)),{tone:[.95,.55],dir:1.5,col:'#efe3c8'});S.S(T(ell(0,-20,76,76,30,Math.PI,Math.PI*2)),{rad:1,tone:[.99,.5],col:'#f5ecd8'});S.S(T(rect(-14,-120,28,24)),{tone:[.9,.45],dir:0,col:MBRZ});for(let k=0;k<5;k++)S.S(T(rect(-10+k*2,-140-k*12,20-k*4,8)),{tone:[.8,.4],col:MBRZ});}
function lingam(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(ell(0,0,90,22,30)),{tone:[.85,.35],dir:1.2,col:'#7a7a80'});S.S(T([[86,-4],[124,-10],[90,8]]),{tone:[.8,.4],col:'#7a7a80'});S.S(T([[-34,-4],[-34,-100]].concat(ell(0,-100,34,34,20,Math.PI,Math.PI*2)).concat([[34,-100],[34,-4]])),{tone:[.9,.3],dir:0,col:'#5a5a62'});for(let k=0;k<3;k++)S.L(T([[-26,-70+k*9],[26,-70+k*9]]),{lw:2.6,col:'#f4f4f0'});S.S(T(ell(0,-62,5,5,8)),{tone:[.4,.3],col:MRED});}
function trident(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.L(T([[0,0],[0,-220]]),{lw:3.4});S.S(T([[-40,-220],[-36,-260],[-30,-224],[-6,-222],[0,-280],[6,-222],[30,-224],[36,-260],[40,-220],[0,-206]]),{tone:[.9,.4],dir:0,col:'#b8b8c0',lw:2});S.S(T(ell(0,-180,14,10,14)),{tone:[.8,.4],col:'#c8762a'});}
function conch(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();const p=[];for(let a=0;a<Math.PI*3.2;a+=.2){const r=8+a*9;p.push([Math.cos(a)*r,Math.sin(a)*r*.8]);}S.S(T(ell(10,0,70,46,30)),{rad:1,tone:[1,.6],col:'#f4ebe0',lw:2.4});S.L(T(p),{lw:1.6});S.S(T([[60,-10],[110,0],[60,14]]),{tone:[.95,.6],col:'#f4ebe0'});}
function web(S,cx,cy,R){S.g();for(let k=0;k<10;k++){const a=k/10*Math.PI*2;S.L([[cx,cy],[cx+Math.cos(a)*R,cy+Math.sin(a)*R*.9]],{lw:1,any:1});}let sp=[];for(let a=0;a<Math.PI*2*5;a+=.2){const rr=4+a*R/32;sp.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.9]);}S.L(sp,{lw:.9,any:1});S.S(ell(cx+R*.2,cy+R*.15,7,9,12),{tone:[.3,.2]});}
function eagleStandard(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.L(T([[0,0],[0,-300]]),{lw:3.4});S.S(T(rect(-50,-200,100,60)),{tone:[.9,.35],dir:0,col:MRED});S.L(T([[-50,-200],[50,-200]]),{lw:3});
  S.S(T([[0,-312],[-20,-330],[-80,-372],[-58,-334],[-90,-326],[-30,-310],[0,-300],[30,-310],[90,-326],[58,-334],[80,-372],[20,-330]]),{tone:[.85,.3],dir:.5,col:MBRZ,lw:2.2});S.S(T(ell(0,-336,10,12,12)),{tone:[.8,.3],col:MBRZ});S.L(T([[-50,-196],[50,-196]]),{lw:1});}
function dynamo(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(rect(-160,-30,320,30)),{tone:[.85,.35],dir:1.5,col:'#5a5a62'});S.S(T(ell(-60,-120,90,90,40)),{rad:1,tone:[.95,.4],col:'#c8762a',lw:3});for(let k=0;k<12;k++){const a=k/12*Math.PI*2;S.L(T([[-60+Math.cos(a)*40,-120+Math.sin(a)*40],[-60+Math.cos(a)*86,-120+Math.sin(a)*86]]),{lw:1.4});}S.S(T(ell(-60,-120,24,24,20)),{tone:[.6,.25],col:'#3a3a40'});
  S.S(T(rect(40,-180,110,150)),{tone:[.95,.4],dir:0,col:'#b88a4a'});for(let k=0;k<13;k++)S.L(T([[40,-170+k*11],[150,-170+k*11]]),{lw:1.6});S.L(T(bz([150,-110],[210,-110],[220,-60],[260,-60],10)),{lw:3});}
function plough(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.L(T([[0,0],[120,-110]]),{lw:5});S.L(T([[110,-100],[140,-104]]),{lw:4});S.S(T([[-20,6],[24,-6],[10,14]]),{tone:[.6,.3],col:'#7a7a80'});}
function ox(S,x,y,s,fl=1){const T=p=>tf(p,x,y,s,fl);S.g();S.S(T([[-90,-60],[-80,-110],[40,-118],[80,-96],[90,-60],[60,-56],[-60,-56]]),{tone:[.95,.45],dir:1.2,col:'#e8e2d6',lw:2.4});
  [[-70,-60],[-44,-60],[40,-60],[66,-60]].forEach(([lx,ly])=>S.S(T([[lx-6,ly],[lx-6,ly+56],[lx+6,ly+56],[lx+6,ly]]),{tone:[.9,.5],dir:0,col:'#e8e2d6'}));
  S.S(T([[70,-104],[96,-130],[124,-116],[130,-86],[104,-80],[82,-90]]),{tone:[.95,.5],dir:.8,col:'#e8e2d6'});S.L(T([[98,-128],[92,-152],[86,-160]]),{lw:3}).L(T([[110,-128],[120,-150],[128,-156]]),{lw:3});S.S(T(ell(-30,-112,18,12,12)),{tone:[.9,.5],col:'#e8e2d6'});}
function newspaper(S,x,y,w,h,head,o={}){S.g();S.S(rot(rect(x,y,w,h),x+w/2,y+h/2,o.a||0),{tone:[.99,.8],dir:1.5,col:'#f4f1e8',lw:2});const r=rng(w|0);for(let k=0;k<7;k++){const yy=y+h*.38+k*h*.08;S.L(rot([[x+12,yy],[x+w-12-(r()*30),yy]],x+w/2,y+h/2,o.a||0),{lw:1.2});}S.T([[head,MINK]],x+w/2,y+h*.22,Math.min(30,w/head.length*1.6),{al:'center',rot:o.a||0});}
function crownX(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T([[-50,0],[-56,-60],[-28,-30],[0,-74],[28,-30],[56,-60],[50,0]]),{tone:[.95,.4],dir:.5,col:MYEL,lw:2.4});[-28,0,28].forEach(cx=>S.S(T(ell(cx,-14,7,7,10)),{tone:[.6,.3],col:MRED}));}
function cannon(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T([[-80,-40],[90,-74],[96,-56],[-74,-14]]),{tone:[.85,.25],dir:1.4,col:'#4a4a52'});S.S(T(ell(-30,-10,34,34,24)),{tone:[.9,.4],col:'#8a5a32'});for(let k=0;k<8;k++){const a=k/8*Math.PI*2;S.L(T([[-30,-10],[-30+Math.cos(a)*30,-10+Math.sin(a)*30]]),{lw:1.4});}}
function moneybag(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(ell(0,-50,50,50,30).slice(4,27).concat([[-14,-104],[14,-104]])),{rad:1,tone:[.95,.45],col:'#c9a24a',lw:2.4});S.T([['$',MINK]],x,y-40*s,40*s,{al:'center'});}
function tophat(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(rect(-30,-80,60,74)),{tone:[.5,.2],dir:0,col:'#2a2a30'});S.S(T(ell(0,-6,54,12,24)),{tone:[.45,.2],col:'#2a2a30'});S.S(T(rect(-30,-26,60,10)),{tone:[.8,.4],col:MRED});}
function spine(S,x,y,n,s=1){S.g();for(let k=0;k<n;k++){const yy=y+k*30*s,w=(30-Math.abs(k-n/2)*1.2)*s;S.S(ell(x,yy,w,11*s,18),{rad:1,tone:[1,.55],col:'#f2ead8',lw:2});S.L([[x-w,yy],[x-w-18*s,yy-8*s]],{lw:2}).L([[x+w,yy],[x+w+18*s,yy-8*s]],{lw:2});}}
function vase(S,x,y,s,crack){const T=p=>tf(p,x,y,s);S.g();S.S(T([[-30,0],[-60,-60],[-50,-130],[-24,-160],[-30,-190],[30,-190],[24,-160],[50,-130],[60,-60],[30,0]]),{rad:1,tone:[1,.55],col:'#e8f0fb',lw:2.6});S.L(T(bz([-46,-110],[-20,-90],[20,-90],[46,-110],10)),{lw:1.6,col:MBLU}).L(T(bz([-54,-60],[-20,-40],[20,-40],[54,-60],10)),{lw:1.6,col:MBLU});
  if(crack)S.L(T([[0,-190],[10,-150],[-8,-120],[14,-80],[-4,-40],[6,0]]),{lw:2.4});}
function hammer(S,x,y,s,a){const P=p=>rot(tf(p,x,y,s),x,y,a);S.g();S.S(P(rect(-8,0,16,200)),{tone:[.9,.45],dir:0,col:'#a87a4a'});S.S(P(rect(-60,-30,120,46)),{tone:[.8,.25],dir:1.4,col:'#6a6a72'});}
function clock(S,x,y,R){S.g();S.S(ell(x,y,R,R,36),{rad:1,tone:[1,.6],col:'#f4f0e6',lw:2.6});for(let k=0;k<12;k++){const a=k/12*Math.PI*2;S.L([[x+Math.cos(a)*R*.82,y+Math.sin(a)*R*.82],[x+Math.cos(a)*R*.94,y+Math.sin(a)*R*.94]],{lw:1.6});}S.L([[x,y],[x+R*.5,y-R*.2]],{lw:2.6}).L([[x,y],[x-R*.1,y-R*.7]],{lw:2});}
function wheel(S,x,y,R,labels){S.g();S.S(ell(x,y,R,R,48),{rad:1,tone:[.98,.5],col:'#e8c88a',lw:3});S.S(ell(x,y,R*.78,R*.78,40),{tone:[.99,.8],col:'#f6ead0',lw:2});for(let k=0;k<8;k++){const a=k/8*Math.PI*2;S.L([[x+Math.cos(a)*R*.18,y+Math.sin(a)*R*.18],[x+Math.cos(a)*R*.78,y+Math.sin(a)*R*.78]],{lw:2.2});}S.S(ell(x,y,R*.18,R*.18,20),{tone:[.8,.4],col:MBRZ});
  (labels||[]).forEach((l,k)=>{const a=-Math.PI/2+k/labels.length*Math.PI*2;S.T([[l,MINK]],x+Math.cos(a)*R*1.22,y+Math.sin(a)*R*1.22+8,22,{al:'center',font:'"Tiro Devanagari Sanskrit",serif'});});}
function rose(S,x,y,s,col=MRED){const T=p=>tf(p,x,y,s);S.g();S.L(T(bz([0,0],[4,30],[-4,60],[0,90],8)),{lw:2.2,col:'#2a7a3a'});S.S(T([[0,40],[24,30],[30,44],[8,48]]),{tone:[.9,.5],col:MGRN});for(let k=0;k<5;k++){const a=k/5*Math.PI*2;S.S(T(ell(Math.cos(a)*10,Math.sin(a)*8-10,14,11,14)),{rad:1,tone:[.98,.45],col,lw:1.6});}S.S(T(ell(0,-10,9,8,12)),{tone:[.9,.4],col});}
function figureLabel(S,x,y,str,size=22,col=MINK){S.T([[str.toUpperCase(),col]],x,y,size,{al:'center',rot:-.01});}
function arrowL(S,a,b,o={}){const pts=bz(a,[lerp(a[0],b[0],.3),Math.min(a[1],b[1])-(o.lift??60)],[lerp(a[0],b[0],.7),Math.min(a[1],b[1])-(o.lift??60)],b,16);S.L(pts,{lw:o.lw||3,any:1,col:o.col});const e=pts[pts.length-1],f=pts[pts.length-3],an=Math.atan2(e[1]-f[1],e[0]-f[0]);S.L([[e[0]-16*Math.cos(an-.5),e[1]-16*Math.sin(an-.5)],e,[e[0]-16*Math.cos(an+.5),e[1]-16*Math.sin(an+.5)]],{lw:o.lw||3,any:1,col:o.col});}
function strikeL(S,x,y,w,col=MRED){S.L([[x-6,y+4],[x+w+6,y-6]],{lw:4,any:1,col});}
function rays(S,x,y,r0,r1,n,o={}){S.g();for(let k=0;k<n;k++){const a=(o.a0??-Math.PI)+k/(n-1)*((o.a1??0)-(o.a0??-Math.PI));S.L([[x+Math.cos(a)*r0,y+Math.sin(a)*r0],[x+Math.cos(a)*r1,y+Math.sin(a)*r1*(o.sy||1)]],{lw:o.lw||1.4,any:1});}}
function rainbow(S,x,y,R,a=.32){[MYEL,MSAF,MPNK,MPUR,MBLU,MCYN,MGRN].forEach((cl,k)=>S.G(x,y,R-k*R*.11,cl,{a,sx:1.5}));}
function flowerOfLife(S,cx,cy,r){S.g();for(let k=0;k<7;k++){const a=k/6*Math.PI*2,ox=k?Math.cos(a)*r:0,oy=k?Math.sin(a)*r:0;S.L(ell(cx+ox,cy+oy,r,r,24),{closed:1,lw:1.2,any:1});}}
function tears(S,x,y,s){S.g();for(let k=0;k<3;k++){const yy=y+k*22*s;S.S(tf([[0,-10],[7,4],[0,10],[-7,4]],x+(k%2)*8*s,yy,s),{tone:[.95,.6],col:MCYN,lw:1.4});}}
function hill(S,x0,x1,y,h,col='#b9d98a'){S.g();const p=[[x0,y]];for(let k=0;k<=20;k++){const f=k/20;p.push([lerp(x0,x1,f),y-Math.sin(f*Math.PI)*h]);}p.push([x1,y]);S.S(p,{tone:[.97,.62],dir:1.5,col,cA:.7,lw:2.4});}
function ground(S,y,col='#c9b48a',seed=1){S.g();const r=rng(seed);const p=[[0,y]];for(let x=0;x<=W;x+=40)p.push([x,y+(r()-.5)*8]);p.push([W,H+10],[0,H+10]);S.S(p,{tone:[.92,.58],dir:1.5,col,cA:.6,lw:2.6});}

/* ===== PAINTED STYLES (no hatching) =====
   Objects are painted one after another: a quick ink outline, then the colour floods in with a varied reveal
   (sweep, bloom, drop), then the detail lines. MSTYLE: 'flat' | 'gouache' | 'water' | 'hatch' (legacy). */
let MSTYLE='water';
let PAPER_TEX=null;
function paperTex(){if(!PAPER_TEX){const cv=mkc(W,H),g=cv.getContext('2d');const r=rng(42);g.fillStyle='#fbf9f3';g.fillRect(0,0,W,H);for(let i=0;i<5200;i++){const v=r();g.fillStyle=`rgba(${v<.5?120:255},${v<.5?110:255},${v<.5?95:250},${.05+r()*.05})`;g.fillRect(r()*W,r()*H,1+r()*2,1+r()*2);}for(let i=0;i<14;i++){const x=r()*W,y=r()*H,rr=60+r()*160;const gr=g.createRadialGradient(x,y,1,x,y,rr);gr.addColorStop(0,'rgba(200,180,150,.05)');gr.addColorStop(1,'rgba(200,180,150,0)');g.fillStyle=gr;g.fillRect(x-rr,y-rr,2*rr,2*rr);}PAPER_TEX=cv;}return PAPER_TEX;}
const NEUTRAL=t=>{const v=Math.round(lerp(150,246,t));return`rgb(${v},${Math.round(v*.97)},${Math.round(v*.92)})`;};
function hexRGB(h){if(h.startsWith('rgb')){const m=h.match(/[\d.]+/g).map(Number);return m.slice(0,3);}const s=h.length===4?h.replace(/#(.)(.)(.)/,'#$1$1$2$2$3$3'):h;return[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));}
const shade=(h,k)=>{const c=hexRGB(h).map(v=>Math.round(k>0?v+(255-v)*k:v*(1+k)));return`rgb(${c[0]},${c[1]},${c[2]})`;};
function compilePaint(sc,seed){
  const shapes=sc.items.filter(i=>i.k==='S');const ic=mkc(W,H),ig=ic.getContext('2d',{willReadFrequently:true});ig.fillStyle='#000';ig.fillRect(0,0,W,H);
  for(const s of shapes){const id=s.idx+1;ig.fillStyle=`rgb(${id&255},${(id>>8)&255},0)`;mpath(ig,s.pts);ig.fill();}
  const idd=ig.getImageData(0,0,W,H).data;const idAt=(x,y)=>{x|=0;y|=0;if(x<0||y<0||x>=W||y>=H)return 0;const p=(y*W+x)*4;return idd[p]+(idd[p+1]<<8);};
  const vis=(x,y,lim)=>{for(let dy=-2;dy<=2;dy+=2)for(let dx=-2;dx<=2;dx+=2)if(idAt(x+dx,y+dy)<=lim)return true;return false;};
  const runs=(pts,lim,any)=>{const out=[];let cur=[];for(const p of pts){if(any||vis(p[0],p[1],lim))cur.push(p);else{if(cur.length>2)out.push(cur);cur=[];}}if(cur.length>2)out.push(cur);return out;};
  const byObj={};const add=(o,op)=>(byObj[o]=byObj[o]||[]).push(op);let sd=seed*31;const r=rng(seed*7+3);
  sc.items.forEach(it=>{
    if(it.k==='S'){const[x0,y0,x1,y1]=bbox(it.pts);if(!(it.tone[0]===1&&it.tone[1]===1&&!it.col))add(it.obj,{k:'P',s:it,bb:[x0,y0,x1,y1],rev:MSTYLE==='water'?(r()<.6?1:Math.floor(r()*3)):Math.floor(r()*3),len:Math.sqrt((x1-x0)*(y1-y0))*.9+20,ord:0});
      if(!it.noline)runs(subdiv(it.pts.concat([it.pts[0]]),3),it.idx+1).forEach(rn=>{const w=wob(rn,sd++,.9);add(it.obj,{k:'L',pts:w,lw:Math.min(it.lw,2.4),len:plen(w)*.55,ord:-1});});}
    else if(it.k==='L')runs(subdiv(it.closed?it.pts.concat([it.pts[0]]):it.pts,3),it.layer+1,it.any).forEach(rn=>{const w=wob(rn,sd++,.7);add(it.obj,{k:'L',pts:w,lw:it.lw,len:plen(w)*.55,col:it.col,ord:1});});
    else if(it.k==='T')add(it.obj,{k:'T',it,len:it.segs.reduce((a,q)=>a+q[0].length,0)*12,ord:2});
    else if(it.k==='G')add(it.obj,{k:'G',it,len:it.r*.4,ord:0});
    else if(it.k==='A'){const a=it.a,T=p=>tf(flat(p),it.x,it.y,it.s);
      if(!it.mono){const op=T(a.outline);const[ox0,oy0,ox1,oy1]=bbox(op);add(it.obj,{k:'P',s:{pts:op,col:it.base||'#cf9c78',soft:1},bb:[ox0,oy0,ox1,oy1],rev:2,len:60,ord:-2});}
      if(!it.mono)a.colour.forEach(cr=>cr.poly.forEach(pl=>{const pts=T(pl);const[x0,y0,x1,y1]=bbox(pts);add(it.obj,{k:'P',s:{pts,col:it.tint||cr.col,tone:[.9,.6],dir:.8,rad:0,soft:1},bb:[x0,y0,x1,y1],rev:1,len:Math.sqrt((x1-x0)*(y1-y0))*.5+10,ord:0});}));
      if(a.tone){const op=T(a.outline);add(it.obj,{k:'M',a,x:it.x,y:it.y,s:it.s,poly:op,mono:it.mono,len:40,ord:-.5});}
      a.contour.forEach(cn=>{const p=T(cn);add(it.obj,{k:'L',pts:p,lw:Math.max(1.1,1.8*it.s),len:plen(p)*.35,ord:1});});
      if(it.mono&&!a.tone){const hs=a.hatch.filter(h=>h[0]>=2);hs.forEach(h=>{const pts=[[it.x+h[1]*it.s,it.y+h[2]*it.s],[it.x+h[3]*it.s,it.y+h[4]*it.s]];add(it.obj,{k:'L',pts,lw:.9,len:plen(pts)*.15,ord:1});});}}});
  const ops=[];Object.keys(byObj).map(Number).sort((a,b)=>a-b).forEach(o=>{const L=byObj[o];L.sort((a,b)=>a.ord-b.ord);ops.push(...L);});
  let tot=ops.reduce((a,o)=>a+o.len,0)||1,acc=0;ops.forEach(o=>{o.t0=acc/tot;acc+=o.len;o.t1=acc/tot;});
  return{paint:true,ops,cache:{}};}
function paintFill(c,o,k,style){const s=o.s,[x0,y0,x1,y1]=o.bb,cx=(x0+x1)/2,cy=(y0+y1)/2,R=Math.max(x1-x0,y1-y0)/2+2;
  const col=s.col||NEUTRAL(s.tone?(s.tone[0]+s.tone[1])/2:.8);
  c.save();mpath(c,s.pts);c.clip();
  if(k<1){c.beginPath();const e=eio(k);if(o.rev===0){const a=(s.dir??.8)+Math.PI,ux=Math.cos(a),uy=Math.sin(a);const d=lerp(-R,R,e);c.moveTo(cx-ux*R*2+(-uy)*R*2,cy-uy*R*2+ux*R*2);c.lineTo(cx-ux*R*2-(-uy)*R*2,cy-uy*R*2-ux*R*2);c.lineTo(cx+ux*d-(-uy)*R*2,cy+uy*d-ux*R*2);c.lineTo(cx+ux*d+(-uy)*R*2,cy+uy*d+ux*R*2);c.closePath();}
    else if(o.rev===1){c.arc(cx,cy,R*1.5*e,0,7);}else{c.rect(x0-4,y0-4,x1-x0+8,(y1-y0+8)*e);}c.clip();}
  const ux=Math.cos(s.dir??.8),uy=Math.sin(s.dir??.8);
  if(s.soft){c.fillStyle=col;c.globalAlpha=.95;c.fillRect(x0-2,y0-2,x1-x0+4,y1-y0+4);c.globalAlpha=1;}
  else if(style==='flat'){c.fillStyle=col;c.fillRect(x0-2,y0-2,x1-x0+4,y1-y0+4);const g=c.createLinearGradient(cx-ux*R,cy-uy*R,cx+ux*R,cy+uy*R);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.55,'rgba(0,0,0,0)');g.addColorStop(.56,'rgba(0,0,0,.14)');g.addColorStop(1,'rgba(0,0,0,.2)');c.fillStyle=g;c.fillRect(x0-2,y0-2,x1-x0+4,y1-y0+4);}
  else if(style==='gouache'){let g;if(s.rad)g=c.createRadialGradient(cx-R*.35,cy-R*.4,R*.05,cx,cy,R*1.05);else g=c.createLinearGradient(cx-ux*R,cy-uy*R,cx+ux*R,cy+uy*R);g.addColorStop(0,shade(col,.45));g.addColorStop(.45,col);g.addColorStop(1,shade(col,-.32));c.fillStyle=g;c.fillRect(x0-2,y0-2,x1-x0+4,y1-y0+4);
    c.globalAlpha=.5;c.strokeStyle=shade(col,-.4);c.lineWidth=6;mpath(c,s.pts);c.stroke();c.globalAlpha=1;
    const rr=rng((x0*7+y0*13)|0);c.globalAlpha=.16;c.strokeStyle='#ffffff';c.lineWidth=2;for(let q=0;q<Math.min(8,(x1-x0)/14);q++){const px=lerp(x0,x1,rr()),py=lerp(y0,y1,rr()*.6);c.beginPath();c.moveTo(px,py);c.lineTo(px+10+rr()*14,py-4-rr()*6);c.stroke();}c.globalAlpha=1;}
  else{const rr=rng((x0*7+y0*13)|0);const g=c.createLinearGradient(cx-ux*R,cy-uy*R,cx+ux*R,cy+uy*R);g.addColorStop(0,shade(col,.35));g.addColorStop(1,shade(col,-.12));
    for(let q=0;q<4;q++){c.globalAlpha=q===0?.55:.24;c.fillStyle=q===0?g:(q===3?shade(col,-.2):col);c.beginPath();const p=s.pts;const jx=(rr()-.5)*7,jy=(rr()-.5)*7;c.moveTo(p[0][0]+jx,p[0][1]+jy);for(let i=1;i<p.length;i++)c.lineTo(p[i][0]+jx+(rr()-.5)*5,p[i][1]+jy+(rr()-.5)*5);c.closePath();c.fill();}
    c.globalAlpha=.42;c.strokeStyle=shade(col,-.3);c.lineWidth=4;c.filter='blur(1px)';mpath(c,s.pts);c.stroke();c.filter='none';c.globalAlpha=.25;c.fillStyle='#ffffff';for(let q=0;q<3;q++){c.beginPath();c.ellipse(lerp(x0,x1,.25+rr()*.5),lerp(y0,y1,.2+rr()*.4),(x1-x0)*.12,(y1-y0)*.06,rr()*3,0,7);c.fill();}
    c.globalAlpha=.14;c.fillStyle=shade(col,-.55);for(let q=0;q<Math.min(90,(x1-x0)*(y1-y0)/400);q++)c.fillRect(lerp(x0,x1,rr()),lerp(y0,y1,rr()),1.6,1.6);c.globalAlpha=1;}
  c.restore();}
const TONEC=new Map();
function toneCanvas(a){if(!TONEC.has(a)){const t=a.tone,bin=atob(t.b64),cv=mkc(t.w,t.h),g=cv.getContext('2d'),im=g.createImageData(t.w,t.h);for(let i=0;i<t.w*t.h;i++){const v=bin.charCodeAt(i);im.data[i*4]=v;im.data[i*4+1]=v;im.data[i*4+2]=v;im.data[i*4+3]=255;}g.putImageData(im,0,0);TONEC.set(a,cv);}return TONEC.get(a);}
function toneOverlay(c,o,k){c.save();mpath(c,o.poly);c.clip();c.globalAlpha=k*(o.mono?1:.85);c.globalCompositeOperation=o.mono?'source-over':'multiply';c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.drawImage(toneCanvas(o.a),o.x,o.y,o.a.w*o.s,o.a.h*o.s);c.restore();}
function drawPaint(c,P,p,style){c.save();c.lineCap='round';c.lineJoin='round';
  for(const o of P.ops){if(p<=o.t0)break;const k=p>=o.t1?1:(p-o.t0)/(o.t1-o.t0);
    if(o.k==='P')paintFill(c,o,k,style);
    else if(o.k==='M')toneOverlay(c,o,k);
    else if(o.k==='G'){const it=o.it;c.save();c.globalAlpha=it.a*k;c.translate(it.x,it.y);c.scale(it.sx,1);const g=c.createRadialGradient(0,0,2,0,0,it.r);g.addColorStop(0,it.col);g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.beginPath();c.arc(0,0,it.r,0,7);c.fill();c.restore();}}
  for(const o of P.ops){if(p<=o.t0)break;const k=p>=o.t1?1:(p-o.t0)/(o.t1-o.t0);
    if(o.k==='L'){c.strokeStyle=o.col||MINK;c.lineWidth=style==='water'?o.lw*.8:o.lw;c.beginPath();partial(c,o.pts,k);c.stroke();}else if(o.k==='T')textOp(c,o.it,k);}
  c.restore();}

/* ----- more library objects (painted-style scenes) ----- */
function lighthouse(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(ell(0,0,70,22,20,Math.PI,Math.PI*2).concat([[70,10],[-70,10]])),{tone:[.8,.4],col:'#8a8a92',lw:2});S.S(T([[-26,0],[-16,-180],[16,-180],[26,0]]),{tone:[.98,.6],dir:0,col:'#f4f0e6'});for(let k=0;k<3;k++)S.S(T([[-25+k*3.3,-30-k*55],[25-k*3.3,-30-k*55],[24-k*3.3,-52-k*55],[-24+k*3.3,-52-k*55]]),{tone:[.9,.5],dir:0,col:MRED});
  S.S(T(rect(-20,-212,40,32)),{tone:[1,.8],col:MYEL});S.S(T([[-26,-212],[26,-212],[0,-236]]),{tone:[.8,.4],col:MRED});S.G(x,y-196*s,90*s,'rgba(255,220,100,.95)',{a:.6,sx:1.8});}
function canoe(S,x,y,s,col=MBROWN){const T=p=>tf(p,x,y,s);S.g();S.S(T([[-70,-6],[70,-6],[56,10],[-56,10]]),{tone:[.85,.4],dir:1.5,col});S.L(T([[-30,-6],[-30,-26],[40,-26],[40,-6]]),{lw:1.6});S.S(T(rect(-40,-30,90,6)),{tone:[.8,.4],col:'#c8a46a'});S.L(T([[0,-6],[0,-90]]),{lw:2});S.S(T([[2,-88],[2,-14],[50,-20]]),{tone:[.98,.7],col:'#f4ead8'});person(S,x-34*s,y-4*s,.28*s,{head:'turban',col:'#f4efe4'});}
function hut(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(rect(-60,-70,120,70)),{tone:[.95,.5],dir:0,col:'#d9b98a'});S.S(T([[-80,-66],[0,-140],[80,-66]]),{tone:[.92,.45],dir:1.2,col:'#c8a04a'});for(let k=-60;k<=60;k+=12)S.L(T([[k*.9,-74],[0,-136]]),{lw:.9});S.S(T(rect(-14,-46,28,46)),{tone:[.5,.25],col:'#6a4a2a'});}
function bunting(S,x0,x1,y,sag,seed){S.g();const pts=[];for(let k=0;k<=20;k++){const f=k/20;pts.push([lerp(x0,x1,f),y+Math.sin(f*Math.PI)*sag]);}S.L(pts,{lw:1.6,any:1});const cols=[MRED,MYEL,MGRN,MSAF,MBLU,MPNK];for(let k=1;k<20;k+=1.5){const f=k/20,px=lerp(x0,x1,f),py=y+Math.sin(f*Math.PI)*sag;S.S([[px-9,py],[px+9,py],[px,py+20]],{tone:[.95,.6],col:cols[Math.floor(k+seed)%cols.length],lw:1.2});}}
function garland(S,x,y,w,col=MSAF){S.g();for(let k=0;k<=12;k++){const f=k/12,px=x+(f-.5)*w,py=y+Math.sin(f*Math.PI)*w*.45;S.S(ell(px,py,7,7,10),{rad:1,tone:[1,.6],col:k%3?col:MRED,lw:1.2});}}
function arch(S,x,y,w,h,label){S.g();S.S(rect(x,y-h,22,h),{tone:[.95,.5],dir:0,col:'#3aa64a'});S.S(rect(x+w-22,y-h,22,h),{tone:[.95,.5],dir:0,col:'#3aa64a'});S.S([[x-10,y-h],[x+w+10,y-h],[x+w+10,y-h-50],[x-10,y-h-50]],{tone:[.98,.7],dir:1.5,col:'#fff1c8'});
  for(let k=0;k<6;k++){const px=x+20+k*(w-40)/5;S.S(tf(ell(0,0,10,24,14),px,y-h+30,1),{tone:[.9,.5],col:MGRN,lw:1});}if(label)S.T([[label,MRED]],x+w/2,y-h-14,30,{al:'center',rot:0});}
function trumpet(S,x,y,s,a=0){const P=p=>rot(tf(p,x,y,s),x,y,a);S.g();S.S(P([[0,-4],[90,-6],[120,-26],[120,26],[90,6],[0,4]]),{tone:[.95,.4],dir:1.5,col:MBRZ,lw:1.8});}
function dove(S,x,y,s,fl=1){const T=p=>tf(p,x,y,s,fl);S.g();S.S(T([[-30,0],[-4,-10],[20,-8],[34,-16],[30,-4],[20,4],[-10,8]]),{rad:1,tone:[1,.75],col:'#ffffff',lw:1.8});S.S(T([[-6,-6],[10,-40],[20,-36],[8,-4]]),{tone:[1,.7],col:'#f4f8ff',lw:1.6});S.S(T([[30,-14],[40,-12],[30,-9]]),{tone:[.8,.4],col:MSAF});S.L(T([[24,-14],[25,-13]]),{lw:2.2});}
function sage(S,x,y,s,col='#f2ead8'){person(S,x,y,s,{head:'beard',col,arms:'hold'});const T=p=>tf(p,x,y,s);S.S(T(rect(-26,-128,52,20)),{tone:[.98,.75],col:'#f6eccf',lw:1.6});S.S(T(ell(-26,-118,5,12,10)),{tone:[.9,.5],col:'#d8c49a'});S.S(T(ell(26,-118,5,12,10)),{tone:[.9,.5],col:'#d8c49a'});}
function pot(S,x,y,s,col='#c8762a'){const T=p=>tf(p,x,y,s);S.g();S.S(T(ell(0,-20,22,22,20).slice(3,18).concat([[8,-42],[-8,-42]])),{rad:1,tone:[.95,.4],col,lw:1.8});S.S(T(rect(-9,-48,18,8)),{tone:[.8,.4],col});}
function well(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(rect(-50,-40,100,40)),{tone:[.95,.5],dir:0,col:'#b9a88a'});for(let k=0;k<4;k++)S.L(T([[-50,-30+k*10],[50,-30+k*10]]),{lw:.8});S.S(T(ell(0,-40,50,10,20)),{tone:[.5,.3],col:'#4a6a8a'});S.L(T([[-44,-40],[-44,-110]]),{lw:3}).L(T([[44,-40],[44,-110]]),{lw:3}).L(T([[-52,-110],[52,-110]]),{lw:3}).L(T([[0,-110],[0,-60]]),{lw:1.4});S.S(T(rect(-8,-62,16,14)),{tone:[.8,.4],col:MBROWN});}
function paddy(S,x0,x1,y0,y1,seed){S.g();S.S([[x0,y0],[x1,y0],[x1,y1],[x0,y1]],{tone:[.95,.6],dir:1.5,col:'#a6d86a',cA:.85,noline:1});const r=rng(seed);for(let row=0;row<6;row++){const yy=lerp(y0+8,y1-6,row/5);for(let x=x0+10;x<x1-6;x+=16+row*2)S.L([[x,yy],[x-3,yy-8-row],[x+1,yy],[x+5,yy-7-row]],{lw:1.1,col:'#2a7a3a',any:1});}}
function colonial(S,x,y,w,h,col='#f2e2c4'){S.g();S.S(rect(x,y-h,w,h),{tone:[.97,.55],dir:0,col});S.S(rect(x-6,y-h-10,w+12,12),{tone:[.9,.5],dir:1.5,col:shade(col,-.15)});const n=Math.max(2,Math.floor(w/26));for(let r=0;r<2;r++)for(let k=0;k<n;k++){const wx=x+10+k*(w-20)/n;S.S(rect(wx,y-h+14+r*h*.45,12,h*.28),{tone:[.7,.4],col:'#6a8aa8'});}}
function mountains(S,x0,x1,y,h,seed,col='#9ab0c8'){const r=rng(seed);S.g();const n=5;for(let k=0;k<n;k++){const cx=lerp(x0,x1,(k+.5)/n),hh=h*(.6+r()*.4),w=(x1-x0)/n*1.1;S.S([[cx-w*.75,y],[cx,y-hh],[cx+w*.75,y]],{tone:[.97,.5],dir:.5,col,lw:2});S.S([[cx-hh*.18,y-hh*.78],[cx,y-hh],[cx+hh*.18,y-hh*.78],[cx+4,y-hh*.84],[cx-6,y-hh*.8]],{tone:[1,.9],col:'#ffffff',lw:1.2});}}
function fire(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();S.S(T(bz([-30,0],[-40,-40],[-10,-50],[-6,-90],10).concat(bz([-6,-90],[10,-60],[30,-50],[30,0],10))),{tone:[1,.6],col:MSAF,lw:1.8});S.S(T(bz([-14,0],[-18,-24],[-2,-30],[0,-54],8).concat(bz([0,-54],[8,-34],[16,-24],[14,0],8))),{tone:[1,.8],col:MYEL,lw:1.4});S.G(x,y-40*s,70*s,'rgba(255,140,40,.9)',{a:.45});}
function lotus(S,x,y,s){const T=p=>tf(p,x,y,s);S.g();for(let k=-3;k<=3;k++){const a=k*.32;S.S(rot(T([[0,0],[-14,-30],[0,-62],[14,-30]]),x,y,a),{rad:1,tone:[1,.6],col:MPNK,lw:1.4});}S.S(T(ell(0,4,44,10,20)),{tone:[.9,.5],col:MGRN,lw:1.4});}

/* ----- composite clusters for dense scenes ----- */
function skyset(S,seed,o={}){const r=rng(seed);if(o.sun!==false){const sx=o.sx??(700+r()*200),sy=o.sy??(70+r()*40);wash(S,sx,sy,170,'rgba(255,214,120,.9)',.35);sun(S,sx,sy,o.sr||30);}
  const nc=o.clouds??2;for(let k=0;k<nc;k++)cloud(S,(o.cx0??80)+k*((o.cx1??700)-(o.cx0??80))/Math.max(1,nc-1)+r()*40,o.cy??(60+r()*50),110+r()*80,seed+k);
  const nb=o.birds??5;S.g();for(let k=0;k<nb;k++)bird(S,(o.bx??300)+k*38+r()*20,(o.by??110)+r()*40,.8+r()*.5);}
function village(S,x0,x1,y,seed,o={}){const r=rng(seed);const n=Math.max(2,Math.round((x1-x0)/150));for(let k=0;k<n;k++){const x=lerp(x0,x1,(k+.5)/n)+(r()-.5)*30;if(k%3===2)palm(S,x,y,.5+r()*.25,(r()-.5)*.4);else hut(S,x,y,.38+r()*.15);}
  if(o.people!==false)for(let k=0;k<Math.max(1,n-1);k++){const x=lerp(x0,x1,(k+1)/n);person(S,x,y+30,.3,{head:k%2?'veil':'turban',col:[MPNK,MSAF,MPUR,MGRN][k%4],arms:k%2?'hold':'down'});if(k%2)pot(S,x,y-30,.4);}}
function harbour(S,x0,x1,y,seed){const r=rng(seed);let x=x0;while(x<x1-60){const w=60+r()*60,h=50+r()*50;colonial(S,x,y,w,h,['#f2e2c4','#f0d0b0','#e8dcc8','#f4e8d0'][Math.floor(r()*4)]);x+=w+10;}}
function battlefield(S,x0,x1,y,seed){const r=rng(seed);dust(S,(x0+x1)/2,y-10,x1-x0,90,seed);const n=Math.max(3,Math.round((x1-x0)/90));for(let k=0;k<n;k++)hoplite(S,lerp(x0,x1,(k+.5)/n),y+(k%2)*14,.42+r()*.1);}
function templeTown(S,x0,x1,y,seed){const r=rng(seed);gopuram(S,(x0+x1)/2,y,.45+r()*.15);hut(S,x0+40,y,.35);hut(S,x1-40,y,.32);palm(S,x0+90,y,.45,.1);palm(S,x1-90,y,.42,-.15);}
function flowers(S,x0,x1,y,n,seed){const r=rng(seed);for(let k=0;k<n;k++){const x=lerp(x0,x1,(k+.5)/n)+(r()-.5)*20;if(k%2)lotus(S,x,y+r()*10,.35+r()*.15);else rose(S,x,y-30*r(),.45+r()*.2,[MRED,MPNK,MSAF,MYEL][k%4]);}}
function book(S,x,y,s,col=MRED){const T=p=>tf(p,x,y,s);S.g();S.S(T([[-40,0],[0,-8],[40,0],[40,-50],[0,-58],[-40,-50]]),{tone:[.98,.6],dir:0,col:'#f6eccf',lw:1.6});S.L(T([[0,-8],[0,-58]]),{lw:1.4});S.S(T([[-44,4],[0,-4],[44,4],[44,10],[0,2],[-44,10]]),{tone:[.8,.4],col});}
function coin(S,x,y,r){S.g();S.S(ell(x,y,r,r,18),{rad:1,tone:[1,.6],col:MYEL,lw:1.4});S.L(ell(x,y,r*.65,r*.65,14),{closed:1,lw:.9});}
function star(S,x,y,r,col=MYEL){S.g();const p=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.45:r;p.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}S.S(p,{tone:[1,.7],col,lw:1.4});}
function flag(S,x,y,s,col=MSAF){const T=p=>tf(p,x,y,s);S.g();S.L(T([[0,0],[0,-120]]),{lw:2.4});S.S(T([[0,-120],[60,-104],[0,-88]]),{tone:[.95,.55],col,lw:1.6});}
function crowdRows(S,x0,x1,y,s,seed,o={}){crowd(S,x0+20,x1-20,y-50*s,s*.8,seed+7,{n:Math.round((x1-x0)/(52*s)),arms:o.arms});crowd(S,x0,x1,y,s,seed,{n:Math.round((x1-x0)/(58*s)),arms:o.arms});}
