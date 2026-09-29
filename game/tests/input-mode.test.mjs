import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultInput,bindHeldButton,setupInputMode} from '../input-mode.mjs';
test('desktop and hybrid laptop prefer keyboard; phone and touch-only tablet prefer touch',()=>{
 assert.equal(defaultInput({fine:true}),'keyboard');
 assert.equal(defaultInput({coarse:true,fine:true}),'keyboard');
 assert.equal(defaultInput({coarse:true}),'touch');
 assert.equal(defaultInput({mobile:true}),'touch');
});
test('movement and charge accept simultaneous fingers; cancel never releases an attack',()=>{
 const move={setPointerCapture(){}},staff={setPointerCapture(){}};let moving=false,charging=false,shots=0;
 bindHeldButton(move,{press:()=>moving=true,release:()=>moving=false,cancel:()=>moving=false});
 bindHeldButton(staff,{press:()=>charging=true,release:()=>{charging=false;shots++;},cancel:()=>charging=false});
 const e=id=>({pointerId:id,preventDefault(){}});
 move.onpointerdown(e(1));staff.onpointerdown(e(2));assert.ok(moving&&charging);
 staff.onpointerdown(e(3));staff.onpointerup(e(3));assert.equal(shots,0);
 staff.onpointercancel(e(2));assert.equal(charging,false);assert.equal(shots,0);assert.ok(moving);
 move.onlostpointercapture(e(1));assert.equal(moving,false);
 staff.onpointerdown(e(4));staff.onpointerup(e(4));staff.onlostpointercapture(e(4));assert.equal(shots,1);
});
test('portrait blocks a mobile game; keyboard and manual mode switches remain available',()=>{
 const events={};let interrupted=0;
 globalThis.window={innerWidth:390,innerHeight:844,matchMedia:q=>({matches:q==='(pointer: coarse)'}),addEventListener:(n,fn)=>events[n]=fn};
 const buttons={'input-mode':{setAttribute(){}},fullscreen:{}};
 globalThis.document={documentElement:{dataset:{}},getElementById:id=>buttons[id]};
 const device=setupInputMode(()=>interrupted++);
 assert.equal(device.mode,'touch');assert.ok(device.blocked);
 device.keyboard();assert.equal(device.mode,'keyboard');assert.ok(device.blocked);
 window.innerWidth=844;window.innerHeight=390;events.resize();assert.equal(device.blocked,false);
 buttons['input-mode'].onclick();assert.equal(device.mode,'touch');assert.ok(interrupted>=3);
});
