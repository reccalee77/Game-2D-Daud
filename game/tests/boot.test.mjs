import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

test('client loads real metadata and assets, then runs menu and gameplay frames',async()=>{
 const root=fileURLToPath(new URL('../../',import.meta.url));
 let frame,draws=0;let elements=new Map();
 const context=new Proxy({},{get:(_,key)=>key==='drawImage'?()=>draws++:()=>{},set:()=>true});
 class Element {constructor(){this.dataset={};this.style={};this.classList={add(){},remove(){},toggle(){}};this.textContent='';this.innerHTML='';}set innerHTML(value){this.html=value;for(const id of this.childIds||[])elements.delete(id);this.childIds=[...value.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);for(const id of this.childIds)elements.set(id,new Element());}get innerHTML(){return this.html;}setAttribute(){}append(){}focus(){}getContext(){return context;}}
 const html=await fs.readFile(path.join(root,'index.html'),'utf8');
 elements=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Element()]));
 const items=[0,1,2].map(i=>Object.assign(new Element(),{dataset:{item:String(i)}}));
 globalThis.document={documentElement:{dataset:{}},getElementById:id=>elements.get(id)||null,createElement:()=>new Element(),querySelectorAll:s=>s==='[data-item]'?items:[],querySelector:s=>s==='.arena'?elements.get('game'):items[Number(s.match(/\d/)[0])],addEventListener(){}};
 globalThis.window={addEventListener(){}};globalThis.HTMLInputElement=class {};globalThis.HTMLButtonElement=class {};
 globalThis.localStorage={getItem:()=>null,setItem(){}};globalThis.requestAnimationFrame=callback=>frame=callback;
 globalThis.Image=class {set src(value){fs.access(path.join(root,value.split('?')[0])).then(()=>this.onload(),()=>this.onerror());}};
 globalThis.fetch=async value=>({ok:true,json:async()=>JSON.parse(await fs.readFile(path.join(root,value.split('?')[0]),'utf8'))});
 await import('../main.mjs');
 for(let i=0;i<100&&elements.get('start').textContent!=='Mulai perjalanan  →';i++)await new Promise(resolve=>setTimeout(resolve,5));
 assert.equal(elements.get('start').textContent,'Mulai perjalanan  →');
 frame(performance.now()+16);assert.ok(draws>5);
 elements.get('start').onclick();
 assert.match(elements.get('panel').innerHTML,/Tetapi Daud berkata/);
 assert.match(elements.get('panel').innerHTML,/1 Samuel 17:34–35/);
 for(let i=1;i<500;i++)frame(performance.now()+i*16);
 assert.equal(elements.get('chapter').textContent,'BAB 01');assert.ok(draws>1000);
 assert.equal(elements.get('enemy-count').textContent,'3 musuh tersisa');
 elements.get('gospel-continue').onclick();
 let now=performance.now()+10000;
 for(let i=0;i<5000;i++){now+=50;frame(now);if(elements.get('panel').innerHTML.includes('Coba sekali lagi'))break;}
 assert.equal(elements.get('gospel-continue'),undefined);
 assert.doesNotMatch(elements.get('panel').innerHTML,/RENUNGAN STAGE/);
 assert.match(elements.get('panel').innerHTML,/Coba sekali lagi/);
 elements.get('retry').onclick();
 frame(now+50);
 assert.equal(elements.get('gospel-continue'),undefined);
 assert.equal(elements.get('enemy-count').textContent,'3 musuh tersisa');

});
