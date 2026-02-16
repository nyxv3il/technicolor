export function renderNav(currentView, onViewChange) {
  const navContainer = document.getElementById("navbar-container");
  if (!navContainer) return;

  const onHome = currentView === "home";

  navContainer.innerHTML = `
        <nav class="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex items-center gap-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto">
            <div class="flex items-center gap-3 cursor-pointer group" id="nav-logo">
                <div class="w-8 h-8 flex items-center justify-center rounded-lg transition-colors">
                    <img src="/assets/compressed/pc.png" alt="logo"/>
                </div>
            </div>

            <div class="hidden md:flex items-center gap-8 text-[10px] orbitron font-bold tracking-widest text-[#B0A8B9]">
                <a href="#about" class="nav-link hover:text-white transition-colors">ABOUT</a>
                <a href="#categories" class="nav-link hover:text-white transition-colors">CATEGORIES</a>
                <a href="#rnr" class="nav-link hover:text-white transition-colors">R&R</a>
                <a href="#contact" class="nav-link hover:text-white transition-colors">CONTACT</a>
                <a href="#" id="nav-leaderboard" class="hover:text-white transition-colors">LEADERBOARD</a>
            </div>

            <div class="h-6 w-[1px] bg-white/10 hidden md:block"></div>

            <button class="text-[10px] orbitron font-black tracking-widest px-6 py-2 rounded-full bg-gray-600 text-gray-400 cursor-not-allowed" disabled>
                CLOSED
            </button>
        </nav>
    `;

    document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      
      if (onHome) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        onViewChange("home");
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        }, 400); // Wait for transition
      }
    });
  });

  document.getElementById("nav-logo").addEventListener("click", () => {
    onViewChange("home");
  });

  document.getElementById("nav-leaderboard").addEventListener("click", (e) => {
    e.preventDefault();
    onViewChange("leaderboard");
  });
}
