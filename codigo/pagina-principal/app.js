/* ===========================
   PROTEGE — app.js
   =========================== */

// Screen configuration for each card
const screens = {
  denuncia: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5b35b1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,
    title: 'Denúncia rápida',
    desc: 'Registre uma ocorrência de forma segura e anônima. Suas informações são protegidas e encaminhadas para os órgãos competentes.',
    cta: 'Iniciar denúncia',
  },
  provas: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5b35b1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <rect x="9" y="12" width="6" height="6" rx="1"/>
      <path d="M12 12v-2m-2 2h4"/>
    </svg>`,
    title: 'Armazenar provas',
    desc: 'Guarde fotos, vídeos, áudios e documentos com segurança. Todo material fica criptografado e disponível quando você precisar.',
    cta: 'Adicionar prova',
  },
  locais: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5b35b1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,
    title: 'Locais de ajuda',
    desc: 'Encontre delegacias, abrigos, centros de apoio e outros serviços próximos a você. Aberto 24 horas.',
    cta: 'Ver no mapa',
  },
  chat: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5b35b1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>`,
    title: 'Chat de apoio',
    desc: 'Converse com voluntários e profissionais capacitados. O atendimento é sigiloso e você pode usar um nome fictício.',
    cta: 'Iniciar conversa',
  },
  cadastros: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5b35b1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
    title: 'Cadastros de confiança',
    desc: 'Registre pessoas de confiança que podem ser acionadas em caso de emergência. Eles serão notificados com segurança.',
    cta: 'Gerenciar contatos',
  },
  forum: {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5b35b1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <path d="M8 9h8M8 13h5"/>
    </svg>`,
    title: 'Fórum',
    desc: 'Compartilhe experiências, faça perguntas e apoie outras pessoas em um ambiente seguro e moderado.',
    cta: 'Entrar no fórum',
  },
};

// DOM references
const cardModal    = document.getElementById('modalOverlay');
const cardClose    = document.getElementById('modalClose');
const cardIcon     = document.getElementById('modalIcon');
const cardTitle    = document.getElementById('modalTitle');
const cardDesc     = document.getElementById('modalDesc');
const cardCta      = document.getElementById('modalCta');

const saibaMaisBtn     = document.getElementById('saibaMaisBtn');
const saibaMaisOverlay = document.getElementById('saibaMaisOverlay');
const saibaMaisClose   = document.getElementById('saibaMaisClose');
const saibaMaisCta     = document.getElementById('saibaMaisCta');

// --- Card navigation ---
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', () => {
    const screenKey = card.dataset.screen;
    const screen = screens[screenKey];
    if (!screen) return;

    cardIcon.innerHTML  = screen.icon;
    cardTitle.textContent = screen.title;
    cardDesc.textContent  = screen.desc;
    cardCta.textContent   = screen.cta;

    openModal(cardModal);
  });
});

cardClose.addEventListener('click', () => closeModal(cardModal));
cardCta.addEventListener('click', () => {
 const routes = {
  'Denúncia rápida':        '../Denuncia rapida/index.html',
  'Armazenar provas':       '../page-armazenamento-de-provas/index.html',
  'Locais de ajuda':        '../Matheus/locais_ajuda/index.html',
  'Chat de apoio':          '../nvochat/index.html',
  'Cadastros de confiança': '../cadastro_listagem/cadastro.html',
  'Fórum':                  '../FÓRUM - maria/forum.html',
};

  const route = routes[cardTitle.textContent];
  if (route) window.location.href = route;

  closeModal(cardModal);
});

// --- Saiba mais ---
saibaMaisBtn.addEventListener('click', () => openModal(saibaMaisOverlay));
saibaMaisClose.addEventListener('click', () => closeModal(saibaMaisOverlay));
saibaMaisCta.addEventListener('click', () => {
  window.location.href = '../bibliotecacont/index.html';
});

// --- Backdrop close ---
cardModal.addEventListener('click', (e) => {
  if (e.target === cardModal) closeModal(cardModal);
});
saibaMaisOverlay.addEventListener('click', (e) => {
  if (e.target === saibaMaisOverlay) closeModal(saibaMaisOverlay);
});

// --- Keyboard close (Escape) ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(cardModal);
    closeModal(saibaMaisOverlay);
  }
});

// --- Helpers ---
function openModal(overlay) {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(overlay) {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}