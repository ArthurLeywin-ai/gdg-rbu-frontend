import React, { useEffect, useRef, useState } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  Shape,
  ExtrudeGeometry,
  ExtrudeGeometryOptions,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Mesh,
  CanvasTexture,
  PlaneGeometry,
  BoxGeometry,
  SphereGeometry,
  CylinderGeometry,
  AmbientLight,
  DirectionalLight,
  Clock,
  SRGBColorSpace,
} from 'three';
import { HeroFallback } from './HeroFallback';
import './Hero.css';

interface HeroCanvasProps {
  pointerPos: { x: number; y: number }; // Normalized -1 to +1
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ pointerPos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const pointerRef = useRef(pointerPos);
  pointerRef.current = pointerPos;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. WebGL Feature Detection
    let isWebGLSupported = false;
    try {
      const testCanvas = document.createElement('canvas');
      isWebGLSupported = Boolean(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl2') || testCanvas.getContext('webgl'))
      );
    } catch {
      isWebGLSupported = false;
    }

    if (!isWebGLSupported) {
      setHasWebGLError(true);
      return;
    }

    // 2. Reduced Motion Detection
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    // 3. Renderer Initialization
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.outputColorSpace = SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGLError(true);
      return;
    }

    // Context loss handler
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setHasWebGLError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    // Responsive camera distance helper to prevent shrunken 3D form on mobile
    const getCameraZ = (width: number) => {
      if (width < 380) return 12.6;
      if (width < 500) return 13.2;
      return 14.5;
    };

    // 4. Scene & Camera Setup
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, getCameraZ(container.clientWidth));

    // Root Group for interactive tilt & idle float
    const rootGroup = new Group();
    scene.add(rootGroup);

    // 5. Build Asymmetric Neo-Brutal Polygon Shape
    // Replicating the iconic rounded stepped silhouette from Figma
    const shape = new Shape();
    shape.moveTo(-3.2, 0.4);
    shape.lineTo(-3.2, 1.4);
    shape.quadraticCurveTo(-3.2, 2.0, -2.6, 2.0);
    shape.lineTo(-0.4, 2.0);
    shape.quadraticCurveTo(0.2, 2.0, 0.4, 2.4);
    shape.lineTo(1.2, 2.8);
    shape.quadraticCurveTo(1.8, 3.1, 2.4, 3.1);
    shape.lineTo(3.2, 3.1);
    shape.quadraticCurveTo(3.8, 3.1, 3.8, 2.5);
    shape.lineTo(3.8, 0.6);
    shape.quadraticCurveTo(3.8, 0.1, 3.3, 0.1);
    shape.lineTo(2.4, 0.1);
    shape.quadraticCurveTo(2.0, 0.1, 2.0, -0.4);
    shape.lineTo(2.0, -1.8);
    shape.quadraticCurveTo(2.0, -2.5, 1.4, -2.5);
    shape.lineTo(-2.4, -2.5);
    shape.quadraticCurveTo(-3.2, -2.5, -3.2, -1.7);
    shape.closePath();

    const extrudeSettings: ExtrudeGeometryOptions = {
      depth: 0.8,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.12,
      bevelThickness: 0.12,
    };

    const mainGeometry = new ExtrudeGeometry(shape, extrudeSettings);
    mainGeometry.center(); // Center rotation pivot

    const mainMaterial = new MeshStandardMaterial({
      color: 0x111114,
      roughness: 0.32,
      metalness: 0.18,
    });

    const mainMesh = new Mesh(mainGeometry, mainMaterial);
    rootGroup.add(mainMesh);

    // 6. Build Decorative White Search Capsule ("🔍 gdgr")
    const capsuleCanvas = document.createElement('canvas');
    capsuleCanvas.width = 512;
    capsuleCanvas.height = 140;
    const ctx = capsuleCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(4, 4, 504, 132, 66);
      ctx.fill();

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(130, 70, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(148, 88);
      ctx.lineTo(172, 112);
      ctx.stroke();

      ctx.fillStyle = '#4b5563';
      ctx.font = 'bold 52px "Space Mono", monospace, Courier';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('gdgr', 205, 73);
    }

    const capsuleTexture = new CanvasTexture(capsuleCanvas);
    capsuleTexture.colorSpace = SRGBColorSpace;
    capsuleTexture.anisotropy = 4;

    const capsuleGeo = new PlaneGeometry(3.1, 0.85);
    const capsuleMat = new MeshBasicMaterial({
      map: capsuleTexture,
      transparent: true,
    });
    const capsuleMesh = new Mesh(capsuleGeo, capsuleMat);
    capsuleMesh.position.set(0.1, -0.1, 0.53);
    rootGroup.add(capsuleMesh);

    // 7. Secondary Google Geometric Accent Primitives (Tasteful & Subdued)
    const accents: { mesh: Mesh; speedX: number; speedY: number; baseX: number; baseY: number; baseZ: number; offset: number }[] = [];

    // Accent 1: Blue rounded cube (Google Blue)
    const blueGeo = new BoxGeometry(0.55, 0.55, 0.55);
    const blueMat = new MeshStandardMaterial({
      color: 0x4285F4,
      roughness: 0.25,
      metalness: 0.1,
    });
    const blueMesh = new Mesh(blueGeo, blueMat);
    blueMesh.position.set(-3.1, 2.3, 0.6);
    rootGroup.add(blueMesh);
    accents.push({ mesh: blueMesh, speedX: 0.8, speedY: 0.5, baseX: -3.1, baseY: 2.3, baseZ: 0.6, offset: 0 });

    // Accent 2: Yellow sphere (Google Yellow)
    const yellowGeo = new SphereGeometry(0.38, 24, 24);
    const yellowMat = new MeshStandardMaterial({
      color: 0xFBBC04,
      roughness: 0.2,
      metalness: 0.15,
    });
    const yellowMesh = new Mesh(yellowGeo, yellowMat);
    yellowMesh.position.set(3.4, 2.4, -0.3);
    rootGroup.add(yellowMesh);
    accents.push({ mesh: yellowMesh, speedX: 0.5, speedY: 0.7, baseX: 3.4, baseY: 2.4, baseZ: -0.3, offset: 1.5 });

    // Accent 3: Green cylinder (Google Green)
    const greenGeo = new CylinderGeometry(0.28, 0.28, 0.55, 20);
    const greenMat = new MeshStandardMaterial({
      color: 0x34A853,
      roughness: 0.28,
      metalness: 0.1,
    });
    const greenMesh = new Mesh(greenGeo, greenMat);
    greenMesh.position.set(-2.8, -2.1, 0.5);
    greenMesh.rotation.z = Math.PI / 4;
    rootGroup.add(greenMesh);
    accents.push({ mesh: greenMesh, speedX: 0.6, speedY: 0.6, baseX: -2.8, baseY: -2.1, baseZ: 0.5, offset: 3.0 });

    // Accent 4: Red pill capsule (Google Red)
    const redGeo = new CylinderGeometry(0.25, 0.25, 0.6, 20);
    const redMat = new MeshStandardMaterial({
      color: 0xEA4335,
      roughness: 0.25,
      metalness: 0.1,
    });
    const redMesh = new Mesh(redGeo, redMat);
    redMesh.position.set(3.2, -1.8, 0.6);
    redMesh.rotation.x = Math.PI / 3;
    rootGroup.add(redMesh);
    accents.push({ mesh: redMesh, speedX: 0.7, speedY: 0.4, baseX: 3.2, baseY: -1.8, baseZ: 0.6, offset: 4.5 });

    // 8. Faux Contact Shadow Plane (Neo-brutalist crisp offset shadow)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      // Crisp, stylized neo-brutalist offset shadow matching the 4px 4px 0 #000 aesthetic
      shadowCtx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      shadowCtx.beginPath();
      shadowCtx.ellipse(134, 134, 102, 44, -0.04, 0, Math.PI * 2);
      shadowCtx.fill();
    }
    const shadowTex = new CanvasTexture(shadowCanvas);
    const shadowGeo = new PlaneGeometry(7.4, 3.2);
    const shadowMat = new MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0.2, -2.65, -0.5);
    shadowMesh.rotation.x = -Math.PI / 2.3;
    scene.add(shadowMesh);

    // 9. Lighting Setup (Bright & Architectural)
    const ambientLight = new AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 8, 9);
    scene.add(keyLight);

    const fillLight = new DirectionalLight(0xe0e7ff, 0.9);
    fillLight.position.set(-6, -4, 6);
    scene.add(fillLight);

    // 10. Animation Loop & Physics Lerp Variables
    let animationFrameId: number;
    const clock = new Clock();

    let currentRotX = 0;
    let currentRotY = 0;

    const render = () => {
      if (prefersReducedMotion) {
        rootGroup.rotation.set(0, 0, 0);
        rootGroup.position.set(0, 0, 0);
        renderer.render(scene, camera);
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Target pointer tilt (clamped to ~7.5 degrees)
      const targetRotY = pointerRef.current.x * 0.13;
      const targetRotX = -pointerRef.current.y * 0.09;

      // Smooth spring-like lerp damping
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      // Gentle idle floating breathing motion
      const idleFloatY = Math.sin(elapsed * 1.4) * 0.09;
      const idleRollZ = Math.sin(elapsed * 0.9) * 0.015;

      rootGroup.position.y = idleFloatY;
      rootGroup.rotation.x = currentRotX;
      rootGroup.rotation.y = currentRotY;
      rootGroup.rotation.z = idleRollZ;

      // Secondary floating for geometric accents
      accents.forEach((acc) => {
        acc.mesh.rotation.x += 0.008 * acc.speedX;
        acc.mesh.rotation.y += 0.01 * acc.speedY;
        acc.mesh.position.y = acc.baseY + Math.sin(elapsed * 1.6 + acc.offset) * 0.1;
      });

      // Subtle shadow pulse linked to float
      shadowMesh.scale.set(1 + idleFloatY * 0.3, 1 + idleFloatY * 0.3, 1);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // 11. Responsive Resize Observer with adaptive camera distance
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        camera.aspect = width / height;
        camera.position.z = getCameraZ(width);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        if (prefersReducedMotion) {
          renderer.render(scene, camera);
        }
      }
    });
    resizeObserver.observe(container);

    // 12. Handle prefers-reduced-motion changes dynamically
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (!prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
        render(); // render one static frame
      }
    };
    reducedMotionQuery.addEventListener('change', handleMotionChange);

    // 13. Comprehensive Disposal & Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      // Dispose Three.js objects
      mainGeometry.dispose();
      mainMaterial.dispose();
      capsuleGeo.dispose();
      capsuleMat.dispose();
      capsuleTexture.dispose();
      blueGeo.dispose();
      blueMat.dispose();
      yellowGeo.dispose();
      yellowMat.dispose();
      greenGeo.dispose();
      greenMat.dispose();
      redGeo.dispose();
      redMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();

      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (hasWebGLError) {
    return <HeroFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="hero-canvas-container"
      aria-hidden="true"
    />
  );
};
