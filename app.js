import { renderNav } from "./components/navigation.js";
import { initCRT } from "./components/pc.js";
import { initTypewriter } from "./components/text_type.js";
import { initSpotlight } from "./components/spotlight.js";

const state = {
  view: "home",
  content: null,
};

// Simple client-side AI function (no API key exposed - uses free model)
async function askAI(query, context) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: `You are the Technicolor '26 AI Assistant for an Ananda College graphic design competition.

Competition Categories:
- Poster Design
- 3D Design
- Video Editing
- Photo Manipulation

Key Rules:
${JSON.stringify(context.rules, null, 2)}

Contact: ${context.contacts
              .map((c) => `${c.name} (${c.role}): ${c.phone}`)
              .join(", ")}

Answer this question in a brief, cyberpunk terminal style (2-3 sentences max): ${query}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error("AI Error:", error);

    // Fallback responses based on keywords
    const q = query.toLowerCase();

    if (q.includes("category") || q.includes("categories")) {
      return ">>> FOUR VECTORS AVAILABLE: Poster Design, 3D Design, Video Editing, Photo Manipulation. Choose your domain.";
    }
    if (q.includes("rule") || q.includes("submit")) {
      return ">>> KEY PROTOCOLS: Individual entry only. Upload to Drive with Grade_Name.zip format. Include 5 workspace screenshots. No plagiarism.";
    }
    if (q.includes("contact") || q.includes("help") || q.includes("phone")) {
      return `>>> COORDINATORS ONLINE: ${context.contacts
        .map((c) => c.name + " " + c.phone)
        .join(" | ")}`;
    }
    if (q.includes("eligible") || q.includes("who")) {
      return ">>> ELIGIBILITY: Exclusively for Ananda College students. Individual participation only.";
    }
    if (q.includes("format") || q.includes("file")) {
      return ">>> FILE SPECS: Video=.mp4 (H.264) | Static=.png/.jpg (300 DPI min) | Project files mandatory for Manipulation.";
    }
    if (q.includes("register") || q.includes("sign up")) {
      return ">>> SUBMISSION: Click SUBMIT button above to initialize entry protocol. Fill all required fields.";
    }
    if (q.includes("date") || q.includes("when") || q.includes("deadline")) {
      return ">>> TEMPORAL DATA: Submission deadline is on .";
    }

    return ">>> QUERY RECEIVED. For specific details, contact coordinators or check R&R section. Available vectors: categories, rules, eligibility, formats.";
  }
}

async function init() {
  try {
    const response = await fetch("./data/content.json");
    state.content = await response.json();

    renderView();
    setupGlobalEvents();
    lucide.createIcons();
  } catch (err) {
    console.error("Initialization failed:", err);
  }
}

function renderView() {
  const container = document.getElementById("main-content");
  renderNav(state.view, (targetView) => transitionTo(targetView));

  if (state.view === "home") {
    renderHome(container);
  } else {
    renderRegister(container);
  }

  initSpotlight();
  lucide.createIcons();
  window.scrollTo(0, 0);
}

function renderHome(container) {
  container.innerHTML = `
        <section id="about" class="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
            <div id="crt-container" class="w-full max-w-xl aspect-square mb-8 relative"></div>
            <div class="space-y-4">
                <h1 id="hero-title" class="text-6xl md:text-8xl font-black orbitron tracking-tighter italic glitch" data-text="TECHNICOLOR"></h1>
                <p class="text-lg md:text-xl text-[#B0A8B9] font-mono tracking-widest opacity-80 uppercase">
                    Intra-School Graphic Design Competition
                </p>
                <div class="pt-12">
                    <button id="cta-register" class="register-btn orbitron font-bold text-lg tracking-[0.3em]">
                    SUBMIT NOW
                    </button>
                </div>
            </div>
        </section>

        <section id="categories" class="py-32 px-4 max-w-7xl mx-auto">
            <h2 class="text-3xl orbitron mb-16 text-center text-white/40 tracking-[0.5em] uppercase">// CATEGORIES</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${state.content.categories
                  .map(
                    (cat, index) => `
                    <div class="spotlight-card p-4 rounded-xl group cursor-pointer h-full flex flex-col category-card" data-category="${index}">
                        <div class="relative h-64 bg-black/40 rounded-lg mb-6 overflow-hidden">
                            <img src="${cat.image}" alt="${cat.title}" class="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0118] to-transparent"></div>
                        </div>
                        <h3 class="orbitron text-xl mb-4 text-[#FF00FF] font-bold tracking-tight">${cat.title}</h3>
                        <p class="text-sm text-[#B0A8B9] leading-relaxed font-mono">${cat.description}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </section>

        <section id="rnr" class="py-32 px-4 bg-[#4213C0]/5">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl orbitron mb-16 text-center text-white/40 tracking-[0.5em] uppercase">// RULES_AND_REGULATIONS</h2>
                <div class="space-y-12">
                    ${state.content.rules
                      .map(
                        (section) => `
                        <div class="border-l-2 border-[#4213C0] pl-8 py-2">
                            <h3 class="text-xl font-bold orbitron text-white mb-6 uppercase tracking-wider">${
                              section.title
                            }</h3>
                            <ul class="space-y-4 font-mono">
                                ${section.items
                                  .map(
                                    (item) => `
                                    <li class="text-[#B0A8B9] flex gap-4 text-sm leading-relaxed">
                                        <span class="text-[#FF00FF] font-bold">>></span> ${item}
                                    </li>
                                `,
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </section>

        <section id="contact" class="py-32 px-4 max-w-5xl mx-auto">
             <h2 class="text-3xl orbitron mb-16 text-center text-white/40 tracking-[0.5em] uppercase">// CONTACT_NODES</h2>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                ${state.content.contacts
                  .map(
                    (c) => `
                    <a href="https://wa.me/${c.phone.replace(
                      /\+/g,
                      "",
                    )}" target="_blank" class="spotlight-card flex items-center gap-8 p-8 rounded-2xl group">
                        <div class="w-20 h-20 rounded-full bg-[#4213C0]/20 flex items-center justify-center group-hover:bg-[#4213C0]/40 transition-all border border-[#4213C0]/30 shadow-inner">
                            <i data-lucide="message-circle" class="text-[#FF00FF] group-hover:scale-110 transition-transform"></i>
                        </div>
                        <div>
                            <p class="orbitron text-xs opacity-50 uppercase tracking-widest mb-1">${
                              c.role
                            }</p>
                            <p class="text-2xl font-bold orbitron">${c.name}</p>
                            <p class="text-xs text-[#00FF00] font-mono mt-2 opacity-0 group-hover:opacity-100 transition-opacity">ESTABLISH_CONNECTION_</p>
                        </div>
                    </a>
                `,
                  )
                  .join("")}
             </div>
        </section>

        <footer class="py-16 border-t border-[#4213C0]/10 text-center">
            <div class="opacity-20 text-[10px] tracking-[1em] orbitron uppercase mb-4">Ananda College ICT Society</div>
            <div class="text-[#B0A8B9] text-xs font-mono">© 2026 TECHNICOLOR CORE // ALL SYSTEMS OPERATIONAL</div>
        </footer>

        <!-- Category Modal -->
        <div id="category-modal" class="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] hidden items-center justify-center p-4">
            <div class="bg-[#0B0118] border-2 border-[#4213C0] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(66,19,192,0.5)]">
                <div class="bg-[#4213C0] p-6 flex items-center justify-between">
                    <h2 id="modal-title" class="text-2xl font-black orbitron text-white tracking-wider uppercase"></h2>
                    <button id="close-modal" class="text-white hover:text-[#FF00FF] transition-colors">
                        <i data-lucide="x" size="28"></i>
                    </button>
                </div>
                <div id="modal-content" class="p-8 overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
                    <!-- Content will be inserted here -->
                </div>
            </div>
        </div>
    `;

  initCRT("crt-container");
  initTypewriter("hero-title", ["TECHNICOLOR", "DESIGN 2026"]);
}

function renderRegister(container) {
  container.innerHTML = `
        <section class="min-h-screen pt-48 pb-24 px-4 max-w-3xl mx-auto">
            <div class="mb-16">
                <button id="back-home" class="text-xs orbitron text-[#B0A8B9] hover:text-[#FF00FF] flex items-center gap-3 mb-8 transition-colors">
                    <i data-lucide="arrow-left" size="14"></i> RETURN_TO_BASE
                </button>
                <div class="space-y-2">
                    <h1 class="text-5xl font-black orbitron italic text-white tracking-tighter">INITIALIZE_ENTRY</h1>
                    <p class="text-[#00FF00] font-mono text-sm">TRANSMISSION: ENCRYPTED | TARGET: TECHNICOLOR_HUB</p>
                </div>
            </div>

            <form id="reg-form" class="space-y-10 font-mono" method="post" action="https://formspree.io/f/mvzaaego">
                <div class="grid grid-cols-1 gap-10">
                    <div class="flex flex-col gap-3">
                        <label class="text-[10px] uppercase tracking-[0.4em] text-[#4213C0] font-bold">OPERATOR_IDENTIFIER</label>
                        <input name="name" type="text" required class="terminal-input w-full" placeholder="Full Name...">
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="flex flex-col gap-3">
                            <label class="text-[10px] uppercase tracking-[0.4em] text-[#4213C0] font-bold">GRADE_TIER</label>
                            <select name="category" class="terminal-input w-full">
                                <option>3D Modeling</option>
                                <option>Poster Design</option>
                                <option>Photo Manipulation</option>
                                <option>Video Editing</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <label class="text-[10px] uppercase tracking-[0.4em] text-[#4213C0] font-bold">COMM_CHANNEL (WA)</label>
                        <input name="link" type="url" required class="terminal-input w-full" placeholder="Project URL">
                    </div>
                </div>

                <div class="pt-8">
                    <button type="submit" class="w-full bg-[#4213C0] hover:bg-[#FF00FF] py-6 orbitron text-white transition-all duration-500 tracking-[0.8em] font-bold shadow-[0_0_30px_rgba(66,19,192,0.3)]">
                        UPLOAD_DATA_STREAM
                    </button>
                </div>
            </form>
        </section>
    `;
}

function setupGlobalEvents() {
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("#reg-form");
    if (!form) return;

    e.preventDefault();

    setTimeout(() => {
      form.submit();
    }, 100);
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("#cta-register")) {
      transitionTo("register");
    }
    if (e.target.closest("#back-home")) {
      transitionTo("home");
    }
    if (e.target.closest("#ai-toggle")) {
      const chat = document.getElementById("ai-chat");
      chat.classList.toggle("hidden");
    }
    if (e.target.closest("#ai-send")) {
      handleAISend();
    }

    // Category card click handler
    const categoryCard = e.target.closest(".category-card");
    if (categoryCard) {
      const categoryIndex = parseInt(categoryCard.dataset.category);
      showCategoryModal(categoryIndex);
    }

    // Close modal handlers
    if (e.target.closest("#close-modal")) {
      closeCategoryModal();
    }
    if (e.target.id === "category-modal") {
      closeCategoryModal();
    }
  });

  document.getElementById("ai-input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAISend();
  });
}

function showCategoryModal(categoryIndex) {
  const category = state.content.categories[categoryIndex];
  const modal = document.getElementById("category-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");

  if (!modal || !modalTitle || !modalContent) return;

  // Set title
  modalTitle.textContent = category.title;

  // Category-specific rules
  const categoryRules = getCategoryRules(categoryIndex);

  // Build content
  modalContent.innerHTML = `
    <div class="space-y-8">
      ${categoryRules
        .map(
          (section) => `
        <div class="border-l-2 border-[#FF00FF] pl-6 py-2">
          <h3 class="text-lg font-bold orbitron text-white mb-4 uppercase tracking-wider">${section.title}</h3>
          <ul class="space-y-3 font-mono">
            ${section.items
              .map(
                (item) => `
              <li class="text-[#B0A8B9] flex gap-3 text-sm leading-relaxed">
                <span class="text-[#00FF00] font-bold">>></span> ${item}
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
      `,
        )
        .join("")}

      <div class="pt-4 border-t border-[#4213C0]/30">
        <p class="text-xs text-[#B0A8B9] font-mono text-center">
          For complete rules, refer to the R&R section below
        </p>
      </div>
    </div>
  `;

  // Show modal with animation
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  gsap.fromTo(
    modal.querySelector("div"),
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
  );

  lucide.createIcons();
}

function closeCategoryModal() {
  const modal = document.getElementById("category-modal");
  if (!modal) return;

  gsap.to(modal.querySelector("div"), {
    scale: 0.9,
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    },
  });
}

function getCategoryRules(categoryIndex) {
  // Map category index to the key in categoryRules
  const categoryKeys = ["poster", "3d", "video", "manipulation"];
  const categoryKey = categoryKeys[categoryIndex];

  // Get category-specific rules from content.json
  if (state.content.categoryRules && state.content.categoryRules[categoryKey]) {
    return state.content.categoryRules[categoryKey];
  }

  // Fallback if no rules found
  return [
    {
      title: "Rules Coming Soon",
      items: ["Detailed rules for this category will be announced soon."],
    },
  ];
}

async function handleAISend() {
  const input = document.getElementById("ai-input");
  const history = document.getElementById("chat-history");
  const msg = input.value.trim();
  if (!msg) return;

  input.value = "";
  history.innerHTML += `<div class="text-[#FF00FF] text-right font-bold"> > ${msg}</div>`;
  history.innerHTML += `<div class="text-[#B0A8B9] animate-pulse">/// PROCESSING...</div>`;
  history.scrollTop = history.scrollHeight;

  const response = await askAI(msg, state.content);

  // Remove "Processing..." message
  const messages = history.querySelectorAll("div");
  messages[messages.length - 1].remove();

  history.innerHTML += `<div class="text-[#00FF00]"> [CORE]: ${response}</div>`;
  history.scrollTop = history.scrollHeight;
}

function transitionTo(view) {
  if (state.view === view) return;
  gsap.to("#main-content", {
    opacity: 0,
    y: 10,
    duration: 0.3,
    onComplete: () => {
      state.view = view;
      renderView();
      gsap.fromTo(
        "#main-content",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    },
  });
}

document.addEventListener("DOMContentLoaded", init);
