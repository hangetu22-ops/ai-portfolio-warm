/* =========================================================
   Warm Elegant Minimal — Portfolio
   Data rendering + interactions (no framework, no build).
   ========================================================= */

/* ---------- Data ---------- */
const works = [
  {"img":"assets/img/w1.jpg","title":"goal-prompt スキル開発","tools":["Claude Code","skill-creator"],"sum":"口語の要望を /goal 用の完了条件プロンプトへ整形するスキルを開発。","p":"曖昧な音声・口語の要望を、検証可能な達成条件に落とし込みたい","t":"skill-creator を用い、progressive disclosure で詳細知識を references/ に分離","r":"再現性のあるプロンプト生成を単一スキルとして完成"},
  {"img":"assets/img/w2.jpg","title":"スキルのフォルダ構成設計","tools":["Skill Design","Architecture"],"sum":"SKILL.md と references を分離した、保守しやすいスキル設計。","p":"知識が肥大化しても壊れない、見通しのよい構成にしたい","t":"ワークフロー本体と詳細知識をファイル分割し役割を明確化","r":"参照88行＋本体98行のクリーンな構成で完成"},
  {"img":"assets/img/w4.jpg","title":"サブエージェントで自動コードレビュー","tools":["SubAgent","Code Review"],"sum":"code-reviewer サブエージェントで自動レビューし、重大問題を検出。","p":"人手をかけずにコード品質・セキュリティを担保したい","t":"code-reviewer をバックグラウンド実行し観点別に精査","r":"SQLインジェクション2件を含む計4件の問題を指摘"},
  {"img":"assets/img/w5.jpg","title":"音声カウント Web アプリ制作","tools":["HTML","Web Audio"],"sum":"声に反応してカウントする単一HTMLアプリを制作。履歴・累計も保存。","p":"外部依存なしで、声に反応して回数を数える軽量アプリが欲しい","t":"Web Audio で入力レベルを判定し、localStorage で累計を保持","r":"リロード後も累計が残る単一ファイルのアプリを納品"},
  {"img":"assets/img/w6.jpg","title":"文字数カウントスキルの検証","tools":["Skill","docx","Python"],"sum":"Wordファイルの文字数を数えるスキルを4パターンで検証し完全一致を確認。","p":"スキルの計測結果が本当に正しいかを客観的に確かめたい","t":"Python で期待値を独立計算し、スキル出力と全パターン突き合わせ","r":"4パターンすべてで期待値と完全一致、上限判定も正常"},
  {"img":"assets/img/w9.jpg","title":"3サブエージェント並行実行","tools":["SubAgent","Automation"],"sum":"doc-generator / code-reviewer / test-runner を並行起動し自動化。","p":"生成・レビュー・テストを一気通貫で並行処理したい","t":"3種のサブエージェントを同時起動し、完了次第まとめて報告","r":"レビューは Critical なし・セキュリティ問題なしと判定"},
  {"img":"assets/img/w11.jpg","title":"SEO記事執筆｜文字数最適化","tools":["seo-blog-writer","char-count"],"sum":"Claude Code拡張機能の入門記事を執筆し、目標文字数へ最適化。","p":"目標文字数に収めつつ、網羅的で読みやすいSEO記事にしたい","t":"seo-blog-writer で構成し、char-count で文字数を実測しながら調整","r":"目標5,000字に対し5,028字で確定（全パターン実測OK）"},
  {"img":"assets/img/w13.jpg","title":"サブエージェント3種＋自動化スキル構築","tools":["SubAgent","Custom Skill"],"sum":"Analyzer / Builder / Reviewer を定義し、順次実行するスキルを構築。","p":"分析→構築→検証を一気通貫で回す仕組みが欲しい","t":"3つのサブエージェントを定義し、build-and-review スキルで直列実行","r":"役割分担された自動ワークフローを構成"},
  {"img":"assets/img/w14.jpg","title":"AIブログ記事＋アイキャッチ生成","tools":["Writing","GPT Image"],"sum":"テーマ記事を執筆し、AI生成のアイキャッチ画像まで一括で制作。","p":"読み物として成立する記事と、映えるアイキャッチをまとめて用意したい","t":"本文をAIで執筆し、GPT Image でアイキャッチ画像を生成","r":"記事＋ビジュアルを揃えた公開可能なコンテンツを完成"}
];

const galleryImgs = [
  "assets/img/w1.jpg","assets/img/w2.jpg","assets/img/w3.jpg","assets/img/w4.jpg",
  "assets/img/w5.jpg","assets/img/w6.jpg","assets/img/w7.jpg","assets/img/w9.jpg",
  "assets/img/w10.jpg","assets/img/w11.jpg","assets/img/w12.jpg","assets/img/w13.jpg",
  "assets/img/w14.jpg"
];

/* ---------- Helpers ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- Render: Work cards ---------- */
function renderWork() {
  const grid = $("#workGrid");
  if (!grid) return;

  works.forEach((w, i) => {
    const tags = w.tools.map((t) => `<span class="badge">${esc(t)}</span>`).join("");
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card reveal";
    card.style.transitionDelay = `${(i % 3) * 0.08}s`;
    card.setAttribute("aria-label", `${w.title} のケーススタディを開く`);
    card.dataset.index = String(i);
    card.innerHTML = `
      <img class="card__thumb" src="${esc(w.img)}" alt="${esc(w.title)}のスクリーンショット" loading="lazy" />
      <div class="card__body">
        <h3 class="card__title">${esc(w.title)}</h3>
        <div class="card__tags">${tags}</div>
        <p class="card__sum">${esc(w.sum)}</p>
        <span class="card__more">ケーススタディを読む</span>
      </div>
    `;
    card.addEventListener("click", () => openWorkModal(i));
    grid.appendChild(card);
  });
}

/* ---------- Render: Gallery ---------- */
function renderGallery() {
  const grid = $("#galleryGrid");
  if (!grid) return;

  galleryImgs.forEach((src, i) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "gallery__item reveal";
    item.style.transitionDelay = `${(i % 3) * 0.06}s`;
    item.setAttribute("aria-label", `ギャラリー画像 ${i + 1} を拡大表示`);
    item.innerHTML = `<img class="gallery__img" src="${esc(src)}" alt="制作物のスクリーンショット ${i + 1}" loading="lazy" />`;
    item.addEventListener("click", () => openLightbox(i));
    grid.appendChild(item);
  });
}

/* ---------- Modal core ---------- */
const modal = $("#modal");
const modalBody = $("#modalBody");
const modalPanel = $(".modal__panel");
let lastFocused = null;

function openModal(html, panelClass) {
  lastFocused = document.activeElement;
  modalBody.innerHTML = html;
  modalPanel.className = "modal__panel" + (panelClass ? " " + panelClass : "");
  modal.hidden = false;
  // force reflow so transition plays
  void modal.offsetWidth;
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  setTimeout(() => {
    modal.hidden = true;
    modalBody.innerHTML = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }, 300);
}

/* ---------- Focus trap (keep Tab within the open dialog) ---------- */
function getFocusable() {
  return $$(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    modalPanel
  ).filter((el) => !el.hasAttribute("disabled") && el.getClientRects().length > 0);
}

function trapFocus(e) {
  const focusables = getFocusable();
  if (focusables.length === 0) {
    e.preventDefault();
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;

  if (e.shiftKey) {
    if (active === first || !modalPanel.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (active === last || !modalPanel.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }
}

/* ---------- Work modal ---------- */
function openWorkModal(i) {
  const w = works[i];
  const tags = w.tools.map((t) => `<span class="badge">${esc(t)}</span>`).join("");
  const html = `
    <img class="modal__img" src="${esc(w.img)}" alt="${esc(w.title)}の拡大スクリーンショット" />
    <h3 class="modal__title" id="modalTitle">${esc(w.title)}</h3>
    <div class="modal__tags">${tags}</div>
    <div class="modal__block">
      <span class="modal__label">課題</span>
      <p class="modal__value">${esc(w.p)}</p>
    </div>
    <div class="modal__block">
      <span class="modal__label">使ったAI・工夫</span>
      <p class="modal__value">${esc(w.t)}</p>
    </div>
    <div class="modal__block">
      <span class="modal__label">成果</span>
      <p class="modal__value">${esc(w.r)}</p>
    </div>
  `;
  openModal(html, null);
}

/* ---------- Lightbox ---------- */
let lightIndex = 0;

function renderLightbox() {
  const src = galleryImgs[lightIndex];
  const html = `
    <h3 class="modal__title" id="modalTitle" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);">ギャラリー画像 ${lightIndex + 1}</h3>
    <button class="modal__lightNav modal__lightNav--prev" id="lightPrev" aria-label="前の画像">&#8249;</button>
    <img class="modal__lightImg" src="${esc(src)}" alt="制作物のスクリーンショット ${lightIndex + 1}（拡大表示）" />
    <button class="modal__lightNav modal__lightNav--next" id="lightNext" aria-label="次の画像">&#8250;</button>
  `;
  modalBody.innerHTML = html;
  $("#lightPrev").addEventListener("click", (e) => { e.stopPropagation(); stepLightbox(-1); });
  $("#lightNext").addEventListener("click", (e) => { e.stopPropagation(); stepLightbox(1); });
}

function openLightbox(i) {
  lightIndex = i;
  openModal("", "modal__panel--light");
  renderLightbox();
  $("#modalClose").focus();
}

function stepLightbox(dir) {
  lightIndex = (lightIndex + dir + galleryImgs.length) % galleryImgs.length;
  renderLightbox();
}

/* ---------- Modal events ---------- */
$("#modalClose").addEventListener("click", closeModal);
$("#modalOverlay").addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") {
    closeModal();
    return;
  }
  if (e.key === "Tab") {
    trapFocus(e);
    return;
  }
  if (modalPanel.classList.contains("modal__panel--light")) {
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  }
});

/* ---------- Scroll progress ---------- */
const progressFill = $("#progressFill");
const nav = $("#nav");

function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  progressFill.style.width = pct + "%";

  if (scrollTop > 4) nav.classList.add("nav--scrolled");
  else nav.classList.remove("nav--scrolled");
}

window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Scroll spy (active nav link) ---------- */
const navLinks = $$(".nav__link");
const sections = ["work", "gallery", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.dataset.nav === id));
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);
sections.forEach((s) => spy.observe(s));

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const revealEls = $$(".reveal");
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ---------- Mobile menu ---------- */
const navToggle = $("#navToggle");
const mobileMenu = $("#mobileMenu");
const navScrim = $("#navScrim");

function setMobileMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  mobileMenu.classList.toggle("is-open", open);
  navScrim.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
}

navToggle.addEventListener("click", () => {
  setMobileMenu(!mobileMenu.classList.contains("is-open"));
});
navScrim.addEventListener("click", () => setMobileMenu(false));
$$(".nav__mobileLink").forEach((l) => l.addEventListener("click", () => setMobileMenu(false)));

/* ---------- Init ---------- */
renderWork();
renderGallery();
initReveal();
onScroll();
