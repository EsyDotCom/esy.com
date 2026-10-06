'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   Spacetime Curvature Visualization — Three.js
   
   Shows why "inside a black hole, every direction leads to the
   singularity" by rendering spacetime as a curved 3D surface.
   
   The viewer sees a funnel-like surface where:
   - Outside the horizon: the surface is relatively flat, particles
     can move freely in any direction
   - At the horizon: the surface curves dramatically
   - Inside: the curvature is so extreme that all geodesics
     (paths through spacetime) converge on the singularity
   
   Light cones are rendered as 3D cones on the surface that tilt
   inward as you approach and cross the horizon.
   ═══════════════════════════════════════════════════════════════ */

// Color palette matching the essay's design system
const COLORS = {
  void: 0x050508,
  gridOutside: 0x3d7ec7,    // lensing blue
  gridInside: 0xb5382a,     // danger red
  horizon: 0x1a9e8f,        // horizon teal
  singularity: 0xffffff,
  accretionGold: 0xc4922a,
  particle: 0xc4922a,
  particleTrail: 0x3d7ec7,
  coneOutside: 0x3d7ec7,
  coneInside: 0xb5382a,
  text: 0x8a8580,
};

// Spacetime surface: parametric function mapping (r, θ) → 3D
// Uses a modified Flamm's paraboloid-inspired shape
function spacetimeHeight(r, horizonR) {
  if (r < 0.05) return -8; // singularity depth
  if (r <= horizonR) {
    // Inside horizon: steep inward curve
    const t = r / horizonR;
    return -8 + 6 * Math.pow(t, 0.6);
  } else {
    // Outside horizon: gentle curve flattening to 0
    const t = (r - horizonR) / (1 - horizonR);
    return -2 + 2 * Math.pow(t, 0.4);
  }
}

export default function SpacetimeVisualization({ className = '' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [initFailed, setInitFailed] = useState(false);

  // Cleanup
  const cleanup = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current.forceContextLoss();
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = Math.min(width * 0.85, 600);
    container.style.height = `${height}px`;

    // Guard: Three.js shader compilation may use new Function() which CSP can block.
    // Test eval availability before initializing WebGL to fail gracefully.
    try {
      new Function('return true')();
    } catch {
      console.warn('[SpacetimeVisualization] CSP blocks eval — showing fallback.');
      setInitFailed(true);
      return;
    }

    // ─── Scene setup ───
    let scene = null;
    let renderer = null;
    try {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.void);
    scene.fog = new THREE.FogExp2(COLORS.void, 0.04);
    sceneRef.current = scene;

    // ─── Camera ───
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(8, 10, 12);
    camera.lookAt(0, -2, 0);
    cameraRef.current = camera;

    // ─── Renderer ───
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'default',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0x222233, 0.8);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.4);
    topLight.position.set(0, 10, 5);
    scene.add(topLight);

    const horizonLight = new THREE.PointLight(COLORS.horizon, 1.5, 15);
    horizonLight.position.set(0, -1, 0);
    scene.add(horizonLight);

    const goldLight = new THREE.PointLight(COLORS.accretionGold, 0.8, 20);
    goldLight.position.set(0, 0, 0);
    scene.add(goldLight);

    // ─── Build spacetime surface ───
    const horizonR = 0.35;
    const segments = 80;
    const maxR = 1.0;
    const surfaceGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const indices = [];

    for (let ri = 0; ri <= segments; ri++) {
      for (let ti = 0; ti <= segments; ti++) {
        const r = (ri / segments) * maxR;
        const theta = (ti / segments) * Math.PI * 2;

        const scale = 10;
        const x = r * Math.cos(theta) * scale;
        const z = r * Math.sin(theta) * scale;
        const y = spacetimeHeight(r, horizonR);

        positions.push(x, y, z);

        // Color based on region
        const color = new THREE.Color();
        if (r <= horizonR * 0.05) {
          color.setHex(COLORS.singularity);
        } else if (r <= horizonR) {
          const t = r / horizonR;
          color.lerpColors(
            new THREE.Color(COLORS.gridInside),
            new THREE.Color(COLORS.horizon),
            t
          );
          color.multiplyScalar(0.3 + t * 0.4);
        } else {
          const t = Math.min((r - horizonR) / (maxR - horizonR), 1);
          color.lerpColors(
            new THREE.Color(COLORS.horizon),
            new THREE.Color(COLORS.gridOutside),
            t
          );
          color.multiplyScalar(0.2 + t * 0.3);
        }
        colors.push(color.r, color.g, color.b);
      }
    }

    // Build triangle indices
    for (let ri = 0; ri < segments; ri++) {
      for (let ti = 0; ti < segments; ti++) {
        const a = ri * (segments + 1) + ti;
        const b = a + 1;
        const c = (ri + 1) * (segments + 1) + ti;
        const d = c + 1;
        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }

    surfaceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    surfaceGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    surfaceGeometry.setIndex(indices);
    surfaceGeometry.computeVertexNormals();

    const surfaceMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      roughness: 0.7,
      metalness: 0.2,
      wireframe: false,
    });

    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    scene.add(surface);

    // ─── Wireframe overlay for grid effect ───
    const wireGeometry = surfaceGeometry.clone();
    const wireMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wireframe);

    // ─── Event horizon ring ───
    const horizonPoints = [];
    const horizonSegments = 128;
    for (let i = 0; i <= horizonSegments; i++) {
      const theta = (i / horizonSegments) * Math.PI * 2;
      const x = horizonR * Math.cos(theta) * 10;
      const z = horizonR * Math.sin(theta) * 10;
      const y = spacetimeHeight(horizonR, horizonR);
      horizonPoints.push(new THREE.Vector3(x, y, z));
    }
    const horizonCurve = new THREE.CatmullRomCurve3(horizonPoints, true);
    const horizonTubeGeometry = new THREE.TubeGeometry(horizonCurve, 128, 0.06, 8, true);
    const horizonMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.horizon,
      transparent: true,
      opacity: 0.9,
    });
    const horizonRing = new THREE.Mesh(horizonTubeGeometry, horizonMaterial);
    scene.add(horizonRing);

    // Horizon glow
    const horizonGlowGeometry = new THREE.TubeGeometry(horizonCurve, 128, 0.25, 8, true);
    const horizonGlowMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.horizon,
      transparent: true,
      opacity: 0.12,
    });
    scene.add(new THREE.Mesh(horizonGlowGeometry, horizonGlowMaterial));

    // ─── Singularity glow at bottom ───
    const singGeo = new THREE.SphereGeometry(0.3, 32, 32);
    const singMat = new THREE.MeshBasicMaterial({
      color: COLORS.singularity,
      transparent: true,
      opacity: 0.6,
    });
    const singularity = new THREE.Mesh(singGeo, singMat);
    singularity.position.set(0, -8, 0);
    scene.add(singularity);

    // Singularity outer glow
    const singGlowGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const singGlowMat = new THREE.MeshBasicMaterial({
      color: COLORS.accretionGold,
      transparent: true,
      opacity: 0.15,
    });
    const singGlow = new THREE.Mesh(singGlowGeo, singGlowMat);
    singGlow.position.set(0, -8, 0);
    scene.add(singGlow);

    // ─── Light cones on the surface ───
    const cones = [];
    const conePositions = [
      // Outside horizon: upright cones
      { r: 0.7, theta: 0, tilt: 0.1 },
      { r: 0.55, theta: Math.PI * 0.5, tilt: 0.2 },
      { r: 0.85, theta: Math.PI, tilt: 0.05 },
      { r: 0.6, theta: Math.PI * 1.5, tilt: 0.15 },
      // Near horizon: tilting cones
      { r: 0.40, theta: Math.PI * 0.25, tilt: 0.6 },
      { r: 0.42, theta: Math.PI * 1.25, tilt: 0.55 },
      // Inside horizon: severely tilted cones
      { r: 0.25, theta: Math.PI * 0.75, tilt: 1.2 },
      { r: 0.18, theta: Math.PI * 1.75, tilt: 1.5 },
      { r: 0.12, theta: 0.5, tilt: 1.7 },
    ];

    conePositions.forEach(({ r, theta, tilt }) => {
      const coneHeight = 0.8;
      const coneRadius = 0.35;
      const coneGeo = new THREE.ConeGeometry(coneRadius, coneHeight, 16, 1, true);
      const isInside = r <= horizonR;
      const coneMat = new THREE.MeshBasicMaterial({
        color: isInside ? COLORS.coneInside : COLORS.coneOutside,
        transparent: true,
        opacity: isInside ? 0.25 : 0.2,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);

      const x = r * Math.cos(theta) * 10;
      const z = r * Math.sin(theta) * 10;
      const y = spacetimeHeight(r, horizonR);
      cone.position.set(x, y + coneHeight * 0.5, z);

      // Tilt the cone toward the singularity center
      const dirToCenter = new THREE.Vector3(-x, 0, -z).normalize();
      cone.rotateOnAxis(new THREE.Vector3(dirToCenter.z, 0, -dirToCenter.x).normalize(), tilt);

      scene.add(cone);
      cones.push(cone);

      // Wireframe edge for the cone
      const coneEdge = new THREE.Mesh(coneGeo.clone(), new THREE.MeshBasicMaterial({
        color: isInside ? COLORS.coneInside : COLORS.coneOutside,
        transparent: true,
        opacity: isInside ? 0.5 : 0.35,
        wireframe: true,
      }));
      coneEdge.position.copy(cone.position);
      coneEdge.rotation.copy(cone.rotation);
      scene.add(coneEdge);
    });

    // ─── Falling particles ───
    const createParticle = (startR, startTheta, isDemo) => {
      const geo = new THREE.SphereGeometry(0.08, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: isDemo ? COLORS.accretionGold : COLORS.particle,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Trail
      const trailPoints = [];
      for (let i = 0; i < 50; i++) {
        trailPoints.push(new THREE.Vector3(0, 0, 0));
      }
      const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const trailMat = new THREE.LineBasicMaterial({
        color: isDemo ? COLORS.accretionGold : COLORS.particleTrail,
        transparent: true,
        opacity: 0.4,
      });
      const trail = new THREE.Line(trailGeo, trailMat);
      scene.add(trail);

      scene.add(mesh);

      return {
        mesh,
        trail,
        trailGeo,
        r: startR,
        theta: startTheta,
        speed: 0.001 + Math.random() * 0.001,
        angularSpeed: (Math.random() - 0.5) * 0.01,
        history: [],
        alive: true,
        isDemo,
      };
    };

    // Create demo particles that fall in from different angles
    const demoParticles = [
      createParticle(0.9, 0, true),
      createParticle(0.85, Math.PI * 0.7, true),
      createParticle(0.75, Math.PI * 1.4, true),
    ];
    particlesRef.current = demoParticles;

    // ─── Slow orbit camera ───
    let cameraAngle = 0.3;
    const cameraRadius = 16;
    const cameraHeight = 9;

    // ─── Animate ───
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Slow camera orbit
      cameraAngle += 0.0008;
      camera.position.x = Math.cos(cameraAngle) * cameraRadius;
      camera.position.z = Math.sin(cameraAngle) * cameraRadius;
      camera.position.y = cameraHeight + Math.sin(t * 0.2) * 0.5;
      camera.lookAt(0, -2, 0);

      // Horizon glow pulse
      horizonMaterial.opacity = 0.7 + Math.sin(t * 1.5) * 0.2;
      horizonGlowMaterial.opacity = 0.08 + Math.sin(t * 1.5) * 0.04;

      // Singularity pulse
      singMat.opacity = 0.4 + Math.sin(t * 2) * 0.2;
      singGlowMat.opacity = 0.1 + Math.sin(t * 2) * 0.06;
      singGlow.scale.setScalar(1 + Math.sin(t * 2) * 0.15);

      // Update particles
      particlesRef.current.forEach((p) => {
        if (!p.alive) return;

        // Accelerate toward singularity
        const accel = p.r <= horizonR
          ? 0.003 + (horizonR - p.r) * 0.015  // fast inside
          : 0.0008 + (1 - p.r) * 0.0005;     // gentle outside

        p.r -= accel;
        p.theta += p.angularSpeed * (1 + (horizonR / Math.max(p.r, 0.05)) * 0.5);

        if (p.r < 0.03) {
          // Particle reached singularity — reset
          p.r = 0.8 + Math.random() * 0.15;
          p.theta = Math.random() * Math.PI * 2;
          p.history = [];
        }

        const x = p.r * Math.cos(p.theta) * 10;
        const z = p.r * Math.sin(p.theta) * 10;
        const y = spacetimeHeight(p.r, horizonR) + 0.15;

        p.mesh.position.set(x, y, z);

        // Track trail history
        p.history.push(new THREE.Vector3(x, y, z));
        if (p.history.length > 50) p.history.shift();

        // Update trail geometry
        const trailPositions = p.trailGeo.attributes.position.array;
        for (let i = 0; i < 50; i++) {
          const hi = Math.max(0, p.history.length - 50 + i);
          if (hi < p.history.length) {
            trailPositions[i * 3] = p.history[hi].x;
            trailPositions[i * 3 + 1] = p.history[hi].y;
            trailPositions[i * 3 + 2] = p.history[hi].z;
          }
        }
        p.trailGeo.attributes.position.needsUpdate = true;

        // Particle color shift: gold outside → red inside
        if (p.r <= horizonR) {
          const redShift = 1 - (p.r / horizonR);
          p.mesh.material.color.lerpColors(
            new THREE.Color(COLORS.accretionGold),
            new THREE.Color(COLORS.gridInside),
            redShift
          );
        } else {
          p.mesh.material.color.setHex(COLORS.accretionGold);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // ─── Resize handler ───
    const onResize = () => {
      const w = container.clientWidth;
      const h = Math.min(w * 0.85, 600);
      container.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cleanup();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    } catch (err) {
      // Three.js init failed (CSP, WebGL unavailable, etc.) — degrade gracefully
      console.warn('[SpacetimeVisualization] Three.js initialization failed:', err);
      setInitFailed(true);
      // Clean up any partial renderer
      if (renderer) {
        try { renderer.dispose(); renderer.forceContextLoss(); } catch {}
        try {
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        } catch {}
      }
      return undefined; // no cleanup needed
    }
  }, [isVisible, cleanup]);

  // ─── Static SVG fallback when Three.js cannot initialize ───
  if (initFailed) {
    return (
      <div className={`bh-spacetime-viz ${className}`}
        role="figure"
        aria-label="Diagram of spacetime curvature around a black hole. All paths inside the event horizon lead to the singularity."
        style={{ height: 500, background: '#050508', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 400 360" width="380" height="340" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%' }}>
          {/* Funnel shape representing curved spacetime */}
          <defs>
            <radialGradient id="sv-glow" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#1a9e8f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#050508" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sv-funnel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d7ec7" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#1a9e8f" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#b5382a" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="100" rx="160" ry="40" fill="none" stroke="#3d7ec7" strokeWidth="0.8" opacity="0.2" />
          <ellipse cx="200" cy="100" rx="120" ry="30" fill="none" stroke="#3d7ec7" strokeWidth="0.8" opacity="0.15" />
          {/* Event horizon ring */}
          <ellipse cx="200" cy="160" rx="80" ry="20" fill="none" stroke="#1a9e8f" strokeWidth="2" opacity="0.8" />
          {/* Funnel walls */}
          <path d="M 120 160 Q 140 240, 190 310" fill="none" stroke="url(#sv-funnel)" strokeWidth="1.5" />
          <path d="M 280 160 Q 260 240, 210 310" fill="none" stroke="url(#sv-funnel)" strokeWidth="1.5" />
          {/* Inner grid lines */}
          {[0.3, 0.5, 0.7].map((f, i) => (
            <ellipse key={i} cx="200" cy={160 + f * 120} rx={80 - f * 60} ry={20 - f * 15}
              fill="none" stroke="#b5382a" strokeWidth="0.6" opacity={0.15 + i * 0.05} />
          ))}
          {/* Glow at center */}
          <circle cx="200" cy="170" r="80" fill="url(#sv-glow)" />
          {/* Singularity */}
          <circle cx="200" cy="315" r="4" fill="#fff" opacity="0.6" />
          <circle cx="200" cy="315" r="8" fill="#c4922a" opacity="0.15" />
          {/* Light cones */}
          <g opacity="0.5">
            <path d="M 310 120 L 330 95 L 290 95 Z" fill="none" stroke="#3d7ec7" strokeWidth="1" />
            <circle cx="310" cy="120" r="2.5" fill="#3d7ec7" />
          </g>
          <g opacity="0.5">
            <path d="M 170 200 L 185 178 L 155 178 Z" fill="none" stroke="#b5382a" strokeWidth="1" />
            <circle cx="170" cy="200" r="2.5" fill="#b5382a" />
          </g>
          {/* Labels */}
          <text x="200" y="340" textAnchor="middle" fill="#8a8580" fontSize="9" fontFamily="var(--bh-font-mono), monospace" letterSpacing="0.15em">SINGULARITY</text>
          <text x="200" y="148" textAnchor="middle" fill="#1a9e8f" fontSize="9" fontFamily="var(--bh-font-mono), monospace" opacity="0.7">EVENT HORIZON</text>
        </svg>
        <div className="bh-spacetime-viz__labels">
          <div className="bh-spacetime-viz__label bh-spacetime-viz__label--horizon">
            <span className="bh-spacetime-viz__label-dot" style={{ background: 'var(--bh-horizon-teal)' }} />
            Event horizon
          </div>
          <div className="bh-spacetime-viz__label bh-spacetime-viz__label--outside">
            <span className="bh-spacetime-viz__label-dot" style={{ background: 'var(--bh-lensing-blue)' }} />
            Light cones outside — paths can go anywhere
          </div>
          <div className="bh-spacetime-viz__label bh-spacetime-viz__label--inside">
            <span className="bh-spacetime-viz__label-dot" style={{ background: 'var(--bh-danger-red)' }} />
            Light cones inside — all paths lead down
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bh-spacetime-viz ${className}`} ref={containerRef}
      role="figure"
      aria-label="3D visualization of spacetime curvature around a black hole. A funnel-shaped surface shows how all paths inside the event horizon lead to the singularity."
    >
      <div className="bh-spacetime-viz__labels">
        <div className="bh-spacetime-viz__label bh-spacetime-viz__label--horizon">
          <span className="bh-spacetime-viz__label-dot" style={{ background: 'var(--bh-horizon-teal)' }} />
          Event horizon
        </div>
        <div className="bh-spacetime-viz__label bh-spacetime-viz__label--outside">
          <span className="bh-spacetime-viz__label-dot" style={{ background: 'var(--bh-lensing-blue)' }} />
          Light cones outside — paths can go anywhere
        </div>
        <div className="bh-spacetime-viz__label bh-spacetime-viz__label--inside">
          <span className="bh-spacetime-viz__label-dot" style={{ background: 'var(--bh-danger-red)' }} />
          Light cones inside — all paths lead down
        </div>
      </div>
    </div>
  );
}
