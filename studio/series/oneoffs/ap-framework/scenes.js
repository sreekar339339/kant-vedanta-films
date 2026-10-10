const SC={};
/* The AP Framework: a paraphrased summary of the philosophy of Acharya Prashant. Watercolour mural.
   India and Vedanta scenes carry the temple band (IN); the teacher is shown only by an empty seat, lamp and books, never a likeness. */
const pn=(at,draw)=>({at,draw});
const TXT=(S,items,x=30,y=30,w=430)=>stack(S,x,y,w,items);
const IN=S=>kumbamBand(S,0,960,0);
const DV=(S,t,x,y,size,col=MINK)=>S.T([[t,col]],x,y,size,{al:'center',font:DEVF,rot:0});
const LBL=(S,t,x,y,size=18,col=MINK)=>S.T([[t,col]],x,y,size,{al:'center',rot:0});
const floor=(S,y=470,col='#e6dcc6')=>{S.g();S.S([[0,y],[960,y],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col,noline:1});};
const lawn=(S,y=470,col='#b9d98a')=>floor(S,y,col);
const C=[MSAF,MBLU,MPUR,MGRN,MPNK,MRED,'#3aa6a0'];
const strikeWord=(S,t,x,y,size,col=MINK)=>{LBL(S,t,x,y,size,col);strikeL(S,x-t.length*size*.3,y-size*.35,t.length*size*.6);};
const bigArrow=(S,a,b,col=MINK,lw=4)=>arrowL(S,a,b,{lift:0,lw,col});

MURAL.map=[
 pn(0,S=>{IN(S);wash(S,480,320,380,'rgba(255,200,120,.9)',.3);banyan(S,170,470,.9);floor(S,470,'#e8d8b0');chowki(S,480,470,1.1);samai(S,380,470,.6);samai(S,580,470,.6);
   S.g();[MRED,MBLU,MGRN,MSAF].forEach((c,k)=>book(S,480,410-k*18,.5,c));DV(S,'आचार्य प्रशांत',700,300,30,MSAF);
   crowdRows(S,640,940,540,.42,4,{});mala(S,820,330,30);
   TXT(S,[['The AP Framework',40,{AP:MSAF,FRAMEWORK:MSAF}],['a summary of the philosophy of Acharya Prashant, a teacher of Vedanta',22]],300,50,620);}),
 pn(1,S=>{wash(S,480,290,360,'rgba(200,220,255,.9)',.3);S.g();S.S(ell(480,300,60,60,24),{rad:1,tone:[1,.6],col:'#f6eccf',lw:2});S.T([['?',MRED]],480,328,70,{al:'center'});
   const Q=[['WHAT IS REAL',(x,y)=>globe(S,x,y-56,26)],['HOW WE KNOW',(x,y)=>eyeMark(S,x,y-56,22)],['LIBERATION',(x,y)=>dove(S,x,y-56,.5)],['VALUE',(x,y)=>heartGlow(S,x,y-56,.22)],
     ['MIND',(x,y)=>bulb(S,x,y-60,20)],['THE HUMAN',(x,y)=>person(S,x,y-30,.22,{head:'hair',col:MBLU})],['ART',(x,y)=>easel(S,x,y-30,.22)]];
   Q.forEach(([t,f],k)=>{const a=-Math.PI/2+k/7*Math.PI*2,x=480+Math.cos(a)*330,y=300+Math.sin(a)*180+30;f(x,y);plaque(S,x,y,150,t,MINK);S.g();S.L([[480+Math.cos(a)*70,300+Math.sin(a)*70],[480+Math.cos(a)*230,300+Math.sin(a)*120]],{lw:1.2,col:'#b8ae96',any:1});});
   TXT(S,[['seven questions',30,{SEVEN:MBLU}]],30,30,300);}),
 pn(2,S=>{wash(S,480,300,360,'rgba(255,214,120,.9)',.3);S.g();S.S(rect(110,200,260,200),{tone:[1,.8],col:'#f2e6c8',lw:2});LBL(S,'BELIEFS',240,300,40,MINK);S.g();S.L([[120,380],[360,220]],{lw:5,col:MRED});
   lens(S,560,420,1.1,-2.2);mirror(S,780,500,.8);ledger(S,620,520,.42,[['WHAT','?'],['WHY','?']]);eyeMark(S,880,330,26);clock(S,880,440,34);S.g();S.L([[370,300],[480,330]],{lw:1.4,col:MINK,any:1});arrowL(S,[380,300],[470,330],{lift:10,lw:2,col:MGRN});book(S,200,500,.6,MBLU);book(S,280,500,.6,MGRN);LBL(S,'DIAGNOSTIC TOOLS',700,140,26,MGRN);
   TXT(S,[['not beliefs, but tools',32,{TOOLS:MGRN}],['for catching a mistake while you make it',22]],30,30,520);}),
 pn(4,S=>{wash(S,480,300,360,'rgba(255,170,150,.9)',.28);egoBalloon(S,480,470,90,MRED,'I');person(S,480,540,.75,{head:'hair',col:MBLU,arms:'up'});
   LBL(S,'THE EGO',480,110,56,MRED);[[120,30],[220,22],[300,40],[680,26],[770,36],[860,20]].forEach(([x,r],k)=>{egoBalloon(S,x,470,r,C[k],'');person(S,x,540,.42,{head:k%2?'veil':'hair',col:C[(k+2)%7]});});TXT(S,[['the mistake has a name',28]],30,30,400);}),
];

MURAL.ache=[
 pn(0,S=>{wash(S,480,300,380,'rgba(180,180,200,.9)',.3);person(S,480,470,.9,{head:'hair',col:'#7a7a82'});cloud(S,480,180,170,4,'#9aa2b2');
   colonial(S,60,330,150,150);LBL(S,'JOB',135,360,20);cottage(S,240,470,.6);LBL(S,'CITY',250,500,20);lady(S,760,470,.6,MPNK);gent(S,820,470,.6);LBL(S,'PARTNER',790,500,20);scroll(S,780,200,140,90);LBL(S,'PLANS',850,250,20);
   [[[200,330],[400,380]],[[300,440],[420,430]],[[740,420],[560,400]],[[790,300],[570,330]]].forEach(([a,b])=>arrowL(S,a,b,{lift:20,lw:2,col:MSAF}));
   TXT(S,[['dissatisfaction',36,{DISSATISFACTION:MPUR}]],30,30,500);}),
 pn(1,S=>{wash(S,480,300,380,'rgba(180,180,200,.9)',.3);
   S.g();S.S(rect(40,140,270,300),{tone:[1,.8],col:'#e2f0fa',lw:1.6});waves(S,40,310,360,6,2);palm(S,90,440,.5);person(S,220,430,.5,{head:'hair',col:MSAF});cloud(S,220,250,70,1,'#9aa2b2');
   S.g();S.S(rect(345,140,270,300),{tone:[1,.8],col:'#f2ece0',lw:1.6});colonial(S,360,380,110,140);building(S,480,440,110,160);person(S,560,430,.5,{head:'hair',col:MSAF});cloud(S,560,250,70,2,'#9aa2b2');
   S.g();S.S(rect(650,140,270,300),{tone:[1,.8],col:'#e8eef0',lw:1.6});mountains(S,650,920,330,90,3);person(S,800,430,.5,{head:'hair',col:MSAF});cloud(S,800,250,70,3,'#9aa2b2');
   LBL(S,'THE SAME ACHE, EVERYWHERE',480,490,26,MPUR);TXT(S,[['structural, not circumstantial',30,{STRUCTURAL:MRED}]],30,30,600);}),
 pn(3,S=>{wash(S,480,300,380,'rgba(255,214,120,.9)',.3);floor(S,450,'#e6dcc6');S.g();S.L([[700,450],[700,250]],{lw:6,col:'#8a5a2a'});S.S([[700,260],[880,260],[910,290],[880,320],[700,320]],{tone:[1,.8],col:'#f6eccf',lw:1.6});LBL(S,'MORE',800,300,26);
   S.S([[700,340],[540,340],[510,370],[540,400],[700,400]],{tone:[1,.8],col:'#f6eccf',lw:1.6});LBL(S,'?',610,384,36,MRED);
   person(S,880,450,.6,{head:'hair',col:MBLU,arms:'out'});mountains(S,0,500,450,90,2,'#c8d4e0');person(S,120,450,.5,{head:'hair',col:MSAF,emo:'weak'});person(S,240,450,.5,{head:'veil',col:MPNK,emo:'weak'});person(S,360,450,.5,{head:'hair',col:MGRN,emo:'weak'});for(let k=0;k<3;k++)arrowL(S,[150+k*120,410],[200+k*120,410],{lift:0,lw:2,col:MSAF});moneybag(S,900,250,.5);crownX(S,940,200,.4);for(let k=0;k<4;k++)S.L([[810-k*16,380+k*12],[780-k*16,380+k*12]],{lw:2,col:MINK,any:1});
   TXT(S,[['not whether we try hard enough,',28],['but whether the direction is wrong',30,{DIRECTION:MRED,WRONG:MRED}]],30,40,560);}),
];

MURAL.skin=[
 pn(0,S=>{wash(S,480,300,380,'rgba(255,200,150,.9)',.3);person(S,420,520,1.4,{head:'hair',col:MSAF,arms:'out'});
   [['I AM A DOCTOR',MBLU],['I AM INDIAN',MSAF],['I AM RIGHT',MRED],['I AM HURT',MPUR]].forEach(([t,c],k)=>{tag(S,560,230+k*60,t,c);S.g();S.L([[440,300+k*14],[548,230+k*60]],{lw:.9,col:MINK,any:1});});
   TXT(S,[['“I am X”',48,{X:MRED}],['the felt sense of being something',22]],30,30,400);}),
 pn(1,S=>{wash(S,480,300,380,'rgba(200,230,200,.9)',.3);lawn(S,480);sun(S,820,120,44);oakTree(S,140,480,.8);bird(S,700,160,1);bird(S,740,190,.8);ox(S,800,480,.5,-1);
   skinSelf(S,470,500,1.25,MSAF);LBL(S,'I',470,200,40,MRED);LBL(S,'THE WORLD',180,170,24,MGRN);LBL(S,'THE WORLD',760,300,24,MGRN);
   TXT(S,[['the skin: where “I” begins',30,{SKIN:MRED}]],30,30,520);}),
 pn(2,S=>{wash(S,480,300,380,'rgba(255,170,150,.9)',.3);person(S,480,540,.75,{head:'hair',col:MBLU,arms:'out'});egoBalloon(S,480,380,95,MRED,'I');
   cottage(S,110,300,.6);LBL(S,'MY HOUSE',110,330,18);flag(S,120,500,1.4,MSAF);LBL(S,'MY COUNTRY',150,520,18);scroll(S,760,170,120,70);LBL(S,'MY DEGREES',820,270,18);
   S.g();S.S(rect(780,390,90,34),{tone:[1,.6],col:'#f2d2c8',lw:1.4});S.L([[800,396],[800,418]],{lw:1,col:MRED});S.L([[850,396],[850,418]],{lw:1,col:MRED});LBL(S,'MY WOUNDS',825,460,18,MRED);
   [[[200,280],[380,260]],[[200,470],[400,330]],[[740,230],[580,240]],[[770,410],[580,320]]].forEach(([a,b])=>arrowL(S,a,b,{lift:16,lw:2.2,col:MSAF}));
   TXT(S,[['ego fattening',36,{FATTENING:MRED}]],30,30,400);}),
 pn(4,S=>{wash(S,480,300,380,'rgba(200,220,255,.9)',.3);floor(S,470);[90,60,40,24,14].forEach((r,k)=>{const x=110+k*180;egoBalloon(S,x,470,r,MRED,r>20?'I':'');person(S,x,540,.5,{head:'hair',col:MBLU});});
   LBL(S,'THE EGO FLOOR',830,250,24,MPUR);arrowL(S,[830,262],[830,330],{lift:0,lw:2,col:MPUR});
   TXT(S,[['ego thinning',36,{THINNING:MGRN}],['never zero while the body lives',22]],30,30,520);}),
];

MURAL.mind=[
 pn(0,S=>{wash(S,480,300,380,'rgba(180,200,240,.9)',.3);floor(S,470);chowki(S,420,470,.9);S.g();S.S(rect(330,330,180,110),{tone:[1,.8],col:'#f2e6c8',lw:1.8});S.L([[420,330],[420,440]],{lw:1.4});LBL(S,'DIFFICULT',420,300,22,MRED);
   person(S,600,470,.9,{head:'hair',col:MPUR,arms:'down',emo:'weak'});zzz(S,650,250,1.2);S.g();S.S(rect(760,120,150,120),{tone:[1,.8],col:'#2a3a5a',lw:2});S.L([[835,120],[835,240]],{lw:2});S.S(ell(800,160,16,16,14),{rad:1,tone:[1,.6],col:'#f4f0c8',lw:1});clock(S,560,170,34);diya(S,500,330,.5);egoBalloon(S,780,470,46,MRED,'I');S.g();S.L(bz([780,380],[740,320],[680,300],[630,320],12),{lw:1.6,col:MRED,any:1});
   TXT(S,[['drowsiness:',32],['the ego’s escape',32,{ESCAPE:MRED}]],30,30,400);}),
 pn(2,S=>{wash(S,480,300,380,'rgba(200,220,200,.9)',.3);floor(S,470);dynamo(S,330,470,1.05);LBL(S,'THE MIND',300,150,30,MBLU);LBL(S,'MEMORY · INTELLECT',300,182,18);LBL(S,'AN INNOCENT MACHINE',360,510,20,MGRN);
   person(S,700,470,.9,{head:'hair',col:MRED,arms:'out'});egoBalloon(S,760,330,40,MRED,'I');S.g();S.L([[640,350],[520,400]],{lw:3,col:MINK});LBL(S,'THE SENIOR PARTNER',720,140,22,MRED);
   TXT(S,[['only the ego has agency',30,{EGO:MRED}]],30,30,500);}),
 pn(4,S=>{wash(S,480,300,380,'rgba(255,200,180,.9)',.3);plaque(S,300,300,200,'THE MIND',MBLU);strikeL(S,220,294,160);plaque(S,660,300,200,'THE EGO',MRED);S.g();S.L(ell(660,302,130,60,30),{lw:3,col:MRED,any:1});
   person(S,480,520,.7,{head:'hair',col:MPUR,emo:'sorrow'});arrowL(S,[520,400],[600,340],{lift:10,lw:2.4,col:MRED});
   TXT(S,[['suffering: blame the right party',30,{RIGHT:MRED}]],30,30,600);}),
];

MURAL.axes=[
 pn(0,S=>{wash(S,480,320,380,'rgba(255,214,120,.9)',.3);plane(S,40,520,880,240);
   moneybag(S,200,440,.8);person(S,140,450,.5,{head:'hair',col:MSAF});LBL(S,'SHOPKEEPER',170,500,16);
   [MRED,MBLU,MGRN,MPUR].forEach((c,k)=>book(S,470,450-k*16,.4,c));person(S,410,450,.5,{head:'hair',col:MBLU});LBL(S,'STUDENT',450,500,16);
   fire(S,760,440,.6);person(S,700,450,.5,{head:'hair',col:'#f2ead8'});LBL(S,'PILGRIM',740,500,16);
   [[240,360],[520,360],[790,360]].forEach(([x,y])=>{arrowL(S,[x-60,y],[x+60,y],{lift:0,lw:2.4,col:MSAF});LBL(S,'MORE',x,y-14,16,MSAF);});
   TXT(S,[['the horizontal: change',32,{HORIZONTAL:MSAF}],['gaining, achieving, collecting',22]],30,30,600);}),
 pn(2,S=>{wash(S,480,330,380,'rgba(220,210,190,.9)',.3);plane(S,40,520,880,240);for(let k=0;k<6;k++){const a=k/6*Math.PI*2;person(S,480+Math.cos(a)*300,430+Math.sin(a)*60,.4,{head:'hair',col:C[k]});}
   S.g();S.L(ell(480,420,330,70,40),{lw:2,col:MSAF,any:1});arrowL(S,[300,354],[250,362],{lift:0,lw:2,col:MSAF});LBL(S,'THE FLAT SHEET',480,560-30,22,MPUR);
   TXT(S,[['energy spent, no height gained',30,{HEIGHT:MRED}]],30,30,600);}),
 pn(3,S=>{wash(S,480,120,260,'rgba(255,230,150,.95)',.45);plane(S,140,520,680,180,'#e2dccb');rays(S,480,90,30,90,14,{col:MYEL});
   S.g();S.L([[480,480],[480,120]],{lw:5,col:MGRN});arrowL(S,[480,170],[480,110],{lift:0,lw:5,col:MGRN});LBL(S,'Y',510,140,36,MGRN);
   egoBalloon(S,560,460,14,MRED,'');person(S,560,520,.45,{head:'hair',col:MSAF});
   TXT(S,[['the vertical: freedom',32,{VERTICAL:MGRN}],['not having more: a thinner centre',22]],30,30,440);}),
 pn(4,S=>{wash(S,480,300,380,'rgba(255,170,150,.9)',.28);S.T([['Y = F(x, z)',MINK]],480,300,90,{al:'center',font:QF,style:'italic',rot:0});strikeL(S,230,272,500);
   LBL(S,'MORE EFFORT HERE WILL NOT LIFT YOU THERE',480,400,22);plane(S,200,530,560,90,'#e2dccb');for(let k=0;k<5;k++){person(S,280+k*100,500-(k%2)*16,.32,{head:'hair',col:C[k],arms:'up'});}TXT(S,[['the biggest lie',40,{LIE:MRED}]],30,30,500);}),
];

MURAL.engine=[
 pn(0,S=>{wash(S,480,300,380,'rgba(200,200,210,.9)',.3);floor(S,470);engine(S,560,470,1.3,true);LBL(S,'FUEL: DESIRE',230,250,22,MRED);LBL(S,'COMBUSTION: ACTION',260,170,22,MSAF);
   TXT(S,[['the ego as an engine',34,{ENGINE:MINK}]],30,30,500);}),
 pn(1,S=>{wash(S,480,300,380,'rgba(255,200,150,.9)',.3);floor(S,470);engine(S,300,470,.8,true);gent(S,680,470,1,'#3a3a46',{arms:'out'});
   for(let k=0;k<5;k++)S.L([[580-k*10,330+k*24],[520-k*10,330+k*24]],{lw:2,col:MINK,any:1});arrowL(S,[760,300],[900,300],{lift:0,lw:3,col:MSAF});LBL(S,'ALWAYS GOING SOMEWHERE',740,240,20);
   TXT(S,[['the achiever: the engine roars',30,{ROARS:MSAF}]],30,30,500);}),
 pn(2,S=>{wash(S,480,300,380,'rgba(180,180,200,.9)',.3);floor(S,470);engine(S,330,470,.8,false);person(S,640,470,.8,{head:'hair',col:'#7a7a82',arms:'down',emo:'weak'});LBL(S,'LOOKS LIKE PEACE',640,220,20,MBLU);
   S.g();S.S(rect(760,330,70,90),{tone:[1,.6],col:MGRN,lw:1.6});LBL(S,'NEW HOPE',795,450,16,MGRN);arrowL(S,[760,340],[440,300],{lift:40,lw:2.4,col:MGRN});
   TXT(S,[['the dropout: the tank is empty',30,{EMPTY:MRED}],['refuel him, and the engine roars back',22]],30,30,620);}),
 pn(4,S=>{wash(S,480,330,380,'rgba(220,210,190,.9)',.3);plane(S,60,520,840,220);gent(S,320,470,.8,'#3a3a46',{arms:'out'});person(S,640,470,.8,{head:'hair',col:'#7a7a82',arms:'down'});
   LBL(S,'ACHIEVER',320,510,18);engine(S,220,470,.4,true);engine(S,780,470,.4,false);LBL(S,'DROPOUT',640,510,18);TXT(S,[['the same flat sheet',32],['losing desire is not freedom',24,{FREEDOM:MRED}]],30,30,600);}),
];

MURAL.formula=[
 pn(0,S=>{wash(S,480,280,400,'rgba(255,214,120,.9)',.35);S.T([['CHANGE',MINK]],480,220,64,{al:'center',rot:0});S.T([['=',MINK]],480,290,50,{al:'center',rot:0});
   S.T([['SEEING',MBLU]],290,370,54,{al:'center',rot:0});S.T([['+',MINK]],480,370,50,{al:'center',rot:0});S.T([['INTENT',MRED]],680,370,54,{al:'center',rot:0});
   eyeMark(S,290,450,40);fire(S,680,480,.6);rays(S,480,200,80,150,16,{col:MYEL});egoBalloon(S,120,520,30,MRED,'I');egoBalloon(S,860,520,12,MRED,'');arrowL(S,[170,400],[790,400],{lift:-30,lw:2,col:MGRN});TXT(S,[['a formula',28]],30,30,300);}),
 pn(2,S=>{wash(S,480,300,380,'rgba(180,210,255,.9)',.3);eyeMark(S,250,260,90);person(S,640,500,.9,{head:'hair',col:MPUR});
   [['BUT…',540,180],['THEY STARTED IT',760,220],['I HAD NO CHOICE',720,320]].forEach(([t,x,y])=>{thought(S,x,y,t.length*12+60,64);LBL(S,t,x,y+6,16);strikeL(S,x-t.length*6,y,t.length*12);});
   TXT(S,[['seeing: before the commentary',30,{SEEING:MBLU}]],30,30,600);}),
 pn(3,S=>{wash(S,700,200,260,'rgba(255,230,150,.95)',.4);floor(S,470);person(S,420,470,.9,{head:'hair',col:MSAF,arms:'out'});egoBalloon(S,250,470,60,MRED,'I');S.g();S.L(bz([270,360],[320,330],[360,330],[400,330],10),{lw:1.4,col:MINK,any:1});
   rays(S,760,170,30,90,12,{col:MYEL});arrowL(S,[480,300],[700,200],{lift:20,lw:3,col:MRED});LBL(S,'LET IT DISSOLVE',620,330,20,MRED);plaque(S,780,420,220,'SEEING ALONE',MINK,'not enough');strikeL(S,690,416,180);
   TXT(S,[['intent: the choice to dissolve',30,{INTENT:MRED}]],30,30,600);}),
 pn(5,S=>{wash(S,480,300,380,'rgba(255,200,180,.9)',.3);floor(S,470);S.g();S.L([[480,120],[480,470]],{lw:2,col:MINK,any:1});
   person(S,180,470,.8,{head:'hair',col:MBLU,arms:'fist'});S.g();S.S(rect(300,300,30,140),{tone:[1,.6],col:'#c8a878',lw:1.4});LBL(S,'HABIT',315,470,16);LBL(S,'WILLPOWER',240,170,28,MBLU);LBL(S,'an outside enemy',240,206,18);
   mirror(S,800,470,.75,(x,y)=>egoBalloon(S,x,y+60,26,MRED,'I'));person(S,640,470,.8,{head:'hair',col:MRED});LBL(S,'INTENT',720,150,28,MRED);LBL(S,'against itself',720,186,18);
   TXT(S,[['the real battle',30,{BATTLE:MRED}]],30,30,400);}),
];

MURAL.ledger=[
 pn(0,S=>{wash(S,480,300,380,'rgba(255,214,150,.9)',.3);ledger(S,480,480,1.4);for(let k=0;k<5;k++)coin(S,820+(k%2)*20,470-k*14,16);
   TXT(S,[['the ledger',36,{LEDGER:MRED}],['what the ego says it is owed',22]],30,30,500);}),
 pn(2,S=>{wash(S,480,300,380,'rgba(200,220,255,.9)',.3);floor(S,470);person(S,420,470,1.1,{head:'hair',col:MPUR,arms:'down'});crystal(S,460,250,28);ledger(S,640,470,.4);
   LBL(S,'COULD MOVE, BUT DOES NOT',420,140,22);TXT(S,[['strategic freeze',34,{STRATEGIC:MPUR}]],30,30,500);}),
 pn(3,S=>{wash(S,480,300,380,'rgba(200,230,200,.9)',.3);floor(S,470);person(S,250,470,1,{head:'hair',col:MBLU,arms:'down',emo:'courage'});crystal(S,290,270,28);
   clinic(S,720,470,1.1);for(let k=0;k<6;k++)S.L([[360+k*50,420],[384+k*50,420]],{lw:3,col:MINK,any:1});arrowL(S,[640,420],[680,420],{lift:0,lw:3,col:MINK});
   TXT(S,[['genuine freeze',34,{GENUINE:MBLU}],['one choice remains: find a surgeon',24,{SURGEON:MRED}]],30,30,560);}),
];

MURAL.feel=[
 pn(0,S=>{wash(S,480,300,380,'rgba(220,200,240,.9)',.3);floor(S,470);phonograph(S,480,470,1.1);musicNotes(S,430,200,1.2,MPUR);
   person(S,220,470,.85,{head:'hair',col:MSAF,emo:'sorrow'});egoBalloon(S,130,330,46,MRED,'I');LBL(S,'CONFIRMED',220,505,22,MRED);
   person(S,760,470,.85,{head:'veil',col:MBLU,emo:'peace'});egoBalloon(S,860,330,16,MRED,'');LBL(S,'LOOSENED',760,505,22,MGRN);
   TXT(S,[['two people, one song',30]],30,30,400);}),
 pn(2,S=>{wash(S,480,300,380,'rgba(255,200,200,.9)',.3);S.g();S.L([[480,140],[480,470]],{lw:2,col:MINK,any:1});chest(S,240,420,.8);tears(S,240,280,1);LBL(S,'EGOIC GRIEF',240,170,26,MPUR);LBL(S,'mourns a possession',240,206,18);
   heartGlow(S,720,320,.8,MPNK);LBL(S,'TENDERNESS',720,170,26,MPNK);LBL(S,'honours what dissolved the ego',720,206,18);
   TXT(S,[['two kinds of grief',30]],30,30,400);LBL(S,'AND JOY CAN SIT BESIDE PAIN',480,510,20,MSAF);}),
 pn(4,S=>{wash(S,480,300,380,'rgba(200,230,200,.9)',.3);floor(S,440,'#d8c8a4');seedling(S,200,440,1.4);S.g();S.S(rect(190,330,40,18),{tone:[1,.6],col:'#f2d2c8',lw:1.2});LBL(S,'MERCY: THE SYMPTOM',210,500,18);
   seedling(S,440,440,1.4);S.g();for(let k=0;k<4;k++)S.L(bz([440,440],[440-30+k*20,470],[440-40+k*26,500],[440-50+k*34,520],8),{lw:1.6,col:'#8a5a2a',any:1});pot(S,520,380,.6,'#6a9ad0');LBL(S,'COMPASSION: THE ROOT',450,522,18,MGRN);
   S.g();S.S(ell(780,330,150,150,30),{rad:1,tone:[1,.35],col:'#f6eccf',lw:1.6});ox(S,760,380,.4,1);bird(S,720,270,1);ant(S,840,300,2);person(S,840,410,.35,{head:'hair',col:MSAF});LBL(S,'SENTIENCE',780,170,24,MPUR);
   TXT(S,[['mercy and compassion',30,{COMPASSION:MGRN}]],30,30,500);}),
];

MURAL.shivam=[
 pn(0,S=>{IN(S);wash(S,480,310,400,'rgba(255,214,120,.9)',.35);S.g();S.S(ell(480,330,330,160,40),{rad:1,tone:[.6,.25],col:'#f6d48a',lw:1.4});
   palmleaf(S,90,240,230,70);DV(S,'सत्यम्',205,285,32,MSAF);LBL(S,'TRUTH: NOT FALSE',205,350,18);
   palmleaf(S,365,180,230,70);DV(S,'शिवम्',480,225,32,MSAF);trident(S,480,440,.8);LBL(S,'WHAT SERVES DISSOLUTION',480,470,18,MRED);
   palmleaf(S,640,240,230,70);DV(S,'सुन्दरम्',755,285,32,MSAF);lotus(S,755,420,.8);LBL(S,'BEAUTY: NOT UGLY',755,350,18);
   TXT(S,[['three names for one principle',28,{ONE:MSAF}]],30,48,600);}),
 pn(3,S=>{IN(S);wash(S,480,300,380,'rgba(200,220,255,.9)',.3);floor(S,470);easel(S,560,470,1.3);S.g();const n=40;for(let k=0;k<n;k+=2){const a0=k/n*Math.PI*2,a1=(k+1)/n*Math.PI*2;S.L(ell(320,360,60,110,3,a0,a1),{lw:2,col:'#b8ae96',any:1});}
   LBL(S,'?',320,300,40,'#b8ae96');veena(S,820,470,.6);TXT(S,[['creating without a creator',30,{CREATOR:MPUR}],['great art is made in the ego’s absence',22]],30,48,620);}),
];

MURAL.teacher=[
 pn(0,S=>{IN(S);wash(S,480,300,380,'rgba(255,214,150,.9)',.3);floor(S,470);person(S,250,470,.9,{head:'hair',col:MBLU,arms:'fist'});plaque(S,140,220,170,'CONTESTANT',MBLU);plaque(S,360,220,170,'REFEREE',MRED);S.g();S.L([[140,250],[230,310]],{lw:1.2,col:MINK,any:1});S.L([[360,250],[270,310]],{lw:1.2,col:MINK,any:1});
   S.g();[MRED,MBLU,MGRN].forEach((c,k)=>book(S,660,460-k*16,.45,c));palmleaf(S,720,330,150,46);chowki(S,840,470,.6);samai(S,900,470,.4);LBL(S,'AN OUTSIDE REFERENCE',760,250,20,MGRN);
   TXT(S,[['the ego cannot judge itself',30,{ITSELF:MRED}]],30,48,600);}),
 pn(1,S=>{IN(S);wash(S,480,160,300,'rgba(255,230,150,.95)',.45);sun(S,480,140,60);rays(S,480,140,70,200,22,{col:MYEL});
   crowd(S,60,900,540,.6,7,{});LBL(S,'WHO IS READY TO BE DISTURBED?',480,320,20,MSAF);TXT(S,[['the sun shines without bias',30,{SUN:MSAF}]],30,48,500);}),
 pn(2,S=>{IN(S);wash(S,480,300,380,'rgba(200,220,255,.9)',.3);floor(S,470);person(S,330,470,.95,{head:'hair',col:MPUR});mirror(S,620,470,.95,(x,y)=>{person(S,x,y+100,.4,{head:'hair',col:MPUR});});chowki(S,840,470,.6);samai(S,900,470,.4);palmleaf(S,760,330,140,44);diya(S,170,470,.5);
   TXT(S,[['a mirror and a catalyst',32,{MIRROR:MBLU}],['trust given a little at a time',22]],30,48,600);}),
 pn(4,S=>{IN(S);wash(S,480,300,380,'rgba(255,214,120,.9)',.3);palmleaf(S,330,200,300,90);DV(S,'गीता',480,262,46,MSAF);fluteFeather(S,200,500,1.1);conch(S,600,430,.9);chakra(S,800,400,70);
   TXT(S,[['complete when no longer needed',30,{COMPLETE:MGRN}]],30,48,600);}),
];

MURAL.others=[
 pn(0,S=>{wash(S,480,300,380,'rgba(220,210,190,.9)',.3);for(let k=0;k<6;k++){const x=110+k*150;book(S,x,470,.8,C[k]);}LBL(S,'MANY TRADITIONS',480,300,30,MPUR);palmleaf(S,60,360,110,34);stupa(S,260,400,.3);flowerOfLife(S,410,370,22);column(S,560,420,80,.5);book(S,710,380,.4,MBLU);crownX(S,860,370,.4);TXT(S,[['among the philosophers',32]],30,30,500);}),
 pn(1,S=>{IN(S);wash(S,480,300,380,'rgba(255,214,120,.9)',.3);floor(S,470);
   palmleaf(S,60,170,240,70);DV(S,'अद्वैत',180,215,30,MSAF);kamandalu(S,370,470,.7);seated(S,200,470,.6,'#f2ead8');strikeL(S,140,370,120);LBL(S,'SAKSHI, THE WITNESS:',200,262,16,MRED);LBL(S,'THE EGO’S LAST REFUGE',200,282,16,MRED);LBL(S,'SHANKARA',180,140,20);
   stupa(S,700,470,.8);chakra(S,840,300,46);LBL(S,'NAGARJUNA',720,140,20);LBL(S,'ROOT: THE BODY, NOT THOUGHT',720,520,16,MRED);
   TXT(S,[['the same negation, a different diagnosis',26]],330,48,600);}),
 pn(3,S=>{wash(S,480,300,380,'rgba(200,210,230,.9)',.3);floor(S,470);
   book(S,170,450,1,MBLU);plaque(S,170,220,220,'SCHOPENHAUER',MINK,'the closest parallel');
   flowerOfLife(S,480,380,60);plaque(S,480,220,180,'JUNG',MINK,'ego fattening, refined');
   column(S,790,470,200,1);plaque(S,790,220,200,'THE STOICS',MINK,'an ego polished');
   TXT(S,[['in the West',30]],30,30,400);}),
 pn(4,S=>{wash(S,480,200,320,'rgba(255,230,150,.9)',.35);road(S,180,780,540,250);mountains(S,0,960,260,80,5,'#c8d4e0');
   person(S,500,520,.5,{head:'hair',col:MSAF});arrowL(S,[600,470],[540,320],{lift:-10,lw:3,col:MGRN});LBL(S,'A DIRECTION',650,400,20,MGRN);
   S.g();S.T([['ALREADY ENLIGHTENED',MINK]],760,150,20,{al:'center',rot:0});strikeL(S,650,144,220);LBL(S,'ENLIGHTENMENT AS A FINAL STATE',760,190,16,MRED);
   TXT(S,[['a journey without a destination',30,{JOURNEY:MGRN}]],30,30,500);}),
];

MURAL.first=[
 pn(0,S=>{wash(S,480,300,380,'rgba(200,210,230,.9)',.3);floor(S,470);church(S,130,470,.6);crownX(S,330,330,.7);scroll(S,420,360,130,80);LBL(S,'?',220,240,40,MRED);LBL(S,'?',330,250,40,MRED);LBL(S,'?',490,300,40,MRED);
   gent(S,660,470,1,'#3a3a46',{arms:'out'});lens(S,560,330,.8,-2.6);egoBalloon(S,800,470,48,MRED,'I');LBL(S,'UNEXAMINED',820,190,20,MRED);
   TXT(S,[['the rationalist questions everything,',26],['except the questioner',28,{QUESTIONER:MRED}]],30,30,560);}),
 pn(2,S=>{S.g();S.S(rect(20,20,920,500),{tone:[1,1],noline:1,col:'#f4e6d4',cA:.6});S.G(260,110,170,'rgba(255,255,255,1)',{a:.8,sx:1.7});mirror(S,780,480,1,(x,y)=>egoBalloon(S,x,y+60,30,MRED,'I'));
   S.g();[['“The ego is the',150],['first superstition.',206],['It challenges everything,',282],['except itself.”',338]].forEach(([t,y])=>S.T([[t,MINK]],60,y,40,{font:QF,style:'italic',rot:0}));
   S.T([['— The AP Framework',MSAF]],62,400,18,{font:QF,rot:0});}),
 pn(3,S=>{wash(S,480,300,380,'rgba(200,230,200,.9)',.3);[90,80,70,62,54,48].forEach((r,k)=>egoBalloon(S,110+k*150,470,r*.6,MRED,'I'));
   S.g();for(let k=0;k<12;k++)S.L([[300+k*30,488],[300+k*30,512]],{lw:2,col:MINK,any:1});LBL(S,'EACH HONEST CATCHING',480,532,16);clock(S,860,170,34);eyeMark(S,780,180,22);
   TXT(S,[['weaker, by a fraction',32,{FRACTION:MGRN}],['no faith, no technique, only honest seeing',22]],30,30,600);}),
 pn(5,S=>{wash(S,480,200,360,'rgba(255,230,150,.95)',.45);rays(S,480,200,60,240,20,{col:MYEL});cage(S,480,500,1.6);S.g();S.L([[400,280],[330,330]],{lw:3,col:'#6a6a72'});releaseBirds(S,480,470,1.4);
   TXT(S,[['for a moment, the prisoner is absent',28,{ABSENT:MSAF}],['that is enough',24]],30,30,560);}),
];

/* emotion corrections */
Object.entries({engine:{0:'neutral'},formula:{3:'neutral'}}).forEach(([id,m])=>Object.entries(m).forEach(([i,e])=>{MURAL[id][+i].emo=e;}));

Object.keys(MURAL).forEach(id=>{SC[id]=muralScene(id);});
