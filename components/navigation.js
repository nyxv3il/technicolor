export function renderNav(currentView, onViewChange) {
  const navContainer = document.getElementById("navbar-container");
  if (!navContainer) return;

  navContainer.innerHTML = `
        <nav class="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex items-center gap-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto">
            <div class="flex items-center gap-3 cursor-pointer group" id="nav-logo">
                <div class="w-8 h-8 flex items-center justify-center rounded-lg transition-colors">
                    <img src="/assets/pc.png" alt="logo"/>
                </div>
            </div>
            
            <div class="hidden md:flex items-center gap-8 text-[10px] orbitron font-bold tracking-widest text-[#B0A8B9]">
                <a href="#" class="hover:text-white transition-colors">ABOUT</a>
                <a href="#categories" class="hover:text-white transition-colors">CATEGORIES</a>
                <a href="#rnr" class="hover:text-white transition-colors">R&R</a>
                <a href="#contact" class="hover:text-white transition-colors">CONTACT</a>
            </div>

            <div class="h-6 w-[1px] bg-white/10 hidden md:block"></div>

            <button id="nav-reg" class="text-[10px] orbitron font-black tracking-widest px-6 py-2 bg-white text-[#0B0118] rounded-full hover:bg-[#4213C0] hover:text-white transition-all">
                ${currentView === "home" ? "REGISTER" : "HOME"}
            </button>
        </nav>
    `;

  document.getElementById("nav-reg").addEventListener("click", () => {
    onViewChange(currentView === "home" ? "register" : "home");
  });

  document.getElementById("nav-logo").addEventListener("click", () => {
    onViewChange("home");
  });
}
