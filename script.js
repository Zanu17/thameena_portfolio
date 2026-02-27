// ==============================
// CERTIFICATE FILTER
// ==============================
function filterCerts(cat) {
  document.querySelectorAll('.cert-tab').forEach(tab =>
    tab.classList.remove('active')
  );

  const activeTab = document.querySelector(`.cert-tab[data-cat="${cat}"]`);
  if (activeTab) activeTab.classList.add('active');

  document.querySelectorAll('.cert-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}


// ==============================
// CUSTOM CURSOR
// ==============================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;

  if (cursor) {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  }
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;

  if (ring) {
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  }

  requestAnimationFrame(animateRing);
}
animateRing();


// Hover effect
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor && ring) {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
      ring.style.borderColor = 'rgba(201,169,110,0.8)';
    }
  });

  el.addEventListener('mouseleave', () => {
    if (cursor && ring) {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(201,169,110,0.4)';
    }
  });
});


// ==============================
// SCROLL REVEAL ANIMATION
// ==============================
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden-anim');
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll(
  '.timeline-item, .skill-card, .award-card, .edu-card'
).forEach(el => {
  el.classList.add('hidden-anim');
  revealObserver.observe(el);
});

// document.getElementById("messageForm").addEventListener("submit", async function(e) {
//   e.preventDefault();

//   const name = this.name.value;
//   const email = this.email.value;
//   const message = this.message.value;

//   const botToken = "YOUR_BOT_TOKEN";
//   const chatId = "YOUR_CHAT_ID";

//   const text = `
// 📩 New Portfolio Message

// 👤 Name: ${name}
// 📧 Email: ${email}

// 📝 Message:
// ${message}
//   `;

//   try {
//     await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         chat_id: chatId,
//         text: text
//       })
//     });

//     alert("Message sent successfully!");
//     this.reset();

//   } catch (error) {
//     alert("Error sending message.");
//     console.error(error);
//   }
// });