(function () {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles;
    const mouse = { x: -9999, y: -9999 };

    const CONFIG = {
        count:        150,
        baseRadius:   1.4,
        speed:        0.18,
        lineDistance: 120,
        mouseRadius:  50,
        colors: [
            'rgba(139,0,0,',
            'rgba(170,15,0,',
            'rgba(100,0,0,',
            'rgba(210,40,40,'
        ]
    };

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function mkParticle() {
        const col = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        return {
            x:   Math.random() * W,
            y:   Math.random() * H,
            vx:  (Math.random() - 0.5) * CONFIG.speed * 2,
            vy:  (Math.random() - 0.5) * CONFIG.speed * 2,
            r:   CONFIG.baseRadius + Math.random() * 1.3,
            col: col,
            op:  0.35 + Math.random() * 0.55
        };
    }

    function init() {
        resize();
        particles = Array.from({ length: CONFIG.count }, mkParticle);
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
            const p  = particles[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const md = Math.sqrt(dx * dx + dy * dy);

            if (md < CONFIG.mouseRadius && md > 0) {
                const force = (CONFIG.mouseRadius - md) / CONFIG.mouseRadius;
                p.x += (dx / md) * force * 1.8;
                p.y += (dy / md) * force * 1.8;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0)  p.x = W;
            if (p.x > W)  p.x = 0;
            if (p.y < 0)  p.y = H;
            if (p.y > H)  p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.col + p.op + ')';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const q  = particles[j];
                const ex = p.x - q.x;
                const ey = p.y - q.y;
                const ed = Math.sqrt(ex * ex + ey * ey);

                if (ed < CONFIG.lineDistance) {
                    const t = 1 - ed / CONFIG.lineDistance;

                    // bright core line
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = 'rgba(255,30,30,' + (t * 0.55) + ')';
                    ctx.lineWidth   = 1.2;
                    ctx.stroke();

                    // soft glow halo around line
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = 'rgba(255,80,60,' + (t * 0.18) + ')';
                    ctx.lineWidth   = 3.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        resize();
        particles = Array.from({ length: CONFIG.count }, mkParticle);
    });

    init();
    draw();
})();
