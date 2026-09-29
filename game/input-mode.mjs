export function defaultInput({mobile=false,coarse=false,fine=false}={}) {
  return mobile || (coarse&&!fine) ? 'touch' : 'keyboard';
}
export function bindHeldButton(button,{press,release,cancel}) {
  let pointer=null;
  button.onpointerdown=e=>{
    e.preventDefault();if(pointer!==null)return;
    pointer=e.pointerId;button.setPointerCapture(pointer);press();
  };
  button.onpointerup=e=>{if(e.pointerId!==pointer)return;pointer=null;release();};
  const abort=e=>{if(e.pointerId!==pointer)return;pointer=null;cancel();};
  button.onpointercancel=abort;button.onlostpointercapture=abort;
  button.oncontextmenu=e=>e.preventDefault();
}
export function setupInputMode(onInterrupt) {
  const root=document.documentElement;
  const match=query=>window.matchMedia?.(query).matches||false;
  const nav=globalThis.navigator||{};
  const mobile=!!nav.userAgentData?.mobile||/Android|iPhone|iPad|iPod/i.test(nav.userAgent||'')||(nav.platform==='MacIntel'&&nav.maxTouchPoints>1);
  const portable=mobile||(match('(pointer: coarse)')&&!match('(any-pointer: fine)'));
  let mode=defaultInput({mobile,coarse:match('(pointer: coarse)'),fine:match('(any-pointer: fine)')});
  let blocked=false;
  const button=document.getElementById('input-mode');
  function refresh(){
    root.dataset.input=mode;root.dataset.mobile=String(portable);
    const next=portable&&window.innerHeight>window.innerWidth;
    if(next!==blocked){blocked=next;onInterrupt();}
    root.dataset.portrait=String(blocked);
    button.setAttribute('aria-label',mode==='touch'?'Beralih ke keyboard':'Beralih ke tombol sentuh');
    button.setAttribute('title',mode==='touch'?'Kontrol sentuh aktif — ganti ke keyboard':'Keyboard aktif — ganti ke sentuh');
    button.setAttribute('aria-pressed',String(mode==='touch'));
  }
  function setMode(next){if(mode!==next){onInterrupt();mode=next;refresh();}}
  async function landscape(){
    try{if(!document.fullscreenElement)await root.requestFullscreen?.();}catch{}
    try{await globalThis.screen?.orientation?.lock?.('landscape');}catch{}
    refresh();
  }
  button.onclick=()=>setMode(mode==='touch'?'keyboard':'touch');
  document.getElementById('fullscreen').onclick=landscape;
  window.addEventListener('resize',refresh);
  window.addEventListener('orientationchange',refresh);
  refresh();
  return {get mode(){return mode;},get blocked(){return blocked;},keyboard:()=>setMode('keyboard'),touch:()=>setMode('touch')};
}
