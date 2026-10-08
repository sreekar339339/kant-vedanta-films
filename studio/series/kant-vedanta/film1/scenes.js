
const SC={};
SC.open=(c,t,B)=>{paper(c);
  const go=P(t,B,2,1.6);
  person(c,320,300,.95,ease(seg(t,0,2.8)),seg(t,2.4,3.8),{shawl:hexm('#34477e','#c8692c',go),book:true});
  txt(c,'Narendranath, 1881',320,520,`italic 600 24px ${DISP}`,'#a8382a','center',seg(t,1,2)*(1-go));
  txt(c,'later, Swami Vivekananda',320,520,`italic 600 24px ${DISP}`,'#a8382a','center',go);
  const wp=P(t,B,1,1.4);
  if(wp>0){const wh=340*wp;bricks(c,620,476-wh,150,wh,'#a8442e');}
  const ap=P(t,B,1,1.4,.8);
  if(ap>0){c.save();c.setLineDash([6,8]);c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(390,190);c.lineTo(lerp(390,612,ap),190);c.stroke();c.restore();
    txt(c,'reason',500,176,`italic 600 24px ${DISP}`,INK,'center',ap);
    if(ap>=1){c.strokeStyle='#a8382a';c.lineWidth=4;c.beginPath();c.moveTo(600,178);c.lineTo(616,202);c.moveTo(616,178);c.lineTo(600,202);c.stroke();}}
  const sp=P(t,B,2,1.2,2.6);
  for(let i=0;i<3;i++){const x=826+i*40,y=470;if(sp<=0)break;c.save();c.globalAlpha=sp;c.fillStyle='#d98a3c';c.strokeStyle=INK;c.lineWidth=2.5;
    c.beginPath();c.ellipse(x,y-4,18,6,0,0,7);c.fill();c.stroke();c.beginPath();c.moveTo(x-13,y-6);c.quadraticCurveTo(x,y-46,x+13,y-6);c.fill();c.stroke();c.fillStyle='#d79e62';c.beginPath();c.arc(x,y-50,8,0,7);c.fill();c.stroke();c.restore();}
  txt(c,'the sages',866,380,`italic 600 22px ${DISP}`,INK,'center',sp);
  const dp=P(t,B,3,1.4);
  if(dp>0){const g=c.createRadialGradient(695,400,4,695,400,170*dp);g.addColorStop(0,'rgba(255,240,190,.95)');g.addColorStop(1,'rgba(255,220,140,0)');c.fillStyle=g;c.fillRect(520,200,360,300);
    c.fillStyle='#fff6d8';c.fillRect(695-26*dp,476-120,52*dp,120);c.strokeStyle=INK;c.lineWidth=3;c.strokeRect(695-26*dp,476-120,52*dp,120);}
  txt(c,'The Wall Called Reason',920,82,`600 44px ${DISP}`,INK,'right',P(t,B,3,1.2,.9));
  txt(c,'KANT & VEDANTA · FILM 1 OF 3',920,108,`600 12px ${MONO}`,'#a8382a','right',P(t,B,3,1.2,1.3));
  heading(c,1,'Calcutta, 1881','kalighat',false,1-P(t,B,3,1,.6));
  fig(c,'','Great Master 5.8a · Eastern & Western Disciples ch. 8',false);
};
SC.wave=(c,t,B)=>{const dive=P(t,B,3,2.4);
  const dg=c.createLinearGradient(0,0,0,H+440);dg.addColorStop(0,'#0d2a3a');dg.addColorStop(.55,'#0a2030');dg.addColorStop(1,'#04090f');
  c.save();c.translate(0,-dive*430);c.fillStyle=dg;c.fillRect(0,0,W,H+440);
  const amp=10*(1+P(t,B,2,1.2)*1.8),top=150,gap=72;
  waves(c,t,top,gap,amp,['#134a63','#1a5b78','#21708f','#2a86a6','#3a9cbb']);
  [['WEALTH',210,0],['AMBITION',480,1],['FAME',760,2]].forEach(([s,x,k])=>{const a=P(t,B,1,.6,k*.9);const y=waveY(x,t,top,gap,amp*1.6,1)-28+Math.sin(t*1.7+k)*amp*.8;tag(c,s,x,y,a,Math.sin(t*1.3+k)*.12);});
  const bl=c.createLinearGradient(0,H-120,0,H+80);bl.addColorStop(0,'rgba(10,32,48,0)');bl.addColorStop(1,'#0a2030');c.fillStyle=bl;c.fillRect(0,H-120,W,200);c.fillStyle='#0a2030';c.fillRect(0,H+79,W,40);
  c.fillStyle='rgba(255,236,190,.08)';c.fillRect(0,820,W,2);
  txt(c,'what does not change',480,800,`italic 500 40px ${DISP}`,'#f3ead4','center',P(t,B,3,1.4,1.2));
  const g=c.createRadialGradient(480,820,2,480,820,260);g.addColorStop(0,`rgba(255,230,170,${.25*P(t,B,3,1.4,1)})`);g.addColorStop(1,'rgba(255,230,170,0)');c.fillStyle=g;c.fillRect(200,700,560,240);
  c.restore();
  heading(c,2,'What does not change','papercut',true);fig(c,'','The Reality and the Shadow, CW vol. 8',true);
};
SC.forms=(c,t,B)=>{
  const aS=P(t,B,2,.7),aT=P(t,B,2,.7,.8),aC=P(t,B,2,.7,1.6);
  lanternRig(c,t,(c,cx,cy,R)=>worldPicture(c,cx,cy,R,aS,aT,aC,t));
  const ins=(o)=>P(t,B,1,.7,o);
  slide(c,212,lerp(110,272,ins(.6)),'TIME','rgba(240,170,90,.75)',seg(t,B[1]+.4,B[1]+.7));
  slide(c,222,lerp(110,272,ins(1.6)),'SPACE','rgba(130,190,150,.75)',seg(t,B[1]+1.4,B[1]+1.7));
  slide(c,232,lerp(110,272,ins(2.6)),'CAUSATION','rgba(200,90,80,.75)',seg(t,B[1]+2.4,B[1]+2.7));
  txt(c,'modes of thought',340,200,`italic 500 20px ${DISP}`,'#e9dfc6','center',P(t,B,1,1,3.2)*(1-P(t,B,3,.6)));
  const m=P(t,B,3,1);
  txt(c,'माया',340,196,`44px ${DEV}`,'#f0c56a','center',m);txt(c,'MĀYĀ',340,220,`600 12px ${MONO}`,'#f0c56a','center',m);
  txt(c,'not a product of thought:',640,474,`italic 500 22px ${DISP}`,'#e9dfc6','center',P(t,B,4,1));
  txt(c,'the groundwork of all thought',640,500,`italic 500 22px ${DISP}`,'#f0c56a','center',P(t,B,4,1,.5));
  txt(c,'Kant · Critique of Pure Reason, 1781',36,100,`12px ${MONO}`,'#b08a4a','left',P(t,B,0,1));
  heading(c,3,"Kant's discovery",'lantern',true);fig(c,'','Inspired Talks, 14 July 1895 · The Reality and the Shadow',true);
};
function kanizsa(c,ox,oy,R,r,al){const off=[1.4,-1.9,2.5];for(let i=0;i<3;i++){const a=(-90+120*i)*Math.PI/180,x=ox+Math.cos(a)*R,y=oy+Math.sin(a)*R,m=a+Math.PI+(1-al)*off[i];c.fillStyle='#121212';c.beginPath();c.moveTo(x,y);c.arc(x,y,r,m+Math.PI/6,m-Math.PI/6+Math.PI*2);c.closePath();c.fill();}}
SC.xmind=(c,t,B)=>{grid(c,true);
  const A=1-seg(t,B[1]-.4,B[1]),Bk=seg(t,B[1]-.4,B[1])*(1-seg(t,B[4]-.4,B[4])),C=seg(t,B[4]-.4,B[4])*(1-seg(t,B[5]-.4,B[5])),D=seg(t,B[5]-.4,B[5]);
  if(A>0){c.save();c.globalAlpha=A;
    c.save();c.globalAlpha*=.9;bricks(c,90,170,90,230,'#bdb5a6','#444');c.restore();txt(c,'the wall',135,430,`600 13px ${MONO}`,'#444','center');
    const rp=P(t,B,0,1.4,.4);c.strokeStyle='#d0a030';c.lineWidth=2;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(184,285+i*40);c.lineTo(lerp(184,392,rp),lerp(285+i*40,285+i*6,rp));c.stroke();}
    txt(c,'light',290,240,`600 13px ${MONO}`,'#a07818','center',rp);
    c.strokeStyle='#121212';c.lineWidth=3;c.fillStyle='#fff';c.beginPath();c.moveTo(392,285);c.quadraticCurveTo(430,245,468,285);c.quadraticCurveTo(430,325,392,285);c.fill();c.stroke();c.fillStyle='#3d5a80';c.beginPath();c.arc(438,285,15,0,7);c.fill();c.fillStyle='#121212';c.beginPath();c.arc(438,285,6,0,7);c.fill();
    txt(c,'eye',430,340,`600 13px ${MONO}`,'#444','center');
    const np=P(t,B,0,1,1.8);c.strokeStyle='#888';c.lineWidth=3;c.beginPath();c.moveTo(470,285);c.bezierCurveTo(520,285,540,250,590,250);c.stroke();
    if(np>0&&np<1){c.fillStyle='#c0392b';c.beginPath();c.arc(lerp(470,590,np),lerp(285,250,np),6,0,7);c.fill();}
    const br=P(t,B,0,.8,3.2);c.fillStyle=`rgba(192,57,43,${.12+.25*br})`;c.strokeStyle='#121212';c.lineWidth=3;c.beginPath();c.ellipse(660,250,80,58,0,0,7);c.fill();c.stroke();
    c.beginPath();c.moveTo(600,240);c.quadraticCurveTo(640,210,660,250);c.quadraticCurveTo(690,280,720,240);c.stroke();
    txt(c,'mind reacts',660,340,`600 13px ${MONO}`,'#c0392b','center',br);
    const sp=P(t,B,0,1,4.4);if(sp>0){c.save();c.globalAlpha*=sp;c.setLineDash([6,5]);c.strokeStyle='#121212';c.lineWidth=2;c.strokeRect(790,190,70,150);c.restore();txt(c,'wall seen',825,370,`600 13px ${MONO}`,'#121212','center',sp);}
    c.restore();}
  if(Bk>0){c.save();c.globalAlpha=Bk;const al=P(t,B,1,1.2,.4);kanizsa(c,380,285,138,72,al);
    const an=P(t,B,2,.5)*(1-P(t,B,3,.5));if(an>0){c.globalAlpha=Bk*an;arrow(c,560,410,392,355,'#c0392b',2);txt(c,'no line is drawn here',566,422,`600 14px ${MONO}`,'#c0392b');c.globalAlpha=Bk;}
    const eq=P(t,B,3,1);txt(c,'seen',720,240,`italic 500 34px ${DISP}`,'#121212','center',eq);txt(c,'=',720,282,`500 34px ${DISP}`,'#121212','center',eq);
    txt(c,'X + mind',720,330,`600 44px ${DISP}`,'#c0392b','center',eq);txt(c,'X: the world as it is',720,364,`12px ${MONO}`,'#555','center',eq);
    c.restore();}
  if(C>0){c.save();c.globalAlpha=C;const x0=90,x1=880,lx=f=>lerp(x0,x1,f/20);
    c.strokeStyle='#121212';c.lineWidth=2;c.beginPath();c.moveTo(x0,330);c.lineTo(x1,330);c.stroke();
    for(let e=0;e<=20;e+=2){c.beginPath();c.moveTo(lx(e),330);c.lineTo(lx(e),338);c.stroke();txt(c,`10${['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','¹⁰','¹¹','¹²','¹³','¹⁴','¹⁵','¹⁶','¹⁷','¹⁸','¹⁹','²⁰'][e]}`,lx(e),356,`12px ${MONO}`,'#333','center');}
    txt(c,'frequency, Hz (log scale)',x1,378,`11px ${MONO}`,'#555','right');
    const pr=P(t,B,4,1.2);
    c.fillStyle='rgba(120,120,120,.35)';c.fillRect(lx(1.3),190,(lx(4.3)-lx(1.3))*pr,22);txt(c,'hearing · 20 Hz – 20 kHz (sound waves)',lx(1.3),182,`12px ${MONO}`,'#333','left',pr);
    c.fillStyle='rgba(60,60,60,.12)';c.fillRect(lx(3),290,(lx(20)-lx(3))*pr,30);
    [['radio',6],['microwave',10.5],['infrared',13.3],['ultraviolet',15.7],['x-ray',17.8],['gamma',19.5]].forEach(([n,e])=>txt(c,n,lx(e),310,`13px ${MONO}`,'#444','center',pr));
    const vg=c.createLinearGradient(lx(14.6),0,lx(14.9),0);['#c0392b','#e67e22','#f1c40f','#27ae60','#2980b9','#8e44ad'].forEach((col,i)=>vg.addColorStop(i/5,col));
    c.fillStyle=vg;c.fillRect(lx(14.6),284,Math.max(4,lx(14.9)-lx(14.6)),42);
    const vl=P(t,B,4,1,1.2);arrow(c,lx(14.75),250,lx(14.75),280,'#121212',2,vl);txt(c,'all we see: 400–790 THz',lx(14.75),242,`600 13px ${MONO}`,'#121212','center',vl);
    const es=P(t,B,4,1,3.6);if(es>0){c.save();c.globalAlpha*=es;c.setLineDash([6,5]);c.strokeStyle='#c0392b';c.lineWidth=2;c.strokeRect(lx(4),278,lx(11)-lx(4),54);c.restore();txt(c,'an electric sense?',lx(7.5),420,`italic 600 26px ${DISP}`,'#c0392b','center',es);}
    fig(c,'FIG. 1.4 · WHAT THE SENSES REACH','standard band limits',false);c.restore();}
  if(D>0){c.save();c.globalAlpha=D;c.setLineDash([6,5]);c.strokeStyle='#121212';c.lineWidth=2;c.strokeRect(100,215,110,110);c.setLineDash([]);
    txt(c,'X',155,288,`600 64px ${DISP}`,'#121212','center');txt(c,'unchanged',155,350,`12px ${MONO}`,'#555','center');
    [['touch and sound',250,'#b5b0a6'],['five senses',270,'#d9a441'],['an electric sense',290,'#6f9bd1']].forEach(([n,_,col],i)=>{const y=150+i*120,p=P(t,B,5,.8,i*.6);arrow(c,214,270,480,y,'#555',1.5,p);
      if(p>0){c.save();c.globalAlpha*=p;c.fillStyle=col;c.beginPath();c.arc(560,y,48,0,7);c.fill();c.strokeStyle='#121212';c.lineWidth=2;c.stroke();
        for(let k=0;k<=i+1;k++){c.strokeStyle='rgba(0,0,0,.35)';c.beginPath();c.arc(560,y,12+k*11,0,7);c.stroke();}c.restore();
        txt(c,'X + '+n,630,y+6,`italic 500 26px ${DISP}`,'#121212','left',p);}});
    c.restore();}
  heading(c,4,'X plus mind','percept',false);if(C<=0)fig(c,'','Introduction to Jnana-Yoga, CW vol. 6',false);
};
function lensRow(c,cy,out,p,kind,dim){const a=seg(p,0,.15);c.save();c.globalAlpha=a*dim;
  const r1=seg(p,.18,.45);c.strokeStyle='#c9d6e8';c.lineWidth=1.4;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(212,cy+i*14);c.lineTo(lerp(212,452,r1),cy+i*14*(1-r1*.6));c.stroke();}
  c.globalAlpha=seg(p,.3,.5)*dim;[['TIME','#7fb2ff'],['SPACE','#9be0b5'],['CAUSATION','#f0c56a']].forEach(([n,col],i)=>{c.fillStyle=col+'55';c.strokeStyle=col;c.lineWidth=1.5;c.beginPath();c.ellipse(470+i*14,cy,12,58,0,0,Math.PI*2);c.fill();c.stroke();});
  txt(c,'mind',484,cy+84,`italic 500 20px ${DISP}`,'#c9d6e8','center');
  const r2=seg(p,.5,.8);c.globalAlpha=dim;c.strokeStyle='#f0c56a';c.lineWidth=1.6;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(512,cy+i*7);c.lineTo(lerp(512,700,r2),cy+i*7+i*14*r2);c.stroke();}
  const o=seg(p,.75,1);c.globalAlpha=o*dim;
  if(kind==='world'){c.strokeStyle='#f0c56a';c.lineWidth=2;c.beginPath();c.moveTo(720,cy+36);c.lineTo(870,cy+36);c.stroke();c.beginPath();c.arc(840,cy-18,15,0,7);c.stroke();c.beginPath();c.moveTo(752,cy+36);c.lineTo(772,cy-22);c.lineTo(792,cy+36);c.closePath();c.stroke();}
  else txt(c,'“I”',795,cy+20,`600 58px ${DISP}`,'#f0c56a','center');
  txt(c,out,795,cy+66,`13px ${MONO}`,'#e8eef7','center');c.restore();}
function xbox(c,x,y,L,sub,a,col='#e8eef7'){if(a<=0)return;c.save();c.globalAlpha*=a;c.setLineDash([6,5]);c.strokeStyle='#c9d6e8';c.lineWidth=1.5;c.strokeRect(x-60,y-56,120,112);c.setLineDash([]);
  txt(c,L,x,y+20,`600 64px ${DISP}`,col,'center');txt(c,sub,x,y+76,`12px ${MONO}`,'#8a9bb3','center');c.restore();}
SC.ymind=(c,t,B)=>{grid(c,false);const mg=P(t,B,4,1.6);
  const yX=lerp(150,280,mg),yY=lerp(400,280,mg);
  lensRow(c,150,'world = X + mind',1,'world',(.55+.45*(1-P(t,B,1,.5)))*(1-mg*.8));
  lensRow(c,400,'self = Y + mind',seg(t,B[0]+.6,B[1]+3.4),'self',1-mg*.8);
  if(mg<.98){xbox(c,152,yX,'X','unknown',1-mg);xbox(c,152,yY,'Y','unknown',seg(t,.3,1.2)*(1-mg));}
  const kn=P(t,B,2,1)*(1-P(t,B,3,.6));txt(c,'Kant, 1781',570,286,`600 13px ${MONO}`,'#f0c56a','left',kn);txt(c,'the Vedas: long before',570,306,`600 13px ${MONO}`,'#9be0b5','left',P(t,B,2,1,2.6)*(1-P(t,B,3,.6)));
  const ta=P(t,B,3,1.2)*(1-mg);if(ta>0){c.save();c.globalAlpha=ta;arrow(c,80,276,900,276,'#7fb2ff',2);for(let x=110;x<890;x+=60){c.beginPath();c.moveTo(x,270);c.lineTo(x,282);c.stroke();}
    txt(c,'TIME: where difference lives',890,262,`600 13px ${MONO}`,'#7fb2ff','right');c.restore();}
  if(mg>0){c.fillStyle=`rgba(240,197,106,${.13*mg})`;c.beginPath();c.arc(152,280,120,0,7);c.fill();txt(c,'X = Y',152,296,`600 48px ${DISP}`,'#f0c56a','center',seg(mg,.6,1));
    txt(c,'seen outside: the world',300,250,`italic 500 30px ${DISP}`,'#e8eef7','left',P(t,B,4,1,1.4));txt(c,'seen inside: the Self',300,310,`italic 500 30px ${DISP}`,'#f0c56a','left',P(t,B,4,1,2.6));}
  heading(c,5,'Y plus mind','plate',true);fig(c,'FIG. 1.5 · TWO UNKNOWNS, ONE REALITY','Introduction to Jnana-Yoga, CW vol. 6',true);
};
function shadowScene(c,t,t0,lampT){const lit=ease(seg(t,lampT+.2,lampT+1.6));
  const g=c.createRadialGradient(480,230,40,480,260,620);g.addColorStop(0,`rgb(${lerp(226,252,lit)|0},${lerp(150,222,lit)|0},${lerp(72,150,lit)|0})`);g.addColorStop(1,`rgb(${lerp(60,140,lit)|0},${lerp(26,80,lit)|0},${lerp(10,30,lit)|0})`);
  c.fillStyle=g;c.fillRect(0,0,W,H);c.fillStyle='#120804';c.fillRect(0,430,W,110);
  const rec=ease(seg(t,t0+1.2,t0+2))*(1-ease(seg(t,lampT+1.8,lampT+2.6)));
  c.save();c.translate(270,430);c.rotate(-.28*rec);c.strokeStyle='#120804';c.fillStyle='#120804';c.lineCap='round';c.lineWidth=16;
  c.beginPath();c.moveTo(-14,0);c.lineTo(0,-90);c.lineTo(14,0);c.stroke();c.beginPath();c.moveTo(0,-90);c.lineTo(0,-170);c.stroke();
  c.lineWidth=12;c.beginPath();c.moveTo(0,-150);c.lineTo(lerp(34,-30,rec),lerp(-110,-190,rec));c.stroke();c.beginPath();c.moveTo(0,-150);c.lineTo(lerp(-20,40,rec),lerp(-108,-190,rec));c.stroke();c.beginPath();c.arc(0,-196,22,0,7);c.fill();c.restore();
  const m=1-ease(seg(t,lampT+.5,lampT+1.8));c.strokeStyle='#120804';c.lineWidth=11;c.lineCap='round';c.lineJoin='round';c.beginPath();const pts=[];
  for(let i=0;i<=40;i++){const x=450+i*8,amp=m*16*Math.sin(i*.45-t*3.2)*(i/40+.2),lift=m*Math.max(0,i-32)*7;pts.push([x,424-amp-lift]);}
  pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();const[hx,hy]=pts[40];
  if(m>.05){c.save();c.globalAlpha=m;c.fillStyle='#120804';c.beginPath();c.ellipse(hx+10,hy-4,18,11,-.3,0,7);c.fill();c.lineWidth=2;c.beginPath();c.moveTo(hx+26,hy-8);c.lineTo(hx+40,hy-6+Math.sin(t*12)*3);c.stroke();c.restore();}
  else{c.lineWidth=2;c.strokeStyle='rgba(18,8,4,.6)';for(let i=2;i<40;i+=3){const[x,y]=pts[i];c.beginPath();c.moveTo(x-3,y-5);c.lineTo(x+3,y+5);c.stroke();}}
  const la=seg(t,lampT-.4,lampT+.3);if(la>0){c.save();c.globalAlpha=la;c.fillStyle='#120804';c.beginPath();c.ellipse(150,412,30,10,0,0,7);c.fill();c.fillRect(146,378,8,30);
    const fl=c.createRadialGradient(150,360,2,150,360,60);fl.addColorStop(0,'rgba(255,250,220,.95)');fl.addColorStop(1,'rgba(255,220,140,0)');c.fillStyle=fl;c.beginPath();c.arc(150,360,60,0,7);c.fill();c.fillStyle='#fff3c8';c.beginPath();c.ellipse(150,364,6,14+Math.sin(t*14)*2,0,0,7);c.fill();c.restore();}}
SC.rope=(c,t,B)=>{const s=seg(t,B[1]-.3,B[1]+.3);
  if(s<1){c.fillStyle='#0d2a3a';c.fillRect(0,0,W,H);c.save();c.globalAlpha=1-s;
    const sh=(x,y,lab,col,rot)=>{c.save();c.translate(x,y);c.rotate(rot);c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=18;c.shadowOffsetY=8;c.fillStyle=col;c.fillRect(-150,-110,300,220);c.shadowColor='transparent';c.fillStyle=INK;c.font=`600 18px ${MONO}`;c.textAlign='center';c.fillText(lab,0,8);c.restore();};
    const sp=P(t,B,0,1.2);sh(lerp(480,560,sp),lerp(280,250,sp),'A REAL WORLD','#c9b88f',.05);sh(lerp(480,420,sp),lerp(280,310,sp),'A FALSE WORLD','#e6d2a6',-.04);
    txt(c,'?',480,170,`600 72px ${DISP}`,'#f3ead4','center',P(t,B,0,1,1.4));c.restore();}
  if(s>0){c.save();c.globalAlpha=s;shadowScene(c,t,B[1],B[2]);
    txt(c,'one world',480,140,`600 56px ${DISP}`,'#2a1206','center',P(t,B,3,1));txt(c,'seen through the senses: phenomenal · as it is: the real',480,176,`600 13px ${MONO}`,'#3a1a0a','center',P(t,B,3,1,1.4));c.restore();}
  heading(c,6,'Rope or snake','papercut',s<.5);fig(c,'','Buddhism and Vedanta, CW vol. 5',s<.5);
};
SC.will=(c,t,B)=>{grid(c,false);
  const q=1-P(t,B,1,.6);txt(c,'“The world is will.”',480,250,`italic 500 48px ${DISP}`,'#e8eef7','center',P(t,B,0,1)*q);txt(c,'SCHOPENHAUER · The World as Will and Representation, 1818',480,290,`600 12px ${MONO}`,'#8fb3d9','center',P(t,B,0,1,.6)*q);
  const cp=P(t,B,1,1,.3)*(1-P(t,B,2,.6));if(cp>0){c.save();c.globalAlpha=cp;
    const bx=(x,y,w,l1,l2,col)=>{c.strokeStyle=col;c.lineWidth=2;c.strokeRect(x,y,w,70);txt(c,l1,x+w/2,y+32,`600 15px ${MONO}`,col,'center');txt(c,l2,x+w/2,y+54,`12px ${MONO}`,'#8a9bb3','center');};
    bx(110,200,230,'STIMULUS','from outside','#9be0b5');txt(c,'+',370,246,`600 40px ${DISP}`,'#e8eef7','center');bx(400,200,230,'REACTION','of the brain (buddhi)','#7fb2ff');
    arrow(c,640,235,700,235,'#f0c56a',2);txt(c,'WILL',780,250,`600 44px ${DISP}`,'#f0c56a','center');txt(c,'a compound, as much as a wall',780,280,`12px ${MONO}`,'#e8eef7','center',P(t,B,1,1,3.6));
    const wb=P(t,B,1,1,3.6);if(wb>0){c.save();c.globalAlpha*=wb;bricks(c,730,310,100,60,'#5a6476','#c9d6e8');c.restore();}c.restore();}
  const tp=P(t,B,2,1);if(tp>0){c.save();c.globalAlpha=tp;arrow(c,90,380,880,380,'#7fb2ff',2);txt(c,'time →',880,404,`600 13px ${MONO}`,'#7fb2ff','right');
    for(let x=120;x<870;x+=50){c.strokeStyle='#7fb2ff';c.beginPath();c.moveTo(x,374);c.lineTo(x,386);c.stroke();}
    const wp=P(t,B,2,1.2,1.2);c.fillStyle='rgba(240,197,106,.85)';c.fillRect(360,340,220*wp,34);txt(c,'WILL',470,364,`600 16px ${MONO}`,'#1a1006','center',wp);
    txt(c,'every act of will happens in time',470,330,`italic 500 24px ${DISP}`,'#e8eef7','center',P(t,B,2,1,2.4));c.restore();}
  const ab=P(t,B,3,1.2);if(ab>0){c.save();c.globalAlpha=ab;c.setLineDash([8,6]);c.strokeStyle='#e8eef7';c.lineWidth=2;c.beginPath();c.arc(760,180,70,0,7);c.stroke();c.setLineDash([]);
    txt(c,'the Absolute',760,176,`italic 600 26px ${DISP}`,'#e8eef7','center');txt(c,'beyond time',760,200,`12px ${MONO}`,'#8a9bb3','center');
    txt(c,'≠',640,250,`600 64px ${DISP}`,'#c0392b','center',P(t,B,3,.8,1));c.restore();}
  heading(c,7,'Will lives in time','plate',true);fig(c,'FIG. 1.7 · WILL IS A COMPOUND, AND IT IS IN TIME','Buddhism and Vedanta, CW vol. 5',true);
};
SC.ocean=(c,t,B)=>{c.fillStyle='#0d2a3a';c.fillRect(0,0,W,H);waves(c,t,60,95,10,['#134a63','#1a5b78','#21708f','#2a86a6','#3a9cbb']);
  const ld=P(t,B,1,1.2),lift=seg(t,B[2]-.2,B[2]+.4),k=P(t,B,2,1.8,.4);
  const land=(d,dx,dy,rot)=>{if(ld<=0)return;c.save();c.globalAlpha=ld;c.translate(dx,dy+(1-ld)*-40);c.rotate(rot);c.shadowColor='rgba(0,0,0,.45)';c.shadowBlur=10+18*lift;c.shadowOffsetY=6+10*lift;c.fillStyle='#e6d2a6';const p=new Path2D(d);c.fill(p);c.shadowColor='transparent';c.strokeStyle='rgba(150,110,60,.35)';c.lineWidth=1;c.stroke(p);c.restore();};
  land('M0 0 L560 0 L560 140 Q 430 140 400 220 Q 320 300 230 230 Q 200 150 0 170 Z',0,-340*k,-.05*k);
  land('M640 0 L960 0 L960 540 L790 540 Q 720 420 660 300 Q 610 190 640 0 Z',400*k,0,.04*k);
  land('M0 540 L0 410 L170 400 L186 492 L214 492 L232 398 L470 420 Q 560 440 600 540 Z',0,340*k,.04*k);
  const lb=(s,x,y,o)=>txt(c,s,x,y,`700 18px ${MONO}`,'#f3ead4','center',P(t,B,1,.5,o)*(1-lift));lb('BAY',300,215,1.4);lb('STRAIT',600,130,2.1);lb('INLET ↓',200,380,2.8);
  c.save();c.letterSpacing='14px';txt(c,'OCEAN',480,300,`600 68px ${DISP}`,'#f3ead4','center',P(t,B,2,1,1.8));c.restore();
  txt(c,'same reality · different forms',480,140,`italic 500 30px ${DISP}`,'#f3ead4','center',P(t,B,0,1,.4)*(1-ld));
  heading(c,8,'Bay, strait, inlet','papercut',true,k>.3?1:1-ld);fig(c,'','The Reality and the Shadow, CW vol. 8',true);
};
SC.wall=(c,t,B)=>{wood(c);const lv=seg(t,B[2]-.5,B[2]+.5);
  if(lv<1){c.save();c.globalAlpha=1-lv;bricks(c,420,70,150,410,'#4a4038','#1a120c');
    c.save();c.translate(495,275);c.rotate(-Math.PI/2);txt(c,'REASON',0,10,`700 30px ${MONO}`,'#e8d6ad','center');c.restore();
    txt(c,'Kant: no way past this wall',230,200,`italic 500 26px ${DISP}`,'#e8d6ad','center',P(t,B,0,1,1.4));
    const fp=P(t,B,1,1);if(fp>0){c.save();c.globalAlpha*=fp;c.fillStyle='#e0904a';c.beginPath();c.arc(380,330,14,0,7);c.fill();c.fillRect(372,346,16,60);c.fillRect(366,406,8,40);c.fillRect(386,406,8,40);c.restore();
      txt(c,'Indian thought',230,360,`italic 500 26px ${DISP}`,'#e0904a','center',fp);txt(c,'begins here',230,392,`italic 500 26px ${DISP}`,'#e0904a','center',fp);}
    c.restore();}
  if(lv>0){c.save();c.globalAlpha=lv;c.translate(0,(1-lv)*-60);leaf(c,60,150,840,240);
    const qa=1-P(t,B,3,.6);txt(c,'“Nature, do you know what the soul is?”',480,240,`italic 500 34px ${DISP}`,INK,'center',qa);txt(c,'“No.”',480,310,`italic 600 40px ${DISP}`,'#8c2f1c','center',P(t,B,2,.8,2.6)*qa);
    const words=[['सूर्य','the sun'],['चन्द्र','the moon'],['तारा','the stars'],['देव','the gods'],['देह','the body'],['मन','the mind']];
    const ls=P(t,B,3,.6)*(1-P(t,B,4,.8)*.85);
    words.forEach(([d,e],i)=>{const x=170+(i%3)*270,y=i<3?232:332,a=ls*P(t,B,3,.4,.2+i*.15);if(a<=0)return;c.save();c.globalAlpha=a*(1-P(t,B,3,.6,5.2)*.75);
      c.font=`44px ${DEV}`;c.fillStyle=INK;c.textAlign='left';c.fillText(d,x,y);const w=c.measureText(d).width;c.font=`13px ${MONO}`;c.fillStyle='#5a3e22';c.fillText(e.toUpperCase(),x,y+24);strike(c,x,y-16,w,P(t,B,3,.4,1.4+i*.4));c.restore();});
    const nn=P(t,B,3,.8,5.4)*(1-P(t,B,4,.8));txt(c,'नेति नेति',480,300,`72px ${DEV}`,INK,'center',nn);
    const th=P(t,B,4,1.4,.4);if(th>0){const g=c.createRadialGradient(480,270,4,480,270,200);g.addColorStop(0,`rgba(255,248,220,${.8*th})`);g.addColorStop(1,'rgba(255,248,220,0)');c.fillStyle=g;c.fillRect(260,150,440,240);
      txt(c,'तत्',480,296,`80px ${DEV}`,INK,'center',th);}
    c.restore();
    txt(c,'Not this, not this.',480,446,`italic 500 30px ${DISP}`,'#e8d6ad','center',P(t,B,3,.8,6.2)*(1-P(t,B,4,.6)));
    txt(c,'Whatever remains: That.',480,446,`italic 500 30px ${DISP}`,'#f0c56a','center',P(t,B,4,1,2));}
  heading(c,9,'The dead wall','palmleaf',true);fig(c,'','Raja-Yoga, Introduction · Vedantism (Khetri) · Buddhism and Vedanta',true);
};
SC.dark=(c,t,B)=>{grid(c,false);const x0=90,x1=880,lf=f=>lerp(x0,x1,(Math.log10(f)-2)/(Math.log10(3000)-2));
  const st=P(t,B,0,1)*(1-P(t,B,1,.6));if(st>0){c.save();c.globalAlpha=st;c.fillStyle='#7d828c';c.beginPath();c.ellipse(480,290,90,56,-.1,0,7);c.fill();c.strokeStyle='#c9d6e8';c.lineWidth=2;c.stroke();txt(c,'?',600,250,`600 64px ${DISP}`,'#e8eef7','center');txt(c,'beyond thought = a stone?',480,400,`italic 500 30px ${DISP}`,'#e8eef7','center');c.restore();}
  const pl=P(t,B,1,.6);if(pl>0){c.save();c.globalAlpha=pl;
    c.strokeStyle='#c9d6e8';c.lineWidth=2;c.beginPath();c.moveTo(x0,400);c.lineTo(x1,400);c.stroke();
    [100,200,400,800,1600,3000].forEach(f=>{c.beginPath();c.moveTo(lf(f),400);c.lineTo(lf(f),408);c.stroke();txt(c,f+'',lf(f),426,`12px ${MONO}`,'#c9d6e8','center');});
    txt(c,'light frequency, THz (log scale) →',x1,448,`11px ${MONO}`,'#8fb3d9','right');
    const sw=lerp(x0,x1,P(t,B,1,6.4,.4));c.save();c.beginPath();c.rect(x0,120,sw-x0,290);c.clip();
    const g=c.createLinearGradient(lf(400),0,lf(790),0);['#c0392b','#e67e22','#f1c40f','#27ae60','#2980b9','#8e44ad'].forEach((col,i)=>g.addColorStop(i/5,col));
    c.beginPath();c.moveTo(lf(380),400);for(let f=380;f<=800;f+=4){const l=299792/f,v=Math.exp(-.5*Math.pow((l-555)/45,2));c.lineTo(lf(f),400-v*240);}c.lineTo(lf(800),400);c.closePath();c.fillStyle=g;c.globalAlpha=.85;c.fill();c.globalAlpha=1;
    c.fillStyle='rgba(0,0,0,.35)';c.fillRect(x0,150,lf(380)-x0,250);c.fillRect(lf(800),150,x1-lf(800),250);
    txt(c,'DARK',(x0+lf(380))/2,250,`600 22px ${MONO}`,'#8fb3d9','center');txt(c,'infrared · too slow',(x0+lf(380))/2,276,`12px ${MONO}`,'#8fb3d9','center');
    txt(c,'LIGHT',lf(540),140,`600 22px ${MONO}`,'#f0c56a','center');
    txt(c,'DARK',(lf(800)+x1)/2,250,`600 22px ${MONO}`,'#8fb3d9','center');txt(c,'ultraviolet · too fast',(lf(800)+x1)/2,276,`12px ${MONO}`,'#8fb3d9','center');c.restore();
    const po=P(t,B,2,1);txt(c,'below thought',(x0+lf(380))/2,340,`italic 600 24px ${DISP}`,'#e8eef7','center',po);txt(c,'beyond thought',(lf(800)+x1)/2,340,`italic 600 24px ${DISP}`,'#f0c56a','center',po);
    const ic=P(t,B,3,1);if(ic>0){c.save();c.globalAlpha*=ic;c.fillStyle='#7d828c';c.beginPath();c.ellipse((x0+lf(380))/2,190,40,24,-.1,0,7);c.fill();
      const sx=(lf(800)+x1)/2;for(let i=0;i<12;i++){const a=i*Math.PI/6;c.strokeStyle='#f0c56a';c.lineWidth=2;c.beginPath();c.moveTo(sx+Math.cos(a)*10,190+Math.sin(a)*10);c.lineTo(sx+Math.cos(a)*26,190+Math.sin(a)*26);c.stroke();}c.restore();
      txt(c,'cannot reason',(x0+lf(380))/2,370,`12px ${MONO}`,'#c9d6e8','center',ic);txt(c,'need not reason',(lf(800)+x1)/2,370,`12px ${MONO}`,'#f0c56a','center',ic);}
    c.restore();}
  heading(c,10,'Two darknesses','plate',true);fig(c,'FIG. 1.10 · EYE SENSITIVITY TO LIGHT (CIE 1924, APPROX.)','Raja-Yoga, Introduction, CW vol. 1',true);
};
function cproj(lon,lat){return[lerp(40,920,(lon+6)/102),lerp(60,500,(58-lat)/54)];}
SC.shankara=(c,t,B)=>{parchment(c);
  c.strokeStyle='rgba(107,84,52,.18)';c.lineWidth=1;for(let lon=0;lon<=90;lon+=15){const[x]=cproj(lon,0);c.beginPath();c.moveTo(x,20);c.lineTo(x,H-20);c.stroke();}for(let lat=10;lat<=50;lat+=10){const[,y]=cproj(0,lat);c.beginPath();c.moveTo(20,y);c.lineTo(W-20,y);c.stroke();}
  const pts={k:cproj(20.5,54.7),o:cproj(-1.26,51.75),i:cproj(88.4,22.6)};
  const dot=(p,l,dx,dy,a)=>{c.save();c.globalAlpha*=a;c.fillStyle='#3d2e1a';c.beginPath();c.arc(p[0],p[1],5,0,7);c.fill();c.restore();txt(c,l,p[0]+dx,p[1]+dy,`600 13px ${MONO}`,'#3d2e1a',dx<0?'right':'left',a);};
  dot(pts.k,'KÖNIGSBERG · Kant',10,-8,1);dot(pts.o,'OXFORD · Max Müller',10,20,P(t,B,2,1));dot(pts.i,'INDIA',-12,-10,1);
  const curve=(a,b,lift,p,col,dash)=>{const cx=(a[0]+b[0])/2,cy=Math.min(a[1],b[1])-lift;c.strokeStyle=col;c.lineWidth=2.4;c.setLineDash(dash||[]);c.beginPath();let last=a;for(let i=0;i<=60*p;i++){const s=i/60;last=[(1-s)**2*a[0]+2*(1-s)*s*cx+s*s*b[0],(1-s)**2*a[1]+2*(1-s)*s*cy+s*s*b[1]];i?c.lineTo(...last):c.moveTo(...last);}c.stroke();c.setLineDash([]);return last;};
  const q=P(t,B,0,2,.4);if(q>0){curve(pts.k,pts.i,40,q,'#6b5434',[8,6]);txt(c,'?',(pts.k[0]+pts.i[0])/2,(pts.k[1]+pts.i[1])/2-30,`600 48px ${DISP}`,'#6b5434','center',seg(q,.8,1));}
  const no=P(t,B,0,.6,3.4);if(no>0){const m=[(pts.k[0]+pts.i[0])/2,(pts.k[1]+pts.i[1])/2-10];c.strokeStyle='#8c3a24';c.lineWidth=5;c.beginPath();c.moveTo(m[0]-18*no,m[1]-18*no);c.lineTo(m[0]+18*no,m[1]+18*no);c.moveTo(m[0]+18*no,m[1]-18*no);c.lineTo(m[0]-18*no,m[1]+18*no);c.stroke();}
  const lv=P(t,B,1,1);if(lv>0){c.save();c.globalAlpha=lv;c.translate(0,(1-lv)*-30);leaf(c,250,320,640,150);
    txt(c,'देश · काल · निमित्त  =  माया',570,392,`38px ${DEV}`,INK,'center');txt(c,'SPACE · TIME · CAUSATION = MĀYĀ',570,424,`600 13px ${MONO}`,'#5a3e22','center');txt(c,'Shankara, c. 8th century',570,450,`italic 500 20px ${DISP}`,'#5a3e22','center');c.restore();}
  const lp=P(t,B,2,3,.6);if(lp>0){const e=curve(pts.i,pts.o,150,lp,'#8c3a24',[3,7]);c.save();c.translate(e[0],e[1]);c.fillStyle='#fbf6ea';c.strokeStyle='#3d2e1a';c.lineWidth=2;c.fillRect(-16,-11,32,22);c.strokeRect(-16,-11,32,22);c.beginPath();c.moveTo(-16,-11);c.lineTo(0,2);c.lineTo(16,-11);c.stroke();c.restore();}
  txt(c,'passages from Shankara’s commentaries',480,150,`italic 500 24px ${DISP}`,'#3d2e1a','center',P(t,B,2,1,1.2));
  heading(c,11,'Shankara first','chart',false);fig(c,'','The Vedanta in All Its Phases, CW vol. 3',false);
};
SC.stairs=(c,t,B)=>{paper(c);
  person(c,170,330,.62,ease(seg(t,0,2.2)),seg(t,1.8,3),{shawl:'#efe9da',dhoti:'#f7f2e6',beard:true,look:2});
  person(c,370,356,.5,ease(seg(t,.6,2.6)),seg(t,2.2,3.2),{shawl:'#7a4a2a',look:-2});
  txt(c,'Ramakrishna',170,500,`italic 600 20px ${DISP}`,'#a8382a','center',seg(t,2,3));txt(c,'a devotee',370,500,`italic 600 20px ${DISP}`,'#a8382a','center',seg(t,2,3));
  const bq=P(t,B,0,.6,1.6)*(1-P(t,B,1,.5));if(bq>0){cloud(c,420,140,120,58,bq);txt(c,'Is the world unreal?',420,148,`italic 600 24px ${DISP}`,INK,'center',bq);}
  const N=7,sx=520,sy=478,dx=52,dy=46,sp=P(t,B,1,1.2),rf=P(t,B,2,.8);
  const same=P(t,B,2,1,1.2);const stepCol=hexm('#d8c4a0','#a8442e',same);
  for(let i=0;i<N;i++){const a=seg(sp,i/N,(i+1)/N);if(a<=0)continue;c.save();c.globalAlpha=a;const x=sx+i*dx,y=sy-(i+1)*dy;
    if(same>0)bricks(c,x,y,dx,(i+1)*dy,stepCol);else{c.fillStyle=stepCol;c.fillRect(x,y,dx,(i+1)*dy);c.strokeStyle=INK;c.lineWidth=4;c.strokeRect(x,y,dx,(i+1)*dy);}c.restore();}
  if(rf>0){c.save();c.globalAlpha=rf;bricks(c,sx+N*dx-40,sy-N*dy-36,130,36,same>0?'#a8442e':'#c9a26a');c.restore();txt(c,'ROOF',sx+N*dx+25,sy-N*dy-48,`600 13px ${MONO}`,INK,'center',rf);}
  const cl=P(t,B,1,5.2,.8);if(sp>0){const k=cl*N,i=Math.min(N-1,Math.floor(k)),f=k-i,x=sx+i*dx+dx*f+10,y=sy-(i+1)*dy-Math.sin(f*Math.PI)*8-(cl>=1?dy*0:0);
    c.fillStyle=INK;c.beginPath();c.arc(x,y-46,9,0,7);c.fill();c.fillRect(x-5,y-37,10,26);c.fillRect(x-5,y-12,4,12);c.fillRect(x+1,y-12,4,12);}
  ['not this','not this','not this'].forEach((s,i)=>txt(c,s,sx+(i*2+1)*dx-30,sy-(i*2+1)*dy-60,`italic 600 20px ${DISP}`,'#8c2f1c','center',P(t,B,1,.5,1+i*1.4)*(1-P(t,B,2,.5))));
  txt(c,'the same brick and lime',700,500,`italic 600 26px ${DISP}`,'#a8382a','center',P(t,B,2,1,1.6));
  txt(c,'God has become the universe',36,120,`600 36px ${DISP}`,INK,'left',P(t,B,3,1));
  txt(c,'but reasoning alone will not show it',36,152,`italic 500 22px ${DISP}`,'#6b5434','left',P(t,B,3,1,1.6));
  heading(c,12,'Stairs and roof','kalighat',false,1-P(t,B,3,.5));fig(c,'','Gospel of Sri Ramakrishna, 16 December 1883',false);
};
SC.close=(c,t,B)=>{const kp=seg(t,B[3]-.2,B[3]+.7);
  if(kp<1){lanternRig(c,t,(c,cx,cy,R)=>{
    const w=1-P(t,B,1,.8);if(w>0){c.save();c.globalAlpha=w;bricks(c,cx-R,cy-R,2*R,2*R,'rgba(160,120,90,.75)','rgba(60,40,30,.6)');c.restore();}
    const ch=P(t,B,1,1)*(1-P(t,B,2,.6)),br=P(t,B,1,1.2,3.8);if(ch>0){c.save();c.globalAlpha=ch;c.strokeStyle='#4a3a2a';c.lineWidth=8;
      for(let i=-3;i<=3;i++){const off=(i<0?-1:1)*br*90*(1+Math.abs(i)*.2);c.save();c.translate(cx+i*44+off,cy+Math.sin(i)*6+br*40*Math.abs(i)/3);c.rotate(i%2?Math.PI/2:0);c.globalAlpha=ch*(1-br*.8);c.beginPath();c.ellipse(0,0,26,15,0,0,7);c.stroke();c.restore();}c.restore();}
    const be=P(t,B,2,.8)*(1-P(t,B,2,.8,2.6));if(be>0){c.save();c.globalAlpha=be;const r=t*1.2;
      const egg=(x,y)=>{c.fillStyle='#f6efe0';c.strokeStyle='#3a2a18';c.lineWidth=3;c.beginPath();c.ellipse(x,y,22,30,0,0,7);c.fill();c.stroke();};
      const bird=(x,y)=>{c.fillStyle='#3a2a18';c.beginPath();c.ellipse(x,y,26,16,0,0,7);c.fill();c.beginPath();c.arc(x+22,y-12,10,0,7);c.fill();c.beginPath();c.moveTo(x+30,y-12);c.lineTo(x+42,y-8);c.lineTo(x+30,y-6);c.fill();c.beginPath();c.moveTo(x-4,y-4);c.quadraticCurveTo(x-20,y-34,x+10,y-30);c.fill();};
      egg(cx+Math.cos(r)*90,cy+Math.sin(r)*90);bird(cx+Math.cos(r+Math.PI)*90,cy+Math.sin(r+Math.PI)*90);
      c.strokeStyle='#3a2a18';c.lineWidth=2;c.setLineDash([5,6]);c.beginPath();c.arc(cx,cy,90,0,7);c.stroke();c.setLineDash([]);c.restore();}});
    const pull=P(t,B,2,1,2.6);
    slide(c,212,lerp(272,110,pull),'TIME','rgba(240,170,90,.75)',1-pull);slide(c,222,lerp(272,96,pull),'SPACE','rgba(130,190,150,.75)',1-pull);slide(c,232,lerp(272,82,pull),'CAUSATION','rgba(200,90,80,.75)',1-pull);
    const tl=(s,y,f,col,a)=>txt(c,s,640,y,f,col,'center',a);
    const a0=P(t,B,0,1)*(1-P(t,B,1,.5));tl('Kant drew the wall.',476,`italic 500 24px ${DISP}`,'#e9dfc6',a0);tl('The Upanishads asked who stands behind it.',502,`italic 500 24px ${DISP}`,'#f0c56a',P(t,B,0,1,1.8)*(1-P(t,B,1,.5)));
    const a1=P(t,B,1,1,3)*(1-P(t,B,2,.5));tl('No power can bind the Infinite but Itself.',488,`italic 500 26px ${DISP}`,'#f0c56a',a1);
    tl('Escape from Māyā.',490,`italic 600 32px ${DISP}`,'#f0c56a',P(t,B,2,1,3.2));
    heading(c,13,'Who bound us?','lantern',true,1-kp);fig(c,'','The Reality and the Shadow · Nivedita, The Master as I Saw Him',true);}
  if(kp>0){c.save();c.beginPath();c.rect(0,0,W*kp,H);c.clip();paper(c);
    person(c,260,320,.72,ease(seg(t,B[3]+.2,B[3]+2)),seg(t,B[3]+1.4,B[3]+2.4),{shawl:'#34477e',book:true,look:3});
    const th=P(t,B,3,1,2.2);cloud(c,560,170,190,80,th);txt(c,'a man who has seen',560,164,`italic 600 26px ${DISP}`,INK,'center',th);txt(c,'beyond the wall?',560,196,`italic 600 26px ${DISP}`,INK,'center',th);
    txt(c,'NEXT · FILM 2 OF 3',920,440,`600 12px ${MONO}`,'#a8382a','right',P(t,B,3,1,3.4));txt(c,'The Student Who Read Kant',920,478,`600 36px ${DISP}`,INK,'right',P(t,B,3,1,3.8));
    c.restore();
    if(kp<1){c.strokeStyle=INK;c.lineWidth=10;c.lineCap='round';c.beginPath();for(let y=-10;y<=H+10;y+=12){const x=W*kp+Math.sin(y*.05)*10;y<0?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();}}
};

