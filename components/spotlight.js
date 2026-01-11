export function initSpotlight() {
    const cards = document.querySelectorAll('.spotlight-card');
    
    cards.forEach(card => {

        const glow = document.createElement('div');
        glow.className = 'spotlight-glow';
        card.appendChild(glow);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(glow, {
                left: x,
                top: y,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseenter', () => {
            gsap.to(glow, { opacity: 1, duration: 0.3 });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(glow, { opacity: 0, duration: 0.3 });
        });
    });
}
