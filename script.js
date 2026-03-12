// Canvas Neon Grid & Particles
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', ()=>{
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// Particles array
let particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5,
    size: Math.random()*2 + 1
  });
}

function animate(){
  ctx.clearRect(0,0,w,h);
  
  // Draw grid lines
  ctx.strokeStyle = 'rgba(255,0,255,0.05)';
  ctx.lineWidth = 1;
  for(let x=0;x<w;x+=50){
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,h);
    ctx.stroke();
  }
  for(let y=0;y<h;y+=50){
    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(w,y);
    ctx.stroke();
  }
  
  // Draw particles
  particles.forEach(p=>{
    ctx.fillStyle='#ff00ff';
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    
    p.x += p.vx;
    p.y += p.vy;
    
    if(p.x> w) p.x=0;
    if(p.x<0) p.x=w;
    if(p.y> h) p.y=0;
    if(p.y<0) p.y=h;
  });
  
  requestAnimationFrame(animate);
}

animate();

// Contact form alert
const form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  alert("Message sent to Commander Bhavya! 🚀");
  form.reset();
});
function openGallery(){
  document.getElementById('galleryPopup').style.display='flex';
}

function closeGallery(){
  document.getElementById('galleryPopup').style.display='none';
}

/* Slider functions */
function nextSlide(btn){
  const slider = btn.closest('.popup').querySelector('.popup-slider');
  const slides = slider.querySelectorAll('.slide');
  let current = slider.querySelector('.slide.active');
  let index = Array.from(slides).indexOf(current);
  current.classList.remove('active');
  slides[(index+1) % slides.length].classList.add('active');
}

function prevSlide(btn){
  const slider = btn.closest('.popup').querySelector('.popup-slider');
  const slides = slider.querySelectorAll('.slide');
  let current = slider.querySelector('.slide.active');
  let index = Array.from(slides).indexOf(current);
  current.classList.remove('active');
  slides[(index-1+slides.length) % slides.length].classList.add('active');
}

const trail = [];
for(let i=0;i<15;i++){
  const t = document.createElement('div');
  t.style.width = (15-i) + 'px';
  t.style.height = (15-i) + 'px';
  t.style.background = '#ff00ff';
  t.style.borderRadius = '50%';
  t.style.position = 'fixed';
  t.style.pointerEvents = 'none';
  t.style.opacity = (1 - i*0.06);
  t.style.mixBlendMode = 'screen';
  t.style.zIndex = 9999;
  document.body.appendChild(t);
  trail.push(t);
}

document.addEventListener('mousemove', e=>{
  trail.forEach((t,i)=>{
    setTimeout(()=>{
      t.style.left = e.clientX + 'px';
      t.style.top = e.clientY + 'px';
    }, i*15);
  });
});