import { renderNav } from "./components/navigation.js";
import { initCRT } from "./components/pc.js";
import { initTypewriter } from "./components/text_type.js";
import { initSpotlight } from "./components/spotlight.js";

const state = {
  view: "home",
  content: null,
};

// Updated AI function to call Netlify serverless function
async function askAI(query, context) {
  try {
    const response = await fetch("/.netlify/functions/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, context }),
    });

    const data = await response.json();

    if (data.error) {
      return data.error;
    }

    return data.message;
  } catch (error) {
    console.error("AI Error:", error);
    return "CONNECTION_FAILURE: Unable to reach core processor.";
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
                        REGISTER NOW
                    </button>
                </div>
            </div>
        </section>

        <section id="categories" class="py-32 px-4 max-w-7xl mx-auto">
            <h2 class="text-3xl orbitron mb-16 text-center text-white/40 tracking-[0.5em] uppercase">// CATEGORIES</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${state.content.categories
                  .map(
                    (cat) => `
                    <div class="spotlight-card p-4 rounded-xl group cursor-pointer h-full flex flex-col">
                        <div class="relative h-64 bg-black/40 rounded-lg mb-6 overflow-hidden">
                            <img src="${cat.image}" alt="${cat.title}" class="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0118] to-transparent"></div>
                        </div>
                        <h3 class="orbitron text-xl mb-4 text-[#FF00FF] font-bold tracking-tight">${cat.title}</h3>
                        <p class="text-sm text-[#B0A8B9] leading-relaxed font-mono">${cat.description}</p>
                    </div>
                `
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
                                `
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    `
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
                      new RegExp("\\+", "g"),
                      ""
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
                `
                  )
                  .join("")}
             </div>
        </section>

        <footer class="py-16 border-t border-[#4213C0]/10 text-center">
            <div class="opacity-20 text-[10px] tracking-[1em] orbitron uppercase mb-4">Ananda College ICT Society</div>
            <div class="text-[#B0A8B9] text-xs font-mono">© 2026 TECHNICOLOR CORE // ALL SYSTEMS OPERATIONAL</div>
        </footer>
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

            <form id="reg-form" class="space-y-10 font-mono" method="post" action="https://formspree.io/f/mlggrkkw">
                <div class="grid grid-cols-1 gap-10">
                    <div class="flex flex-col gap-3">
                        <label class="text-[10px] uppercase tracking-[0.4em] text-[#4213C0] font-bold">OPERATOR_IDENTIFIER</label>
                        <input name="name" type="text" required class="terminal-input w-full" placeholder="Full Name...">
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="flex flex-col gap-3">
                            <label class="text-[10px] uppercase tracking-[0.4em] text-[#4213C0] font-bold">INITIALIZATION_DATE</label>
                            <input name="bday" type="text" required class="terminal-input w-full" placeholder="Birthday (eg: 25/01/2008)">
                        </div>
                        <div class="flex flex-col gap-3">
                            <label class="text-[10px] uppercase tracking-[0.4em] text-[#4213C0] font-bold">GRADE_TIER</label>
                            <select name="grade" class="terminal-input w-full">
                                <option>Grade 06</option>
                                <option>Grade 07</option>
                                <option>Grade 08</option>
                                <option>Grade 09</option>
                                <option>Grade 10</option>
                                <option>Grade 11</option>
                                <option>Grade 12</option>
                                <option>Grade 13</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-col gap-6">
                        <label class="text-[10px] uppercase tracking-[0.4em] text-[#4213C0] font-bold">COMPETITION_VECTORS</label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label class="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] rounded cursor-pointer hover:bg-[#4213C0]/10 hover:border-[#4213C0]/50 transition-all group">
                                    <input name="poster" type="checkbox" class="w-4 h-4 accent-[#FF00FF]">
                                    <span class="text-xs uppercase tracking-widest group-hover:text-white transition-colors">Poster Design</span>
                                </label>
                                <label class="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] rounded cursor-pointer hover:bg-[#4213C0]/10 hover:border-[#4213C0]/50 transition-all group">
                                    <input name="manipulation" type="checkbox" class="w-4 h-4 accent-[#FF00FF]">
                                    <span class="text-xs uppercase tracking-widest group-hover:text-white transition-colors">Manipulation</span>
                                </label>
                                <label class="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] rounded cursor-pointer hover:bg-[#4213C0]/10 hover:border-[#4213C0]/50 transition-all group">
                                    <input name="3d" type="checkbox" class="w-4 h-4 accent-[#FF00FF]">
                                    <span class="text-xs uppercase tracking-widest group-hover:text-white transition-colors">3D Design</span>
                                </label>
                                <label class="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] rounded cursor-pointer hover:bg-[#4213C0]/10 hover:border-[#4213C0]/50 transition-all group">
                                    <input name="video" type="checkbox" class="w-4 h-4 accent-[#FF00FF]">
                                    <span class="text-xs uppercase tracking-widest group-hover:text-white transition-colors">Video Editing</span>
                                </label>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <label class="text-[10px] uppercase tracking-[0.4em] text-[#4213C0] font-bold">COMM_CHANNEL (WA)</label>
                        <input name="number" type="tel" required class="terminal-input w-full" placeholder="+94 7X XXX XXXX">
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
  });

  document.getElementById("ai-input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAISend();
  });
}

async function handleAISend() {
  const input = document.getElementById("ai-input");
  const history = document.getElementById("chat-history");
  const msg = input.value.trim();
  if (!msg) return;

  input.value = "";
  history.innerHTML += `<div class="text-[#FF00FF] text-right font-bold"> > ${msg}</div>`;
  history.innerHTML += `<div class="text-[#B0A8B9]">Processing...</div>`;
  history.scrollTop = history.scrollHeight;

  const response = await askAI(msg, state.content);

  // Remove "Processing..." message
  const messages = history.querySelectorAll("div");
  messages[messages.length - 1].remove();

  history.innerHTML += `<div class="text-[#00FF00]"> [AI]: ${response}</div>`;
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
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    },
  });
}

document.addEventListener("DOMContentLoaded", init);
