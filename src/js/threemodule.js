
			import * as THREE from 'three';

			import TWEEN from 'three/addons/libs/tween.module.js';
			import { OrbitControls } from 'controls/OrbitControls.js';
			import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

			const table = [
				'https://i.postimg.cc/9QRJC98f/IMG-7585.jpg',
				'https://i.postimg.cc/P5gKxq9Q/IMG-7586.jpg',
				'https://i.postimg.cc/MG15jS82/IMG-7587.jpg',
				'https://i.postimg.cc/nzZk4PHs/IMG-7588.jpg',
				'https://i.postimg.cc/qRLGjxR1/IMG-7589.jpg',
				'https://i.postimg.cc/T13JS55f/IMG-7590.jpg',
				'https://i.postimg.cc/zDxjh74B/IMG-7591.jpg',
				'https://i.postimg.cc/Gtgx13vY/IMG-7592.jpg',
				'https://i.postimg.cc/rFz9NWL9/IMG-7593.jpg'
			];

			let camera, scene, renderer;
			let controls;
			var vector = new THREE.Vector3();
			const objects = [];
			const targets = { table: [], sphere: [], helix: [], grid: [] };
			window.onscroll = () => window.scroll(0, 0);
			
			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 3000;

				scene = new THREE.Scene();
				//scene.fog = new THREE.Fog('0xFFFFFF', 100, 500);
				
				// table

				for ( let i = 0; i < table.length; i += 1 ) {

					const element = document.createElement( 'div' );
					element.className = 'element';
					//element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

					const image = document.createElement( 'img' );
					image.className = 'element';
					image.draggable = 'false';
					image.selectable = 'false';
					image.src = table[i];
					//number.textContent = ( i / 5 ) + 1;
					//image.style.width = '150px';
					//image.style.height = '80px';
					
					element.appendChild( image );

					/**const symbol = document.createElement( 'div' );
					symbol.className = 'symbol';
					symbol.textContent = table[ i ];
					element.appendChild( symbol );

					const details = document.createElement( 'div' );
					details.className = 'details';
					details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
					element.appendChild( details );**/
					element.id = 'p' + i; 
					console.log(element.id);
					const objectCSS = new CSS3DObject( element );
					element.parent = objectCSS;
					objectCSS.position.x = Math.random() * 4000 - 2000;
					objectCSS.position.y = Math.random() * 4000 - 2000;
					objectCSS.position.z = Math.random() * 4000 - 2000;
					scene.add( objectCSS );

					objects.push( objectCSS );

					//

					const object = new THREE.Object3D();
					object.position.x = ( table[ i + 3 ] * 500 ) - 1330;
					object.position.y = - ( table[ i + 4 ] * 180 ) + 1200;

					targets.table.push( object );

				}

				// sphere

				const vector = new THREE.Vector3();

				for ( let i = 0, l = objects.length; i < l; i ++ ) {

					const phi = Math.acos( - 1 + ( 2 * i ) / l );
					const theta = Math.sqrt( l * Math.PI ) * phi;

					const object = new THREE.Object3D();

					object.position.setFromSphericalCoords( 800, phi, theta );

					vector.copy( object.position ).multiplyScalar( 2 );

					object.lookAt( vector );

					targets.sphere.push( object );

				}

				// helix

				for ( let i = 0, l = objects.length; i < l; i ++ ) {

					const theta = i * 0.4 + Math.PI;
					const y = - ( i * 8 ) + 300;

					const object = new THREE.Object3D();

					object.position.setFromCylindricalCoords( 2400, theta, y );

					vector.x = object.position.x * 2;
					vector.y = object.position.y;
					vector.z = object.position.z * 2;

					object.lookAt( vector );

					targets.helix.push( object );

				}

				// grid

				for ( let i = 0; i < objects.length; i ++ ) {

					const object = new THREE.Object3D();

					object.position.x = ( ( i % 5 ) * 400 ) - 800;
					object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 0;
					object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

					targets.grid.push( object );

				}

				//

				renderer = new CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.getElementById( 'container' ).appendChild( renderer.domElement );
				onscroll = (event) => { scene.rotation.y += 1; console.log('scrolling') };
				//

				controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 4500;
				controls.maxDistance = 4500;
				controls.minPolarAngle = Math.PI/2;
				controls.maxPolarAngle = Math.PI/2;
				controls.enableDamping = true;
				controls.mouseButtons = {
					LEFT: THREE.MOUSE.ROTATE,
					MIDDLE: THREE.MOUSE.ROTATE,
					RIGHT: THREE.MOUSE.PAN
				}
				controls.dampingFactor = 0.05;
				controls.rotateSpeed = 0.25;
				controls.addEventListener( 'change', render );
				var spherical = new THREE.Spherical();
				spherical.radius = controls.getDistance();
				spherical.phi = controls.getPolarAngle();
				transform( targets.helix, 1000 );

				//

				window.addEventListener( 'resize', onWindowResize );
				window.addEventListener("wheel", (event) => {
					//spherical.theta = spherical.theta = controls.getAzimuthalAngle() + Math.PI/180;
					//controls.object.position.setFromSpherical(spherical);
					event.preventDefault();
					console.log('!');
				}, {passive:false});

			}

			function transform( targets, duration ) {

				TWEEN.removeAll();

				for ( let i = 0; i < objects.length; i ++ ) {

					const object = objects[ i ];
					const target = targets[ i ];

					new TWEEN.Tween( object.position )
						.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

					new TWEEN.Tween( object.rotation )
						.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

				}

				new TWEEN.Tween( this )
					.to( {}, duration * 2 )
					.onUpdate( render )
					.start();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}
			
			
	
			function animate() {

				requestAnimationFrame( animate );

				TWEEN.update();

				controls.update();
				
				for (let i in targets.helix) {
					
					//console.log('p' + i , targets.helix.length);
					
					document.getElementById('p' + i).style.opacity = 100 - (targets.helix[i].position.distanceTo(camera.position) - 2250) / 7 + '%';
				
				}

				targets.helix[0].updateMatrixWorld();
		
				//document.documentElement.style.setProperty('--brightness', '1%');
				
				//console.log(targets.helix[0].position.distanceTo(camera.position) - 500);

			}

			function render() {

				renderer.render( scene, camera );

			}
			
