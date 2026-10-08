const SC={};
const SRC1='FIRST PUBLIC LECTURE IN THE EAST · COLOMBO · 16.01.1897 · CW VOL. 3';
const dur=(B,i)=>i+1<B.length?B[i+1]-B[i]:6;
const ROUTEPTS=ROUTE.map(r=>[r[1],r[2]]);
function stopsUpTo(c,pr,frac,col){let tot=0;const P_=ROUTEPTS;const cum=[0];for(let i=1;i<P_.length;i++){tot+=Math.hypot(P_[i][0]-P_[i-1][0],P_[i][1]-P_[i-1][1]);cum.push(tot);}
  STOPS.forEach(s=>{const i=s.films[0]-1;if(cum[i]/tot>frac+.001)return;const big=['Colombo','Jaffna','Madras','Calcutta','Almora','Lahore','Dacca','Khetri','Sialkot','Madura'].includes(s.n);hdot(c,pr,[s.lo,s.la],big?s.n.toUpperCase()+' · '+s.films[0]+(s.films.length>1?'–'+s.films[s.films.length-1]:''):'',i===0?HX.sf:col,1,{r:i===0?5.5:3.5,sz:11,dx:['Lahore','Sialkot','Khetri'].includes(s.n)?-10:10});});}
function arrowHUD(c,p,q,col){const a=Math.atan2(q[1]-p[1],q[0]-p[0]);c.strokeStyle=col;c.fillStyle=col;c.lineWidth=2;c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1]);c.stroke();c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(q[0]-8*Math.cos(a-.5),q[1]-8*Math.sin(a-.5));c.lineTo(q[0]-8*Math.cos(a+.5),q[1]-8*Math.sin(a+.5));c.closePath();c.fill();}

SC.arrive=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);const d0=dur(B,0),k0=eo(seg(l,0,d0));
  const poses=[[lerp(70,79,k0),lerp(2,7,k0),lerp(36,14,k0),lerp(.6,.92,k0),0],[79.9,7.4,9+l*.4,.98,l*.03],[79.5,10.5,20,.78,-.1],[82,18,36,.66,-.05],[81,19,46,.58,l*.02]];
  const pr=cam(...poses[i]);hgrid(c,pr);world(c,pr);
  if(i<=1){const sp=eo(seg(t,.2,B[1]+.3));const last=arc3(c,pr,[58,1],PLACES.COLOMBO,3,sp,rgba(HX.sf,.9),2.4);if(last&&sp<1)glow(c,last[0],last[1],18,HX.sf);
    const p=hdot(c,pr,PLACES.COLOMBO,'',HX.sf,1,{r:6});if(p){reticle(c,p[0],p[1],i===0?seg(l,d0-1.4,d0-.4):1,HX.sf,t,i===0?seg(l,d0-1.6,d0-1.2):1);
      if(i===0&&l>d0-1.2)chroma(c,'LANDFALL · COLOMBO · 15.01.1897',p[0]+40,p[1]-36,`500 14px ${HM}`,HX.sf,'left',Math.exp(-(l-d0+1.2)*5));}
    ht(c,'FROM THE WEST ▸',40,H/2,`500 12px ${HM}`,HX.sf,'left',i===0?seg(l,.3,.8)*(1-seg(l,d0-1.6,d0-1.2)):0);
    if(i===1){panel(c,40,300,300,150,HX.cy,1,'VOYAGE LOG');[['ORIGIN','THE WEST'],['ARRIVAL','15 JAN 1897'],['STATUS','HOME']].forEach(([a,b],k)=>{ht(c,a,58,346+k*32,`500 12px ${HM}`,rgba(HX.cy,.7));decode(c,b,320,346+k*32,`500 15px ${HM}`,k===2?HX.sf:HX.ink,seg(l,.2+k*.3,.9+k*.3),k+3,'right');});}}
  else{const fr=i===2?lerp(0,.31,seg(l,0,dur(B,2)-.3)):i===3?lerp(.31,.62,seg(l,0,dur(B,3)-.3)):lerp(.62,1,seg(l,0,2.4));const pos=route(c,pr,ROUTEPTS,fr,rgba(HX.sf,.9),2.4);if(pos)glow(c,pos[0],pos[1],22,HX.sf);stopsUpTo(c,pr,fr,HX.cy);
    if(i===4){panel(c,36,90,250,96,HX.sf,seg(l,1.6,2),'SERIES');ht(c,'29',60,150,`64px ${HD}`,HX.sf,'left',seg(l,1.6,2));decode(c,'TALKS · 01 ▸ COLOMBO',118,150,`500 13px ${HM}`,HX.ink,seg(l,1.8,3),9);}}
  hudHead(c,1,'Landfall at Colombo','map');hudSrc(c,'CONTENTS PAGE · '+SRC1);hudFX(c,t,B);
};

SC.welcome=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);const G=HX.gd;
  if(i<=1){const r=rng(4);const lt=l+(i?9:0);for(let k=0;k<90;k++){const x=480+(r()-.5)*820,y=320+r()*190,s=.16+r()*.08,o=r()*.8;figure(c,x,y,s,rgba(HX.cy,.5+r()*.3),seg(lt,o,o+.4));}
    panel(c,250,70,460,170,G,1,'ADDRESS OF WELCOME');decode(c,'THE HINDUS OF COLOMBO',480,120,`40px ${HD}`,HX.ink,seg(lt,.2,1.2),2,'center');
    ht(c,'P. COOMARA SWAMY · CHAIRMAN   ·   A. KULAVEERASINGHAM · SECRETARY',480,160,`500 11px ${HM}`,rgba(G,.8),'center');
    if(i===1){decode(c,'A UNIVERSAL RELIGION',480,196,`500 16px ${HM}`,G,seg(l,.2,1.4),3,'center');decode(c,'HARMONISING ALL CREEDS',480,220,`500 16px ${HM}`,G,seg(l,1,2.2),4,'center');}}
  if(i===2||i===3){figure(c,190,470,.95,HX.cy,1,{turban:1});panel(c,380,90,520,390,G,1,'IDENTIFICATION · WHOM DO THEY HONOUR?');
    [['A GREAT POLITICIAN',0],['A GREAT SOLDIER',0],['A MILLIONAIRE',0],['A BEGGING SANNYASIN',1]].forEach(([s,ok],k)=>{const y=160+k*74,a=i===2?(k<3?seg(l,.4+k*.4,.8+k*.4):0):1;if(a<=0)return;ht(c,s,410,y,`${ok?34:28}px ${HD}`,ok?HX.sf:HX.ink,'left',a);
      const m=i===3?seg(l,k*.8,k*.8+.3):0;if(m>0){ht(c,ok?'MATCH ✓':'NO MATCH',880,y,`600 13px ${HM}`,ok?HX.gr:HX.rd,'right',m);if(!ok){c.strokeStyle=rgba(HX.rd,.9);c.lineWidth=3;c.beginPath();c.moveTo(406,y);c.lineTo(406+300*eo(m),y);c.stroke();}}});
    if(i===3)reticle(c,190,320,seg(l,2.4,3),HX.sf,t,seg(l,2.2,2.5));}
  if(i===4){const cx=300;for(let k=0;k<11;k++){const y=96+k*36,a=seg(l,k*.06,k*.06+.3);c.save();c.globalAlpha=a;c.strokeStyle=HX.cy;c.lineWidth=2;c.beginPath();c.ellipse(cx,y,34-Math.abs(k-5)*1.5,12,0,0,7);c.stroke();c.beginPath();c.moveTo(cx-34,y);c.lineTo(cx-56,y-8);c.moveTo(cx+34,y);c.lineTo(cx+56,y-8);c.stroke();c.restore();}
    glow(c,cx,280,160,HX.sf,.25+.1*Math.sin(t*4));ht(c,'RELIGION',cx-90,280,`600 13px ${HM}`,HX.sf,'right',seg(l,.4,.8));
    panel(c,470,150,430,220,HX.cy,1,'NATIONAL LIFE · STRUCTURE');ht(c,'THE BACKBONE',500,230,`52px ${HD}`,HX.ink,'left',seg(l,.6,1));decode(c,'IF THE NATION IS TO LIVE',500,300,`500 15px ${HM}`,HX.sf,seg(l,1.2,2.4),6);heartbeat(c,440,t,HX.sf,40,seg(l,1.6,2.2));}
  if(i===5){const pr=cam(0,0,28,.38,-.35+l*.04);hgrid(c,pr,HX.cy,1,2);const bp=seg(l,0,1.2);
    const seg3=(a,b,col)=>{const A=pr(...a),Bp=pr(...b);if(A&&Bp){c.strokeStyle=col;c.beginPath();c.moveTo(A[0],A[1]);c.lineTo(Bp[0],Bp[1]);c.stroke();}};c.lineWidth=2;
    const corners=[[-8,-4],[8,-4],[8,4],[-8,4]];corners.forEach((p,k)=>{const q=corners[(k+1)%4];seg3([p[0],p[1],0],[q[0],q[1],0],HX.cy);seg3([p[0],p[1],6*bp],[q[0],q[1],6*bp],HX.cy);seg3([p[0],p[1],0],[p[0],p[1],6*bp],HX.cy);});
    for(let k=0;k<7;k++)seg3([-6+k*2,-4.4,0],[-6+k*2,-4.4,5.6*bp],HX.sf);seg3([-8.6,-4.6,6*bp],[0,-4.6,9*bp],HX.cy);seg3([0,-4.6,9*bp],[8.6,-4.6,6*bp],HX.cy);
    panel(c,40,380,340,100,HX.sf,seg(l,.6,1),'VENUE LOCK');ht(c,'FLORAL HALL',60,430,`36px ${HD}`,HX.ink,'left',seg(l,.8,1.2));decode(c,'16.01.1897 · EVENING',360,456,`500 12px ${HM}`,HX.sf,seg(l,1,2),8,'right');}
  hudHead(c,2,'The welcome','dossier');hudSrc(c,'ADDRESS OF WELCOME AND REPLY · '+SRC1,G);hudFX(c,t,B,G);
};

SC.punya=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);
  if(i===0){const pr=cam(20,30,95,.5,0);hgrid(c,pr,HX.cy,1,10);world(c,pr);[[[-87.6,41.9],'AMERICA'],[PLACES.LONDON,'ENGLAND']].forEach(([d,n],k)=>{const p=seg(l,.2+k*.5,2.2+k*.5);const e=arc3(c,pr,[80,22],d,18,p,rgba(HX.sf,.9),2.4);if(e)glow(c,e[0],e[1],16,HX.sf);hdot(c,pr,d,n,HX.cy,seg(p,.95,1));});
    hdot(c,pr,[80,22],'MOTHERLAND',HX.sf,1,{r:6});ht(c,'THE BLESSINGS THAT FOLLOWED MY PATH',W/2,H-70,`500 15px ${HM}`,HX.sf,'center',seg(l,1,1.6));}
  if(i===1){panel(c,180,150,600,240,HX.cy,1,'INNER STATE · CALIBRATION');ht(c,'AN EMOTIONAL NATURE',220,230,`500 14px ${HM}`,rgba(HX.ink,.7));hbar(c,220,250,520,14,.35,rgba(HX.cy,.6));
    ht(c,'THE CERTAINTY OF CONVICTION',220,310,`500 14px ${HM}`,HX.sf);hbar(c,220,330,520,14,eo(seg(l,.6,2.6)),HX.sf);ht(c,`${Math.round(eo(seg(l,.6,2.6))*100)}%`,740,296,`36px ${HD}`,HX.sf,'right');}
  if(i===2){glow(c,W/2,260,260,HX.sf,.25);decode(c,'पुण्यभूमि',W/2,250,`110px ${DEV}`,HX.ink,seg(l,0,1.4),12,'center');ht(c,'PUNYA BHUMI',W/2,350,`44px ${HD}`,HX.sf,'center',seg(l,1.2,1.6));decode(c,'THE LAND OF KARMA',W/2,396,`500 15px ${HM}`,HX.cy,seg(l,1.6,2.6),13,'center');brackets(c,W/2-300,140,600,290,HX.sf);}
  if(i===4){const pr=cam(80,18,40,.62,l*.03);hgrid(c,pr);world(c,pr,HX.cy,1,rgba(HX.sf,.10));const r=rng(8);for(let k=0;k<40;k++){const a0=r()*6.283,d0=26+r()*14,u=((l*.18+r())%1);const lo=80+Math.cos(a0)*d0*(1-eo(u)),la=18+Math.sin(a0)*d0*(1-eo(u))*.7;const p=pr(lo,la,3);if(p)glow(c,p[0],p[1],8,HX.sf,1-u*.5);}
    hdot(c,pr,[80,20],'',HX.sf,1,{r:7});ht(c,'EVERY SOUL WENDING ITS WAY GODWARD',W/2,92,`500 15px ${HM}`,HX.sf,'center',seg(l,.4,1));ht(c,'▸ ITS LAST HOME',W/2,H-60,`36px ${HD}`,HX.ink,'center',seg(l,1.6,2.2));}
  if(i===6){const pr=cam(60,25,90,.5,l*.02);hgrid(c,pr,HX.cy,1,10);world(c,pr,HX.cy,1,rgba(HX.sf,.12));for(let k=0;k<6;k++){const rr=((l*7+k*9)%54);c.strokeStyle=rgba(HX.sf,(1-rr/54)*.8);c.lineWidth=2;c.beginPath();let on=false;for(let a=0;a<=64;a++){const an=a/64*6.283;const p=pr(80+Math.cos(an)*rr*1.4,22+Math.sin(an)*rr);if(!p){on=false;continue;}on?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);on=true;}c.stroke();}
    ['EAST','WEST','NORTH','SOUTH'].forEach((s,k)=>ht(c,s,[880,80,480,480][k],[H/2,H/2,90,H-60][k],`500 13px ${HM}`,HX.cy,'center',seg(l,.6+k*.3,1+k*.3)));
    chroma(c,'TIDAL WAVES OF PHILOSOPHY',W/2,H/2+120,`46px ${HD}`,HX.ink,'center',Math.exp(-l*3),seg(l,.2,.6));}
  hudHead(c,3,'Punya Bhumi','map');hudSrc(c,SRC1);hudFX(c,t,B);
};

SC.sword=(c,t,B)=>{const {i,l}=beat(t,B);const red=i===1||i===3;hbg(c,red);
  if(i===0){panel(c,140,120,680,300,HX.cy,1,'LEDGER · WHAT THE WORLD OWES');[['GREECE',.3],['ROME',.35],['PERSIA',.28],['INDIA · THE MILD HINDU',1]].forEach(([n,v],k)=>{const y=180+k*56;ht(c,n,170,y,`500 13px ${HM}`,k===3?HX.sf:HX.ink);hbar(c,420,y-8,360,16,v*eo(seg(l,.3+k*.25,1.2+k*.25)),k===3?HX.sf:rgba(HX.cy,.7));});}
  if(i===1){const pr=cam(22,40,24,.66,l*.03);hgrid(c,pr,HX.rd,.8);world(c,pr,HX.rd,.8);for(let k=0;k<27;k++){const row=k%3,col=Math.floor(k/3);const lo=14+col*1.6+l*1.5,la=37+row*1.2;const p=pr(lo,la),q=pr(lo+.8,la);if(p&&q)arrowHUD(c,p,q,HX.rd);}
    chroma(c,'WAR TRUMPETS · EMBATTLED COHORTS',W/2,96,`40px ${HD}`,'#ffd9dc','center',Math.exp(-l*4),seg(l,.2,.5));}
  if(i===3){spectrum(c,t,eo(seg(l,0,1)),HX.rd);['THE GROANS OF MILLIONS','THE WAILS OF ORPHANS','THE TEARS OF WIDOWS'].forEach((s,k)=>chroma(c,s,W/2,150+k*70,`48px ${HD}`,'#ffd9dc','center',l>k*.8?Math.exp(-(l-k*.8)*5):0,seg(l,k*.8,k*.8+.2)));}
  if(i===4){const pr=cam(70,22,70,.55,l*.02);hgrid(c,pr,HX.cy,1,10);world(c,pr,HX.cy,1,rgba(HX.sf,.12));['ATHENS','ROME','PERSEPOLIS','PEKING','ALEXANDRIA','LONDON'].forEach((n,k)=>{const p=eo(seg(l,.2+k*.25,1.6+k*.25));const e=arc3(c,pr,[80,22],PLACES[n],10,p,rgba(HX.sf,.85),2);if(e&&p>.98)glow(c,e[0],e[1],14,'#fff2d0');});
    panel(c,40,370,360,110,HX.sf,seg(l,1,1.4),'TRANSMISSION MODE');ht(c,'A BLESSING BEHIND IT',60,418,`500 15px ${HM}`,HX.ink,'left',seg(l,1.2,1.6));ht(c,'PEACE BEFORE IT',60,446,`500 15px ${HM}`,HX.sf,'left',seg(l,1.8,2.2));}
  hudHead(c,4,'Blood or blessing','alert');hudSrc(c,SRC1,red?HX.rd:HX.cy);hudFX(c,t,B,red?HX.rd:HX.cy);
};

SC.capitol=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);
  if(i===0||i===1){const tg=i?PLACES.ROME:PLACES.ATHENS;const pr=cam(tg[0]+l*.4,tg[1],i?12:16,.9,l*.02);hgrid(c,pr,HX.cy,1,2.5);world(c,pr);const p=hdot(c,pr,tg,'',HX.sf,1,{r:6});
    if(p){reticle(c,p[0],p[1],seg(l,0,.6),HX.sf,t);chroma(c,i?'ROME · 41.90N 12.50E':'GREECE · 37.98N 23.73E',p[0]+36,p[1]-34,`500 14px ${HM}`,HX.sf,'left',Math.exp(-l*6));}
    panel(c,600,330,320,140,i?HX.cy:HX.rd,1,'STATUS');ht(c,i?'DOMINANCE':'BATTALIONS',620,382,`500 13px ${HM}`,HX.ink);const v=i?eo(seg(l,.2,1.4)):1-eo(seg(l,1.6,2.8));hbar(c,620,398,280,16,v,i?HX.cy:HX.rd);
    ht(c,i?'THE EAGLE OVER EVERYTHING':'VANISHED',620,442,`${i?20:30}px ${HD}`,i?HX.ink:HX.rd,'left',i?seg(l,1,1.4):seg(l,2.6,3));}
  if(i===3){panel(c,120,110,720,330,HX.cy,1,'GLORIOUS NATIONS · LIFETIME');['ASSYRIA','BABYLON','PERSIA','CARTHAGE','GREECE','ROME'].forEach((n,k)=>{const x=240+(k%3)*240,y=210+Math.floor(k/3)*130;const u=((l*.5+k*.17)%1);c.strokeStyle=rgba(HX.cy,(1-u)*.9);c.lineWidth=2;c.beginPath();c.ellipse(x,y,20+u*90,(20+u*90)*.35,0,0,7);c.stroke();ht(c,n,x,y,`500 12px ${HM}`,HX.ink,'center',1-u*.7);});
    ht(c,'RIPPLES ON THE FACE OF THE WATERS',480,410,`500 14px ${HM}`,HX.sf,'center',seg(l,.6,1.2));}
  if(i===4){const pr=cam(80,20,34,.7,l*.02);hgrid(c,pr);world(c,pr,HX.cy,1,rgba(HX.sf,.1));const p=hdot(c,pr,[80,24],'',HX.sf,1,{r:6});if(p)reticle(c,p[0],p[1],seg(l,0,.6),HX.sf,t);
    panel(c,40,330,380,150,HX.sf,1,'CONTINUITY CHECK');[['IF MANU CAME BACK TODAY',HX.ink],['A FOREIGN LAND?   NO',HX.gr],['THE SAME LAWS · UNBROKEN',HX.sf]].forEach(([s,col],k)=>decode(c,s,60,382+k*30,`500 14px ${HM}`,col,seg(l,.3+k*.6,1.1+k*.6),20+k));}
  if(i===5){heartbeat(c,H/2+60,t,HX.sf,90);glow(c,W/2,H/2+60,200,HX.sf,.2);chroma(c,'THE MAINSPRING',W/2,180,`80px ${HD}`,HX.ink,'center',Math.exp(-l*4));decode(c,'OF THE NATIONAL LIFE · IS HERE',W/2,240,`500 16px ${HM}`,HX.sf,seg(l,.6,2),31,'center');}
  hudHead(c,5,"A spider's web on the Capitol",'map');hudSrc(c,SRC1);hudFX(c,t,B);
};

SC.plough=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);const BL=HX.bl;
  if(i===0||i===1){panel(c,60,90,400,380,BL,1,'OTHER NATIONS · OCCUPATIONS');[['POLITICS',.82],['SOCIETY',.74],['WEALTH',.9],['THE SENSES',.86],['RELIGION',.08]].forEach(([n,v],k)=>{const y=150+k*62;ht(c,n,84,y,`500 13px ${HM}`,k===4?HX.sf:HX.ink);hbar(c,84,y+12,350,14,v*eo(seg(i?9:l,.2+k*.2,1+k*.2)),k===4?HX.sf:rgba(BL,.8));});
    if(i===1){panel(c,500,90,400,380,HX.sf,1,'INDIA · OCCUPATIONS');ht(c,'RELIGION',524,150,`500 13px ${HM}`,HX.sf);hbar(c,524,162,350,40,eo(seg(l,.3,1.6)),HX.sf);ht(c,'THE ONE AND THE ONLY',700,300,`40px ${HD}`,HX.ink,'center',seg(l,1.2,1.6));ht(c,'OCCUPATION OF LIFE',700,350,`40px ${HD}`,HX.sf,'center',seg(l,1.6,2));}}
  if(i===2){[['SINO-JAPANESE WAR','AWARENESS · VERY FEW, IF ANY',.06,HX.cy],['PARLIAMENT OF RELIGIONS · AMERICA','AWARENESS · EVEN THE POOREST LABOURER',.97,HX.sf]].forEach(([h,s,v,col],k)=>{const y=110+k*200,a=seg(l,k*1.2,k*1.2+.4);panel(c,100,y,760,160,col,a,'NEWS SIGNAL');decode(c,h,124,y+64,`34px ${HD}`,k?HX.ink:rgba(HX.ink,.5),seg(l,k*1.2,k*1.2+1),40+k,'left',a);ht(c,s,124,y+112,`500 12px ${HM}`,col,'left',a);hbar(c,560,y+104,270,14,v*seg(l,k*1.2+.4,k*1.2+1.4),col,a);});}
  if(i>=3){const west=i<=4;const fx=west?250:710;figure(c,fx,480,.95,west?BL:HX.sf,1,west?{hat:1}:{mark:i>=6});
    if(west){panel(c,450,110,450,330,BL,1,'DOSSIER · PLOUGHMAN · ENGLAND / AMERICA');const rows=i===3?[['PARTY','RADICAL OR CONSERVATIVE'],['VOTE','REPUBLICAN OR DEMOCRAT'],['THE SILVER QUESTION','KNOWS SOMETHING']]:[['RELIGION','GOES TO CHURCH'],['','BELONGS TO A DENOMINATION'],['','THAT IS ALL HE KNOWS']];
      rows.forEach(([a,b],k)=>{ht(c,a,474,180+k*80,`500 12px ${HM}`,rgba(BL,.9));decode(c,b,474,208+k*80,`28px ${HD}`,HX.ink,seg(l,.2+k*.7,1+k*.7),50+k+i*3);});}
    else{panel(c,60,110,450,330,HX.sf,1,'DOSSIER · PLOUGHMAN · INDIA');ht(c,'POLITICS',84,180,`500 12px ${HM}`,HX.sf);decode(c,'WHAT IS THAT?',84,212,`40px ${HD}`,HX.ink,seg(i===5?l:9,.3,1.2),61);ht(c,'RELIGION',84,290,`500 12px ${HM}`,HX.sf);
      if(i===5)ht(c,'AWAITING ANSWER…',84,322,`500 14px ${HM}`,rgba(HX.ink,.6),'left',.5+.5*Math.sin(t*6));
      if(i===7){ht(c,'MARKED ON HIS FOREHEAD',84,322,`28px ${HD}`,HX.sf,'left',seg(l,0,.3));chroma(c,"THAT IS OUR NATION'S LIFE",W/2,80,`40px ${HD}`,HX.ink,'center',Math.exp(-l*4),seg(l,.1,.4));heartbeat(c,500,t,HX.sf,30);}
      if(i>=6)glow(c,710,318,40,HX.rd,.6+.3*Math.sin(t*5));}}
  hudHead(c,6,"The ploughman's mark",'panel',i===7?1-seg(l,0,.2):1);hudSrc(c,SRC1,BL);hudFX(c,t,B,BL);
};

SC.dynamo=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);const G=HX.gr;
  if(i===0){const r=rng(6);for(let k=0;k<5;k++){const x=150+k*165,y=380,an=-Math.PI/2+(r()-.5)*1.6;figure(c,x,y,.55,rgba(G,.8),seg(l,k*.15,k*.15+.4));if(seg(l,.6+k*.15,1)>0)arrowHUD(c,[x,y-130],[x+Math.cos(an)*70,y-130+Math.sin(an)*70],HX.sf);}
    panel(c,200,420,560,70,G,seg(l,1.2,1.6),'');ht(c,'EACH MAN A BENT · EACH RACE A MISSION',480,455,`500 15px ${HM}`,G,'center',seg(l,1.4,1.8));}
  if(i===2||i===3){const cx=480,cy=290,lv=i===2?eo(seg(l,0,dur(B,2)-.2)):1;
    if(i===3){const d=eo(seg(l,0,2.4));for(let k=0;k<7;k++){const rr=((l*120+k*80)%560)*d;c.strokeStyle=rgba(HX.sf,(1-rr/560)*.7);c.lineWidth=3;c.beginPath();c.ellipse(cx,cy,60+rr,(60+rr)*.6,0,0,7);c.stroke();}}
    for(let k=0;k<12;k++){c.strokeStyle=rgba(G,.8);c.lineWidth=2;c.beginPath();c.ellipse(cx,cy-110+k*20,70,12,0,0,Math.PI);c.stroke();}c.strokeStyle=G;c.strokeRect(cx-70,cy-120,140,240);
    const g=c.createLinearGradient(0,cy+120,0,cy-120);g.addColorStop(0,'#ffb347');g.addColorStop(1,'#fff3c8');c.fillStyle=g;c.globalAlpha=.85;c.fillRect(cx-60,cy+116-232*lv,120,232*lv);c.globalAlpha=1;glow(c,cx,cy,180,HX.sf,lv*.5);
    panel(c,640,160,290,200,G,1,'DYNAMO · SPIRITUAL ENERGY');ht(c,`${Math.round(lv*100)}%`,660,240,`64px ${HD}`,HX.sf);ht(c,i===2?'CONSERVE · PRESERVE · ACCUMULATE':'POURED FORTH IN A DELUGE',660,300,`500 11px ${HM}`,G);ht(c,i===2?'':'WHEN CIRCUMSTANCES ARE PROPITIOUS',660,322,`500 11px ${HM}`,rgba(G,.8));}
  if(i===4){const pr=cam(45,30,70,.55,l*.02);hgrid(c,pr,G,1,10);world(c,pr,G,1);[['PERSEPOLIS','PERSIAN'],['ATHENS','GREEK'],['ROME','ROMAN'],['BAGHDAD','ARAB'],['LONDON','ENGLISHMAN']].forEach(([p,n],k)=>{const a=seg(l,k*.4,k*.4+.6);hdot(c,pr,PLACES[p],n,HX.cy,a);arc3(c,pr,PLACES[p],[80,22],8,a,rgba(HX.cy,.6),1.6);
      const u=((l*.5+k*.2)%1);const q=pr(lerp(80,PLACES[p][0],u),lerp(22,PLACES[p][1],u),Math.sin(Math.PI*u)*8);if(q&&a>=1)glow(c,q[0],q[1],12,HX.sf);});hdot(c,pr,[80,22],'INDIA',HX.sf,1,{r:6});
    ht(c,'FLOWING ALONG THE NEW-MADE CHANNELS',W/2,H-60,`500 15px ${HM}`,HX.sf,'center',seg(l,1.4,2));}
  hudHead(c,7,'Storing the light','sim');hudSrc(c,SRC1,G);hudFX(c,t,B,G);
};

SC.dew=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);const G=HX.gr;
  if(i===0){const pr=cam(50,28,70,.55,l*.02);hgrid(c,pr,G,1,10);world(c,pr,G,1,rgba(HX.sf,.12));const r=rng(2);for(let k=0;k<26;k++){const d=[-10+r()*140,r()*55];arc3(c,pr,[80,22],d,10,seg(l,.2+k*.06,1.6+k*.06),rgba(HX.sf,.55),1.4);}
    ht(c,'WHENEVER A CONQUERING NATION LINKED INDIA TO THE WORLD',W/2,90,`500 14px ${HM}`,HX.sf,'center',seg(l,.2,.8));}
  if(i===1){const pr=cam(40,40,46,.6,-.1+l*.02);hgrid(c,pr,G,1,5);world(c,pr,G,1);const chain=[[PLACES.DELHI,'THE UPANISHADS'],[PLACES.PERSEPOLIS,'PERSIAN'],[PLACES.PARIS,'LATIN · A YOUNG FRENCHMAN'],[PLACES.GERMANY,'SCHOPENHAUER']];
    chain.forEach(([p,n],k)=>{if(k)arc3(c,pr,chain[k-1][0],p,6,seg(l,k*.9-.4,k*.9+.3),rgba(HX.sf,.9),2.2);hdot(c,pr,p,n,k===3?HX.sf:HX.cy,seg(l,k*.9,k*.9+.3),{dx:k===3?-10:10});});}
  if(i===2){panel(c,90,110,780,320,G,1,'INTERCEPT · SCHOPENHAUER');['IN THE WHOLE WORLD THERE IS NO STUDY','SO BENEFICIAL AND SO ELEVATING','AS THAT OF THE UPANISHADS.'].forEach((s,k)=>decode(c,s,120,190+k*46,`34px ${HD}`,HX.ink,seg(l,k,k+1.4),70+k));
    ['IT HAS BEEN THE SOLACE OF MY LIFE,','IT WILL BE THE SOLACE OF MY DEATH.'].forEach((s,k)=>decode(c,s,120,350+k*30,`500 16px ${HM}`,HX.sf,seg(l,3.4+k*.9,4.6+k*.9),80+k));}
  if(i===4){glow(c,W/2,H/2,300,HX.sf,.2);decode(c,'FASCINATION',W/2,H/2-10,`150px ${HD}`,HX.sf,seg(l,0,1.6),90,'center');ht(c,'A CHARM, IMPERCEPTIBLY · TO THOSE WHO PERSEVERE',W/2,H/2+90,`500 14px ${HM}`,HX.ink,'center',seg(l,1.4,2));}
  if(i===6){const pr=cam(0,0,26,.42,l*.03);hgrid(c,pr,G,1,2);for(let k=0;k<60;k++){const x=-14+(k%12)*2.5,z=-6+Math.floor(k/12)*3;const grow=eo(seg(l,.4+hash(k)*1.8,1.4+hash(k)*1.8));const a=pr(x,z,0),b=pr(x,z,grow*2.6);if(a&&b){c.strokeStyle=rgba(G,.8);c.lineWidth=1.6;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();if(grow>.95)glow(c,b[0],b[1],10,'#ff8a9a',.8);}
      const u=((l*.6+hash(k*3))%1);const d=pr(x,z,8*(1-u));if(d)glow(c,d[0],d[1],5,'#bfefff',.9*(1-u));}
    ht(c,'SLOW AND SILENT · UNSEEN AND UNHEARD',W/2,92,`500 15px ${HM}`,HX.cy,'center',seg(l,.2,.8));chroma(c,'UPON THE WORLD OF THOUGHT',W/2,H-70,`44px ${HD}`,HX.ink,'center',l>1.5?Math.exp(-(l-1.5)*4):0,seg(l,1.5,1.8));}
  hudHead(c,8,'Like the gentle dew','sim');hudSrc(c,SRC1,G);hudFX(c,t,B,G);
};

SC.porcelain=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c,i===4);const BL=HX.bl;
  if(i===0){const cx=W/2,cy=H/2;c.strokeStyle=BL;c.lineWidth=4;c.beginPath();c.arc(cx,cy,110,t*1.5,t*1.5+Math.PI*1.6);c.stroke();const ea=t*1.5+Math.PI*1.6;arrowHUD(c,[cx+Math.cos(ea-.2)*110,cy+Math.sin(ea-.2)*110],[cx+Math.cos(ea)*110,cy+Math.sin(ea)*110],BL);ht(c,'HISTORY',cx,cy-12,`44px ${HD}`,HX.ink,'center');ht(c,'REPEAT ▸ ONCE MORE',cx,cy+30,`500 13px ${HM}`,HX.sf,'center',seg(l,.4,.8));}
  if(i===1){const sy=lerp(80,460,(l*.5)%1);c.fillStyle=rgba(BL,.15);c.fillRect(0,sy-20,W,40);c.strokeStyle=BL;c.lineWidth=1;c.beginPath();c.moveTo(0,sy);c.lineTo(W,sy);c.stroke();
    panel(c,330,140,300,260,HX.rd,1,'OLD BELIEFS');const cr=eo(seg(l,.6,2.2));c.strokeStyle=HX.rd;c.lineWidth=2.5;c.beginPath();c.moveTo(470,150);c.lineTo(lerp(470,500,cr),lerp(150,230,cr));c.lineTo(lerp(470,450,cr),lerp(150,300,cr));c.lineTo(lerp(470,490,cr),lerp(150,390,cr));c.stroke();
    ht(c,'UNDER THE BLASTING LIGHT OF MODERN SCIENCE',W/2,470,`500 14px ${HM}`,BL,'center',seg(l,.4,1));ht(c,`INTEGRITY ${Math.round((1-cr)*100)}%`,612,170,`500 11px ${HM}`,HX.rd,'right');}
  if(i===2){const k=eo(seg(l,.6,2));const pcs=[[-40,-90,40,-90,30,-20,-30,-20],[-30,-20,30,-20,55,40,-55,40],[-55,40,55,40,40,110,-40,110]];c.save();c.translate(W/2,H/2-20);pcs.forEach((p,j)=>{c.save();c.translate((j-1)*90*k+(j===1?50*k:0),k*k*60*(j+1));c.rotate((j-1)*.7*k);c.strokeStyle=BL;c.lineWidth=2;c.fillStyle=rgba(BL,.12);c.beginPath();c.moveTo(p[0],p[1]);for(let q=2;q<8;q+=2)c.lineTo(p[q],p[q+1]);c.closePath();c.fill();c.stroke();c.restore();});c.restore();
    ht(c,'ANTIQUATED ORTHODOXIES',W/2,90,`500 14px ${HM}`,HX.sf,'center');chroma(c,'PULVERISED',W/2,H-70,`56px ${HD}`,HX.ink,'center',l>1?Math.exp(-(l-1)*4):0,seg(l,1,1.2));}
  if(i===3){ht(c,'THE WORLD',300,250,`500 13px ${HM}`,HX.ink,'center');c.strokeStyle=BL;c.lineWidth=2;c.beginPath();c.ellipse(300,290,60,14,0,0,7);c.stroke();ht(c,'A LITTLE MUD-PUDDLE',300,330,`26px ${HD}`,BL,'center',seg(l,.4,.8));
    c.strokeStyle=rgba(HX.ink,.6);c.beginPath();c.moveTo(520,290);c.lineTo(900,290);c.stroke();c.fillStyle=HX.rd;c.fillRect(860,280,4,20);ht(c,'TIME BEGAN · BUT THE OTHER DAY',860,320,`500 12px ${HM}`,HX.rd,'right',seg(l,1,1.6));}
  if(i===4){['EVOLUTION','CONSERVATION OF ENERGY'].forEach((s,k)=>chroma(c,s,W/2,170+k*90,`64px ${HD}`,'#ffd9dc','center',l>k*.9?Math.exp(-(l-k*.9)*5):0,seg(l,k*.9,k*.9+.15)));panel(c,320,360,320,80,HX.rd,seg(l,1.8,2),'TARGET');ht(c,'CRUDE THEOLOGIES · FAILING',480,410,`500 14px ${HM}`,HX.rd,'center',seg(l,2,2.4)*(.6+.4*Math.sin(t*12)));}
  if(i===5){const pr=cam(0,0,lerp(30,90,eo(seg(l,0,4))),.35,l*.05);hgrid(c,pr,BL,1,4);glow(c,W/2,H/2-40,300,HX.sf,.18);chroma(c,'VEDANTA',W/2,H/2-40,`110px ${HD}`,HX.ink,'center',Math.exp(-l*3));
    ['THE ONENESS OF ALL','THE ETERNAL SOUL OF MAN','TIME · SPACE · CAUSATION ∞'].forEach((s,k)=>decode(c,s,W/2,H/2+50+k*30,`500 15px ${HM}`,HX.sf,seg(l,.8+k*.6,1.8+k*.6),100+k,'center'));}
  hudHead(c,9,'Porcelain cracks',i===4?'alert':'panel');hudSrc(c,SRC1,BL);hudFX(c,t,B,i===4?HX.rd:BL);
};

SC.yugas=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);const S=HX.sf;
  if(i===0){panel(c,60,170,400,200,S,1,'EXPORT');ht(c,'PRINCIPLES',260,270,`56px ${HD}`,HX.ink,'center',seg(l,.2,.6));ht(c,'▸ TO THE WORLD',260,320,`500 13px ${HM}`,S,'center',seg(l,.6,1));panel(c,500,170,400,200,HX.cy,1,'LOCAL');ht(c,'CUSTOMS',700,270,`56px ${HD}`,rgba(HX.ink,.6),'center',seg(l,.6,1));ht(c,'▸ NOT IN THE CATEGORY OF RELIGION',700,320,`500 12px ${HM}`,HX.cy,'center',seg(l,1,1.4));}
  if(i>=1){panel(c,60,100,400,380,S,1,'CHANNEL A · SHRUTI');panel(c,500,100,400,380,HX.cy,i>=4?1:.35,'CHANNEL B · SMRITI · PURANA');decode(c,'श्रुति',260,170,`58px ${DEV}`,HX.ink,seg(i===1?l:9,.2,1.2),5,'center');decode(c,'स्मृति · पुराण',700,170,`46px ${DEV}`,HX.ink,seg(i===1?l:9,.6,1.6),6,'center');
    if(i===1)ht(c,'TWO SETS OF TRUTHS',W/2,H-30,`500 14px ${HM}`,S,'center',seg(l,.8,1.4));
    if(i>=2){[['आत्मा','THE SOUL'],['ईश्वर','GOD'],['पूर्णता','PERFECTION'],['सृष्टि','PROJECTION'],['कल्प','CYCLICAL PROCESSION']].forEach(([d,e],k)=>{const p=i===2?seg(l,k*.7,k*.7+.8):1;decode(c,d,90,236+k*44,`30px ${DEV}`,HX.ink,p,10+k);ht(c,e,230,238+k*44,`500 13px ${HM}`,S,'left',p);});
      if(i>=3)ht(c,'ABIDES FOR EVER · UNIVERSAL LAWS IN NATURE',260,462,`500 11px ${HM}`,HX.gr,'center',i===3?seg(l,.3,.8):1);}
    if(i>=4){const flip=i===5?Math.floor(l/1.1)%4:0;[['MINOR LAWS','OF EVERYDAY LIFE'],['MANNERS','AND CUSTOMS'],['SOCIAL','WELL-BEING']].forEach(([a,b],k)=>{const y=246+k*60,p=i===4?seg(l,k*.6,k*.6+.8):1;decode(c,a,530,y,`28px ${HD}`,HX.ink,p,30+k+flip*7);ht(c,b,530,y+22,`500 11px ${HM}`,HX.cy,'left',p);});
      if(i===5){['सत्य','त्रेता','द्वापर','कलि'].forEach((y,k)=>ht(c,y,560+k*88,430,`28px ${DEV}`,k===flip?S:rgba(HX.ink,.35),'center'));ht(c,'YUGA AFTER YUGA · CUSTOMS CHANGE',700,462,`500 11px ${HM}`,S,'center');}}}
  if(i===5)chroma(c,'GREAT RISHIS WILL APPEAR',W/2,62,`26px ${HD}`,HX.sf,'center',l>2?Math.exp(-(l-2)*4):0,seg(l,2,2.3));
  hudHead(c,10,'Shruti and Smriti','signal',i===5?1-seg(l,1.8,2):1);hudSrc(c,SRC1,S);hudFX(c,t,B,S);
};

SC.tribes=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c,i===4);const G=HX.gr;
  const N=[[200,330,'1'],[340,250,'2'],[480,330,'3'],[620,250,'4'],[760,330,'5']];
  if(i<=4){const dom=i>=2?eo(seg(i===2?l:9,.2,1.6)):0;N.forEach(([x,y,n],k)=>{const big=(k===1||k===3)?1+dom*.9:1-dom*.35;const a=seg(i===0?l:9,k*.2,k*.2+.5);c.save();c.globalAlpha=a;c.strokeStyle=k<3?G:HX.cy;c.lineWidth=2;c.beginPath();c.arc(x,y,26*big,0,7);c.stroke();c.fillStyle=c.strokeStyle;c.beginPath();c.arc(x,y,6,0,7);c.fill();c.restore();ht(c,'TRIBE '+n,x,y+40+26*big,`500 10px ${HM}`,rgba(HX.ink,.7),'center',a);});
    if(i>=1){[[[0,1,2],G],[[3,4],HX.cy]].forEach(([ids,col])=>{ids.forEach((a,j)=>ids.forEach((b,m)=>{if(m<=j)return;c.strokeStyle=rgba(col,.5);c.lineWidth=1.5;c.beginPath();c.moveTo(N[a][0],N[a][1]);c.lineTo(N[b][0],N[b][1]);c.stroke();}));});
      const nm=i>=3?['BAAL-MERODACH','MOLOCH-YAHVEH']:['BAAL','MOLOCH'];ht(c,nm[0],290,150,`${i>=3?28:30}px ${HD}`,G,'center',i===1?seg(l,.2,.6):1);ht(c,nm[1],670,150,`${i>=3?28:30}px ${HD}`,HX.cy,'center',i===1?seg(l,.6,1):1);
      if(i>=3){ht(c,'THE GREATEST GOD',290,184,`500 11px ${HM}`,G,'center');ht(c,'OVER ALL OTHER MOLOCHS',670,184,`500 11px ${HM}`,HX.cy,'center');}}
    if(i===4){for(let k=0;k<10;k++){const u=((l*1.5+k*.1)%1);glow(c,lerp(380,580,u),250+Math.sin(u*9+k)*20,16,HX.rd,1-u);}chroma(c,'DECIDED BY THE FORTUNES OF BATTLE',W/2,460,`40px ${HD}`,'#ffd9dc','center',Math.exp(-l*4));}}
  if(i===5){const pr=cam(80,20,34,.7,l*.02);hgrid(c,pr,G);world(c,pr,G);[[[76,24],'SHIVA'],[[85,22],'VISHNU']].forEach(([p,n],k)=>{const q=hdot(c,pr,p,n,k?HX.cy:G,1,{r:8,sz:14,dx:k?12:-12});if(q)glow(c,q[0],q[1],40+20*Math.sin(t*4+k*3),k?HX.cy:G,.5);});
    ht(c,'IN INDIA TOO · COMPETING GODS',W/2,H-60,`500 15px ${HM}`,HX.sf,'center',seg(l,.4,1));}
  hudHead(c,11,'Gods of the tribes',i===4?'alert':'sim');hudSrc(c,SRC1,G);hudFX(c,t,B,i===4?HX.rd:G);
};

SC.ekam=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);const S=HX.sf;
  if(i===0){const r=rng(5);const W_=['MY GOD IS TRUE','YOURS IS NOT','SHIVA','VISHNU','A GOOD FIGHT','MINE','BAAL','MOLOCH'];for(let k=0;k<30;k++){const x=(r()*W+t*(r()-.5)*200+W*2)%W,y=80+r()*400;decode(c,W_[k%W_.length],x,y,`500 ${12+Math.floor(r()*10)}px ${HM}`,rgba(HX.ink,.25+r()*.4),.4,k+Math.floor(t*4),'center');}
    panel(c,200,220,560,100,S,seg(l,1,1.4),'');ht(c,'OUT OF THE DIN AND CONFUSION · A VOICE',W/2,270,`500 16px ${HM}`,S,'center',seg(l,1.2,1.6));}
  if(i===2||i===4){glow(c,W/2,200,240,S,.2);decode(c,'एकं सद्विप्रा बहुधा वदन्ति',W/2,170,`64px ${DEV}`,HX.ink,i===2?seg(l,0,1.8):1,7,'center');ht(c,'THAT WHICH EXISTS IS ONE · SAGES CALL IT BY VARIOUS NAMES',W/2,226,`500 11px ${HM}`,S,'center');
    if(i===2){const nm=['SHIVA','VISHNU','…','A HUNDRED OTHER NAMES'];glow(c,W/2,380,40,'#fff2d0');nm.forEach((n,k)=>{const a=t*.6+k*Math.PI*2/nm.length;ht(c,n,W/2+Math.cos(a)*250,380+Math.sin(a)*70,`500 14px ${HM}`,k%2?HX.cy:S,'center',seg(l,1+k*.3,1.4+k*.3));});ht(c,'THE SAME ONE',W/2,380,`500 12px ${HM}`,'#3a2a10','center');}
    if(i===4){for(let k=0;k<4;k++){const y=290+k*34;ht(c,'एकं सद्विप्रा बहुधा वदन्ति · एकं सद्विप्रा बहुधा वदन्ति · एकं सद्विप्रा बहुधा वदन्ति',((l*60*(k%2?1:-1))%300)-150+W/2,y,`20px ${DEV}`,rgba(S,.25+.15*k),'center',seg(l,k*.3,k*.3+.5));}heartbeat(c,450,t,HX.rd,40);ht(c,'IN EVERY DROP OF BLOOD · THE LAND OF TOLERATION',W/2,500,`500 13px ${HM}`,HX.ink,'center',seg(l,1.2,1.8));}}
  if(i===5){[[60,'DUALIST','THE ETERNAL SERVANT OF GOD'],[500,'MONIST','ONE WITH GOD HIMSELF']].forEach(([x,h,s],k)=>{const col=k?HX.cy:S;panel(c,x,110,400,300,col,seg(l,k*.6,k*.6+.3),'DOSSIER · '+h);figure(c,x+80,370,.6,col,seg(l,k*.6,k*.6+.3));decode(c,s,x+160,220,`${fitpx(c,s,HD,220,24)}px ${HD}`,HX.ink,seg(l,k*.6+.3,k*.6+1.3),k+50);ht(c,'STATUS',x+160,280,`500 11px ${HM}`,rgba(HX.ink,.6),'left',seg(l,1.6,2));ht(c,'GOOD HINDU ✓',x+160,310,`28px ${HD}`,HX.gr,'left',seg(l,2+k*.3,2.3+k*.3));});}
  hudHead(c,12,'Ekam sat','signal');hudSrc(c,'RIG-VEDA I.164.46 · '+SRC1,S);hudFX(c,t,B,S);
};

SC.rivers=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c,i===0);const G=HX.gr;
  if(i===0){const pr=cam(40,30,95,.5,l*.02);hgrid(c,pr,HX.rd,.8,10);world(c,pr,HX.rd,.8);const r=rng(12);for(let k=0;k<18;k++){const p=[-10+r()*150,r()*55];const q=hdot(c,pr,p,'',HX.rd,seg(l,k*.08,k*.08+.2),{r:3});if(q)glow(c,q[0],q[1],14+6*Math.sin(t*5+k),HX.rd,.6);}
    chroma(c,'RELIGIOUS PERSECUTION · EVERY COUNTRY',W/2,H-70,`40px ${HD}`,'#ffd9dc','center',Math.exp(-l*4),seg(l,.2,.5));}
  if(i===2||i===3){const lt=i===2?l:9;const pr=cam(0,0,30,.55,0);hgrid(c,pr,G,1,2);const mk=(x0,x1,amp,f)=>{const o=[];for(let k=0;k<=40;k++){const u=k/40;o.push([lerp(x0,x1,u)+Math.sin(u*Math.PI*f)*amp*(1-u*.3),lerp(12,-8,u)]);}return o;};
    [[-16,-4,4,3],[-8,-2,.6,1],[0,2,5,4],[8,3,1,1.2],[16,5,3.5,2.5]].forEach(([a,b,amp,f],k)=>{route(c,pr,mk(a,b,amp,f),eo(seg(lt,k*.2,2.2+k*.2)),rgba(HX.cy,.9),3,[]);const m=pr(a-2,12,0),m2=pr(a,12,3),m3=pr(a+2,12,0);if(m&&m2&&m3){c.strokeStyle=G;c.lineWidth=2;c.beginPath();c.moveTo(m[0],m[1]);c.lineTo(m2[0],m2[1]);c.lineTo(m3[0],m3[1]);c.stroke();}});
    hpoly(c,pr,[[-24,-8],[24,-8]],HX.sf,4);ht(c,'FROM DIFFERENT MOUNTAINS · STRAIGHT OR CROOKED',W/2,80,`500 15px ${HM}`,G,'center',seg(lt,1,1.6));const o=pr(0,-8);if(i===3&&o){glow(c,o[0],o[1],200,HX.sf,.35);chroma(c,'ALL LEAD UNTO THEE',W/2,H-60,`52px ${HD}`,HX.ink,'center',Math.exp(-l*4));}}
  if(i===4){const cx=W/2,cy=300,ev=eo(seg(l,.8,3));for(let k=0;k<32;k++){const a=k/32*Math.PI*2+t*.08;c.strokeStyle=rgba(HX.sf,.35*ev);c.lineWidth=1.5;c.beginPath();c.moveTo(cx+Math.cos(a)*90,cy+Math.sin(a)*90);c.lineTo(cx+Math.cos(a)*700,cy+Math.sin(a)*700);c.stroke();}
    c.strokeStyle=HX.sf;c.lineWidth=2.5;c.beginPath();c.ellipse(cx,cy+70,110,24,0,0,7);c.stroke();c.strokeRect(cx-34,cy-40,68,110);c.beginPath();c.arc(cx,cy-40,34,Math.PI,0);c.stroke();glow(c,cx,cy-20,120,HX.sf,.3);
    ht(c,'NOT ONLY IN THE LINGA',W/2,92,`500 15px ${HM}`,HX.ink,'center',seg(l,.2,.6));chroma(c,'BUT EVERYWHERE',W/2,H-60,`48px ${HD}`,HX.sf,'center',l>1.4?Math.exp(-(l-1.4)*4):0,seg(l,1.4,1.7));}
  if(i===5){const pr=cam(60,25,60,.55,l*.02);hgrid(c,pr,G,1,10);world(c,pr,G,1);const top=[80,22];[['MECCA','THE CAABA'],['ROME','A CHRISTIAN CHURCH'],[null,'A BUDDHIST TEMPLE']].forEach(([p,n],k)=>{const ll=p?PLACES[p]:[80.6,7.3];hdot(c,pr,ll,n,HX.cy,seg(l,k*.6,k*.6+.4),{dx:10,dy:k===2?16:-10});arc3(c,pr,ll,top,14,eo(seg(l,k*.6+.3,k*.6+1.8)),rgba(HX.sf,.9),2.2);});
    const q=pr(top[0],top[1],7);if(q)glow(c,q[0],q[1],60,'#fff2d0',.9);ht(c,'KNEELING TO HIM · WHETHER THEY KNOW IT OR NOT',W/2,H-60,`500 15px ${HM}`,HX.sf,'center',seg(l,2,2.6));}
  hudHead(c,13,'Rivers to one ocean',i===0?'alert':'sim');hudSrc(c,'MAHIMNAH-STOTRA · '+SRC1,G);hudFX(c,t,B,i===0?HX.rd:G);
};

SC.mission=(c,t,B)=>{const {i,l}=beat(t,B);hbg(c);
  if(i===0){const r=rng(9);for(let k=0;k<40;k++){const x=80+(k%10)*90,y=150+Math.floor(k/10)*80,col=[HX.cy,HX.sf,HX.gr,HX.gd,HX.bl][k%5],n=3+Math.floor(r()*5),rr=14+r()*14,a=seg(l,k*.03,k*.03+.3);c.save();c.globalAlpha=a;c.strokeStyle=col;c.lineWidth=2;c.beginPath();for(let j=0;j<=n;j++){const an=j/n*6.283+t*.3*(k%2?1:-1);j?c.lineTo(x+Math.cos(an)*rr,y+Math.sin(an)*rr):c.moveTo(x+Math.cos(an)*rr,y+Math.sin(an)*rr);}c.stroke();c.restore();}
    ht(c,'WITHOUT VARIATION, LIFE MUST CEASE',W/2,90,`500 15px ${HM}`,HX.cy,'center',seg(l,.4,1));panel(c,240,450,480,50,HX.sf,seg(l,2,2.4),'');ht(c,'IT IS NOT NECESSARY THAT WE SHOULD HATE',W/2,476,`500 14px ${HM}`,HX.sf,'center',seg(l,2.2,2.6));}
  if(i===2){panel(c,90,90,780,360,HX.gd,1,'FOR EVERY ONE');['MILDNESS','GENTLENESS','FORBEARANCE','TOLERATION','SYMPATHY','BROTHERHOOD'].forEach((w,k)=>decode(c,w,140+(k%3)*250,170+Math.floor(k/3)*80,`36px ${HD}`,k===4?HX.sf:HX.ink,seg(l,k*.4,k*.4+.8),k+70));
    [['MAN',260],['WOMAN',480],['CHILD',700]].forEach(([s,x],k)=>{figure(c,x,420,k===2?.3:.4,HX.cy,seg(l,2.6+k*.3,3+k*.3));ht(c,s,x,436,`500 11px ${HM}`,HX.cy,'center',seg(l,2.6+k*.3,3+k*.3));});ht(c,'WITHOUT RESPECT OF RACE, CASTE, OR CREED',W/2,500,`500 12px ${HM}`,HX.gd,'center',seg(l,4,4.6));}
  if(i===4){const pr=cam(80,8.5,9+l*.3,.9,l*.03);hgrid(c,pr,HX.cy,1,1);world(c,pr);const pos=route(c,pr,[PLACES.COLOMBO,[80.2,8],PLACES.JAFFNA],eo(seg(l,.3,2.2)),rgba(HX.sf,.95),2.6);if(pos)glow(c,pos[0],pos[1],18,HX.sf);
    hdot(c,pr,PLACES.COLOMBO,'COLOMBO · 01',HX.cy,1);const j=hdot(c,pr,PLACES.JAFFNA,'',HX.sf,seg(l,2,2.3),{r:6});if(j)reticle(c,j[0],j[1],seg(l,2,2.6),HX.sf,t,seg(l,2,2.2));
    panel(c,40,360,400,120,HX.sf,seg(l,2.4,2.8),'NEXT');ht(c,'FILM 02 · JAFFNA',60,404,`500 13px ${HM}`,HX.sf,'left',seg(l,2.6,3));decode(c,'VAIDIKA: THE COMMON GROUND',60,444,`30px ${HD}`,HX.ink,seg(l,2.8,4),77);}
  hudHead(c,14,'Not toleration, sympathy',i===4?'map':'dossier');hudSrc(c,SRC1,i===4?HX.cy:HX.gd);hudFX(c,t,B,i===4?HX.cy:HX.gd);
};
