export function initCRT(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center">
            <!-- Glow background -->
            <div class="absolute inset-0 bg-[#4213C0] opacity-10 blur-[120px] animate-pulse"></div>
            
            <img src="/assets/compressed/pc.png" alt="PC HOLO"/>
        </div>
    `;

  // container.addEventListener("mousemove", (e) => {
  //   const { left, top, width, height } = container.getBoundingClientRect();
  //   const x = (e.clientX - left - width / 2) * 0.1;
  //   const y = (e.clientY - top - height / 2) * 0.1;
  //   gsap.to(container, {
  //     rotateX: -y,
  //     rotateY: x,
  //     duration: 0.8,
  //     ease: "power2.out",
  //     transformPerspective: 1000,
  //   });
  // });

  // container.addEventListener("mouseleave", () => {
  //   gsap.to(container, {
  //     rotateX: 0,
  //     rotateY: 0,
  //     duration: 1.2,
  //     ease: "elastic.out(1, 0.3)",
  //   });
  // });
}
