const W=960,H=540;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const seg=(t,a,b)=>clamp((t-a)/(b-a));
const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
const lerp=(a,b,k)=>a+(b-a)*k;
const P=(t,B,i,d=1,o=0)=>ease(seg(t,B[i]+o,B[i]+o+d));
function hexm(a,b,k){const p=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));const x=p(a),y=p(b);return'rgb('+x.map((v,i)=>Math.round(lerp(v,y[i],k))).join(',')+')';}
const STY={kalighat:['Kalighat pat','#c94a32'],papercut:['Paper-cut','#3aa59a'],lantern:['Magic lantern','#e2b04a'],percept:['Perception lab','#d6cfbf'],plate:['Scientific plate','#6f9bd1'],palmleaf:['Palm leaf','#c07a3a'],chart:["Ship's chart",'#9a8ad6']};
const INK='#2a1a10';
const ARAB='Amiri,serif';
const MONO='"JetBrains Mono",monospace',DISP='"Cormorant Garamond",Georgia,serif',DEV='"Tiro Devanagari Sanskrit",serif',BODY='"Atkinson Hyperlegible",sans-serif';
function txt(c,s,x,y,font,col,al='left',a=1){if(a<=0)return;c.save();c.globalAlpha*=a;c.font=font;c.fillStyle=col;c.textAlign=al;c.fillText(s,x,y);c.restore();}
function heading(c,n,title,style,dark,a=1){txt(c,`${String(n).padStart(2,'0')} · ${STY[style][0].toUpperCase()}`,36,42,`600 11px ${MONO}`,dark?'#e0904a':'#a8382a','left',a);txt(c,title,36,74,`600 30px ${DISP}`,dark?'#f1e8d6':INK,'left',a);}
function fig(c,s,src,dark){txt(c,s,36,H-14,`11px ${MONO}`,dark?'#8fb3d9':'#6b5434');if(src)txt(c,src,W-36,H-14,`11px ${MONO}`,dark?'#6f829c':'#8a7456','right');}

/* ---------- backgrounds ---------- */
let PAPER,LEAFC,NOISE;
function paper(c){if(!PAPER){PAPER=document.createElement('canvas');PAPER.width=W;PAPER.height=H;const p=PAPER.getContext('2d');p.fillStyle='#f1e7d0';p.fillRect(0,0,W,H);
  let r=7;const rnd=()=>{r=(r*16807)%2147483647;return r/2147483647;};
  for(let i=0;i<16;i++){p.fillStyle=`rgba(170,120,60,${rnd()*.06})`;p.beginPath();p.ellipse(rnd()*W,rnd()*H,40+rnd()*120,30+rnd()*80,0,0,7);p.fill();}
  for(let i=0;i<1200;i++){p.fillStyle='rgba(120,90,50,.08)';p.fillRect(rnd()*W,rnd()*H,1,1);}}
  c.drawImage(PAPER,0,0);}
function grid(c,light){c.fillStyle=light?'#f3efe6':'#0f1420';c.fillRect(0,0,W,H);
  for(let x=0;x<=W;x+=24){c.strokeStyle=light?(x%120?'rgba(30,30,30,.05)':'rgba(30,30,30,.11)'):(x%120?'rgba(120,160,210,.07)':'rgba(120,160,210,.16)');c.lineWidth=1;c.beginPath();c.moveTo(x+.5,0);c.lineTo(x+.5,H);c.stroke();}
  for(let y=0;y<=H;y+=24){c.strokeStyle=light?(y%120?'rgba(30,30,30,.05)':'rgba(30,30,30,.11)'):(y%120?'rgba(120,160,210,.07)':'rgba(120,160,210,.16)');c.beginPath();c.moveTo(0,y+.5);c.lineTo(W,y+.5);c.stroke();}
  c.strokeStyle=light?'#555':'#8fb3d9';c.lineWidth=2;
  [[16,16,1,1],[W-16,16,-1,1],[16,H-16,1,-1],[W-16,H-16,-1,-1]].forEach(([x,y,sx,sy])=>{c.beginPath();c.moveTo(x,y+18*sy);c.lineTo(x,y);c.lineTo(x+18*sx,y);c.stroke();});}
function parchment(c){c.fillStyle='#e9dfc6';c.fillRect(0,0,W,H);c.strokeStyle='#6b5434';c.lineWidth=2;c.strokeRect(14,14,W-28,H-28);c.lineWidth=1;c.strokeRect(20,20,W-40,H-40);}

/* ---------- shared drawings ---------- */
const NAREN={
 legs:new Path2D('M300 470 C 320 420, 420 420, 480 438 C 540 420, 640 420, 660 470 C 600 492, 360 492, 300 470 Z'),
 shawl:new Path2D('M372 448 C 360 360, 380 290, 440 262 C 462 252, 498 252, 520 262 C 580 290, 600 360, 588 448 C 520 430, 440 430, 372 448 Z'),
 neck:new Path2D('M466 236 L 466 262 Q 480 270 494 262 L 494 236 Z'),
 head:new Path2D('M480 140 C 520 140, 532 176, 528 204 C 524 236, 504 252, 480 252 C 456 252, 436 236, 432 204 C 428 176, 440 140, 480 140 Z'),
 hair:new Path2D('M432 200 C 426 160, 450 130, 480 130 C 512 130, 536 158, 528 200 C 516 170, 500 160, 480 162 C 460 160, 444 170, 432 200 Z'),
 book:new Path2D('M408 392 L 480 404 L 552 392 L 548 424 L 480 436 L 412 424 Z'),
 handL:new Path2D('M398 404 C 404 390, 424 392, 424 408 C 424 420, 404 422, 398 404 Z'),
 handR:new Path2D('M536 408 C 536 392, 556 390, 562 404 C 556 422, 536 420, 536 408 Z')};
function person(c,x,y,s,dp,fp,o={}){
  const fills={legs:o.dhoti||'#f7f2e6',shawl:o.shawl||'#34477e',neck:o.skin||'#d79e62',head:o.skin||'#d79e62',hair:o.hair||'#1f1510',book:'#b8392b',handL:o.skin||'#d79e62',handR:o.skin||'#d79e62'};
  c.save();c.translate(x,y);c.scale(s,s);c.translate(-480,-300);
  const L=2600;
  Object.keys(NAREN).forEach(k=>{if(k==='book'&&!o.book)return;const p=NAREN[k];
    c.globalAlpha=fp;c.fillStyle=fills[k];c.fill(p);
    if(fp>0&&k!=='hair'&&k!=='book'){c.save();c.clip(p);c.globalAlpha=fp*.32;c.strokeStyle=k==='shawl'?'rgba(10,15,40,.9)':'#8a5a2c';c.lineWidth=22;c.stroke(p);c.restore();}
    c.globalAlpha=1;c.setLineDash([L,L]);c.lineDashOffset=L*(1-dp);c.strokeStyle=INK;c.lineWidth=(k==='legs'||k==='shawl'?5:4)/Math.max(.6,s);c.lineCap='round';c.lineJoin='round';c.stroke(p);c.setLineDash([]);});
  const fa=clamp(dp*1.4-.4);c.globalAlpha=fa;c.strokeStyle=INK;c.lineWidth=2.5;
  [[462,198],[498,198]].forEach(([ex,ey])=>{c.beginPath();c.moveTo(ex-12,ey);c.quadraticCurveTo(ex,ey-9,ex+12,ey);c.quadraticCurveTo(ex,ey+6,ex-12,ey);c.stroke();c.fillStyle=INK;c.beginPath();c.arc(ex+(o.look||1),ey,3,0,7);c.fill();
    c.beginPath();c.moveTo(ex-14,ey-12);c.quadraticCurveTo(ex,ey-20,ex+14,ey-13);c.stroke();});
  c.beginPath();c.moveTo(480,204);c.quadraticCurveTo(474,220,482,222);c.stroke();c.beginPath();c.moveTo(470,234);c.quadraticCurveTo(480,238,490,234);c.stroke();
  if(o.beard){c.fillStyle=INK;c.globalAlpha=fa*.85;c.beginPath();c.moveTo(452,228);c.quadraticCurveTo(480,268,508,228);c.quadraticCurveTo(480,250,452,228);c.fill();}
  if(o.book&&fp>0){c.globalAlpha=fp;c.fillStyle='#f6efe0';c.beginPath();c.moveTo(418,396);c.lineTo(480,407);c.lineTo(542,396);c.lineTo(540,418);c.lineTo(480,428);c.lineTo(420,418);c.fill();
    c.fillStyle=INK;c.font=`700 11px ${MONO}`;c.textAlign='center';c.fillText(o.bookLabel||'KANT',452,416);}
  c.restore();}
function bricks(c,x,y,w,h,col,ink=INK){if(w<=0||h<=0)return;c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.fillStyle=col;c.fillRect(x,y,w,h);
  c.strokeStyle=ink;c.globalAlpha=.55;c.lineWidth=2;for(let yy=y+h,r=0;yy>y-20;yy-=22,r++){c.beginPath();c.moveTo(x,yy);c.lineTo(x+w,yy);c.stroke();for(let xx=x+(r%2?24:0);xx<x+w;xx+=48){c.beginPath();c.moveTo(xx,yy);c.lineTo(xx,yy-22);c.stroke();}}
  c.restore();c.strokeStyle=ink;c.lineWidth=4;c.strokeRect(x,y,w,h);}
function cloud(c,cx,cy,rx,ry,a,ink=INK,fill='#fbf6ea'){if(a<=0)return;c.save();c.globalAlpha*=a;const B=[[-.6,0,.55],[-.2,-.35,.6],[.3,-.3,.6],[.62,.05,.5],[.25,.32,.55],[-.3,.3,.5]];
  c.strokeStyle=ink;c.lineWidth=3;c.fillStyle=fill;B.forEach(([dx,dy,r])=>{c.beginPath();c.ellipse(cx+dx*rx,cy+dy*ry,r*rx*.7,r*ry*.9,0,0,7);c.fill();c.stroke();});
  B.forEach(([dx,dy,r])=>{c.beginPath();c.ellipse(cx+dx*rx,cy+dy*ry,r*rx*.7-3,r*ry*.9-3,0,0,7);c.fill();});c.beginPath();c.ellipse(cx,cy,rx*.8,ry*.6,0,0,7);c.fill();c.restore();}
function arrow(c,x1,y1,x2,y2,col,w=2,p=1){if(p<=0)return;const x=lerp(x1,x2,p),y=lerp(y1,y2,p);c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(x1,y1);c.lineTo(x,y);c.stroke();const a=Math.atan2(y2-y1,x2-x1);c.beginPath();c.moveTo(x,y);c.lineTo(x-10*Math.cos(a-.4),y-10*Math.sin(a-.4));c.lineTo(x-10*Math.cos(a+.4),y-10*Math.sin(a+.4));c.closePath();c.fill();}

/* paper-cut waves */
function waves(c,t,top,gap,amp,cols){cols.forEach((col,i)=>{c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=14;c.shadowOffsetY=-4;c.fillStyle=col;c.beginPath();const y0=top+i*gap;c.moveTo(0,H+80);c.lineTo(0,y0);for(let x=0;x<=W;x+=16)c.lineTo(x,y0+Math.sin(x*.012+t*(.6+i*.15)+i)*amp);c.lineTo(W,H+80);c.closePath();c.fill();c.restore();});}
const waveY=(x,t,top,gap,amp,i)=>top+i*gap+Math.sin(x*.012+t*(.6+i*.15)+i)*amp;
function tag(c,s,x,y,a,rot=0){if(a<=0)return;c.save();c.globalAlpha*=a;c.translate(x,y);c.rotate(rot);c.font=`700 16px ${MONO}`;const w=c.measureText(s).width+24;c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=10;c.shadowOffsetY=5;c.fillStyle='#e6d2a6';c.fillRect(-w/2,-16,w,32);c.shadowColor='transparent';c.fillStyle=INK;c.textAlign='center';c.fillText(s,0,6);c.restore();}

/* magic lantern */
function lanternRig(c,t,screen){c.fillStyle='#07070a';c.fillRect(0,0,W,H);
  const cx=640,cy=262,R=190,fl=.9+.1*Math.sin(t*37)*Math.sin(t*13);
  const bg=c.createLinearGradient(240,300,cx,cy);bg.addColorStop(0,`rgba(255,236,190,${.22*fl})`);bg.addColorStop(1,'rgba(255,236,190,.03)');
  c.fillStyle=bg;c.beginPath();c.moveTo(262,290);c.lineTo(cx,cy-R);c.lineTo(cx,cy+R);c.lineTo(262,312);c.closePath();c.fill();
  c.save();c.beginPath();c.arc(cx,cy,R,0,7);c.clip();const sg=c.createRadialGradient(cx,cy,20,cx,cy,R);sg.addColorStop(0,`rgba(255,246,222,${fl})`);sg.addColorStop(1,`rgba(170,140,100,${fl})`);c.fillStyle=sg;c.fillRect(cx-R,cy-R,2*R,2*R);
  screen(c,cx,cy,R);
  for(let i=0;i<60;i++){c.fillStyle=`rgba(40,30,20,${Math.random()*.22})`;c.fillRect(cx-R+Math.random()*2*R,cy-R+Math.random()*2*R,1.5,1.5);}
  const vg=c.createRadialGradient(cx,cy,R*.6,cx,cy,R);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');c.fillStyle=vg;c.fillRect(cx-R,cy-R,2*R,2*R);c.restore();
  c.fillStyle='#3a2a18';c.strokeStyle='#b08a4a';c.lineWidth=3;c.beginPath();c.rect(90,240,120,120);c.fill();c.stroke();
  c.fillRect(132,200,36,40);c.strokeRect(132,200,36,40);c.beginPath();c.moveTo(126,200);c.lineTo(174,200);c.lineTo(150,182);c.closePath();c.fill();c.stroke();
  c.fillRect(214,288,40,24);c.strokeRect(214,288,40,24);c.beginPath();c.arc(262,300,14,0,7);c.fill();c.stroke();
  const glow=c.createRadialGradient(150,300,4,150,300,40);glow.addColorStop(0,`rgba(255,220,150,${.7*fl})`);glow.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=glow;c.beginPath();c.arc(150,300,40,0,7);c.fill();}
function slide(c,x,y,label,col,a){if(a<=0)return;c.save();c.globalAlpha*=a;c.fillStyle=col;c.fillRect(x,y,22,56);c.strokeStyle='#d8c9a6';c.lineWidth=1.5;c.strokeRect(x,y,22,56);
  c.translate(x-7,y+28);c.rotate(-Math.PI/2);c.fillStyle='#e9dfc6';c.font=`600 10px ${MONO}`;c.textAlign='center';c.fillText(label,0,0);c.restore();}
function worldPicture(c,cx,cy,R,aS,aT,aC,t){
  c.save();c.globalAlpha=aS*.95;c.fillStyle='rgba(150,190,220,.55)';c.fillRect(cx-R,cy-R,2*R,R+10);c.fillStyle='rgba(150,180,110,.6)';c.fillRect(cx-R,cy+10,2*R,R);
  c.fillStyle='rgba(90,150,170,.75)';c.beginPath();c.moveTo(cx-20,cy+10);c.lineTo(cx+10,cy+10);c.quadraticCurveTo(cx+60,cy+110,cx+30,cy+R);c.lineTo(cx-90,cy+R);c.quadraticCurveTo(cx-10,cy+110,cx-20,cy+10);c.fill();
  c.strokeStyle='rgba(60,50,40,.25)';c.lineWidth=1;for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(cx,cy+10);c.lineTo(cx+i*90,cy+R);c.stroke();}
  c.globalAlpha=aT;for(let i=0;i<5;i++){const a=Math.PI*(1-(i+.5)/5),x=cx+Math.cos(a)*150,y=cy+10-Math.sin(a)*130;c.fillStyle=`rgba(235,150,60,${i===2?.95:.3})`;c.beginPath();c.arc(x,y,i===2?18:12,0,7);c.fill();}
  c.strokeStyle='rgba(200,110,40,.4)';c.setLineDash([4,6]);c.beginPath();c.arc(cx,cy+10,140,Math.PI,0);c.stroke();c.setLineDash([]);
  c.globalAlpha=aC;c.fillStyle='rgba(120,120,140,.8)';[[-120,-120,26],[-96,-128,30],[-72,-118,24]].forEach(([dx,dy,r])=>{c.beginPath();c.arc(cx+dx,cy+dy,r,0,7);c.fill();});
  c.strokeStyle='rgba(70,100,150,.8)';c.lineWidth=2;for(let i=0;i<6;i++){const x=cx-130+i*12,y=cy-90+((t*90+i*17)%60);c.beginPath();c.moveTo(x,y);c.lineTo(x-4,y+10);c.stroke();}
  c.fillStyle='rgba(60,90,40,.9)';c.beginPath();c.arc(cx+110,cy-10,34,0,7);c.fill();c.fillStyle='rgba(90,60,30,.9)';c.fillRect(cx+104,cy+10,12,50);
  arrow(c,cx-90,cy-30,cx-40,cy+60,'rgba(150,40,30,.85)',2.5);arrow(c,cx+10,cy+80,cx+80,cy+40,'rgba(150,40,30,.85)',2.5);c.restore();}

/* palm leaf */
function leaf(c,x,y,w,h){const lg=c.createLinearGradient(0,y,0,y+h);lg.addColorStop(0,'#e1c88f');lg.addColorStop(.5,'#d5b878');lg.addColorStop(1,'#c3a262');
  c.save();c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=20;c.shadowOffsetY=8;c.fillStyle=lg;c.beginPath();c.roundRect?c.roundRect(x,y,w,h,24):c.rect(x,y,w,h);c.fill();c.restore();
  c.strokeStyle='rgba(120,85,40,.18)';c.lineWidth=1;for(let yy=y+10;yy<y+h-6;yy+=7){c.beginPath();c.moveTo(x+10,yy);c.lineTo(x+w-10,yy+Math.sin(yy)*2);c.stroke();}
  [x+40,x+w-40].forEach(hx=>{c.fillStyle='#1a0f08';c.beginPath();c.arc(hx,y+h/2,8,0,7);c.fill();});}
function wood(c){const wg=c.createLinearGradient(0,0,0,H);wg.addColorStop(0,'#2b1b10');wg.addColorStop(1,'#1a0f08');c.fillStyle=wg;c.fillRect(0,0,W,H);}
function strike(c,x,y,w,p){if(p<=0)return;c.strokeStyle='#8c2f1c';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(x-8,y);c.lineTo(x-8+(w+16)*p,y-4*p);c.stroke();}

