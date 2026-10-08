const SC={};
/* ---- film 3 helpers ---- */
function turban(c,x,y,s,a=1){c.save();c.globalAlpha*=a;c.fillStyle='#d27a2c';c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.ellipse(x,y-(300-158)*s,58*s,34*s,0,Math.PI,0);c.lineTo(x+52*s,y-(300-170)*s);c.quadraticCurveTo(x,y-(300-160)*s,x-52*s,y-(300-170)*s);c.closePath();c.fill();c.stroke();c.restore();}
function mkproj(l0,l1,a0,a1,x0,x1,y0,y1){return(lon,lat)=>[lerp(x0,x1,(lon-l0)/(l1-l0)),lerp(y0,y1,(a0-lat)/(a0-a1))];}
function qcurve(c,a,b,lift,p,col,dash,w=2.4){const cx=(a[0]+b[0])/2,cy=Math.min(a[1],b[1])-lift;c.strokeStyle=col;c.lineWidth=w;c.setLineDash(dash||[]);c.beginPath();let last=a;for(let i=0;i<=60*p;i++){const s=i/60;last=[(1-s)**2*a[0]+2*(1-s)*s*cx+s*s*b[0],(1-s)**2*a[1]+2*(1-s)*s*cy+s*s*b[1]];i?c.lineTo(...last):c.moveTo(...last);}c.stroke();c.setLineDash([]);return last;}
function cdot(c,p,l,dx,dy,a,col='#3d2e1a'){if(a<=0)return;c.save();c.globalAlpha*=a;c.fillStyle=col;c.beginPath();c.arc(p[0],p[1],4.5,0,7);c.fill();c.restore();txt(c,l,p[0]+dx,p[1]+dy,`600 12px ${MONO}`,col,dx<0?'right':'left',a);}
function chartGrid(c,proj,lons,lats){c.strokeStyle='rgba(107,84,52,.18)';c.lineWidth=1;lons.forEach(lo=>{const[x]=proj(lo,0);c.beginPath();c.moveTo(x,20);c.lineTo(x,H-20);c.stroke();});lats.forEach(la=>{const[,y]=proj(0,la);c.beginPath();c.moveTo(20,y);c.lineTo(W-20,y);c.stroke();txt(c,la+'°N',26,y-3,`10px ${MONO}`,'#6b5434');});}
function rose(c,x,y,r){c.fillStyle='#8c3a24';for(let i=0;i<8;i++){const a=i*Math.PI/4,L=i%2?r*.55:r;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a-.15)*r*.3,y+Math.sin(a-.15)*r*.3);c.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);c.lineTo(x+Math.cos(a+.15)*r*.3,y+Math.sin(a+.15)*r*.3);c.closePath();c.fill();}txt(c,'N',x,y-r-6,`600 11px ${MONO}`,'#6b5434','center');}
function polyAlong(c,pts,p){let tot=0;const L=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d;}
  const target=p*tot;let acc=0,pos=pts[0],ang=0,idx=0;c.beginPath();c.moveTo(...pts[0]);
  for(let i=1;i<pts.length;i++){const l=L[i-1];ang=Math.atan2(pts[i][1]-pts[i-1][1],pts[i][0]-pts[i-1][0]);if(acc+l<=target){c.lineTo(...pts[i]);acc+=l;pos=pts[i];idx=i;}else{const f=(target-acc)/l;pos=[lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f)];c.lineTo(...pos);break;}}
  c.stroke();return{pos,ang,idx,cum:(()=>{let a=0;return[0,...L.map(l=>a+=l)].map(v=>v/tot);})()};}
function egrid(c){/* paper-cut night */const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0b1a2e');g.addColorStop(1,'#13304a');c.fillStyle=g;c.fillRect(0,0,W,H);}

SC.math=(c,t,B)=>{paper(c);
  const hp=ease(seg(t,0,2.6)),hf=seg(t,2,3.2),shrink=P(t,B,2,1);
  c.save();c.translate(lerp(0,-40,shrink),0);c.globalAlpha=1-shrink*.65;
  const house=new Path2D('M90 470 L90 230 L250 140 L410 230 L410 470 Z');const L=2400;
  c.fillStyle='#c9ad7f';c.globalAlpha*=hf||0.0001;c.fill(house);c.globalAlpha=1-shrink*.65;
  c.setLineDash([L,L]);c.lineDashOffset=L*(1-hp);c.strokeStyle=INK;c.lineWidth=5;c.stroke(house);c.setLineDash([]);
  if(hf>0){c.save();c.globalAlpha*=hf;[[130,280],[300,280],[130,370],[300,370]].forEach(([x,y],i)=>{c.fillStyle='#2a2018';c.fillRect(x,y,60,56);c.strokeStyle=INK;c.lineWidth=3;c.strokeRect(x,y,60,56);if(i===1){c.strokeStyle='#c9ad7f';c.beginPath();c.moveTo(x,y);c.lineTo(x+60,y+56);c.stroke();}});
    c.strokeStyle=INK;c.lineWidth=2.5;c.beginPath();c.moveTo(220,250);c.lineTo(235,290);c.lineTo(226,330);c.lineTo(244,372);c.stroke();c.beginPath();c.moveTo(372,420);c.lineTo(390,440);c.lineTo(380,470);c.stroke();
    c.fillStyle='#4d5a2a';for(let i=0;i<9;i++){c.beginPath();c.ellipse(70+i*48,474,30,14,0,Math.PI,0);c.fill();}c.restore();}
  c.restore();
  txt(c,'said to be haunted',250,120,`italic 600 22px ${DISP}`,'#a8382a','center',P(t,B,0,1,3)*(1-shrink));
  const rp=P(t,B,1,1)*(1-P(t,B,2,.6));if(rp>0){c.save();c.globalAlpha=rp;c.fillStyle='#9a5a30';c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.ellipse(620,410,80,56,0,0,7);c.fill();c.stroke();c.fillStyle='#f6f1e6';c.beginPath();c.ellipse(620,362,66,16,0,0,7);c.fill();c.stroke();
    txt(c,'rice',620,486,`italic 600 24px ${DISP}`,INK,'center');c.fillStyle='#e8e2d6';c.beginPath();c.ellipse(800,430,46,14,0,0,7);c.fill();c.stroke();txt(c,'salt',800,486,`italic 600 24px ${DISP}`,INK,'center');
    const x=P(t,B,1,.5,1.2);c.strokeStyle='#a8382a';c.lineWidth=6;c.beginPath();c.moveTo(770,400);c.lineTo(lerp(770,830,x),lerp(400,460,x));c.stroke();
    const lf=P(t,B,1,.8,3);c.globalAlpha=rp*lf;c.fillStyle='#4d6a2a';for(let i=0;i<5;i++){c.save();c.translate(560+i*30,330-(i%2)*10);c.rotate(-.6+i*.3);c.beginPath();c.ellipse(0,0,18,8,0,0,7);c.fill();c.restore();}c.restore();
    txt(c,'boiled leaves',560,300,`italic 600 22px ${DISP}`,INK,'center',rp*lf);}
  const mp=P(t,B,2,1.2);if(mp>0){[[380,.36,'#c8692c'],[500,.36,'#c8692c'],[620,.36,'#c8692c'],[740,.36,'#c8692c']].forEach(([x,s,col],i)=>person(c,x,410,s,seg(mp,i*.15,i*.15+.6),seg(mp,.4,1),{shawl:col}));
    const a=P(t,B,2,.6,.8);cloud(c,360,150,160,62,a);txt(c,'KANT · HEGEL',360,142,`600 15px ${MONO}`,INK,'center',a);txt(c,'MILL · SPENCER',360,166,`600 15px ${MONO}`,INK,'center',a);
    const b=P(t,B,2,.6,2);cloud(c,750,150,170,66,b);txt(c,'SANKHYA · YOGA · NYAYA',750,136,`600 13px ${MONO}`,INK,'center',b);txt(c,'VAISHESHIKA · MIMAMSA',750,156,`600 13px ${MONO}`,INK,'center',b);txt(c,'VEDANTA',750,178,`600 13px ${MONO}`,INK,'center',b);
    txt(c,'vs',555,166,`italic 600 30px ${DISP}`,'#a8382a','center',P(t,B,2,.4,2.8)*(1-P(t,B,3,.5)));}
  const nx=P(t,B,3,.8);if(nx>0){c.fillStyle=`rgba(241,231,208,${.97*nx})`;c.fillRect(0,90,W,140);
    const day=Math.floor((t-B[3]-.8)/2.2)%2===0;txt(c,day?'“God is a myth.”':'“God is the only reality.”',560,170,`italic 600 38px ${DISP}`,day?INK:'#a8382a','center',nx);
    txt(c,day?'ONE DAY':'THE NEXT',560,120,`600 12px ${MONO}`,'#6b5434','center',nx);}
  heading(c,1,'Baranagore, 1886','kalighat',false,1-nx);fig(c,'','Eastern & Western Disciples ch. 12 · Biography ch. 5',false);
};
SC.route=(c,t,B)=>{parchment(c);const pj=mkproj(-6,96,64,4,40,920,40,500);chartGrid(c,pj,[0,15,30,45,60,75,90],[10,20,30,40,50]);rose(c,140,420,40);
  const P_={d:pj(77.2,28.6),p:pj(2.35,48.85),dr:pj(13.74,51.05),k:pj(20.5,54.7)};
  txt(c,'?',480,260,`600 120px ${DISP}`,'#6b5434','center',P(t,B,0,1)*(1-P(t,B,1,.5)));
  cdot(c,P_.d,'DELHI · Dara Shikoh, 1657',-10,-10,P(t,B,1,.6));
  const a1=P(t,B,2,2.2);if(a1>0)qcurve(c,P_.d,P_.p,140,a1,'#8c3a24',[]);cdot(c,P_.p,'PARIS · Latin, 1801–02',10,20,seg(a1,.9,1));
  const a2=P(t,B,2,1,2.4);if(a2>0)qcurve(c,P_.p,P_.dr,40,a2,'#8c3a24',[]);cdot(c,P_.dr,'Schopenhauer · 1818',8,22,seg(a2,.9,1));
  const a3=P(t,B,3,1.4);if(a3>0)qcurve(c,P_.p,P_.k,90,a3,'#6b5434',[6,6]);cdot(c,P_.k,'KÖNIGSBERG · Kant: “traces”',10,-8,seg(a3,.9,1),'#6b5434');
  const lp=P(t,B,1,1,1);if(lp>0){c.save();c.globalAlpha=lp;leaf(c,300,370,600,120);
    const st=t<B[2]?0:t<B[2]+2.4?1:t<B[3]?2:3;const sw=(k)=>clamp(1-Math.abs((t<B[2]?0:t<B[2]+2.4?1:t<B[3]?2:3)-k));
    const lab=[['उपनिषद्',DEV,'SANSKRIT · THE UPANISHADS'],['سرّ اکبر',ARAB,'PERSIAN · SIRR-I-AKBAR, “THE GREAT SECRET”'],['OUPNEK’HAT',DISP,'LATIN · ANQUETIL-DUPERRON, 1801–02'],['Die Welt als Wille',DISP,'GERMAN · SCHOPENHAUER, 1818']][st];
    txt(c,lab[0],600,438,`${st===2||st===3?'600 40px':'46px'} ${lab[1]}`,INK,'center');txt(c,lab[2],600,470,`600 12px ${MONO}`,'#5a3e22','center');c.restore();}
  heading(c,2,'Persian, Latin, German','chart',false);fig(c,'','Vedantism, Khetri 1897, CW vol. 3',false);
};
SC.infinite=(c,t,B)=>{c.fillStyle='#0b1a2e';c.fillRect(0,0,W,H);
  const L=P(t,B,1,1.2),R=P(t,B,2,1.2),mid=480;
  c.save();c.beginPath();c.rect(0,0,mid,H);c.clip();const lg=c.createLinearGradient(0,0,0,H);lg.addColorStop(0,'#16324f');lg.addColorStop(1,'#2a5a7a');c.fillStyle=lg;c.fillRect(0,0,mid,H);
  for(let i=0;i<6;i++){const r=((t*30+i*70)%420)*L;c.strokeStyle=`rgba(243,234,212,${(1-r/420)*.5*L})`;c.lineWidth=2;c.beginPath();c.arc(240,460,r,Math.PI,2*Math.PI);c.stroke();}
  let s=11;for(let i=0;i<70;i++){s=(s*16807)%2147483647;const x=s%mid;s=(s*16807)%2147483647;const y=s%380;c.fillStyle=`rgba(255,250,230,${L*(.4+.6*Math.abs(Math.sin(t+i)))})`;c.fillRect(x,y,2,2);}
  c.save();c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=12;c.shadowOffsetY=6;c.fillStyle='#e6d2a6';c.globalAlpha=L;
  c.fillRect(150,300,180,22);c.fillRect(160,322,160,10);for(let i=0;i<4;i++)c.fillRect(170+i*42,332,22,120);c.fillRect(150,452,180,20);c.beginPath();c.moveTo(140,300);c.lineTo(240,250);c.lineTo(340,300);c.closePath();c.fill();c.restore();c.restore();
  c.save();c.beginPath();c.rect(mid,0,W-mid,H);c.clip();c.fillStyle='#1d1206';c.fillRect(mid,0,W-mid,H);
  const cols=['#5a3a1a','#7a4a20','#9a5a24','#b86c2a','#d27a2c','#e89a46','#f3c27a'];
  for(let i=0;i<7;i++){const k=(i+((t*.25)%1))/7;const sc=lerp(1,.08,k)*(R>0?1:0);if(sc<=0)continue;const w=440*sc,h=480*sc;c.save();c.shadowColor='rgba(0,0,0,.55)';c.shadowBlur=14;c.fillStyle=cols[i];c.globalAlpha=R;c.beginPath();c.roundRect?c.roundRect(720-w/2,270-h/2,w,h,40*sc):c.rect(720-w/2,270-h/2,w,h);c.fill();c.restore();}
  if(R>0){c.save();c.globalAlpha=R;c.fillStyle='#fff3c8';const g=c.createRadialGradient(720,270,2,720,270,60);g.addColorStop(0,'rgba(255,245,210,1)');g.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=g;c.fillRect(660,210,120,120);c.fillStyle='#1d1206';c.beginPath();c.arc(720,256,7,0,7);c.fill();c.beginPath();c.moveTo(706,284);c.quadraticCurveTo(720,262,734,284);c.closePath();c.fill();c.restore();}
  c.restore();
  c.fillStyle='#f3ead4';c.fillRect(mid-1,0,2,H*P(t,B,0,1));
  txt(c,'THE OUTER INFINITE',240,120,`600 15px ${MONO}`,'#f3ead4','center',P(t,B,0,1,.6));txt(c,'THE INNER INFINITE',720,120,`600 15px ${MONO}`,'#f3c27a','center',P(t,B,0,1,.6));
  txt(c,'the Greeks · macrocosm',240,510,`italic 600 26px ${DISP}`,'#f3ead4','center',P(t,B,1,1,1));txt(c,'India · microcosm',720,510,`italic 600 26px ${DISP}`,'#f3c27a','center',P(t,B,2,1,1));
  const cn=P(t,B,3,1);if(cn>0){c.fillStyle=`rgba(11,26,46,${.75*cn})`;c.fillRect(300,200,360,120);arrow(c,330,250,460,250,'#f3ead4',3,cn);arrow(c,630,280,500,280,'#f3c27a',3,cn);txt(c,'compare notes',480,236,`italic 600 30px ${DISP}`,'#f3ead4','center',P(t,B,3,1,1));txt(c,'both gain',480,312,`italic 600 26px ${DISP}`,'#f3c27a','center',P(t,B,3,1,2));}
  heading(c,3,'Two infinites','papercut',true);fig(c,'','Vedantism, Khetri 1897, CW vol. 3',true);
};
const INDIA=[[68.2,23.7],[69,22.3],[70,21],[72.6,21.1],[72.8,19],[73.4,16.5],[74.1,14.8],[74.8,12.8],[75.5,11.5],[76.3,9.5],[77.5,8.1],[78.2,8.9],[79.2,10.3],[79.9,11.2],[80.3,13.1],[80.1,15.5],[81.3,16.3],[82.3,17],[84.1,18.3],[85.8,19.8],[86.9,20.8],[87.4,21.6],[88.2,21.8],[89.1,21.9],[90.5,22.3],[91.8,22.4]];
const WANDER=[['Calcutta',88.4,22.6,1],['Varanasi',83,25.3,1],['Vrindavan',77.7,27.6,1],['Himalayas',78.3,30.1,1],['Delhi',77.2,28.6,0],['Rajputana',75.8,26.9,1],['Gujarat',69.6,21.6,1],['',74.5,15.9,0],['Mysore',77.6,13,1],['Travancore',76.9,8.6,1],['Kanyakumari',77.5,8.08,1],['',79.3,9.3,0],['Madras',80.3,13.1,1],['Hyderabad',78.5,17.4,1],['Bombay',72.9,19.1,1]];
SC.wander=(c,t,B)=>{parchment(c);const pj=mkproj(64,94,33,5,100,880,50,500);chartGrid(c,pj,[66,72,78,84,90],[10,15,20,25,30]);
  c.strokeStyle='#6b5434';c.lineWidth=2;c.beginPath();INDIA.forEach(([lo,la],i)=>{const[x,y]=pj(lo,la);i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();
  c.beginPath();const sl=pj(80.7,7.8);c.ellipse(sl[0],sl[1],16,26,.2,0,7);c.stroke();
  txt(c,'ARABIAN SEA',pj(68,14)[0],pj(68,14)[1],`italic 500 20px ${DISP}`,'rgba(80,60,35,.55)','center');txt(c,'BAY OF BENGAL',pj(87,15)[0],pj(87,15)[1],`italic 500 20px ${DISP}`,'rgba(80,60,35,.55)','center');
  const pts=WANDER.map(w=>pj(w[1],w[2]));const p=seg(t,B[0]+1,B[2]+.4)*.86+P(t,B,2,.1,3)*.14;
  c.strokeStyle='#8c3a24';c.lineWidth=2.4;c.setLineDash([3,6]);const r=polyAlong(c,pts,p);c.setLineDash([]);
  WANDER.forEach(([n,lo,la,show],i)=>{if(!show)return;const a=p>=r.cum[i]-.001?1:0;const[x,y]=pj(lo,la);const right=x<pj(80,0)[0]?-1:1;cdot(c,[x,y],n.toUpperCase(),i===0?10:(right<0?-10:10),i===12?-10:5,a);});
  c.fillStyle='#2c2116';c.beginPath();c.arc(r.pos[0],r.pos[1],7,0,7);c.fill();c.strokeStyle='#2c2116';c.lineWidth=2;c.beginPath();c.moveTo(r.pos[0]+8,r.pos[1]+8);c.lineTo(r.pos[0]+12,r.pos[1]-22);c.stroke();
  const md=P(t,B,2,.8)*(1-P(t,B,3,.5));if(md>0){c.save();c.globalAlpha=md;c.fillStyle='rgba(243,236,218,.95)';c.strokeStyle='#6b5434';c.lineWidth=1.5;c.fillRect(470,330,420,110);c.strokeRect(470,330,420,110);
    txt(c,'“From the Rig-Veda to Kant and Hegel,',680,370,`italic 600 22px ${DISP}`,'#3d2e1a','center');txt(c,'from Yoga to a modern laboratory.”',680,400,`italic 600 22px ${DISP}`,'#3d2e1a','center');txt(c,'A MADRAS DISCIPLE',680,426,`600 11px ${MONO}`,'#8c3a24','center');c.restore();}
  const sh=P(t,B,3,2.4,.6);if(sh>0){const b=pj(72.9,19.1),e=[30,b[1]+40];c.setLineDash([3,6]);c.strokeStyle='#8c3a24';c.beginPath();c.moveTo(...b);c.lineTo(lerp(b[0],e[0],sh),lerp(b[1],e[1],sh));c.stroke();c.setLineDash([]);
    c.save();c.translate(lerp(b[0],e[0],sh),lerp(b[1],e[1],sh));c.rotate(Math.atan2(e[1]-b[1],e[0]-b[0]));c.fillStyle='#2c2116';c.beginPath();c.moveTo(12,0);c.lineTo(-9,-6);c.lineTo(-9,6);c.closePath();c.fill();c.restore();
    txt(c,'31 MAY 1893 · FOR THE WEST',b[0]+16,b[1]+46,`600 13px ${MONO}`,'#8c3a24','left',P(t,B,3,1,1));}
  txt(c,'1890 · staff and begging bowl',880,90,`italic 600 22px ${DISP}`,'#3d2e1a','right',P(t,B,0,1)*(1-P(t,B,2,.5)));
  heading(c,4,'The wandering monk','chart',false);fig(c,'','Biography ch. 5 · Eastern & Western Disciples ch. 19',false);
};
SC.hegel=(c,t,B)=>{grid(c,false);
  const h0=P(t,B,0,1)*(1-P(t,B,1,.5));txt(c,'Hegel',480,250,`600 64px ${DISP}`,'#e8eef7','center',h0);txt(c,'G. W. F. HEGEL · 1770–1831',480,290,`600 13px ${MONO}`,'#8fb3d9','center',h0);
  const h1=P(t,B,1,1)*(1-P(t,B,2,.5));if(h1>0){c.save();c.globalAlpha=h1;c.setLineDash([5,5]);c.strokeStyle='#8a9bb3';c.lineWidth=2;c.beginPath();c.arc(230,300,80,0,7);c.stroke();c.setLineDash([]);
    for(let i=0;i<30;i++){const a=i*2.39+t*.3,r=10+((i*37)%60);c.fillStyle='#8a9bb3';c.fillRect(230+Math.cos(a)*r,300+Math.sin(a)*r,3,3);}
    txt(c,'the Absolute: “only chaos”',230,410,`600 13px ${MONO}`,'#8a9bb3','center');arrow(c,330,300,600,250,'#f0c56a',3,P(t,B,1,1,1));
    c.strokeStyle='#f0c56a';c.lineWidth=2.5;c.strokeRect(620,190,200,110);txt(c,'the world',720,240,`italic 600 30px ${DISP}`,'#f0c56a','center');txt(c,'individual form',720,272,`12px ${MONO}`,'#f0c56a','center');
    txt(c,'“greater”',470,240,`italic 600 26px ${DISP}`,'#f0c56a','center',P(t,B,1,1,2.2));c.restore();}
  const h2=P(t,B,2,1);if(h2>0){c.save();c.globalAlpha=h2;const ret=P(t,B,3,2,.6);const sx=480,sy=120;
    const g=c.createRadialGradient(sx,sy,6,sx,sy,90);g.addColorStop(0,'rgba(255,230,150,1)');g.addColorStop(1,'rgba(255,200,100,0)');c.fillStyle=g;c.fillRect(sx-90,sy-90,180,180);c.fillStyle='#f0c56a';c.beginPath();c.arc(sx,sy,30,0,7);c.fill();
    const pud=[[200,420,80],[380,440,60],[580,430,70],[760,418,56]];
    pud.forEach(([x,y,w],i)=>{const a=P(t,B,2,.6,.8+i*.5);c.globalAlpha=h2*a;c.fillStyle='#4a3a2a';c.beginPath();c.ellipse(x,y,w,16,0,0,7);c.fill();c.strokeStyle='#8a7a5a';c.lineWidth=2;c.stroke();
      const rr=1-ret;c.strokeStyle=`rgba(240,197,106,${.7*rr})`;c.lineWidth=1.5;c.beginPath();c.moveTo(sx,sy+30);c.lineTo(lerp(sx,x,rr),lerp(sy+30,y,rr));c.stroke();
      if(rr>.05){c.fillStyle=`rgba(240,197,106,${.85*rr})`;c.beginPath();c.ellipse(x+Math.sin(t*3+i)*3,y,8+4*rr,3.5,0,0,7);c.fill();}});
    c.globalAlpha=h2;txt(c,'the sun, trying to reflect itself in little mud puddles',480,500,`italic 500 24px ${DISP}`,'#e8eef7','center',P(t,B,2,1,1.6)*(1-ret));
    txt(c,'the retreat: renunciation, the beginning of religion',480,500,`italic 600 24px ${DISP}`,'#f0c56a','center',seg(ret,.5,1));c.restore();}
  heading(c,5,'Mud puddles','plate',true);fig(c,h2>0?'FIG. 3.5 · ONE SOURCE, MANY SMALL REFLECTIONS':'','The Vedanta in All Its Phases, CW vol. 3',true);
};
SC.kiel=(c,t,B)=>{paper(c);
  person(c,240,370,.6,ease(seg(t,0,2)),seg(t,1.6,2.6),{shawl:'#3b3f46',beard:true,book:true,bookLabel:'UPANISHADS',look:2});txt(c,'Paul Deussen',240,500,`italic 600 22px ${DISP}`,'#a8382a','center',seg(t,1.6,2.6));
  person(c,720,370,.6,ease(seg(t,.4,2.4)),seg(t,2,3),{shawl:'#c8692c',book:true,bookLabel:'POEMS',look:-2});turban(c,720,370,.6,seg(t,2,3));txt(c,'the Swami',720,500,`italic 600 22px ${DISP}`,'#a8382a','center',seg(t,2,3));
  txt(c,'Kiel, 1896',480,120,`600 40px ${DISP}`,INK,'center',P(t,B,0,1)*(1-P(t,B,1,.5)));
  txt(c,'follower of Kant · disciple of Schopenhauer',480,156,`600 13px ${MONO}`,'#a8382a','center',P(t,B,0,1,2)*(1-P(t,B,1,.5)));
  const s1=P(t,B,1,.8)*(1-P(t,B,2,.5));if(s1>0){cloud(c,320,150,200,72,s1);txt(c,'संस्कृतम्',320,140,`32px ${DEV}`,INK,'center',s1);txt(c,'“one of the most majestic structures',320,172,`italic 600 18px ${DISP}`,INK,'center',P(t,B,1,.8,1.6)*(1-P(t,B,2,.5)));txt(c,'of the human mind”',320,194,`italic 600 18px ${DISP}`,INK,'center',P(t,B,1,.8,1.6)*(1-P(t,B,2,.5)));}
  const s2=P(t,B,2,.6)*(1-P(t,B,3,.5));if(s2>0){cloud(c,330,170,90,48,s2);txt(c,'…?',330,180,`700 30px ${DISP}`,INK,'center',s2);
    const rec=P(t,B,2,2,2);for(let i=0;i<5;i++){const a=seg(rec,i*.15,i*.15+.4);c.save();c.globalAlpha=s2*a;c.strokeStyle=INK;c.lineWidth=3;const y=240-i*26,w=120-(i%2)*30;c.beginPath();c.moveTo(640,y);c.lineTo(640+w,y);c.stroke();c.restore();}
    txt(c,'recited from memory',700,100,`italic 600 22px ${DISP}`,'#a8382a','center',rec);}
  const s3=P(t,B,3,.8);if(s3>0){cloud(c,320,150,210,70,s3);txt(c,'India: the spiritual',320,142,`italic 600 22px ${DISP}`,INK,'center',s3);txt(c,'leader of the nations',320,170,`italic 600 22px ${DISP}`,INK,'center',s3);}
  heading(c,6,'Kiel, 1896','kalighat',false,1-P(t,B,1,.5));fig(c,'','Biography ch. 9',false);
};
SC.london=(c,t,B)=>{
  lanternRig(c,t,(c,cx,cy,R)=>{
    const m=1-P(t,B,2,.8);if(m>0){c.save();c.globalAlpha=m;waves(c,t,cy-30,40,8,['rgba(80,140,170,.6)','rgba(60,120,150,.65)','rgba(40,100,130,.7)','rgba(30,80,110,.75)']);
      c.fillStyle='rgba(60,40,20,.75)';c.font=`600 40px ${DISP}`;c.textAlign='center';c.fillText('MĀYĀ',cx,cy-70);
      ['I','II','III'].forEach((n,i)=>txt(c,n,cx-50+i*50,cy-120,`600 22px ${DISP}`,'rgba(60,40,20,.8)','center',P(t,B,0,.5,1+i*.6)));c.restore();}
    const hl=P(t,B,2,1);if(hl>0){c.save();c.globalAlpha=hl;c.fillStyle='rgba(90,110,80,.75)';c.beginPath();c.moveTo(cx-R,cy+80);c.lineTo(cx-110,cy-30);c.lineTo(cx-40,cy+30);c.lineTo(cx+40,cy-70);c.lineTo(cx+130,cy+20);c.lineTo(cx+R,cy-10);c.lineTo(cx+R,cy+R);c.lineTo(cx-R,cy+R);c.closePath();c.fill();
      c.fillStyle='rgba(60,40,20,.8)';c.font=`italic 600 30px ${DISP}`;c.textAlign='center';c.fillText('as old as the hills',cx,cy-110);c.restore();}});
  for(let i=0;i<16;i++){const x=40+i*60+(i%2)*14,y=520+(i%3)*6;c.fillStyle='#050505';c.beginPath();c.arc(x,y,20,0,7);c.fill();c.fillRect(x-24,y+16,48,30);}
  const st=P(t,B,1,.8)*(1-P(t,B,3,.6,1.6));if(st>0){c.save();c.globalAlpha=st;const x=760;c.fillStyle='#050505';c.beginPath();c.arc(x,452,20,0,7);c.fill();c.fillRect(x-24,470,48,80);c.fillStyle='#d8d4cc';c.beginPath();c.arc(x,446,20,Math.PI*1.05,Math.PI*1.95);c.fill();c.restore();}
  const tl=(s,y,f,col,a)=>txt(c,s,640,y,f,col,'center',a);
  tl('three lectures on Māyā · London, 1896',488,`italic 500 22px ${DISP}`,'#e9dfc6',P(t,B,0,1,.6)*(1-P(t,B,1,.5)));
  tl('“…you have told us nothing new.”',488,`italic 500 24px ${DISP}`,'#e9dfc6',P(t,B,1,1,1.6)*(1-P(t,B,2,.5)));
  tl('“Sir, I have told you the Truth.”',488,`italic 600 26px ${DISP}`,'#f0c56a',P(t,B,2,1)*(1-P(t,B,3,.5)));
  tl('words that make you think, and live up to your thinking',488,`italic 500 22px ${DISP}`,'#f0c56a',P(t,B,3,1,.6));
  heading(c,7,'Lectures on Māyā','lantern',true);fig(c,'','Biography ch. 9',true);
};
const VOY=[[88.4,22.6],[87.5,18],[80.3,13.1],[82,8],[79.9,6.9],[60,10],[45,12.8],[43.3,12.6],[38,20],[32.5,29.9],[32.3,31.3],[25,34],[15.6,38.2],[14.3,40.8],[10,41.5],[5.4,43.3]];
SC.voyage=(c,t,B)=>{parchment(c);const pj=mkproj(-6,96,56,2,40,920,40,500);chartGrid(c,pj,[0,15,30,45,60,75,90],[10,20,30,40,50]);rose(c,150,400,44);
  [['ARABIAN SEA',64,15],['BAY OF BENGAL',88,14],['RED SEA',38,22],['MEDITERRANEAN',24,33]].forEach(([n,lo,la])=>{const[x,y]=pj(lo,la);txt(c,n,x,y,`italic 500 18px ${DISP}`,'rgba(80,60,35,.55)','center');});
  const pts=VOY.map(p=>pj(...p));const p=seg(t,B[0]+.4,B[2]+1.4);c.strokeStyle='#8c3a24';c.lineWidth=2.2;c.setLineDash([3,6]);const r=polyAlong(c,pts,p);c.setLineDash([]);
  [['Calcutta',88.4,22.6,8,-6],['Madras',80.3,13.1,8,4],['Colombo',79.9,6.9,8,12],['Aden',45,12.8,-8,16],['Suez',32.5,29.9,8,4],['Messina',15.6,38.2,8,12],['Marseilles',5.4,43.3,-8,14]].forEach(([n,lo,la,dx,dy])=>cdot(c,pj(lo,la),n,dx,dy,1));
  c.save();c.translate(...r.pos);c.rotate(r.ang);c.fillStyle='#2c2116';c.beginPath();c.moveTo(12,0);c.lineTo(-9,-6);c.lineTo(-9,6);c.closePath();c.fill();c.restore();
  const LOG=[[0,0,'20 Jun 1899 · Calcutta · SS Golconda'],[0,1.5,'with Sister Nivedita'],[1,0,'24 Jun · Madras · plague: no one may land'],[1,2.4,'8 Jul · Aden · monsoon, ten days']];
  const shown=LOG.filter(([b,o])=>t>=B[b]+o);c.fillStyle='rgba(243,236,218,.92)';c.strokeStyle='#6b5434';c.lineWidth=1.5;c.fillRect(540,48,370,104);c.strokeRect(540,48,370,104);txt(c,"SHIP'S LOG",554,68,`600 11px ${MONO}`,'#6b5434');
  shown.forEach((l,i)=>txt(c,l[2],554,88+i*16,`12px ${MONO}`,i===shown.length-1?'#8c3a24':'#3d2e1a'));
  const dk=P(t,B,2,.8);if(dk>0){c.save();c.globalAlpha=dk;c.fillStyle='rgba(243,236,218,.96)';c.strokeStyle='#6b5434';c.fillRect(250,300,640,170);c.strokeRect(250,300,640,170);
    const col=(x,h,items,cl,a)=>{txt(c,h,x,328,`600 13px ${MONO}`,cl,'left',a);items.forEach((s,i)=>txt(c,s,x,354+i*20,`italic 600 19px ${DISP}`,'#3d2e1a','left',a));};
    col(268,'KANT',['time','space','causation'],'#8c3a24',1);col(440,'VAISHESHIKA',['substance · quality','action · togetherness','classification','inherence'],'#6b5434',P(t,B,2,.8,1.4));col(680,'NYAYA',['perception','inference','analogy','testimony'],'#6b5434',P(t,B,2,.8,2.8));c.restore();}
  const ns=P(t,B,3,1);if(ns>0){c.save();c.globalAlpha=ns;c.fillStyle='rgba(233,223,198,.97)';c.fillRect(250,300,640,170);c.strokeStyle='#6b5434';c.strokeRect(250,300,640,170);
    txt(c,'the outer thing',400,370,`italic 600 30px ${DISP}`,'#3d2e1a','center');txt(c,'the inner idea',740,370,`italic 600 30px ${DISP}`,'#8c3a24','center');
    const a=t*1.2;arrow(c,520+Math.cos(a)*0,352,620,352,'#3d2e1a',2);arrow(c,620,384,520,384,'#8c3a24',2);txt(c,'which is prior? no solution',570,440,`600 13px ${MONO}`,'#6b5434','center',P(t,B,3,1,1.6));c.restore();}
  heading(c,8,'On deck, 1899','chart',false);fig(c,'','Eastern & Western Disciples ch. 35 · Nivedita ch. 15',false);
};
SC.messina=(c,t,B)=>{grid(c,true);
  const s0=1-P(t,B,2,.6);if(s0>0){c.save();c.globalAlpha=s0;c.fillStyle='#0f1a2a';c.fillRect(160,110,640,250);c.strokeStyle='#121212';c.lineWidth=3;c.strokeRect(160,110,640,250);
    c.save();c.beginPath();c.rect(160,110,640,250);c.clip();const mr=P(t,B,0,3);const mx=640,my=lerp(380,180,mr);const g=c.createRadialGradient(mx,my,4,mx,my,90);g.addColorStop(0,'rgba(255,248,220,.9)');g.addColorStop(1,'rgba(255,248,220,0)');c.fillStyle=g;c.fillRect(mx-90,my-90,180,180);c.fillStyle='#fff6dc';c.beginPath();c.arc(mx,my,24,0,7);c.fill();
    c.fillStyle='#05080d';c.beginPath();c.moveTo(160,360);c.lineTo(260,300);c.lineTo(330,230);c.lineTo(360,232);c.lineTo(440,300);c.lineTo(520,330);c.lineTo(520,360);c.closePath();c.fill();
    for(let i=0;i<14;i++){const k=((t*.6+i/14)%1);c.fillStyle=`rgba(230,110,40,${.8*(1-k)})`;c.beginPath();c.arc(345+Math.sin(i*2.1)*14*k,228-k*90,3+6*k,0,7);c.fill();}
    c.fillStyle='rgba(255,240,200,.25)';for(let i=0;i<8;i++)c.fillRect(mx-30+Math.sin(t+i)*6,330+i*4,60-i*6,2);c.restore();c.restore();
    txt(c,'Strait of Messina · Etna in eruption',480,392,`600 13px ${MONO}`,'#333','center',s0);
    txt(c,'Beauty is not outside.',480,446,`italic 600 30px ${DISP}`,'#121212','center',P(t,B,1,1)*s0);txt(c,'It is already in the mind.',480,482,`italic 600 30px ${DISP}`,'#c0392b','center',P(t,B,1,1,1.4)*s0);}
  const s2=P(t,B,2,.8)*(1-P(t,B,3,.5));if(s2>0){c.save();c.globalAlpha=s2;const g=c.createLinearGradient(160,0,800,0);g.addColorStop(0,'#1a1a1a');g.addColorStop(1,'#f2f2f2');c.fillStyle=g;c.fillRect(160,130,640,240);
    c.fillStyle='#7f7f7f';c.fillRect(250,210,90,90);c.fillRect(620,210,90,90);
    const br=P(t,B,2,1,3.4)*(1-P(t,B,2,.8,6.4));if(br>0){c.globalAlpha=s2*br;c.fillStyle='#7f7f7f';c.fillRect(340,240,280,30);}
    c.globalAlpha=s2;txt(c,'same grey: #7f7f7f',480,410,`600 14px ${MONO}`,'#c0392b','center',P(t,B,2,1,3.4));c.restore();}
  const q=P(t,B,3,1,.5);txt(c,'“Messina must thank me!',480,240,`italic 600 40px ${DISP}`,'#121212','center',q);txt(c,'It is I who give her all her beauty.”',480,292,`italic 600 40px ${DISP}`,'#c0392b','center',P(t,B,3,1,1.7));
  heading(c,9,'Messina must thank me','percept',false);fig(c,s2>0?'LAB CARD 3.9 · SIMULTANEOUS CONTRAST (CHEVREUL, 1839)':'','Eastern & Western Disciples ch. 35',false);
};
SC.moon=(c,t,B)=>{egrid(c);const mr=P(t,B,0,3);const mx=820,my=lerp(260,130,mr);
  const g=c.createRadialGradient(mx,my,10,mx,my,220);g.addColorStop(0,'rgba(255,246,214,.6)');g.addColorStop(1,'rgba(255,246,214,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.fillStyle='#fff3d0';c.beginPath();c.arc(mx,my,42,0,7);c.fill();
  waves(c,t,280,52,7,['#163a5a','#1b4769','#205378','#265f86','#2d6c95']);
  const path=P(t,B,2,1.4);for(let i=0;i<14;i++){const y=300+i*17;c.fillStyle=`rgba(255,246,214,${(.55-i*.03)*(.3+.7*path)})`;c.fillRect(mx-50+Math.sin(t*2+i)*8-i*3,y,100+i*6,3);}
  c.save();c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=12;c.shadowOffsetY=6;c.fillStyle='#e6d2a6';c.beginPath();c.moveTo(80,350);c.lineTo(420,350);c.lineTo(390,392);c.lineTo(110,392);c.closePath();c.fill();c.fillRect(200,270,14,80);c.fillRect(300,250,14,100);c.restore();
  const px=lerp(140,360,(Math.sin(t*.5)+1)/2);c.fillStyle='#1a1410';c.beginPath();c.arc(px,316,9,0,7);c.fill();c.fillRect(px-7,325,14,25);
  txt(c,'“If all this Māyā is so beautiful,',480,90,`italic 600 30px ${DISP}`,'#f3ead4','center',P(t,B,1,1)*(1-P(t,B,2,.5)));txt(c,'think of the wondrous beauty of the Reality behind it!”',480,128,`italic 600 30px ${DISP}`,'#f3c27a','center',P(t,B,1,1,1.6)*(1-P(t,B,2,.5)));
  txt(c,'“Why recite poetry, when there',480,90,`italic 600 30px ${DISP}`,'#f3ead4','center',P(t,B,2,1));txt(c,'is the very essence of poetry?”',480,128,`italic 600 30px ${DISP}`,'#f3c27a','center',P(t,B,2,1,1.2));
  heading(c,10,'The Reality behind it','papercut',true,1-P(t,B,1,.5));fig(c,'','Eastern & Western Disciples ch. 35',true);
};
SC.home=(c,t,B)=>{paper(c);
  person(c,250,370,.62,ease(seg(t,0,2)),seg(t,1.6,2.6),{shawl:'#c8692c'});turban(c,250,370,.62,seg(t,1.6,2.6));
  const gl=P(t,B,0,1,1)*(1-P(t,B,1,.5));if(gl>0){c.save();c.globalAlpha=gl;c.strokeStyle=INK;c.lineWidth=4;c.fillStyle='#bcd2c8';c.beginPath();c.arc(640,260,130,0,7);c.fill();c.stroke();c.lineWidth=2;
    for(let i=-2;i<=2;i++){c.beginPath();c.ellipse(640,260,130*Math.cos(i*.5+t*.2),130,0,0,7);c.stroke();}for(let j=-2;j<=2;j++){c.beginPath();c.moveTo(640-Math.sqrt(130*130-(j*45)**2),260+j*45);c.lineTo(640+Math.sqrt(130*130-(j*45)**2),260+j*45);c.stroke();}
    c.strokeStyle='#a8382a';c.lineWidth=3;c.setLineDash([4,6]);c.beginPath();c.ellipse(640,260,160,60,-.2,0,Math.PI*2*P(t,B,0,2,1.4));c.stroke();c.setLineDash([]);c.restore();}
  const eq=P(t,B,1,1)*(1-P(t,B,2,.5));if(eq>0){txt(c,'time · space · causation',660,190,`600 34px ${DISP}`,INK,'center',eq);txt(c,'= forms of the mind',660,230,`italic 600 26px ${DISP}`,INK,'center',eq);txt(c,'KANT',660,256,`600 12px ${MONO}`,'#a8382a','center',eq);
    txt(c,'beyond them: your own Self',660,330,`600 34px ${DISP}`,'#a8382a','center',P(t,B,1,1,2.4)*(1-P(t,B,2,.5)));txt(c,'THE UPANISHADS',660,356,`600 12px ${MONO}`,'#a8382a','center',P(t,B,1,1,2.4)*(1-P(t,B,2,.5)));}
  const up=P(t,B,2,1)*(1-P(t,B,3,.5));if(up>0){c.save();c.globalAlpha=up;leaf(c,430,170,480,170);txt(c,'यतो वा इमानि भूतानि जायन्ते',670,250,`30px ${DEV}`,INK,'center');txt(c,'TAITTIRIYA UPANISHAD 3.1',670,290,`600 12px ${MONO}`,'#5a3e22','center');c.restore();}
  const aw=P(t,B,3,1);if(aw>0){txt(c,'उत्तिष्ठत जाग्रत',670,190,`50px ${DEV}`,INK,'center',aw);txt(c,'Arise, awake, and stop not',670,240,`italic 600 30px ${DISP}`,'#a8382a','center',P(t,B,3,1,.8));txt(c,'till the goal is reached.',670,276,`italic 600 30px ${DISP}`,'#a8382a','center',P(t,B,3,1,1.4));
    txt(c,'KANT & VEDANTA · END OF THE SERIES',910,450,`600 12px ${MONO}`,'#6b5434','right',P(t,B,3,1,3));}
  heading(c,11,'Arise, awake','kalighat',false);fig(c,'','Raja-Yoga, Introduction · Calcutta Address and Reply',false);
};
