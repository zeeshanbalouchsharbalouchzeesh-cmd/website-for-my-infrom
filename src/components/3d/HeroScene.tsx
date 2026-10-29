import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, Eye, Pause, Play, RotateCcw, Compass, ShieldAlert } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface HeroSceneProps {
  onEnterExplore?: () => void;
}

export type CoreStyle = 'quantum' | 'neural' | 'gyroscope' | 'wireframe';
export type LightMood = 'violet' | 'cyan' | 'chrome' | 'amber';

export const HeroScene: React.FC<HeroSceneProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [coreStyle, setCoreStyle] = useState<CoreStyle>('quantum');
  const [lightMood, setLightMood] = useState<LightMood>('violet');
  const [isRotating, setIsRotating] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);
  const [webglError, setWebglError] = useState(false);

  // Mutable refs for Three.js state that shouldn't trigger re-renders
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    coreGroup: THREE.Group;
    innerCore: THREE.Mesh;
    ring1: THREE.Mesh;
    ring2: THREE.Mesh;
    ring3: THREE.Mesh;
    satellites: THREE.Group;
    particles: THREE.Points;
    keyLight: THREE.DirectionalLight;
    fillLight: THREE.PointLight;
    mouseTarget: { x: number; y: number };
    isPaused: boolean;
  } | null>(null);

  // Color presets
  const moodColors = {
    violet: { key: 0x8b5cf6, fill: 0x38bdf8, emissive: 0x581c87 },
    cyan: { key: 0x06b6d4, fill: 0xa855f7, emissive: 0x0e7490 },
    chrome: { key: 0xffffff, fill: 0x94a3b8, emissive: 0x334155 },
    amber: { key: 0xf59e0b, fill: 0xef4444, emissive: 0x78350f },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.045);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.8);

    // Studio Environment map using PMREMGenerator + RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // Lighting rig (Warm key + cool rim + subtle ambient)
    const keyLight = new THREE.DirectionalLight(moodColors.violet.key, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(moodColors.violet.fill, 2.2, 20);
    fillLight.position.set(-4, -3, 3);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // ==========================================
    // PROCEDURAL 3D CORE (Composite 5-Part Model)
    // ==========================================
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Quantum Nucleus (Crystalline Icosahedron)
    const innerGeom = new THREE.IcosahedronGeometry(1.0, 1);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x111322,
      emissive: moodColors.violet.emissive,
      emissiveIntensity: 0.9,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCore);

    // 2. High-Sheen Chrome Outer Orbital Rings
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.12,
    });

    const ring1Geom = new THREE.TorusGeometry(1.7, 0.035, 24, 100);
    const ring1 = new THREE.Mesh(ring1Geom, chromeMat);
    coreGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.1, 0.028, 24, 100);
    const ring2 = new THREE.Mesh(ring2Geom, chromeMat.clone());
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(2.45, 0.02, 24, 100);
    const ring3 = new THREE.Mesh(ring3Geom, chromeMat.clone());
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;
    coreGroup.add(ring3);

    // 3. Floating Chrome Satellite Nodes (Orbiting Dodecahedrons)
    const satellites = new THREE.Group();
    const satGeom = new THREE.DodecahedronGeometry(0.12);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.18,
    });

    const satCount = 6;
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.05 + Math.sin(i * 1.5) * 0.2;
      const sat = new THREE.Mesh(satGeom, satMat);
      sat.position.set(Math.cos(angle) * radius, (Math.sin(i) - 0.5) * 0.8, Math.sin(angle) * radius);
      satellites.add(sat);
    }
    coreGroup.add(satellites);

    // 4. Volumetric Ambient Particle Cloud (1,200 floating star dust motes)
    const particleCount = isSoftwareGl ? 400 : 1200;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x8b5cf6);
    const color2 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Floor Contact Shadow Plate (prevents empty floating feeling)
    const shadowGeom = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;
    scene.add(shadowPlane);

    // Save references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      coreGroup,
      innerCore,
      ring1,
      ring2,
      ring3,
      satellites,
      particles,
      keyLight,
      fillLight,
      mouseTarget: { x: 0, y: 0 },
      isPaused: false,
    };

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      if (sceneRef.current) {
        sceneRef.current.mouseTarget.x = x * 0.6;
        sceneRef.current.mouseTarget.y = y * 0.5;
      }
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Window resize handler
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with delta timing and exponential damping
    let frameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (sceneRef.current) {
        const { coreGroup, innerCore, ring1, ring2, ring3, satellites, particles, mouseTarget, isPaused } =
          sceneRef.current;

        // Smooth camera damping to pointer target
        camera.position.x = THREE.MathUtils.damp(camera.position.x, mouseTarget.x * 1.2, 3.5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, mouseTarget.y * 1.2, 3.5, delta);
        camera.lookAt(0, 0, 0);

        if (!isPaused) {
          // Complex gyroscopic rotation
          coreGroup.rotation.y += delta * 0.22;
          innerCore.rotation.x += delta * 0.35;
          innerCore.rotation.y += delta * 0.45;

          ring1.rotation.z += delta * 0.4;
          ring1.rotation.x += delta * 0.2;

          ring2.rotation.y -= delta * 0.3;
          ring2.rotation.z += delta * 0.15;

          ring3.rotation.x += delta * 0.25;

          satellites.rotation.y += delta * 0.3;
          satellites.rotation.x -= delta * 0.15;

          particles.rotation.y += delta * 0.05;
        }

        renderer.render(scene, camera);
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Memory disposal
      innerGeom.dispose();
      innerMat.dispose();
      chromeMat.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      ring3Geom.dispose();
      satGeom.dispose();
      satMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
      renderer.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Handle core style changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const { innerCore, ring1, ring2, ring3, satellites } = sceneRef.current;
    const innerMat = innerCore.material as THREE.MeshPhysicalMaterial;

    if (coreStyle === 'quantum') {
      innerCore.visible = true;
      ring1.visible = true;
      ring2.visible = true;
      ring3.visible = true;
      satellites.visible = true;
      innerMat.wireframe = false;
      innerMat.roughness = 0.15;
    } else if (coreStyle === 'neural') {
      innerCore.visible = true;
      ring1.visible = true;
      ring2.visible = false;
      ring3.visible = true;
      satellites.visible = true;
      innerMat.wireframe = false;
      innerMat.roughness = 0.35;
    } else if (coreStyle === 'gyroscope') {
      innerCore.visible = false;
      ring1.visible = true;
      ring2.visible = true;
      ring3.visible = true;
      satellites.visible = true;
    } else if (coreStyle === 'wireframe') {
      innerCore.visible = true;
      ring1.visible = true;
      ring2.visible = true;
      ring3.visible = true;
      satellites.visible = true;
      innerMat.wireframe = true;
    }
  }, [coreStyle]);

  // Handle lighting mood changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const { keyLight, fillLight, innerCore } = sceneRef.current;
    const activeMood = moodColors[lightMood];
    keyLight.color.setHex(activeMood.key);
    fillLight.color.setHex(activeMood.fill);

    const innerMat = innerCore.material as THREE.MeshPhysicalMaterial;
    innerMat.emissive.setHex(activeMood.emissive);
  }, [lightMood]);

  // Toggle rotation pause
  const togglePause = useCallback(() => {
    setIsRotating((prev) => {
      const next = !prev;
      if (sceneRef.current) {
        sceneRef.current.isPaused = !next;
      }
      sound.playClick();
      return next;
    });
  }, []);

  // Reset orientation
  const resetOrientation = useCallback(() => {
    if (sceneRef.current) {
      sceneRef.current.coreGroup.rotation.set(0, 0, 0);
      sceneRef.current.camera.position.set(0, 0, 5.8);
      sceneRef.current.mouseTarget = { x: 0, y: 0 };
    }
    sound.playClick();
  }, []);

  return (
    <div className="relative w-full h-full min-h-[550px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing focus:outline-none"
        aria-label="Interactive 3D Chrome Quantum Core"
      />

      {/* WebGL Fallback if device fails */}
      {webglError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#050508]/90 z-20">
          <ShieldAlert className="w-12 h-12 text-violet-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2 font-display">WebGL 3D Acceleration Standby</h3>
          <p className="text-sm text-slate-400 max-w-md">
            Your browser or device is currently using a software display profile. The rest of Zeeshan&apos;s interactive universe is fully active and accessible below!
          </p>
        </div>
      )}

      {/* Hero Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

      {/* Subtle Spec Badge at Top (Unobstructed Viewport) */}
      <div className="absolute top-6 left-6 z-10 hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0b0c14]/80 border border-white/10 text-xs font-mono text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>THREE.JS CORE v1.0</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">PBR CHROME ENGINE</span>
      </div>

      {/* Cinematic Coordinates indicator */}
      <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b0c14]/80 border border-white/10 text-xs font-mono text-slate-400">
        <Compass className="w-3.5 h-3.5 text-violet-400" />
        <span>INTERACTIVE 3D SPACE</span>
      </div>

      {/* Unified Bottom Control Dock (Follows SKILL.md Ergonomic Directives - 100% Unobstructed Center) */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${
          isZenMode ? 'translate-y-28 opacity-20 hover:opacity-100' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex flex-col items-center">
          {/* Collapse / Expand Tab */}
          <button
            onClick={() => {
              setIsZenMode((z) => !z);
              sound.playClick();
            }}
            className="mb-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white bg-[#0b0c14]/90 border border-white/10 rounded-full transition-colors flex items-center gap-1.5"
            title="Toggle Zen View Mode (H)"
          >
            <Eye className="w-3 h-3 text-sky-400" />
            {isZenMode ? 'Show 3D Controls' : 'Zen View Mode'}
          </button>

          {/* Sleek Horizontal Control Dock */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-[#0b0c14]/90 border border-white/10 backdrop-blur-md shadow-2xl max-w-[94vw]">
            {/* Core Style Selector */}
            <div className="flex items-center gap-1 bg-[#141624] p-1 rounded-xl">
              {(['quantum', 'neural', 'gyroscope', 'wireframe'] as CoreStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setCoreStyle(style);
                    sound.playClick();
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono capitalize transition-all ${
                    coreStyle === style
                      ? 'bg-violet-600 text-white font-medium shadow-md shadow-violet-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Light Mood Swatches */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#141624] rounded-xl">
              {(['violet', 'cyan', 'chrome', 'amber'] as LightMood[]).map((mood) => {
                const colors = {
                  violet: 'bg-violet-500 border-violet-400',
                  cyan: 'bg-sky-400 border-sky-300',
                  chrome: 'bg-slate-200 border-white',
                  amber: 'bg-amber-400 border-amber-300',
                };
                return (
                  <button
                    key={mood}
                    onClick={() => {
                      setLightMood(mood);
                      sound.playClick();
                    }}
                    className={`w-5 h-5 rounded-full border transition-all ${colors[mood]} ${
                      lightMood === mood ? 'scale-125 ring-2 ring-white/50' : 'opacity-60 hover:opacity-100'
                    }`}
                    title={`Lighting Mood: ${mood}`}
                  />
                );
              })}
            </div>

            {/* Play/Pause & Reset Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={togglePause}
                className="p-1.5 rounded-lg bg-[#141624] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title={isRotating ? 'Pause Rotation' : 'Resume Rotation'}
              >
                {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
              </button>
              <button
                onClick={resetOrientation}
                className="p-1.5 rounded-lg bg-[#141624] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Reset Camera Orientation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
