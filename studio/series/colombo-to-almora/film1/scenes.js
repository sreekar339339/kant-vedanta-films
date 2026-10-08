const SC={};
const SRC1='First Public Lecture in the East · Colombo 1897';
const phz=(t,B,i,j,d=.8,o=0)=>P(t,B,i,d,o)*(j==null?1:1-P(t,B,j,.5));

SC.arrive=(c,t,B)=>{journeyBase(c);const pj=CHARTPJ;
  const col=pj(79.86,6.93),st=pj(64.6,5.2),sp=ease(seg(t,.3,B[1]+1.2));
  c.strokeStyle='#8c3a24';c.lineWidth=2.2;c.setLineDash([3,6]);c.beginPath();c.moveTo(...st);const sh=[lerp(st[0],col[0],sp),lerp(st[1],col[1],sp)];c.lineTo(...sh);c.stroke();c.setLineDash([]);
  txt(c,'← FROM THE WEST',st[0]+4,st[1]-12,`600 11px ${MONO}`,'#8c3a24','left',seg(t,.3,1.3)*(1-P(t,B,2,.6)));
  const pts=ROUTE.map(r=>pj(r[1],r[2]));let tot=0;const cum=[0];for(let i=1;i<pts.length;i++){tot+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);cum.push(tot);}const fr=k=>cum[k]/tot;
  const ap=lerp(0,fr(9),P(t,B,2,B[3]-B[2]-.2))+lerp(0,fr(18)-fr(9),P(t,B,3,B[4]-B[3]-.2))+lerp(0,1-fr(18),P(t,B,4,2.6));
  if(ap>0){c.strokeStyle='rgba(140,58,36,.8)';c.lineWidth=1.8;c.setLineDash([2,6]);const r=polyAlong(c,pts,ap);c.setLineDash([]);ship(c,r.pos,r.ang,1-P(t,B,4,.6,2.6));}
  STOPS.forEach((s,k)=>{const i=s.films[0]-1;const a=i===0?sp>=1?1:0:(ap>=fr(i)-.001?1:0);if(a<=0)return;const p=pj(s.lo,s.la);
    const small=['Rameswaram','Ramnad','Paramakudi','Manamadura','Belur','Pamban'].includes(s.n);const right=['Jaffna','Madras','Calcutta','Dacca','Kumbakonam','Colombo','Almora','Khetri'].includes(s.n);
    cdot(c,p,small?'':s.n.toUpperCase(),right?10:-10,4,a,i===0?'#8c3a24':DEEP,i===0?5.5:4);});
  if(sp<1)ship(c,sh,Math.atan2(col[1]-st[1],col[0]-st[0]));
  if(sp>=1){c.save();c.globalAlpha=.5+.5*Math.sin(t*3);c.strokeStyle='#8c3a24';c.lineWidth=2;c.beginPath();c.arc(...col,11,0,7);c.stroke();c.restore();}
  const rows=[['15 JAN 1897 · COLOMBO',0,0],['home, after the West',1,0],['north: Jaffna, Pamban,',2,0],['Madura, Madras',2,1.4],['Calcutta, Almora',3,0],['29 talks · this is the first',4,0]].filter(([,b,o])=>t>=B[b]+o).map(r=>r[0]);
  logbox(c,36,110,228,rows,seg(t,.2,1));
  txt(c,'1',pj(79.86,6.93)[0]-26,pj(79.86,6.93)[1]+26,`600 22px ${DISP}`,'#8c3a24','center',P(t,B,4,1,1.2));
  heading(c,1,'Landfall at Colombo','chart',false);fig(c,'','Contents page · '+SRC1,false);
};

SC.welcome=(c,t,B)=>{paper(c);
  swami(c,220,330,.62,ease(seg(t,0,2.2)),seg(t,1.8,2.8));
  txt(c,'the Swami',220,486,`italic 600 22px ${DISP}`,RED,'center',seg(t,1.8,2.8));
  const p0=phz(t,B,0,2);if(p0>0){const cols=['#34477e','#7a3b2e','#3b5a3a','#5a3a6e','#2f6a6a','#8a5a2c'];
    cols.forEach((col,i)=>{const a=P(t,B,0,.8,.3+i*.15)*p0;if(a<=0)return;c.save();c.globalAlpha=a;standing(c,520+i*70,500,.46,col,{arm:i%2?.6:undefined});c.restore();});
    c.save();c.globalAlpha=P(t,B,0,1,.8)*p0;c.fillStyle='#f6eedb';c.strokeStyle=INK;c.lineWidth=3;c.fillRect(520,110,380,210);c.strokeRect(520,110,380,210);
    c.fillStyle='#c9ad7f';c.beginPath();c.ellipse(520,215,12,108,0,0,7);c.fill();c.stroke();c.beginPath();c.ellipse(900,215,12,108,0,0,7);c.fill();c.stroke();c.restore();
    txt(c,'ADDRESS OF WELCOME',710,150,`600 14px ${MONO}`,RED,'center',P(t,B,0,1,.8)*p0);txt(c,'from the Hindus of Colombo',710,182,`italic 600 22px ${DISP}`,INK,'center',P(t,B,0,1,1.2)*p0);
    const a1=P(t,B,1,1)*p0;txt(c,'“the Hindu ideal of a universal religion,',710,236,`italic 500 20px ${DISP}`,INK,'center',a1);txt(c,'harmonising all creeds”',710,262,`italic 500 20px ${DISP}`,INK,'center',a1);
    txt(c,'P. COOMARA SWAMY · CHAIRMAN',710,302,`10px ${MONO}`,SEPIA,'center',a1);}
  const p1=phz(t,B,2,4);if(p1>0){txt(c,'whom have they come out to honour?',690,140,`italic 600 26px ${DISP}`,INK,'center',p1);
    ['a great politician','a great soldier','a millionaire'].forEach((s,i)=>{const a=P(t,B,3,.6,i*1.1)*p1;if(a<=0)return;txt(c,s,690,210+i*46,`600 28px ${DISP}`,INK,'center',a);c.save();c.font=`600 28px ${DISP}`;const w=c.measureText(s).width;c.restore();c.save();c.globalAlpha=p1;strike(c,690-w/2,202+i*46,w,P(t,B,3,.5,.5+i*1.1));c.restore();});
    const b=P(t,B,3,1,3.6)*p1;txt(c,'a begging Sannyasin',690,380,`italic 600 36px ${DISP}`,RED,'center',b);
    if(b>0){c.save();c.globalAlpha=b;c.fillStyle='#8a5a2c';c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.ellipse(330,452,26,12,0,0,Math.PI);c.closePath();c.fill();c.stroke();c.restore();}}
  const p2=phz(t,B,4,5);if(p2>0){c.save();c.globalAlpha=p2;for(let i=0;i<9;i++){const y=120+i*38,g=P(t,B,4,.4,i*.12);c.globalAlpha=p2*g;c.fillStyle='#efe2c4';c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.ellipse(560,y,30,15,0,0,7);c.fill();c.stroke();c.beginPath();c.moveTo(530,y);c.lineTo(510,y-8);c.moveTo(590,y);c.lineTo(610,y-8);c.stroke();}
    c.globalAlpha=p2;c.save();c.translate(500,280);c.rotate(-Math.PI/2);txt(c,'RELIGION',0,0,`700 16px ${MONO}`,RED,'center');c.restore();c.restore();
    txt(c,'the backbone',780,250,`italic 600 34px ${DISP}`,INK,'center',P(t,B,4,1,1)*p2);txt(c,'of the national life',780,290,`italic 600 30px ${DISP}`,INK,'center',P(t,B,4,1,1.4)*p2);
    txt(c,'if the nation is to live',780,340,`600 14px ${MONO}`,RED,'center',P(t,B,4,1,2.6)*p2);}
  const p3=P(t,B,5,.8);if(p3>0){c.save();c.globalAlpha=p3;c.fillStyle='#e6d2a6';c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(500,210);c.lineTo(710,120);c.lineTo(920,210);c.closePath();c.fill();c.stroke();
    c.fillRect(510,210,400,22);c.strokeRect(510,210,400,22);for(let i=0;i<6;i++){c.fillStyle='#f3e8cf';c.fillRect(530+i*68,232,24,200);c.strokeRect(530+i*68,232,24,200);}c.fillStyle='#e6d2a6';c.fillRect(500,432,420,24);c.strokeRect(500,432,420,24);
    const lp=P(t,B,5,1.6,1);for(let i=0;i<5;i++){c.fillStyle=`rgba(240,180,80,${.75*lp})`;c.beginPath();c.arc(588+i*68,330,10,0,7);c.fill();}c.restore();
    txt(c,'FLORAL HALL',710,196,`700 15px ${MONO}`,INK,'center',p3);txt(c,'the evening of the sixteenth',710,500,`italic 600 24px ${DISP}`,RED,'center',P(t,B,5,1,.6));}
  heading(c,2,'The welcome','kalighat',false);fig(c,'','Address of welcome and reply · '+SRC1,false);
};

SC.punya=(c,t,B)=>{paper(c);
  swami(c,200,330,.56,ease(seg(t,0,2)),seg(t,1.6,2.6));
  const p0=phz(t,B,0,2);if(p0>0){c.save();c.globalAlpha=p0;c.strokeStyle=SEPIA;c.lineWidth=2;c.setLineDash([4,8]);c.beginPath();c.moveTo(420,420);c.bezierCurveTo(560,300,720,360,880,200);c.stroke();c.setLineDash([]);
    txt(c,'MOTHERLAND',420,450,`600 12px ${MONO}`,SEPIA,'center');txt(c,'THE WEST',880,180,`600 12px ${MONO}`,SEPIA,'center');
    for(let i=0;i<6;i++){const k=((t*.18+i/6)%1);const x=Math.pow(1-k,3)*420+3*Math.pow(1-k,2)*k*560+3*(1-k)*k*k*720+k*k*k*880,y=Math.pow(1-k,3)*420+3*Math.pow(1-k,2)*k*300+3*(1-k)*k*k*360+k*k*k*200;
      const g=c.createRadialGradient(x,y,1,x,y,14);g.addColorStop(0,'rgba(232,150,50,.95)');g.addColorStop(1,'rgba(232,150,50,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,14,0,7);c.fill();}c.restore();
    txt(c,'the blessings that followed my path',650,140,`italic 600 26px ${DISP}`,INK,'center',P(t,B,0,1,1)*p0);
    const q=P(t,B,1,.8)*p0;txt(c,'an emotional nature',650,260,`italic 500 24px ${DISP}`,SEPIA,'center',q*(1-P(t,B,1,.6,1.8)));txt(c,'the certainty of conviction',650,260,`italic 600 30px ${DISP}`,RED,'center',P(t,B,1,.8,1.8)*p0);}
  const p1=phz(t,B,2,4);if(p1>0){txt(c,'पुण्यभूमि',650,250,`86px ${DEV}`,INK,'center',p1);txt(c,'PUNYA BHUMI · THE LAND OF KARMA',650,300,`600 14px ${MONO}`,RED,'center',P(t,B,2,1,1)*p1);
    const q=P(t,B,3,.6)*p1;txt(c,'“it is so.”',650,380,`italic 600 40px ${DISP}`,RED,'center',q);if(q>0){c.save();c.globalAlpha=q;c.strokeStyle=RED;c.lineWidth=3;c.beginPath();c.moveTo(560,396);c.lineTo(lerp(560,740,P(t,B,3,1,1)),396);c.stroke();c.restore();}}
  const p2=phz(t,B,4,5);if(p2>0){c.save();c.globalAlpha=p2;c.strokeStyle='#b89a6a';c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(400,470);c.bezierCurveTo(520,470,520,330,650,340);c.bezierCurveTo(760,350,760,240,850,230);c.stroke();
    c.fillStyle='#e6d2a6';c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(820,230);c.lineTo(850,180);c.lineTo(880,230);c.closePath();c.fill();c.stroke();c.fillRect(826,230,48,40);c.strokeRect(826,230,48,40);
    for(let i=0;i<5;i++){const k=((t*.12+i/5)%1);const k3=k;const x=lerp(400,850,k3),y=lerp(470,240,k3)+Math.sin(k3*6)*30;c.fillStyle=`rgba(232,150,50,${.9*(1-k*.6)})`;c.beginPath();c.ellipse(x,y-8,5,9,0,0,7);c.fill();}c.restore();
    txt(c,'every soul wending its way Godward',620,140,`italic 600 26px ${DISP}`,INK,'center',p2);txt(c,'its last home',850,300,`italic 600 22px ${DISP}`,RED,'center',P(t,B,4,1,1.4)*p2);}
  const p3=P(t,B,5,.8);if(p3>0){const pj=mkproj(66,94,30,5,520,840,80,500);const wv=P(t,B,6,.6);
    if(wv>0){for(let i=0;i<7;i++){const r=((t*60+i*70)%480)*wv;c.strokeStyle=`rgba(168,56,42,${(1-r/480)*.5})`;c.lineWidth=2;c.beginPath();c.arc(680,300,40+r,0,7);c.stroke();}}
    c.save();c.globalAlpha=p3;c.fillStyle='rgba(200,105,44,.35)';c.strokeStyle=INK;c.lineWidth=2.5;c.beginPath();COAST.forEach(([lo,la],i)=>{const[x,y]=pj(lo,la);i?c.lineTo(x,y):c.moveTo(x,y);});[[93,26],[88,28],[80,32],[74,35],[68,30],[66.6,25.4]].forEach(p=>c.lineTo(...pj(...p)));c.closePath();c.fill();c.stroke();
    c.beginPath();CEYLON.forEach(([lo,la],i)=>{const[x,y]=pj(lo,la);i?c.lineTo(x,y):c.moveTo(x,y);});c.fill();c.stroke();c.restore();
    const w1=1-P(t,B,6,.5);txt(c,'the land of introspection',360,136,`italic 600 30px ${DISP}`,INK,'center',p3*w1);txt(c,'and of spirituality —',360,174,`italic 600 30px ${DISP}`,INK,'center',p3*w1);txt(c,'it is India.',360,218,`italic 600 40px ${DISP}`,RED,'center',P(t,B,5,1,1.6)*w1);
    txt(c,'tidal waves of philosophy',360,136,`italic 600 30px ${DISP}`,INK,'center',P(t,B,6,1,.6));txt(c,'to spiritualise the material',360,176,`italic 600 26px ${DISP}`,RED,'center',P(t,B,6,1,2.6));txt(c,'civilisation of the world',360,208,`italic 600 26px ${DISP}`,RED,'center',P(t,B,6,1,3));}
  heading(c,3,'Punya Bhumi','kalighat',false,1-P(t,B,5,.5));fig(c,'','Floral Hall lecture · '+SRC1,false);
};

SC.sword=(c,t,B)=>{c.fillStyle='#12202a';c.fillRect(0,0,W,H);
  c.save();c.beginPath();c.rect(0,0,480,H);c.clip();c.fillStyle='#2a2422';c.fillRect(0,0,480,H);
  const m=P(t,B,1,1);if(m>0){for(let r=0;r<3;r++)for(let i=0;i<9;i++){const x=((i*62+t*40+r*30)%560)-60,y=330+r*36;c.save();c.globalAlpha=m;c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=8;c.shadowOffsetY=4;c.fillStyle=['#1a1514','#231c1a','#2e2522'][r];
      c.beginPath();c.arc(x,y-40,10,0,7);c.fill();c.fillRect(x-12,y-30,24,46);c.beginPath();c.arc(x+12,y-6,14,0,7);c.fill();c.fillRect(x+22,y-110,3,110);c.beginPath();c.moveTo(x+18,y-110);c.lineTo(x+23.5,y-128);c.lineTo(x+29,y-110);c.fill();c.restore();}}
  const bl=P(t,B,2,2.2);if(bl>0)waves(c,t,lerp(H+40,250,bl),36,8,['#5a1a14','#6e2018','#86271c','#9c2f20']);
  const tr=P(t,B,3,.6);if(tr>0){for(let i=0;i<14;i++){const k=((t*.5+i*.17)%1);c.fillStyle=`rgba(200,220,235,${.7*tr*(1-k)})`;c.beginPath();c.ellipse(40+i*31,80+k*200,3,6,0,0,7);c.fill();}}
  txt(c,'with the blast of war trumpets',240,150,`italic 600 24px ${DISP}`,'#e8d6ad','center',P(t,B,1,1,.8)*(1-P(t,B,4,.6)));
  txt(c,'soaked in a deluge of blood',240,200,`italic 600 26px ${DISP}`,'#f0b49a','center',P(t,B,2,1,.6)*(1-P(t,B,4,.6)));
  c.restore();
  c.save();c.beginPath();c.rect(480,0,480,H);c.clip();const rg=c.createLinearGradient(0,0,0,H);rg.addColorStop(0,'#14363c');rg.addColorStop(1,'#1f5a5c');c.fillStyle=rg;c.fillRect(480,0,480,H);
  waves(c,t*.4,420,30,5,['#2a6e6a','#3a8a80','#4da296']);
  const ld=P(t,B,0,1.2);const lx=720,ly=360;if(ld>0){const g=c.createRadialGradient(lx,ly-30,4,lx,ly-30,120);g.addColorStop(0,`rgba(255,226,150,${.8*ld})`);g.addColorStop(1,'rgba(255,226,150,0)');c.fillStyle=g;c.fillRect(lx-130,ly-160,260,260);
    c.save();c.globalAlpha=ld;c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=10;c.shadowOffsetY=5;c.fillStyle='#e6d2a6';c.beginPath();c.ellipse(lx,ly,46,14,0,0,Math.PI);c.lineTo(lx-46,ly);c.fill();c.fillRect(lx-8,ly-14,16,16);c.fillStyle='#f6b04a';c.beginPath();c.ellipse(lx,ly-34,9,20+Math.sin(t*9)*2,0,0,7);c.fill();c.restore();}
  const bd=P(t,B,4,1);if(bd>0){for(let i=0;i<8;i++){const k=((t*.12+i/8)%1)*bd;const a=-Math.PI/2+(i-3.5)*.32;const x=lx+Math.cos(a)*k*380,y=ly-40+Math.sin(a)*k*300;c.save();c.globalAlpha=bd*(1-k*.6);c.translate(x,y);c.fillStyle='#f3ead4';c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=6;c.shadowOffsetY=3;
      const f=Math.sin(t*8+i)*6;c.beginPath();c.moveTo(-14,f);c.lineTo(0,0);c.lineTo(14,f);c.lineTo(0,6);c.closePath();c.fill();c.restore();}
    txt(c,'a blessing behind it',720,120,`italic 600 26px ${DISP}`,'#f3ead4','center',P(t,B,4,1,.8));txt(c,'and peace before it',720,156,`italic 600 26px ${DISP}`,'#f3c27a','center',P(t,B,4,1,1.6));}
  txt(c,'the mild Hindu',720,250,`italic 600 30px ${DISP}`,'#f3ead4','center',P(t,B,0,1,.6)*(1-P(t,B,4,.6)));
  c.restore();c.fillStyle='#e6d2a6';c.fillRect(479,0,2,H);
  const fin=P(t,B,5,1);if(fin>0){c.fillStyle=`rgba(10,16,22,${.72*fin})`;c.fillRect(0,440,W,74);txt(c,'never a conquering race — and therefore we live',480,488,`italic 600 30px ${DISP}`,'#f3c27a','center',fin);}
  heading(c,4,'Blood or blessing','papercut',true);fig(c,'','Floral Hall lecture · '+SRC1,true);
};

SC.capitol=(c,t,B)=>{
  const sh=i=>phz(t,B,i,i+1);
  lanternRig(c,t,(c,cx,cy,R)=>{
    const a0=sh(0);if(a0>0){c.save();c.globalAlpha=a0*(1-P(t,B,0,1,3)*.85);for(let r=0;r<3;r++)for(let i=0;i<8;i++){const x=cx-170+i*48+r*14,y=cy+20+r*34;c.fillStyle='rgba(60,40,20,.75)';c.beginPath();c.arc(x,y,16,0,7);c.fill();c.fillRect(x+12,y-90,3,90);}
      c.font=`600 34px ${DISP}`;c.textAlign='center';c.fillStyle='rgba(60,40,20,.85)';c.fillText('GREECE',cx,cy-90);c.restore();}
    const a1=sh(1);if(a1>0){c.save();c.globalAlpha=a1;c.fillStyle='rgba(60,40,20,.85)';c.fillRect(cx-3,cy-60,6,220);c.fillRect(cx-50,cy-20,100,40);c.fillStyle='rgba(240,225,190,.9)';c.font=`700 22px ${DISP}`;c.textAlign='center';c.fillText('SPQR',cx,cy+8);
      c.fillStyle='rgba(60,40,20,.9)';c.beginPath();c.ellipse(cx,cy-80,14,18,0,0,7);c.fill();const fl=Math.sin(t*2)*.1;c.beginPath();c.moveTo(cx,cy-86);c.lineTo(cx-90,cy-150+fl*40);c.lineTo(cx-70,cy-110);c.lineTo(cx-100,cy-100);c.lineTo(cx-20,cy-74);c.closePath();c.fill();
      c.beginPath();c.moveTo(cx,cy-86);c.lineTo(cx+90,cy-150-fl*40);c.lineTo(cx+70,cy-110);c.lineTo(cx+100,cy-100);c.lineTo(cx+20,cy-74);c.closePath();c.fill();c.beginPath();c.arc(cx,cy-104,9,0,7);c.fill();c.restore();}
    const a2=sh(2);if(a2>0){c.save();c.globalAlpha=a2;c.fillStyle='rgba(70,55,40,.8)';[[-130,110],[-80,170],[-30,60],[20,140],[70,90],[120,40]].forEach(([dx,h])=>{c.fillRect(cx+dx,cy+100-h,26,h);c.fillRect(cx+dx-4,cy+100-h-6,34,8);});c.fillRect(cx-R,cy+100,2*R,90);
      const wp=P(t,B,2,2,.8);const wx=cx+70,wy=cy-90;c.strokeStyle='rgba(40,30,20,.75)';c.lineWidth=1.2;for(let k=0;k<10;k++){const a=k/10*Math.PI*2;c.beginPath();c.moveTo(wx,wy);c.lineTo(wx+Math.cos(a)*90*wp,wy+Math.sin(a)*90*wp);c.stroke();}
      for(let r=1;r<=6;r++){if(r/6>wp)break;c.beginPath();for(let k=0;k<=10;k++){const a=k/10*Math.PI*2,rr=r*14;k?c.lineTo(wx+Math.cos(a)*rr,wy+Math.sin(a)*rr):c.moveTo(wx+Math.cos(a)*rr,wy+Math.sin(a)*rr);}c.stroke();}
      c.fillStyle='rgba(30,20,10,.9)';c.beginPath();c.arc(wx+20,wy+14,5,0,7);c.fill();c.restore();}
    const a3=sh(3);if(a3>0){c.save();c.globalAlpha=a3;c.fillStyle='rgba(70,110,130,.55)';c.fillRect(cx-R,cy-R,2*R,2*R);for(let i=0;i<5;i++){const r=((t*40+i*40)%200);c.strokeStyle=`rgba(240,230,200,${(1-r/200)*.8})`;c.lineWidth=2;c.beginPath();c.ellipse(cx,cy,r,r*.35,0,0,7);c.stroke();}c.restore();}
    const a4=sh(4);if(a4>0){c.save();c.globalAlpha=a4;c.fillStyle='rgba(205,175,110,.85)';c.fillRect(cx-170,cy-40,340,90);c.fillStyle='rgba(60,40,20,.9)';c.font=`52px ${DEV}`;c.textAlign='center';c.fillText('मनु',cx,cy+22);
      c.font=`italic 600 26px ${DISP}`;c.fillText('the same laws',cx,cy-80);c.restore();}
    const a5=P(t,B,5,.8);if(a5>0){c.save();c.globalAlpha=a5;c.strokeStyle='rgba(140,40,30,.85)';c.lineWidth=3;c.beginPath();for(let x=-R;x<=R;x+=4){const u=((x+R)/40+t*2)%6;const y=u>2.4&&u<2.8?-60:u>2.8&&u<3.1?40:0;x===-R?c.moveTo(cx+x,cy+y):c.lineTo(cx+x,cy+y);}c.stroke();
      c.fillStyle='rgba(60,40,20,.85)';c.font=`italic 600 26px ${DISP}`;c.textAlign='center';c.fillText('the mainspring',cx,cy-90);c.restore();}
  });
  const tl=(s,y,col,a)=>txt(c,s,640,y,`italic 500 22px ${DISP}`,col,'center',a);
  tl('the earth trembled · then the land was gone',488,'#e9dfc6',phz(t,B,0,1));
  tl('the Roman Eagle over everything worth having',488,'#e9dfc6',phz(t,B,1,2));
  tl('the spider weaves its web where the Caesars ruled',488,'#f0c56a',phz(t,B,2,3));
  tl('vanishing like ripples on the face of the waters',488,'#e9dfc6',phz(t,B,3,4));
  tl('but we live: Manu would not be in a foreign land',488,'#f0c56a',phz(t,B,4,5));
  tl('the mainspring of the national life is here',488,'#f0c56a',P(t,B,5,1,.6));
  heading(c,5,"A spider's web on the Capitol",'lantern',true);fig(c,'','Floral Hall lecture · '+SRC1,true);
};

function plough(c,x,y,a){if(a<=0)return;c.save();c.globalAlpha*=a;c.strokeStyle=INK;c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(x+90,y-70);c.moveTo(x+30,y-6);c.lineTo(x-10,y+14);c.stroke();c.fillStyle='#8a5a2c';c.beginPath();c.moveTo(x-14,y+16);c.lineTo(x+16,y+8);c.lineTo(x-6,y+26);c.closePath();c.fill();c.stroke();c.restore();}
SC.plough=(c,t,B)=>{paper(c);
  const p0=phz(t,B,0,3);if(p0>0){const box=(x,y,w,h,s,f,col,a)=>{if(a<=0)return;c.save();c.globalAlpha=a;c.fillStyle=col;c.strokeStyle=INK;c.lineWidth=3;c.fillRect(x,y,w,h);c.strokeRect(x,y,w,h);c.restore();txt(c,s,x+w/2,y+h/2+6,f,INK,'center',a);};
    txt(c,'OTHER NATIONS',230,120,`600 13px ${MONO}`,RED,'center',p0);
    [['politics',120],['society',172],['wealth',224],['the senses',276]].forEach(([s,y],i)=>box(100,y+24,260,44,s,`italic 600 22px ${DISP}`,'#e6d2a6',P(t,B,0,.6,i*.4)*p0));
    box(200,352,60,24,'religion',`600 10px ${MONO}`,'#f3e8cf',P(t,B,0,.6,2.2)*p0);txt(c,'perhaps a little bit',230,402,`italic 500 18px ${DISP}`,SEPIA,'center',P(t,B,0,.6,2.6)*p0);
    txt(c,'INDIA',690,120,`600 13px ${MONO}`,RED,'center',P(t,B,1,.6)*p0);box(560,144,260,232,'RELIGION',`600 34px ${DISP}`,'#e8b07a',P(t,B,1,1)*p0);txt(c,'the one and only occupation of life',690,410,`italic 600 20px ${DISP}`,INK,'center',P(t,B,1,1,1)*p0);
    const np=P(t,B,2,.8)*p0;if(np>0){c.fillStyle=`rgba(241,231,208,${.95*np})`;c.fillRect(60,90,860,380);
      c.save();c.globalAlpha=np;c.fillStyle='#f3efe4';c.strokeStyle='#9a8a70';c.lineWidth=2;c.fillRect(110,170,320,200);c.strokeRect(110,170,320,200);c.fillStyle='#bdb5a2';for(let i=0;i<8;i++)c.fillRect(126,250+i*14,288,5);c.restore();
      txt(c,'SINO-JAPANESE WAR',270,214,`600 18px ${MONO}`,'#9a8a70','center',np);txt(c,'very few, if any',270,400,`italic 500 20px ${DISP}`,SEPIA,'center',P(t,B,2,.8,1)*p0);
      c.save();c.globalAlpha=P(t,B,2,.8,1.8)*p0;c.fillStyle='#fbf6ea';c.strokeStyle=INK;c.lineWidth=3;c.fillRect(520,150,340,230);c.strokeRect(520,150,340,230);c.fillStyle='#8a7a60';for(let i=0;i<6;i++)c.fillRect(540,280+i*14,300,5);c.restore();
      txt(c,'PARLIAMENT OF RELIGIONS',690,198,`700 17px ${MONO}`,INK,'center',P(t,B,2,.8,1.8)*p0);txt(c,'a Hindu Sannyasin sent there',690,238,`italic 600 22px ${DISP}`,RED,'center',P(t,B,2,.8,2.2)*p0);txt(c,'even the poorest labourer knows',690,410,`italic 600 20px ${DISP}`,RED,'center',P(t,B,2,.8,3.4)*p0);}}
  const p1=P(t,B,3,.8);if(p1>0){c.save();c.globalAlpha=p1;standing(c,250,480,.9,'#4a4a52',{hat:'#3a3530',arm:.2});c.restore();plough(c,330,470,p1);txt(c,'a ploughman in England or America',250,516,`italic 600 18px ${DISP}`,RED,'center',p1);
    bubble(c,250,170,330,120,P(t,B,3,.6,.4)*(1-P(t,B,4,.4)),['Radical or Conservative?','Republican or Democrat?','and the silver question'],{tail:[20,30]});
    bubble(c,250,170,330,120,P(t,B,4,.6),['I go to church;','I belong to a denomination.','That is all.'],{tail:[20,30]});}
  const p2=P(t,B,5,.8);if(p2>0){const mk=t>=B[6];c.save();c.globalAlpha=p2;standing(c,690,480,.9,'#f3ead4',{arm:mk?1.4:.2,mark:mk,hair:INK});c.restore();plough(c,600,470,p2);txt(c,'an Indian ploughman',690,516,`italic 600 18px ${DISP}`,RED,'center',p2);
    bubble(c,690,160,300,84,P(t,B,5,.6,.2)*(1-P(t,B,6,.4)),['Politics?','What is that?'],{tail:[-20,40]});
    bubble(c,690,160,330,84,P(t,B,6,.6),['Look here, my friend,','I have marked it on my forehead.'],{tail:[-20,40],col:RED});
    if(mk){const g=c.createRadialGradient(690,300,2,690,300,30);g.addColorStop(0,`rgba(255,200,100,${.6*P(t,B,6,1)})`);g.addColorStop(1,'rgba(255,200,100,0)');c.fillStyle=g;c.fillRect(650,260,80,80);}}
  txt(c,"That is our nation's life.",480,90,`italic 600 30px ${DISP}`,RED,'center',P(t,B,7,1));
  heading(c,6,"The ploughman's mark",'kalighat',false,1-P(t,B,7,.5));fig(c,'','Floral Hall lecture · '+SRC1,false);
};

SC.dynamo=(c,t,B)=>{const g0=c.createLinearGradient(0,0,0,H);g0.addColorStop(0,'#141a33');g0.addColorStop(1,'#1f2a4a');c.fillStyle=g0;c.fillRect(0,0,W,H);
  const card=(x,y,w,h,col)=>{c.save();c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=12;c.shadowOffsetY=6;c.fillStyle=col;c.fillRect(x,y,w,h);c.restore();};
  const p0=phz(t,B,0,2);if(p0>0){c.save();c.globalAlpha=p0;const dirs=[-.9,-.3,.4,1.1,-1.4];dirs.forEach((d,i)=>{const x=160+i*150,y=300;c.save();c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=10;c.shadowOffsetY=5;c.fillStyle='#e6d2a6';c.beginPath();c.arc(x,y-60,16,0,7);c.fill();c.beginPath();c.moveTo(x-24,y+40);c.lineTo(x-14,y-40);c.lineTo(x+14,y-40);c.lineTo(x+24,y+40);c.closePath();c.fill();c.restore();
      arrow(c,x,y-100,x+Math.cos(d-Math.PI/2)*60,y-100+Math.sin(d-Math.PI/2)*60,'#f3c27a',3,P(t,B,0,.8,.6+i*.2));});c.restore();
    txt(c,'each has a bent · each race a mission',480,430,`italic 600 28px ${DISP}`,'#f3ead4','center',P(t,B,0,1,1.6)*p0);
    const q=P(t,B,1,.6)*p0;if(q>0){c.fillStyle=`rgba(20,26,51,${.9*q})`;c.fillRect(100,120,760,360);[['POLITICAL GREATNESS',240],['MILITARY POWER',320]].forEach(([s,y],i)=>{txt(c,s,480,y,`700 34px ${MONO}`,'#e6d2a6','center',q);c.save();c.font=`700 34px ${MONO}`;const w=c.measureText(s).width;c.restore();strike(c,480-w/2,y-12,w,P(t,B,1,.8,1.2+i*.8));});
      txt(c,'never the mission of our race',480,410,`italic 600 28px ${DISP}`,'#f3c27a','center',P(t,B,1,1,2.6)*p0);}}
  const p1=P(t,B,2,.8);if(p1>0){const cx=480,cy=290;const fill=P(t,B,2,B[3]-B[2]);const pour=P(t,B,3,2.4);
    const ch=P(t,B,4,1.2);if(ch>0){const names=['PERSIAN','GREEK','ROMAN','ARAB','ENGLISH'];names.forEach((n,i)=>{const a=-Math.PI*.95+i*Math.PI*.95/4,x2=cx+Math.cos(a)*420,y2=cy+Math.sin(a)*240+60;c.save();c.globalAlpha=ch;c.strokeStyle='#e6d2a6';c.lineWidth=10;c.beginPath();c.moveTo(cx,cy);c.lineTo(x2,y2);c.stroke();c.restore();
        for(let k=0;k<4;k++){const u=((t*.25+k/4)%1);c.fillStyle=`rgba(255,220,140,${ch*(1-u)})`;c.beginPath();c.arc(lerp(cx,x2,u),lerp(cy,y2,u),6,0,7);c.fill();}
        tag(c,n,lerp(cx,x2,.82),lerp(cy,y2,.82)-22,P(t,B,4,.6,.4+i*.4));});}
    if(pour>0){for(let i=0;i<6;i++){const r=((t*70+i*60)%360)*pour;c.strokeStyle=`rgba(255,214,120,${(1-r/360)*.6})`;c.lineWidth=4;c.beginPath();c.arc(cx,cy,60+r,0,7);c.stroke();}}
    c.save();c.globalAlpha=p1;card(cx-70,cy-90,140,180,'#3a4a7a');const lv=fill*150;const gg=c.createLinearGradient(0,cy+80,0,cy-80);gg.addColorStop(0,'#ffcf6a');gg.addColorStop(1,'#fff3c8');c.fillStyle=gg;c.fillRect(cx-56,cy+76-lv,112,lv);
    c.strokeStyle='#e6d2a6';c.lineWidth=3;for(let k=0;k<9;k++){c.beginPath();c.ellipse(cx,cy-74+k*19,70,6,0,0,Math.PI);c.stroke();}c.restore();
    txt(c,'a dynamo',cx,cy-120,`italic 600 30px ${DISP}`,'#f3ead4','center',p1*(1-ch));txt(c,'all the spiritual energy of the race',cx,cy+140,`italic 600 24px ${DISP}`,'#f3c27a','center',P(t,B,2,1,1.6)*(1-pour));
    txt(c,'poured forth in a deluge',cx,cy+140,`italic 600 26px ${DISP}`,'#f3c27a','center',pour*(1-ch));}
  const fin=P(t,B,5,1);if(fin>0){c.fillStyle=`rgba(20,26,51,${.8*fin})`;c.fillRect(0,400,W,110);txt(c,"India's gift to the world",480,446,`italic 600 34px ${DISP}`,'#f3ead4','center',fin);txt(c,'is the light spiritual.',480,486,`italic 600 34px ${DISP}`,'#ffcf6a','center',P(t,B,5,1,.8));}
  heading(c,7,'Storing the light','papercut',true);fig(c,'','Floral Hall lecture · '+SRC1,true);
};

SC.dew=(c,t,B)=>{const dawn=P(t,B,5,B[6]-B[5]+3);const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,hexm('#0b1a2e','#f2c38a',dawn));g.addColorStop(1,hexm('#163a5a','#f6e3c0',dawn));c.fillStyle=g;c.fillRect(0,0,W,H);
  if(dawn>0){const s=c.createRadialGradient(780,430,10,780,430,220);s.addColorStop(0,`rgba(255,220,150,${dawn})`);s.addColorStop(1,'rgba(255,220,150,0)');c.fillStyle=s;c.fillRect(0,0,W,H);}
  waves(c,t*.3,440,26,4,[hexm('#1d4060','#c9a46a',dawn),hexm('#245070','#b8935a',dawn),hexm('#2c6080','#a9844e',dawn)]);
  const lt=hexm('#f3ead4','#2a1a10',dawn),ac=hexm('#f3c27a','#8c3a24',dawn);
  const p0=phz(t,B,0,3);if(p0>0){txt(c,'whenever a conquering nation linked India to the world,',480,130,`italic 600 24px ${DISP}`,lt,'center',p0);txt(c,'the world was flooded with Indian spiritual ideas',480,162,`italic 600 24px ${DISP}`,lt,'center',P(t,B,0,1,.8)*p0);
    const cards=[['उपनिषद्',DEV,'SANSKRIT'],['سرّ اکبر',ARAB,'PERSIAN'],['OUPNEK’HAT',DISP,'LATIN'],['Schopenhauer',DISP,'GERMANY']];
    const qh=1-P(t,B,2,.5);cards.forEach(([s,f,l],i)=>{const a=P(t,B,1,.6,i*.9)*p0*qh;if(a<=0)return;const x=150+i*220,y=300;c.save();c.globalAlpha=a;c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=12;c.shadowOffsetY=6;c.fillStyle='#e6d2a6';c.fillRect(x-90,y-50,180,100);c.restore();
      txt(c,s,x,y+8,`${i>1?'600 26px':'34px'} ${f}`,INK,'center',a);txt(c,l,x,y+36,`600 11px ${MONO}`,'#5a3e22','center',a);if(i<3)arrow(c,x+92,y,x+128,y,'#e6d2a6',2.5,P(t,B,1,.5,i*.9+.4)*p0);});
    const q=P(t,B,2,.8)*p0;if(q>0){c.fillStyle=`rgba(11,26,46,${.85*q})`;c.fillRect(70,220,820,170);txt(c,'“In the whole world there is no study so beneficial',480,272,`italic 600 26px ${DISP}`,'#f3ead4','center',q);txt(c,'and so elevating as that of the Upanishads.',480,306,`italic 600 26px ${DISP}`,'#f3ead4','center',q);
      txt(c,'It has been the solace of my life, it will be the solace of my death.”',480,346,`italic 600 22px ${DISP}`,'#f3c27a','center',P(t,B,2,1,3.4));txt(c,'SCHOPENHAUER',480,376,`600 11px ${MONO}`,'#f3c27a','center',P(t,B,2,1,3.4)*p0);}}
  const p1=phz(t,B,3,5);if(p1>0){const sw=P(t,B,3,1);c.save();c.globalAlpha=p1;c.translate(480,250);c.rotate(-.6);c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=10;c.shadowOffsetY=5;c.fillStyle='#c9ccd2';c.beginPath();c.moveTo(0,-140);c.lineTo(12,60);c.lineTo(-12,60);c.closePath();c.fill();c.fillStyle='#8a6a3a';c.fillRect(-40,60,80,12);c.fillRect(-7,72,14,50);c.restore();
    strike(c,330,260,300,P(t,B,3,.8,1.4)*p1);txt(c,'never with fire and sword',480,420,`italic 600 30px ${DISP}`,lt,'center',sw*p1);
    const word='fascination';const n=Math.floor(P(t,B,4,2)*word.length);if(t>=B[4]){c.fillStyle=`rgba(11,26,46,${.85*P(t,B,4,.6)*p1})`;c.fillRect(0,120,W,320);txt(c,word.slice(0,n),480,300,`italic 600 84px ${DISP}`,'#f3c27a','center',p1);txt(c,'a charm, imperceptibly',480,360,`italic 500 26px ${DISP}`,'#f3ead4','center',P(t,B,4,1,2)*p1);}}
  const p2=P(t,B,5,.8);if(p2>0){for(let i=0;i<22;i++){const x=40+i*42,h=40+((i*37)%50);c.strokeStyle=hexm('#3a6a4a','#4a7a3a',dawn);c.lineWidth=3;c.beginPath();c.moveTo(x,470);c.quadraticCurveTo(x+6,470-h/2,x+(i%2?8:-8),470-h);c.stroke();
      const k=((t*.35+i*.13)%1);c.fillStyle=`rgba(220,240,255,${p2*(k<.8?.9:0)})`;c.beginPath();c.ellipse(x+(i%2?8:-8),lerp(60,470-h,Math.min(1,k/.8)),3,4.5,0,0,7);c.fill();}
    const bl=P(t,B,6,2);for(let i=0;i<5;i++){const x=150+i*170,y=400-((i*29)%40);const r=6+16*bl;c.fillStyle=`rgba(200,70,80,${p2})`;for(let k=0;k<5;k++){const a=k*1.256+t*.2;c.beginPath();c.ellipse(x+Math.cos(a)*r*.6,y+Math.sin(a)*r*.6,r*.55,r*.35,a,0,7);c.fill();}c.fillStyle=`rgba(240,200,90,${p2})`;c.beginPath();c.arc(x,y,4,0,7);c.fill();}
    txt(c,'slow and silent, as the gentle dew',480,150,`italic 600 30px ${DISP}`,ac,'center',P(t,B,5,1,.4));txt(c,'unseen and unheard',480,190,`italic 600 26px ${DISP}`,lt,'center',P(t,B,5,1,2.4));
    txt(c,'yet producing a most tremendous result',480,226,`italic 600 26px ${DISP}`,lt,'center',P(t,B,5,1,3.6));}
  heading(c,8,'Like the gentle dew','papercut',dawn<.5);fig(c,'','Floral Hall lecture · '+SRC1,dawn<.5);
};

SC.porcelain=(c,t,B)=>{const sh=i=>phz(t,B,i,i+1);
  lanternRig(c,t,(c,cx,cy,R)=>{
    const a0=sh(0);if(a0>0){c.save();c.globalAlpha=a0;c.strokeStyle='rgba(60,40,20,.85)';c.lineWidth=5;c.beginPath();c.arc(cx,cy,90,-Math.PI*.2+t,Math.PI*1.4+t);c.stroke();const ea=Math.PI*1.4+t;arrow(c,cx+Math.cos(ea-.2)*90,cy+Math.sin(ea-.2)*90,cx+Math.cos(ea)*90,cy+Math.sin(ea)*90,'rgba(60,40,20,.85)',5);
      c.fillStyle='rgba(60,40,20,.85)';c.font=`italic 600 28px ${DISP}`;c.textAlign='center';c.fillText('once more',cx,cy+10);c.restore();}
    const a1=sh(1);if(a1>0){const br=P(t,B,1,1.4,.6);c.save();c.globalAlpha=a1;c.fillStyle=`rgba(255,255,240,${.6*br})`;c.fillRect(cx-R,cy-R,2*R,2*R);c.fillStyle='rgba(110,95,75,.85)';c.fillRect(cx-70,cy-110,140,210);c.strokeStyle='rgba(40,25,15,.9)';c.lineWidth=2.5;
      const cr=P(t,B,1,1.4,1.6);c.beginPath();c.moveTo(cx-10,cy-110);c.lineTo(lerp(cx-10,cx+20,cr),lerp(cy-110,cy-40,cr));c.lineTo(lerp(cx-10,cx-30,cr),lerp(cy-110,cy+30,cr));c.lineTo(lerp(cx-10,cx+10,cr),lerp(cy-110,cy+100,cr));c.stroke();
      c.fillStyle='rgba(240,230,210,.8)';c.font=`600 14px ${MONO}`;c.textAlign='center';c.fillText('OLD BELIEFS',cx,cy-120);c.restore();}
    const a2=sh(2);if(a2>0){const k=P(t,B,2,1.6,.8);c.save();c.globalAlpha=a2;const pcs=[[-40,-90,40,-90,30,-20,-30,-20],[-30,-20,30,-20,55,40,-55,40],[-55,40,55,40,40,100,-40,100]];
      pcs.forEach((p,i)=>{const dx=(i-1)*60*k+(i===1?40*k:0),dy=k*k*90*(i+1)*.5,rot=(i-1)*.6*k;c.save();c.translate(cx+dx,cy+dy);c.rotate(rot);c.fillStyle=['rgba(230,235,245,.95)','rgba(215,225,240,.95)','rgba(225,232,244,.95)'][i];c.strokeStyle='rgba(60,80,130,.8)';c.lineWidth=2;c.beginPath();c.moveTo(p[0],p[1]);for(let j=2;j<8;j+=2)c.lineTo(p[j],p[j+1]);c.closePath();c.fill();c.stroke();
        c.strokeStyle='rgba(50,80,150,.7)';c.beginPath();c.arc(0,(p[1]+p[5])/2,10,0,7);c.stroke();c.restore();});c.restore();}
    const a3=sh(3);if(a3>0){c.save();c.globalAlpha=a3;c.fillStyle='rgba(90,70,45,.85)';c.beginPath();c.ellipse(cx,cy+40,70,18,0,0,7);c.fill();c.fillStyle='rgba(60,40,20,.85)';c.font=`italic 600 24px ${DISP}`;c.textAlign='center';c.fillText('the world: a little mud-puddle',cx,cy-40);
      c.font=`600 13px ${MONO}`;c.fillText('TIME BEGAN · THE OTHER DAY',cx,cy+100);c.restore();}
    const a4=sh(4);if(a4>0){c.save();c.globalAlpha=a4;const hm=Math.abs(Math.sin(t*4));c.fillStyle='rgba(60,40,20,.85)';c.font=`700 22px ${MONO}`;c.textAlign='center';c.fillText('EVOLUTION',cx,cy-40-hm*6);c.fillText('CONSERVATION',cx,cy+10);c.fillText('OF ENERGY',cx,cy+38);
      c.font=`italic 600 22px ${DISP}`;c.fillText('death blows to crude theologies',cx,cy+100);c.restore();}
    const a5=P(t,B,5,.8);if(a5>0){c.save();c.globalAlpha=a5;for(let i=0;i<6;i++){const r=((t*30+i*35)%210);c.strokeStyle=`rgba(90,60,30,${(1-r/210)*.7})`;c.lineWidth=2;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();}
      c.fillStyle='rgba(60,40,20,.9)';c.font=`600 40px ${DISP}`;c.textAlign='center';c.fillText('VEDANTA',cx,cy-6);c.font=`600 12px ${MONO}`;c.fillText('TIME · SPACE · CAUSATION · INFINITE',cx,cy+28);c.restore();}
  });
  const tl=(s,col,a)=>txt(c,s,640,488,`italic 500 22px ${DISP}`,col,'center',a);
  tl('once more, history is going to repeat itself','#e9dfc6',phz(t,B,0,1));
  tl('under the blasting light of modern science','#e9dfc6',phz(t,B,1,2));
  tl('orthodoxies pulverised like masses of porcelain','#f0c56a',phz(t,B,2,3));
  tl('and thought that time began but the other day','#e9dfc6',phz(t,B,3,4));
  tl('evolution and the conservation of energy','#e9dfc6',phz(t,B,4,5));
  tl('the oneness of all · the eternal soul of man','#f0c56a',P(t,B,5,1,.6));
  heading(c,9,'Porcelain cracks','lantern',true);fig(c,'','Floral Hall lecture · '+SRC1,true);
};

SC.yugas=(c,t,B)=>{wood(c);const lv=P(t,B,0,1);c.save();c.globalAlpha=lv;leaf(c,50,100,860,360);
  txt(c,'principles go out to the world · not the details of custom',480,140,`italic 500 22px ${DISP}`,INK,'center',P(t,B,0,1,.6)*(1-P(t,B,2,.5)));
  const dv=P(t,B,1,1.2);c.strokeStyle='rgba(90,60,30,.6)';c.lineWidth=2;c.beginPath();c.moveTo(480,170);c.lineTo(480,lerp(170,430,dv));c.stroke();
  txt(c,'श्रुति',270,196,`40px ${DEV}`,INK,'center',dv);txt(c,'SHRUTI · ABIDES FOR EVER',270,222,`600 12px ${MONO}`,'#5a3e22','center',dv);
  txt(c,'स्मृति · पुराण',690,196,`36px ${DEV}`,INK,'center',P(t,B,4,.8));txt(c,'SMRITI · PURANA · MINOR LAWS',690,222,`600 12px ${MONO}`,'#5a3e22','center',P(t,B,4,.8));
  [['आत्मा','the soul'],['ईश्वर','God'],['पूर्णता','perfection'],['सृष्टि','projection'],['कल्प','cyclical procession']].forEach(([d,e],i)=>{const a=P(t,B,2,.6,i*.9);txt(c,d,190,262+i*36,`28px ${DEV}`,INK,'left',a);txt(c,e,290,262+i*36,`italic 600 22px ${DISP}`,INK,'left',a);});
  txt(c,'universal laws in nature',270,450,`600 12px ${MONO}`,'#8c2f1c','center',P(t,B,3,.8));
  const yug=['सत्य','त्रेता','द्वापर','कलि'],yi=Math.floor(Math.max(0,t-B[5])/1.6)%4;const cu=P(t,B,4,.8);
  [['customs of the age',0],['rules of everyday life',1],['manners and social well-being',2]].forEach(([s,i])=>{const y=270+i*40;txt(c,s,690,y,`italic 600 22px ${DISP}`,INK,'center',cu);if(t>B[5]){c.save();c.font=`italic 600 22px ${DISP}`;const w=c.measureText(s).width;c.restore();strike(c,690-w/2,y-7,w,P(t,B,5,.6,1+i*.6)*(1-((t-B[5])%6.4>5.6?1:0)));}});
  if(t>=B[5]){yug.forEach((y,i)=>txt(c,y,570+i*80,420,`28px ${DEV}`,i===yi?'#8c2f1c':'rgba(90,60,30,.45)','center',P(t,B,5,.6)));txt(c,'YUGA AFTER YUGA',690,446,`600 11px ${MONO}`,'#5a3e22','center',P(t,B,5,.6));}
  c.restore();
  txt(c,'great Rishis will lead us to customs suited to new environments',480,500,`italic 600 22px ${DISP}`,'#e8d6ad','center',P(t,B,5,1,2.4));
  heading(c,10,'Shruti and Smriti','palmleaf',true);fig(c,'',SRC1,true);
};

SC.tribes=(c,t,B)=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a1e2a');g.addColorStop(1,'#a8582e');c.fillStyle=g;c.fillRect(0,0,W,H);
  const hills=[[130,0],[300,0],[470,1],[650,2],[820,2]];const rise=P(t,B,2,1.4);const india=P(t,B,5,1);
  const layer=(col,y0,amp)=>{c.save();c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=14;c.shadowOffsetY=-4;c.fillStyle=col;c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=20)c.lineTo(x,y0+Math.sin(x*.01)*amp);c.lineTo(W,H);c.closePath();c.fill();c.restore();};
  layer('#6e3a2a',380,14);
  hills.forEach(([x],i)=>{const a=P(t,B,0,.6,i*.3)*(1-india);if(a<=0)return;const up=(i===1)?rise*90:0;const y=360-up;c.save();c.globalAlpha=a;c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=12;c.shadowOffsetY=6;c.fillStyle='#c98a4a';c.beginPath();c.moveTo(x-80,400);c.quadraticCurveTo(x,y-40,x+80,400);c.closePath();c.fill();
    c.fillStyle='#e6d2a6';const sh=[()=>{c.fillRect(x-10,y-80,20,44);c.beginPath();c.arc(x,y-88,10,0,7);c.fill();},()=>{c.beginPath();c.moveTo(x,y-110);c.lineTo(x+16,y-40);c.lineTo(x-16,y-40);c.closePath();c.fill();},()=>{c.fillRect(x-16,y-74,32,36);c.beginPath();c.moveTo(x-22,y-74);c.lineTo(x,y-96);c.lineTo(x+22,y-74);c.fill();}][i%3];sh();c.restore();
    if(i===1&&rise>0){c.save();c.globalAlpha=a*rise;c.fillStyle='#f3c27a';c.beginPath();c.moveTo(x-22,y-112);c.lineTo(x-22,y-128);c.lineTo(x-11,y-118);c.lineTo(x,y-134);c.lineTo(x+11,y-118);c.lineTo(x+22,y-128);c.lineTo(x+22,y-112);c.closePath();c.fill();c.restore();}});
  const t1=P(t,B,1,.6)*(1-india);tag(c,'BAAL',215,170,t1*(1-P(t,B,3,.5)));tag(c,'MOLOCH',735,170,t1*(1-P(t,B,3,.5)));
  tag(c,'BAAL-MERODACH',300,130,P(t,B,3,.6)*(1-india));tag(c,'MOLOCH-YAHVEH',735,170,P(t,B,3,.6,1.2)*(1-india));
  const cl=P(t,B,4,.6)*(1-india);if(cl>0){const s=Math.sin(t*10)*4;c.save();c.globalAlpha=cl;c.strokeStyle='#e6d2a6';c.lineWidth=6;c.beginPath();c.moveTo(420+s,300);c.lineTo(560,180);c.moveTo(560-s,300);c.lineTo(420,180);c.stroke();c.restore();
    txt(c,'decided by the fortunes of battle',480,470,`italic 600 28px ${DISP}`,'#f3ead4','center',cl);}
  if(india>0){[[300,'SHIVA'],[660,'VISHNU']].forEach(([x,n],i)=>{c.save();c.globalAlpha=india;c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=12;c.shadowOffsetY=6;c.fillStyle='#c98a4a';c.beginPath();c.moveTo(x-130,400);c.quadraticCurveTo(x,280,x+130,400);c.closePath();c.fill();c.restore();tag(c,n,x,240,india);});
    const s=Math.sin(t*8)*6;arrow(c,400,250,460+s,250,'#f3ead4',3,india);arrow(c,560,280,500-s,280,'#f3ead4',3,india);txt(c,'in India too, competing gods',480,470,`italic 600 28px ${DISP}`,'#f3ead4','center',india);}
  txt(c,'each tribe, a god of its own',480,100,`italic 600 28px ${DISP}`,'#f3ead4','center',P(t,B,0,1,1)*(1-P(t,B,1,.5)));
  heading(c,11,'Gods of the tribes','papercut',true);fig(c,'','Floral Hall lecture · '+SRC1,true);
};

SC.ekam=(c,t,B)=>{wood(c);
  const din=1-P(t,B,1,.8);if(din>0){const names=['Shiva!','Vishnu!','mine is true','yours is not','Baal','Moloch','fight!','my god','Hari','Durga'];names.forEach((n,i)=>{const x=120+((i*197)%720)+Math.sin(t*6+i)*8,y=140+((i*131)%300)+Math.cos(t*7+i)*6;txt(c,n,x,y,`italic 600 ${18+(i%3)*6}px ${DISP}`,'#e8d6ad','center',din*P(t,B,0,.6,i*.15)*.8);});}
  const lv=P(t,B,1,.8);if(lv>0){c.save();c.globalAlpha=lv;leaf(c,50,110,860,330);
    const top=P(t,B,4,.8);txt(c,'एकं सद्विप्रा बहुधा वदन्ति',480,lerp(220,180,top),`${lerp(52,40,top)}px ${DEV}`,INK,'center');
    txt(c,'THAT WHICH EXISTS IS ONE · SAGES CALL IT BY VARIOUS NAMES',480,lerp(262,214,top),`600 13px ${MONO}`,'#5a3e22','center',P(t,B,1,1,1.6));
    const on=P(t,B,2,.8)*(1-top);if(on>0){const nm=['SHIVA','VISHNU','HARI','…','A HUNDRED NAMES'];c.fillStyle=`rgba(232,150,50,${on})`;c.beginPath();c.arc(480,350,10,0,7);c.fill();
      nm.forEach((n,i)=>{const a=t*.5+i*Math.PI*2/nm.length;txt(c,n,480+Math.cos(a)*190,354+Math.sin(a)*58,`600 13px ${MONO}`,INK,'center',on*P(t,B,2,.6,.3+i*.3));});}
    txt(c,'the whole history of India in these few words',480,400,`italic 600 24px ${DISP}`,'#8c2f1c','center',P(t,B,3,.8)*(1-top));
    if(top>0){for(let r=0;r<5;r++){const a=P(t,B,4,.6,.3+r*.4);txt(c,'एकं सद्विप्रा बहुधा वदन्ति · एकं सद्विप्रा बहुधा वदन्ति · एकं सद्विप्रा बहुधा वदन्ति',480,262+r*28,`18px ${DEV}`,'rgba(90,60,30,.55)','center',a*(1-P(t,B,5,.6)));}
      const d=P(t,B,5,.8);if(d>0){txt(c,'DUALIST',300,280,`600 13px ${MONO}`,'#5a3e22','center',d);txt(c,'the eternal servant of God',300,312,`italic 600 24px ${DISP}`,INK,'center',d);
        txt(c,'MONIST',660,280,`600 13px ${MONO}`,'#5a3e22','center',P(t,B,5,.8,1));txt(c,'one with God Himself',660,312,`italic 600 24px ${DISP}`,INK,'center',P(t,B,5,.8,1));
        txt(c,'both good Hindus',480,384,`italic 600 34px ${DISP}`,'#8c2f1c','center',P(t,B,5,.8,2.4));}}
    c.restore();}
  const bd=P(t,B,0,1,1.4)*din;if(bd>0){c.fillStyle=`rgba(26,15,8,${.9*bd})`;c.fillRect(0,244,W,56);}
  txt(c,'out of the din and confusion, a voice',480,280,`italic 600 30px ${DISP}`,'#e8d6ad','center',P(t,B,0,1,1.4)*din);
  heading(c,12,'Ekam sat','palmleaf',true);fig(c,'','Rig-Veda I.164.46 · '+SRC1,true);
};

SC.rivers=(c,t,B)=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1d2e3a');g.addColorStop(1,'#2a4a5a');c.fillStyle=g;c.fillRect(0,0,W,H);
  const p0=phz(t,B,0,2);if(p0>0){txt(c,'religious persecution, in every country',480,150,`italic 600 28px ${DISP}`,'#f3ead4','center',P(t,B,0,1)*(1-P(t,B,1,.5)));
    const bld=P(t,B,1,1);c.save();c.globalAlpha=Math.max(bld,0)*p0;c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=12;c.shadowOffsetY=6;c.fillStyle='#e6d2a6';
    c.beginPath();c.moveTo(220,420);c.lineTo(240,250);c.lineTo(320,250);c.lineTo(340,420);c.closePath();c.fill();for(let i=0;i<4;i++)c.fillRect(244+i*6,250-i*24,72-i*12,24);
    c.beginPath();c.arc(480,330,60,Math.PI,0);c.fill();c.fillRect(420,330,120,90);c.fillRect(560,230,16,190);c.beginPath();c.arc(568,226,10,0,7);c.fill();
    c.fillRect(640,300,110,120);c.beginPath();c.moveTo(640,300);c.lineTo(695,250);c.lineTo(750,300);c.fill();c.fillRect(685,190,20,60);c.fillRect(678,206,34,6);c.restore();
    c.fillStyle='#4a6a50';c.fillRect(0,420,W,120);
    txt(c,'Indians build temples for Mohammedans and Christians',480,110,`italic 600 26px ${DISP}`,'#f3c27a','center',P(t,B,1,1,1.2)*p0);txt(c,'nowhere else',480,146,`italic 600 26px ${DISP}`,'#f3ead4','center',P(t,B,1,1,3.4)*p0);}
  const p1=phz(t,B,2,4);if(p1>0){c.save();c.globalAlpha=p1;const mts=[[100,'#5a7a8a'],[300,'#6a8a9a'],[520,'#5a7a8a'],[740,'#6a8a9a'],[880,'#5a7a8a']];mts.forEach(([x,col])=>{c.save();c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=10;c.shadowOffsetY=5;c.fillStyle=col;c.beginPath();c.moveTo(x-110,200);c.lineTo(x,70);c.lineTo(x+110,200);c.closePath();c.fill();c.fillStyle='#f3ead4';c.beginPath();c.moveTo(x-22,96);c.lineTo(x,70);c.lineTo(x+22,96);c.closePath();c.fill();c.restore();});
    c.fillStyle='#2a6e8a';c.fillRect(0,440,W,100);waves(c,t,440,22,5,['#2f7a96','#3a8aa6','#48a0ba']);
    const rp=P(t,B,2,3);const mk=(x0,x1,amp,f)=>{const o=[];for(let k=0;k<=40;k++){const u=k/40;o.push([lerp(x0,x1,u)+Math.sin(u*Math.PI*f)*amp*(1-u*.3),lerp(200,446,u)]);}return o;};
    const rv=[[0,mk(100,300,60,3)],[0,mk(300,330,8,1)],[0,mk(520,480,70,4)],[0,mk(740,660,14,1.2)],[0,mk(880,770,50,2.5)]];
    rv.forEach(([,pts],i)=>{c.strokeStyle=['#7ac0d8','#8ad0e0','#6ab0cc','#9ad8e8','#7ac8dc'][i];c.lineWidth=7;c.lineCap='round';c.lineJoin='round';polyAlong(c,pts,rp);});c.restore();
    txt(c,'straight or crooked',480,240,`italic 600 26px ${DISP}`,'#f3ead4','center',P(t,B,2,1,2)*p1);txt(c,'all lead unto Thee',480,500,`italic 600 30px ${DISP}`,'#f3c27a','center',P(t,B,3,1)*p1);}
  const p2=P(t,B,4,.8);if(p2>0){const cx=480,cy=300;const ev=P(t,B,4,2,1.2);
    for(let i=0;i<24;i++){const a=i/24*Math.PI*2+t*.1;c.strokeStyle=`rgba(255,220,150,${.35*ev})`;c.lineWidth=2;c.beginPath();c.moveTo(cx+Math.cos(a)*70,cy+Math.sin(a)*70);c.lineTo(cx+Math.cos(a)*600,cy+Math.sin(a)*600);c.stroke();}
    c.save();c.globalAlpha=p2;c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=12;c.shadowOffsetY=6;c.fillStyle='#e6d2a6';c.beginPath();c.ellipse(cx,cy+60,80,18,0,0,7);c.fill();c.fillRect(cx-26,cy-30,52,90);c.beginPath();c.arc(cx,cy-30,26,Math.PI,0);c.fill();c.restore();
    txt(c,'not only in the Linga, but everywhere',480,120,`italic 600 28px ${DISP}`,'#f3ead4','center',P(t,B,4,1,.6)*(1-P(t,B,5,.5)));
    const p3=P(t,B,5,.8);if(p3>0){const sites=[[150,240,'CAABA'],[810,240,'CHURCH'],[480,470,'BUDDHIST TEMPLE']];sites.forEach(([x,y,n],i)=>{const a=P(t,B,5,.6,i*.8);c.save();c.globalAlpha=a;c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=10;c.shadowOffsetY=5;c.fillStyle='#e6d2a6';
        if(i===0){c.fillStyle='#2a2422';c.fillRect(x-36,y-36,72,72);c.fillStyle='#c9a24a';c.fillRect(x-36,y-14,72,8);}else if(i===1){c.fillRect(x-30,y-20,60,60);c.beginPath();c.moveTo(x-30,y-20);c.lineTo(x,y-70);c.lineTo(x+30,y-20);c.fill();c.fillRect(x-3,y-96,6,30);c.fillRect(x-12,y-86,24,5);}else{c.beginPath();c.arc(x,y-10,40,Math.PI,0);c.fill();c.fillRect(x-56,y-10,112,14);c.fillRect(x-4,y-72,8,24);}c.restore();
        txt(c,n,x,y+(i===2?30:66),`600 12px ${MONO}`,'#f3ead4','center',a);if(i<2)arrow(c,x+(i?-60:60),y,lerp(x,cx,.55),lerp(y,cy,.55),'#f3c27a',3,P(t,B,5,.8,i*.8+.4));else arrow(c,x,y-80,cx,cy+110,'#f3c27a',3,P(t,B,5,.8,2));});
      txt(c,'kneeling to Him, whether they know it or not',480,150,`italic 600 26px ${DISP}`,'#f3c27a','center',P(t,B,5,1,2.8));}}
  heading(c,13,'Rivers to one ocean','papercut',true);fig(c,'','Mahimnah-stotra · '+SRC1,true);
};

SC.mission=(c,t,B)=>{paper(c);
  const p0=phz(t,B,0,1);if(p0>0){const cols=['#34477e','#b8392b','#3b5a3a','#c8692c','#5a3a6e','#2f6a6a','#8a5a2c'];cols.forEach((col,i)=>{const a=P(t,B,0,.6,i*.2)*p0;if(a<=0)return;c.save();c.globalAlpha=a;standing(c,160+i*110,450,.55+((i*3)%4)*.08,col);c.restore();});
    txt(c,'without variation, life must cease',480,120,`italic 600 30px ${DISP}`,INK,'center',P(t,B,0,1,1)*p0);txt(c,'but we need not hate each other',480,160,`italic 600 26px ${DISP}`,RED,'center',P(t,B,0,1,3)*p0);}
  const p1=phz(t,B,1,2);if(p1>0){txt(c,'the one great lesson the world has yet to learn from India',480,170,`600 14px ${MONO}`,RED,'center',p1);txt(c,'not only toleration,',480,270,`italic 600 54px ${DISP}`,INK,'center',P(t,B,1,1,1.4)*p1);txt(c,'but sympathy',480,340,`italic 600 64px ${DISP}`,RED,'center',P(t,B,1,1,4)*p1);}
  const p2=phz(t,B,2,3);if(p2>0){[['#34477e',.62,'a man'],['#b8392b',.58,'a woman'],['#c8692c',.4,'a child']].forEach(([col,s,l],i)=>{const x=300+i*180;c.save();c.globalAlpha=p2;standing(c,x,470,s,col,{arm:i===1?.4:undefined});c.restore();txt(c,l,x,505,`italic 600 18px ${DISP}`,RED,'center',p2);});
    ['mildness','gentleness','forbearance','toleration','sympathy','brotherhood'].forEach((w,i)=>{const a=P(t,B,2,.6,.6+i*.6)*p2;const x=180+(i%3)*300,y=140+Math.floor(i/3)*50+Math.sin(t+i)*4;txt(c,w,x,y,`italic 600 30px ${DISP}`,i===4?RED:INK,'center',a);});
    txt(c,'without respect of race, caste, or creed',480,260,`600 13px ${MONO}`,SEPIA,'center',P(t,B,2,1,4.4)*p2);}
  const p3=phz(t,B,3,4,1);if(p3>0){swami(c,480,340,.66,p3,p3);txt(c,'“They call Thee by various names;',480,110,`italic 600 34px ${DISP}`,INK,'center',p3);txt(c,'Thou art One.”',480,152,`italic 600 40px ${DISP}`,RED,'center',P(t,B,3,1,1.6));}
  const p4=P(t,B,4,.8);if(p4>0){c.save();c.globalAlpha=p4;c.fillStyle='#e9dfc6';c.strokeStyle=SEPIA;c.lineWidth=2;c.fillRect(560,200,360,280);c.strokeRect(560,200,360,280);
    c.beginPath();c.rect(560,200,360,280);c.clip();const pj=mkproj(77,83,11,5,580,900,210,470);c.strokeStyle=SEPIA;c.lineWidth=2;c.beginPath();CEYLON.forEach(([lo,la],i)=>{const[x,y]=pj(lo,la);i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();c.beginPath();COAST.slice(8,15).forEach(([lo,la],i)=>{const[x,y]=pj(lo,la);i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();
    const a=pj(79.86,6.93),b=pj(80.01,9.66);c.strokeStyle='#8c3a24';c.lineWidth=2.4;c.setLineDash([3,6]);c.beginPath();c.moveTo(...a);const k=P(t,B,4,2,.4);c.lineTo(lerp(a[0],b[0],k),lerp(a[1],b[1],k));c.stroke();c.setLineDash([]);
    cdot(c,a,'COLOMBO',10,4,1,DEEP);cdot(c,b,'JAFFNA',10,4,seg(k,.95,1),'#8c3a24',5.5);c.restore();
    txt(c,'NEXT · FILM 2',740,230,`600 11px ${MONO}`,'#8c3a24','center',P(t,B,4,1,1.6));txt(c,'Vaidika: The Common Ground',290,330,`italic 600 30px ${DISP}`,INK,'center',P(t,B,4,1,2));}
  heading(c,14,'Not toleration, sympathy','kalighat',false,1-p3);fig(c,'','Floral Hall lecture · '+SRC1,false);
};
