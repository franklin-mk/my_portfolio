import { useEffect, useRef } from "react";

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -9999, y: -9999 };
    const getTargetCount = (w: number, h: number) =>
      Math.min(140, Math.max(32, Math.floor((w * h) / 9500)));

    let connectDist = width < 640 ? 125 : 180;
    const mouseDist = width < 640 ? 180 : 240;

    const createParticle = (w: number, h: number) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.6 + 1.1,
    });

    const particles = Array.from({ length: getTargetCount(width, height) }, () =>
      createParticle(width, height)
    );

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      connectDist = width < 640 ? 125 : 180;
      const target = getTargetCount(width, height);
      while (particles.length < target) particles.push(createParticle(width, height));
      if (particles.length > target) particles.length = target;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mouse.x = t.clientX;
        mouse.y = t.clientY;
      }
    };

    const resetPointer = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", resetPointer, { passive: true });
    document.addEventListener("mouseleave", resetPointer);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 242, 254, 0.5)";
        ctx.fill();

        const distMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distMouse < mouseDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - distMouse / mouseDist) * 0.65})`;
          ctx.lineWidth = 1.15;
          ctx.stroke();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(165, 243, 252, ${(1 - dist / connectDist) * 0.22})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", resetPointer);
      document.removeEventListener("mouseleave", resetPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}