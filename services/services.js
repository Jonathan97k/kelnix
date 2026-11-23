document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".navtoggle"),nav=document.querySelector(".navlinks");
 if(toggle&&nav)toggle.addEventListener("click",()=>{nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(nav.classList.contains("open")))});
 document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());

 // Let the hero globe transform into a persistent, animated page watermark.
 const globe=document.querySelector(".global-network");
 const hero=document.querySelector(".hero");
 if(globe&&hero){
  const home=globe.parentNode;
  const homeNext=globe.nextSibling;
  let watermark=false;
  const updateGlobeMode=()=>{
   const shouldBeWatermark=window.scrollY>Math.max(120,hero.offsetHeight*.22);
   if(shouldBeWatermark===watermark)return;
   watermark=shouldBeWatermark;
   if(watermark){
    document.body.appendChild(globe);
    document.body.classList.add("globe-watermark-mode");
   }else{
    document.body.classList.remove("globe-watermark-mode");
    home.insertBefore(globe,homeNext&&homeNext.parentNode===home?homeNext:null);
   }
  };
  window.addEventListener("scroll",updateGlobeMode,{passive:true});
  window.addEventListener("resize",updateGlobeMode,{passive:true});
  updateGlobeMode();
 }
});