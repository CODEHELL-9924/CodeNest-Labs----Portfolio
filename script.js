// Loader
window.addEventListener('load', () => {
  setTimeout(() => { document.getElementById('loader').classList.add('hidden'); }, 1800);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, .service-card, .portfolio-card, .faq-question').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; cursor.style.background = 'var(--cyan)'; ring.style.width = '60px'; ring.style.height = '60px'; ring.style.opacity = '0.5'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = 'var(--blue)'; ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '1'; });
});

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
});

// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counters
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  if (isNaN(target)) return;
  let start = 0; const dur = 1800; const step = 16;
  const inc = target / (dur / step);
  const timer = setInterval(() => {
    start = Math.min(start + inc, target);
    el.textContent = Math.round(start) + (el.dataset.count === '99' ? '%' : (el.dataset.count === '5' ? '+' : '+'));
    if (start >= target) clearInterval(timer);
  }, step);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.about-stats, .dashboard-card').forEach(el => counterObserver.observe(el));

// Portfolio filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-card').forEach(card => {
      const cat = card.dataset.cat;
      const show = filter === 'all' || cat === filter;
      card.style.opacity = show ? '1' : '0.2';
      card.style.transform = show ? '' : 'scale(0.95)';
      card.style.pointerEvents = show ? '' : 'none';
    });
  });
});

// FAQ
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Form submit
const fullName = document.getElementById("fullName");
const emailAddress = document.getElementById("emailAddress");
const phoneNumber = document.getElementById("phoneNumber");
const serviceNeeded = document.getElementById("serviceNeeded");
const projectBudget = document.getElementById("projectBudget");
const projectDes = document.getElementById("project-des")

function handleSubmit(btn) {
  if(fullName.value === "" ||
      emailAddress.value === "" ||
      phoneNumber.value === "" ||
      serviceNeeded.value === "" ||
      projectBudget.value === "" ||
      projectDes.value === "") {
        document.querySelector(".error-filling-form").textContent = '* Fill all the details';
        setTimeout(() => {
          document.querySelector(".error-filling-form").textContent = "";
        },1500)
      }
    else {
          btn.textContent = 'Sending...';
          btn.disabled = true;
          btn.style.opacity = '0.7';
          setTimeout(() => {
            btn.textContent = '✓ Message Sent! We\'ll be in touch soon.';
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            btn.style.opacity = '1';
          }, 1800);

          const text = `FullName: ${fullName.value}
          Email: ${emailAddress.value}
          Phone: ${phoneNumber.value}
          Service Request: ${serviceNeeded.value}
          Budget: ${projectBudget.value}
          Project Description: ${projectDes.value}`;
                    
          const encodedText = encodeURIComponent(text);
          const url = `https://wa.me/255617516916?text=${encodedText}`
          window.open(url, '_blank')
}
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});


// legals
// const legalPages = {
//     "Privacy Policy": `
//         <p><strong>Privacy Policy</strong></p>
//         <p>We respect your privacy. Any information submitted through our website is kept confidential and is never shared with third parties without your consent.</p>
//     `,

//     "Terms of Service": `
//         <p><strong>Terms of Service</strong></p>
//         <p>By using this website, you agree to our terms and conditions. Services are provided according to the agreed project scope and timelines.</p>
//     `,

//     "Cookie Policy": `
//         <p><strong>Cookie Policy</strong></p>
//         <p>This website uses cookies to improve user experience, analyze traffic, and enhance website performance.</p>
//     `,

//     "Refund Policy": `
//         <p><strong>Refund Policy</strong></p>
//         <p>Refunds are evaluated on a case-by-case basis. Completed digital services and delivered projects are generally non-refundable.</p>
//     `
// };

// function showLegal(page){
//     document.getElementById("legalTitle").innerText = page;
//     document.getElementById("legalContent").innerHTML = legalPages[page];
//     document.getElementById("legalModal").style.display = "block";
// }

// function closeModal(){
//     document.getElementById("legalModal").style.display = "none";
// }

// window.onclick = function(event){
//     const modal = document.getElementById("legalModal");
//     if(event.target === modal){
//         modal.style.display = "none";
//     }
// }
