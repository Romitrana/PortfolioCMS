import React, { useEffect } from "react";
import "./LiquidSpaceSection.css";

const LiquidSpaceSection = ({ children }) => {
  useEffect(() => {
    const svg = document.getElementById("liquid-border");
    if (!svg) return;
    const blobs = svg.querySelectorAll(".blob");

    const params = Array.from(blobs).map((b) => ({
      el: b,
      cx: parseFloat(b.getAttribute("cx")),
      cy: parseFloat(b.getAttribute("cy")),
      r: parseFloat(b.getAttribute("r")),
      targetCx: Math.random() * 100,
      targetCy: Math.random() * 100,
      targetR: 3 + Math.random() * 5,
      changeInterval: 6000 + Math.random() * 5000,
      lastChange: performance.now(),
      speed: 0.0025 + Math.random() * 0.004,
    }));

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = (now) => {
      params.forEach((p) => {
        if (now - p.lastChange > p.changeInterval) {
          p.targetCx = Math.random() * 100;
          p.targetCy = Math.random() * 100;
          p.targetR = 3 + Math.random() * 5;
          p.lastChange = now;
          p.changeInterval = 6000 + Math.random() * 5000;
        }

        p.cx = lerp(p.cx, p.targetCx, p.speed);
        p.cy = lerp(p.cy, p.targetCy, p.speed);
        p.r = lerp(p.r, p.targetR, p.speed * 0.5);

        p.el.setAttribute("cx", p.cx);
        p.el.setAttribute("cy", p.cy);
        p.el.setAttribute("r", p.r);
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="liquid-space">
      <svg
        id="liquid-border"
        className="liquid-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>

          <radialGradient id="blobGrad" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#9ae6ff" stopOpacity="1" />
            <stop offset="60%" stopColor="#b388ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
          </radialGradient>
        </defs>

        {/* Blobs without mask (so they're visible) */}
        <g filter="url(#goo)">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              className="blob"
              r={3 + Math.random() * 5}
              cx={10 + Math.random() * 80}
              cy={10 + Math.random() * 80}
              fill="url(#blobGrad)"
              opacity="0.85"
            />
          ))}
        </g>
      </svg>

      {/* Glass content layer */}
      <div className="liquid-glass">
        {children || (
          <>
            <h2>Liquid Space</h2>
            <p>Slow, floating blobs like liquid in zero gravity.</p>
          </>
        )}
      </div>
    </section>
  );
};

export default LiquidSpaceSection;
