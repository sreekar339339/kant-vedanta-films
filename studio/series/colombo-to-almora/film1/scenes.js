const SC={};
/* Each chapter is a mural: a list of drawings, each starting at a narration line index (at).
   Layout rule: one large hero drawing, satellites around it, one block of lettering via stack(). */
const pn=(at,draw)=>({at,draw});
const DEVF='"Tiro Devanagari Sanskrit",serif';

MURAL.arrive=[
 pn(0,S=>{wash(S,780,150,220,'rgba(255,214,120,.9)',.4);sun(S,800,120,46);cloud(S,600,90,200,3);
   waves(S,0,960,400,10,1,'#6cbfe8');S.g();S.S([[0,400],[260,384],[330,420],[300,470],[0,480]],{tone:[.95,.6],dir:1.5,col:'#e8d39a',cA:.75});palm(S,90,420,.95,.22);palm(S,190,430,.8,-.12);palm(S,270,440,.62,.05);
   steamship(S,620,420,1.35);for(let k=0;k<6;k++)bird(S,330+k*55,90+(k%3)*22,1.3);
   S.g();for(let k=0;k<5;k++){const x=40+k*46;person(S,x,500,.38,{head:'turban',col:[MSAF,'#f4efe4',MBLU,'#f4efe4',MRED][k],arms:k%2?'up':'down'});}
   stack(S,30,20,520,[['Colombo, 15 January 1897',36,{COLOMBO:MRED}],['home, after the West',26,{HOME:MSAF}]]);}),
 pn(2,S=>{wash(S,300,300,300,'rgba(150,210,120,.9)',.25);const pj=indiaMap(S,40,30,500);const stops=[['COLOMBO',79.86,6.93],['JAFFNA',80.01,9.66],['PAMBAN',79.21,9.28],['MADURA',78.12,9.93],['MADRAS',80.27,13.08],['CALCUTTA',88.36,22.57],['ALMORA',79.66,29.6],['LAHORE',74.34,31.55],['DACCA',90.41,23.81]];
   S.g();const route=[[79.86,6.93],[80.01,9.66],[79.21,9.28],[78.12,9.93],[79.39,10.96],[80.27,13.08],[88.36,22.57],[79.66,29.6],[74.53,32.49],[74.34,31.55],[75.79,28],[88.36,22.57],[90.41,23.81]].map(p=>pj(...p));
   for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],n=Math.max(2,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/14));for(let k=0;k<n;k+=2)S.L([[lerp(a[0],b[0],k/n),lerp(a[1],b[1],k/n)],[lerp(a[0],b[0],(k+1)/n),lerp(a[1],b[1],(k+1)/n)]],{lw:3.2,col:MRED,any:1});}
   stops.forEach(([n,lo,la])=>{const p=pj(lo,la);S.S(ell(p[0],p[1],7,7,10),{tone:[.4,.3],col:MRED,lw:1.6});const right=['JAFFNA','MADRAS','CALCUTTA','ALMORA','DACCA'].includes(n);S.T([[n,MINK]],p[0]+(right?12:-12),p[1]+(n==='PAMBAN'?20:6),18,{al:right?'left':'right'});});
   steamship(S,170,520,.3);stack(S,590,60,320,[['The road north',40,{NORTH:MRED}],['Jaffna, Pamban, Madura, Madras, Calcutta, then the Himalayas at Almora',24,{ALMORA:MSAF}],['29 talks. This is the first.',30,{FIRST:MRED}]]);}),
];

MURAL.welcome=[
 pn(0,S=>{wash(S,480,170,300,'rgba(255,200,120,.9)',.3);scroll(S,180,40,600,210);stack(S,220,70,520,[['Address of welcome',34,{WELCOME:MRED}],['the Hindu ideal of a universal religion, harmonising all creeds',26,{UNIVERSAL:MSAF,HARMONISING:MSAF}],['from the Hindus of Colombo',20]]);
   crowd(S,20,940,540,1.05,4,{n:12,heads:['turban','hair','turban','veil','hair','turban']});S.g();for(let k=0;k<7;k++){const x=70+k*135;S.L(ell(x,330,18,9,12,0,Math.PI),{lw:2,col:MSAF,any:1});}}),
 pn(2,S=>{wash(S,230,260,240,'rgba(238,122,28,.9)',.3);S.A('sv1893_bust',20,20,.86,{mono:1});
   stack(S,430,40,450,[['whom have they come out to honour?',30]]);
   tophat(S,480,190,.9);stack(S,540,140,330,[['a great politician',26]]);strikeL(S,535,160,250);
   person(S,480,320,.62,{head:'helmet',col:'#6a6a72'});stack(S,540,250,330,[['a great soldier',26]]);strikeL(S,535,270,220);
   moneybag(S,480,420,.85);stack(S,540,350,330,[['a millionaire',26]]);strikeL(S,535,370,190);
   S.g();S.S(ell(860,500,40,14,20,0,Math.PI).concat([[820,500]]),{tone:[.85,.4],col:'#8a5a32'});stack(S,430,455,370,[['but a begging Sannyasin',34,{SANNYASIN:MSAF}]]);}),
 pn(4,S=>{wash(S,190,290,200,'rgba(238,122,28,.9)',.35);spine(S,190,110,10,1.05);stack(S,40,40,300,[['religion',34,{RELIGION:MSAF}]]);stack(S,30,440,340,[['the backbone of the national life',26]]);
   building(S,420,470,480,230);S.g();for(let k=0;k<6;k++)S.G(460+k*84,370,30,'rgba(255,200,80,.95)',{a:.7});for(let k=0;k<4;k++)person(S,470+k*130,520,.36,{head:'turban',col:[MSAF,MBLU,'#f4efe4',MRED][k]});
   stack(S,430,20,460,[['Floral Hall',40,{FLORAL:MRED,HALL:MRED}],['the evening of the 16th',24]]);}),
];

MURAL.punya=[
 pn(0,S=>{wash(S,170,330,200,'rgba(150,210,120,.9)',.3);const pj=indiaMap(S,20,140,300,{hills:false});S.A('sv1893_chicago',320,60,.5);const a=pj(80,22);const pts=bz(a,[420,40],[700,20],[900,110],24);S.L(pts,{lw:2.4,any:1});for(let k=1;k<10;k++){const p=pts[Math.round(k/10*24)];S.G(p[0],p[1],20,'rgba(255,190,60,.95)',{a:.75});}
   cloud(S,840,160,140,5);stack(S,620,220,300,[['the blessings that followed my path',28,{BLESSINGS:MSAF}],['emotion → conviction',32,{CONVICTION:MRED}]]);}),
 pn(2,S=>{wash(S,480,190,330,'rgba(255,200,90,.9)',.38);S.g();S.T([['पुण्यभूमि',MINK]],480,230,140,{al:'center',font:DEVF});rays(S,480,190,180,330,20,{a0:-Math.PI*.95,a1:-Math.PI*.05,lw:1.6});
   diya(S,140,520,.9);diya(S,800,520,.9);stack(S,120,300,720,[['Punya Bhumi · the land of Karma',34,{KARMA:MSAF}],['“Today I stand here and say, with the conviction of truth, that it is so.”',30,{TRUTH:MRED,SO:MRED}]],{al:'left'});}),
 pn(4,S=>{wash(S,780,200,220,'rgba(255,210,100,.9)',.45);hill(S,420,960,500,330,'#c9dca8');S.g();S.S([[760,190],[800,150],[840,190],[840,230],[760,230]],{tone:[.97,.55],dir:0,col:'#f0d9a8'});S.G(800,180,120,'rgba(255,210,100,.95)',{a:.6});
   S.g();const path=bz([30,520],[300,510],[440,330],[790,232],30);S.L(path,{lw:2.6,any:1});for(let k=0;k<9;k++){const p=path[Math.round(k/9*28)];person(S,p[0],p[1]+4,.4,{col:[MSAF,MBLU,MRED,MGRN,MPUR,MSAF,MBLU,MRED,MGRN][k],head:['hair','turban','veil'][k%3]});S.G(p[0],p[1]-70,16,'rgba(255,200,80,.95)',{a:.8});}
   stack(S,30,30,420,[['every soul wending its way Godward, to its last home',26,{GODWARD:MSAF}],['“the land of introspection and of spirituality — it is India.”',30,{INDIA:MRED}]]);}),
 pn(6,S=>{const o=globe(S,480,320,190);S.g();for(let k=0;k<6;k++){const r=70+k*46;S.L(ell(o[0],o[1],r*1.5,r,40,Math.PI*1.05,Math.PI*1.95),{lw:2.6,col:[MBLU,MCYN,MPUR,MBLU,MCYN,MPUR][k],any:1});}rainbow(S,o[0],o[1],300,.2);
   [['EAST',880,330],['WEST',80,330],['NORTH',480,40],['SOUTH',480,530]].forEach(([n,x,y])=>S.T([[n,MINK]],x,y,22,{al:'center'}));stack(S,30,40,330,[['tidal waves of philosophy',36,{PHILOSOPHY:MBLU}]]);}),
];

MURAL.sword=[
 pn(0,S=>{wash(S,600,300,320,'rgba(200,150,90,.9)',.25);ground(S,470,'#c9a07a',3);for(let k=0;k<6;k++)hoplite(S,330+k*110,500,.72);dust(S,560,470,600,120,5);
   S.g();for(let k=0;k<3;k++){const x=90+k*70,y=330-k*40;S.S(tf([[0,0],[90,-20],[90,20]],x,y,1),{tone:[.9,.4],col:MBRZ});S.L([[x-50,y],[x,y]],{lw:3.4});}
   stack(S,30,20,560,[['the debt the world owes to the mild Hindu',28,{MILD:MSAF}],['elsewhere: war trumpets and embattled cohorts',24,{WAR:MRED}]]);}),
 pn(2,S=>{bulb(S,480,180,130);waves(S,0,960,330,20,2,MRED);helmetX(S,170,420,1.2,.4);helmetX(S,720,460,1.1,-.6);helmetX(S,880,400,.8,.9);sword(S,300,470,140,-.3,1.2);sword(S,560,410,120,.4,1.1);
   S.g();for(let k=0;k<22;k++){const x=20+k*42,y=20+((k*53)%100);S.L([[x,y+130],[x-4,y+160]],{lw:2.2,col:'#a01418',any:1});}
   tears(S,850,90,1.3);person(S,860,300,.56,{head:'veil',col:'#5a5a62'});person(S,800,300,.36,{head:'hair',col:'#7a7a80'});
   stack(S,30,30,380,[['“Each idea had to be soaked in a deluge of blood.”',30,{BLOOD:MRED}]]);stack(S,700,320,220,[['orphans · widows',22]]);}),
 pn(4,S=>{wash(S,480,330,320,'rgba(255,200,90,.95)',.45);diya(S,430,420,2.0);hill(S,0,960,540,80,'#b9d98a');S.g();for(let k=0;k<9;k++){const a=-Math.PI*.92+k*Math.PI*.105;bird(S,480+Math.cos(a)*330,330+Math.sin(a)*220,1.8);}
   stack(S,30,30,400,[['a blessing behind it, peace before it',30,{BLESSING:MSAF,PEACE:MBLU}]]);stack(S,560,30,370,[['“never a conquering race… and therefore we live.”',32,{LIVE:MRED}]]);}),
];

MURAL.capitol=[
 pn(0,S=>{wash(S,640,250,280,'rgba(220,200,160,.9)',.3);temple(S,640,330,1.1,true);ground(S,470,'#d8cdb4',2);for(let k=0;k<5;k++)hoplite(S,90+k*100,530,.62);dust(S,330,500,500,120,7);
   stack(S,30,30,420,[['the earth trembled at the Greek battalions',30],['gone, with not even a tale',28,{GONE:MRED}]]);}),
 pn(1,S=>{wash(S,300,250,240,'rgba(212,35,38,.9)',.25);eagleStandard(S,290,520,1.35);hill(S,440,960,520,200,'#d9cfb8');temple(S,720,380,.8,false);for(let k=0;k<3;k++)hoplite(S,560+k*110,540,.5);
   stack(S,480,30,430,[['the Roman eagle',38,{EAGLE:MBRZ}],['over everything worth having in this world',26]]);}),
 pn(2,S=>{wash(S,300,200,260,'rgba(180,180,200,.9)',.3);column(S,170,480,300,1.1,1);column(S,330,480,360,1.1,1);column(S,620,480,200,1,1);column(S,780,480,300,1,0);web(S,250,190,140);ground(S,480,'#d8d0c0',4);
   S.g();S.S(rect(450,440,120,34),{tone:[.95,.45],dir:1.4,col:'#ddd6c8'});S.S(ell(450,457,12,17,14),{tone:[.9,.5],col:'#ddd6c8'});
   stack(S,420,30,480,[['“the spider weaves its web where the Caesars ruled.”',30,{SPIDER:MRED,CAESARS:MPUR}]]);S.g();for(let k=0;k<4;k++)S.L(ell(640,520,40+k*40,6+k*5,30),{closed:1,lw:1.4,col:MBLU,any:1});stack(S,400,250,200,[['vanishing like ripples on the water',22]]);}),
 pn(4,S=>{wash(S,300,300,240,'rgba(255,200,120,.9)',.3);seated(S,300,500,1.2,'#e8e2d6');S.g();S.S(tf(rect(-70,-130,140,46),300,500,1),{tone:[.98,.7],col:'#f6eccf'});S.T([['मनु',MINK]],300,402,44,{al:'center',font:DEVF});
   stack(S,560,30,350,[['if Manu came back today, he would not be in a foreign land',28,{MANU:MSAF}]]);S.g();const hx=730,hy=370;S.S(bz([hx,hy+80],[hx-120,hy-10],[hx-50,hy-110],[hx,hy-40],14).concat(bz([hx,hy-40],[hx+50,hy-110],[hx+120,hy-10],[hx,hy+80],14)),{rad:1,tone:[.98,.45],col:MRED,lw:2.8});
   S.g();S.L([[600,300],[640,300],[652,270],[668,330],[684,300],[860,300]],{lw:2.4,any:1,col:MRED});stack(S,560,470,360,[['the mainspring of the national life is here',24,{HERE:MRED}]]);}),
];

MURAL.plough=[
 pn(0,S=>{stack(S,30,20,300,[['other nations',32]]);[['politics','#cfd8f0'],['society','#f0d8cf'],['wealth','#f0e6b8'],['the senses','#e8d0f0']].forEach(([s,col],k)=>{S.g();S.S(rect(30,80+k*80,300,66),{tone:[.97,.6],dir:0,col});S.T([[s.toUpperCase(),MINK]],180,124+k*80,28,{al:'center'});});
   S.g();S.S(rect(30,410,70,26),{tone:[.97,.7],col:'#fff'});S.T([['RELIGION',MINK]],65,429,12,{al:'center'});stack(S,110,410,220,[['and a little bit of religion',20]]);
   wash(S,690,280,230,'rgba(238,122,28,.9)',.35);stack(S,480,20,400,[['India',36,{INDIA:MSAF}]]);S.g();S.S(rect(470,80,440,360),{tone:[.95,.5],dir:.8,col:'#f4b06a'});S.T([['RELIGION',MINK]],690,280,70,{al:'center'});stack(S,470,460,440,[['the one and the only occupation of life',26]]);}),
 pn(2,S=>{newspaper(S,40,80,380,290,'SINO-JAPANESE WAR',{a:-.05});stack(S,70,410,320,[['very few, if any',30]]);newspaper(S,470,60,430,330,'PARLIAMENT OF RELIGIONS',{a:.04});S.A('sv1893_bust',600,130,.36,{mono:1});
   stack(S,470,420,440,[['even the poorest labourer knows',30,{KNOWS:MRED}]]);}),
 pn(3,S=>{wash(S,240,330,220,'rgba(120,140,200,.9)',.25);person(S,200,500,1.5,{head:'hat',col:'#4a4a52',arms:'hold'});plough(S,250,500,1.2);church(S,820,500,1.0);ground(S,500,'#c9b48a',3);
   S.g();S.S(rect(400,140,170,120),{tone:[.95,.55],dir:0,col:'#d8c8a8'});S.S(rect(450,130,70,14),{tone:[.4,.2]});S.T([['VOTE',MINK]],485,210,24,{al:'center'});
   S.g();S.S(ell(650,200,36,36,24),{rad:1,tone:[1,.55],col:'#d8d8de'});S.T([['$',MINK]],650,214,34,{al:'center'});
   stack(S,390,290,330,[['radical or conservative? republican or democrat?',24],['the silver question',24],['religion: goes to church. that is all.',24,{CHURCH:MBLU}]]);}),
 pn(5,S=>{wash(S,600,250,260,'rgba(255,190,90,.9)',.3);ground(S,480,'#c99a62',5);ox(S,110,490,1.1);ox(S,300,490,1.1);plough(S,450,490,1.2);person(S,580,500,1.55,{head:'turban',col:'#f4efe4',arms:'up',mark:1});
   S.g();S.S([[650,40],[930,40],[930,250],[720,250],[660,300],[690,250],[650,250]],{tone:[1,.85],dir:1.5,col:'#fffbe8',lw:2.6});stack(S,670,60,250,[['politics? what is that?',22],['“Look here, my friend, I have marked it on my forehead.”',24,{FOREHEAD:MRED}]]);
   stack(S,670,330,260,[["that is our nation's life",30,{LIFE:MRED}]]);}),
];

MURAL.dynamo=[
 pn(0,S=>{wash(S,250,300,220,'rgba(238,122,28,.9)',.25);const r=rng(8);for(let k=0;k<5;k++){const x=70+k*85;person(S,x,510,.78,{col:[MBLU,MRED,MGRN,MPUR,MSAF][k],head:['turban','hair','veil','hair','turban'][k]});const a=-Math.PI/2+(r()-.5)*1.6;arrowL(S,[x,310],[x+Math.cos(a)*80,310+Math.sin(a)*80],{lift:6,lw:2.6,col:MSAF});}
   stack(S,30,30,420,[['each man a bent · each race a mission',28,{MISSION:MSAF}]]);crownX(S,620,200,1.4);cannon(S,800,250,1.0);strikeL(S,540,150,370);
   stack(S,500,300,420,[['“Political greatness or military power is never the mission of our race”',26,{NEVER:MRED}]]);}),
 pn(2,S=>{wash(S,330,300,300,'rgba(255,210,90,.95)',.5);rays(S,330,300,140,270,22,{lw:1.6,a0:-Math.PI*1.05,a1:Math.PI*.05});dynamo(S,380,470,1.6);rainbow(S,330,300,330,.2);
   stack(S,600,40,320,[['conserve · preserve · accumulate',30,{ACCUMULATE:MSAF}],['into a dynamo, all the spiritual energy of the race',24],['and pour it forth in a deluge',28,{DELUGE:MBLU}]]);}),
 pn(4,S=>{const o=globe(S,480,290,160);[[130,150,'PERSIAN'],[120,380,'GREEK'],[820,140,'ROMAN'],[840,380,'ARAB'],[480,60,'ENGLISH']].forEach(([x,y,n])=>{S.g();S.S([[x-50,y],[x+50,y],[x+36,y+20],[x-36,y+20]],{tone:[.8,.35],dir:1.5,col:MBROWN});S.S([[x,y-64],[x,y-4],[x+44,y-8]],{tone:[.99,.8],col:'#f4f0e6'});S.T([[n,MINK]],x,y+46,20,{al:'center'});arrowL(S,[x,y+10],[lerp(x,o[0],.62),lerp(y,o[1],.62)],{lift:20,lw:2.2,col:MBLU});});
   S.G(o[0],o[1],150,'rgba(255,210,90,.95)',{a:.8});stack(S,40,470,880,[['“India’s gift to the world is the light spiritual.”',32,{LIGHT:MSAF,SPIRITUAL:MSAF}]]);}),
];

MURAL.dew=[
 pn(0,S=>{wash(S,470,250,260,'rgba(150,210,120,.9)',.3);const pj=indiaMap(S,320,40,320,{hills:false});const o=pj(78,21);S.g();for(let k=0;k<14;k++){const a=-Math.PI*1.1+k/13*Math.PI*1.2;arrowL(S,[o[0]+Math.cos(a)*50,o[1]+Math.sin(a)*50],[o[0]+Math.cos(a)*230,o[1]+Math.sin(a)*170],{lift:10,lw:2.2,col:[MSAF,MBLU,MGRN,MPUR][k%4]});}
   steamship(S,830,520,.32);stack(S,30,380,280,[['when a conquering nation linked India to the world',24],['the world was flooded with Indian spiritual ideas',24,{SPIRITUAL:MSAF}]]);}),
 pn(1,S=>{wash(S,180,330,200,'rgba(120,120,140,.9)',.25);person(S,180,520,1.9,{head:'hair',col:'#3a3a40',arms:'hold'});S.g();S.S(rect(158,300,64,44),{tone:[.99,.7],col:'#f6eccf'});S.T([['SCHOPENHAUER',MINK]],180,536,22,{al:'center'});
   [['उपनिषद्','SANSKRIT',DEVF],['سرّ اکبر','PERSIAN','Amiri,serif'],['OUPNEK’HAT','LATIN',LETF]].forEach(([t,l,f],k)=>{const x=370+k*185;S.g();S.S(rect(x,40,160,110),{tone:[.98,.7],dir:1.5,col:'#f6eccf'});S.T([[t,MINK]],x+80,104,k===2?22:32,{al:'center',font:f});S.T([[l,MINK]],x+80,176,16,{al:'center'});if(k)arrowL(S,[x-30,95],[x-6,95],{lift:4,lw:2.4});});
   stack(S,370,210,540,[['“In the whole world there is no study so beneficial and so elevating as that of the Upanishads.”',26,{UPANISHADS:MSAF}],['the solace of my life · the solace of my death',22]]);}),
 pn(3,S=>{sword(S,90,280,300,-.5,1.8);S.g();S.L(ell(240,200,170,170,40),{closed:1,lw:5,col:MRED,any:1});S.L([[120,320],[360,80]],{lw:5,col:MRED,any:1});stack(S,30,410,420,[['“We never preached our thoughts with fire and sword.”',28,{FIRE:MRED,SWORD:MRED}]]);
   wash(S,700,230,240,'rgba(139,79,224,.9)',.3);rainbow(S,700,220,220,.22);S.g();S.T([['FASCINATION',MPUR]],700,240,66,{al:'center',rot:-.04});flowerOfLife(S,700,120,26);stack(S,540,320,360,[['a charm that comes imperceptibly, to those who persevere',24]]);}),
 pn(5,S=>{wash(S,480,300,500,'rgba(255,200,140,.9)',.35,1.8);sun(S,830,330,56);ground(S,450,'#9fcf6a',6);for(let k=0;k<7;k++)rose(S,90+k*125,410,1.2,[MRED,MPNK,MRED,MSAF,MPNK,MRED,MPNK][k]);
   S.g();for(let k=0;k<22;k++){const x=40+k*42,y=170+((k*37)%160);S.S(tf([[0,-12],[8,4],[0,12],[-8,4]],x,y,1),{tone:[.98,.6],col:MCYN,lw:1.2});}
   stack(S,30,30,560,[['“Slow and silent, as the gentle dew that falls in the morning…”',28,{DEW:MCYN}],['upon the world of thought',24]]);}),
];

MURAL.porcelain=[
 pn(0,S=>{wash(S,240,290,220,'rgba(230,190,120,.9)',.3);wheel(S,240,290,170);stack(S,40,480,360,[['once more, history is going to repeat itself',24]]);
   wash(S,700,200,260,'rgba(150,200,255,.95)',.5);rays(S,700,40,20,520,16,{a0:Math.PI*.28,a1:Math.PI*.72,lw:2.2});stack(S,520,380,400,[['under the blasting light of modern science',28,{SCIENCE:MBLU}]]);}),
 pn(2,S=>{wash(S,330,300,240,'rgba(120,170,230,.9)',.3);vase(S,320,490,2,true);hammer(S,620,140,1.25,-.9);S.g();for(let k=0;k<9;k++){const x=200+k*40,y=500+(k%2)*12;S.S(tf([[-16,0],[0,-18],[18,-4],[6,12]],x,y,1),{tone:[.98,.6],col:'#e8f0fb',lw:1.6});}
   stack(S,560,330,360,[['old orthodoxies, pulverised like masses of porcelain',28,{PORCELAIN:MBLU}]]);}),
 pn(3,S=>{S.g();S.S(ell(210,440,180,46,30),{tone:[.6,.3],col:'#8a7a5a'});S.S(ell(210,430,36,16,14),{rad:1,tone:[.9,.4],col:'#7cc4ee'});stack(S,40,260,340,[['the world: a little mud-puddle',26]]);clock(S,210,120,80);stack(S,40,210,340,[['time began but the other day',22]]);
   S.g();[[500,1],[590,1.2],[690,1.35],[800,1.55]].forEach(([x,s],k)=>person(S,x,500,.6*s,{head:'hair',col:['#8a5a32','#9a6a3a','#5a6a8a',MBLU][k],arms:'down'}));stack(S,470,40,440,[['evolution · conservation of energy',30,{EVOLUTION:MGRN}],['death blows to crude theologies',24]]);}),
 pn(5,S=>{S.g();for(let k=0;k<7;k++)S.L(ell(480,290,60+k*58,40+k*34,48),{closed:1,lw:1.8,col:[MPUR,MBLU,MCYN,MGRN,MYEL,MSAF,MRED][k],any:1});rainbow(S,480,290,340,.22);S.g();S.S(ell(480,290,46,46,24),{rad:1,tone:[1,.8],col:MYEL});
   S.T([['VEDANTA',MINK]],480,100,66,{al:'center'});stack(S,90,470,780,[['the oneness of all · the eternal soul of man · infinite time, space, causation',26,{ONENESS:MSAF,SOUL:MSAF}]]);}),
];

MURAL.yugas=[
 pn(0,S=>{palmleaf(S,30,90,420,240);S.T([['श्रुति',MINK]],240,190,64,{al:'center',font:DEVF});stack(S,70,240,340,[['the soul · God · perfection · projection · cycles',20]]);stack(S,90,360,320,[['abides for ever',34,{EVER:MGRN}]]);
   palmleaf(S,500,90,420,240);S.T([['स्मृति · पुराण',MINK]],710,190,50,{al:'center',font:DEVF});stack(S,540,240,340,[['the minor laws of everyday life',22]]);stack(S,560,360,320,[['changes with the age',34,{CHANGES:MRED}]]);
   stack(S,260,450,460,[['two sets of truths',36]]);}),
 pn(4,S=>{wash(S,300,290,240,'rgba(230,190,120,.9)',.35);wheel(S,300,290,170,['सत्य','त्रेता','द्वापर','कलि']);for(let k=0;k<3;k++)person(S,610+k*110,510,.85,{head:'beard',col:'#f2ead8',arms:k===1?'up':'down'});
   stack(S,560,30,370,[['customs of one Yuga are not the customs of another',26,{YUGA:MSAF}],['great Rishis will appear',30,{RISHIS:MSAF}]]);}),
];

MURAL.tribes=[
 pn(0,S=>{hill(S,0,340,500,140,'#d9c08a');hill(S,300,660,500,180,'#d9c08a');hill(S,620,960,500,140,'#d9c08a');[[170,360,'BAAL'],[480,320,'BAAL'],[790,360,'MOLOCH']].forEach(([x,y,n])=>{S.g();S.S(tf([[-22,0],[-22,-80],[0,-104],[22,-80],[22,0]],x,y,1),{tone:[.9,.4],dir:0,col:MBRZ});S.T([[n,MINK]],x,y-120,22,{al:'center'});crowd(S,x-110,x+110,y+150,.5,x|0,{n:5});});
   stack(S,30,30,460,[['each tribe, a god of its own',34]]);}),
 pn(2,S=>{wash(S,300,250,200,'rgba(211,162,74,.9)',.3);crownX(S,280,130,1.3);S.g();S.S(tf([[-36,0],[-36,-140],[0,-190],[36,-140],[36,0]],280,400,1),{tone:[.9,.35],dir:0,col:MBRZ});S.T([['BAAL-MERODACH',MINK]],280,440,28,{al:'center'});
   S.g();S.S(tf([[-36,0],[-36,-140],[0,-190],[36,-140],[36,0]],680,400,1),{tone:[.9,.35],dir:0,col:'#9a9aa2'});S.T([['MOLOCH-YAHVEH',MINK]],680,440,28,{al:'center'});sword(S,410,300,130,-.6,1.3);sword(S,550,300,130,Math.PI+.6,1.3);
   stack(S,180,470,600,[['decided by the fortunes of battle',32,{BATTLE:MRED}]]);}),
 pn(5,S=>{wash(S,480,270,280,'rgba(150,210,120,.9)',.3);indiaMap(S,300,30,360,{hills:false});trident(S,170,500,1.5);conch(S,780,300,1.5);S.T([['SHIVA',MINK]],170,535,26,{al:'center'});S.T([['VISHNU',MINK]],790,410,26,{al:'center'});
   stack(S,560,450,370,[['in India too, competing gods',30]]);}),
];

MURAL.ekam=[
 pn(0,S=>{wash(S,480,270,380,'rgba(255,210,100,.95)',.4,1.6);rays(S,480,270,240,460,26,{a0:-Math.PI*.98,a1:-Math.PI*.02,lw:1.6});palmleaf(S,60,170,840,200);S.T([['एकं सद्विप्रा बहुधा वदन्ति',MINK]],480,288,58,{al:'center',font:DEVF});
   stack(S,30,30,460,[['out of the din and confusion, a voice',28]]);stack(S,90,400,780,[['“That which exists is One; sages call It by various names.”',32,{ONE:MSAF}]]);}),
 pn(2,S=>{wash(S,480,300,320,'rgba(238,122,28,.9)',.25);trident(S,230,440,1.2);conch(S,700,290,1.3);S.g();S.L(ell(470,290,330,150,40),{closed:1,lw:3.4,col:MSAF,any:1});S.T([['=',MINK]],470,320,90,{al:'center'});
   stack(S,240,30,480,[['the same One, called by a hundred names',30,{ONE:MSAF}]]);stack(S,100,470,760,[['“The whole history of India you may read in these few words.”',28,{HISTORY:MRED}]]);}),
 pn(4,S=>{wash(S,470,300,300,'rgba(255,210,100,.9)',.4);seated(S,270,510,1.05,MSAF);seated(S,680,510,1.05,'#e8e2d6');S.g();for(let k=0;k<3;k++)S.L(ell(475,240,40+k*20,40+k*20,30,Math.PI*1.1,Math.PI*1.9),{lw:2,col:MSAF,any:1});
   stack(S,40,30,300,[['the eternal servant of God',26]]);stack(S,620,30,300,[['one with God Himself',26]]);stack(S,330,120,300,[['both good Hindus',36,{GOOD:MGRN}]],{al:'left'});}),
];

MURAL.rivers=[
 pn(0,S=>{wash(S,480,300,360,'rgba(120,200,160,.9)',.25);mosque(S,230,480,1.5);church(S,720,480,1.35);crowd(S,370,600,490,.72,9,{n:4,heads:['turban','turban','hair','turban'],arms:'hold'});ground(S,480,'#d9c9a3',9);
   stack(S,30,30,880,[['“It is here that Indians build temples for Mohammedans and Christians; nowhere else.”',28,{TEMPLES:MSAF}]]);}),
 pn(2,S=>{[90,290,490,690,870].forEach((x,k)=>{S.g();S.S([[x-120,240],[x,80+(k%2)*30],[x+120,240]],{tone:[.97,.45],dir:.4,col:'#a8b8c8'});S.S([[x-28,100+(k%2)*30+20],[x,80+(k%2)*30],[x+28,100+(k%2)*30+20]],{tone:[1,.9],col:'#ffffff'});});
   S.g();[[90,3,60],[290,1,10],[490,4,70],[690,1.2,20],[870,2.5,50]].forEach(([x0,f,amp])=>{const p=[];for(let k=0;k<=30;k++){const u=k/30;p.push([lerp(x0,480,u)+Math.sin(u*Math.PI*f)*amp*(1-u),lerp(240,450,u)]);}S.L(p,{lw:7,col:'#5fb4e8',any:1});});waves(S,180,780,450,6,3);
   stack(S,30,470,420,[['different rivers, crooked or straight',26]]);stack(S,560,470,370,[['all come unto the ocean',28,{OCEAN:MBLU}]]);}),
 pn(4,S=>{wash(S,480,270,260,'rgba(255,210,100,.95)',.55);lingam(S,480,340,1.6);caaba(S,140,520,1.0);church(S,820,520,.8);stupa(S,480,535,.9);[[180,420],[790,420]].forEach(([x,y])=>arrowL(S,[x,y],[lerp(x,480,.55),lerp(y,260,.55)],{lift:30,lw:2.4,col:MSAF}));
   stack(S,30,30,880,[['the Caaba, the church, the Buddhist temple: kneeling to Him, whether they know it or not',26,{HIM:MSAF}]]);}),
];

MURAL.mission=[
 pn(0,S=>{wash(S,480,350,400,'rgba(150,200,255,.9)',.25,1.8);crowd(S,30,930,520,1.05,12,{n:11,heads:['turban','hat','veil','hair','beard','turban','hair','veil','hat','turban','hair']});
   stack(S,30,30,600,[['without variation life must cease',32],['but we need not hate each other',32,{HATE:MRED}]]);}),
 pn(1,S=>{wash(S,480,280,380,'rgba(255,200,120,.9)',.4,1.6);stack(S,90,80,780,[['“The one great lesson that the world wants most…',32],['not only toleration,',56],['but sympathy.”',72,{SYMPATHY:MRED}]]);}),
 pn(2,S=>{wash(S,470,360,300,'rgba(255,200,120,.9)',.3);person(S,300,510,1.5,{head:'turban',col:MBLU});person(S,480,510,1.45,{head:'veil',col:MPNK,tcol:MPNK});person(S,640,510,.95,{head:'hair',col:MSAF});ground(S,510,'#b9d98a',7);
   ['mildness','gentleness','forbearance','toleration','sympathy','brotherhood'].forEach((w,k)=>stack(S,40+(k%3)*300,20+Math.floor(k/3)*50,280,[[w,30,{SYMPATHY:MRED}]]));stack(S,680,320,250,[['man · woman · child, without respect of race, caste, or creed',22]]);}),
 pn(3,S=>{S.g();S.S(rect(20,20,900,500),{tone:[1,1],noline:1,col:'#cfe6f8',cA:.6});S.G(260,110,170,'rgba(255,255,255,1)',{a:.85,sx:1.7});S.G(780,80,150,'rgba(255,255,255,1)',{a:.85,sx:1.7});S.A('sv1893_chicago',520,30,.68);
   S.g();[['“They call Thee',200],['by various names;',256],['Thou art One.”',312]].forEach(([t,y])=>S.T([[t,MINK]],60,y,40,{font:QF,style:'italic',rot:0}));S.T([['— Swami Vivekananda, Colombo, 1897',MINK]],62,380,16,{font:QF,rot:0});}),
 pn(4,S=>{wash(S,480,250,260,'rgba(150,210,120,.9)',.3);const pj=indiaMap(S,320,30,320,{hills:false});const a=pj(79.86,6.93),b=pj(80.01,9.66);S.g();S.L([a,[a[0]+30,(a[1]+b[1])/2],b],{lw:3.4,col:MRED,any:1});S.S(ell(a[0],a[1],7,7,10),{tone:[.4,.3],col:MRED});S.S(ell(b[0],b[1],9,9,10),{tone:[.4,.3],col:MRED});
   S.T([['COLOMBO',MINK]],a[0]+14,a[1]+6,18).T([['JAFFNA',MINK]],b[0]+14,b[1]+4,18);steamship(S,180,500,.4);stack(S,30,30,300,[['next: Jaffna',38,{JAFFNA:MRED}],['Vaidika: the common ground',28]]);}),
];

Object.keys(MURAL).forEach(id=>{SC[id]=muralScene(id);});
