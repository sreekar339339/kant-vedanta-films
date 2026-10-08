import asyncio,sys,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':1200,'height':900})
        errs=[];pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None);pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file://'+sys.argv[1]);await pg.wait_for_timeout(1200)
        shots=await pg.evaluate('''()=>{const F=window.__film,out=[];const cv=document.getElementById('cv');
          F.CH.forEach((ch,i)=>{const end=i<F.CH.length-1?F.CH[i+1].start-1.2:F.DUR-1;const ts=ch.B.map(b=>ch.start+b+2.2).concat([end]);
            ts.forEach(T=>{F.frame(T);out.push([ch.id+' '+T.toFixed(1),cv.toDataURL('image/jpeg',.6)]);});
            F.frame(ch.start-0.6);out.push([ch.id+' wipe',cv.toDataURL('image/jpeg',.6)]);});return out;}''')
        html=''.join(f'<figure style="display:inline-block;margin:2px;width:290px"><img src="{u}" style="width:290px"><figcaption style="color:#fff;font:10px monospace">{n}</figcaption></figure>' for n,u in shots)
        await pg.set_content(f'<body style="margin:0;background:#000;width:1200px">{html}</body>')
        await pg.screenshot(path=sys.argv[2],full_page=True)
        print('errors',errs[:5],'frames',len(shots))
        await b.close()
asyncio.run(main())
