// ====== SETTINGS: apni details yahan change karein ======
const WHATSAPP = "923000000000"; // apna number (country code ke saath, bina +)
const P = {
 teddy:[["Classic Brown Bear","2 ft","Rs 2,500","🧸","#ffe0cc"],["Pink Cuddle Bear","3 ft","Rs 4,500","🧸","#ffd1e3"],["Giant Love Bear","5 ft","Rs 9,500","🧸","#ffe6f0"],["Mini Bear Keychain","Pocket size","Rs 600","🐻","#fff0c9"]],
 perfume:[["Rose Oud","50 ml","Rs 3,200","🌹","#ffd9e6"],["Vanilla Musk","100 ml","Rs 4,800","🍦","#fff2cf"],["Ocean Breeze","100 ml","Rs 3,900","🌊","#d9ecff"],["Floral Body Mist","75 ml","Rs 1,800","🌸","#f5dcff"]],
 vape:[["Mint Ice Disposable","Cool mint","Rs 3,500","💨","#d9f5ee"],["Berry Blast Pod","Mixed berry","Rs 4,200","🫐","#e3dcff"]]
};
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
$('#wa-main').href=wa("Assalam o Alaikum, Decent Gift Shop se order karna hai.");

Object.entries(P).forEach(([k,list])=>{
 $('#g-'+k).innerHTML=list.map(([n,s,p,e,bg])=>`
  <article class="card tilt"><div class="pic" style="--bg:${bg}"><span>${e}</span></div>
  <div class="info"><h4>${n}</h4><small>${s}</small>
  <div class="row"><span class="price">${p}</span>
  <a class="order" target="_blank" href="${wa('Mujhe '+n+' ('+p+') chahiye')}">Order</a></div></div></article>`).join('');
});
$('#trk').innerHTML=('<span>🎁 Free gift wrap</span><span>💌 Custom notes</span><span>🧸 Soft teddy bears</span><span>🌷 Lovely perfumes</span><span>🚚 Quick delivery</span>').repeat(4);
$$('.step').forEach((s,i)=>s.style.setProperty('--i',i));

// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.dataset.n)count(e.target)}}),{threshold:.15});
const watch=()=>{$$('.card:not(.in)').forEach((c,i)=>{c.style.transitionDelay=(i%4)*90+'ms';io.observe(c)});$$('.rv:not(.in),.stats b').forEach(c=>io.observe(c))};
watch();
function count(el){const n=+el.dataset.n,t0=performance.now();(function f(t){const p=Math.min((t-t0)/1600,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f);else el.textContent=n+(n>=300?'+':'')})(t0)}

// categories
$$('.cat').forEach(b=>b.onclick=()=>{
 $$('.cat').forEach(x=>x.classList.remove('on'));b.classList.add('on');
 const c=b.dataset.c;
 $$('.group').forEach(g=>g.classList.toggle('hide',c!=='all'&&g.dataset.g!==c));
 $$('.card').forEach(x=>x.classList.remove('in'));watch();
 $('#shop').scrollIntoView({behavior:'smooth'});
});

// ripple on buttons + toast on order
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('show'),2400)};
document.addEventListener('click',e=>{
 const b=e.target.closest('.btn,.cat,.order');if(!b)return;
 const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),d=document.createElement('span');
 d.className='rip';d.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
 b.appendChild(d);setTimeout(()=>d.remove(),650);
 if(b.classList.contains('order'))toast('Opening WhatsApp 💖');
});

// rotating hero words
const words=['birthdays','anniversaries','surprises','someone special'];let wi=0;
setInterval(()=>{const w=$('#who');w.classList.add('out');setTimeout(()=>{wi=(wi+1)%words.length;w.textContent=words[wi];w.classList.remove('out')},300)},2600);

// floating hearts
const cv=$('#hearts'),ctx=cv.getContext('2d');let hs=[];
const size=()=>{cv.width=innerWidth;cv.height=innerHeight};size();addEventListener('resize',size);
for(let i=0;i<22;i++)hs.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:8+Math.random()*14,v:.3+Math.random()*.6,o:.15+Math.random()*.25});
(function loop(){ctx.clearRect(0,0,cv.width,cv.height);
 hs.forEach(h=>{h.y-=h.v;if(h.y<-30){h.y=cv.height+20;h.x=Math.random()*cv.width}
  ctx.globalAlpha=h.o;ctx.font=h.s+'px serif';ctx.fillText('💗',h.x+Math.sin(h.y/40)*10,h.y)});requestAnimationFrame(loop)})();

// scroll: progress bar, sticky nav shrink, back-to-top
addEventListener('scroll',()=>{
 const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 $('#prog').style.width=(y/h*100)+'%';
 $('.nav').classList.toggle('small',y>60);
 $('#top-btn').classList.toggle('show',y>600);
},{passive:true});
$('#top-btn').onclick=()=>scrollTo({top:0,behavior:'smooth'});

// ====== MOUSE ANIMATIONS (desktop only) ======
if(matchMedia('(pointer:fine)').matches){
 document.body.classList.add('fine');
 let mx=0,my=0,rx=0,ry=0,last=0;
 addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  $('#cur').style.transform=`translate(${mx}px,${my}px)`;
  // hero parallax
  
  $('#art').style.setProperty('--mx',(e.clientX/innerWidth-.5)*2);
  $('#art').style.setProperty('--my',(e.clientY/innerHeight-.5)*2);
  // sparkle trail
  if(performance.now()-last>70){last=performance.now();
   const s=document.createElement('span');s.className='spark';s.textContent=['✨','💖','🌸'][Math.random()*3|0];
   s.style.cssText=`left:${mx}px;top:${my}px;--x:${(Math.random()-.5)*50}px;--y:${20+Math.random()*30}px`;
   document.body.appendChild(s);setTimeout(()=>s.remove(),900)}
 });
 (function follow(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;$('#ring').style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(follow)})();
 document.addEventListener('mouseover',e=>document.body.classList.toggle('hov',!!e.target.closest('a,button,summary,.card')));
 // magnetic buttons
 $$('.mag').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px) scale(1.05)`});
  b.addEventListener('mouseleave',()=>b.style.transform='');
 });
 // 3D tilt + glow on cards
 document.addEventListener('mousemove',e=>{
  const c=e.target.closest('.tilt');if(!c)return;
  const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.transition='transform .1s';
  c.style.transform=`perspective(700px) rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*10}deg) translateY(-6px)`;
  const p=c.querySelector('.pic');if(p){p.style.setProperty('--gx',x*100+'%');p.style.setProperty('--gy',y*100+'%')}
 });
 document.addEventListener('mouseout',e=>{const c=e.target.closest('.tilt');if(c&&!c.contains(e.relatedTarget)){c.style.transition='';c.style.transform=''}});
}

// ====== INTRO TIMELINE ======
const intro=$('#intro');
let done=false;
function finish(){
 if(done)return;done=true;
 intro.classList.add('leave');                       // glass panels close
 setTimeout(()=>{intro.classList.add('open');document.body.classList.remove('locked')},1500); // site reveal
 setTimeout(()=>intro.classList.add('gone'),3200);
}
setTimeout(finish,9800);                              // DECENT → GIFT → SHOP (2.2s gaps) then reveal
$('#skip').onclick=finish;
