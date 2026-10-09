const SC={};
/* Letter to Manmatha Nath Bhattacharya, 5 Sept 1894. Watercolour mural; America scenes plain, India scenes with the temple band (IN). */
const pn=(at,draw)=>({at,draw});
const TXT=(S,items,x=30,y=30,w=430)=>stack(S,x,y,w,items);
const IN=S=>kumbamBand(S,0,960,0);
const DV=(S,t,x,y,size,col=MINK)=>S.T([[t,col]],x,y,size,{al:'center',font:DEVF,rot:0});
const LBL=(S,t,x,y,size=18,col=MINK)=>S.T([[t,col]],x,y,size,{al:'center',rot:0});
const sea=(S,y=330,seed=1)=>{S.g();S.S([[0,y],[960,y],[960,560],[0,560]],{tone:[1,.7],col:'#9cd2ee',noline:1,cA:.5});waves(S,0,960,y,8,seed,'#6cbfe8');};
const sand=(S,y=430)=>{S.g();S.S([[0,y],[960,y-10],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col:'#ead7a6',noline:1});};
const lawn=(S,y=470,col='#b9d98a')=>{S.g();S.S([[0,y],[960,y],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col,noline:1});};
const LADY=[MPUR,MBLU,MPNK,'#3aa6a0',MSAF,'#c8504a',MGRN];

MURAL.annisquam=[
 pn(0,S=>{wash(S,300,260,300,'rgba(150,200,255,.9)',.3);envelope(S,250,310,1.2);S.T([['5 SEPTEMBER 1894',MRED]],250,212,22,{al:'center',rot:-.04});S.T([['U.S.A.',MINK]],250,238,18,{al:'center',rot:-.04});
   steamship(S,700,330,.7);sea(S,350,3);globe(S,820,150,60);S.g();S.L(bz([560,150],[620,60],[720,60],[780,120],16),{lw:2.2,col:MRED,any:1});star(S,880,90,10);
   TXT(S,[['A letter from America',36,{AMERICA:MBLU}],['a year after Chicago',24]]);}),
 pn(1,S=>{IN(S);wash(S,480,300,320,'rgba(255,214,120,.9)',.3);S.A('sv1893_bust',20,40,.62,{mono:1});S.g();S.L(bz([360,300],[480,240],[560,240],[640,300],16),{lw:2.4,col:MSAF,any:1});arrowL(S,[600,290],[650,310],{lift:2,lw:2.4,col:MSAF});
   envelope(S,760,380,.9,'MADRAS');gopuram(S,880,520,.4);palm(S,640,520,.6,.1);DV(S,'বাংলা',480,220,40,MSAF);LBL(S,'IN BENGALI',480,260,18);
   TXT(S,[['to Manmatha Nath Bhattacharya',28,{BHATTACHARYA:MSAF}],['a friend in Madras',22]],540,40,400);}),
 pn(2,S=>{wash(S,480,300,320,'rgba(220,200,160,.9)',.3);loom(S,320,500,1.4);S.g();for(let k=0;k<4;k++)S.L([[480+k*20,300],[520+k*20,300]],{lw:1,col:MINK,any:1});thought(S,700,200,240,140);S.T([['?',MRED]],700,224,70,{al:'center'});
   gent(S,640,520,1.1,'#3a3a46',{arms:'out'});book(S,840,500,.6,MBLU);TXT(S,[['a weaving machine',32,{WEAVING:MSAF}],['he will make inquiries',22]]);}),
 pn(3,S=>{skyset(S,5,{sx:820,sy:80,clouds:2,cx0:460,cx1:640,cy:80,birds:6,bx:420,by:140});sea(S,300,4);sand(S,420);
   for(let k=0;k<3;k++)sailboat(S,280+k*200,300+(k%2)*14,.6+.1*k);lighthouse(S,920,330,.5);cottage(S,90,430,.7);cottage(S,230,425,.55,'#f0e2c8','#8a5a4a');pine(S,330,430,.6);pine(S,370,425,.5);
   beachUmbrella(S,520,520,.9,MRED);beachUmbrella(S,760,520,.9,MBLU);lady(S,600,540,.6,MPNK,{parasol:MPNK,hat:MSAF});gent(S,840,540,.6,'#f4f0e6');
   TXT(S,[['Annisquam',40,{ANNISQUAM:MBLU}],['a village on the seacoast',22]]);}),
 pn(4,S=>{wash(S,480,300,360,'rgba(150,200,255,.9)',.25);sea(S,330,6);sand(S,430);person(S,160,420,.6,{head:'hair',col:MBLU,arms:'up'});person(S,220,420,.5,{head:'hair',col:MRED,arms:'up'});LBL(S,'TO BATHE',190,470,20);
   beachUmbrella(S,450,520,1,'#f2b51c');gent(S,430,530,.7,'#f4f0e6',{hat:false});LBL(S,'TO REST',520,500,20);
   lady(S,700,530,.75,MPNK,{lowcut:1,hat:MSAF});lady(S,770,530,.7,MPUR,{parasol:MPNK});gent(S,880,530,.75,'#3a3a46');S.g();heartGlow(S,790,250,.25,MPNK);LBL(S,'TO CATCH HUSBANDS',790,320,20,MRED);
   TXT(S,[['“some to catch husbands”',30,{HUSBANDS:MRED}]],30,30,600);}),
 pn(5,S=>{wash(S,480,280,380,'rgba(255,214,120,.9)',.3);S.g();S.S(rect(80,120,340,300),{tone:[1,.8],col:'#e8f0fb',lw:2});LBL(S,'AMERICA',250,160,30,MBLU);colonial(S,120,380,120,140);gent(S,300,400,.6);lady(S,360,400,.6,MPUR);
   S.S(rect(540,120,340,300),{tone:[1,.8],col:'#fbe8c8',lw:2});LBL(S,'INDIA',710,160,30,MSAF);gopuram(S,640,390,.5);hut(S,780,390,.5);person(S,840,400,.5,{head:'turban',col:MSAF});
   S.g();S.L([[480,140],[480,420]],{lw:2,col:MINK,any:1});TXT(S,[['side by side',30],['one of his most candid letters',22]],300,440,400);}),
];

MURAL.decorum=[
 pn(0,S=>{wash(S,480,300,380,'rgba(220,200,230,.9)',.3);building(S,140,470,680,300);S.g();for(let k=0;k<5;k++)S.G(220+k*130,330,30,'rgba(255,220,120,.9)',{a:.6});
   for(let k=0;k<6;k++)(k%2?gent:lady)(S,180+k*110,530,.6,k%2?'#3a3a46':LADY[k],{});TXT(S,[['a strong sense of decorum',34,{DECORUM:MPUR}]]);}),
 pn(1,S=>{wash(S,300,300,280,'rgba(220,200,230,.9)',.3);gent(S,250,520,1.4);S.g();S.L([[180,110],[180,520]],{lw:1.4,col:MRED,any:1});S.L([[170,110],[190,110]],{lw:1.4,col:MRED,any:1});S.L([[170,520],[190,520]],{lw:1.4,col:MRED,any:1});LBL(S,'NECK TO FOOT',130,320,16,MRED);
   S.g();S.S(rect(560,200,300,180),{tone:[1,.9],col:'#fbfaf4',lw:2});S.T([['NEVER',MRED]],710,270,40,{al:'center'});S.T([['MENTIONED',MINK]],710,320,28,{al:'center'});lady(S,500,520,.8,MPUR);
   TXT(S,[['covered from neck to foot',28],['the body is never mentioned',22]],520,30,400);}),
 pn(2,S=>{wash(S,480,300,360,'rgba(255,214,120,.9)',.3);gent(S,240,520,1.3);S.g();S.S(rect(270,280,40,30),{tone:[1,.9],col:'#ffffff',lw:1.4});for(let k=0;k<3;k++)S.L([[330+k*16,270-k*6],[350+k*16,262-k*6]],{lw:1.4,col:MBLU,any:1});
   S.g();S.L([[150,140],[180,170],[230,110]],{lw:6,col:MGRN,any:1});LBL(S,'× 1000: FINE',240,90,22,MGRN);
   gent(S,700,520,1.3,'#4a3a2a');S.g();S.L(ell(760,290,30,22,16),{closed:1,lw:2,col:MINK,any:1});S.L(ell(760,290,170,170,40),{closed:1,lw:5,col:MRED,any:1});S.L([[640,410],[880,170]],{lw:5,col:MRED,any:1});LBL(S,'A BELCH: UNCIVILISED',700,90,22,MRED);
   TXT(S,[['the handkerchief and the belch',28]],30,470,600);}),
 pn(3,S=>{wash(S,300,320,260,'rgba(220,200,230,.9)',.3);lady(S,280,520,1.6,MPUR,{lowcut:1,hair:'#c8a050'});S.g();S.L([[150,190],[180,220],[230,150]],{lw:6,col:MGRN,any:1});LBL(S,'LOW-CUT GOWN: FINE',250,120,22,MGRN);
   S.g();S.S(ell(700,500,70,14,16),{tone:[1,.6],col:MSKIN,lw:1.6});[[650,488],[750,488]].forEach(([fx,fy])=>{for(let k=0;k<5;k++)S.S(ell(fx-12+k*7,fy,3,4,6),{tone:[1,.7],col:MSKIN,lw:.8});});shoes(S,820,520,1.2);
   S.L(ell(700,470,150,110,40),{closed:1,lw:5,col:MRED,any:1});S.L([[600,550],[800,390]],{lw:5,col:MRED,any:1});LBL(S,'BAREFOOT: AS BAD AS NAKED',700,330,22,MRED);TXT(S,[['and yet',28]],520,30,300);}),
 pn(4,S=>{wash(S,250,300,260,'rgba(255,214,120,.95)',.45);innerLamp(S,250,520,1.3,MSAF);LBL(S,'WE: THE SOUL',250,150,28,MSAF);IN(S);
   S.g();S.L([[480,120],[480,520]],{lw:2,col:MINK,any:1});lady(S,700,520,1.1,MPNK,{hat:MPUR});S.g();for(let k=0;k<6;k++)star(S,600+k*40,240+(k%2)*30,8,MCYN);vase(S,860,520,.6,false);rose(S,880,420,.5,MPNK);LBL(S,'THEY: THE BODY',700,150,28,MBLU);
   TXT(S,[['“Just as we always dwell on the soul, so they take care of the body.”',24,{SOUL:MSAF,BODY:MBLU}]],60,30,840);}),
 pn(5,S=>{wash(S,480,300,380,'rgba(220,240,255,.9)',.3);S.g();S.S(rect(200,180,140,200),{tone:[1,.8],col:'#e8f0fb',lw:2});S.S(ell(270,280,50,60,20),{rad:1,tone:[1,.9],col:'#dfeaf6',lw:1.6});LBL(S,'MIRROR',270,410,18);
   lady(S,420,520,1,MBLU,{hair:'#3a2a1a'});for(let k=0;k<4;k++){S.g();S.S(rect(560+k*70,380-k*14,40,60),{tone:[1,.6],col:[MPNK,MCYN,MYEL,MPUR][k],lw:1.2});}bubbles(S,560,320,300,4);
   TXT(S,[['no end to cleaning and embellishing',26],['whoever fails has no place in society',22]],520,30,410);}),
];

MURAL.plates=[
 pn(0,S=>{IN(S);wash(S,250,320,260,'rgba(220,180,120,.9)',.3);dungCakes(S,240,470,1.2);hut(S,80,470,.6);leafMeal(S,480,500,1);person(S,560,520,.7,{head:'turban',col:'#f4efe4',arms:'hold'});
   S.g();thought(S,780,200,260,150);S.T([['“LIKE PIGS”',MRED]],780,214,30,{al:'center'});lady(S,800,520,.9,MBLU);gent(S,880,520,.9);
   TXT(S,[['cow-dung fuel, eating on the floor',26]],30,30,420);LBL(S,'THE WORD IS TABOO IN ENGLISH',700,330,18,MRED);}),
 pn(1,S=>{wash(S,480,300,360,'rgba(220,240,255,.9)',.3);diningTable(S,480,470,1.6);S.g();S.S([[420,200],[460,200],[456,250],[424,250]],{tone:[1,.9],col:'#dff0fb',lw:1.6});
   for(let k=0;k<4;k++){gent(S,200+k*190,540,.55,'#3a3a46',{hat:false});}S.g();arrowL(S,[300,330],[420,230],{lift:20,lw:2.4,col:MBLU});arrowL(S,[660,330],[460,230],{lift:20,lw:2.4,col:MBLU});
   LBL(S,'ONE GLASS, NEVER WASHED',440,170,22,MBLU);TXT(S,[['yet many drink from the same glass',26]],30,30,420);}),
 pn(2,S=>{wash(S,480,320,320,'rgba(255,200,160,.9)',.3);S.g();S.S(rect(140,250,240,200),{tone:[1,.6],col:'#e8dccb',lw:1.8});S.S(rect(200,320,120,10),{tone:[1,.4],col:'#2a2a2a',lw:1});fire(S,260,320,.5);LBL(S,'KITCHEN',260,240,18);
   lady(S,440,520,1,'#7a7a82',{hair:'#3a2a1a'});S.g();for(let k=0;k<5;k++)S.S(ell(420+k*10,430+(k%2)*8,4,4,6),{tone:[.6,.3],col:'#6a5a4a',lw:.6});arrowL(S,[500,420],[700,440],{lift:10,lw:4,col:MRED});
   S.g();S.S(rect(720,300,140,220),{tone:[1,.5],col:'#8a5a3a',lw:2});LBL(S,'OUT!',790,280,32,MRED);TXT(S,[['a little soil on the cook’s clothes: thrown out',24,{OUT:MRED}]],30,30,600);}),
 pn(3,S=>{wash(S,480,320,380,'rgba(255,240,200,.9)',.4);diningTable(S,480,440,2);S.g();for(let k=0;k<12;k++)star(S,140+k*62,170+(k%3)*16,7,MYEL);LBL(S,'SPICK AND SPAN',480,260,34,MBLU);
   TXT(S,[['the table-ware',30]],30,30,420);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(255,214,120,.95)',.45);colonial(S,60,470,220,260,'#f4e8d0');colonial(S,700,470,220,300,'#f0d0b0');moneybag(S,420,440,1);for(let k=0;k<8;k++)coin(S,360+k*36,500-(k%3)*14,16);
   crownX(S,540,330,.8);S.g();for(let k=0;k<3;k++)S.S(rect(320+k*30,380-k*6,26,40),{tone:[1,.5],col:[MYEL,MPNK,MCYN][k],lw:1});diningTable(S,620,540,.6);
   TXT(S,[['“They are the richest people on earth; their enjoyments and luxuries beggar description.”',26,{RICHEST:MSAF}]],60,30,840);}),
];

MURAL.village=[
 pn(0,S=>{IN(S);wash(S,480,320,380,'rgba(240,200,140,.9)',.35);mountains(S,0,960,300,90,6,'#d8b890');S.g();S.S(rect(80,300,380,190),{tone:[1,.6],col:'#f0d8b0',lw:2});LBL(S,'RAJPUTANA',270,330,24,MSAF);chowki(S,300,470,1.6);person(S,160,480,.8,{head:'turban',col:MRED,arms:'hold'});
   S.S(rect(520,300,380,190),{tone:[1,.6],col:'#e8e0c8',lw:2});LBL(S,'A BANANA LEAF ON THE FLOOR',710,330,20);leafMeal(S,700,470,1.3);S.g();S.L([[700,440],[730,470],[700,500]],{lw:2,col:MRED,any:1});LBL(S,'AND IF IT TEARS!',760,520,18,MRED);
   TXT(S,[['dine on a low seat, at a low table',28]],30,30,420);}),
 pn(1,S=>{IN(S);wash(S,480,300,380,'rgba(240,200,140,.9)',.3);lady(S,200,520,1.1,MPNK,{hair:'#2a1a12'});shoes(S,320,520,1);S.g();S.L(ell(320,505,60,40,24),{closed:1,lw:4,col:MRED,any:1});LBL(S,'BENGAL: SHOES = LOSE CASTE',230,150,20,MRED);
   lady(S,600,520,1.1,MRED,{hair:'#2a1a12'});shoes(S,700,520,1);S.g();S.L([[740,470],[760,490],[800,440]],{lw:5,col:MGRN,any:1});LBL(S,'RAJPUT: NO SHOES = LOSE CASTE',640,150,20,MGRN);
   palmleaf(S,700,200,220,70);DV(S,'मनु',810,248,34);LBL(S,'“ONE SHALL ALWAYS WEAR SHOES”',810,300,16);TXT(S,[['the same custom, upside down',26]],30,30,420);}),
 pn(2,S=>{IN(S);wash(S,480,300,360,'rgba(150,210,120,.9)',.3);hut(S,240,470,1.2);tulsi(S,420,470,.6);well(S,560,470,.8);S.g();for(let k=0;k<6;k++)S.L([[120+k*20,480],[110+k*20,520]],{lw:1.4,col:'#a8743a',any:1});LBL(S,'SWEPT',150,540,16);
   lady(S,700,520,.9,'#f4efe4',{hair:'#2a1a12'});pot(S,760,500,.8);flowers(S,780,940,540,3,7);TXT(S,[['neat and clean, even if not luxurious',28,{CLEAN:MGRN}]]);}),
 pn(3,S=>{wash(S,300,320,260,'rgba(200,200,220,.9)',.3);gent(S,240,520,1.3);tophat(S,240,240,.5);S.g();S.L(ell(240,330,150,200,30),{closed:1,lw:5,col:MRED,any:1});S.L([[130,480],[350,180]],{lw:5,col:MRED,any:1});
   IN(S);person(S,620,520,1,{head:'turban',col:MRED,arms:'out'});person(S,720,520,1,{head:'turban',col:MSAF,arms:'out'});chowki(S,860,520,.6);
   TXT(S,[['“Why do we have to be Englishmen?”',30,{ENGLISHMEN:MRED}],['imitate our brothers of the western provinces',22]],460,40,460);}),
 pn(4,S=>{wash(S,480,280,420,'rgba(150,200,255,.9)',.3);const o=globe(S,480,270,170);S.g();[[[200,420],[300,150]],[[300,150],[700,120]],[[700,120],[780,420]],[[780,420],[200,420]]].forEach(([a,b])=>arrowL(S,a,b,{lift:40,lw:2.4,col:MSAF}));
   steamship(S,200,440,.4);steamship(S,780,440,.4);for(let k=0;k<5;k++)person(S,120+k*24,520,.3,{head:'turban',col:LADY[k]});for(let k=0;k<5;k++)person(S,760+k*24,520,.3,{head:'turban',col:LADY[k+1]});
   clock(S,860,110,40);LBL(S,'20 YEARS',860,180,22,MRED);TXT(S,[['group after group, out and back',26],['the face of India changes',22]]);}),
 pn(5,S=>{IN(S);wash(S,480,320,380,'rgba(255,214,120,.9)',.35);village(S,40,380,470,4,{people:false});village(S,580,920,470,9,{people:false});S.g();S.L([[380,450],[580,450]],{lw:3,col:MRED,any:1});S.L([[440,420],[520,480]],{lw:5,col:MRED,any:1});S.L([[440,480],[520,420]],{lw:5,col:MRED,any:1});
   for(let k=0;k<6;k++)person(S,250+k*90,540,.5,{head:'hair',col:[MSAF,MBLU,MGRN,MPUR,MRED,MSAF][k],arms:'up'});sun(S,860,90,40);
   TXT(S,[['if one village never visits the next…',26],['the stubborn Bengali boys will awaken the country',24,{AWAKEN:MSAF}]],30,30,560);}),
];

MURAL.marriage=[
 pn(0,S=>{IN(S);wash(S,480,300,380,'rgba(212,35,38,.9)',.25);S.A('sv1893_bust',40,60,.66,{mono:1});S.g();S.L([[440,280],[560,280]],{lw:8,col:MRED,any:1});arrowL(S,[440,280],[620,280],{lift:4,lw:8,col:MRED});
   envelope(S,780,380,1.1,'MANMATHA BABU');TXT(S,[['then, sharply',32,{SHARPLY:MRED}]],460,40,440);}),
 pn(1,S=>{IN(S);wash(S,480,320,380,'rgba(212,35,38,.9)',.22);doll(S,360,450,2.4);garland(S,600,260,200,MSAF);S.g();S.L(ell(480,330,300,220,40),{closed:1,lw:7,col:MRED,any:1});S.L([[260,500],[700,160]],{lw:7,col:MRED,any:1});
   kalash(S,700,500,.6);LBL(S,'NINE YEARS OLD',360,500,20,MRED);TXT(S,[['“That is the root of all sins.”',32,{SINS:MRED}]],30,30,500);}),
 pn(2,S=>{IN(S);wash(S,300,300,280,'rgba(200,200,220,.9)',.3);palmleaf(S,90,130,320,150);S.T([['A LAW AGAINST',MINK]],250,190,22,{al:'center'});S.T([['EARLY MARRIAGE',MRED]],250,226,26,{al:'center'});LBL(S,'1891',250,262,18);
   crowd(S,440,940,540,.8,11,{n:9,arms:'up'});S.g();for(let k=0;k<5;k++){const x=520+k*90;S.L([[x,220],[x-10,170]],{lw:2,col:MRED,any:1});S.L([[x+12,226],[x+20,176]],{lw:2,col:MRED,any:1});}LBL(S,'A TREMENDOUS HOWL',690,140,28,MRED);}),
 pn(3,S=>{IN(S);wash(S,480,300,380,'rgba(200,200,220,.9)',.3);colonial(S,600,470,280,220,'#e8dcc8');flag(S,860,250,.8,MBLU);S.g();for(let k=0;k<3;k++)gent(S,640+k*80,540,.6,'#2a2a3a');
   hut(S,200,470,1);S.g();arrowL(S,[600,380],[340,380],{lift:20,lw:4,col:MINK});TXT(S,[['stop it ourselves',30,{OURSELVES:MGRN}],['or the government will intervene',24]]);}),
 pn(4,S=>{IN(S);wash(S,480,320,380,'rgba(212,35,38,.9)',.25);toran(S,120,840,40,{sag:10});person(S,200,520,1.1,{head:'turban',col:'#f4efe4',arms:'out'});person(S,300,520,1,{head:'veil',col:MRED,arms:'out'});doll(S,480,520,1.1);garland(S,480,380,120,MSAF);gent(S,700,540,1.6,'#5a4a3a',{hat:false});S.g();S.L(ell(580,400,250,170,40),{closed:1,lw:7,col:MRED,any:1});S.L([[400,540],[760,260]],{lw:7,col:MRED,any:1});LBL(S,'TEN YEARS OLD',480,300,20,MRED);TXT(S,[['“What a horror!”',36,{HORROR:MRED}]],30,100,400);}),
 pn(5,S=>{wash(S,480,300,420,'rgba(212,35,38,.9)',.2);const o=globe(S,480,300,150);S.g();for(let k=0;k<8;k++){const a=k/8*Math.PI*2;const x=480+Math.cos(a)*300,y=300+Math.sin(a)*180;person(S,x,y+60,.5,{head:k%2?'hat':'hair',col:LADY[k%7],arms:'out'});arrowL(S,[x+(480-x)*.2,y+(300-y)*.2],[x+(480-x)*.55,y+(300-y)*.55],{lift:4,lw:2.4,col:MRED});}
   TXT(S,[['all the world cries fie upon us',30,{FIE:MRED}]],30,30,420);}),
 pn(6,S=>{IN(S);wash(S,480,300,380,'rgba(150,140,200,.9)',.3);S.g();S.L([[480,140],[480,440]],{lw:4,col:BRASS,any:1});S.L([[300,200],[660,200]],{lw:4,col:BRASS,any:1});S.S(ell(300,280,90,16,18),{tone:[1,.5],col:BRASS,lw:1.6});S.S(ell(660,240,90,16,18),{tone:[1,.5],col:BRASS,lw:1.6});
   S.L([[300,200],[230,280]],{lw:1.4}).L([[300,200],[370,280]],{lw:1.4}).L([[660,200],[590,240]],{lw:1.4}).L([[660,200],[730,240]],{lw:1.4});knot(S,300,250,24,MRED);fearShadow(S,660,236,.18);S.S(rect(420,440,120,20),{tone:[1,.5],col:BRASS,lw:1.4});
   LBL(S,'SIN',300,330,24,MRED);LBL(S,'SUFFERING',660,300,24,MPUR);TXT(S,[['the fruit of Karma',32,{KARMA:MSAF}]],30,30,400);}),
 pn(7,S=>{IN(S);wash(S,480,300,420,'rgba(150,140,170,.9)',.3);const pj=indiaMap(S,330,60,300,{hills:false});S.g();for(let k=0;k<14;k++){const a=k/14*Math.PI*2;S.L(ell(480+Math.cos(a)*190,270+Math.sin(a)*190,16,9,12),{closed:1,lw:3,col:'#7a7a82',any:1});}S.g();S.L([[60,470],[900,470]],{lw:3,col:MINK,any:1});[[80,'1194'],[880,'1894']].forEach(([x,t])=>{S.L([[x,455],[x,485]],{lw:3,col:MINK,any:1});LBL(S,t,x,510,20);});for(let k=0;k<6;k++)sword(S,160+k*120,470,60,-.8+k*.3,.5);LBL(S,'SEVEN HUNDRED YEARS',480,440,26,MRED);TXT(S,[['“booted and beaten for seven hundred years”',26,{BEATEN:MRED}]],30,30,400);})
];

MURAL.capture=[
 pn(0,S=>{wash(S,480,300,380,'rgba(255,180,200,.9)',.3);lady(S,300,520,1.2,MPNK,{hat:MPUR});S.g();S.L(bz([400,300],[460,200],[560,200],[620,300],14),{lw:3,col:MSAF,any:1});S.S(ell(620,320,40,26,16),{tone:[1,.6],col:'#f4f0e6',lw:1.4});S.L([[620,300],[660,250]],{lw:2});
   gent(S,760,520,1.2);heartGlow(S,560,140,.3,MPNK);TXT(S,[['the girls’ job:',28],['to capture husbands',32,{CAPTURE:MRED}]]);}),
 pn(1,S=>{wash(S,480,300,380,'rgba(220,200,230,.9)',.3);for(let k=0;k<6;k++)lady(S,130+k*140,530,.8,LADY[k],{hat:k%2?MSAF:null});S.A('sv1893_bust',380,140,.36,{mono:1});
   TXT(S,[['“I am, as it were, a woman amongst women.”',28]],30,30,600);}),
 pn(2,S=>{wash(S,480,300,420,'rgba(255,214,120,.9)',.35);building(S,60,460,840,280);S.g();for(let k=0;k<4;k++){lady(S,180+k*190,520,.7,LADY[k],{lowcut:1});gent(S,230+k*190,520,.7);}
   S.g();for(let k=0;k<8;k++)S.L([[100+k*110,90],[90+k*110,130]],{lw:1.6,col:MPUR,any:1});veena(S,820,200,.5);diningTable(S,140,180,.4);TXT(S,[['dinners, dances, musical parties',26]],300,30,420);}),
 pn(3,S=>{wash(S,480,300,420,'rgba(255,200,180,.9)',.3);lawn(S,500);lady(S,280,520,1,MPNK,{hat:MPUR});S.g();S.L([[340,380],[440,370]],{lw:6,col:MSKIN,any:1});gent(S,620,520,1,'#3a3a46',{fl:-1});
   S.g();for(let k=0;k<4;k++)S.L([[700+k*14,330+k*30],[760+k*14,330+k*30]],{lw:2,col:MINK,any:1});arrowL(S,[700,260],[900,260],{lift:2,lw:3,col:MRED});
   TXT(S,[['the moment she reaches out',28],['he runs away',32,{RUNS:MRED}]]);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(255,214,120,.9)',.35);moneybag(S,260,460,1.2);for(let k=0;k<6;k++)coin(S,180+k*30,520-(k%2)*10,16);lady(S,420,520,.9,MSAF,{hat:MPUR});for(let k=0;k<3;k++)gent(S,520+k*70,520,.8);
   S.g();S.S(HEART(800,240,.6),{rad:1,tone:[1,.5],col:MRED,lw:2});S.L([[800,190],[790,240],[808,270],[796,300]],{lw:3,col:MINK,any:1});LBL(S,'DIVORCE',800,350,24,MRED);
   TXT(S,[['money, mostly; one in a thousand for love',26,{LOVE:MRED}]],30,30,600);}),
 pn(5,S=>{wash(S,480,300,420,'rgba(200,220,255,.9)',.3);lady(S,220,520,1,MPNK);gent(S,320,520,1);LBL(S,'AMERICA',270,170,24,MBLU);S.g();S.L([[480,140],[480,520]],{lw:2,col:MINK,any:1});
   IN(S);person(S,620,520,1,{head:'turban',col:MSAF});person(S,720,520,.9,{head:'veil',col:MRED});person(S,820,520,1,{head:'beard',col:'#f4efe4'});LBL(S,'INDIA',720,170,24,MSAF);
   TXT(S,[['“It is the same in all countries.”',28]],240,30,520);}),
];

MURAL.civilwar=[
 pn(0,S=>{wash(S,480,300,420,'rgba(200,220,255,.9)',.3);for(let k=0;k<5;k++)lady(S,140+k*170,520,.9,LADY[k],{hat:k%2?MSAF:null});S.g();for(let k=0;k<5;k++){const x=140+k*170;S.S(ell(x,230,20,18,14),{tone:[1,.9],col:'#ffffff',lw:1.2});}
   garland(S,480,120,200,MPNK);S.g();S.L(ell(480,140,120,60,30),{closed:1,lw:5,col:MRED,any:1});S.L([[380,190],[580,90]],{lw:5,col:MRED,any:1});TXT(S,[['now they do not want to marry',30]],30,30,420);}),
 pn(1,S=>{wash(S,300,300,280,'rgba(150,150,170,.9)',.3);for(let k=0;k<3;k++)soldierBlue(S,140+k*90,520,.9);cannon(S,380,500,.6);S.g();for(let k=0;k<4;k++)S.L([[100+k*60,180],[120+k*60,140]],{lw:2,col:'#7a7a82',any:1});LBL(S,'1861–1865',260,120,26);
   arrowL(S,[460,330],[560,330],{lift:10,lw:3,col:MSAF});typewriter(S,640,500,.9);loom(S,840,520,.7);lady(S,720,530,.8,MBLU);lady(S,900,530,.6,MPUR);
   TXT(S,[['after the Civil War, women did all kinds of work',26]],460,40,460);}),
 pn(2,S=>{wash(S,480,300,420,'rgba(255,214,120,.9)',.35);lady(S,300,520,1.4,MGRN,{hat:MSAF});S.g();for(let k=0;k<5;k++)coin(S,440+k*30,400-k*10,16);book(S,480,520,.6,MBLU);
   heartGlow(S,760,320,.6);S.g();S.L([[720,180],[740,210],[790,150]],{lw:6,col:MGRN,any:1});TXT(S,[['“If we truly fall in love, then we shall marry; otherwise, we shall earn and meet our own expenses.”',24,{LOVE:MRED,EARN:MGRN}]],460,40,460);}),
 pn(3,S=>{wash(S,480,300,420,'rgba(255,214,120,.9)',.35);colonial(S,60,470,260,280,'#f4e8d0');moneybag(S,240,500,.8);gent(S,500,520,1.1,'#4a3a2a');
   arrowL(S,[560,460],[700,460],{lift:10,lw:3,col:MSAF});for(let k=0;k<4;k++)coin(S,760+k*30,470,16);LBL(S,'EARN FIRST',800,400,24,MGRN);TXT(S,[['even a millionaire’s son must earn before he marries',24]],340,40,600);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(255,200,200,.9)',.3);cottage(S,260,470,1.4,'#f0e2c8','#8a5a4a');lady(S,480,520,1,MPNK);gent(S,560,520,1);arrowL(S,[600,420],[400,420],{lift:20,lw:3,col:MSAF});
   lady(S,760,520,.8,'#7a7a82',{hair:'#d8d8d8'});gent(S,840,520,.8,'#5a5a62',{must:'#d8d8d8'});TXT(S,[['she brings her husband home to her parents',26]],30,30,600);}),
 pn(5,S=>{wash(S,480,300,420,'rgba(220,200,230,.9)',.3);lady(S,360,520,1.4,MPUR,{hat:MSAF});gent(S,600,520,1.1,'#3a3a46',{arms:'out'});S.g();S.S([[630,180],[880,180],[880,280],[700,280],[660,320],[680,280],[630,280]],{tone:[1,.9],col:'#fffbe8',lw:2});
   S.T([['YES, DEAR.',MRED]],755,240,36,{al:'center'});TXT(S,[['in everything',28]],30,30,300);}),
];

MURAL.father=[
 pn(0,S=>{wash(S,480,300,420,'rgba(150,200,255,.9)',.35);S.g();for(let k=0;k<5;k++)S.L(bz([0,300+k*28],[300,260+k*28],[600,340+k*28],[960,300+k*28],20),{lw:5,col:[MYEL,MBLU,MCYN,MYEL,MBLU][k],any:1});
   for(let k=0;k<8;k++)coin(S,120+k*100,240-(k%2)*30,16);for(let k=0;k<4;k++)book(S,180+k*200,500,.5,LADY[k]);for(let k=0;k<4;k++)rose(S,280+k*200,470,.5,LADY[k+2]);
   TXT(S,[['rivers of wealth, waves of beauty, knowledge everywhere',28,{WEALTH:MSAF,BEAUTY:MPNK,KNOWLEDGE:MBLU}]],30,30,900);}),
 pn(1,S=>{wash(S,480,300,420,'rgba(255,180,200,.9)',.3);for(let k=0;k<4;k++)lady(S,170+k*200,520,1,LADY[k],{hat:k%2?MSAF:null});S.g();for(let k=0;k<6;k++)S.S(HEART(180+k*120,180+(k%2)*40,.18),{rad:1,tone:[1,.5],col:MPNK,lw:1.2});
   TXT(S,[['a mania for romance',32,{ROMANCE:MPNK}]],30,30,420);}),
 pn(2,S=>{IN(S);wash(S,480,300,380,'rgba(255,214,120,.9)',.4);S.A('sv1893_chicago',330,60,.56);S.g();for(let k=0;k<4;k++)S.S(HEART(120+k*30,250+k*60,.15),{rad:1,tone:[1,.5],col:'#c8c8d0',lw:1});
   TXT(S,[['“I am, however, a strange sort of animal who hasn’t any romantic feeling.”',26]],620,40,320);}),
 pn(3,S=>{wash(S,480,300,420,'rgba(255,214,120,.9)',.35);seated(S,480,520,1.1,MSAF);for(let k=0;k<6;k++){const x=k<3?120+k*100:640+(k-3)*100;lady(S,x,540,.7,LADY[k],{});}
   S.g();S.S([[100,150],[330,150],[330,220],[160,220],[130,250],[140,220],[100,220]],{tone:[1,.9],col:'#fffbe8',lw:2});S.T([['FATHER',MSAF]],215,198,28,{al:'center'});
   S.S([[630,150],[860,150],[860,220],[820,220],[830,250],[800,220],[630,220]],{tone:[1,.9],col:'#fffbe8',lw:2});S.T([['BROTHER',MSAF]],745,198,28,{al:'center'});TXT(S,[['great respect',28]],380,40,300);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(255,240,200,.9)',.4);for(let k=0;k<5;k++)lady(S,140+k*170,520,.9,LADY[k+1],{hat:k%2?MPUR:null});sun(S,820,100,50);rays(S,820,100,60,140,16,{lw:1.4});
   TXT(S,[['the unmarried girls: exceedingly good',28,{GOOD:MGRN}],['because their future is bright',24,{BRIGHT:MSAF}]]);}),
];

MURAL.beauty=[
 pn(0,S=>{wash(S,480,300,420,'rgba(220,200,230,.9)',.3);S.A('sv1893_bust',40,60,.6,{mono:1});envelope(S,700,420,1);S.g();S.L(bz([560,300],[620,240],[680,260],[740,220],10),{lw:3,col:MINK,any:1});
   TXT(S,[['in his own blunt words',32,{BLUNT:MRED}]],440,40,480);}),
 pn(1,S=>{wash(S,300,320,260,'rgba(200,170,140,.9)',.3);for(let k=0;k<3;k++)driedFruit(S,180+k*110,470,1.1-k*.15);S.g();S.S(rect(560,280,300,200),{tone:[1,.6],col:'#e8e0d0',lw:1.8});
   const ux=710,uy=380;S.L([[560,280],[860,480]],{lw:10,col:MRED,any:1});S.L([[860,280],[560,480]],{lw:10,col:MRED,any:1});S.L([[710,280],[710,480]],{lw:16,col:MRED,any:1});S.L([[560,380],[860,380]],{lw:16,col:MRED,any:1});LBL(S,'ENGLAND',710,520,20);
   TXT(S,[['“Those emaciated Western women, looking like old dried-up fruit, whom you see in India, are English, and the English are an ugly race amongst the Europeans.”',24]],30,30,900);}),
 pn(2,S=>{wash(S,480,300,420,'rgba(150,200,255,.9)',.3);S.g();const eu=[[110,140],[300,110],[400,160],[360,260],[220,280],[120,220]];S.S(eu,{tone:[1,.6],col:'#cfe3c0',lw:1.8});LBL(S,'EUROPE',250,200,22);
   [[150,170],[230,140],[330,150],[280,240],[170,240]].forEach(([x,y],k)=>arrowL(S,[x,y],[640,240],{lift:30+k*10,lw:2,col:LADY[k]}));S.S([[560,180],[880,170],[900,300],[560,320]],{tone:[1,.6],col:'#d8e8c8',lw:1.8});LBL(S,'AMERICA',730,210,24,MBLU);
   for(let k=0;k<4;k++)lady(S,600+k*90,540,.75,LADY[k],{hat:k%2?MSAF:null});TXT(S,[['“the best blood strains of Europe have been blended”',26]],30,440,500);}),
 pn(3,S=>{IN(S);wash(S,480,300,420,'rgba(212,35,38,.9)',.2);clock(S,160,200,70);S.g();for(let k=0;k<6;k++)cradle(S,300+k*100,470-(k%2)*20,.7);lady(S,860,520,.9,'#7a7a82',{hair:'#3a2a1a'});
   LBL(S,'FROM HER TENTH YEAR',160,310,18,MRED);TXT(S,[['“Damn nonsense! What a terrible sin!”',32,{SIN:MRED}]],300,40,620);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(200,200,220,.9)',.3);lady(S,300,520,1.3,MPNK,{hat:MPUR});owl(S,680,440,1.6);
   TXT(S,[['“Even the most beautiful woman of our country will look like a black owl here.”',26]],30,30,900);}),
 pn(5,S=>{IN(S);wash(S,480,300,420,'rgba(255,214,120,.9)',.35);const pj=indiaMap(S,560,60,300,{hills:false});S.g();[[72.5,31.5],[73.5,31],[74.3,31.6],[75.2,31.3],[76,30.8]].forEach(([lo,la],k)=>{const p=pj(lo,la);S.L([[p[0],p[1]-50],[p[0]-8,p[1]+30]],{lw:3,col:'#5fb4e8',any:1});});
   person(S,280,520,1.4,{head:'veil',col:MRED,arms:'hold'});LBL(S,'PUNJAB',740,100,24,MSAF);TXT(S,[['the women of the Punjab: very well-drawn features',26,{PUNJAB:MSAF}]],30,30,460);}),
];

MURAL.lakshmi=[
 pn(0,S=>{wash(S,480,300,420,'rgba(150,200,255,.9)',.3);building(S,500,470,400,260);for(let k=0;k<3;k++)lady(S,140+k*110,520,.9,LADY[k],{});for(let k=0;k<4;k++)book(S,150+k*90,330,.6,LADY[k+2]);
   gent(S,820,540,.8,'#3a3a46',{hat:false});S.g();S.S(rect(790,340,60,12),{tone:[1,.4],col:'#1a1a22',lw:1});LBL(S,'PROFESSOR',820,560-16,16);
   TXT(S,[['many a learned professor put to shame',26]],30,30,420);}),
 pn(1,S=>{wash(S,480,300,420,'rgba(255,214,120,.9)',.35);colonial(S,60,470,360,300,'#f4e8d0');S.A('sv1893_bust',150,250,.32,{mono:1});lady(S,500,520,1,MPUR);lady(S,600,520,.9,MBLU);gent(S,700,520,1);
   heartGlow(S,860,300,.4);TXT(S,[['“like their own son”',32,{SON:MSAF}],['in the houses of the best families',22]],440,40,480);}),
 pn(2,S=>{wash(S,480,300,420,'rgba(255,214,120,.9)',.35);lady(S,200,520,1,MGRN);envelope(S,340,330,.6);arrowL(S,[380,330],[520,420],{lift:20,lw:2.4,col:MSAF});loom(S,640,500,.9);
   phonograph(S,840,480,.9);S.g();arrowL(S,[840,330],[900,200],{lift:10,lw:2.4,col:MSAF});LBL(S,'TO KHETRI',880,170,20,MSAF);TXT(S,[['the machine; a phonograph for the Maharaja',26]],30,30,600);}),
 pn(3,S=>{IN(S);wash(S,480,300,420,'rgba(255,214,120,.95)',.45);lotus(S,250,380,1.6);for(let k=0;k<7;k++)coin(S,150+k*34,460-(k%2)*12,16);LBL(S,'LAKSHMI · BEAUTY',250,520,24,MSAF);
   veena(S,700,340,1.2);book(S,700,450,.8,'#f4f0e6');LBL(S,'SARASWATI · ACCOMPLISHMENT',700,520,22,MBLU);
   TXT(S,[['“the goddess Lakshmi in beauty and the goddess Saraswati in talents and accomplishments”',24,{LAKSHMI:MSAF,SARASWATI:MBLU}]],60,30,840);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(150,200,255,.9)',.3);for(let k=0;k<4;k++)book(S,140+k*70,500,.5,LADY[k]);S.g();S.L(ell(240,440,160,100,30),{closed:1,lw:5,col:MRED,any:1});S.L([[130,520],[350,360]],{lw:5,col:MRED,any:1});LBL(S,'NOT THROUGH BOOKS',240,300,22,MRED);
   globe(S,700,280,110);steamship(S,700,470,.5);for(let k=0;k<4;k++)person(S,600+k*60,540,.3,{head:k%2?'veil':'turban',col:LADY[k]});
   TXT(S,[['send out men and women to see the world',28,{WORLD:MBLU}]],460,40,460);}),
 pn(5,S=>{wash(S,480,300,420,'rgba(255,214,120,.95)',.45);S.g();S.S([[0,470],[960,470],[960,560],[0,560]],{tone:[1,.6],col:'#d8c49a',noline:1});dust(S,300,460,500,60,3);gent(S,240,520,1.1,'#3a3a46');
   arrowL(S,[380,420],[620,420],{lift:20,lw:3,col:MSAF});for(let k=0;k<10;k++)coin(S,640+k*28,480-(k%3)*14,16);S.G(760,440,140,'rgba(255,214,120,.95)',{a:.7});
   TXT(S,[['“Where others do not see even dust, there they see gold.”',28,{GOLD:MSAF}]],30,30,700);}),
];

MURAL.expand=[
 pn(0,S=>{wash(S,480,300,400,'rgba(200,200,220,.9)',.3);envelope(S,300,420,1.3);S.T([['WRITTEN IN ENGLISH',MBLU]],300,250,26,{al:'center',rot:-.04});S.g();S.L(bz([520,400],[560,300],[620,330],[680,280],12),{lw:3,col:MINK,any:1});
   TXT(S,[['he breaks into English',30,{ENGLISH:MBLU}]],520,40,400);}),
 pn(1,S=>{IN(S);wash(S,480,300,420,'rgba(212,35,38,.9)',.2);const pj=indiaMap(S,330,60,300,{hills:false});S.g();S.L(ell(480,250,190,200,40),{closed:1,lw:6,col:'#7a7a82',any:1});for(let k=0;k<8;k++){const a=k/8*Math.PI*2;S.L([[480+Math.cos(a)*190,250+Math.sin(a)*200],[480+Math.cos(a)*210,250+Math.sin(a)*222]],{lw:4,col:'#7a7a82',any:1});}
   [[120,150],[840,150],[120,420],[840,420]].forEach(([x,y],k)=>{globe(S,x,y,40);});TXT(S,[['“Keeping aloof from the community of nations is the only cause for the downfall of India.”',24,{ALOOF:MRED,DOWNFALL:MRED}]],100,470,760);}),
 pn(2,S=>{IN(S);wash(S,480,300,420,'rgba(150,210,120,.9)',.3);indiaMap(S,330,60,300,{hills:false});S.g();for(let k=0;k<8;k++){const a=k/8*Math.PI*2;arrowL(S,[480+Math.cos(a)*120,280+Math.sin(a)*120],[480+Math.cos(a)*300,280+Math.sin(a)*200],{lift:10,lw:2.6,col:[MSAF,MBLU,MGRN,MPUR][k%4]});}
   steamship(S,140,520,.4);steamship(S,820,520,.4);TXT(S,[['back into the company of nations',26],['visibly rising again',24,{RISING:MGRN}]]);}),
 pn(3,S=>{IN(S);wash(S,480,300,420,'rgba(150,200,255,.9)',.3);ripples(S,480,330,380,6,MBLU);person(S,480,330,.8,{head:'turban',col:MSAF,arms:'out'});steamship(S,820,240,.4);
   S.g();lady(S,160,520,.9,MRED,{hair:'#2a1a12'});S.S(rect(90,300,140,240),{tone:[1,1],noline:1});S.L([[90,300],[90,540]],{lw:5,col:'#5a4a3a',any:1});for(let k=0;k<6;k++)S.L([[100+k*24,300],[100+k*24,540]],{lw:3,col:'#5a4a3a',any:1});
   TXT(S,[['everyone who goes out widens the horizon',26],['women cannot go, so they hardly progress',22]],440,40,500);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(255,214,120,.95)',.4);S.g();S.L([[480,120],[480,500]],{lw:4,col:MINK,any:1});ladder(S,240,520,1);arrowL(S,[300,200],[300,120],{lift:2,lw:4,col:MGRN});
   S.g();S.L(bz([660,180],[700,300],[760,400],[800,520],14),{lw:4,col:'#7a7a82',any:1});fearShadow(S,780,520,.5);LBL(S,'OR DIE OUT',760,140,26,MRED);LBL(S,'UPWARDS',240,100,26,MGRN);
   TXT(S,[['“There is no station of rest.”',28]],30,30,400);}),
 pn(5,S=>{wash(S,480,300,420,'rgba(150,210,120,.9)',.35);seedling(S,250,420,1.3);S.g();for(let k=0;k<6;k++){const a=-Math.PI/2+(k-2.5)*.4;arrowL(S,[250,280],[250+Math.cos(a)*180,280+Math.sin(a)*160],{lift:6,lw:2.4,col:MGRN});}LBL(S,'EXPANSION: LIFE',250,520,24,MGRN);
   S.g();for(let k=0;k<6;k++){const a=k/6*Math.PI*2;arrowL(S,[720+Math.cos(a)*160,300+Math.sin(a)*140],[720+Math.cos(a)*50,300+Math.sin(a)*44],{lift:6,lw:2.4,col:MRED});}S.S(ell(720,300,30,30,16),{rad:1,tone:[.4,.2],col:'#4a4a52',lw:1.4});LBL(S,'CONTRACTION: DEATH',720,520,24,MRED);
   TXT(S,[['“The only sign of life is going outward and forward and expansion.”',24]],60,30,840);}),
 pn(6,S=>{wash(S,480,300,420,'rgba(255,214,120,.95)',.45);innerLamp(S,480,520,1.2,MSAF);S.g();for(let k=1;k<=4;k++)S.L(ell(480,330,100+k*80,60+k*44,40),{closed:1,lw:2,col:MSAF,any:1});
   for(let k=0;k<8;k++){const a=k/8*Math.PI*2;person(S,480+Math.cos(a)*380,360+Math.sin(a)*150+40,.4,{head:['turban','veil','hair','hat'][k%4],col:LADY[k%7],arms:'up'});}
   TXT(S,[['do good to others: you expand beyond your little self',26,{EXPAND:MSAF}]],30,30,700);}),
 pn(7,S=>{wash(S,480,300,420,'rgba(150,150,170,.9)',.3);S.g();S.S(rect(320,140,320,300),{tone:[1,.5],col:'#9a9aa4',lw:2});for(let k=0;k<6;k++)S.L([[340+k*56,140],[340+k*56,440]],{lw:3,col:'#5a5a62',any:1});person(S,480,420,.8,{head:'hair',col:'#7a7a82',arms:'down'});
   knot(S,160,260,50,MINK);chainsBroken(S,800,260,.6);TXT(S,[['“All narrowness, all contraction, all selfishness is simply slow suicide.”',26,{SUICIDE:MRED}]],60,460,840);}),
 pn(8,S=>{IN(S);wash(S,480,300,420,'rgba(255,214,120,.95)',.4);crystal(S,300,300,140,true);S.g();for(let k=0;k<8;k++){const a=k/8*Math.PI*2;S.S(tf([[-10,0],[0,-14],[12,-2],[4,10]],300+Math.cos(a)*200,300+Math.sin(a)*160,1),{tone:[1,.6],col:'#c8d8e8',lw:1});}
   lady(S,640,520,1,MRED,{hair:'#2a1a12'});arrowL(S,[700,420],[860,360],{lift:10,lw:3,col:MSAF});sun(S,880,120,40);
   TXT(S,[['who would break this horrible crystallisation of death?',26,{DEATH:MRED}],['Lord help us!',30,{LORD:MSAF}]],520,40,420);}),
];

MURAL.slowly=[
 pn(0,S=>{IN(S);wash(S,480,300,420,'rgba(150,210,120,.9)',.3);clock(S,820,140,60);S.g();for(let k=0;k<8;k++)S.S(ell(120+k*80,470,22,10,12),{tone:[1,.6],col:'#c8b89a',lw:1.2});ant(S,180,440,1.4);ant(S,320,440,1.4);
   TXT(S,[['gradually all this will come about',30,{GRADUALLY:MGRN}]]);}),
 pn(1,S=>{IN(S);wash(S,480,300,420,'rgba(240,200,140,.9)',.35);S.g();S.S([[0,330],[300,330],[300,400],[0,400]],{tone:[1,.6],col:'#c8b89a',noline:1});for(let k=0;k<6;k++)S.L([[20+k*50,365],[50+k*50,365]],{lw:3,col:'#ffffff',any:1});person(S,150,400,.6,{head:'turban',col:MSAF,arms:'down'});LBL(S,'A ROAD',150,450,20);
   quilt(S,480,420,1);LBL(S,'A QUILT',480,450,20);mountains(S,640,940,420,200,3,'#b8c8d8');person(S,760,330,.4,{head:'turban',col:MRED,arms:'up'});LBL(S,'A MOUNTAIN',790,450,20);
   TXT(S,[['“slowly and cautiously”',32,{SLOWLY:MGRN}]],30,30,600);}),
 pn(2,S=>{wash(S,480,300,420,'rgba(255,214,120,.9)',.35);newspaper(S,80,120,320,240,'THE INDIAN MIRROR',{a:-.05});newspaper(S,300,170,300,220,'MADRAS MEETING',{a:.05});steamship(S,780,300,.6);sea(S,320,8);
   TXT(S,[['the papers from India have arrived',26],['the enemy is silenced',28,{SILENCED:MGRN}]],520,40,420);}),
 pn(3,S=>{wash(S,480,300,420,'rgba(212,35,38,.9)',.2);gent(S,260,520,1.3,'#4a3a2a',{hat:false,arms:'out'});S.g();S.S([[340,180],[600,180],[600,260],[420,260],[380,300],[400,260],[340,260]],{tone:[1,.9],col:'#fffbe8',lw:2});S.T([['A ROGUE!',MRED]],470,234,36,{al:'center'});LBL(S,'MAZOOMDAR',260,540,18);
   for(let k=0;k<5;k++)lady(S,620+k*70,520,.7,LADY[k],{fl:-1});TXT(S,[['no one pays attention',28]],620,300,320);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(255,200,180,.9)',.35);S.A('sv1893_chicago',360,80,.5);lady(S,240,520,1.1,'#7a7a82',{hair:'#d8d8d8'});lady(S,720,520,1.1,MPUR,{hair:'#d8d8d8'});heartGlow(S,860,150,.3,MPNK);
   TXT(S,[['“I am like a foster son to the American women; they are really my mother.”',26,{MOTHER:MPNK}]],30,30,320);}),
];

MURAL.greenacre=[
 pn(0,S=>{skyset(S,8,{sx:860,sy:80,clouds:2,cx0:120,cx1:520,cy:70,birds:5,bx:500,by:110});lawn(S,400,'#a6d27a');S.g();S.S([[0,370],[960,360],[960,400],[0,410]],{tone:[1,.7],col:'#9cd2ee',noline:1,cA:.6});
   for(let k=0;k<5;k++)tent(S,120+k*170,420,.8,k%2?'#f4f0e6':'#fbe8c8');for(let k=0;k<4;k++)pine(S,60+k*280,410,.6);building(S,700,400,220,120);flag(S,880,280,.6,MRED);
   crowd(S,60,900,540,.5,12,{n:14});TXT(S,[['Greenacre, Maine',36,{GREENACRE:MGRN}],['several hundred men and women',22]]);}),
 pn(1,S=>{IN(S);wash(S,480,320,420,'rgba(150,210,120,.9)',.35);lawn(S,450,'#a6d27a');oakTree(S,480,470,1.5);seated(S,480,500,.8,MSAF);S.g();for(let k=0;k<10;k++){const a=Math.PI*(.1+k/9*.8);const x=480+Math.cos(a)*360,y=520+Math.sin(a)*-10;(k%2?lady:gent)(S,x,y+20,.55,k%2?LADY[k%7]:'#3a3a46',{hat:false});}
   TXT(S,[['in the Hindu fashion, under a tree',26]],30,30,420);}),
 pn(2,S=>{IN(S);wash(S,480,300,420,'rgba(255,214,120,.95)',.45);sun(S,160,110,40);seated(S,480,500,1.1,MSAF);S.g();for(let k=0;k<6;k++){thought(S,140+k*140,250+(k%2)*30,90,60);}om(S,480,180,60);
   TXT(S,[['how earnest they were!',30,{EARNEST:MSAF}]],560,40,380);}),
 pn(3,S=>{wash(S,480,300,420,'rgba(150,200,255,.9)',.3);S.g();const pts=[[150,200],[250,150],[400,170],[560,140],[700,160],[820,220],[830,320],[720,380],[560,400],[380,390],[220,360],[140,290]];S.S(pts,{tone:[1,.6],col:'#cfe3c0',lw:2});
   for(let k=0;k<14;k++)star(S,180+((k*73)%620),190+((k*41)%180),9,MSAF);church(S,860,520,.6);gent(S,780,520,.7,'#2a2a3a',{arms:'out'});LBL(S,'SOME MINISTERS: ANGRY',800,450,16,MRED);
   for(let k=0;k<3;k++)gent(S,120+k*70,540,.6,'#2a2a3a');LBL(S,'MANY FOLLOW HIM',190,450,16,MGRN);TXT(S,[['the whole country knows him',30]],30,30,500);}),
 pn(4,S=>{wash(S,480,300,420,'rgba(255,200,180,.9)',.35);cottage(S,480,470,1.6,'#f4e8d0','#8a5a4a');S.A('sv1893_bust',400,250,.26,{mono:1});for(let k=0;k<4;k++)(k%2?gent:lady)(S,200+k*190,540,.7,k%2?'#3a3a46':LADY[k],{});heartGlow(S,820,160,.3,MPNK);
   TXT(S,[['“I have been adopted by them.”',32,{ADOPTED:MPNK}]],30,30,500);}),
];

MURAL.public=[
 pn(0,S=>{wash(S,480,300,420,'rgba(150,200,255,.9)',.3);steamship(S,480,330,.8);sea(S,340,9);globe(S,160,180,60);clock(S,820,150,50);S.g();for(let k=0;k<3;k++)person(S,700+k*60,520,.4,{head:'turban',col:MSAF,arms:'up'});
   TXT(S,[['back to India? possibly next winter',26],['wandering there, as here',22]],260,40,440);}),
 pn(1,S=>{wash(S,480,300,420,'rgba(212,35,38,.9)',.2);envelope(S,480,420,1.6,'PRIVATE');TXT(S,[['please don’t make this letter public',30,{PUBLIC:MRED}]],30,30,700);}),
 pn(2,S=>{wash(S,480,300,420,'rgba(200,200,220,.9)',.3);S.A('sv1893_chicago',330,90,.58);S.g();for(let k=0;k<12;k++){const a=k/12*Math.PI*2;eyeMark(S,480+Math.cos(a)*400,300+Math.sin(a)*210,26);}church(S,90,520,.4);church(S,870,520,.4);newspaper(S,40,40,140,100,'PRESS',{a:-.05});
   TXT(S,[['“I am now a public man. Everybody is watching.”',26,{WATCHING:MRED}]],560,40,380);}),
 pn(3,S=>{S.g();S.S(rect(20,20,900,500),{tone:[1,1],noline:1,col:'#cfe6f8',cA:.6});S.G(260,110,170,'rgba(255,255,255,1)',{a:.85,sx:1.7});S.G(780,80,150,'rgba(255,255,255,1)',{a:.85,sx:1.7});S.A('sv1893_chicago',520,30,.68);
   S.g();[['“The only sign of life',200],['is going outward',256],['and forward.”',312]].forEach(([t,y])=>S.T([[t,MINK]],60,y,40,{font:QF,style:'italic',rot:0}));S.T([['— Swami Vivekananda, letter of 5 September 1894',MINK]],62,380,16,{font:QF,rot:0});
   S.T([['Yours faithfully, Vivekananda',MSAF]],62,440,24,{font:QF,style:'italic',rot:0});}),
];

Object.keys(MURAL).forEach(id=>{SC[id]=muralScene(id);});
