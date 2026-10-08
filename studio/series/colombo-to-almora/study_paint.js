/* Painted-style study: four dense scenes from the Colombo lecture on one mural. */
const DEVF='"Tiro Devanagari Sanskrit",serif';
const STUDY=[
 {cap:'On the afternoon of the fifteenth of January, 1897, Swami Vivekananda lands at Colombo. The Hindus of Colombo give him a right royal reception.',
  draw:S=>{wash(S,780,130,240,'rgba(255,214,120,.9)',.45);sun(S,820,100,40);cloud(S,600,70,200,3);for(let k=0;k<7;k++)bird(S,250+k*48,70+(k%3)*18,1.1);
   mountains(S,0,420,300,110,4,'#b8c8d8');waves(S,0,960,330,8,1,'#6cbfe8');lighthouse(S,880,330,.75);steamship(S,610,330,.95);canoe(S,360,360,.8);canoe(S,830,392,.6,'#a86a3a');
   S.g();S.S([[0,410],[960,400],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col:'#e8d39a',noline:1});colonial(S,20,410,150,90);colonial(S,180,410,110,70,'#f0d0b0');palm(S,310,420,.8,.2);palm(S,930,430,.7,-.15);
   arch(S,470,470,260,140,'WELCOME');bunting(S,40,460,330,40,1);bunting(S,740,940,340,30,3);
   crowd(S,20,950,545,.62,4,{n:16,heads:['turban','hair','turban','veil','hair','turban'],arms:'up'});garland(S,600,420,60,MSAF);garland(S,250,440,50,MYEL);
   stack(S,30,20,430,[['Colombo, 15 January 1897',34,{COLOMBO:MRED}],['a right royal reception',24,{ROYAL:MSAF}]]);}},
 {cap:'Elsewhere, ideas travelled with war trumpets and embattled cohorts; each idea had to be soaked in a deluge of blood. From India, every word went out with a blessing behind it and peace before it.',
  draw:S=>{wash(S,230,280,260,'rgba(212,35,38,.9)',.22);S.g();S.S([[0,0],[470,0],[470,560],[0,560]],{tone:[.9,.6],noline:1,col:'#f3e3dc',cA:.6});
   fire(S,80,300,1.2);fire(S,400,290,1);colonial(S,100,300,80,90,'#b9a090');colonial(S,250,300,100,120,'#a89080');eagleStandard(S,420,330,.7);
   for(let k=0;k<4;k++)hoplite(S,60+k*100,440,.55);trumpet(S,40,180,1,-.3);trumpet(S,190,150,.8,-.5);waves(S,0,470,430,12,2,MRED);helmetX(S,120,500,.8,.4);sword(S,250,500,100,-.3);helmetX(S,380,510,.7,-.6);
   stack(S,30,20,420,[['“Each idea had to be soaked in a deluge of blood.”',24,{BLOOD:MRED}]]);
   wash(S,720,280,260,'rgba(255,214,120,.95)',.4);sun(S,760,140,44);mountains(S,490,960,330,90,6,'#c8d8b0');S.g();S.S([[490,330],[960,330],[960,560],[490,560]],{tone:[.95,.6],noline:1,col:'#cfe8a8',cA:.7});
   banyan(S,880,470,.5);sage(S,570,480,.62);sage(S,650,490,.55,'#f6d8a8');for(let k=0;k<4;k++)dove(S,560+k*90,200+(k%2)*30,.9,k%2?-1:1);diya(S,780,500,.9);lotus(S,880,520,.7);lotus(S,520,530,.55);
   stack(S,500,20,430,[['a blessing behind it, and peace before it',26,{BLESSING:MSAF,PEACE:MBLU}]]);}},
 {cap:'Ask an Indian ploughman about politics and he says, what is that? Ask his religion, and he says: Look here, my friend, I have marked it on my forehead.',
  draw:S=>{wash(S,420,110,200,'rgba(255,214,120,.9)',.35);sun(S,420,90,34);mountains(S,300,960,270,80,9,'#b8d0c0');gopuram(S,540,270,.55);for(let k=0;k<4;k++)bird(S,300+k*50,110+(k%2)*20,1);
   paddy(S,0,960,270,400,2);palm(S,40,320,.75,.15);palm(S,120,300,.6,-.1);palm(S,930,300,.7,-.2);hut(S,230,300,.6);hut(S,330,295,.45);well(S,860,330,.6);
   S.g();S.S([[0,400],[960,400],[960,560],[0,560]],{tone:[.95,.6],dir:1.5,col:'#c99a62',noline:1});for(let k=0;k<8;k++)S.L([[k*130,420],[k*130+180,560]],{lw:1.2,col:'#8a5a32',any:1});
   ox(S,90,500,.85);ox(S,250,500,.85);plough(S,380,500,1);person(S,470,510,1.1,{head:'turban',col:'#f4efe4',arms:'up',mark:1});
   person(S,620,500,.62,{head:'veil',col:MPNK,arms:'hold'});pot(S,620,404,.8);person(S,700,505,.55,{head:'veil',col:MPUR,arms:'down'});pot(S,740,500,.7,'#a85a2a');
   S.g();S.S([[600,30],[930,30],[930,190],[690,190],[640,240],[660,190],[600,190]],{tone:[1,.85],dir:1.5,col:'#fffbe8',lw:2.4});stack(S,620,46,300,[['politics? what is that?',22],['“Look here, my friend, I have marked it on my forehead.”',22,{FOREHEAD:MRED}]]);
   stack(S,30,20,380,[["the ploughman's mark",30,{MARK:MRED}]]);}},
 {cap:'“They call Thee by various names; Thou art One.” — Swami Vivekananda, Colombo, 1897',
  draw:S=>{S.g();S.S(rect(20,20,900,500),{tone:[1,1],noline:1,col:'#cfe6f8',cA:.6});S.G(260,110,170,'rgba(255,255,255,1)',{a:.85,sx:1.7});S.G(780,80,150,'rgba(255,255,255,1)',{a:.85,sx:1.7});
   S.A('sv1893_chicago',520,30,.68);S.g();[['“They call Thee',200],['by various names;',256],['Thou art One.”',312]].forEach(([t,y])=>S.T([[t,MINK]],60,y,40,{font:QF,style:'italic',rot:0}));S.T([['— Swami Vivekananda, Colombo, 1897',MINK]],62,380,16,{font:QF,rot:0});}}];

const WIN=9,LOOPS=STUDY.length*WIN+3.5;
const SPANELS={};
function spanel(i){const key=(MSTYLE==='hatch'?'h':'p')+i;if(!SPANELS[key]){const S=new Scene();STUDY[i].draw(S);const P=MSTYLE==='hatch'?compileScene(S,i*17+3):compilePaint(S,i*17+3);if(!fontsOK())return P;SPANELS[key]=P;}return SPANELS[key];}
function sframe(c,t){boardBG(c);const n=STUDY.length;const cur=Math.min(n-1,Math.floor(t/WIN)),l=t-cur*WIN;
  const prog=i=>{if(i<cur)return[1,1];if(i>cur)return[0,0];if(MSTYLE!=='hatch'){const e=seg(l,.2,7.6);return[e,e];}return[seg(l,.2,4.6),seg(l,4.6,7.6)];};
  const panT=cur+1<n?eio(seg(l,8.1,9)):0;let camX=cur*PW+W/2+panT*PW,z=1;const total=(n-1)*PW+W,zf=(W-60)/total,pb=eio(seg(t,n*WIN-.6,n*WIN+.8));if(cur===n-1&&l>8){z=lerp(1,zf,pb);camX=lerp(camX,total/2,pb);}
  c.save();c.translate(W/2,H/2);c.scale(z,z);c.translate(-camX,-H/2);for(let i=0;i<=Math.min(n-1,cur+1);i++){const ox=i*PW;if(ox+W<camX-W/2/z-4||ox>camX+W/2/z+4)continue;const[a,b]=prog(i);if(a<=0&&b<=0)continue;c.save();c.translate(ox,0);renderPanel(c,spanel(i),a,b);c.restore();}c.restore();}
const cv=document.getElementById('cv'),cx=cv.getContext('2d');const dpr=Math.min(2,window.devicePixelRatio||1);cv.width=W*dpr;cv.height=H*dpr;cx.scale(dpr,dpr);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let T=reduce?17:0,playing=!reduce,last=performance.now();
const pp=document.getElementById('pp'),ph=document.getElementById('ph'),tcEl=document.getElementById('tc'),cap=document.getElementById('cap'),tl=document.getElementById('tl');
function paint(){cx.save();try{sframe(cx,T);}catch(e){console.error(e);}cx.restore();ph.style.left=(T/LOOPS*100)+'%';tcEl.textContent=T.toFixed(1)+' s';cap.textContent=STUDY[clamp(Math.floor(T/WIN),0,STUDY.length-1)].cap;}
let saved=null;try{saved=localStorage.getItem('paint-style');}catch(e){}if(saved)MSTYLE=saved;
const seg_=document.getElementById('o-style');const sync=()=>seg_.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===MSTYLE)));sync();
seg_.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;MSTYLE=b.dataset.v;sync();try{localStorage.setItem('paint-style',MSTYLE);}catch(err){}document.getElementById('desc').textContent=DESC[MSTYLE];paint();});
const DESC={gouache:'Gouache: rich colour with soft light-to-shadow gradients and a darker rim, a few highlight strokes, a thin ink outline.',flat:'Flat marker: bold flat colour with one crisp shadow band, like a modern editorial illustration.',water:'Watercolour: layered translucent washes with uneven edges and granulation; lighter ink.',hatch:'The current film: ink outlines with tone-map cross-hatching, colour afterwards.'};document.getElementById('desc').textContent=DESC[MSTYLE];
const toggle=()=>{playing=!playing;pp.textContent=playing?'Pause':'Play';};pp.textContent=playing?'Pause':'Play';pp.onclick=toggle;cv.onclick=toggle;
const scrub=e=>{const r=tl.getBoundingClientRect();T=clamp((e.clientX-r.left)/r.width)*LOOPS*.999;paint();};tl.addEventListener('pointerdown',e=>{scrub(e);tl.setPointerCapture(e.pointerId);});tl.addEventListener('pointermove',e=>{if(e.buttons)scrub(e);});
tl.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){T=(T+1)%LOOPS;paint();}if(e.key==='ArrowLeft'){T=(T+LOOPS-1)%LOOPS;paint();}});
function loop(now){const dt=Math.max(0,Math.min(.1,(now-last)/1000));last=now;if(playing){T=(T+dt)%LOOPS;paint();}requestAnimationFrame(loop);}
const fr=document.fonts?Promise.all(['40px "Patrick Hand SC"','italic 30px "Libre Baskerville"','40px "Tiro Devanagari Sanskrit"'].map(f=>document.fonts.load(f).catch(()=>{}))):Promise.resolve();
Promise.race([fr,new Promise(r=>setTimeout(r,2500))]).then(()=>{paint();requestAnimationFrame(loop);});
window.__s={setT:x=>{T=x;paint();},cv,setStyle:s=>{MSTYLE=s;sync();paint();}};
