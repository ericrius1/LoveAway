var World = function() {
	var container, renderer, scene, camera, mesh;
	var start = Date.now();
	window.addEventListener('load', init);

	function init() {
		container = document.getElementById('container');
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.z = 100;
		camera.target = new THREE.Vector3(0, 0, 0);
		scene.add(camera);
		material = new THREE.ShaderMaterial({
			uniforms: {
				tExplosion: {
					type: "t",
					value: 0,
					texture: THREE.ImageUtils.loadTexture('green.png', function(){

					})
				},
				time: {
					type: "f",
					value: 0.0
				},
				weight: {
					type: "f",
					value: 10.0
				}
			},
			vertexShader: document.getElementById('vertexShader').textContent,
			fragmentShader: document.getElementById('fragmentShader').textContent
		});
		mesh = new THREE.Mesh(new THREE.SphereGeometry(20, 200, 200), material);
		mesh = new THREE.Mesh(new THREE.SphereGeometry(20, 200, 200), material);
		scene.add(mesh);
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.autoClear = false;
		container.appendChild(renderer.domElement);
		container.addEventListener('mousedown', onMouseDown, false);
		container.addEventListener('mousemove', onMouseMove, false);
		container.addEventListener('mouseup', onMouseUp, false);
	   	var love = document.createElement('audio');
		love.setAttribute('src','love.mp3');
		love.setAttribute('autoplay','autoplay');
			
		render();

		document.head.appendChild(love);	}
	var onMouseDownMouseX = 0,
		onMouseDownMouseY = 0,
		lon = 0,
		onMouseDownLon = 0,
		lat = 0,
		onMouseDownLat = 0,
		phi = 0,
		theta = 0;
	lat = 15, isUserInteracting = false;

	function onMouseDown(event) {
		event.preventDefault();
		isUserInteracting = true;
		onPointerDownPointerX = event.clientX;
		onPointerDownPointerY = event.clientY;
		onPointerDownLon = lon;
		onPointerDownLat = lat;
	}

	function onMouseMove(e) {
		if (isUserInteracting) {
			lon = (event.clientX - onPointerDownPointerX) * 0.1 + onPointerDownLon;
			lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
		}
	}

	function onMouseUp(event) {
		isUserInteracting = false;
	}
	var scale = 0;

	function render() {
		material.uniforms['time'].value = .0001 * (Date.now() - start);
		scale += .005;
		scale %= 2;
		lat = Math.max(-85, Math.min(85, lat));
		phi = (90 - lat) * Math.PI / 180;
		theta = lon * Math.PI / 180;
		camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
		camera.position.y = 100 * Math.cos(phi);
		camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);
		camera.lookAt(camera.target);
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
}