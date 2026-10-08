const SC={};
/* ---- film 2 helpers ---- */
function standing(c,x,y,s,coat,o={}){c.save();c.translate(x,y);c.scale(s,s);c.rotate(o.lean||0);c.lineJoin='round';
  c.fillStyle=coat;c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(-34,0);c.quadraticCurveTo(-40,-120,-22,-150);c.lineTo(22,-150);c.quadraticCurveTo(40,-120,34,0);c.closePath();c.fill();c.stroke();
  c.fillStyle=o.skin||'#d79e62';c.beginPath();c.ellipse(0,-176,20,25,0,0,7);c.fill();c.stroke();
  c.fillStyle=o.hair||INK;c.beginPath();c.ellipse(0,-192,21,11,0,Math.PI,0);c.fill();
  if(o.arm){c.strokeStyle=INK;c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(18,-130);c.lineTo(52,-150+(o.arm||0)*-30);c.stroke();}
  c.fillStyle=INK;c.beginPath();c.arc(-7,-178,2.5,0,7);c.arc(7,-178,2.5,0,7);c.fill();c.restore();}
function balance(c,x,y,l1,l2,lv){c.save();c.translate(x,y);c.strokeStyle=INK;c.fillStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(0,-70);c.stroke();
  c.save();c.translate(0,-70);c.rotate((1-lv)*.28);c.beginPath();c.moveTo(-60,0);c.lineTo(60,0);c.stroke();
  [[-60,l1],[60,l2]].forEach(([px,l])=>{c.save();c.translate(px,0);c.rotate(-(1-lv)*.28);c.beginPath();c.moveTo(0,0);c.lineTo(-18,30);c.moveTo(0,0);c.lineTo(18,30);c.stroke();c.beginPath();c.ellipse(0,32,24,6,0,0,7);c.fillStyle='#8c5a2a';c.fill();c.stroke();
    c.fillStyle=INK;c.font=`20px ${DEV}`;c.textAlign='center';c.fillText(l,0,62);c.restore();});
  c.restore();c.beginPath();c.moveTo(-20,0);c.lineTo(20,0);c.stroke();c.restore();}
function twilight(c,a){if(a<=0)return;const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,`rgba(214,120,70,${.28*a})`);g.addColorStop(.5,`rgba(120,70,120,${.12*a})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,W,H);}

SC.boy=(c,t,B)=>{paper(c);twilight(c,P(t,B,1,1.4));
  person(c,480,370,.6,ease(seg(t,0,2.4)),seg(t,2,3.2),{shawl:'#34477e'});
  txt(c,'Naren',480,500,`italic 600 22px ${DISP}`,'#a8382a','center',seg(t,2,3));
  person(c,210,360,.62,P(t,B,1,2),P(t,B,1,1,1.6),{shawl:'#b8392b',dhoti:'#e9c46a',book:true,bookLabel:'RAMAYANA',look:2});
  txt(c,'his mother',210,500,`italic 600 22px ${DISP}`,'#a8382a','center',P(t,B,1,1,1.6));
  txt(c,'Ramayana · Mahabharata',210,226,`italic 600 22px ${DISP}`,INK,'center',P(t,B,1,1,2.4));
  person(c,750,360,.62,P(t,B,2,2),P(t,B,2,1,1.6),{shawl:'#3b3f46',dhoti:'#f7f2e6',book:true,bookLabel:'BIBLE',look:-2});
  txt(c,'his father',750,500,`italic 600 22px ${DISP}`,'#a8382a','center',P(t,B,2,1,1.6));
  const q=P(t,B,2,.8,2.4)*(1-P(t,B,3,.5));cloud(c,700,150,210,70,q);txt(c,'“If there be anything called religion,',700,144,`italic 600 21px ${DISP}`,INK,'center',q);txt(c,'it is in this.”',700,172,`italic 600 21px ${DISP}`,INK,'center',q);
  txt(c,'two worlds, one house',480,120,`600 40px ${DISP}`,INK,'center',P(t,B,3,1)*(1-q*.0));
  heading(c,1,'A Calcutta boy','kalighat',false,1-P(t,B,3,.5));fig(c,'','Eastern & Western Disciples ch. 8 · Great Master 5.8a',false);
};
SC.gita=(c,t,B)=>{wood(c);leaf(c,50,110,860,300);
  const tp=P(t,B,0,1)*(1-P(t,B,1,.5));if(tp>0){const pulse=1+.05*Math.max(0,Math.sin((t-2)*5))*seg(t,2,3);c.save();c.translate(480,262);c.scale(pulse,pulse);txt(c,'भगवद्गीता',0,22,`76px ${DEV}`,INK,'center',tp);c.restore();
    for(let k=0;k<3;k++){const r=((t*60+k*70)%210);c.strokeStyle=`rgba(140,47,28,${tp*(1-r/210)*.5})`;c.lineWidth=2;c.beginPath();c.ellipse(480,248,140+r,50+r*.35,0,0,7);c.stroke();}}
  const bp=P(t,B,1,.6)*(1-P(t,B,2,.5));if(bp>0){c.save();c.globalAlpha=bp;
    [['सुख','दुःख',.4],['शीत','उष्ण',1.4],['शत्रु','मित्र',2.4]].forEach(([a,b,o],i)=>balance(c,230+i*250,330,a,b,P(t,B,1,1,o)));
    txt(c,'समः',480,170,`46px ${DEV}`,'#8c2f1c','center',P(t,B,1,1,3.2));c.restore();
    txt(c,'pleasure and pain · heat and cold · friend and foe: the same',480,460,`italic 500 26px ${DISP}`,'#e8d6ad','center',bp*P(t,B,1,1,1));}
  const ap=P(t,B,2,.8)*(1-P(t,B,3,.6,1.6)*.0);if(ap>0){txt(c,'क्लैब्यं मा स्म गमः पार्थ',480,280,`56px ${DEV}`,INK,'center',ap);
    txt(c,'GITA 2.3 · KRISHNA TO ARJUNA',480,330,`600 13px ${MONO}`,'#5a3e22','center',ap);
    txt(c,'“Ill doth it befit thee, Arjuna, to yield to unmanliness!”',480,460,`italic 500 26px ${DISP}`,'#e8d6ad','center',ap*(1-P(t,B,3,.5)));}
  txt(c,'How strong!',480,468,`italic 600 40px ${DISP}`,'#f0c56a','center',P(t,B,3,.8));
  heading(c,2,'A line that throbbed','palmleaf',true);fig(c,'','Nivedita, The Master as I Saw Him, ch. 15',true);
};
SC.books=(c,t,B)=>{paper(c);
  const night=P(t,B,0,1.5);c.fillStyle=`rgba(27,34,54,${.5*night})`;c.fillRect(0,0,W,H);
  const gl=c.createRadialGradient(330,300,10,330,300,300);gl.addColorStop(0,`rgba(255,200,110,${.45*night})`);gl.addColorStop(1,'rgba(255,200,110,0)');c.fillStyle=gl;c.fillRect(0,0,W,H);
  person(c,300,360,.66,ease(seg(t,0,2)),seg(t,1.6,2.6),{shawl:'#34477e',book:true,bookLabel:'MILL'});
  const books=[['MILL · THREE ESSAYS ON RELIGION',0,0],['HUME',1,0],['SPENCER · THE UNKNOWABLE',1,1],['DESCARTES',2,0],['SPINOZA',2,.4],['DARWIN',2,.8],['COMTE',2,1.2],['KANT',2,2.2],['FICHTE',2,2.7],['HEGEL',2,3.2],['SCHOPENHAUER',2,3.7]];
  const cols=['#7a2e22','#2e4a6a','#4d5a2a','#8a5a1e','#3b2a52','#6a2a3a','#2a5a5a','#9a3a20','#4a4a6a','#5a3a2a','#3a2a52'];
  books.forEach(([n,bi,o],i)=>{const a=P(t,B,bi,.5,o+(bi===0?.6:0));if(a<=0)return;const by=486-i*25,bw=270-(i%3)*18,bx=610+(i%2)*10;c.save();c.globalAlpha=a;c.translate(0,(1-a)*-30);
    c.fillStyle=cols[i];c.fillRect(bx,by-23,bw,23);c.strokeStyle=INK;c.lineWidth=2.5;c.strokeRect(bx,by-23,bw,23);c.fillStyle='#f3e6c4';c.font=`600 12px ${MONO}`;c.textAlign='center';c.fillText(n,bx+bw/2,by-7);c.restore();
    if(n==='KANT'&&a>=1){c.strokeStyle='#f0c56a';c.lineWidth=3;c.strokeRect(bx-4,by-27,bw+8,31);}});
  const br=P(t,B,3,1);if(br>0){cloud(c,700,120,180,70,br);c.save();c.globalAlpha=br;c.strokeStyle=INK;c.lineWidth=3;c.fillStyle='#e8b4a0';c.beginPath();c.ellipse(650,118,46,32,0,0,7);c.fill();c.stroke();
    c.beginPath();c.moveTo(615,112);c.quadraticCurveTo(640,92,655,118);c.quadraticCurveTo(672,140,690,110);c.stroke();c.beginPath();c.moveTo(660,148);c.lineTo(668,175);c.stroke();c.restore();
    txt(c,'nerves &',760,112,`italic 600 22px ${DISP}`,INK,'center',br);txt(c,'the brain',760,136,`italic 600 22px ${DISP}`,INK,'center',br);}
  txt(c,'boyhood faith, shaken',300,110,`italic 600 24px ${DISP}`,'#a8382a','center',P(t,B,0,1,2.4)*(1-P(t,B,2,.6)));
  heading(c,3,'1881: the books','kalighat',night<.5);fig(c,'','Seal, in Eastern & Western Disciples ch. 8 · Great Master 5.8a',false);
};
SC.walled=(c,t,B)=>{grid(c,false);
  const pp=P(t,B,0,2.4);
  const xb=(x,y,L,sub,a)=>{if(a<=0)return;c.save();c.globalAlpha*=a;c.setLineDash([6,5]);c.strokeStyle='#c9d6e8';c.lineWidth=1.5;c.strokeRect(x-50,y-50,100,100);c.setLineDash([]);c.restore();txt(c,L,x,y+18,`600 52px ${DISP}`,'#e8eef7','center',a);txt(c,sub,x,y+76,`12px ${MONO}`,'#8a9bb3','center',a);};
  xb(110,270,'?','the world itself',pp);
  c.strokeStyle='#9be0b5';c.lineWidth=2;arrow(c,165,270,268,270,'#9be0b5',2,seg(pp,0,.25));txt(c,'stimulus',215,256,`12px ${MONO}`,'#9be0b5','center',seg(pp,.1,.3));
  if(pp>.25){c.save();c.globalAlpha=seg(pp,.25,.4);c.strokeStyle='#e8eef7';c.lineWidth=2.5;c.fillStyle='#0f1420';c.beginPath();c.moveTo(270,270);c.quadraticCurveTo(298,246,326,270);c.quadraticCurveTo(298,294,270,270);c.fill();c.stroke();c.fillStyle='#7fb2ff';c.beginPath();c.arc(300,270,9,0,7);c.fill();c.restore();txt(c,'sense',298,312,`12px ${MONO}`,'#8a9bb3','center',seg(pp,.3,.45));}
  const np=seg(pp,.4,.7);c.strokeStyle='#7fb2ff';c.lineWidth=2.5;c.beginPath();c.moveTo(330,270);c.lineTo(lerp(330,420,np),270);c.stroke();
  if(np>0&&np<1){c.fillStyle='#f0c56a';c.beginPath();c.arc(lerp(330,420,np),270,5,0,7);c.fill();}
  const mp=seg(pp,.65,1);if(mp>0){c.save();c.globalAlpha=mp;c.fillStyle='rgba(240,197,106,.12)';c.strokeStyle='#f0c56a';c.lineWidth=2;c.beginPath();c.ellipse(520,270,100,90,0,0,7);c.fill();c.stroke();
    c.fillStyle='rgba(232,180,160,.85)';c.beginPath();c.ellipse(520,262,48,34,0,0,7);c.fill();c.strokeStyle='#121212';c.lineWidth=2;c.beginPath();c.moveTo(480,256);c.quadraticCurveTo(505,236,520,262);c.quadraticCurveTo(538,286,556,254);c.stroke();c.restore();
    txt(c,'changes in the mind',520,392,`600 13px ${MONO}`,'#f0c56a','center',mp);txt(c,'all that is ever known',520,410,`12px ${MONO}`,'#8a9bb3','center',mp);}
  txt(c,'unknown and unknowable',120,404,`italic 600 20px ${DISP}`,'#e8eef7','center',P(t,B,1,1,.6));
  const w1=P(t,B,1,1.2,1.4);if(w1>0){c.save();c.globalAlpha=.95;bricks(c,214,470-300*w1,40,300*w1,'#4a5568','#c9d6e8');c.restore();}
  const yb=P(t,B,2,1);xb(850,270,'“I”','made by an unknown',yb);arrow(c,800,270,624,270,'#c9d6e8',2,P(t,B,2,1,.6));
  const w2=P(t,B,2,1.2,2);if(w2>0)bricks(c,740,470-300*w2,40,300*w2,'#4a5568','#c9d6e8');
  const wl=P(t,B,3,1);if(wl>0){c.save();c.shadowColor='#7fb2ff';c.shadowBlur=24*wl;c.strokeStyle=`rgba(127,178,255,${wl})`;c.lineWidth=3;c.strokeRect(214,170,40,300);c.strokeRect(740,170,40,300);c.restore();
    txt(c,'THE IMPREGNABLE WALL OF TIME AND SPACE',480,140,`600 16px ${MONO}`,'#7fb2ff','center',wl);}
  heading(c,4,'Walled in','plate',true);fig(c,'FIG. 2.4 · ONLY THE MIND’S OWN CHANGES ARE KNOWN','Great Master 5.8a',true);
};
SC.err=(c,t,B)=>{grid(c,true);
  const a0=P(t,B,0,1)*(1-P(t,B,1,.5));txt(c,'the senses',480,250,`italic 500 54px ${DISP}`,'#121212','center',a0);txt(c,'are full of errors',480,306,`italic 500 54px ${DISP}`,'#c0392b','center',P(t,B,0,1,.8)*(1-P(t,B,1,.5)));
  const ml=P(t,B,1,.8)*(1-P(t,B,3,.6));if(ml>0){c.save();c.globalAlpha=ml;c.strokeStyle='#121212';c.lineWidth=4;c.lineCap='round';
    const line=(y,out)=>{const x1=330,x2=630,f=34*(out?1:-1);c.beginPath();c.moveTo(x1,y);c.lineTo(x2,y);c.moveTo(x1,y);c.lineTo(x1-f,y-28);c.moveTo(x1,y);c.lineTo(x1-f,y+28);c.moveTo(x2,y);c.lineTo(x2+f,y-28);c.moveTo(x2,y);c.lineTo(x2+f,y+28);c.stroke();};
    line(210,true);line(360,false);
    const g=P(t,B,2,.8);if(g>0){c.save();c.globalAlpha*=g;c.setLineDash([6,6]);c.strokeStyle='#c0392b';c.lineWidth=2;[330,630].forEach(x=>{c.beginPath();c.moveTo(x,150);c.lineTo(x,420);c.stroke();});c.restore();
      txt(c,'300 px',480,196,`600 13px ${MONO}`,'#c0392b','center',g);txt(c,'300 px',480,346,`600 13px ${MONO}`,'#c0392b','center',g);txt(c,'same length. The eye still disagrees.',480,460,`italic 500 26px ${DISP}`,'#121212','center',P(t,B,2,1,1));}
    c.restore();}
  const ch=P(t,B,3,1);if(ch>0){c.save();c.globalAlpha=ch;
    for(let i=0;i<9;i++){const x=150+(i%3)*44,y=230+Math.floor(i/3)*58;c.fillStyle='#8a8478';c.beginPath();c.arc(x,y,13,0,7);c.fill();c.fillRect(x-11,y+14,22,26);}
    txt(c,'the senses of',195,410,`italic 600 24px ${DISP}`,'#121212','center');txt(c,'ordinary people',195,438,`italic 600 24px ${DISP}`,'#121212','center');
    [700,800].forEach((x,i)=>{const g=c.createRadialGradient(x,240,4,x,240,60);g.addColorStop(0,'rgba(240,197,106,.8)');g.addColorStop(1,'rgba(240,197,106,0)');c.fillStyle=g;c.fillRect(x-60,180,120,120);
      c.fillStyle='#121212';c.beginPath();c.arc(x,240,16,0,7);c.fill();c.fillRect(x-14,258,28,70);txt(c,i?'Jesus':'Buddha',x,352,`italic 600 22px ${DISP}`,'#121212','center');});
    txt(c,'the realisations of',750,410,`italic 600 24px ${DISP}`,'#121212','center');txt(c,'rare souls',750,438,`italic 600 24px ${DISP}`,'#121212','center');
    txt(c,'?',480,320,`600 96px ${DISP}`,'#c0392b','center',P(t,B,3,.8,1.2));c.restore();}
  heading(c,5,'The senses err','percept',false);fig(c,ml>0?'LAB CARD 2.5 · MÜLLER-LYER ILLUSION (1889)':'','Great Master 5.8a',false);
};
SC.seal=(c,t,B)=>{paper(c);
  person(c,230,370,.6,ease(seg(t,0,2)),seg(t,1.6,2.6),{shawl:'#5a6a7a',look:2});txt(c,'Brajendranath Seal',230,500,`italic 600 22px ${DISP}`,'#a8382a','center',seg(t,1.6,2.6));
  person(c,730,370,.6,ease(seg(t,.4,2.4)),seg(t,2,3),{shawl:'#34477e',look:-2});txt(c,'Naren',730,500,`italic 600 22px ${DISP}`,'#a8382a','center',seg(t,2,3));
  const pale=P(t,B,2,1.4);const sc=P(t,B,0,.8,1.2);
  if(sc>0){cloud(c,280,140,200,72,sc*(1-pale*.6),INK,hexm('#fbf6ea','#e9e6e0',pale));
    txt(c,'the sovereignty of',280,136,`italic 600 22px ${DISP}`,INK,'center',sc*(1-pale*.6));txt(c,'Universal Reason',280,164,`600 28px ${DISP}`,INK,'center',sc*(1-pale*.6));}
  txt(c,'a pale, bloodless reason',280,230,`italic 600 24px ${DISP}`,'#7a7a7a','center',pale);
  const nc=P(t,B,1,.8);if(nc>0){cloud(c,700,140,190,72,nc);
    const hp=1-P(t,B,3,.6);txt(c,'intellect: conquered',700,130,`italic 600 22px ${DISP}`,INK,'center',nc*hp);txt(c,'heart: the individual',700,162,`italic 600 22px ${DISP}`,'#a8382a','center',P(t,B,1,.8,2)*hp);
    const wn=P(t,B,3,.8);txt(c,'a flesh and blood reality',700,116,`italic 600 21px ${DISP}`,INK,'center',wn);txt(c,'a hand to save',700,142,`italic 600 21px ${DISP}`,INK,'center',P(t,B,3,.8,1.4));txt(c,'a master',700,168,`600 24px ${DISP}`,'#a8382a','center',P(t,B,3,.8,2.6));}
  heading(c,6,'Pure Reason','kalighat',false,1-sc);fig(c,'','Seal, in Eastern & Western Disciples ch. 8',false);
};
SC.seen=(c,t,B)=>{paper(c);
  const pan=(x,y,w,h,a,draw,cap)=>{if(a<=0)return;c.save();c.globalAlpha*=a;c.translate((1-a)*30,0);c.save();c.beginPath();c.rect(x,y,w,h);c.clip();draw(x,y,w,h);c.restore();c.strokeStyle=INK;c.lineWidth=5;c.strokeRect(x,y,w,h);
    c.font=`700 15px ${BODY}`;const cw=c.measureText(cap).width;c.fillStyle='#f6e7a8';c.fillRect(x+10,y+10,cw+20,28);c.lineWidth=2;c.strokeRect(x+10,y+10,cw+20,28);c.fillStyle=INK;c.textAlign='left';c.fillText(cap,x+20,y+29);c.restore();};
  const b2=P(t,B,3,.8);
  pan(30,96,lerp(900,430,b2),400,P(t,B,0,.8),(x,y,w,h)=>{c.fillStyle='#e2d3b2';c.fillRect(x,y,w,h);
    const lean=P(t,B,2,.6)*(1-P(t,B,2,.6,2.4)*.6);c.fillStyle='#7a5a3a';c.fillRect(x+w*.62-50,y+250,100,120);c.strokeStyle=INK;c.lineWidth=4;c.strokeRect(x+w*.62-50,y+250,100,120);
    standing(c,x+w*.62,y+262,.9,'#2f3540',{lean:-lean*.25,arm:1-lean});
    for(let i=0;i<7;i++){const hx=x+40+i*Math.max(40,w*.08),hy=y+h-30+(i%2)*8;c.fillStyle=i===2?'#34477e':INK;c.beginPath();c.arc(hx,hy-20,15,0,7);c.fill();c.fillRect(hx-18,hy-6,36,40);}
    if(lean>.2)txt(c,'!',x+w*.62+40,y+130,`700 60px ${DISP}`,'#a8382a','center',lean);
  },'Calcutta lecture halls');
  const q=P(t,B,1,.5)*(1-b2*.4);if(q>0){cloud(c,lerp(260,190,b2),190,lerp(150,120,b2),60,q);txt(c,'Have you seen God?',lerp(260,190,b2),198,`italic 700 ${Math.round(lerp(30,24,b2))}px ${DISP}`,INK,'center',q);}
  pan(490,96,440,400,b2,(x,y,w,h)=>{c.fillStyle='#efe6cf';c.fillRect(x,y,w,h);const g=c.createRadialGradient(x+220,y+260,10,x+220,y+260,240);g.addColorStop(0,'rgba(255,230,160,.6)');g.addColorStop(1,'rgba(255,230,160,0)');c.fillStyle=g;c.fillRect(x,y,w,h);
    person(c,x+220,y+282,.58,1,1,{shawl:'#efe9da',beard:true,look:1});},'Dakshineswar');
  const r1=P(t,B,3,.6,1.6),r2=P(t,B,3,.6,3.2);if(r1>0){cloud(c,710,170,110,46,r1);txt(c,'I have.',710,180,`italic 700 30px ${DISP}`,INK,'center',r1);}
  if(r2>0){txt(c,'“And I will put you in the way',710,452,`italic 600 19px ${DISP}`,INK,'center',r2);txt(c,'of seeing Him too.”',710,476,`italic 600 19px ${DISP}`,INK,'center',r2);}
  heading(c,7,'Have you seen God?','kalighat',false,1-P(t,B,0,.6));fig(c,'','The Vedanta in All Its Phases, CW vol. 3',false);
};
SC.hamilton=(c,t,B)=>{grid(c,false);const x0=110,x1=740,y0=430,y1=150,X=x=>lerp(x0,x1,x/6),Y=v=>lerp(y0,y1,v);
  const ax=P(t,B,0,.8);c.save();c.globalAlpha=ax;c.strokeStyle='#c9d6e8';c.lineWidth=2;c.beginPath();c.moveTo(x0,y1-30);c.lineTo(x0,y0);c.lineTo(x1+40,y0);c.stroke();
  txt(c,'inquiry →',x1+40,y0+24,`12px ${MONO}`,'#8fb3d9','right');c.save();c.translate(x0-18,(y0+y1)/2);c.rotate(-Math.PI/2);txt(c,'what the intellect can know of God',0,0,`12px ${MONO}`,'#8fb3d9','center');c.restore();
  c.setLineDash([8,6]);c.strokeStyle='#f0c56a';c.beginPath();c.moveTo(x0,Y(1));c.lineTo(x1+40,Y(1));c.stroke();c.setLineDash([]);txt(c,'God’s nature',x1+40,Y(1)-10,`600 13px ${MONO}`,'#f0c56a','right');c.restore();
  const cp=P(t,B,0,2.4,.6)*.45+P(t,B,1,3)*.55;c.strokeStyle='#7fb2ff';c.lineWidth=3;c.beginPath();for(let x=0;x<=6*cp;x+=.05){const v=1-Math.exp(-x);x?c.lineTo(X(x),Y(v)):c.moveTo(X(x),Y(v));}c.stroke();
  txt(c,'a hint that God exists',X(1.2)+14,Y(1-Math.exp(-1.2))+30,`italic 500 24px ${DISP}`,'#e8eef7','left',P(t,B,0,1,1.6));
  const gp=P(t,B,1,1,2.4);if(gp>0){const xe=X(5.6),ye=Y(1-Math.exp(-5.6));c.strokeStyle=`rgba(240,197,106,${gp})`;c.lineWidth=1.5;c.beginPath();c.moveTo(xe,ye);c.lineTo(xe,Y(1));c.stroke();txt(c,'never closes',xe-8,ye-14,`12px ${MONO}`,'#f0c56a','right',gp);}
  const rg=P(t,B,2,1);if(rg>0){c.fillStyle=`rgba(240,197,106,${.14*rg})`;c.fillRect(x1+48,100,W-x1-70,340);c.strokeStyle=`rgba(240,197,106,${rg})`;c.lineWidth=2;c.beginPath();c.moveTo(x1+48,100);c.lineTo(x1+48,y0);c.stroke();
    txt(c,'religion',x1+118,250,`italic 600 30px ${DISP}`,'#f0c56a','center',rg);txt(c,'begins',x1+118,284,`italic 600 30px ${DISP}`,'#f0c56a','center',rg);txt(c,'philosophy ends',x1+44,92,`600 12px ${MONO}`,'#f0c56a','right',rg);}
  txt(c,'“Where philosophy ends, religion begins.”',430,500,`italic 500 26px ${DISP}`,'#e8eef7','center',P(t,B,3,1));
  heading(c,8,'Where philosophy ends','plate',true);fig(c,'FIG. 2.8 · y = 1 − e⁻ˣ: ALWAYS CLOSER, NEVER THERE','Hamilton, as quoted by Naren · Great Master 5.8a',true);
};
SC.flame=(c,t,B)=>{const still=P(t,B,2,1);const tt=lerp(t,B[2]+.5,still);
  lanternRig(c,tt,(c,cx,cy,R)=>{
    const imgs=1-P(t,B,1,.8,1.2);if(imgs>0){c.save();c.globalAlpha=imgs;c.strokeStyle='#5a3a1a';c.fillStyle='rgba(200,140,60,.55)';c.lineWidth=3;
      c.beginPath();c.moveTo(cx-120,cy+60);c.lineTo(cx-120,cy-30);c.quadraticCurveTo(cx-90,cy-80,cx-60,cy-30);c.lineTo(cx-60,cy+60);c.closePath();c.fill();c.stroke();
      for(let i=0;i<12;i++){const a=i*Math.PI/6;c.beginPath();c.moveTo(cx+80+Math.cos(a)*24,cy-40+Math.sin(a)*24);c.lineTo(cx+80+Math.cos(a)*52,cy-40+Math.sin(a)*52);c.stroke();}c.beginPath();c.arc(cx+80,cy-40,20,0,7);c.fill();c.stroke();
      c.beginPath();c.moveTo(cx-30,cy+90);c.lineTo(cx-20,cy+50);c.lineTo(cx,cy+76);c.lineTo(cx+20,cy+50);c.lineTo(cx+30,cy+90);c.closePath();c.fill();c.stroke();c.restore();}
    const fl=P(t,B,2,1.2);if(fl>0){c.save();c.globalAlpha=fl;const g=c.createRadialGradient(cx,cy+10,4,cx,cy+10,150);g.addColorStop(0,'rgba(255,240,190,.95)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(cx-R,cy-R,2*R,2*R);
      c.fillStyle='#f0a030';c.beginPath();c.moveTo(cx,cy-80);c.quadraticCurveTo(cx+36,cy,cx,cy+40);c.quadraticCurveTo(cx-36,cy,cx,cy-80);c.fill();c.fillStyle='#fff6d8';c.beginPath();c.moveTo(cx,cy-40);c.quadraticCurveTo(cx+16,cy+6,cx,cy+28);c.quadraticCurveTo(cx-16,cy+6,cx,cy-40);c.fill();
      c.fillStyle='#3a2a18';c.beginPath();c.ellipse(cx,cy+60,60,16,0,0,7);c.fill();c.restore();}
    const tb=P(t,B,3,1);if(tb>0){c.save();c.globalAlpha=tb*(1-P(t,B,3,1.4,1.6));c.strokeStyle='#3a2a18';c.lineWidth=3;c.beginPath();c.arc(cx-110,cy-90,26,0,7);c.stroke();c.beginPath();c.moveTo(cx-110,cy-90);c.lineTo(cx-110,cy-108);c.moveTo(cx-110,cy-90);c.lineTo(cx-96,cy-90);c.stroke();c.restore();}});
  const sl=['FORM','FORMLESS, WITH ATTRIBUTES'];sl.forEach((n,i)=>{const pu=P(t,B,1,.8,.6+i*1.4);slide(c,212+i*14,lerp(272,90,pu),n,i?'rgba(130,160,200,.75)':'rgba(220,150,80,.75)',1-pu);});
  const tl=(s,y,f,col,a)=>txt(c,s,640,y,f,col,'center',a);
  tl('“O God, I do not know Thy nature.',476,`italic 500 22px ${DISP}`,'#e9dfc6',P(t,B,0,1,.6)*(1-P(t,B,1,.5,3)));tl('Manifest Thyself to me as Thou really art.”',502,`italic 500 22px ${DISP}`,'#f0c56a',P(t,B,0,1,2)*(1-P(t,B,1,.5,3)));
  tl('like a lamp in a windless place',490,`italic 600 28px ${DISP}`,'#f0c56a',P(t,B,2,1,2.2)*(1-P(t,B,3,.5)));
  tl('time and body vanish · whole nights',490,`italic 500 26px ${DISP}`,'#e9dfc6',P(t,B,3,1,.8));
  heading(c,9,'A flame in a windless place','lantern',true);fig(c,'','Great Master 5.8a',true);
};
SC.monk=(c,t,B)=>{
  lanternRig(c,t,(c,cx,cy,R)=>{c.fillStyle='rgba(40,30,30,.55)';c.fillRect(cx-R,cy-R,2*R,2*R);
    c.fillStyle='rgba(30,20,15,.85)';c.fillRect(cx+110,cy-60,50,150);
    const ap=P(t,B,0,1.6)*(1-P(t,B,2,.8,-.2));const walk=P(t,B,1,2);const mx=lerp(cx-110,cx-40,walk);
    if(ap>0){c.save();c.globalAlpha=ap;const g=c.createRadialGradient(mx,cy-20,6,mx,cy-20,170);g.addColorStop(0,'rgba(255,220,150,.9)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(cx-R,cy-R,2*R,2*R);
      c.fillStyle='#d8761e';c.beginPath();c.moveTo(mx,cy-50);c.quadraticCurveTo(mx+40,cy+20,mx+36,cy+96);c.lineTo(mx-36,cy+96);c.quadraticCurveTo(mx-40,cy+20,mx,cy-50);c.fill();
      c.fillStyle='#c98a5a';c.beginPath();c.arc(mx,cy-66,18,0,7);c.fill();c.fillStyle='#5a3a2a';c.beginPath();c.ellipse(mx+40,cy+30,12,15,0,0,7);c.fill();c.restore();}
    const nx=lerp(cx+60,cx+136,P(t,B,1,1.2,2.4)*(1-P(t,B,2,1.2)));const nA=1-P(t,B,1,.6,3.4)*(1-P(t,B,2,.6));
    c.save();c.globalAlpha=nA;c.fillStyle='#1a1410';const up=P(t,B,1,.6,1.8);c.beginPath();c.arc(nx,cy+lerp(30,-10,up),14,0,7);c.fill();c.fillRect(nx-14,cy+lerp(46,6,up),28,lerp(44,90,up));c.restore();});
  const tl=(s,y,f,col,a)=>txt(c,s,640,y,f,col,'center',a);
  tl('a monk in ochre, a water pot in his hand',490,`italic 500 24px ${DISP}`,'#e9dfc6',P(t,B,0,1,1.6)*(1-P(t,B,1,.5)));
  tl('seized with fear',490,`italic 500 26px ${DISP}`,'#e9dfc6',P(t,B,1,1,1.6)*(1-P(t,B,2,.5)));
  tl('gone',490,`italic 600 30px ${DISP}`,'#e9dfc6',P(t,B,2,1)*(1-P(t,B,3,.5)));
  tl('“…I saw Lord Buddha that day.”',490,`italic 600 28px ${DISP}`,'#f0c56a',P(t,B,3,1,2.4));
  heading(c,10,'The monk in ochre','lantern',true);fig(c,'','Great Master 5.8a',true);
};
SC.notgod=(c,t,B)=>{paper(c);const go=P(t,B,3,1.6,.6);
  person(c,300,370,.66,ease(seg(t,0,2)),seg(t,1.6,2.6),{shawl:hexm('#34477e','#c8692c',go)});
  for(let i=0;i<6;i++){const a=(i/6)*Math.PI*2+t*.3,r=140+Math.sin(t*2+i)*10,on=P(t,B,0,.4,.3+i*.4)*(1-P(t,B,1,.6,i*.2));txt(c,'?',300+Math.cos(a)*r,250+Math.sin(a)*r*.7,`700 ${34+i*3}px ${DISP}`,'#a8382a','center',on);}
  txt(c,'The gods might be false.',890,170,`600 36px ${DISP}`,INK,'right',P(t,B,1,1,1.6)*(1-P(t,B,2,.5)));txt(c,'But not God.',890,216,`600 44px ${DISP}`,'#a8382a','right',P(t,B,1,1,3.4)*(1-P(t,B,2,.5)));
  const ip=P(t,B,2,2.4);if(ip>0){c.save();c.globalAlpha=P(t,B,2,.5)*(1-P(t,B,3,.5));c.strokeStyle=INK;c.lineWidth=4;c.strokeRect(640,150,60,300);c.fillStyle='#34477e';c.fillRect(640,450-300*ip,60,300*ip);
    txt(c,'INTELLECT',670,474,`600 12px ${MONO}`,INK,'center');const bg=P(t,B,2,1,2.4);const g=c.createRadialGradient(670,110,4,670,110,120);g.addColorStop(0,`rgba(255,220,140,${.8*bg})`);g.addColorStop(1,'rgba(255,220,140,0)');c.fillStyle=g;c.fillRect(540,0,260,240);
    txt(c,'beyond',670,96,`italic 600 30px ${DISP}`,'#a8382a','center',bg);c.restore();}
  txt(c,'NEXT · FILM 3 OF 3',920,410,`600 12px ${MONO}`,'#a8382a','right',P(t,B,3,1,2.2));txt(c,'Kant Comes Home',920,452,`600 42px ${DISP}`,INK,'right',P(t,B,3,1,2.6));
  heading(c,11,'But not God','kalighat',false);fig(c,'','Eastern & Western Disciples ch. 8',false);
};
