var React = require('react')
  , THREE = require('three');

var camera, scene, renderer;
var geometry, material, mesh;

var Arrow3D = React.createClass({

  propTypes: {
    quad: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      q: new THREE.Quaternion(0, 0, 0, 0)
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.quad !== this.props.quad;
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({q: new THREE.Quaternion(
        nextProps.quad[0],
        nextProps.quad[1],
        nextProps.quad[2],
        nextProps.quad[3]
      )
   });
  },

  componentDidMount: function() {
    this.init();
    this.animate();
  },


  init: function() {
    camera = new THREE.PerspectiveCamera(30, (this.refs.renderWindow.offsetWidth -2) /(this.refs.renderWindow.offsetHeight -2), 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.CylinderGeometry(1, 100, 200, 32);
    material = new THREE.MeshNormalMaterial({
      //wireframe: true,
      //wireframeLinewidth: 3
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

    //mesh.rotation.x += 0.01;
    //mesh.rotation.z += 0.02;

    var eu = new THREE.Euler();
    eu.setFromQuaternion(this.state.q);
    mesh.rotation.x = eu._x;
    mesh.rotation.y = eu._y;
    mesh.rotation.z = eu._z;
    mesh.rotation = eu;

    renderer.render(scene, camera);
  },

  render: function() {
    return (
      <div ref='renderWindow'
        style={{border: '1px solid #bbb',height:300,padding:0}}>
      </div>
    );
  }
});

module.exports = Arrow3D;
