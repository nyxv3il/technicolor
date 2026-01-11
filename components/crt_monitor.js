export function initCRT(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center">
            <!-- Glow background -->
            <div class="absolute inset-0 bg-[#4213C0] opacity-10 blur-[120px] animate-pulse"></div>
            
            <svg viewBox="0 0 500 500" class="w-full h-full drop-shadow-[0_0_50px_rgba(66,19,192,0.4)]">
                <!-- Outer Bezel -->
                <rect x="50" y="80" width="400" height="340" rx="40" fill="#1A1125" stroke="#4213C0" stroke-width="2" />
                
                <!-- Inner Screen -->
                <rect x="75" y="105" width="350" height="260" rx="20" fill="#0B0118" />
                
                <!-- Glitchy Content -->
                <g class="screen-graphics">
                    <!-- Scanline Bars -->
                    <g opacity="0.1">
                        <rect x="75" y="110" width="350" height="4" fill="#4213C0">
                            <animate attributeName="y" values="105;365;105" dur="10s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    
                    <!-- Wireframe Pulse -->
                    <g fill="none" stroke="#4213C0" stroke-width="1.5" stroke-dasharray="10 5">
                        <circle cx="250" cy="235" r="80">
                            <animate attributeName="r" values="75;85;75" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <path d="M180 235 L320 235 M250 165 L250 305" opacity="0.3" />
                    </g>

                    <!-- Central Core -->
                    <g fill="#FF00FF" opacity="0.8">
                        <rect x="235" y="220" width="30" height="30" rx="4">
                            <animateTransform attributeName="transform" type="rotate" from="0 250 235" to="360 250 235" dur="8s" repeatCount="indefinite" />
                        </rect>
                    </g>
                </g>

                <!-- Status Text -->
                <text x="250" y="340" text-anchor="middle" fill="#4213C0" font-family="Orbitron" font-size="10" letter-spacing="4" font-weight="bold">
                    SYSTEM_LINK_ACTIVE
                    <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                </text>

                <!-- Screws -->
                <circle cx="65" cy="95" r="3" fill="#0B0118" />
                <circle cx="435" cy="95" r="3" fill="#0B0118" />
                <circle cx="65" cy="405" r="3" fill="#0B0118" />
                <circle cx="435" cy="405" r="3" fill="#0B0118" />
            </svg>
        </div>
    `;

  container.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.1;
    const y = (e.clientY - top - height / 2) * 0.1;
    gsap.to(container, {
      rotateX: -y,
      rotateY: x,
      duration: 0.8,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to(container, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)",
    });
  });
}
