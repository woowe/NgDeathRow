import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone, HostListener } from '@angular/core';


import * as THREE from 'three';
import { Noise } from 'noisejs';

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

  cols = 125;
  rows = 125;
  spacing = 5;

  noise: any;
  tick = 0;

  constructor(private _zone: NgZone) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x222222);
    this.scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(20, 40, 50);
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.noise = new Noise(Math.random());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const el = this.threeScene.nativeElement;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    el.appendChild(this.renderer.domElement);


    let geometry = new THREE.Geometry();
    let material = new THREE.PointsMaterial({color: 0xffffff});

    // const size = 36, step = 4;

    // for (let i = -size; i <= size; i += step) {
    //   geometry.vertices.push(new THREE.Vector3(-size, 0, i));
    //   geometry.vertices.push(new THREE.Vector3(size, 0, i));

    //   geometry.vertices.push(new THREE.Vector3(i, 0, -size));
    //   geometry.vertices.push(new THREE.Vector3(i, 0, size));
    // }

    // const line = new THREE.Line(geometry, material, THREE.LinePieces);
    // this.scene.add(line);


    const offset_x = this.cols * this.spacing / 4;
    const offset_z = this.rows * this.spacing / 4;

    let z = 0;
    for (let y = 0; y < this.rows; ++y) {
      for (let x = 0; x < this.cols; ++x) {
        const val = this.noise.perlin3(x / 10, y / 10, z / 10) * 25;
        geometry.vertices.push(new THREE.Vector3(x * -this.spacing + offset_x, val, y * -this.spacing + offset_z));
      }
    }

    this.meshes['points'] = new THREE.Points( geometry, material)


    this.scene.add(this.meshes['points']);

    // geometry.vertices.push(
    //     new THREE.Vector3( 0,  0, 0 ),
    //     new THREE.Vector3( 10, 0, 0),
    //     new THREE.Vector3( 10, -10, 0),
    // );

    // geometry.vertices.push(
    //   new THREE.Vector3( 0, 0, 0),
    //   new THREE.Vector3( 10, -10, 0),
    //   new THREE.Vector3( 0, -10, 0),
    // )

    // geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

    // geometry.computeFaceNormals();
    // geometry.computeVertexNormals();

    // const mesh_material = new THREE.MeshBasicMaterial({ color: 0xff22ff, wireframe: true });
    // this.meshes['terrian'] = new THREE.Mesh( geometry, mesh_material );
    // this.meshes['terrian'].drawMode = THREE.TriangleStripDrawMode;

    // this.scene.add( this.meshes['terrian'] );

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


    for (let y = 0; y < this.rows; ++y) {
      for (let x = 0; x < this.cols; ++x) {
        const idx = y * this.cols + x;
        const val = this.noise.perlin3(x / 10, y / 10, (this.tick - x) / 1000) * 25;
        this.meshes.points.geometry.vertices[idx].y = val;
      }
    }

    this.meshes.points.geometry.verticesNeedUpdate = true;

    this.renderer.render(this.scene, this.camera);

    ++this.tick;

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
