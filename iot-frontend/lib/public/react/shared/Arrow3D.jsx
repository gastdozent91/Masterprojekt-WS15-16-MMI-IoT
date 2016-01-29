var React = require('react')
  , THREE = require('three');

var camera, scene, renderer;
var geometry, material, mesh;

var Arrow3D = React.createClass({

  propTypes: {
  },

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
    this.init();
    this.animate();
  },


  init: function() {
    camera = new THREE.PerspectiveCamera(30, (this.refs.renderWindow.offsetWidth -2) /(this.refs.renderWindow.offsetHeight -2), 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(this.refs.renderWindow.offsetWidth -2, this.refs.renderWindow.offsetHeight -2);

    this.refs.renderWindow.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement);
  },

  animate: function() {
    requestAnimationFrame(this.animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
  },

  render: function() {
    return (
      <div className='row'>
        <div className='large-12 columns'
          ref='renderWindow'
          style={{border: '1px solid black',height:300,padding:0}}>
        </div>
      </div>
    );
  }
});

module.exports = Arrow3D;
