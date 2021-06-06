import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Home() {
  useEffect(() => {
    const canvas = document.querySelector("#canvasArea");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);

    const geo = new THREE.BoxGeometry();
    const normalMat = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geo, normalMat);
    cube.name = "theCube";
    scene.add(cube);

    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();

    window.addEventListener("click", (event) => {
      event.preventDefault();
      mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mousePos, camera);
      const items = raycaster.intersectObjects(scene.children, true);

      if (items.length > 0 && items[0].object) {
        if (items[0].object.name === "theCube") {
          console.log(items[0].object);
          alert("Cube cliked");
        }

        console.log(items[0].object.name);
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas id="canvasArea"></canvas>;
}
