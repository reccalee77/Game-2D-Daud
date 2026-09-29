export const TYPES={serigala:{hp:40,speed:145,range:70,wind:.5},singa:{hp:90,speed:110,range:100,wind:.8},beruang:{hp:180,speed:60,range:120,wind:1},goliat:{hp:900,speed:50,range:170,wind:1}};
const wave=(w,l=0,b=0)=>[...Array(w).fill('serigala'),...Array(l).fill('singa'),...Array(b).fill('beruang')];
export const STAGES=[
 {name:'Padang Gembala',subtitle:'Sebuah keberanian kecil.',bg:'padang',waves:[wave(3),wave(4),wave(6)],cap:3,interval:2.5},
 {name:'Senja di Perbukitan',subtitle:'Dengarkan auman di kejauhan.',bg:'perbukitan',waves:[wave(4),wave(3,1),wave(4,2)],cap:4,interval:2.2},
 {name:'Jalur Berbatu',subtitle:'Kekuatan bukan segalanya.',bg:'perbukitan',waves:[wave(4,0,1),wave(0,2,1),wave(4,1,2)],cap:5,interval:2},
 {name:'Lembah Penjagaan',subtitle:'Bertahan bersama kawanan.',bg:'lembah_goliat',waves:[wave(6,1),wave(0,2,2),wave(6,2,1),wave(4,2,2)],cap:6,interval:1.8},
 {name:'Hadapan Goliat',subtitle:'Satu batu. Keberanian yang besar.',bg:'lembah_goliat',waves:[wave(4,1),wave(0,1,1),['goliat']],cap:4,interval:2}
];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export class Game {
 constructor(random=Math.random){this.random=random;this.state='menu';this.stage=0;this.time=0;this.events=[];this.enemies=[];this.shots=[];this.pickups=[];this.effects=[];this.player={x:470,face:1,anim:'idle',animTime:0,strideDistance:0};this.sheep=5;this.inventory=[1,0,0];this.shield=0;this.speed=0;this.wave=0;this.queue=[];this.spawnIn=0;this.breakTime=0;this.notice='';this.ammo=5;this.stoneSpawnIn=5;}
 start(stage=0){const rng=this.random;Object.assign(this,new Game(rng));this.stage=clamp(stage,0,4);this.state='playing';Object.assign(this.player,{stun:0,immune:0,cooldown:0,slingCooldown:0,charge:null,staffCharge:null,action:null,combo:0,comboAt:-1,buffer:false});this.inventory=this.stage===0?[1,0,0]:[1,1,1];this.flockImmune=0;this.itemCooldown=0;this.kills=0;this.beginWave();this.breakTime=3;this.say('Lindungi kelima domba. Cegat musuh sebelum mendekat!',4);}
 say(text,seconds=2.5){this.notice=text;this.noticeTime=seconds;}
 emit(type,x,value){this.events.push({type,x,value});}
 animate(e,state){if(e.anim!==state){e.anim=state;e.animTime=0;}}
 beginWave(){this.queue=[...STAGES[this.stage].waves[this.wave]];if(this.stage>0&&this.queue[0]!=='goliat')this.queue.sort(()=>this.random()-.5);this.spawnIn=1.2;this.spawnCount=0;this.breakTime=0;this.say(`Gelombang ${this.wave+1} — bersiap!`);}
 side(){if(this.stage===0&&this.wave<2)return this.wave===0?-1:1;return (this.spawnCount+this.wave)%2===0?-1:1;}
 spawn(type,side=this.side()){const e={type,x:side<0?-55:1335,face:-side,hp:TYPES[type].hp,max:TYPES[type].hp,anim:'idle',animTime:0,strideDistance:0,mode:'move',timer:0,dead:false,cycle:0,weak:false,phase:1};this.enemies.push(e);return e;}
 pause(){if(this.state==='playing'){this.state='paused';this.player.charge=null;this.player.staffCharge=null;this.animate(this.player,'idle');}else if(this.state==='paused')this.state='playing';}
 attack(kind,power=0){const p=this.player;if(this.state!=='playing'||p.stun>0||p.charge!==null||p.staffCharge!==null)return false;
  if(p.action){if(kind==='punch'&&p.action.kind==='punch'&&this.time-p.comboAt<=.45)p.buffer=true;return false;}
  const second=kind==='punch'&&p.combo===1&&this.time-p.comboAt<=.45;
  const spec=kind==='punch'?{duration:.3,hit:.1,range:65,damage:second?15:10,push:18,anim:second?'punch_2':'punch_1'}:kind==='kick'?{duration:.65,hit:.22,range:80,damage:12,push:90,anim:'kick'}:{duration:.8,hit:.25,range:130,damage:25+35*clamp(power,0,1),push:28+42*clamp(power,0,1),anim:'staff_attack'};
  p.action={...spec,kind,t:0,face:p.face,hitDone:false};if(kind==='punch'){p.combo=second?0:1;p.comboAt=this.time;}this.animate(p,spec.anim);p.animTime=0;return true;
 }
 staffStart(){const p=this.player;if(this.state!=='playing'||p.action||p.stun>0||p.charge!==null||p.staffCharge!==null)return false;p.staffCharge=0;this.animate(p,'staff_attack');p.animTime=0;return true;}
 staffRelease(){const p=this.player;if(this.state!=='playing'||p.staffCharge===null)return false;const power=Math.min(1,p.staffCharge);p.staffCharge=null;return this.attack('staff',power);}
 chargeStart(){const p=this.player;if(this.state==='playing'&&!p.action&&p.stun<=0&&p.slingCooldown<=0&&p.staffCharge===null&&p.charge===null){if(this.ammo<=0){this.say('Batu habis! Ambil batu di tanah atau gunakan serangan jarak dekat.');return;}p.charge=0;this.animate(p,'sling_charge');}}
 release(){const p=this.player;if(this.state!=='playing'||p.charge===null)return;const full=p.charge>=.8;p.charge=null;if(this.ammo<=0)return;this.ammo--;p.slingCooldown=.7;this.shots.push({x:p.x+p.face*25,start:p.x,face:p.face,full,dead:false});p.action={kind:'release',duration:.4,hit:99,t:0,face:p.face,hitDone:true};this.animate(p,'sling_release');p.animTime=0;this.emit('sling',p.x);}
 item(i){if(this.state!=='playing'||this.inventory[i]<1||this.itemCooldown>0)return false;
  if(i===0&&this.shield>0||i===2&&this.speed>0)return false;
  if(i===1){const targets=this.enemies.filter(e=>!e.dead&&Math.abs(e.x-this.player.x)<=280);if(!targets.length){this.say('Dekati musuh sebelum memakai Hujan Panah.');return false;}for(const e of targets)this.damage(e,e.type==='goliat'?90:e.hp,'arrow',0);this.effects.push({kind:'arrows',x:this.player.x,t:1});}
  if(i===0){this.shield=15;this.say('Kawanan terlindungi selama 15 detik.');}
  if(i===2){this.speed=8;this.say('Kasut aktif — gerak lebih cepat!');}
  this.inventory[i]--;this.itemCooldown=.5;this.emit('item',this.player.x,i);return true;
 }
 damage(e,amount,kind,push=0){if(e.dead)return;const boss=e.type==='goliat';if(boss&&kind!=='arrow')amount*=kind==='full'&&e.weak?3:.5;
  e.hp=Math.max(0,e.hp-amount);this.emit('hit',e.x,Math.round(amount));this.effects.push({kind:'hit',x:e.x,t:.3});
  if(e.hp<=0){e.dead=true;e.mode='dead';e.timer=1;this.animate(e,'defeat');this.lastDefeated=e;this.kills++;if(kind!=='arrow'&&this.random()<.15)this.drop(e.x,this.random()<.4?0:this.random()<.42?1:2);return;}
  const stagger=boss?kind==='full'&&e.weak:e.type!=='beruang'||kind==='kick'||kind==='full';
  if(stagger){e.mode='stun';e.timer=boss?1.2:.28;e.weak=false;this.animate(e,'hurt');e.x=clamp(e.x+Math.sign(e.x-this.player.x)*push*(e.type==='beruang'?.5:1),10,1270);}
 }
 drop(x,item){this.pickups.push({x:clamp(x,45,1235),item,t:12});}
 loseSheep(){if(this.shield>0||this.flockImmune>0||this.sheep<=0)return false;this.sheep--;this.flockImmune=2;this.emit('sheep',640);this.say('Seekor domba lari! Lindungi yang tersisa.');return true;}
 hitPlayer(e){const p=this.player;if(p.immune>0)return;p.x=clamp(p.x+Math.sign(p.x-e.x||1)*40,25,1255);p.stun=.35;p.immune=1;p.charge=null;p.staffCharge=null;p.action=null;p.buffer=false;this.animate(p,'hurt');this.emit('hurt',p.x);}
 updateEnemy(e,dt){e.animTime+=dt;if(e.dead){e.timer-=dt;return;}
  if(e.mode==='stun'){e.timer-=dt;if(e.timer<=0)e.mode='move';return;}
  if(e.type==='goliat'){this.updateBoss(e,dt);return;}
  if(e.mode==='recover'){e.timer-=dt;if(e.timer<=0)e.mode='move';return;}
  if(e.mode==='pounce'){const step=Math.min(e.travel,550*dt);e.x+=e.face*step;e.travel-=step;if(Math.abs(e.x-640)<=70){e.mode='wind';e.target='flock';e.wind=e.timer=1.2;this.animate(e,'idle');}else if(Math.abs(e.x-this.player.x)<75){this.hitPlayer(e);e.mode='recover';e.timer=1;}else if(e.travel<=0){e.mode='recover';e.timer=1;}return;}
  if(e.mode==='wind'){
   e.timer-=dt;if(e.timer<=0){if(e.type==='singa'&&e.target==='player'){e.mode='pounce';e.travel=220;this.animate(e,'pounce');return;}if(e.target==='flock'){this.loseSheep();}else if(Math.abs(this.player.x-e.x)<=TYPES[e.type].range+30)this.hitPlayer(e);this.animate(e,e.type==='serigala'?'attack':e.type==='singa'?'pounce':'swipe');e.mode='recover';e.timer=e.target==='flock'?2:.8;}return;
  }
  e.face=e.x<640?1:-1;const p=this.player;const nearFlock=Math.abs(e.x-640)<=70;const inFront=(p.x-e.x)*e.face>=-10;
  if(nearFlock||Math.abs(e.x-p.x)<TYPES[e.type].range&&inFront&&p.immune<=0){e.target=nearFlock?'flock':'player';e.mode='wind';e.wind=e.timer=nearFlock?1.2:TYPES[e.type].wind;this.animate(e,e.type==='singa'?'roar':'idle');return;}
  e.x+=e.face*TYPES[e.type].speed*dt;this.animate(e,e.type==='beruang'?'walk':'run');
 }
 updateBoss(e,dt){
  if(e.mode==='wind'){e.timer-=dt;if(e.timer<=0){if(e.target==='throw')this.loseSheep();else{if(Math.abs(this.player.x-e.x)<180)this.hitPlayer(e);if(Math.abs(e.x-640)<180)this.loseSheep();}e.weak=false;e.mode='recover';e.timer=e.phase===3?.65:1.5;this.animate(e,e.target==='throw'?'throw':'swing');}return;}
  if(e.mode==='recover'){e.timer-=dt;if(e.timer<=0){e.mode='weak';e.timer=e.phase===3?3:2.5;e.weak=true;this.animate(e,e.phase===3?'exhausted':'taunt');this.say('Dahi terbuka! Tahan Space, lalu lepaskan.',2);}return;}
  if(e.mode==='weak'){e.timer-=dt;if(e.timer<=0){e.weak=false;e.mode='move';}return;}
  e.phase=e.hp>540?1:e.hp>270?2:3;e.face=e.x>this.player.x?-1:1;
  if(e.x>860){e.x-=55*dt;this.animate(e,'walk');return;}
  e.cycle++;e.target=e.phase>1&&e.cycle%2===0?'throw':'swing';e.mode='wind';e.wind=e.timer=e.target==='throw'?2:1;e.weak=e.target==='throw';this.animate(e,e.target==='throw'?'throw':'idle');
 }
 update(dt,input={}){
  dt=Math.min(dt,.05);if(this.state==='celebrating'){this.cinematic.elapsed=Math.min(5,this.cinematic.elapsed+dt);this.player.animTime+=dt*.65;for(const e of this.enemies)if(e.dead)e.animTime+=dt*.2;if(this.cinematic.elapsed>=5)this.state='won';return;}
  if(this.state!=='playing')return;this.time+=dt;this.events=[];this.noticeTime=Math.max(0,(this.noticeTime||0)-dt);const p=this.player;
  const oldShield=this.shield;this.shield=Math.max(0,this.shield-dt);this.speed=Math.max(0,this.speed-dt);this.flockImmune=Math.max(0,this.flockImmune-dt);this.itemCooldown=Math.max(0,this.itemCooldown-dt);
  if(oldShield>0&&this.shield===0)for(const e of this.enemies)if(e.target==='flock'&&e.mode==='wind'){e.timer=1.2;e.wind=1.2;}
  p.stun=Math.max(0,p.stun-dt);p.immune=Math.max(0,p.immune-dt);p.slingCooldown=Math.max(0,p.slingCooldown-dt);p.animTime+=dt;
  const startX=p.x;const move=(input.right?1:0)-(input.left?1:0);if(p.stun<=0){if(move){if(!p.action)p.face=move;p.x=clamp(p.x+move*240*(this.speed>0?1.5:1)*(p.action||p.charge!==null||p.staffCharge!==null?.6:1)*dt,25,1255);}if(p.charge!==null)p.charge=Math.min(1.2,p.charge+dt);if(p.staffCharge!==null){p.staffCharge=Math.min(1,p.staffCharge+dt);p.animTime=Math.min(p.staffCharge,.09);}
   if(p.action){const a=p.action;a.t+=dt;if(!a.hitDone&&a.t>=a.hit){a.hitDone=true;let targets=this.enemies.filter(e=>!e.dead&&(e.x-p.x)*a.face>=-15&&Math.abs(e.x-p.x)<=a.range).sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x));if(a.kind!=='staff')targets=targets.slice(0,1);for(const e of targets)this.damage(e,a.damage,a.kind,a.push);this.emit('swing',p.x);}
    if(a.t>=a.duration){p.action=null;if(p.buffer){p.buffer=false;this.attack('punch');}}}
   if(!p.action&&p.charge===null&&p.staffCharge===null)this.animate(p,move?'run':'idle');
  }
  if(p.anim==='run')p.strideDistance+=Math.abs(p.x-startX);
  for(const shot of this.shots){const before=shot.x;shot.x+=shot.face*800*dt;const targets=this.enemies.filter(e=>!e.dead&&e.x>=Math.min(before,shot.x)-20&&e.x<=Math.max(before,shot.x)+20).sort((a,b)=>Math.abs(a.x-before)-Math.abs(b.x-before));if(targets.length){this.damage(targets[0],shot.full?45:20,shot.full?'full':'stone',shot.full?45:18);shot.dead=true;}if(Math.abs(shot.x-shot.start)>650)shot.dead=true;}
  this.shots=this.shots.filter(s=>!s.dead);
  for(const e of this.enemies){const before=e.x;this.updateEnemy(e,dt);if(e.anim==='walk'||e.anim==='run')e.strideDistance+=Math.abs(e.x-before);}this.enemies=this.enemies.filter(e=>!e.dead||e.timer>0);
  this.stoneSpawnIn-=dt;if(this.stoneSpawnIn<=1e-9){this.stoneSpawnIn+=5;this.pickups.push({x:60+this.random()*1160,item:'stone',t:20});}
  for(const pickup of this.pickups){pickup.t-=dt;if(Math.abs(pickup.x-p.x)<38){if(pickup.item==='stone'){this.ammo++;pickup.t=0;this.emit('pickup',p.x);this.say('+1 batu umban',1.2);}else if(this.inventory[pickup.item]<2){this.inventory[pickup.item]++;pickup.t=0;this.emit('pickup',p.x);}}}
  this.pickups=this.pickups.filter(i=>i.t>0);for(const f of this.effects)f.t-=dt;this.effects=this.effects.filter(f=>f.t>0);
  if(this.sheep===0){this.state='lost';return;}
  if(this.breakTime>0){this.breakTime=Math.max(0,this.breakTime-dt);return;}
  const live=this.enemies.filter(e=>!e.dead);
  if(this.queue.length){if(live.length<STAGES[this.stage].cap){this.spawnIn-=dt;if(this.spawnIn<=0){const type=this.queue.shift();this.spawn(type,type==='goliat'?1:this.side());this.spawnCount++;this.spawnIn=STAGES[this.stage].interval;}}}
  else if(!live.length){if(this.wave===STAGES[this.stage].waves.length-1){this.state='celebrating';this.cinematic={elapsed:0,enemyX:this.lastDefeated?.x??p.x};p.action=null;p.charge=null;p.staffCharge=null;p.stun=0;p.immune=0;this.shots=[];this.effects=[];for(const e of this.enemies)if(e.dead){e.animTime=0;e.timer=1;}this.animate(p,'victory');p.animTime=0;this.emit('win',p.x);}else{if(this.stage===0&&this.wave<2){this.drop(p.x,this.wave===0?2:1);this.say(this.wave===0?'Ambil Kasut, lalu tekan 3 untuk berlari cepat.':'Ambil Panah, lalu tekan 2 di dekat musuh.',5);}this.wave++;this.beginWave();this.breakTime=6;}}
 }
}
