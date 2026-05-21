import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const GlobalScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a2a);
    scene.fog = new THREE.FogExp2(0x0a0a2a, 0.008);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 6);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // HDRI Environment Map
    new RGBELoader().load('/models/environment.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.background = texture;
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(2, 3, 4);
    scene.add(mainLight);
    const fillLight = new THREE.PointLight(0x2266ff, 0.4);
    fillLight.position.set(-1, 1, 2);
    scene.add(fillLight);

    // Load main GLTF model (neural network brain)
    const loader = new GLTFLoader();
    loader.load('/models/brain_scene.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.8, 0.8, 0.8);
      model.position.y = -0.5;
      scene.add(model);
      modelRef.current = model;
    }, undefined, (error) => console.error('GLTF load error', error));

    // Particle system for extra depth
    const particleCount = 2000;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i*3] = (Math.random() - 0.5) * 200;
      positions[i*3+1] = (Math.random() - 0.5) * 100;
      positions[i*3+2] = (Math.random() - 0.5) * 80 - 30;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.05, transparent: true });
    const particles = new THREE.Points(particlesGeo, particleMat);
    scene.add(particles);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;
      if (modelRef.current) {
        modelRef.current.rotation.y = Math.sin(time * 0.2) * 0.2;
        modelRef.current.position.y = -0.5 + Math.sin(time * 0.5) * 0.05;
      }
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;
      camera.position.x += (0 - camera.position.x) * 0.05;
      camera.position.y += (0 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
};

export default GlobalScene;