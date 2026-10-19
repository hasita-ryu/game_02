(()=>{
'use strict';
const css=document.createElement('style');
css.textContent=`
#human-ending-fade{position:fixed;inset:0;background:#120f0e;opacity:0;pointer-events:none;z-index:9000;transition:opacity 8s linear}
#human-ending-result{position:fixed;inset:0;z-index:9001;background:#120f0e;opacity:0;pointer-events:none;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1.2vh;color:#eee7dc;transition:opacity 1.2s ease}
#human-ending-result.visible{opacity:1;pointer-events:auto}
#human-ending-result .hint{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:700;letter-spacing:.22em;font-size:clamp(11px,1.2vw,22px);opacity:.5;font-style:normal}
#human-ending-result .heading{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-style:normal;font-weight:800;font-size:clamp(70px,12vw,220px);letter-spacing:.03em;line-height:1.12;transform:skew(-5deg)}
#human-ending-result .name{font-family:'Barlow Condensed','Roboto Condensed','Arial Narrow',sans-serif;font-size:clamp(18px,2.6vw,48px);letter-spacing:.1em;font-weight:800;transform:skew(-5deg)}
#human-ending-result .verify{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-style:normal;color:#97a885;font-size:clamp(12px,1.2vw,24px);letter-spacing:.12em;font-weight:700}
#human-ending-result .line{width:min(50vw,650px);height:1px;background:#675d53;margin:3vh 0}
#human-ending-result .amount{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-style:normal;color:#a4b791;font-size:clamp(45px,6vw,112px);transform:skew(-5deg);font-weight:800;opacity:0;transition:opacity 1s ease}
#human-ending-result .amount.show{opacity:1}
#human-ending-result button{border:1px solid #776c60;background:transparent;color:#d2c6b8;padding:8px 22px;cursor:pointer;letter-spacing:.2em;margin-top:3vh}`;
document.head.append(css);
let ending=false;
const fade=document.createElement('div');fade.id='human-ending-fade';
const result=document.createElement('section');result.id='human-ending-result';
result.innerHTML='<div class="hint">CALL VERIFICATION RESULT</div><div class="heading">HUMAN</div><div class="name">B. CARTER</div><div class="verify">VERIFIED AS HUMAN</div><div class="line"></div><div class="hint">JUDGMENT RESULT</div><div class="amount">+ ¥0</div><button type="button" id="human-replay">REPLAY</button>';
document.body.append(fade,result);
result.querySelector('#human-replay').addEventListener('click',()=>location.reload());
const dialogue=[['CALLER','そういえば、この前話してた近所の店、まだあるのか？'],['YOU','ああ、あるよ。最近はあまり行ってないけど。'],['CALLER','この間久しぶりに寄ったんだ。内装が少し変わってたよ。'],['YOU','そうなのか。前は結構古い感じだったよな。'],['CALLER','そうそう。でも、いつもの席はそのままだった。'],['YOU','それはいいな。あそこ、妙に落ち着くんだよ。'],['CALLER','分かるよ。コーヒーの味も変わってなかった。'],['YOU','ああ、それ聞いたらまた行きたくなってきた。']];
document.addEventListener('click',function(ev){
 const btn=ev.target.closest('.judge-button');
 if(!btn||btn.dataset.judgment!=='human'||ending)return;
 ev.preventDefault();ev.stopImmediatePropagation();ending=true;
 clearTalkTimers();state.menu=false;state.talk=true;state.call=true;state.panel='profile';state.messages=[];render();
 const notice=document.getElementById('judge-notice');if(notice)notice.textContent='';
 dialogue.forEach(([who,msg],i)=>window.setTimeout(()=>appendMessage(who,msg),650+i*1250));
 window.setTimeout(()=>fade.style.opacity='1',4400);
 window.setTimeout(()=>result.classList.add('visible'),12600);
 window.setTimeout(()=>result.querySelector('.amount').classList.add('show'),13800);
},true);
})();