import { useRef, useEffect, useCallback } from 'react';

// Configuration for the particle animation
const PARTICLE_COUNT = 50;
const ACCENT_COLOR_RGB = '255, 90, 31'; // RGB for #FF5A1F (your accent color)
const PARTICLE_COLOR = `rgba(${ACCENT_COLOR_RGB}, 0.6)`;
const LINE_COLOR = `rgba(${ACCENT_COLOR_RGB}, 0.25)`;
const MAX_LINE_DISTANCE = 130;
const PARTICLE_SPEED = 0.3;
const PARTICLE_BASE_SIZE = 1.5;

class Particle {
    constructor(x, y, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.size = Math.random() * 1.5 + PARTICLE_BASE_SIZE;
        this.vx = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
        this.vy = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.size < 0 || this.x + this.size > this.canvasWidth) {
            this.vx *= -1;
        }
        if (this.y - this.size < 0 || this.y + this.size > this.canvasHeight) {
            this.vy *= -1;
        }
        
        this.x = Math.max(this.size, Math.min(this.x, this.canvasWidth - this.size));
        this.y = Math.max(this.size, Math.min(this.y, this.canvasHeight - this.size));
    }

    draw(ctx) {
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const DynamicNetworkBackground = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animationFrameId = useRef(null);
    const containerRef = useRef(null);

    const connectParticles = useCallback((ctx) => {
        for (let i = 0; i < particles.current.length; i++) {
            for (let j = i + 1; j < particles.current.length; j++) {
                const p1 = particles.current[i];
                const p2 = particles.current[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MAX_LINE_DISTANCE) {
                    ctx.strokeStyle = LINE_COLOR;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.current.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        connectParticles(ctx);

        animationFrameId.current = requestAnimationFrame(animate);
    }, [connectParticles]);

    const initializeCanvasAndParticles = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.scale(dpr, dpr);

        particles.current = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.current.push(new Particle(
                Math.random() * rect.width,
                Math.random() * rect.height,
                rect.width,
                rect.height
            ));
        }
        
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        animate();

    }, [animate]);

    useEffect(() => {
        initializeCanvasAndParticles();
        const handleResize = () => initializeCanvasAndParticles();
        window.addEventListener('resize', handleResize);
        
        let resizeObserver;
        if (containerRef.current) {
            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('resize', handleResize);
            if (resizeObserver && containerRef.current) {
                 // eslint-disable-next-line react-hooks/exhaustive-deps
                resizeObserver.unobserve(containerRef.current); 
            }
        };
    }, [initializeCanvasAndParticles]);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0,
                pointerEvents: 'none'
            }}
        >
            <canvas ref={canvasRef} />
        </div>
    );
};

export default DynamicNetworkBackground;