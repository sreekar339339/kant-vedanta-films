/* ===== From Colombo to Almora: helpers shared by every film in the series ===== */
const LECT_SRC='Lectures from Colombo to Almora · CW vol. 3';
const OCHRE='#c8692c',RED='#a8382a',SEPIA='#6b5434',DEEP='#3d2e1a';
/* chart helpers (from the Kant & Vedanta series) */
function turban(c,x,y,s,a=1){if(a<=0)return;c.save();c.globalAlpha*=a;c.fillStyle='#d27a2c';c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.ellipse(x,y-(300-158)*s,58*s,34*s,0,Math.PI,0);c.lineTo(x+52*s,y-(300-170)*s);c.quadraticCurveTo(x,y-(300-160)*s,x-52*s,y-(300-170)*s);c.closePath();c.fill();c.stroke();c.restore();}
function mkproj(l0,l1,a0,a1,x0,x1,y0,y1){return(lon,lat)=>[lerp(x0,x1,(lon-l0)/(l1-l0)),lerp(y0,y1,(a0-lat)/(a0-a1))];}
function qcurve(c,a,b,lift,p,col,dash,w=2.4){const cx=(a[0]+b[0])/2,cy=Math.min(a[1],b[1])-lift;c.strokeStyle=col;c.lineWidth=w;c.setLineDash(dash||[]);c.beginPath();let last=a;for(let i=0;i<=60*p;i++){const s=i/60;last=[(1-s)**2*a[0]+2*(1-s)*s*cx+s*s*b[0],(1-s)**2*a[1]+2*(1-s)*s*cy+s*s*b[1]];i?c.lineTo(...last):c.moveTo(...last);}c.stroke();c.setLineDash([]);return last;}
function cdot(c,p,l,dx,dy,a,col='#3d2e1a',r=4.5){if(a<=0)return;c.save();c.globalAlpha*=a;c.fillStyle=col;c.beginPath();c.arc(p[0],p[1],r,0,7);c.fill();c.restore();txt(c,l,p[0]+dx,p[1]+dy,`600 12px ${MONO}`,col,dx<0?'right':'left',a);}
function chartGrid(c,proj,lons,lats){c.strokeStyle='rgba(107,84,52,.18)';c.lineWidth=1;lons.forEach(lo=>{const[x]=proj(lo,0);c.beginPath();c.moveTo(x,20);c.lineTo(x,H-20);c.stroke();});lats.forEach(la=>{const[,y]=proj(0,la);c.beginPath();c.moveTo(20,y);c.lineTo(W-20,y);c.stroke();txt(c,la+'°N',26,y-3,`10px ${MONO}`,'#6b5434');});}
function rose(c,x,y,r){c.fillStyle='#8c3a24';for(let i=0;i<8;i++){const a=i*Math.PI/4,L=i%2?r*.55:r;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a-.15)*r*.3,y+Math.sin(a-.15)*r*.3);c.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);c.lineTo(x+Math.cos(a+.15)*r*.3,y+Math.sin(a+.15)*r*.3);c.closePath();c.fill();}txt(c,'N',x,y-r-6,`600 11px ${MONO}`,'#6b5434','center');}
function polyAlong(c,pts,p){let tot=0;const L=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d;}
  const target=p*tot;let acc=0,pos=pts[0],ang=0,idx=0;c.beginPath();c.moveTo(...pts[0]);
  for(let i=1;i<pts.length;i++){const l=L[i-1];ang=Math.atan2(pts[i][1]-pts[i-1][1],pts[i][0]-pts[i-1][0]);if(acc+l<=target){c.lineTo(...pts[i]);acc+=l;pos=pts[i];idx=i;}else{const f=tot?(target-acc)/l:0;pos=[lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f)];c.lineTo(...pos);break;}}
  c.stroke();return{pos,ang,idx,cum:(()=>{let a=0;return[0,...L.map(l=>a+=l)].map(v=>tot?v/tot:0);})()};}
function standing(c,x,y,s,coat,o={}){c.save();c.translate(x,y);c.scale(s,s);c.rotate(o.lean||0);c.lineJoin='round';
  c.fillStyle=coat;c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(-34,0);c.quadraticCurveTo(-40,-120,-22,-150);c.lineTo(22,-150);c.quadraticCurveTo(40,-120,34,0);c.closePath();c.fill();c.stroke();
  c.fillStyle=o.skin||'#d79e62';c.beginPath();c.ellipse(0,-176,20,25,0,0,7);c.fill();c.stroke();
  if(o.hat){c.fillStyle=o.hat;c.beginPath();c.ellipse(0,-196,34,8,0,0,7);c.fill();c.stroke();c.fillRect(-18,-222,36,26);c.strokeRect(-18,-222,36,26);}
  else{c.fillStyle=o.hair||INK;c.beginPath();c.ellipse(0,-192,21,11,0,Math.PI,0);c.fill();}
  if(o.arm!==undefined){c.strokeStyle=INK;c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(18,-130);c.lineTo(52,-150+o.arm*-30);c.stroke();}
  if(o.mark){c.fillStyle='#b8392b';c.fillRect(-2,-196,4,12);c.fillStyle='#f7f2e6';c.fillRect(-7,-193,3,8);c.fillRect(4,-193,3,8);}
  c.fillStyle=INK;c.beginPath();c.arc(-7,-178,2.5,0,7);c.arc(7,-178,2.5,0,7);c.fill();c.restore();}
/* the Swami as seated Kalighat figure: ochre robe and turban */
function swami(c,x,y,s,dp,fp,o={}){person(c,x,y,s,dp,fp,{shawl:OCHRE,...o});turban(c,x,y,s,fp);}
/* speech bubble on paper */
function bubble(c,x,y,w,h,a,lines,o={}){if(a<=0)return;c.save();c.globalAlpha*=a;c.fillStyle=o.fill||'#fbf6ea';c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(x-w/2,y-h/2,w,h,18):c.rect(x-w/2,y-h/2,w,h);c.fill();c.stroke();
  if(o.tail){c.beginPath();c.moveTo(x+o.tail[0]-12,y+h/2-2);c.lineTo(x+o.tail[0],y+h/2+o.tail[1]);c.lineTo(x+o.tail[0]+12,y+h/2-2);c.fill();c.stroke();}
  const lh=o.lh||28;lines.forEach((l,i)=>txt(c,l,x,y-(lines.length-1)*lh/2+i*lh+8,o.font||`italic 600 22px ${DISP}`,o.col||INK,'center'));c.restore();}
/* wrap text into lines that fit width w */
function wrap(c,s,font,w){c.save();c.font=font;const out=[];let cur='';s.split(' ').forEach(wd=>{const n=cur?cur+' '+wd:wd;if(c.measureText(n).width>w&&cur){out.push(cur);cur=wd;}else cur=n;});if(cur)out.push(cur);c.restore();return out;}
function para(c,s,x,y,w,font,col,al,a,lh){wrap(c,s,font,w).forEach((l,i)=>txt(c,l,x,y+i*lh,font,col,al,a));}

/* ---------- the journey chart: one map for all 29 films ---------- */
const ROUTE=[['Colombo',79.86,6.93],['Jaffna',80.01,9.66],['Pamban',79.21,9.28],['Rameswaram',79.31,9.29],['Ramnad',78.83,9.37],['Paramakudi',78.59,9.54],['Manamadura',78.48,9.68],['Madura',78.12,9.93],['Kumbakonam',79.39,10.96],
 ['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],['Madras',80.27,13.08],
 ['Calcutta',88.36,22.57],['Calcutta',88.36,22.57],['Almora',79.66,29.6],['Almora',79.66,29.6],['Sialkot',74.53,32.49],['Lahore',74.34,31.55],['Lahore',74.34,31.55],['Lahore',74.34,31.55],
 ['Khetri',75.79,28.0],['Calcutta',88.36,22.57],['Belur',88.35,22.63],['Dacca',90.41,23.81],['Dacca',90.41,23.81]];
const COAST=[[66.6,25.4],[68.2,23.7],[69,22.3],[70,21],[72.6,21.1],[72.8,19],[73.4,16.5],[74.1,14.8],[74.8,12.8],[75.5,11.5],[76.3,9.5],[77.5,8.1],[78.2,8.9],[79.2,10.3],[79.9,11.2],[80.3,13.1],[80.1,15.5],[81.3,16.3],[82.3,17],[84.1,18.3],[85.8,19.8],[86.9,20.8],[87.4,21.6],[88.2,21.8],[89.1,21.9],[90.5,22.3],[91.8,22.4],[92.3,21],[93,19.6]];
const CEYLON=[[79.85,9.8],[80.2,9.8],[80.8,9.0],[81.3,8.3],[81.9,7.4],[81.7,6.4],[80.6,5.92],[80.0,6.2],[79.8,7.2],[79.75,8.2],[79.9,9.0],[79.85,9.8]];
const HILLS=[[71.5,35.5],[74,34.2],[76.5,33],[78.5,31.2],[80.3,30.1],[82.5,28.9],[85,28],[88,27.4],[91,27.6],[94.5,28.2]];
const CHARTPJ=mkproj(64,96,36.5,4.6,250,800,26,522);
/* uniq stops in order, with the films they belong to */
const STOPS=(()=>{const o=[];ROUTE.forEach(([n,lo,la],i)=>{const l=o[o.length-1];if(l&&l.n===n)l.films.push(i+1);else o.push({n,lo,la,films:[i+1]});});return o;})();
function journeyBase(c,a=1){parchment(c);const pj=CHARTPJ;c.save();c.globalAlpha*=a;chartGrid(c,pj,[68,72,76,80,84,88,92],[10,15,20,25,30]);
  c.strokeStyle=SEPIA;c.lineWidth=2;c.beginPath();COAST.forEach(([lo,la],i)=>{const[x,y]=pj(lo,la);i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();
  c.beginPath();CEYLON.forEach(([lo,la],i)=>{const[x,y]=pj(lo,la);i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();
  c.lineWidth=1.4;for(let i=0;i<HILLS.length-1;i++){const[a1,b1]=pj(...HILLS[i]),[a2,b2]=pj(...HILLS[i+1]);for(let k=0;k<3;k++){const f=k/3,x=lerp(a1,a2,f),y=lerp(b1,b2,f);c.beginPath();c.moveTo(x-9,y+6);c.lineTo(x,y-6);c.lineTo(x+9,y+6);c.stroke();}}
  const lab=(s,lo,la,sz=18)=>{const[x,y]=pj(lo,la);txt(c,s,x,y,`italic 500 ${sz}px ${DISP}`,'rgba(80,60,35,.55)','center');};
  lab('ARABIAN SEA',68,14);lab('BAY OF BENGAL',87,15);lab('HIMALAYAS',86.5,30.2,16);lab('INDIAN OCEAN',87,6.2,16);
  rose(c,820,440,34);c.restore();}
/* draw the route through film n's stop; p in 0..1 animates the leg into stop n; all=shows remaining route faintly */
function journeyRoute(c,n,p=1,o={}){const pj=CHARTPJ;const pts=ROUTE.map(r=>pj(r[1],r[2]));
  if(o.ahead>0){c.save();c.globalAlpha*=o.ahead;c.strokeStyle='rgba(140,58,36,.45)';c.lineWidth=1.6;c.setLineDash([2,6]);polyAlong(c,pts.slice(n-1),o.aheadP??1);c.setLineDash([]);c.restore();}
  let r={pos:pts[0],ang:0};if(n>1){c.strokeStyle='#8c3a24';c.lineWidth=2.4;c.setLineDash([3,6]);const seg_=pts.slice(0,n);r=polyAlong(c,seg_,clamp(((n-2)+p)/(n-1)));c.setLineDash([]);}
  STOPS.forEach(s=>{const first=s.films[0];if(first>n&&!(o.ahead>0))return;const[x,y]=pj(s.lo,s.la);const done=first<n||(first===n&&p>=1)||s.films.includes(n)&&p>=1;
    const a=first<=n?1:o.ahead||0;const cur=s.films.includes(n);
    if(cur&&p>=1){c.save();c.globalAlpha*=.5+.5*Math.sin((o.t||0)*3);c.strokeStyle='#8c3a24';c.lineWidth=2;c.beginPath();c.arc(x,y,11,0,7);c.stroke();c.restore();}
    if(o.labels!==false){const right=['Jaffna','Madras','Calcutta','Dacca','Kumbakonam','Colombo','Almora'].includes(s.n);const below=['Pamban','Paramakudi','Manamadura'].includes(s.n);
      const lab=s.n.toUpperCase()+(s.films.length>1?` · ${s.films[0]}–${s.films[s.films.length-1]}`:` · ${s.films[0]}`);
      if(!['Rameswaram','Ramnad','Paramakudi','Manamadura','Belur'].includes(s.n)||cur)cdot(c,[x,y],lab,right?10:-10,below?16:4,a*(done||first>n?1:.0),cur?'#8c3a24':(first>n?'rgba(107,84,52,.7)':DEEP),cur?5.5:4);
      else cdot(c,[x,y],'',0,0,a,first>n?'rgba(107,84,52,.7)':DEEP,3);}});
  return r;}
function ship(c,pos,ang,a=1){if(a<=0)return;c.save();c.globalAlpha*=a;c.translate(...pos);c.rotate(ang);c.fillStyle='#2c2116';c.beginPath();c.moveTo(13,0);c.lineTo(-9,-6);c.lineTo(-9,6);c.closePath();c.fill();c.restore();}
function logbox(c,x,y,w,rows,a=1,head="SHIP'S LOG"){if(a<=0)return;c.save();c.globalAlpha*=a;const h=26+rows.length*18;c.fillStyle='rgba(243,236,218,.94)';c.strokeStyle=SEPIA;c.lineWidth=1.5;c.fillRect(x,y,w,h);c.strokeRect(x,y,w,h);txt(c,head,x+14,y+18,`600 11px ${MONO}`,SEPIA);
  rows.forEach((r,i)=>txt(c,r,x+14,y+38+i*18,`12px ${MONO}`,i===rows.length-1?'#8c3a24':DEEP));c.restore();}
