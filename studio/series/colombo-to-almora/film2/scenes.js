const SC={};
/* Film 2 · Vedantism (Jaffna). Watercolour mural, dense; India scenes carry the temple band (IN); the brush hand sweeps each panel in. */
const pn=(at,draw)=>({at,draw});
const TXT=(S,items,x=30,y=30,w=430)=>stack(S,x,y,w,items);
const IN=S=>kumbamBand(S,0,960,0);
const DV=(S,t,x,y,size,col=MINK)=>S.T([[t,col]],x,y,size,{al:'center',font:DEVF,rot:0});
const LBL=(S,t,x,y,size=18,col=MINK)=>S.T([[t,col]],x,y,size,{al:'center',rot:0});

MURAL.jaffna=[
 pn(0,S=>{IN(S);skyset(S,7,{sx:860,sy:90,clouds:2,cx0:520,cx1:700,cy:80,birds:6,bx:420,by:130});waves(S,0,960,330,8,2,'#6cbfe8');canoe(S,140,360,.7);canoe(S,330,372,.55,'#a86a3a');steamship(S,560,330,.6);
   S.g();S.S([[0,400],[960,395],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col:'#e8d39a',noline:1});palm(S,60,420,.75,.2);palm(S,900,420,.7,-.15);gopuram(S,740,420,.75);templeTown(S,420,640,430,9);
   crowd(S,20,930,548,.6,21,{n:16,heads:['turban','hair','veil','turban'],arms:'up'});toran(S,600,880,250,{sag:10});kalash(S,600,430,.4);kalash(S,880,430,.4);
   TXT(S,[['Jaffna',44,{JAFFNA:MRED}],['the chief centre of Hinduism in Ceylon',24,{HINDUISM:MSAF}]]);}),
 pn(2,S=>{IN(S);wash(S,480,300,320,'rgba(150,210,120,.9)',.25);const pj=indiaMap(S,200,40,440,{hills:false});const a=pj(79.5,10.8),b=pj(80.01,9.66);
   for(let k=0;k<4;k++){const f=(k+1)/5;canoe(S,lerp(a[0],b[0],f)+30,lerp(a[1],b[1],f)+10,.22);}S.g();S.S(ell(b[0],b[1],8,8,10),{tone:[.4,.3],col:MRED});LBL(S,'JAFFNA',b[0]+46,b[1]+6,18);gopuram(S,b[0]+90,b[1]+90,.22);
   [[700,500],[780,505],[860,500]].forEach(([x,y],k)=>person(S,x,y,.5,{head:['turban','veil','hair'][k],col:[MSAF,MPNK,'#f4efe4'][k],arms:'hold'}));palmleaf(S,700,330,200,60);DV(S,'वेद',800,372,30);
   TXT(S,[['more than two thousand years ago',26,{THOUSAND:MSAF}],['settlers from South India brought their religion',22]],560,30,380);}),
 pn(3,S=>{wash(S,480,280,320,'rgba(212,35,38,.9)',.2);waves(S,0,960,300,8,4,'#7aa8c8');galleon(S,200,300,.8,MRED);galleon(S,470,310,.7,'#f08a1a',-1);
   S.g();S.S([[0,330],[960,330],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col:'#d9c9a3',noline:1});[[640,520,.7],[820,520,.55]].forEach(([x,y,s])=>{gopuram(S,x,y,s);});fire(S,620,470,1.2);fire(S,800,480,.9);fire(S,700,500,.7);
   S.g();for(let k=0;k<8;k++)S.S(tf([[-16,0],[0,-14],[18,-4],[6,10]],560+k*48,525+(k%2)*8,1),{tone:[.9,.5],col:'#c8a880',lw:1.4});strikeL(S,560,300,280);LBL(S,'PUBLIC WORSHIP',700,290,22);
   crowd(S,30,330,545,.5,5,{n:6,heads:['turban','veil'],arms:'hold'});TXT(S,[['Portuguese and Dutch rule',30,{PORTUGUESE:MRED,DUTCH:MRED}],['temples razed to the ground',24,{RAZED:MRED}]],30,30,500);}),
 pn(5,S=>{IN(S);wash(S,480,300,360,'rgba(255,200,120,.9)',.3);gopuram(S,250,500,1.1);S.g();S.L([[130,500],[130,250],[370,250],[370,500]],{lw:2.4,col:'#8a5a2a',any:1});for(let k=1;k<6;k++)S.L([[130,500-k*45],[370,500-k*45]],{lw:1.6,col:'#8a5a2a',any:1});
   person(S,420,510,.6,{head:'turban',col:MSAF,arms:'up'});pot(S,470,510,.6);rangoli(S,250,525,60,5);flowers(S,30,120,540,2,3);
   S.g();S.S(rect(520,140,400,250),{tone:[1,.8],col:'#fffaf0',lw:1.6});book(S,610,330,.8,MBLU);palmleaf(S,680,250,200,60);DV(S,'वेदान्त',780,292,30);LBL(S,'EAST',780,230,18);LBL(S,'WEST',610,230,18);S.T([['>',MRED]],700,320,40,{al:'center'});
   TXT(S,[['faith kept, temples restored',28,{RESTORED:MGRN}]],30,30,460);TXT(S,[['“more things in the Philosophy of the Hindus than are dreamt of in the Philosophy of the West”',20,{HINDUS:MSAF}]],530,410,390);}),
];

MURAL.name=[
 pn(0,S=>{IN(S);wash(S,330,290,280,'rgba(150,210,120,.9)',.25);const pj=indiaMap(S,140,60,400,{hills:false});mountains(S,150,420,100,60,3,'#dde6ee');
   S.g();const riv=[[73,35],[72.5,32],[71,29],[69,26],[68,24]].map(p=>pj(...p));S.L(bz(riv[0],riv[1],riv[3],riv[4],20),{lw:7,col:'#5fb4e8',any:1});DV(S,'सिन्धु',riv[2][0]-80,riv[2][1],34,MBLU);LBL(S,'INDUS',riv[2][0]-80,riv[2][1]+28,16);
   TXT(S,[['Hindu: those who lived',30],['on the other side of the river',30],['Indus, the Sindhu',30,{SINDHU:MBLU}]],560,60,380);canoe(S,700,480,.5);palm(S,880,500,.6,-.1);}),
 pn(2,S=>{wash(S,480,300,320,'rgba(212,162,74,.9)',.25);person(S,220,500,1.2,{head:'helmet',col:'#7a5aa0',arms:'out'});S.g();S.S([[300,140],[620,140],[620,260],[390,260],[340,300],[350,260],[300,260]],{tone:[1,.85],col:'#fffbe8',lw:2.4});
   S.T([['SINDHU',MBLU]],390,200,40,{al:'center',rot:0});arrowL(S,[470,192],[520,192],{lift:2,lw:3,col:MINK});S.T([['HINDU',MRED]],570,200,40,{al:'center',rot:0});LBL(S,'ANCIENT PERSIA',220,526,18);
   mosque(S,800,500,.6);flag(S,910,500,.6,MGRN);TXT(S,[['the Persians turned Sindhu into Hindu',26],['taken up under Mohammedan rule',22]],560,300,370);}),
 pn(3,S=>{IN(S);wash(S,480,300,360,'rgba(150,200,255,.9)',.22);mosque(S,140,470,.7);church(S,330,470,.6);stupa(S,520,470,.5);gopuram(S,700,470,.6);shikhara(S,870,470,.35);
   crowd(S,20,940,545,.5,13,{n:14,heads:['turban','hat','hair','veil','turban'],arms:'down'});S.g();S.S(rect(90,90,780,80),{tone:[1,.75],col:'#f4ead8',lw:2});S.T([['HINDU ?',MRED]],480,150,54,{al:'center',rot:0});
   TXT(S,[['the word covers everyone who lives in India: it has lost its meaning',24]],60,190,840);}),
 pn(4,S=>{IN(S);wash(S,480,290,330,'rgba(255,200,90,.9)',.35);fourVedas(S,480,250,1.3);palmleaf(S,180,320,600,110);DV(S,'वैदिक · वेदान्ती',480,392,46,MSAF);rays(S,480,250,200,320,20,{a0:-Math.PI*.95,a1:-Math.PI*.05,lw:1.4});
   samai(S,90,520,.55);samai(S,870,520,.55);flowers(S,160,800,535,6,7);TXT(S,[['Vaidikas, followers of the Vedas; better still, Vedantists',26,{VAIDIKAS:MSAF,VEDANTISTS:MRED}]],120,460,720);}),
];

MURAL.vedas=[
 pn(0,S=>{wash(S,480,300,300,'rgba(220,200,160,.9)',.3);S.g();const cols=[MBLU,MGRN,MPUR,MRED];for(let k=0;k<4;k++)book(S,480,470-k*56,1.5-k*.12,cols[k]);fourVedas(S,480,540,.9);LBL(S,'OLDEST',760,520,22,MRED);
   TXT(S,[['Western scholars: the oldest sacred books in the world',28,{OLDEST:MRED}]],30,30,420);clock(S,820,140,60);}),
 pn(1,S=>{IN(S);wash(S,700,280,260,'rgba(255,210,100,.95)',.5);S.g();dove(S,180,190,1.4);person(S,220,500,1,{head:'hair',col:'#f4efe4',arms:'out'});tablets(S,330,500,.5);LBL(S,'A MESSENGER, A PERSON',260,540,18);
   palmleaf(S,560,200,300,140);DV(S,'विद्',710,282,60,MSAF);rays(S,710,270,170,260,22,{lw:1.4});LBL(S,'VID · TO KNOW',710,360,22);clock(S,880,460,40);strikeL(S,840,460,80);
   TXT(S,[['the Vedas: their own authority, without beginning, without end',24,{AUTHORITY:MSAF}]],30,30,420);}),
 pn(4,S=>{IN(S);wash(S,480,250,320,'rgba(255,214,120,.95)',.45);mountains(S,0,960,420,140,5,'#c8d8c8');seer(S,320,520,1.3,'ॐ');seer(S,640,520,1.1,'तत्');S.g();for(let k=0;k<12;k++)star(S,90+k*72,120+(k%3)*30,8,[MYEL,MCYN,MPNK][k%3]);
   banyan(S,880,530,.4);TXT(S,[['Mantra-drashta: a seer of thought',30,{SEER:MSAF}],['“The Rishis were spiritual discoverers.”',26,{DISCOVERERS:MRED}]],30,30,600);}),
];

MURAL.kandas=[
 pn(0,S=>{IN(S);S.g();S.S(rect(20,40,450,470),{tone:[1,.6],col:'#f4d8c0',lw:2,cA:.6});S.S(rect(490,40,450,470),{tone:[1,.6],col:'#d8e4f4',lw:2,cA:.6});
   DV(S,'कर्म काण्ड',245,110,40,MRED);LBL(S,'THE WORK PORTION',245,140,18);havan(S,245,330,1);person(S,90,500,.55,{head:'hair',col:MSAF});book(S,90,400,.35,MSAF);person(S,170,500,.55,{head:'turban',col:MBLU});person(S,215,505,.42,{head:'veil',col:MPNK});child(S,250,510,.9);sage(S,400,505,.6);
   ['STUDENT','HOUSEHOLDER','RECLUSE'].forEach((t,k)=>LBL(S,t,[90,200,400][k],535,14));
   DV(S,'ज्ञान काण्ड',715,110,40,MBLU);LBL(S,'THE KNOWLEDGE PORTION',715,140,18);palmleaf(S,560,200,310,90);DV(S,'उपनिषद्',715,256,36);innerLamp(S,715,500,.8);S.G(715,400,120,'rgba(255,220,100,.9)',{a:.5});}),
 pn(3,S=>{IN(S);wash(S,480,280,300,'rgba(255,200,90,.9)',.4);palmleaf(S,330,200,300,120);DV(S,'उपनिषद्',480,272,40);
   const em=[['SHAIVITES',S=>trident(S,140,250,.6)],['VAISHNAVITES',S=>conch(S,250,430,.7)],['SHAKTAS',S=>{S.g();S.S([[440,470],[520,470],[480,400]],{tone:[1,.5],col:MRED,lw:2});S.S(ell(480,448,6,6,8),{tone:[.5,.3],col:MYEL});}],['SAURAS',S=>sun(S,730,430,40)],['GANAPATYAS',S=>modak(S,840,260,1.2)]];
   em.forEach(([t,f],k)=>{f(S);LBL(S,t,[140,250,480,730,840][k],[300,490,500,500,300][k]+10,16);});S.g();[[140,240],[250,400],[480,400],[730,400],[840,240]].forEach(([x,y])=>arrowL(S,[x,y-20],[480,330],{lift:20,lw:1.8,col:MSAF}));
   TXT(S,[['every sect must acknowledge the Upanishads',28,{UPANISHADS:MSAF}]],30,30,600);}),
 pn(4,S=>{IN(S);wash(S,480,300,320,'rgba(150,210,120,.9)',.25);palmleaf(S,330,60,300,90);DV(S,'उपनिषद्',480,116,34);
   [[150,'tulsi'],[330,'kalash'],[520,'lingam'],[700,'diya'],[860,'rangoli']].forEach(([x,k])=>{arrowL(S,[480,160],[x,330],{lift:30,lw:2,col:MSAF});});tulsi(S,150,470,.75);kalash(S,330,470,.8);lingam(S,520,460,.55);diya(S,700,440,.8);rangoli(S,860,455,60,3);
   TXT(S,[['great ideas, become symbols of household worship',24]],60,488,840);}),
];

MURAL.smritis=[
 pn(0,S=>{IN(S);wash(S,250,250,240,'rgba(255,210,100,.95)',.5);sun(S,250,200,70);palmleaf(S,100,300,300,80);DV(S,'श्रुति · वेदान्त',250,352,30);LBL(S,'FINAL AUTHORITY',250,410,20,MGRN);
   for(let k=0;k<4;k++){book(S,600+k*90,330,.6,[MRED,MBLU,MPUR,MGRN][k]);sage(S,600+k*90,520,.45,['#f2ead8','#f6d8a8','#e8e2d6','#f2ead8'][k]);}LBL(S,'SMRITIS, BY PARTICULAR SAGES',735,230,20);
   S.g();S.L([[640,150],[860,40]],{lw:5,col:MRED,any:1});TXT(S,[['a Smriti that contradicts the Vedanta is rejected',22,{REJECTED:MRED}]],560,60,380);}),
 pn(2,S=>{IN(S);wash(S,330,290,240,'rgba(230,190,120,.9)',.35);wheel(S,330,290,170,['सत्य','त्रेता','द्वापर','कलि']);[[600,'#e8b4a0'],[700,'#c8d8e8'],[800,'#d8e8c0'],[900,'#e8d8f0']].forEach(([x,c],k)=>{S.g();S.S(rect(x-40,350-k*30,80,60),{tone:[1,.6],col:c,lw:1.6});LBL(S,'SMRITI',x,385-k*30,14);});
   person(S,640,520,.5,{head:'turban',col:MSAF});pot(S,700,520,.6);plough(S,800,520,.6);TXT(S,[['customs change from Yuga to Yuga',28,{CHANGE:MRED}]],560,30,380);}),
 pn(3,S=>{IN(S);wash(S,480,250,320,'rgba(255,214,120,.95)',.45);mountains(S,0,960,330,200,6,'#c0d0e0');sun(S,480,110,60);LBL(S,'PRINCIPLES IN MAN AND NATURE: THEY NEVER CHANGE',480,370,22,MBLU);
   ground(S,450,'#c9b48a',3);[[120,'#f4b06a'],[300,'#9ad0f0'],[480,'#c8e8a0'],[660,'#f0c8e0'],[840,'#e8d8a8']].forEach(([x,c])=>{S.g();S.S(rect(x-50,460,100,40),{tone:[1,.6],col:c,lw:1.4});S.S(ell(x-30,505,12,12,10),{tone:[.7,.4],col:'#6a4a2a'});S.S(ell(x+30,505,12,12,10),{tone:[.7,.4],col:'#6a4a2a'});});
   LBL(S,'MANNERS AND CUSTOMS MOVE ON',480,540,18);TXT(S,[['the Vedanta never changes',30,{NEVER:MBLU}]],30,30,420);}),
 pn(4,S=>{IN(S);wash(S,480,330,360,'rgba(238,122,28,.9)',.25);S.g();S.S(rect(400,380,160,40),{tone:[1,.5],col:'#c8a46a',lw:1.6});sage(S,480,380,.75);S.g();for(let k=0;k<3;k++){const x=200+k*280;S.S(rect(x-70,120,140,100),{tone:[1,.7],col:'#fff1d0',lw:1.6});}crownX(S,200,175,.6);innerLamp(S,480,210,.35);flag(S,760,210,.5,MSAF);
   LBL(S,'KINGS',200,240,16);LBL(S,'SAINTS',480,240,16);LBL(S,'HEROES',760,240,16);crowdRows(S,20,940,548,.62,6,{arms:'up'});DV(S,'पुराण',110,90,40,MSAF);TXT(S,[['the Puranas: philosophy in stories, in the language of the people',22]],560,40,380);}),
 pn(5,S=>{IN(S);wash(S,480,300,300,'rgba(212,35,38,.9)',.2);sriYantra(S,330,280,150);havan(S,700,470,1.1);S.g();S.T([['तन्त्र',MRED]],700,180,60,{al:'center',font:DEVF,rot:0});
   TXT(S,[['the Tantras: in places, a revival of the old sacrifices',22]],560,240,360);}),
];

MURAL.projection=[
 pn(0,S=>{IN(S);wash(S,480,280,380,'rgba(139,79,224,.9)',.2);S.g();const p=[];for(let k=0;k<=220;k++){const a=k/220*Math.PI*8,r=10+k*1.3;p.push([480+Math.cos(a)*r*1.3,280+Math.sin(a)*r*.75]);}S.L(p,{lw:2.4,col:MPUR,any:1});om(S,480,330,110);
   S.g();for(let k=0;k<14;k++)star(S,60+k*65,100+(k%4)*120,7,[MYEL,MCYN,MPNK][k%3]);TXT(S,[['Prakriti, Maya: without beginning',30,{PRAKRITI:MPUR,MAYA:MPUR}]],30,30,460);}),
 pn(1,S=>{IN(S);wash(S,330,300,280,'rgba(255,210,100,.95)',.45);globe(S,330,280,150);S.g();for(let k=0;k<6;k++){const r=180+k*24;S.L(ell(330,280,r,r*.62,40,Math.PI*1.1,Math.PI*1.9),{lw:2,col:MSAF,any:1});}
   fluteFeather(S,720,330,1.2);palmleaf(S,560,380,320,80);DV(S,'गीता',720,430,32);TXT(S,[['“If I remain at rest for one moment, this universe will be destroyed.”',22,{REST:MRED}]],560,40,370);}),
 pn(2,S=>{wash(S,480,280,320,'rgba(150,200,255,.9)',.25);S.g();S.S(ell(200,330,90,90,30),{tone:[1,.9],col:'#ffffff',lw:2,noline:0});S.T([['0',MINK]],200,355,70,{al:'center',rot:0});arrowL(S,[300,330],[400,330],{lift:4,lw:3});globe(S,500,330,60);strikeL(S,120,330,440);LBL(S,'SOMETHING OUT OF NOTHING',330,450,22,MRED);
   diya(S,640,470,.9);S.g();S.S([[700,420],[930,260],[930,560]],{tone:[1,.9],col:'#fff3c0',noline:1,cA:.7});globe(S,860,410,50);LBL(S,'PROJECTION',800,220,30,MSAF);TXT(S,[['not creation but projection',30,{PROJECTION:MSAF}]],30,30,500);}),
 pn(3,S=>{IN(S);wash(S,480,300,380,'rgba(150,200,255,.9)',.25);waveCycle(S,40,920,330,120);DV(S,'प्रलय',240,470,34,MBLU);DV(S,'सृष्टि',480,150,34,MSAF);LBL(S,'FINER · SUBSIDES · RESTS',240,510,16);LBL(S,'PROJECTED FORWARD AGAIN',700,170,16);
   TXT(S,[['a wave-like motion throughout eternity',28,{ETERNITY:MBLU}]],30,30,440);}),
 pn(4,S=>{wash(S,480,280,320,'rgba(220,200,160,.9)',.3);sepiaPlate(S,250,60,460,400,'A. Lavoisier, Traité élémentaire de chimie, 1789');lavoisierBalance(S,480,380,1.3);S.T([['=',SEP]],480,300,50,{al:'center',font:QF,rot:0});
   TXT(S,[['matter changes form; nothing is created, nothing lost',22]],30,30,210);TXT(S,[['the conservation of mass',24,{MASS:SEP}]],730,60,210);}),
 pn(5,S=>{IN(S);wash(S,480,290,300,'rgba(255,200,90,.9)',.3);S.g();S.L(ell(480,290,240,180,60),{closed:1,lw:3,col:MSAF,any:1});for(let k=0;k<4;k++){const a=k/4*Math.PI*2-Math.PI/2;globe(S,480+Math.cos(a)*240,290+Math.sin(a)*180,30+k*6);}
   LBL(S,'BEGINNING',480,90,20,MGRN);LBL(S,'END',480,500,20,MRED);LBL(S,'OF ONE CYCLE',480,300,30);TXT(S,[['beginning and end: of one cycle only',22]],30,30,300);}),
];

MURAL.cloud=[
 pn(0,S=>{IN(S);wash(S,480,280,380,'rgba(255,214,120,.95)',.5);rays(S,480,280,90,290,30,{lw:1.4});om(S,480,330,130);DV(S,'ब्रह्मन्',480,120,46,MSAF);
   ['ETERNAL','PURE','AWAKE','ALMIGHTY','ALL-KNOWING','FORMLESS','PARTLESS'].forEach((w,k)=>{const a=-Math.PI*.95+k/6*Math.PI*.9+Math.PI;LBL(S,w,480+Math.cos(a)*330,320+Math.sin(a)*-180+150,18);});}),
 pn(1,S=>{wash(S,250,300,240,'rgba(255,214,120,.9)',.3);colonial(S,90,420,300,180,'#f4e2c4');crownX(S,240,210,.7);child(S,240,500,1.4,{col:MPUR,arms:'up'});LBL(S,'BORN HAPPY',240,540,18);
   wash(S,700,320,240,'rgba(120,120,140,.9)',.25);hut(S,700,420,.9);child(S,700,500,1.4,{col:'#8a7a6a',arms:'hold'});S.g();S.S(ell(760,500,22,8,12,0,Math.PI).concat([[738,500]]),{tone:[.8,.4],col:'#8a5a32'});LBL(S,'BORN UNHAPPY',700,540,18);
   S.g();S.L([[480,80],[480,520]],{lw:2,col:MINK,any:1});TXT(S,[['partiality and cruelty: whose fault?',26,{FAULT:MRED}]],30,30,420);}),
 pn(3,S=>{IN(S);skyset(S,12,{sun:false,clouds:0,birds:4,bx:600,by:60});rainCloud(S,480,130,600,3);field(S,40,450,440,true,2);field(S,510,920,440,false,5);ox(S,140,520,.7);plough(S,260,520,.8);person(S,330,520,.75,{head:'turban',col:'#f4efe4',arms:'up',mark:1});
   person(S,720,525,.6,{head:'hair',col:'#8a7a6a',arms:'down'});LBL(S,'TILLED',240,470,22,MGRN);LBL(S,'UNTENDED',720,470,22,MBROWN);TXT(S,[['“There is a cloud shedding its rain on all fields alike.”',24,{RAIN:MBLU}]],30,240,900);}),
 pn(5,S=>{IN(S);wash(S,480,300,380,'rgba(150,210,120,.9)',.3);rainCloud(S,480,110,500,8);paddy(S,0,960,300,450,4);for(let k=0;k<5;k++)lotus(S,120+k*180,470,.5);flowers(S,40,920,540,8,6);
   TXT(S,[['the mercy of God is the same for all; it is we who make the difference',24,{WE:MRED}]],120,180,720);}),
];

MURAL.karma=[
 pn(0,S=>{IN(S);wash(S,480,300,360,'rgba(150,210,120,.9)',.3);S.g();S.L(ell(480,300,260,180,60),{closed:1,lw:2.6,col:MGRN,any:1});seedling(S,480,140,.45);banyan(S,740,340,.35);seedling(S,480,500,.35);banyan(S,220,340,.35);
   arrowL(S,[560,150],[700,220],{lift:20,lw:2.2,col:MGRN});arrowL(S,[700,420],[560,480],{lift:20,lw:2.2,col:MGRN});arrowL(S,[400,480],[260,420],{lift:20,lw:2.2,col:MGRN});arrowL(S,[260,220],[400,150],{lift:20,lw:2.2,col:MGRN});stupa(S,860,540,.35);
   TXT(S,[['Hindus, Buddhists, Jains agree: life is eternal',24,{ETERNAL:MGRN}]],30,30,380);}),
 pn(1,S=>{IN(S);wash(S,480,330,320,'rgba(220,200,160,.9)',.3);ground(S,520,'#c9b48a',2);child(S,620,520,1.6,{col:MSAF,arms:'hold'});S.g();S.S(ell(560,410,70,50,24),{rad:1,tone:[1,.45],col:'#a8743a',lw:2});LBL(S,'THE PAST',560,416,18);
   S.g();for(let k=0;k<9;k++)S.S(ell(80+k*55,535-(k%2)*8,9,5,8),{tone:[.6,.3],col:'#6a4a2a'});TXT(S,[['the child comes with the burden of an infinite past',26,{PAST:MBROWN}]],30,30,440);}),
 pn(2,S=>{IN(S);wash(S,480,330,320,'rgba(238,122,28,.9)',.25);potterWheel(S,480,480,1.6);S.g();for(let k=0;k<4;k++)pot(S,120+k*80,530,.7+k*.1);for(let k=0;k<3;k++)pot(S,700+k*80,530,.9,'#a85a2a');
   TXT(S,[['each one of us is the maker of his own fate',30,{MAKER:MSAF}]],30,30,600);}),
 pn(3,S=>{wash(S,480,280,380,'rgba(255,200,120,.9)',.3);S.g();TXT(S,[['“We, we, and none else,',60],['are responsible',60],['for what we suffer.”',60,{SUFFER:MRED}]],90,80,800);}),
 pn(4,S=>{IN(S);wash(S,480,300,340,'rgba(255,214,120,.95)',.4);S.g();const face=(x,y,happy,col)=>{S.S(ell(x,y,70,70,30),{rad:1,tone:[1,.55],col,lw:2});S.L([[x-24,y-14],[x-23,y-13]],{lw:5}).L([[x+24,y-14],[x+25,y-13]],{lw:5});S.L(bz([x-30,y+22+(happy?0:16)],[x-10,y+(happy?44:6)],[x+10,y+(happy?44:6)],[x+30,y+22+(happy?0:16)],10),{lw:3,any:1});};
   face(250,300,false,'#c8d4e2');face(710,300,true,MYEL);arrowL(S,[350,300],[610,300],{lift:30,lw:3,col:MSAF});LBL(S,'IF I WILL',480,240,24,MSAF);TXT(S,[['unhappy by my own making; so I can be happy',24]],60,440,840);}),
 pn(5,S=>{IN(S);skyset(S,14,{sx:820,sy:90,sr:50,clouds:3,cx0:100,cx1:500,cy:120,birds:0});mountains(S,0,960,520,300,8,'#a8bccf');person(S,480,240,.9,{head:'turban',col:MSAF,arms:'up'});S.G(480,160,140,'rgba(255,220,120,.95)',{a:.7});
   chainsBroken(S,480,330,.6);TXT(S,[['before the infinite will of man, nature must bow down',26,{WILL:MSAF}]],560,200,370);}),
];

MURAL.atman=[
 pn(0,S=>{IN(S);wash(S,330,300,280,'rgba(255,210,100,.95)',.4);innerLamp(S,330,520,1.4);S.g();S.L([[700,300],[900,180]],{lw:9,col:'#6a6a72',any:1});S.S(ell(700,300,16,16,12),{tone:[.6,.3],col:'#4a4a52'});person(S,640,520,.9,{head:'hat',col:'#4a4a52',arms:'out'});globe(S,880,140,50);strikeL(S,600,150,320);
   LBL(S,'INWARD',330,100,30,MSAF);TXT(S,[['not through external nature, but through the soul',24]],520,30,330);}),
 pn(1,S=>{IN(S);wash(S,480,330,380,'rgba(255,214,120,.95)',.35);person(S,220,520,1.2,{head:'turban',col:MSAF});S.G(220,370,70,'rgba(255,220,100,.95)',{a:.85});ox(S,520,520,1.2);S.G(520,430,70,'rgba(255,220,100,.95)',{a:.85});ant(S,800,500,2);bird(S,800,250,2.4);S.G(800,250,50,'rgba(255,220,100,.95)',{a:.8});
   TXT(S,[['the same soul in every man and every animal; the difference is only in manifestation',24,{SAME:MSAF}]],30,30,900);}),
 pn(3,S=>{IN(S);wash(S,480,300,360,'rgba(255,200,120,.9)',.3);sage(S,180,520,.9);S.g();[[380,'turban',MBLU],[500,'veil',MPNK],[620,'hair','#f4efe4']].forEach(([x,h,c])=>{person(S,x,520,.75,{head:h,col:c});S.G(x,400,40,'rgba(255,220,100,.95)',{a:.8});});ox(S,800,520,.8);S.G(800,460,40,'rgba(255,220,100,.95)',{a:.8});ant(S,900,520,1.2);
   TXT(S,[['“Thus the sage, knowing that the same Lord inhabits all bodies, will worship every body as such.”',26,{LORD:MSAF}]],60,40,840);}),
 pn(4,S=>{IN(S);koshaLayers(S,330,300,230);TXT(S,[['the mind is not the Atman',30,{ATMAN:MSAF}],['body · fine body · the Self',22]],600,80,330);innerLamp(S,760,520,.6);}),
 pn(5,S=>{IN(S);wash(S,480,300,360,'rgba(150,200,255,.9)',.25);S.g();S.L(ell(380,300,220,150,60),{closed:1,lw:2.4,col:MBLU,any:1});for(let k=0;k<5;k++){const a=k/5*Math.PI*2;S.G(380+Math.cos(a)*220,300+Math.sin(a)*150,26,'rgba(255,220,100,.95)',{a:.9});}LBL(S,'BIRTH AND DEATH',380,300,22,MBLU);
   releaseBirds(S,780,500,1.1);LBL(S,'FREE',780,140,34,MSAF);TXT(S,[['until it manifests itself to perfection',24]],30,30,420);}),
];

MURAL.heavens=[
 pn(0,S=>{IN(S);wash(S,480,250,380,'rgba(150,200,255,.9)',.3);cloud(S,480,330,620,4);S.g();colonial(S,320,300,320,150,'#f4ecd8');for(let k=0;k<3;k++)star(S,360+k*120,110,14);LBL(S,'A HEAVEN',480,90,30,MBLU);
   globe(S,140,470,60);arrowL(S,[210,450],[330,380],{lift:20,lw:2.4,col:MBLU});LBL(S,'THIS WORLD, BIGGER',820,470,22);TXT(S,[['heavens and hells: not eternal',26,{NOT:MRED}]],30,30,300);}),
 pn(1,S=>{IN(S);wash(S,330,300,300,'rgba(255,214,120,.95)',.4);cloud(S,330,420,520,6);throne(S,330,390,1.3);vajra(S,330,190,.9);elephant(S,700,430,.9,{col:'#f2f0ea',umbrella:1,ucol:MYEL});
   S.g();for(let k=0;k<8;k++)person(S,600+k*44,540,.32,{head:'hair',col:['#f4efe4',MSAF][k%2]});LBL(S,'INDRA: A POSITION, NOT A PERSON',330,90,24,MSAF);TXT(S,[['there will be thousands of Indras',22]],600,60,330);}),
 pn(2,S=>{IN(S);wash(S,480,250,360,'rgba(212,35,38,.9)',.2);cloud(S,280,190,420,8);throne(S,280,190,.9);person(S,600,330,.9,{head:'beard',col:MPUR,arms:'up'});crownX(S,640,250,.5);S.g();arrowL(S,[600,380],[720,500],{lift:30,lw:3,col:MRED});
   globe(S,800,500,50);LBL(S,'NAHUSHA',760,260,26,MPUR);TXT(S,[['good Karma spent, he fell, and was born a man again',22]],30,320,380);}),
 pn(3,S=>{IN(S);wash(S,480,300,360,'rgba(150,210,120,.9)',.3);globe(S,480,300,190);S.g();for(let k=0;k<6;k++){const a=k/6*Math.PI*2;person(S,480+Math.cos(a)*240,300+Math.sin(a)*170+40,.4,{head:['turban','veil','hair'][k%3],col:[MSAF,MPNK,MGRN][k%3],arms:'hold'});}
   DV(S,'कर्मभूमि',480,90,48,MSAF);TXT(S,[['the land of work, from which liberation is reached',22]],60,500,840);}),
 pn(4,S=>{IN(S);wash(S,330,300,300,'rgba(150,200,255,.9)',.25);person(S,300,520,1.2,{head:'beard',col:MPUR,arms:'down'});crownX(S,300,320,.6);clock(S,160,260,50);S.g();S.L([[200,290],[280,400]],{lw:4,col:'#8a8a92',any:1}).L([[420,290],[320,400]],{lw:4,col:'#8a8a92',any:1});globe(S,450,250,40);
   LBL(S,'A KING FOR 20,000 YEARS: STILL A SLAVE',300,90,20,MRED);chainsBroken(S,720,300,1);DV(S,'मुक्ति',720,180,60,MSAF);TXT(S,[['Mukti: freedom',30,{FREEDOM:MSAF}]],600,420,330);}),
 pn(5,S=>{IN(S);wash(S,480,300,380,'rgba(255,200,120,.9)',.35);knot(S,170,300,70,'#6a6a72');LBL(S,'IGNORANCE BINDS',170,430,20);arrowL(S,[270,300],[380,300],{lift:10,lw:3});heartGlow(S,480,300,.7);arrowL(S,[580,300],[680,300],{lift:10,lw:3});innerLamp(S,790,470,.9);
   LBL(S,'LOVE',480,430,22,MRED);LBL(S,'KNOWLEDGE',790,520,20,MSAF);TXT(S,[['love all beings as the temples of God',24,{TEMPLES:MSAF}]],30,30,600);}),
];

MURAL.impersonal=[
 pn(0,S=>{IN(S);wash(S,480,200,340,'rgba(255,214,120,.95)',.45);throne(S,480,260,1.2,MPUR);rays(S,480,170,120,250,24,{lw:1.4});S.g();crowd(S,60,900,545,.5,9,{n:12,arms:'up'});
   LBL(S,'CREATOR · PRESERVER · DESTROYER',480,330,22);LBL(S,'FATHER AND MOTHER OF THE UNIVERSE',480,360,20);S.g();S.L([[60,400],[900,400]],{lw:2,col:MINK,any:1});LBL(S,'ETERNALLY SEPARATE',780,388,16);
   TXT(S,[['the Personal God',32,{PERSONAL:MPUR}]],30,30,400);}),
 pn(2,S=>{IN(S);S.g();S.S(rect(0,40,960,520),{tone:[1,.7],col:'#fff4d0',noline:1,cA:.7});S.G(480,280,420,'rgba(255,230,160,1)',{a:.8,sx:1.6});S.T([['IT',MSAF]],480,330,180,{al:'center',rot:0});
   [['KNOWING',200,140],['THINKING',760,140],['CREATING',200,460],['REASONING',760,460]].forEach(([w,x,y])=>{LBL(S,w,x,y,26);strikeL(S,x-80,y-8,160);});TXT(S,[['the Impersonal: not He, but It',26,{IT:MSAF}]],30,30,400);}),
 pn(3,S=>{IN(S);waves(S,0,960,330,10,6,'#6cbfe8');S.g();S.S([[0,330],[960,330],[960,560],[0,560]],{tone:[1,.6],dir:1.5,col:'#8ac8ee',noline:1,cA:.6});S.S(bz([480,120],[440,200],[460,240],[480,250],8).concat(bz([480,250],[500,240],[520,200],[480,120],8)),{rad:1,tone:[1,.5],col:'#9ad0f4',lw:1.6});
   arrowL(S,[480,260],[480,320],{lift:0,lw:2.4,col:MBLU});DV(S,'अद्वैत',480,450,60,'#ffffff');TXT(S,[['we are It: misery is thinking ourselves separate',24,{SEPARATE:MRED}]],30,30,430);TXT(S,[['liberation is knowing our unity',24,{UNITY:MBLU}]],560,30,370);}),
 pn(4,S=>{IN(S);wash(S,480,300,360,'rgba(150,210,120,.9)',.3);S.g();const n=10;for(let k=0;k<n;k++){const a=k/n*Math.PI*2,x=480+Math.cos(a)*260,y=310+Math.sin(a)*170;person(S,x,y+60,.5,{head:['turban','veil','hair','beard','hat'][k%5],col:[MSAF,MPNK,MBLU,MGRN,MPUR][k%5],arms:'out'});}
   heartGlow(S,480,300,.6);TXT(S,[['in hurting anyone I hurt myself; in loving anyone I love myself',24,{MYSELF:MRED}]],30,30,900);}),
];

MURAL.think=[
 pn(0,S=>{IN(S);wash(S,250,320,240,'rgba(120,120,140,.9)',.25);person(S,250,520,1.1,{head:'hair',col:'#8a8a92',arms:'down'});tears(S,250,240,1.4);LBL(S,'WEEPING',250,120,26);arrowL(S,[380,330],[560,330],{lift:20,lw:3,col:MSAF});
   person(S,700,520,1.3,{head:'turban',col:MSAF,arms:'up'});S.G(700,300,150,'rgba(255,214,120,.95)',{a:.6});LBL(S,'A LITTLE STRENGTH',700,120,26,MRED);TXT(S,[['what India needs now',26]],30,30,400);}),
 pn(1,S=>{IN(S);wash(S,480,320,300,'rgba(255,214,120,.95)',.45);innerLamp(S,480,500,1.4);sword(S,180,250,200,.5,1.4);fire(S,200,500,1);waves(S,660,960,520,8,4,'#6cbfe8');S.g();for(let k=0;k<5;k++)S.L(bz([660,180+k*30],[720,160+k*30],[780,200+k*30],[880,170+k*30],12),{lw:2,col:'#9ab0c8',any:1});
   TXT(S,[['no weapon pierces it, no fire burns it, no water melts it, no air dries it',22]],30,30,900);}),
 pn(2,S=>{waves(S,0,960,250,12,8,'#4a8ac8');S.g();S.S([[0,250],[960,250],[960,560],[0,560]],{tone:[1,.5],dir:1.5,col:'#2c6ab8',noline:1,cA:.7});for(let k=0;k<12;k++){const x=60+k*78,y=320+(k%3)*70;S.S(ell(x,y,10,13,12),{rad:1,tone:[1,.5],col:k%3?'#f2f2f8':MYEL,lw:1.2});}
   TXT(S,[['before the soul, suns and moons and all their systems are drops in the ocean',26,{DROPS:MBLU}]],30,40,900);}),
 pn(3,S=>{wash(S,480,280,380,'rgba(212,35,38,.9)',.25);TXT(S,[['“Whatever you think,',72],['that you will be.”',72,{BE:MRED}]],120,120,760);}),
 pn(4,S=>{IN(S);thought(S,250,180,260,170);S.T([['WEAK',MINK]],250,195,38,{al:'center',rot:0});person(S,200,520,1.1,{head:'hair',col:'#9a9aa2',arms:'down'});thought(S,700,180,260,170);S.T([['STRONG',MRED]],700,195,38,{al:'center',rot:0});person(S,660,520,1.3,{head:'turban',col:MSAF,arms:'up'});
   S.G(660,320,130,'rgba(255,214,120,.95)',{a:.6});TXT(S,[['think yourselves strong, and strong you will be',22]],300,448,420);}),
 pn(5,S=>{IN(S);skyset(S,22,{sx:860,sy:90,sr:46,clouds:2,cx0:200,cx1:520,cy:100,birds:5,bx:300,by:160});hill(S,0,960,540,160,'#b9d98a');[[200,MSAF],[330,MPNK],[460,MBLU],[590,MGRN],[720,MPUR]].forEach(([x,c],k)=>child(S,x,500,1.6,{col:c,arms:'up',head:k%2?'veil':'hair'}));
   flowers(S,40,920,540,6,8);TXT(S,[['make your children strong; first of all, the glory of the soul',24,{STRONG:MRED}]],30,30,520);}),
];

MURAL.ishta=[
 pn(0,S=>{IN(S);wash(S,480,250,380,'rgba(255,214,120,.95)',.4);mountains(S,0,960,520,420,13,'#c8d8c8');shikhara(S,480,150,.42);S.g();[[60,'#c8643a'],[300,MSAF],[660,MPUR],[900,MGRN]].forEach(([x0,c],k)=>{const p=bz([x0,540],[x0+(480-x0)*.3,400],[480+(x0-480)*.3,260],[480,160],30);S.L(p,{lw:3,col:c,any:1});person(S,p[10][0],p[10][1]+4,.4,{col:c,head:['turban','veil','hair','beard'][k]});});
   dhwaja(S,300,520,.5,MSAF);dhwaja(S,660,520,.5,MPUR);trident(S,200,540,.3);conch(S,760,500,.4);TXT(S,[['many sects, and they do not quarrel',26]],30,30,380);}),
 pn(2,S=>{IN(S);wash(S,480,300,380,'rgba(150,210,120,.9)',.25);[['SHAIVITE',S=>trident(S,140,420,.8),MSAF],['VAISHNAVITE',S=>conch(S,330,340,.9),MBLU],['SHAKTA',S=>sriYantra(S,520,330,70),MRED],['DEVOTEE',S=>samai(S,700,430,.8),MGRN],['SEEKER',S=>innerLamp(S,860,440,.5),MPUR]].forEach(([t,f,c],k)=>{f(S);LBL(S,t,[140,330,520,700,860][k],480,18,c);});
   DV(S,'इष्ट',480,120,64,MSAF);TXT(S,[['each has an Ishta, a chosen path',26,{ISHTA:MSAF}]],30,500,900);}),
 pn(3,S=>{wash(S,480,300,360,'rgba(120,120,140,.9)',.25);S.g();for(let r=0;r<2;r++)for(let k=0;k<11;k++)person(S,60+k*84,420+r*110,.6,{head:'hair',col:'#9a9aa2',arms:'down'});
   TXT(S,[['“Woe unto the world when everyone is of the same religious opinion and takes to the same path.”',28,{WOE:MRED}]],60,40,840);}),
 pn(4,S=>{IN(S);rainbow(S,480,520,420,.6);crowd(S,20,940,548,.65,33,{n:15,heads:['turban','veil','hair','beard','hat'],arms:'up'});flowers(S,40,920,420,8,9);TXT(S,[['variety is the very soul of life',40,{VARIETY:MSAF}]],120,60,720);}),
 pn(5,S=>{IN(S);wash(S,330,300,280,'rgba(255,214,120,.9)',.35);S.g();for(let r=0;r<3;r++)for(let k=0;k<7;k++){const x=70+k*72,y=220+r*100;if((k+r)%3===0)kalash(S,x,y,.3);else if((k+r)%3===1)lingam(S,x,y,.18);else diya(S,x,y-10,.4);}
   LBL(S,'TWO HUNDRED IMAGES, IF THEY HELP YOU',290,500,20,MSAF);knot(S,720,250,50,MRED);arrowL(S,[720,330],[620,480],{lift:30,lw:3,col:MRED});LBL(S,'QUARREL: BACKWARD',760,520,18,MRED);
   TXT(S,[['but do not quarrel',30,{QUARREL:MRED}]],600,40,330);}),
];

MURAL.moths=[
 pn(0,S=>{IN(S);wash(S,480,300,360,'rgba(220,200,160,.9)',.3);templeTown(S,240,720,480,4);S.g();S.L([[180,480],[180,180],[780,180],[780,480]],{lw:3,col:'#8a5a2a',any:1});for(let k=1;k<5;k++)S.L([[180,480-k*60],[780,480-k*60]],{lw:1.6,col:'#8a5a2a',any:1});
   LBL(S,'INSTITUTIONS: A SCAFFOLD THAT PROTECTS',480,160,22);crowd(S,20,940,548,.5,41,{n:14});TXT(S,[['not the religion itself',26]],30,30,380);}),
 pn(1,S=>{IN(S);wash(S,480,330,360,'rgba(150,210,120,.9)',.3);banyan(S,480,540,1.2);for(let k=0;k<5;k++)sage(S,180+k*150,540,.45,['#f2ead8','#f6d8a8'][k%2]);TXT(S,[['each one, the experience of centuries',28,{CENTURIES:MGRN}]],30,30,460);}),
 pn(2,S=>{IN(S);wash(S,480,300,360,'rgba(255,200,120,.9)',.3);sage(S,640,520,1.2);child(S,330,520,1.4,{col:MBLU,arms:'out',head:'hat'});S.g();S.S([[120,140],[460,140],[460,260],[340,260],[300,300],[310,260],[120,260]],{tone:[1,.85],col:'#fffbe8',lw:2});LBL(S,'CHANGE ALL YOUR PLANS!',290,210,24,MRED);
   TXT(S,[['a child of yesterday, destined to die the day after tomorrow',22]],560,40,380);}),
 pn(3,S=>{wash(S,480,300,360,'rgba(255,200,90,.9)',.3);diya(S,280,420,1.6);S.g();for(let k=0;k<9;k++){const a=k/9*Math.PI*2;moth(S,280+Math.cos(a)*(110+k*6),360+Math.sin(a)*80,1.2);}bubbles(S,560,460,340,5);
   LBL(S,'MOTHS IN THE SPRING',280,180,22);LBL(S,'BUBBLES',730,500,22,MBLU);TXT(S,[['born like moths, bursting like bubbles',26]],30,30,500);}),
 pn(4,S=>{IN(S);wash(S,480,300,380,'rgba(255,214,120,.9)',.35);gopuram(S,330,520,1.3);clock(S,700,200,60);S.g();for(let k=0;k<5;k++)S.L([[640+k*30,300],[640+k*30,520]],{lw:1.2,col:'#c8b89a',any:1});LBL(S,'SCORES OF CENTURIES',700,300,20);
   child(S,900,520,1.2,{col:MBLU,head:'hat'});TXT(S,[['“Till then, my friend, you are only a giddy child.”',26,{GIDDY:MRED}]],520,350,330);}),
];

MURAL.dana=[
 pn(0,S=>{IN(S);wash(S,330,320,300,'rgba(238,122,28,.9)',.3);S.A('vyasa1940',40,-8,.98);palmleaf(S,600,150,320,90);DV(S,'महाभारत',760,210,40,MSAF);LBL(S,'VYASA',660,520,26,MSAF);
   TXT(S,[['praise be to Vyasa: in this Kali Yuga, one great work',24,{VYASA:MSAF}]],560,300,370);samai(S,880,530,.5);}),
 pn(1,S=>{IN(S);wash(S,250,300,240,'rgba(120,120,140,.9)',.2);sage(S,250,520,1);fire(S,130,520,.6);fire(S,370,520,.6);sun(S,250,150,40);strikeL(S,120,300,260);LBL(S,'AUSTERITIES OF OTHER AGES',250,90,18);
   wash(S,700,300,240,'rgba(255,214,120,.95)',.45);openHands(S,700,420,1.4);S.g();pot(S,700,330,.7);DV(S,'दान',700,180,70,MSAF);LBL(S,'GIVING, HELPING OTHERS',700,250,20);}),
 pn(2,S=>{IN(S);wash(S,480,300,380,'rgba(255,214,120,.95)',.35);S.g();const tiers=[['SPIRITUAL KNOWLEDGE',S=>innerLamp(S,820,150,.35),MSAF],['SECULAR KNOWLEDGE',S=>book(S,820,240,.6,MBLU),MBLU],['SAVING LIFE',S=>heartGlow(S,820,330,.25),MRED],['FOOD AND DRINK',S=>pot(S,820,450,.6),MBROWN]];
   tiers.forEach(([t,f,c],k)=>{const y=110+k*110,w=520-k*80;S.S(rect(480-w/2,y,w,80),{tone:[1,.6],col:['#ffe8b0','#d8e6f8','#f8d8d4','#e8dcc8'][k],lw:2});S.T([[t,c]],480,y+50,26,{al:'center',rot:0});f(S);LBL(S,String(k+1),140,y+54,40,c);});
   TXT(S,[['the order of gifts',30,{GIFTS:MSAF}]],30,30,300);}),
 pn(3,S=>{IN(S);wash(S,480,300,360,'rgba(150,210,120,.9)',.25);S.g();S.L([[120,300],[460,300]],{lw:5,col:'#8a5a2a',any:1});for(let k=0;k<4;k++)parrot(S,160+k*90,300,1.1,k%2?-1:1);phonograph(S,700,500,1.4);
   S.g();S.S([[160,120],[440,120],[440,220],[300,220],[260,260],[270,220],[160,220]],{tone:[1,.85],col:'#fffbe8',lw:2});LBL(S,'TALK, TALK, TALK',300,180,24);TXT(S,[['talking is not religion',30,{NOT:MRED}]],560,40,380);}),
 pn(4,S=>{IN(S);wash(S,480,300,380,'rgba(255,214,120,.95)',.35);chest(S,300,470,1.3);S.g();[[620,'turban',MSAF],[700,'veil',MPNK],[780,'hair','#8a7a6a'],[860,'hat','#4a4a52']].forEach(([x,h,c])=>{person(S,x,530,.7,{head:h,col:c,arms:'up'});arrowL(S,[400,340],[x,360],{lift:40,lw:1.8,col:MSAF});});globe(S,860,170,50);
   TXT(S,[['bring the treasures out, to their rightful heirs, rich and poor',24,{HEIRS:MSAF}]],30,30,500);}),
 pn(5,S=>{IN(S);wash(S,480,300,380,'rgba(255,200,120,.9)',.35);S.g();const n=8;for(let k=0;k<n;k++){const a=k/n*Math.PI*2;openHands(S,480+Math.cos(a)*220,300+Math.sin(a)*150,.45);}heartGlow(S,480,300,.55);
   TXT(S,[['the more you help others, the more you help yourselves',26,{YOURSELVES:MRED}]],30,30,900);}),
];

MURAL.obey=[
 pn(0,S=>{IN(S);wash(S,480,300,360,'rgba(212,35,38,.9)',.2);gopuram(S,820,520,.9);S.g();for(let k=0;k<8;k++){const x=80+k*80;person(S,x,520+(k%2)*8,.7,{head:['turban','hair','veil','beard'][k%4],col:[MSAF,MBLU,MPNK,MGRN][k%4],arms:k%2?'out':'up'});crownX(S,x,350,.35);}
   TXT(S,[['jealousy: even wanting precedence in the worship of God',24,{JEALOUSY:MRED}]],30,30,620);}),
 pn(1,S=>{IN(S);wash(S,480,300,360,'rgba(212,35,38,.9)',.2);S.g();for(let k=0;k<6;k++){const x=120+k*140;person(S,x,520,.9,{head:['turban','hair','beard'][k%3],col:[MRED,MSAF,MPUR][k%3],arms:'out'});S.S([[x+40,330],[x+80,316],[x+80,346]],{tone:[1,.6],col:MYEL,lw:1.2});}
   TXT(S,[['everyone wants to command, and no one wants to obey',28,{COMMAND:MRED}]],30,30,700);}),
 pn(2,S=>{IN(S);wash(S,480,300,360,'rgba(255,214,120,.95)',.45);banyan(S,480,540,.9);sage(S,320,520,1.1);person(S,560,530,.85,{head:'hair',col:MSAF,arms:'hold'});kamandalu(S,200,530,.6);palmleaf(S,620,420,200,50);
   TXT(S,[['“First, learn to obey. The command will come by itself.”',28,{OBEY:MSAF}]],30,30,560);}),
 pn(4,S=>{IN(S);skyset(S,26,{sx:860,sy:80,clouds:2,cx0:300,cx1:600,cy:90,birds:5,bx:400,by:140});templeTown(S,40,420,500,8);S.g();S.L([[540,500],[540,240],[880,240],[880,500]],{lw:2.4,col:'#8a5a2a',any:1});for(let k=1;k<5;k++)S.L([[540,500-k*55],[880,500-k*55]],{lw:1.4,col:'#8a5a2a',any:1});
   shikhara(S,710,500,.7);person(S,600,530,.6,{head:'turban',col:MSAF,arms:'up'});person(S,820,530,.6,{head:'veil',col:MPNK,arms:'hold'});LBL(S,'OUR ANCESTORS',230,540,18);LBL(S,'AND US',710,540,18);
   TXT(S,[['we too will do great deeds',30,{DEEDS:MSAF}]],30,180,400);}),
 pn(5,S=>{IN(S);wash(S,480,250,260,'rgba(150,210,120,.9)',.3);waves(S,0,960,470,8,7,'#6cbfe8');const pj=indiaMap(S,300,30,330,{hills:false});const a=pj(80.01,9.66),b=pj(79.21,9.28);S.g();S.L(bz(a,[a[0]+20,a[1]+30],[b[0]-10,b[1]+30],b,12),{lw:3.4,col:MRED,any:1});
   S.S(ell(a[0],a[1],7,7,10),{tone:[.4,.3],col:MRED});S.S(ell(b[0],b[1],9,9,10),{tone:[.4,.3],col:MRED});S.T([['JAFFNA',MINK]],a[0]+14,a[1]+16,18).T([['PAMBAN',MINK]],b[0]-14,b[1]-8,18,{al:'right'});steamship(S,180,500,.4);canoe(S,760,500,.4);kalash(S,820,330,.3);
   TXT(S,[['next: Pamban',36,{PAMBAN:MRED}],['across the strait to India',24]]);}),
];

/* enrichment: background (before) and foreground (after) layers added to the sparser panels */
const G0=(S,col='#c9dca8')=>{S.g();S.S([[0,500],[960,494],[960,560],[0,560]],{tone:[1,.6],dir:1.5,col,noline:1,cA:.8});};
const ENR={
 name:{1:[S=>{G0(S,'#d9c9a3');palm(S,60,520,.6,.15);},S=>{flowers(S,380,640,540,4,2);}]},
 vedas:{0:[S=>{skyset(S,31,{sun:false,clouds:1,cx0:300,cx1:300,cy:90,birds:0});},S=>{scroll(S,40,300,150,110);tablets(S,140,540,.28);diya(S,330,530,.5);diya(S,650,530,.5);for(let k=0;k<6;k++)star(S,560+k*60,120+(k%2)*30,8);}],
        1:[S=>{G0(S,'#e6dcc4');},S=>{flowers(S,30,450,540,4,4);diya(S,560,520,.5);diya(S,860,520,.5);}]},
 smritis:{2:[S=>{G0(S,'#d9c9a3');},S=>{flowers(S,560,940,540,4,5);}]},
 cloud:{1:[S=>{G0(S,'#c9dca8');},S=>{palm(S,420,520,.5,.1);flowers(S,40,420,545,3,3);}]},
 karma:{1:[S=>{skyset(S,15,{sx:860,sy:90,clouds:2,cx0:120,cx1:420,cy:110,birds:4,bx:300,by:160});hill(S,560,960,520,160,'#c9dca8');},S=>{banyan(S,860,500,.35);hut(S,300,520,.5);}],
        4:[S=>{G0(S,'#c9dca8');},S=>{seedling(S,150,450,.35);rose(S,820,470,.9);flowers(S,40,920,545,7,11);}]},
 atman:{0:[S=>{mountains(S,500,960,520,120,4,'#d8e2ea');},S=>{for(let k=0;k<6;k++)star(S,560+k*60,100+(k%2)*24,8,MCYN);}],
        1:[S=>{skyset(S,16,{sx:880,sy:80,clouds:2,cx0:300,cx1:620,cy:120,birds:0});G0(S);},S=>{flowers(S,40,920,545,7,12);palm(S,940,520,.5,-.1);}],
        3:[null,S=>{for(let k=0;k<8;k++)star(S,600+k*40,300+(k%2)*30,7,[MYEL,MCYN][k%2]);lotus(S,880,420,.5);}],
        4:[S=>{skyset(S,17,{sun:false,clouds:2,cx0:120,cx1:620,cy:70,birds:0});},S=>{flowers(S,40,920,545,7,13);}]},
 heavens:{2:[null,S=>{for(let k=0;k<6;k++)star(S,120+k*70,80+(k%2)*24,8);}],5:[S=>{G0(S);},S=>{flowers(S,40,920,545,7,14);}]},
 think:{0:[S=>{G0(S,'#d9c9a3');},S=>{flowers(S,600,920,545,4,15);}],4:[S=>{G0(S);},S=>{banyan(S,900,520,.3);flowers(S,40,940,545,6,16);}]},
 ishta:{1:[S=>{mountains(S,0,960,250,90,18,'#dde6ee');G0(S);},S=>{flowers(S,40,920,548,6,17);}]},
 moths:{2:[S=>{G0(S,'#d9c9a3');banyan(S,880,500,.4);hut(S,90,500,.6);},S=>{flowers(S,40,920,545,5,18);}],4:[S=>{G0(S,'#d9c9a3');},S=>{crowd(S,40,240,548,.4,51,{n:4});}]},
 dana:{1:[S=>{G0(S,'#d9c9a3');},null],3:[S=>{G0(S);palm(S,560,520,.6,.1);palm(S,920,520,.55,-.15);},null]},
 obey:{1:[S=>{G0(S,'#d9c9a3');gopuram(S,900,500,.4);},null],2:[S=>{G0(S);hut(S,860,500,.6);},S=>{flowers(S,40,920,548,6,19);}]},
};
Object.entries(ENR).forEach(([id,m])=>Object.entries(m).forEach(([i,[bg,fg]])=>{const p=MURAL[id][+i],d=p.draw;p.draw=S=>{if(bg)bg(S);d(S);if(fg)fg(S);};}));

Object.keys(MURAL).forEach(id=>{SC[id]=muralScene(id);});
