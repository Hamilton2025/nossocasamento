/* ========= Convite de Casamento — Hamilton & Jerica =========
   Funções: contagem regressiva + gerar arquivo .ics + corações animados
   ============================================================ */

  //Navbar//
  const checkbox = document.getElementById("check");
  const menuLinks = document.querySelectorAll("nav ul li a");

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      checkbox.checked = false; // ✅ closes the mobile menu
    });
  });

  //Imagens de fundo em slideshow//
   let slides = document.querySelectorAll('.hero-slideshow img');
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 3000); // changes image every 3 seconds

 // --------- Contagem regressiva ---------
document.addEventListener("DOMContentLoaded", () => {

  const weddingLocalISO = "2026-06-25T16:30:00+01:00";
 
const daysEl = document.getElementById("cd-days");
const hoursEl = document.getElementById("cd-hours");
const minsEl = document.getElementById("cd-minutes");
const secsEl = document.getElementById("cd-seconds");

function updateCountdown() {
  const now = new Date();
  const eventDate = new Date(weddingLocalISO);
  const diff = eventDate - now;

  if (diff <= 0) {
    if (daysEl && hoursEl && minsEl && secsEl) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minsEl.textContent = "0";
      secsEl.textContent = "0";
    }
    clearInterval(timer);
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2,"0");
  if (minsEl) minsEl.textContent = String(minutes).padStart(2,"0");
  if (secsEl) secsEl.textContent = String(seconds).padStart(2,"0");
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

  // --------- Corações decorativos (sutis) ---------
  const hearts = document.querySelector(".hearts");
  if (hearts) {
    const HEARTS = 14;
    for (let i = 0; i < HEARTS; i++) {
      const s = document.createElement("span");
      s.textContent = "❤";
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDelay = (Math.random() * 10).toFixed(2) + "s";
      s.style.opacity = (0.1 + Math.random() * 0.4).toFixed(2);
      s.style.fontSize = 14 + Math.round(Math.random() * 14) + "px";
      hearts.appendChild(s);
    }
  }
});

// ------------------ RSVP (Confirmação de Presença) ------------------
  const form = document.getElementById('rsvpForm');
  const successMessage = document.getElementById('successMessage');
  const guestsWrapper = document.getElementById('guestsWrapper');
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

  if (form) {
  // Envio via Formspree
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch('https://formspree.io/f/xwpnanbz', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          guestsWrapper.style.display = 'none';
          successMessage.style.display = 'block';
        } else {
          alert('Ops! Algo deu errado. Tente novamente.');
        }
      } catch (err) {
        alert('Erro de conexão. Tente novamente mais tarde.');
      }
    });
  }     

  const guestsInput = document.getElementById('guests');

  guestsInput.addEventListener('input', function() {
    const val = parseInt(this.value, 10);
    if (isNaN(val) || (val !== 1 && val !== 2)) {
      this.value = '';  // or you could set this.value = 1 to default
    }
  });

/* --------- Helpers --------- */
function escapeICS(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function cryptoRandom() {
  try {
    const arr = new Uint8Array(8);
    (window.crypto || self.crypto).getRandomValues(arr);
    return [...arr].map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    // Fallback se crypto não estiver disponível
    return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
  }
}



