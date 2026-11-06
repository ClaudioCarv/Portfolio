/* =====================================================================
   COMO ADICIONAR UM CARD
   1. Copie um objeto da lista certa (PROJETOS, FERRAMENTAS ou CERTIFICADOS).
   2. Título curto (uns 40 caracteres) e escopo claro: o que é e o que entregou.
   3. Um card por projeto. Se o escopo cresceu, vire dois cards.
   Todos os cards usam a mesma função (criarCard), então ficam iguais.
   ===================================================================== */

/* ---------- DADOS (edite aqui) ---------- */

// Fotos da galeria: coloque os arquivos em img/ e liste aqui.
const FOTOS = [
  { src: "img/foto2.png", alt: "foto1" },
  { src: "img/Foto Claudio Carvalho.jpeg", alt: "Foto 2" },
  { src: "img/foto1.png", alt: "Foto 3" }
];

const PROJETOS = [
  {
    titulo: "Tia Fatia",
    texto: "Site de pizzaria criado no curso de desenvolvimento web, em equipe com colegas de turma.",
    tags: ["HTML", "CSS", "JavaScript"], status: "Concluído",
    link: "https://github.com/ClaudioCarv/tia_fatia", video: "motions/tia fatia motion.mp4"
  },
  {
    titulo: "Recomendação de Filmes",
    texto: "Sistema de recomendação com TF-IDF e similaridade de cosseno, com interface interativa em Streamlit.",
    tags: ["Python", "TF-IDF", "Streamlit"], status: "Concluído",
    link: "https://github.com/ClaudioCarv?tab=repositories", /* TROQUE pelo link do repositório */
    img: "img/logo recomendacao filmes.png"
  },
  {
    titulo: "Análise de e-commerce (Olist)",
    texto: "Dados reais de pedidos analisados com SQL e Python, com um dashboard em Power BI que responde a uma pergunta de negócio.",
    tags: ["SQL", "Python", "Power BI"], status: "Em breve"
  }
];

// "prova" = onde a ferramenta foi usada de verdade.
const FERRAMENTAS = [
  { titulo: "Python", icones: ["python"], texto: "Fábrica de Software e projeto de recomendação." },
  { titulo: "Pandas", icones: ["pandas"], texto: "Projeto de recomendação de filmes." },
  { titulo: "NumPy e Matplotlib", icones: ["numpy", "matplotlib"], texto: "Em prática nos estudos de análise de dados." },
  { titulo: "Scikit-learn", icones: ["scikitlearn"], texto: "Estudos de Machine Learning." },
  { titulo: "Metabase", icones: ["metabase"], texto: "Estágio na UMTI e certificado na Udemy." },
  { titulo: "Power BI", icones: ["powerbi"], texto: "Projeto Olist, em andamento." },
  { titulo: "Excel", icones: ["excel"], texto: "Nível intermediário." },
  { titulo: "Django REST", icones: ["django"], texto: "Treinamento na Fábrica de Software." },
  { titulo: "Streamlit", icones: ["streamlit"], texto: "Projeto de recomendação de filmes." },
  { titulo: "n8n", icones: ["n8n"], texto: "Estágio na SIAGOV, com automação e IA." },
  { titulo: "Git e GitHub", icones: ["git", "github"], texto: "Todos os projetos ficam versionados." }
];

const iconesAlternativos = { metabase: "M", powerbi: "BI", excel: "X", n8n: "n8n" };

const CERTIFICADOS = [
  { titulo: "Metabase", texto: "Udemy, fevereiro de 2026" },
  { titulo: "Scrum Fundamentals Certified", texto: "Certificação Scrum" },
  { titulo: "Programador Back-End: Introdução", texto: "DevMedia, junho de 2023" },
  { titulo: "Fábrica de Software: Python e Django", texto: "UNIPÊ, 2023" }
];

/* ---------- COMPONENTE CARD (um só para o site inteiro) ---------- */

function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto) e.textContent = texto;
  return e;
}

// variante: "proj" (projeto), "tool" (ferramenta) ou "line" (linha simples)
function criarCard(d, variante) {
  const c = el(d.link ? "a" : "div", "card" + (variante === "line" ? " card--line" : ""));
  if (d.link) { c.href = d.link; c.target = "_blank"; c.rel = "noopener"; }

  if (variante === "proj") {
    const t = el("div", "thumb");
    if (d.video) {
      const video = el("video", "project-video");
      video.src = d.video;
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", `Prévia em vídeo do projeto ${d.titulo}`);
      video.addEventListener("timeupdate", () => {
        if (video.currentTime >= 10) {
          video.currentTime = 0;
          video.play();
        }
      });
      t.append(video);
    } else if (d.img) {
      const im = new Image();
      im.src = d.img; im.alt = "Logo do projeto " + d.titulo;
      im.width = 320; im.height = 200; im.loading = "lazy";
      im.onerror = () => im.remove();
      t.append(im);
    } else {
      t.textContent = "em breve";
    }
    c.append(t, el("span", "status" + (d.status === "Em breve" ? " soon" : ""), d.status));
  }

  if (variante === "tool") {
    const cabecalho = el("div", "tool-heading");
    const icones = el("span", "tool-icons");
    d.icones.forEach(nome => {
      const icone = iconesAlternativos[nome]
        ? el("span", "tool-icon-fallback", iconesAlternativos[nome])
        : el("i", `devicon-${nome}-plain colored`);
      icone.setAttribute("aria-hidden", "true");
      icones.append(icone);
    });
    cabecalho.append(icones, el("h3", "", d.titulo));
    c.append(cabecalho, el("p", "prova", d.texto));
  } else {
    c.append(el("h3", "", d.titulo), el("p", "", d.texto));
  }

  if (d.tags) {
    const tg = el("div", "tags");
    d.tags.forEach(x => tg.append(el("span", "tag", x)));
    c.append(tg);
  }
  return c;
}

function preencher(id, lista, variante) {
  const g = document.getElementById(id);
  const f = document.createDocumentFragment();
  lista.forEach(d => f.append(criarCard(d, variante)));
  g.append(f);
}

preencher("projetos-grid", PROJETOS, "proj");
preencher("ferramentas-grid", FERRAMENTAS, "tool");
preencher("certs-grid", CERTIFICADOS, "line");

/* ---------- GALERIA DE FOTOS ---------- */

const track = document.getElementById("track");
const dots = document.getElementById("dots");

function ir(i) { track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" }); }
function atual() { return Math.round(track.scrollLeft / track.clientWidth); }
function marcar() { [...dots.children].forEach((d, i) => d.classList.toggle("on", i === atual())); }

FOTOS.forEach((f, i) => {
  const s = el("div", "slide");
  const im = new Image();
  im.alt = f.alt; im.src = f.src; im.width = 800; im.height = 1000;
  im.loading = i === 0 ? "eager" : "lazy";   // a 1ª foto carrega logo (LCP); as outras esperam
  if (i === 0) im.fetchPriority = "high";
  im.onerror = () => { im.remove(); s.classList.add("empty"); s.textContent = "Adicione sua foto em " + f.src; };
  s.append(im); track.append(s);

  const d = el("button");
  d.setAttribute("aria-label", "Ir para a foto " + (i + 1));
  d.onclick = () => ir(i);
  dots.append(d);
});
track.addEventListener("scroll", marcar, { passive: true });
marcar();
document.querySelector(".prev").onclick = () => ir(Math.max(atual() - 1, 0));
document.querySelector(".next").onclick = () => ir(Math.min(atual() + 1, FOTOS.length - 1));

/* ---------- TEMA CLARO E ESCURO ---------- */

const raiz = document.documentElement;
const btnTema = document.getElementById("tema");

function aplicarTema(t) {
  raiz.dataset.theme = t;
  const temaAlvo = t === "light" ? "escuro" : "claro";
  btnTema.textContent = t === "light" ? "☾" : "☀";
  btnTema.setAttribute("aria-label", `Ativar tema ${temaAlvo}`);
  btnTema.title = `Ativar tema ${temaAlvo}`;
  try { localStorage.setItem("tema", t); } catch (e) {}
}
let salvo = null;
try { salvo = localStorage.getItem("tema"); } catch (e) {}
aplicarTema(salvo || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
btnTema.onclick = () => aplicarTema(raiz.dataset.theme === "light" ? "dark" : "light");

document.getElementById("email-form").addEventListener("submit", evento => {
  evento.preventDefault();
  const dados = new FormData(evento.currentTarget);
  const assunto = `Contato pelo portfólio — ${dados.get("nome")}`;
  const corpo = `Nome: ${dados.get("nome")}\nE-mail: ${dados.get("email")}\n\n${dados.get("mensagem")}`;
  const parametros = `subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  const mailto = `mailto:joseclaudiogt@gmail.com?${parametros}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=joseclaudiogt%40gmail.com&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  document.getElementById("email-gmail").href = gmail;
  document.getElementById("email-app").href = mailto;
  document.getElementById("email-feedback").hidden = false;
  document.getElementById("email-opcoes").hidden = false;
  document.getElementById("email-gmail").click();
});

/* ---------- MENU E BOTÃO DE TOPO ---------- */

const menu = document.getElementById("menu");
document.querySelector(".burger").onclick = () => menu.classList.toggle("open");
menu.querySelectorAll("a").forEach(a => a.onclick = () => menu.classList.remove("open"));

const topo = document.querySelector(".top");
addEventListener("scroll", () => topo.classList.toggle("show", scrollY > 500), { passive: true });
topo.onclick = () => scrollTo({ top: 0, behavior: "smooth" });


/* ---------- ANIMAÇÕES DE ENTRADA ---------- */
// Os elementos aparecem suavemente conforme entram na área visível.
const elementosAnimados = document.querySelectorAll(
  'section .wrap > h2, section .wrap > .eyebrow, .sobre-texto, .sobre-heading, .tl article, .formacao-item, .card, .cta'
);
elementosAnimados.forEach((elemento, indice) => {
  elemento.classList.add("reveal");
  if (elemento.matches(".tl article, .formacao-item, .card")) {
    elemento.style.setProperty("--reveal-delay", `${(indice % 4) * 75}ms`);
  }
});

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  elementosAnimados.forEach(elemento => observador.observe(elemento));
} else {
  elementosAnimados.forEach(elemento => elemento.classList.add("visible"));
}
