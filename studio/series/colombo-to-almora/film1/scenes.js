const SC={};
/* Each chapter is a mural: drawings that start at a narration line index (at).
   Watercolour style, dense: background band, mid-ground cluster, foreground crowd/objects, one lettering block in clear space. */
const pn=(at,draw)=>({at,draw});
const DEVF='"Tiro Devanagari Sanskrit",serif';
const TXT=(S,items,x=30,y=18,w=430)=>stack(S,x,y,w,items);

MURAL.arrive=[
 pn(0,S=>{skyset(S,3,{sx:820,sy:90,clouds:2,cx0:560,cx1:700,cy:70,birds:7,bx:470,by:120});mountains(S,0,440,300,110,4,'#b8c8d8');waves(S,0,960,330,8,1,'#6cbfe8');
   lighthouse(S,890,330,.72);steamship(S,610,330,.95);canoe(S,360,360,.8);canoe(S,830,392,.6,'#a86a3a');canoe(S,180,372,.5,'#9a5a2a');
   S.g();S.S([[0,410],[960,400],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col:'#e8d39a',noline:1});harbour(S,10,300,410,2);palm(S,320,420,.8,.2);palm(S,935,430,.7,-.15);
   arch(S,470,470,260,140,'WELCOME');bunting(S,40,460,330,40,1);bunting(S,740,940,340,30,3);flag(S,450,470,.7,MSAF);flag(S,750,470,.7,MGRN);
   crowd(S,20,930,548,.62,4,{n:17,heads:['turban','hair','turban','veil','hair','turban'],arms:'up'});garland(S,600,420,60,MSAF);garland(S,250,440,50,MYEL);garland(S,860,440,46,MRED);
   TXT(S,[['Colombo, 15 January 1897',34,{COLOMBO:MRED}],['home, after his work in the West',24,{HOME:MSAF}]]);}),
 pn(2,S=>{wash(S,300,300,300,'rgba(150,210,120,.9)',.25);mountains(S,40,560,120,70,8,'#c8d8e8');const pj=indiaMap(S,40,40,500);
   const stops=[['COLOMBO',79.86,6.93],['JAFFNA',80.01,9.66],['PAMBAN',79.21,9.28],['MADURA',78.12,9.93],['MADRAS',80.27,13.08],['CALCUTTA',88.36,22.57],['ALMORA',79.66,29.6],['LAHORE',74.34,31.55],['DACCA',90.41,23.81]];
   S.g();const route=[[79.86,6.93],[80.01,9.66],[79.21,9.28],[78.12,9.93],[79.39,10.96],[80.27,13.08],[88.36,22.57],[79.66,29.6],[74.53,32.49],[74.34,31.55],[75.79,28],[88.36,22.57],[90.41,23.81]].map(p=>pj(...p));
   for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],n=Math.max(2,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/14));for(let k=0;k<n;k+=2)S.L([[lerp(a[0],b[0],k/n),lerp(a[1],b[1],k/n)],[lerp(a[0],b[0],(k+1)/n),lerp(a[1],b[1],(k+1)/n)]],{lw:3.2,col:MRED,any:1});}
   stops.forEach(([n,lo,la])=>{const p=pj(lo,la);S.S(ell(p[0],p[1],7,7,10),{tone:[.4,.3],col:MRED,lw:1.6});const right=['JAFFNA','MADRAS','CALCUTTA','ALMORA','DACCA'].includes(n);if(n==='LAHORE'){S.T([[n,MINK]],p[0],p[1]-14,18,{al:'center'});return;}S.T([[n,MINK]],p[0]+(right?12:-12),p[1]+(n==='PAMBAN'?20:6),18,{al:right?'left':'right'});});
   const icon=(n,f)=>{const p=pj(...n);f(p);};icon([79.66,30.5],p=>mountains(S,p[0]-50,p[0]+50,p[1]-6,40,2,'#dde6ee'));icon([80.27,13.08],p=>gopuram(S,p[0]+50,p[1]+30,.18));
   steamship(S,170,520,.3);for(let k=0;k<4;k++)canoe(S,560+k*30,520-k*8,.22);
   TXT(S,[['The road north',40,{NORTH:MRED}],['Jaffna, Pamban, Madura, Madras, Calcutta, and the Himalayas at Almora',24,{ALMORA:MSAF}],['29 talks. This is the first.',30,{FIRST:MRED}]],590,40,330);}),
];

MURAL.welcome=[
 pn(0,S=>{wash(S,480,170,300,'rgba(255,200,120,.9)',.3);bunting(S,20,940,30,30,2);scroll(S,180,50,600,200);TXT(S,[['Address of welcome',32,{WELCOME:MRED}],['the Hindu ideal of a universal religion, harmonising all creeds',24,{UNIVERSAL:MSAF,HARMONISING:MSAF}],['P. Coomara Swamy, for the Hindus of Colombo',18]],220,76,520);
   crowdRows(S,10,930,548,1,4,{arms:'up'});S.g();for(let k=0;k<8;k++)garland(S,60+k*120,300+(k%2)*14,40,[MSAF,MYEL,MRED][k%3]);flag(S,40,320,.8,MSAF);flag(S,920,320,.8,MGRN);for(let k=0;k<6;k++)diya(S,100+k*150,290,.3);}),
 pn(2,S=>{wash(S,230,260,240,'rgba(238,122,28,.9)',.3);S.A('sv1893_bust',20,30,.84,{mono:1});TXT(S,[['whom have they come out to honour?',28]],430,26,460);
   colonial(S,440,200,60,60,'#e8dcc8');tophat(S,540,190,.8);person(S,600,200,.42,{head:'hat',col:'#3a3a40',arms:'out'});TXT(S,[['a great politician',24]],660,150,240);strikeL(S,655,170,200);
   cannon(S,470,300,.5);person(S,560,310,.5,{head:'helmet',col:'#6a6a72'});sword(S,590,250,60,-.6,.6);TXT(S,[['a great soldier',24]],660,260,240);strikeL(S,655,280,180);
   moneybag(S,470,410,.7);for(let k=0;k<5;k++)coin(S,520+k*16,402-k*6,10);crownX(S,600,410,.6);TXT(S,[['a millionaire',24]],660,360,240);strikeL(S,655,380,160);
   S.g();S.S(ell(860,500,40,14,20,0,Math.PI).concat([[820,500]]),{tone:[.85,.4],col:'#8a5a32'});TXT(S,[['but a begging Sannyasin',32,{SANNYASIN:MSAF}]],430,450,380);}),
 pn(4,S=>{wash(S,190,290,200,'rgba(238,122,28,.9)',.35);spine(S,190,110,10,1.05);TXT(S,[['religion',34,{RELIGION:MSAF}]],40,30,300);TXT(S,[['the backbone of the national life',24]],30,440,330);
   skyset(S,11,{sx:880,sy:70,clouds:1,cx0:720,cx1:720,cy:90,birds:4,bx:640,by:120});building(S,420,470,480,230);S.g();for(let k=0;k<6;k++)S.G(460+k*84,370,30,'rgba(255,200,80,.95)',{a:.7});
   for(let k=0;k<6;k++)person(S,440+k*90,525,.34,{head:['turban','hair','veil'][k%3],col:[MSAF,MBLU,'#f4efe4',MRED,MPUR,MGRN][k]});palm(S,390,470,.55,.15);palm(S,930,470,.5,-.1);bunting(S,420,900,240,20,4);
   TXT(S,[['Floral Hall',40,{FLORAL:MRED,HALL:MRED}],['the evening of the 16th',24]],430,18,280);}),
];

MURAL.punya=[
 pn(0,S=>{wash(S,170,330,200,'rgba(150,210,120,.9)',.3);const pj=indiaMap(S,20,140,300,{hills:false});S.A('sv1893_chicago',330,60,.5);const a=pj(80,22);const pts=bz(a,[420,40],[700,20],[900,110],24);S.L(pts,{lw:2.4,any:1});for(let k=1;k<10;k++){const p=pts[Math.round(k/10*24)];S.G(p[0],p[1],20,'rgba(255,190,60,.95)',{a:.75});}
   S.g();colonial(S,800,190,90,70,'#e8dcc8');church(S,900,190,.4);steamship(S,700,250,.28);cloud(S,860,60,120,5);for(let k=0;k<4;k++)star(S,560+k*80,140+(k%2)*30,10);
   TXT(S,[['the blessings that followed my path in the West',26,{BLESSINGS:MSAF}],['emotion becomes conviction',30,{CONVICTION:MRED}]],610,300,310);}),
 pn(2,S=>{wash(S,480,190,330,'rgba(255,200,90,.9)',.38);S.g();S.T([['पुण्यभूमि',MINK]],480,220,130,{al:'center',font:DEVF});rays(S,480,180,170,320,22,{a0:-Math.PI*.95,a1:-Math.PI*.05,lw:1.6});
   templeTown(S,40,300,520,3);templeTown(S,660,920,520,5);for(let k=0;k<5;k++)diya(S,320+k*70,520,.5);lotus(S,140,530,.5);lotus(S,820,530,.5);
   TXT(S,[['Punya Bhumi · the land of Karma',32,{KARMA:MSAF}],['“Today I stand here and say, with the conviction of truth, that it is so.”',26,{TRUTH:MRED,SO:MRED}]],150,262,660);}),
 pn(4,S=>{wash(S,780,200,220,'rgba(255,210,100,.9)',.45);mountains(S,420,960,300,180,12,'#c8d8c8');hill(S,420,960,500,300,'#c9dca8');S.g();S.S([[760,190],[800,150],[840,190],[840,230],[760,230]],{tone:[.97,.55],dir:0,col:'#f0d9a8'});S.G(800,180,120,'rgba(255,210,100,.95)',{a:.6});
   S.g();const path=bz([30,520],[300,510],[440,330],[790,232],30);S.L(path,{lw:2.6,any:1});for(let k=0;k<10;k++){const p=path[Math.round(k/10*28)];person(S,p[0],p[1]+4,.4,{col:[MSAF,MBLU,MRED,MGRN,MPUR,MSAF,MBLU,MRED,MGRN,MPNK][k],head:['hair','turban','veil'][k%3]});S.G(p[0],p[1]-70,16,'rgba(255,200,80,.95)',{a:.8});}
   flowers(S,40,420,540,6,4);for(let k=0;k<4;k++)dove(S,520+k*70,120+(k%2)*24,.6);
   TXT(S,[['every soul wending its way Godward, to its last home',24,{GODWARD:MSAF}],['“the land of introspection and of spirituality — it is India.”',28,{INDIA:MRED}]],30,18,420);}),
 pn(6,S=>{const o=globe(S,480,320,180);S.g();for(let k=0;k<6;k++){const r=70+k*46;S.L(ell(o[0],o[1],r*1.5,r,40,Math.PI*1.05,Math.PI*1.95),{lw:2.6,col:[MBLU,MCYN,MPUR,MBLU,MCYN,MPUR][k],any:1});}rainbow(S,o[0],o[1],300,.2);
   [[120,180],[840,160],[110,440],[850,440]].forEach(([x,y],k)=>{if(k%2)steamship(S,x,y,.26);else canoe(S,x,y,.45);});[[200,300],[760,300]].forEach(([x,y])=>book(S,x,y,.6,MPUR));for(let k=0;k<5;k++)star(S,260+k*110,500+(k%2)*16,9,MCYN);
   [['EAST',900,320],['WEST',60,320],['NORTH',480,30],['SOUTH',480,530]].forEach(([n,x,y])=>S.T([[n,MINK]],x,y,20,{al:'center'}));TXT(S,[['tidal waves of philosophy',32,{PHILOSOPHY:MBLU}]],30,40,300);}),
];

MURAL.sword=[
 pn(0,S=>{wash(S,600,300,320,'rgba(200,150,90,.9)',.25);skyset(S,5,{sx:860,sy:80,clouds:1,cx0:600,cx1:600,cy:80,birds:3,bx:700,by:120});temple(S,780,300,.5,false);ground(S,470,'#c9a07a',3);battlefield(S,310,940,500,5);
   S.g();for(let k=0;k<3;k++){const x=90+k*70,y=330-k*40;trumpet(S,x,y,.8,-.3);}eagleStandard(S,260,470,.55);fire(S,60,470,.8);
   TXT(S,[['the debt the world owes to the mild Hindu',28,{MILD:MSAF}],['elsewhere: war trumpets and embattled cohorts',24,{WAR:MRED}]],30,18,560);}),
 pn(2,S=>{bulb(S,480,180,120);waves(S,0,960,330,20,2,MRED);helmetX(S,170,420,1.1,.4);helmetX(S,720,460,1,-.6);helmetX(S,880,400,.8,.9);sword(S,300,470,140,-.3,1.2);sword(S,560,410,120,.4,1.1);
   S.g();for(let k=0;k<22;k++){const x=20+k*42,y=20+((k*53)%100);S.L([[x,y+130],[x-4,y+160]],{lw:2.2,col:'#a01418',any:1});}fire(S,640,330,.7);fire(S,90,330,.6);
   S.g();S.S(ell(400,480,40,14,20),{rad:1,tone:[.85,.3],col:MBRZ});S.S(ell(820,500,34,12,20),{rad:1,tone:[.85,.3],col:MBRZ});
   tears(S,850,90,1.3);person(S,860,300,.56,{head:'veil',col:'#5a5a62'});person(S,800,300,.36,{head:'hair',col:'#7a7a80'});person(S,760,300,.3,{head:'hair',col:'#8a8a90'});
   TXT(S,[['“Each idea had to be soaked in a deluge of blood.”',28,{BLOOD:MRED}]],30,18,380);TXT(S,[['the wails of orphans, the tears of widows',20]],30,130,300);}),
 pn(4,S=>{wash(S,480,330,320,'rgba(255,200,90,.95)',.45);mountains(S,0,960,380,90,14,'#c8d8b0');diya(S,430,440,1.7);hill(S,0,960,540,80,'#b9d98a');S.g();for(let k=0;k<6;k++)dove(S,200+k*110,220+Math.sin(k)*40,.9,k%2?-1:1);
   sage(S,120,520,.6);sage(S,210,530,.5,'#f6d8a8');banyan(S,860,520,.45);flowers(S,560,940,535,6,9);lotus(S,330,535,.5);
   TXT(S,[['a blessing behind it, peace before it',28,{BLESSING:MSAF,PEACE:MBLU}]],30,18,400);TXT(S,[['“never a conquering race… and therefore we live.”',30,{LIVE:MRED}]],560,18,370);}),
];

MURAL.capitol=[
 pn(0,S=>{wash(S,640,250,280,'rgba(220,200,160,.9)',.3);skyset(S,6,{sx:900,sy:60,clouds:1,cx0:620,cx1:620,cy:70,birds:3,bx:760,by:110});temple(S,640,330,1.0,true);ground(S,470,'#d8cdb4',2);battlefield(S,40,560,530,7);eagleStandard(S,880,470,.45);
   TXT(S,[['the earth trembled at the Greek battalions',28],['gone, with not even a tale left behind',24,{GONE:MRED}]],30,18,420);}),
 pn(1,S=>{wash(S,300,250,240,'rgba(212,35,38,.9)',.25);eagleStandard(S,290,520,1.3);hill(S,440,960,520,200,'#d9cfb8');temple(S,720,380,.8,false);for(let k=0;k<4;k++)hoplite(S,520+k*110,540,.48);
   S.g();for(let k=0;k<5;k++)coin(S,60+k*40,500-k*10,13);crownX(S,120,420,.7);flag(S,470,330,.6,MRED);flag(S,940,330,.6,MRED);
   TXT(S,[['the Roman eagle',36,{EAGLE:MBRZ}],['over everything worth having in this world',24]],480,18,440);}),
 pn(2,S=>{wash(S,300,200,260,'rgba(180,180,200,.9)',.3);column(S,170,480,300,1.1,1);column(S,330,480,360,1.1,1);column(S,620,480,200,1,1);column(S,780,480,300,1,0);web(S,250,190,140);ground(S,480,'#d8d0c0',4);
   S.g();S.S(rect(450,440,120,34),{tone:[.95,.45],dir:1.4,col:'#ddd6c8'});S.S(ell(450,457,12,17,14),{tone:[.9,.5],col:'#ddd6c8'});helmetX(S,700,500,.6,.3);sword(S,560,515,80,.1,.7);
   S.g();for(let k=0;k<6;k++){const x=880+(k%2)*20,y=420+k*10;S.L([[x,y],[x+20,y-30],[x+40,y]],{lw:1.2,col:MGRN,any:1});}
   TXT(S,[['“the spider weaves its web where the Caesars ruled.”',28,{SPIDER:MRED,CAESARS:MPUR}]],420,18,480);S.g();for(let k=0;k<4;k++)S.L(ell(640,520,40+k*40,6+k*5,30),{closed:1,lw:1.4,col:MBLU,any:1});TXT(S,[['vanishing like ripples on the water',22]],400,240,200);}),
 pn(4,S=>{wash(S,300,300,240,'rgba(255,200,120,.9)',.3);seated(S,300,500,1.2,'#e8e2d6');S.g();S.S(tf(rect(-70,-130,140,46),300,500,1),{tone:[.98,.7],col:'#f6eccf'});S.T([['मनु',MINK]],300,402,44,{al:'center',font:DEVF});
   book(S,90,500,.7,MSAF);book(S,140,470,.5,MGRN);diya(S,480,520,.6);palmleaf(S,40,120,200,70);TXT(S,[['laws thought out through thousands of years',20]],40,200,200);
   TXT(S,[['if Manu came back today, he would not be in a foreign land',26,{MANU:MSAF}]],560,18,360);S.g();const hx=730,hy=370;S.S(bz([hx,hy+80],[hx-120,hy-10],[hx-50,hy-110],[hx,hy-40],14).concat(bz([hx,hy-40],[hx+50,hy-110],[hx+120,hy-10],[hx,hy+80],14)),{rad:1,tone:[.98,.45],col:MRED,lw:2.8});
   S.g();S.L([[600,300],[640,300],[652,270],[668,330],[684,300],[860,300]],{lw:2.4,any:1,col:MRED});TXT(S,[['the mainspring of the national life is here',22,{HERE:MRED}]],560,470,360);}),
];

MURAL.plough=[
 pn(0,S=>{TXT(S,[['other nations',30]],30,14,300);[['politics','#cfd8f0',()=>flag(S,300,140,.45,MBLU)],['society','#f0d8cf',()=>S.G(300,200,20,'rgba(255,120,160,.8)',{a:.6})],['wealth','#f0e6b8',()=>{coin(S,290,250,12);coin(S,312,246,12);}],['the senses','#e8d0f0',()=>rose(S,300,320,.4,MPNK)]].forEach(([s,col,ic],k)=>{S.g();S.S(rect(30,70+k*80,300,66),{tone:[.97,.6],dir:0,col});S.T([[s.toUpperCase(),MINK]],150,114+k*80,26,{al:'center'});ic();});
   S.g();S.S(rect(30,400,70,26),{tone:[.97,.7],col:'#fff'});S.T([['RELIGION',MINK]],65,419,12,{al:'center'});TXT(S,[['and a little bit of religion',20]],110,398,220);
   wash(S,690,280,230,'rgba(238,122,28,.9)',.35);TXT(S,[['India',34,{INDIA:MSAF}]],480,14,400);S.g();S.S(rect(470,70,440,370),{tone:[.95,.5],dir:.8,col:'#f4b06a'});S.T([['RELIGION',MINK]],690,200,64,{al:'center'});
   templeTown(S,500,880,420,7);diya(S,560,430,.4);diya(S,820,430,.4);TXT(S,[['the one and the only occupation of life',24]],470,460,440);}),
 pn(2,S=>{newspaper(S,40,80,380,290,'SINO-JAPANESE WAR',{a:-.05});cannon(S,240,330,.5);TXT(S,[['very few, if any, have heard of it',26]],60,400,340);newspaper(S,470,60,430,330,'PARLIAMENT OF RELIGIONS',{a:.04});S.A('sv1893_bust',600,130,.36,{mono:1});
   crowd(S,470,920,540,.42,13,{n:9,heads:['turban','turban','hair','veil'],arms:'up'});TXT(S,[['even the poorest labourer knows',28,{KNOWS:MRED}]],30,470,420);}),
 pn(3,S=>{wash(S,240,330,220,'rgba(120,140,200,.9)',.25);skyset(S,21,{sx:900,sy:60,clouds:2,cx0:420,cx1:760,cy:60,birds:3,bx:560,by:100});colonial(S,30,500,140,120,'#d8c8b8');person(S,240,500,1.4,{head:'hat',col:'#4a4a52',arms:'hold'});plough(S,280,500,1.2);church(S,850,500,.95);ground(S,500,'#c9b48a',3);
   S.g();S.S(rect(400,150,170,120),{tone:[.95,.55],dir:0,col:'#d8c8a8'});S.S(rect(450,140,70,14),{tone:[.4,.2]});S.T([['VOTE',MINK]],485,220,24,{al:'center'});newspaper(S,600,140,130,100,'POLITICS',{a:.06});
   S.g();S.S(ell(780,210,32,32,24),{rad:1,tone:[1,.55],col:'#d8d8de'});S.T([['$',MINK]],780,222,30,{al:'center'});
   TXT(S,[['radical or conservative? republican or democrat?',22],['the silver question',22],['religion: he goes to church, and that is all',22,{CHURCH:MBLU}]],390,300,330);}),
 pn(5,S=>{skyset(S,9,{sx:420,sy:90,sr:34,clouds:1,cx0:200,cx1:200,cy:60,birds:4,bx:280,by:110});mountains(S,300,960,270,80,9,'#b8d0c0');gopuram(S,540,270,.55);
   paddy(S,0,960,270,400,2);palm(S,40,320,.75,.15);palm(S,120,300,.6,-.1);palm(S,930,300,.7,-.2);hut(S,230,300,.6);hut(S,330,295,.45);well(S,860,330,.6);
   S.g();S.S([[0,400],[960,400],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col:'#c99a62',noline:1});for(let k=0;k<8;k++)S.L([[k*130,420],[k*130+180,560]],{lw:1.2,col:'#8a5a32',any:1});
   ox(S,90,500,.85);ox(S,250,500,.85);plough(S,380,500,1);person(S,470,510,1.1,{head:'turban',col:'#f4efe4',arms:'up',mark:1});
   person(S,620,500,.62,{head:'veil',col:MPNK,arms:'hold'});pot(S,620,404,.8);person(S,700,505,.55,{head:'veil',col:MPUR,arms:'down'});pot(S,740,500,.7,'#a85a2a');
   S.g();S.S([[600,30],[930,30],[930,190],[690,190],[640,240],[660,190],[600,190]],{tone:[1,.85],dir:1.5,col:'#fffbe8',lw:2.4});TXT(S,[['politics? what is that?',22],['“Look here, my friend, I have marked it on my forehead.”',22,{FOREHEAD:MRED}]],620,46,300);
   TXT(S,[["that is our nation's life",28,{LIFE:MRED}]],30,18,300);}),
];

MURAL.dynamo=[
 pn(0,S=>{wash(S,250,300,220,'rgba(238,122,28,.9)',.25);const r=rng(8);for(let k=0;k<6;k++){const x=50+k*72;person(S,x,510,.72,{col:[MBLU,MRED,MGRN,MPUR,MSAF,MPNK][k],head:['turban','hair','veil','hair','turban','veil'][k]});const a=-Math.PI/2+(r()-.5)*1.6;arrowL(S,[x,320],[x+Math.cos(a)*70,320+Math.sin(a)*70],{lift:6,lw:2.6,col:MSAF});}
   ground(S,510,'#c9b48a',8);TXT(S,[['each man a bent · each race a mission',26,{MISSION:MSAF}]],30,18,420);crownX(S,600,190,1.3);cannon(S,780,240,1.0);for(let k=0;k<3;k++)hoplite(S,880,540-k*0,.3+k*.0);flag(S,880,240,.6,MRED);strikeL(S,540,140,370);
   TXT(S,[['“Political greatness or military power is never the mission of our race”',24,{NEVER:MRED}]],500,300,420);}),
 pn(2,S=>{wash(S,330,300,300,'rgba(255,210,90,.95)',.5);rays(S,330,300,140,270,22,{lw:1.6,a0:-Math.PI*1.05,a1:Math.PI*.05});dynamo(S,380,470,1.6);rainbow(S,330,300,330,.2);
   S.g();for(let k=0;k<8;k++)star(S,100+k*60,90+(k%2)*30,9);for(let k=0;k<4;k++)diya(S,620+k*80,520,.4);sage(S,920,530,.4);
   TXT(S,[['conserve · preserve · accumulate',28,{ACCUMULATE:MSAF}],['into a dynamo, all the spiritual energy of the race',22],['then pour it forth in a deluge',26,{DELUGE:MBLU}]],600,30,330);}),
 pn(4,S=>{waves(S,0,960,430,8,6,'#6cbfe8');const o=globe(S,480,270,150);[[130,150,'PERSIAN'],[120,370,'GREEK'],[820,140,'ROMAN'],[840,370,'ARAB'],[480,50,'ENGLISH']].forEach(([x,y,n])=>{S.g();S.S([[x-50,y],[x+50,y],[x+36,y+20],[x-36,y+20]],{tone:[.8,.35],dir:1.5,col:MBROWN});S.S([[x,y-64],[x,y-4],[x+44,y-8]],{tone:[.99,.8],col:'#f4f0e6'});S.T([[n,MINK]],x,y+46,20,{al:'center'});arrowL(S,[x,y+10],[lerp(x,o[0],.62),lerp(y,o[1],.62)],{lift:20,lw:2.2,col:MBLU});});
   S.G(o[0],o[1],150,'rgba(255,210,90,.95)',{a:.8});canoe(S,300,450,.4);canoe(S,680,455,.4);TXT(S,[['“India’s gift to the world is the light spiritual.”',30,{LIGHT:MSAF,SPIRITUAL:MSAF}]],40,476,880);}),
];

MURAL.dew=[
 pn(0,S=>{wash(S,470,250,260,'rgba(150,210,120,.9)',.3);const pj=indiaMap(S,320,40,320,{hills:false});const o=pj(78,21);S.g();for(let k=0;k<14;k++){const a=-Math.PI*1.1+k/13*Math.PI*1.2;arrowL(S,[o[0]+Math.cos(a)*50,o[1]+Math.sin(a)*50],[o[0]+Math.cos(a)*230,o[1]+Math.sin(a)*170],{lift:10,lw:2.2,col:[MSAF,MBLU,MGRN,MPUR][k%4]});}
   steamship(S,830,520,.32);book(S,860,300,.5,MPUR);book(S,90,280,.5,MGRN);mosque(S,620,520,.3);church(S,720,520,.3);stupa(S,540,520,.3);
   TXT(S,[['when a conquering nation linked India to the world',24],['the world was flooded with Indian spiritual ideas',24,{SPIRITUAL:MSAF}]],30,330,280);}),
 pn(1,S=>{wash(S,180,330,200,'rgba(120,120,140,.9)',.25);colonial(S,30,540,300,200,'#e8dcc8');person(S,180,520,1.7,{head:'hair',col:'#3a3a40',arms:'hold'});S.g();S.S(rect(160,330,60,40),{tone:[.99,.7],col:'#f6eccf'});S.T([['SCHOPENHAUER',MINK]],180,300,22,{al:'center'});
   [['उपनिषद्','SANSKRIT',DEVF],['سرّ اکبر','PERSIAN','Amiri,serif'],['OUPNEK’HAT','LATIN',LETF]].forEach(([t,l,f],k)=>{const x=370+k*185;S.g();S.S(rect(x,40,160,110),{tone:[.98,.7],dir:1.5,col:'#f6eccf'});S.T([[t,MINK]],x+80,104,k===2?22:32,{al:'center',font:f});S.T([[l,MINK]],x+80,176,16,{al:'center'});if(k)arrowL(S,[x-30,95],[x-6,95],{lift:4,lw:2.4});});
   book(S,400,520,.6,MRED);book(S,470,500,.5,MBLU);diya(S,880,520,.5);
   TXT(S,[['“In the whole world there is no study so beneficial and so elevating as that of the Upanishads.”',24,{UPANISHADS:MSAF}],['the solace of my life · the solace of my death',20]],370,210,540);}),
 pn(3,S=>{sword(S,90,280,300,-.5,1.8);fire(S,330,300,.7);S.g();S.L(ell(240,200,170,170,40),{closed:1,lw:5,col:MRED,any:1});S.L([[120,320],[360,80]],{lw:5,col:MRED,any:1});TXT(S,[['“We never preached our thoughts with fire and sword.”',26,{FIRE:MRED,SWORD:MRED}]],30,400,420);
   wash(S,700,230,240,'rgba(139,79,224,.9)',.3);rainbow(S,700,220,220,.22);S.g();S.T([['FASCINATION',MPUR]],700,240,64,{al:'center',rot:-.04});flowerOfLife(S,700,110,24);for(let k=0;k<6;k++)star(S,560+k*56,300+(k%2)*24,8,MPNK);
   TXT(S,[['a charm that comes imperceptibly, to those who persevere',22]],540,350,360);}),
 pn(5,S=>{wash(S,480,300,500,'rgba(255,200,140,.9)',.35,1.8);sun(S,830,330,56);mountains(S,0,960,400,80,15,'#d8c8b8');ground(S,450,'#9fcf6a',6);for(let k=0;k<7;k++)rose(S,90+k*125,410,1.2,[MRED,MPNK,MRED,MSAF,MPNK,MRED,MPNK][k]);flowers(S,40,920,540,9,17);
   S.g();for(let k=0;k<22;k++){const x=40+k*42,y=170+((k*37)%160);S.S(tf([[0,-12],[8,4],[0,12],[-8,4]],x,y,1),{tone:[.98,.6],col:MCYN,lw:1.2});}for(let k=0;k<3;k++)dove(S,600+k*80,120+k*14,.6);
   TXT(S,[['“Slow and silent, as the gentle dew that falls in the morning…”',26,{DEW:MCYN}],['upon the world of thought',22]],30,18,540);}),
];

MURAL.porcelain=[
 pn(0,S=>{wash(S,240,290,220,'rgba(230,190,120,.9)',.3);wheel(S,240,290,170);TXT(S,[['once more, history is going to repeat itself',22]],40,476,360);
   wash(S,700,200,260,'rgba(150,200,255,.95)',.5);rays(S,700,40,20,520,16,{a0:Math.PI*.28,a1:Math.PI*.72,lw:2.2});S.g();for(let k=0;k<4;k++)book(S,560+k*90,500,.45,[MBLU,MPUR,MRED,MGRN][k]);clock(S,880,90,40);TXT(S,[['under the blasting light of modern science',26,{SCIENCE:MBLU}]],520,380,400);}),
 pn(2,S=>{wash(S,330,300,240,'rgba(120,170,230,.9)',.3);vase(S,320,490,2,true);hammer(S,620,140,1.25,-.9);S.g();for(let k=0;k<9;k++){const x=200+k*40,y=500+(k%2)*12;S.S(tf([[-16,0],[0,-18],[18,-4],[6,12]],x,y,1),{tone:[.98,.6],col:'#e8f0fb',lw:1.6});}vase(S,90,500,.7,false);vase(S,170,500,.5,true);
   TXT(S,[['old orthodoxies, pulverised like masses of porcelain',26,{PORCELAIN:MBLU}]],560,330,360);}),
 pn(3,S=>{S.g();S.S(ell(210,440,180,46,30),{tone:[.6,.3],col:'#8a7a5a'});S.S(ell(210,430,36,16,14),{rad:1,tone:[.9,.4],col:'#7cc4ee'});TXT(S,[['the world: a little mud-puddle',24]],40,260,340);clock(S,210,120,80);TXT(S,[['time began but the other day',20]],40,214,340);
   S.g();[[500,1],[590,1.2],[690,1.35],[800,1.55]].forEach(([x,s],k)=>person(S,x,500,.6*s,{head:'hair',col:['#8a5a32','#9a6a3a','#5a6a8a',MBLU][k],arms:'down'}));arrowL(S,[480,380],[860,300],{lift:30,lw:2.4,col:MGRN});
   dynamo(S,700,200,.35);TXT(S,[['evolution · conservation of energy',28,{EVOLUTION:MGRN}],['death blows to crude theologies',22]],470,18,440);}),
 pn(5,S=>{S.g();for(let k=0;k<7;k++)S.L(ell(480,290,60+k*58,40+k*34,48),{closed:1,lw:1.8,col:[MPUR,MBLU,MCYN,MGRN,MYEL,MSAF,MRED][k],any:1});rainbow(S,480,290,340,.22);S.g();S.S(ell(480,290,46,46,24),{rad:1,tone:[1,.8],col:MYEL});
   S.g();for(let k=0;k<12;k++){const a=k/12*Math.PI*2;star(S,480+Math.cos(a)*300,290+Math.sin(a)*170,8,[MCYN,MPNK,MYEL][k%3]);}seated(S,480,320,.3,MSAF);
   S.T([['VEDANTA',MINK]],480,90,60,{al:'center'});TXT(S,[['the oneness of all · the eternal soul of man · infinite time, space, causation',24,{ONENESS:MSAF,SOUL:MSAF}]],90,470,780);}),
];

MURAL.yugas=[
 pn(0,S=>{palmleaf(S,30,90,420,240);S.T([['श्रुति',MINK]],240,190,64,{al:'center',font:DEVF});TXT(S,[['the soul · God · perfection · projection · cycles',20]],70,236,340);TXT(S,[['abides for ever',32,{EVER:MGRN}]],90,350,320);
   palmleaf(S,500,90,420,240);S.T([['स्मृति · पुराण',MINK]],710,190,50,{al:'center',font:DEVF});TXT(S,[['the minor laws of everyday life',22]],540,236,340);TXT(S,[['changes with the age',32,{CHANGES:MRED}]],560,350,320);
   S.g();star(S,80,60,14);sun(S,180,60,20);clock(S,800,60,26);templeTown(S,40,420,540,4);village(S,520,920,540,6);TXT(S,[['two sets of truths',30]],330,20,300);}),
 pn(4,S=>{wash(S,300,290,240,'rgba(230,190,120,.9)',.35);wheel(S,300,290,170,['सत्य','त्रेता','द्वापर','कलि']);for(let k=0;k<3;k++)sage(S,610+k*110,510,.85,['#f2ead8','#f6d8a8','#e8e2d6'][k]);
   flowers(S,560,940,535,6,21);for(let k=0;k<4;k++)star(S,120+k*60,500,8);TXT(S,[['customs of one Yuga are not the customs of another',24,{YUGA:MSAF}],['great Rishis will appear',28,{RISHIS:MSAF}]],560,18,370);}),
];

MURAL.tribes=[
 pn(0,S=>{skyset(S,30,{sx:880,sy:60,clouds:2,cx0:520,cx1:720,cy:70,birds:4,bx:600,by:120});hill(S,0,340,500,140,'#d9c08a');hill(S,300,660,500,180,'#d9c08a');hill(S,620,960,500,140,'#d9c08a');
   [[170,360,'BAAL'],[480,320,'BAAL'],[790,360,'MOLOCH']].forEach(([x,y,n])=>{S.g();S.S(tf([[-22,0],[-22,-80],[0,-104],[22,-80],[22,0]],x,y,1),{tone:[.9,.4],dir:0,col:MBRZ});S.T([[n,MINK]],x,y-120,22,{al:'center'});flag(S,x+50,y,.5,[MRED,MBLU,MGRN][x%3]);crowd(S,x-110,x+110,y+150,.5,x|0,{n:5});fire(S,x-50,y+10,.35);});
   TXT(S,[['each tribe, a god of its own',32]],30,18,460);}),
 pn(2,S=>{wash(S,300,250,200,'rgba(211,162,74,.9)',.3);crownX(S,280,130,1.3);S.g();S.S(tf([[-36,0],[-36,-140],[0,-190],[36,-140],[36,0]],280,400,1),{tone:[.9,.35],dir:0,col:MBRZ});S.T([['BAAL-MERODACH',MINK]],280,434,24,{al:'center'});
   S.g();S.S(tf([[-36,0],[-36,-140],[0,-190],[36,-140],[36,0]],680,400,1),{tone:[.9,.35],dir:0,col:'#9a9aa2'});S.T([['MOLOCH-YAHVEH',MINK]],680,434,24,{al:'center'});sword(S,410,300,130,-.6,1.3);sword(S,550,300,130,Math.PI+.6,1.3);
   battlefield(S,20,170,545,11);battlefield(S,790,950,545,13);fire(S,480,420,.6);TXT(S,[['decided by the fortunes of battle',30,{BATTLE:MRED}]],420,40,500);}),
 pn(5,S=>{wash(S,480,270,280,'rgba(150,210,120,.9)',.3);indiaMap(S,300,30,360,{hills:false});trident(S,170,500,1.5);conch(S,780,300,1.5);S.T([['SHIVA',MINK]],170,535,26,{al:'center'});S.T([['VISHNU',MINK]],790,410,26,{al:'center'});
   lingam(S,280,520,.35);lotus(S,690,530,.5);diya(S,880,520,.5);crowd(S,360,640,540,.36,17,{n:6});TXT(S,[['in India too, competing gods',28]],30,30,250);}),
];

MURAL.ekam=[
 pn(0,S=>{wash(S,480,270,380,'rgba(255,210,100,.95)',.4,1.6);rays(S,480,270,240,460,26,{a0:-Math.PI*.98,a1:-Math.PI*.02,lw:1.6});palmleaf(S,60,170,840,200);S.T([['एकं सद्विप्रा बहुधा वदन्ति',MINK]],480,288,58,{al:'center',font:DEVF});
   sage(S,90,540,.5);sage(S,870,540,.5,'#f6d8a8');for(let k=0;k<6;k++)diya(S,200+k*110,530,.35);
   TXT(S,[['out of the din and confusion, a voice',26]],30,18,460);TXT(S,[['“That which exists is One; sages call It by various names.”',30,{ONE:MSAF}]],160,390,640);}),
 pn(2,S=>{wash(S,480,300,320,'rgba(238,122,28,.9)',.25);trident(S,230,440,1.2);conch(S,700,290,1.3);S.g();S.L(ell(470,290,330,150,40),{closed:1,lw:3.4,col:MSAF,any:1});S.T([['=',MINK]],470,320,90,{al:'center'});
   S.g();for(let k=0;k<10;k++){const a=k/10*Math.PI*2;star(S,470+Math.cos(a)*380,290+Math.sin(a)*190,8,[MSAF,MBLU][k%2]);}
   TXT(S,[['the same One, called by a hundred names',28,{ONE:MSAF}]],240,18,480);TXT(S,[['“The whole history of India you may read in these few words.”',26,{HISTORY:MRED}]],100,462,760);}),
 pn(4,S=>{wash(S,470,300,300,'rgba(255,210,100,.9)',.4);seated(S,270,510,1.05,MSAF);seated(S,680,510,1.05,'#e8e2d6');S.g();for(let k=0;k<3;k++)S.L(ell(475,240,40+k*20,40+k*20,30,Math.PI*1.1,Math.PI*1.9),{lw:2,col:MSAF,any:1});
   banyan(S,475,540,.5);diya(S,120,530,.4);diya(S,830,530,.4);lotus(S,475,540,.45);
   TXT(S,[['the eternal servant of God',24]],40,18,300);TXT(S,[['one with God Himself',24]],620,18,300);TXT(S,[['both good Hindus',32,{GOOD:MGRN}]],340,110,300);}),
];

MURAL.rivers=[
 pn(0,S=>{wash(S,480,300,360,'rgba(120,200,160,.9)',.25);skyset(S,40,{sx:900,sy:70,clouds:2,cx0:420,cx1:600,cy:110,birds:4,bx:380,by:150});mosque(S,230,480,1.5);church(S,720,480,1.35);crowd(S,370,600,490,.72,9,{n:4,heads:['turban','turban','hair','turban'],arms:'hold'});ground(S,480,'#d9c9a3',9);
   S.g();for(let k=0;k<4;k++){S.S(rect(420+k*40,420-k*8,36,22),{tone:[.95,.5],col:'#d8b88a',lw:1.4});}crowd(S,30,930,548,.42,23,{n:14,arms:'up'});
   TXT(S,[['“It is here that Indians build temples for Mohammedans and Christians; nowhere else.”',26,{TEMPLES:MSAF}]],30,18,880);}),
 pn(2,S=>{[90,290,490,690,870].forEach((x,k)=>{S.g();S.S([[x-120,240],[x,80+(k%2)*30],[x+120,240]],{tone:[.97,.45],dir:.4,col:'#a8b8c8'});S.S([[x-28,100+(k%2)*30+20],[x,80+(k%2)*30],[x+28,100+(k%2)*30+20]],{tone:[1,.9],col:'#ffffff'});});
   S.g();[[90,3,60],[290,1,10],[490,4,70],[690,1.2,20],[870,2.5,50]].forEach(([x0,f,amp])=>{const p=[];for(let k=0;k<=30;k++){const u=k/30;p.push([lerp(x0,480,u)+Math.sin(u*Math.PI*f)*amp*(1-u),lerp(240,450,u)]);}S.L(p,{lw:7,col:'#5fb4e8',any:1});});waves(S,180,780,450,6,3);
   canoe(S,360,470,.4);canoe(S,600,476,.35);palm(S,140,450,.5,.1);palm(S,830,450,.5,-.1);for(let k=0;k<5;k++)bird(S,300+k*70,40+(k%2)*16,1);
   TXT(S,[['different rivers, crooked or straight',24]],30,476,400);TXT(S,[['all come unto the ocean',26,{OCEAN:MBLU}]],560,476,370);}),
 pn(4,S=>{wash(S,480,270,260,'rgba(255,210,100,.95)',.55);lingam(S,480,340,1.6);caaba(S,140,520,1.0);church(S,820,520,.8);stupa(S,480,535,.9);[[180,420],[790,420]].forEach(([x,y])=>arrowL(S,[x,y],[lerp(x,480,.55),lerp(y,260,.55)],{lift:30,lw:2.4,col:MSAF}));
   crowd(S,230,400,540,.36,31,{n:4,arms:'up'});crowd(S,560,740,540,.36,33,{n:4,arms:'up'});flowers(S,30,940,540,4,25);
   TXT(S,[['the Caaba, the church, the Buddhist temple: kneeling to Him, whether they know it or not',24,{HIM:MSAF}]],30,18,880);}),
];

MURAL.mission=[
 pn(0,S=>{wash(S,480,350,400,'rgba(150,200,255,.9)',.25,1.8);skyset(S,50,{sx:880,sy:70,clouds:2,cx0:640,cx1:760,cy:150,birds:5,bx:600,by:200});crowdRows(S,10,950,530,1.05,12);
   TXT(S,[['without variation life must cease',30],['but we need not hate each other',30,{HATE:MRED}]],30,18,600);}),
 pn(1,S=>{wash(S,480,280,380,'rgba(255,200,120,.9)',.4,1.6);S.g();for(let k=0;k<8;k++)dove(S,90+k*110,470+(k%2)*24,.7,k%2?-1:1);flowers(S,30,930,540,10,41);
   TXT(S,[['“The one great lesson that the world wants most…',30],['not only toleration,',52],['but sympathy.”',68,{SYMPATHY:MRED}]],90,60,780);}),
 pn(2,S=>{wash(S,470,360,300,'rgba(255,200,120,.9)',.3);person(S,300,510,1.4,{head:'turban',col:MBLU});person(S,470,510,1.35,{head:'veil',col:MPNK,tcol:MPNK});person(S,620,510,.9,{head:'hair',col:MSAF});ground(S,510,'#b9d98a',7);
   village(S,700,940,500,51);palm(S,90,500,.6,.1);flowers(S,30,260,540,4,43);
   ['mildness','gentleness','forbearance','toleration','sympathy','brotherhood'].forEach((w,k)=>TXT(S,[[w,28,{SYMPATHY:MRED}]],40+(k%3)*300,16+Math.floor(k/3)*46,280));TXT(S,[['man · woman · child, without respect of race, caste, or creed',20]],680,200,250);}),
 pn(3,S=>{S.g();S.S(rect(20,20,900,500),{tone:[1,1],noline:1,col:'#cfe6f8',cA:.6});S.G(260,110,170,'rgba(255,255,255,1)',{a:.85,sx:1.7});S.G(780,80,150,'rgba(255,255,255,1)',{a:.85,sx:1.7});S.A('sv1893_chicago',520,30,.68);
   S.g();[['“They call Thee',200],['by various names;',256],['Thou art One.”',312]].forEach(([t,y])=>S.T([[t,MINK]],60,y,40,{font:QF,style:'italic',rot:0}));S.T([['— Swami Vivekananda, Colombo, 1897',MINK]],62,380,16,{font:QF,rot:0});}),
 pn(4,S=>{wash(S,480,250,260,'rgba(150,210,120,.9)',.3);waves(S,0,960,470,8,7,'#6cbfe8');const pj=indiaMap(S,320,30,320,{hills:false});const a=pj(79.86,6.93),b=pj(80.01,9.66);S.g();S.L([a,[a[0]+30,(a[1]+b[1])/2],b],{lw:3.4,col:MRED,any:1});S.S(ell(a[0],a[1],7,7,10),{tone:[.4,.3],col:MRED});S.S(ell(b[0],b[1],9,9,10),{tone:[.4,.3],col:MRED});
   S.T([['COLOMBO',MINK]],a[0]+14,a[1]+6,18).T([['JAFFNA',MINK]],b[0]+14,b[1]+4,18);steamship(S,180,500,.4);canoe(S,760,500,.4);gopuram(S,820,330,.3);palm(S,880,330,.4,.1);
   TXT(S,[['next: Jaffna',36,{JAFFNA:MRED}],['Vaidika: the common ground',26]]);}),
];

Object.keys(MURAL).forEach(id=>{SC[id]=muralScene(id);});
