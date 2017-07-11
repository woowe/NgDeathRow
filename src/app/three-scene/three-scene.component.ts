import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone, HostListener } from '@angular/core';


import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.scss']
})
export class ThreeSceneComponent implements OnInit, AfterViewInit {
  @ViewChild('threeScene')
  threeScene: ElementRef;

  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;

  meshes: any = {};

  constructor(private _zone: NgZone) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x222222);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const el = this.threeScene.nativeElement;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    el.appendChild(this.renderer.domElement);


    let geometry = new THREE.Geometry();

    geometry.vertices.push(
    	new THREE.Vector3( -10,  10, 10 ),
    	new THREE.Vector3( -10, -10, 0 ),
    	new THREE.Vector3(  10, -10, 0 )
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );


    const mesh_material = new THREE.MeshBasicMaterial({ color: 0xff22ff, wireframe: true });
    this.meshes['terrian'] = new THREE.Mesh( geometry, mesh_material );
    this.meshes['terrian'].drawMode = THREE.TriangleStripDrawMode;

    this.scene.add( this.meshes['terrian'] );

    const pointLight = new THREE.PointLight( 0xffffff, 1, 1000 );
    pointLight.position.set(2, 2, 5);
    this.scene.add(pointLight);

    this.camera.position.z = 50;

    this.scene.add(this.camera);

    this._zone.runOutsideAngular(() => {
      this.animate();
    });
  }

  animate() {

    // this.camera.position.z = Math.abs(Math.cos(performance.now() / 1000)) * 350 + 2.5;

    // this.meshes.cube.rotation.x += 0.01;
    // this.meshes.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(() => { this.animate(); });
  }

  @HostListener('window:resize', ['$event'])
  resize() {
    // this.camera.projectionMatrix
    (this.camera as any).aspect = window.innerWidth / window.innerHeight;
    (this.camera as any).updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}
