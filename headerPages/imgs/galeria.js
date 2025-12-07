const galleryEl = document.getElementById('gallery');
const metaEl = document.getElementById('meta');
const searchEl = document.getElementById('search');
const shuffleBtn = document.getElementById('shuffle');
const sortBtn = document.getElementById('sort');


let images = [];
let filtered = [];
let sortAsc = true;


async function load(){
try{
const res = await fetch('./images.json');
const list = await res.json();
images = list.map(p=>({src:p,name:p.split('/').pop()}));
filtered = [...images];
render();
}catch(e){ metaEl.textContent = 'Erro ao carregar images.json'; }
}


function render(){
galleryEl.innerHTML = '';
const frag = document.createDocumentFragment();
for(const img of filtered){
const card = document.createElement('div'); card.className='card';
const im = document.createElement('img'); im.dataset.src = img.src; im.loading='lazy';
const cap = document.createElement('div'); cap.className='caption'; cap.textContent = img.name;
card.appendChild(im); card.appendChild(cap);
card.onclick = ()=>openLightbox(img);
frag.appendChild(card);
}
galleryEl.appendChild(frag);
lazyLoad();
}


function lazyLoad(){
const imgs = document.querySelectorAll('img[data-src]');
const io = new IntersectionObserver((entries,obs)=>{
entries.forEach(e=>{
if(e.isIntersecting){
const el = e.target; el.src = el.dataset.src; el.removeAttribute('data-src'); obs.unobserve(el);
}
});
},{rootMargin:'200px'});
imgs.forEach(i=>io.observe(i));
}


searchEl.oninput = ()=>{
const q = searchEl.value.toLowerCase();
filtered = images.filter(i=>i.name.toLowerCase().includes(q));
render();
};


shuffleBtn.onclick = ()=>{
for(let i=images.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[images[i],images[j]]=[images[j],images[i]]}
filtered=[...images]; render();
};


sortBtn.onclick = ()=>{
images.sort((a,b)=> sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
sortAsc=!sortAsc; filtered=[...images]; render();
};


// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
let currentIndex = -1;


function openLightbox(img){
currentIndex = filtered.findIndex(i=>i.src===img.src);
lbImg.src = img.src;
lb.classList.add('open');
}
function closeLightbox(){ lb.classList.remove('open'); }
lbClose.onclick = closeLightbox;
lb.onclick = e=>{ if(e.target===lb) closeLightbox(); };
lbPrev.onclick = ()=> showIndex((currentIndex-1+filtered.length)%filtered.length);
lbNext.onclick = ()=> showIndex((currentIndex+1)%filtered.length);


function showIndex(i){ currentIndex=i; lbImg.src = filtered[i].src; }


load();