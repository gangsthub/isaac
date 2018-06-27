<template>
<div ref="container" class="canvas-container">
    <canvas ref="canvas"></canvas>
</div>
</template>

<script>
import * as THREE from 'three';
import RoundedBoxGeometry from '~/plugins/third_party/three-rounded-box.js';
export default {
    data: () => ({
        camera: {},
        scene: {},
        renderer: {},
        group: {},
        bgColor: 'hsl(0, 0%, 100%)',
        ribbon: {},
        ribbonColor: 0x25a15d,
        gridOptions: [300, 60, 0xFF4444, 0x909090],
    }),
    methods: {
        startMessage() {
            console.log('%c 🤖 start ', 'background-color: #ac92db; color: #FFF;' +
                                        'border-radius: 4px; padding: 1px 3px 3px 0;');
        },
    },
    mounted() {
        this.startMessage();
        process.browser && this.$nextTick().then(() => {

            // =======
            // setting up the scene
            // =======

            const container = this.$refs.container;
            let [containerWidth, containerHeight] = [container.clientWidth, container.clientHeight];
            let windowHeight = window.innerHeight;
            const aspect = containerWidth / containerHeight;

            this.renderer = new THREE.WebGLRenderer({
                alpha: true, // required to add bg color
                canvas: this.$refs.canvas,
                antialias: true,
                preserveDrawingBuffer: true // required to support .toDataURL()
            });

            this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
            this.renderer.setClearColor(this.bgColor, 1);
            this.renderer.autoClear = false;
            this.renderer.sortObjects = false;
            this.renderer.setSize(containerWidth, windowHeight / 2, false);

            this.scene = new THREE.Scene();

            // this.camera = new THREE.OrthographicCamera(0, containerWidth, 0, containerHeight, 10, 500);
            this.camera = new THREE.PerspectiveCamera(
                105,                                   // Field of view
                containerWidth / windowHeight, // Aspect ratio
                10,                                   // Near
                10000                                 // Far
            );
            this.camera.position.set(0, 10, 60);

            this.scene.background = new THREE.Color(this.bgColor);

            // =======
            // lights
            // =======
            const ambientLight = new THREE.AmbientLight(0xFFFFFF);
            const spotLight = new THREE.SpotLight( 0xFFFFFF, 1 );
            spotLight.position.set( 0, 200, 100 );

            this.scene.add(ambientLight);
            this.scene.add(spotLight);

            // =======
            // actual ribbon
            // =======
            this.group = new THREE.Group();
            const material = new THREE.MeshStandardMaterial({
                color: 0xFF0000,
                metalness: .5,
                roughness: 0,
            });
            const geometry = new RoundedBoxGeometry(1000, 64, 10, 1, 10);

            this.ribbon = new THREE.Mesh(geometry, material);
            this.ribbon.castShadow = this.ribbon.receiveShadow = true;
            this.ribbon.name = 'Ribbon';
            this.ribbon.position.set(0, 0, -30);
            this.group.position.set(0, 0, 0);

            this.group.add(this.ribbon);
            this.scene.add(this.group);

            const helper = new THREE.GridHelper(...this.gridOptions);
            this.scene.add(helper);


            this.camera.lookAt(this.ribbon.position);

            const animationLoop = () => {

                requestAnimationFrame(animationLoop);

                if (this.renderer && this.renderer.render) this.renderer.render(this.scene, this.camera);
            };

            animationLoop();
        })
    }
}
</script>

<style scoped>
.canvas-container {
    
    width: 100%;
}
</style>
