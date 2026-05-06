/* ── Copy token name ── */
function copyToken(value, token) {
  const text = token || value;
  navigator.clipboard.writeText(text).catch(()=>{});
  const t = document.getElementById('copy-toast');
  t.textContent = 'Copied: ' + text;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ── Modal ── */
function toggleModal() {
  document.getElementById('modal-live').classList.toggle('open');
}
function closeModal(e) {
  if(e.target === e.currentTarget) toggleModal();
}

/* ── Panel ── */
function togglePanel() {
  document.getElementById('slide-panel').classList.toggle('open');
  document.getElementById('panel-overlay').classList.toggle('open');
  document.body.style.overflow = document.getElementById('slide-panel').classList.contains('open') ? 'hidden' : '';
}

/* ── Live toasts ── */
let toastId = 0;
const ICONS = { default:'📋', safe:'✓', warning:'⚠', critical:'⚡' };
function showToast(type, title, desc) {
  const container = document.getElementById('toast-container');
  const id = 'toast-' + (++toastId);
  const el = document.createElement('div');
  el.className = 'toast toast-' + type;
  el.id = id;
  el.innerHTML = `
    <span class="toast-icon">${ICONS[type]||'ℹ'}</span>
    <div class="toast-body"><p class="toast-title">${title}</p><p class="toast-desc">${desc}</p></div>
    <button class="toast-dismiss" onclick="dismissToast('${id}')">✕</button>`;
  container.appendChild(el);
  setTimeout(()=>dismissToast(id), 5000);
}
function dismissToast(id) {
  const el = document.getElementById(id);
  if(el){ el.style.opacity='0';el.style.transform='translateX(20px)';el.style.transition='all 0.25s';setTimeout(()=>el.remove(), 250); }
}

/* ── Active sidebar links ── */
const links = document.querySelectorAll('.sidebar nav a');
const sections = document.querySelectorAll('[id^="s"]');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id));
    }
  });
},{rootMargin:'-20% 0px -70% 0px'});
sections.forEach(s=>observer.observe(s));

/* ── File upload drag/drop visual ── */
const zone = document.querySelector('.file-upload-zone');
if(zone){
  zone.addEventListener('drop',(e)=>{
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if(file) zone.querySelector('.file-upload-text').innerHTML = `<strong>${file.name}</strong> ready to upload`;
  });
}

/* ── Multi-select visual highlight ── */
document.querySelectorAll('.multi-select-item input[type="checkbox"]').forEach(cb=>{
  cb.addEventListener('change',function(){
    this.closest('.multi-select-item').classList.toggle('selected',this.checked);
  });
});

const getContrastToken = (token, step) => {
  const prefix = token.replace(/\d+$/, '');
  return step <= 400 ? `${prefix}950` : `${prefix}50`;
};

const stops = document.querySelectorAll('.ramp-stop');

stops.forEach(stop => {
  const token = stop.dataset.token;

  // ✅ extract step + prefix dynamically
  const step = parseInt(token.match(/\d+$/)?.[0], 10);
  const prefix = token.replace(/\d+$/, '');

  const contrastToken = getContrastToken(token, step);

  const styles = getComputedStyle(document.documentElement);

  const bg = styles.getPropertyValue(token).trim();
  const contrast = styles.getPropertyValue(contrastToken).trim();

  stop.style.background = bg;
  stop.querySelector('span').style.color = contrast;

  stop.querySelector('span').innerHTML += bg;

  stop.onclick = () => copyToken(bg, token);
});