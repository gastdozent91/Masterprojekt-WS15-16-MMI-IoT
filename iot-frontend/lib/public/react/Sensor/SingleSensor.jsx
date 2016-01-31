var React = require('react')
  , Arrow3D = require('../shared/Arrow3D')
  , Graph = require('../shared/Graph')
  , TopBar = require('../shared/TopBar');

var SingleSensor = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    sensor: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      isLive: false,
      cQ: [0, 0, 0, 0],
      cA: {v:[0, 0, 0], date:''},
      fields: [
        ['id', 'ID'],
        'location',
        ['creationDate', 'created'],
        ['sensorTypes','sensor types'],
        'owner',
        ['attachedGateway', 'attached to gateway']
      ],
      data: [
{"time": "2016-01-18 18:00:04.288", "id": "ArmLinks", "acceleration": [0.01, 0.0, 0.06], "location": "Europe/Berlin", "orientation": [0.846252, -0.164917, -0.505005, -0.040405]},
{"time": "2016-01-18 18:00:04.320", "id": "ArmLinks", "acceleration": [-0.01, 0.0, 0.03], "location": "Europe/Berlin", "orientation": [0.846313, -0.164978, -0.504883, -0.040344]},
{"time": "2016-01-18 18:00:04.333", "id": "ArmLinks", "acceleration": [-0.02, -0.01, 0.07], "location": "Europe/Berlin", "orientation": [0.846313, -0.164978, -0.504883, -0.040344]},
{"time": "2016-01-18 18:00:04.346", "id": "ArmLinks", "acceleration": [0.04, 0.0, -0.02], "location": "Europe/Berlin", "orientation": [0.846313, -0.164978, -0.504944, -0.040344]},
{"time": "2016-01-18 18:00:04.365", "id": "ArmLinks", "acceleration": [0.01, -0.02, 0.0], "location": "Europe/Berlin", "orientation": [0.846252, -0.164978, -0.505005, -0.040405]},
{"time": "2016-01-18 18:00:04.381", "id": "ArmLinks", "acceleration": [0.0, 0.0, 0.05], "location": "Europe/Berlin", "orientation": [0.84613, -0.164917, -0.505188, -0.040527]},
{"time": "2016-01-18 18:00:04.400", "id": "ArmLinks", "acceleration": [-0.05, 0.03, -0.06], "location": "Europe/Berlin", "orientation": [0.846069, -0.164856, -0.50531, -0.040527]},
{"time": "2016-01-18 18:00:04.420", "id": "ArmLinks", "acceleration": [-0.04, 0.01, 0.03], "location": "Europe/Berlin", "orientation": [0.846069, -0.164856, -0.50531, -0.040527]},
{"time": "2016-01-18 18:00:04.433", "id": "ArmLinks", "acceleration": [0.0, 0.01, 0.03], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505249, -0.040527]},
{"time": "2016-01-18 18:00:04.447", "id": "ArmLinks", "acceleration": [0.01, -0.02, -0.01], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.470", "id": "ArmLinks", "acceleration": [0.0, 0.0, 0.04], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.487", "id": "ArmLinks", "acceleration": [0.01, 0.02, 0.03], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.498", "id": "ArmLinks", "acceleration": [0.02, 0.02, -0.05], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.520", "id": "ArmLinks", "acceleration": [0.02, -0.01, 0.03], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.534", "id": "ArmLinks", "acceleration": [0.01, -0.01, 0.07], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.546", "id": "ArmLinks", "acceleration": [0.0, 0.01, 0.0], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.574", "id": "ArmLinks", "acceleration": [-0.03, -0.01, 0.01], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.584", "id": "ArmLinks", "acceleration": [-0.02, 0.0, 0.01], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.597", "id": "ArmLinks", "acceleration": [-0.04, 0.0, -0.06], "location": "Europe/Berlin", "orientation": [0.84613, -0.164856, -0.505188, -0.040588]},
{"time": "2016-01-18 18:00:04.621", "id": "ArmLinks", "acceleration": [-0.01, 0.0, 0.05], "location": "Europe/Berlin", "orientation": [0.846191, -0.164734, -0.505188, -0.040466]},
{"time": "2016-01-18 18:00:04.634", "id": "ArmLinks", "acceleration": [0.01, 0.0, 0.05], "location": "Europe/Berlin", "orientation": [0.846191, -0.164734, -0.505188, -0.040466]},
{"time": "2016-01-18 18:00:04.651", "id": "ArmLinks", "acceleration": [0.0, 0.02, -0.04], "location": "Europe/Berlin", "orientation": [0.846191, -0.164734, -0.505188, -0.040466]},
{"time": "2016-01-18 18:00:04.671", "id": "ArmLinks", "acceleration": [0.07, 0.0, 0.03], "location": "Europe/Berlin", "orientation": [0.846252, -0.164673, -0.505127, -0.040466]},
{"time": "2016-01-18 18:00:04.684", "id": "ArmLinks", "acceleration": [0.04, -0.01, 0.03], "location": "Europe/Berlin", "orientation": [0.846252, -0.164673, -0.505066, -0.040466]},
{"time": "2016-01-18 18:00:04.697", "id": "ArmLinks", "acceleration": [0.04, 0.0, 0.02], "location": "Europe/Berlin", "orientation": [0.846313, -0.164673, -0.504944, -0.040588]},
{"time": "2016-01-18 18:00:04.717", "id": "ArmLinks", "acceleration": [-0.01, -0.01, 0.04], "location": "Europe/Berlin", "orientation": [0.846375, -0.164612, -0.504883, -0.040527]},
{"time": "2016-01-18 18:00:04.736", "id": "ArmLinks", "acceleration": [0.78, 0.15, 0.33], "location": "Europe/Berlin", "orientation": [0.846619, -0.16449, -0.504578, -0.040466]},
{"time": "2016-01-18 18:00:04.749", "id": "ArmLinks", "acceleration": [1.13, 0.15, 0.32], "location": "Europe/Berlin", "orientation": [0.847046, -0.164307, -0.503845, -0.039978]},
{"time": "2016-01-18 18:00:04.770", "id": "ArmLinks", "acceleration": [1.81, 0.15, 0.86], "location": "Europe/Berlin", "orientation": [0.8479, -0.163696, -0.502747, -0.038757]},
{"time": "2016-01-18 18:00:04.783", "id": "ArmLinks", "acceleration": [1.78, 0.09, 1.01], "location": "Europe/Berlin", "orientation": [0.848572, -0.16333, -0.501831, -0.037659]},
{"time": "2016-01-18 18:00:04.794", "id": "ArmLinks", "acceleration": [1.57, -0.02, 1.1], "location": "Europe/Berlin", "orientation": [0.849426, -0.163147, -0.500549, -0.036194]},
{"time": "2016-01-18 18:00:04.811", "id": "ArmLinks", "acceleration": [1.3, -0.04, 0.97], "location": "Europe/Berlin", "orientation": [0.851501, -0.164673, -0.496765, -0.032288]},
{"time": "2016-01-18 18:00:04.832", "id": "ArmLinks", "acceleration": [0.52, -0.19, 0.7], "location": "Europe/Berlin", "orientation": [0.853943, -0.169128, -0.491272, -0.027588]},
{"time": "2016-01-18 18:00:04.844", "id": "ArmLinks", "acceleration": [0.18, -0.19, 0.79], "location": "Europe/Berlin", "orientation": [0.855408, -0.172302, -0.487854, -0.025208]},
{"time": "2016-01-18 18:00:04.857", "id": "ArmLinks", "acceleration": [-0.43, 0.0, -0.15], "location": "Europe/Berlin", "orientation": [0.858826, -0.180054, -0.479065, -0.020813]},
{"time": "2016-01-18 18:00:04.877", "id": "ArmLinks", "acceleration": [-1.04, 0.16, -0.74], "location": "Europe/Berlin", "orientation": [0.862061, -0.188599, -0.470032, -0.017212]},
{"time": "2016-01-18 18:00:04.897", "id": "ArmLinks", "acceleration": [-1.95, 0.36, -1.68], "location": "Europe/Berlin", "orientation": [0.864746, -0.196228, -0.462097, -0.014648]},
{"time": "2016-01-18 18:00:04.916", "id": "ArmLinks", "acceleration": [-2.15, 0.43, -1.92], "location": "Europe/Berlin", "orientation": [0.865784, -0.199402, -0.45874, -0.013977]},
{"time": "2016-01-18 18:00:04.931", "id": "ArmLinks", "acceleration": [-2.6, 0.65, -2.71], "location": "Europe/Berlin", "orientation": [0.867371, -0.204102, -0.453613, -0.013794]},
{"time": "2016-01-18 18:00:04.944", "id": "ArmLinks", "acceleration": [-2.6, 0.8, -2.94], "location": "Europe/Berlin", "orientation": [0.867798, -0.205383, -0.452271, -0.014343]},
{"time": "2016-01-18 18:00:04.958", "id": "ArmLinks", "acceleration": [-2.51, 0.95, -3.34], "location": "Europe/Berlin", "orientation": [0.867798, -0.205139, -0.452332, -0.016541]},
{"time": "2016-01-18 18:00:04.984", "id": "ArmLinks", "acceleration": [-2.1, 0.81, -2.4], "location": "Europe/Berlin", "orientation": [0.86676, -0.199707, -0.456543, -0.018982]},
{"time": "2016-01-18 18:00:04.996", "id": "ArmLinks", "acceleration": [-1.43, 0.48, -1.3], "location": "Europe/Berlin", "orientation": [0.866028, -0.195068, -0.459839, -0.020142]},
{"time": "2016-01-18 18:00:05.010", "id": "ArmLinks", "acceleration": [-0.1, -0.04, 0.47], "location": "Europe/Berlin", "orientation": [0.864868, -0.183044, -0.466858, -0.022095]},
{"time": "2016-01-18 18:00:05.031", "id": "ArmLinks", "acceleration": [3.7, -0.94, 4.07], "location": "Europe/Berlin", "orientation": [0.864441, -0.170349, -0.472412, -0.023132]},
{"time": "2016-01-18 18:00:05.045", "id": "ArmLinks", "acceleration": [5.1, -1.59, 4.71], "location": "Europe/Berlin", "orientation": [0.864136, -0.164917, -0.474854, -0.023132]},
{"time": "2016-01-18 18:00:05.062", "id": "ArmLinks", "acceleration": [6.33, -1.64, 6.51], "location": "Europe/Berlin", "orientation": [0.863037, -0.158813, -0.479004, -0.022583]},
{"time": "2016-01-18 18:00:05.081", "id": "ArmLinks", "acceleration": [4.63, -1.27, 4.28], "location": "Europe/Berlin", "orientation": [0.86145, -0.160889, -0.48114, -0.022522]},
{"time": "2016-01-18 18:00:05.095", "id": "ArmLinks", "acceleration": [3.62, -1.05, 3.7], "location": "Europe/Berlin", "orientation": [0.859863, -0.164551, -0.482788, -0.021973]},
{"time": "2016-01-18 18:00:05.108", "id": "ArmLinks", "acceleration": [-0.37, -0.18, 1.69], "location": "Europe/Berlin", "orientation": [0.856812, -0.175476, -0.484497, -0.020142]},
{"time": "2016-01-18 18:00:05.124", "id": "ArmLinks", "acceleration": [-0.89, 0.12, 0.72], "location": "Europe/Berlin", "orientation": [0.856018, -0.182007, -0.483521, -0.019531]},
{"time": "2016-01-18 18:00:05.138", "id": "ArmLinks", "acceleration": [-2.07, 0.79, -1.21], "location": "Europe/Berlin", "orientation": [0.855652, -0.188782, -0.481506, -0.019104]},
{"time": "2016-01-18 18:00:05.148", "id": "ArmLinks", "acceleration": [-2.35, 0.98, -1.74], "location": "Europe/Berlin", "orientation": [0.855774, -0.201965, -0.476013, -0.018555]},
{"time": "2016-01-18 18:00:05.165", "id": "ArmLinks", "acceleration": [-2.81, 1.15, -2.67], "location": "Europe/Berlin", "orientation": [0.855957, -0.208008, -0.473022, -0.018677]},
{"time": "2016-01-18 18:00:05.182", "id": "ArmLinks", "acceleration": [-3.05, 1.49, -3.34], "location": "Europe/Berlin", "orientation": [0.856384, -0.218262, -0.467529, -0.019836]},
{"time": "2016-01-18 18:00:05.194", "id": "ArmLinks", "acceleration": [-3.12, 1.65, -3.63], "location": "Europe/Berlin", "orientation": [0.856506, -0.222229, -0.465393, -0.020813]},
{"time": "2016-01-18 18:00:05.212", "id": "ArmLinks", "acceleration": [-3.16, 1.91, -4.32], "location": "Europe/Berlin", "orientation": [0.856445, -0.226929, -0.463074, -0.023254]},
{"time": "2016-01-18 18:00:05.225", "id": "ArmLinks", "acceleration": [-3.12, 1.89, -4.44], "location": "Europe/Berlin", "orientation": [0.856384, -0.227478, -0.462891, -0.024658]},
{"time": "2016-01-18 18:00:05.234", "id": "ArmLinks", "acceleration": [-2.69, 1.69, -4.25], "location": "Europe/Berlin", "orientation": [0.856262, -0.226562, -0.463501, -0.02594]},
{"time": "2016-01-18 18:00:05.246", "id": "ArmLinks", "acceleration": [-2.28, 1.39, -3.53], "location": "Europe/Berlin", "orientation": [0.856079, -0.224182, -0.464844, -0.0271]},
{"time": "2016-01-18 18:00:05.259", "id": "ArmLinks", "acceleration": [-1.49, 0.95, -2.12], "location": "Europe/Berlin", "orientation": [0.855774, -0.215515, -0.469421, -0.029053]},
{"time": "2016-01-18 18:00:05.277", "id": "ArmLinks", "acceleration": [0.13, 0.21, 0.01], "location": "Europe/Berlin", "orientation": [0.85614, -0.202209, -0.474548, -0.030029]},
{"time": "2016-01-18 18:00:05.295", "id": "ArmLinks", "acceleration": [0.98, -0.25, 0.81], "location": "Europe/Berlin", "orientation": [0.856628, -0.194946, -0.476746, -0.030029]},
{"time": "2016-01-18 18:00:05.308", "id": "ArmLinks", "acceleration": [3.01, -1.22, 2.67], "location": "Europe/Berlin", "orientation": [0.857666, -0.18158, -0.480164, -0.02948]},
{"time": "2016-01-18 18:00:05.324", "id": "ArmLinks", "acceleration": [3.45, -1.39, 3.11], "location": "Europe/Berlin", "orientation": [0.858032, -0.176208, -0.481567, -0.029297]},
{"time": "2016-01-18 18:00:05.338", "id": "ArmLinks", "acceleration": [3.44, -1.44, 2.8], "location": "Europe/Berlin", "orientation": [0.858215, -0.171936, -0.482788, -0.029297]},
{"time": "2016-01-18 18:00:05.353", "id": "ArmLinks", "acceleration": [3.0, -1.41, 2.87], "location": "Europe/Berlin", "orientation": [0.85791, -0.166565, -0.485229, -0.029358]},
{"time": "2016-01-18 18:00:05.365", "id": "ArmLinks", "acceleration": [2.27, -0.91, 2.92], "location": "Europe/Berlin", "orientation": [0.857727, -0.165588, -0.485901, -0.029419]},
{"time": "2016-01-18 18:00:05.380", "id": "ArmLinks", "acceleration": [0.8, -0.11, 0.6], "location": "Europe/Berlin", "orientation": [0.857727, -0.166443, -0.485474, -0.029907]},
{"time": "2016-01-18 18:00:05.395", "id": "ArmLinks", "acceleration": [0.27, 0.06, 0.24], "location": "Europe/Berlin", "orientation": [0.857544, -0.167542, -0.485474, -0.029785]},
{"time": "2016-01-18 18:00:05.404", "id": "ArmLinks", "acceleration": [-1.13, 0.31, -0.36], "location": "Europe/Berlin", "orientation": [0.857239, -0.168579, -0.485596, -0.029358]},
{"time": "2016-01-18 18:00:05.419", "id": "ArmLinks", "acceleration": [-1.59, 0.47, -0.58], "location": "Europe/Berlin", "orientation": [0.857117, -0.169373, -0.485657, -0.02887]},
{"time": "2016-01-18 18:00:05.433", "id": "ArmLinks", "acceleration": [-1.66, 0.6, -0.91], "location": "Europe/Berlin", "orientation": [0.857544, -0.169617, -0.484863, -0.028137]},
{"time": "2016-01-18 18:00:05.446", "id": "ArmLinks", "acceleration": [-1.61, 0.63, -0.89], "location": "Europe/Berlin", "orientation": [0.857971, -0.169189, -0.484192, -0.027893]},
{"time": "2016-01-18 18:00:05.458", "id": "ArmLinks", "acceleration": [-1.08, 0.5, -0.69], "location": "Europe/Berlin", "orientation": [0.859131, -0.166809, -0.483032, -0.027588]},
{"time": "2016-01-18 18:00:05.475", "id": "ArmLinks", "acceleration": [-0.39, 0.36, -0.34], "location": "Europe/Berlin", "orientation": [0.859741, -0.165161, -0.482483, -0.027466]},
{"time": "2016-01-18 18:00:05.490", "id": "ArmLinks", "acceleration": [-0.06, 0.32, -0.07], "location": "Europe/Berlin", "orientation": [0.860474, -0.163208, -0.481873, -0.027222]},
{"time": "2016-01-18 18:00:05.498", "id": "ArmLinks", "acceleration": [0.96, 0.16, 0.34], "location": "Europe/Berlin", "orientation": [0.862183, -0.158936, -0.480286, -0.026367]},
{"time": "2016-01-18 18:00:05.515", "id": "ArmLinks", "acceleration": [1.18, 0.11, 0.53], "location": "Europe/Berlin", "orientation": [0.86322, -0.15686, -0.479187, -0.025757]},
{"time": "2016-01-18 18:00:05.527", "id": "ArmLinks", "acceleration": [1.31, 0.08, 0.75], "location": "Europe/Berlin", "orientation": [0.86438, -0.154968, -0.477722, -0.024902]},
{"time": "2016-01-18 18:00:05.537", "id": "ArmLinks", "acceleration": [1.32, -0.03, 0.96], "location": "Europe/Berlin", "orientation": [0.86554, -0.15332, -0.476135, -0.023987]},
{"time": "2016-01-18 18:00:05.554", "id": "ArmLinks", "acceleration": [1.07, -0.01, 0.76], "location": "Europe/Berlin", "orientation": [0.867554, -0.151184, -0.473267, -0.022461]},
{"time": "2016-01-18 18:00:05.564", "id": "ArmLinks", "acceleration": [0.91, 0.0, 0.84], "location": "Europe/Berlin", "orientation": [0.868164, -0.150513, -0.472351, -0.022034]},
{"time": "2016-01-18 18:00:05.575", "id": "ArmLinks", "acceleration": [0.57, 0.02, 0.72], "location": "Europe/Berlin", "orientation": [0.86853, -0.150146, -0.471863, -0.021973]},
{"time": "2016-01-18 18:00:05.585", "id": "ArmLinks", "acceleration": [0.41, 0.14, 0.33], "location": "Europe/Berlin", "orientation": [0.868469, -0.150024, -0.471985, -0.022217]},
{"time": "2016-01-18 18:00:05.597", "id": "ArmLinks", "acceleration": [0.11, 0.09, 0.36], "location": "Europe/Berlin", "orientation": [0.868042, -0.14978, -0.472839, -0.022827]},
{"time": "2016-01-18 18:00:05.614", "id": "ArmLinks", "acceleration": [-0.13, 0.11, -0.01], "location": "Europe/Berlin", "orientation": [0.866272, -0.14917, -0.476196, -0.024536]},
{"time": "2016-01-18 18:00:05.626", "id": "ArmLinks", "acceleration": [-0.47, 0.11, -0.26], "location": "Europe/Berlin", "orientation": [0.86499, -0.148865, -0.478455, -0.025696]},
{"time": "2016-01-18 18:00:05.637", "id": "ArmLinks", "acceleration": [-0.57, 0.06, -0.33], "location": "Europe/Berlin", "orientation": [0.86377, -0.148315, -0.480835, -0.027039]},
{"time": "2016-01-18 18:00:05.650", "id": "ArmLinks", "acceleration": [-0.36, -0.01, 0.08], "location": "Europe/Berlin", "orientation": [0.86261, -0.147339, -0.483154, -0.028381]},
{"time": "2016-01-18 18:00:05.663", "id": "ArmLinks", "acceleration": [-0.3, -0.12, 0.12], "location": "Europe/Berlin", "orientation": [0.860535, -0.14502, -0.487366, -0.030823]},
{"time": "2016-01-18 18:00:05.681", "id": "ArmLinks", "acceleration": [-0.34, -0.11, 0.13], "location": "Europe/Berlin", "orientation": [0.859558, -0.144104, -0.489197, -0.032043]},
{"time": "2016-01-18 18:00:05.696", "id": "ArmLinks", "acceleration": [-0.11, 0.2, 0.15], "location": "Europe/Berlin", "orientation": [0.858398, -0.143311, -0.491333, -0.034241]},
{"time": "2016-01-18 18:00:05.704", "id": "ArmLinks", "acceleration": [-0.2, -0.2, 0.08], "location": "Europe/Berlin", "orientation": [0.858154, -0.143433, -0.491638, -0.035217]},
{"time": "2016-01-18 18:00:05.714", "id": "ArmLinks", "acceleration": [-0.23, -0.14, 0.05], "location": "Europe/Berlin", "orientation": [0.857849, -0.143616, -0.492126, -0.03595]},
{"time": "2016-01-18 18:00:05.727", "id": "ArmLinks", "acceleration": [-0.2, 0.09, 0.02], "location": "Europe/Berlin", "orientation": [0.857605, -0.143677, -0.492432, -0.036499]},
{"time": "2016-01-18 18:00:05.741", "id": "ArmLinks", "acceleration": [-0.34, -0.08, 0.04], "location": "Europe/Berlin", "orientation": [0.857544, -0.143616, -0.492554, -0.036743]},
{"time": "2016-01-18 18:00:05.752", "id": "ArmLinks", "acceleration": [0.09, 0.16, 0.23], "location": "Europe/Berlin", "orientation": [0.857605, -0.143311, -0.492554, -0.036682]},
{"time": "2016-01-18 18:00:05.764", "id": "ArmLinks", "acceleration": [-0.24, -0.3, 0.29], "location": "Europe/Berlin", "orientation": [0.857422, -0.142944, -0.492981, -0.037048]},
{"time": "2016-01-18 18:00:05.777", "id": "ArmLinks", "acceleration": [-0.41, 0.04, -0.21], "location": "Europe/Berlin", "orientation": [0.857239, -0.1427, -0.493347, -0.037231]},
{"time": "2016-01-18 18:00:05.787", "id": "ArmLinks", "acceleration": [-0.21, -0.01, -0.04], "location": "Europe/Berlin", "orientation": [0.856934, -0.142456, -0.493958, -0.037659]},
{"time": "2016-01-18 18:00:05.806", "id": "ArmLinks", "acceleration": [0.05, -0.11, 0.05], "location": "Europe/Berlin", "orientation": [0.856201, -0.141418, -0.495361, -0.03833]},
{"time": "2016-01-18 18:00:05.819", "id": "ArmLinks", "acceleration": [-0.24, -0.13, -0.48], "location": "Europe/Berlin", "orientation": [0.855835, -0.140625, -0.496216, -0.038574]},
{"time": "2016-01-18 18:00:05.829", "id": "ArmLinks", "acceleration": [-0.01, -0.04, -0.37], "location": "Europe/Berlin", "orientation": [0.85553, -0.139648, -0.497009, -0.038879]},
{"time": "2016-01-18 18:00:05.844", "id": "ArmLinks", "acceleration": [0.16, 0.14, 0.14], "location": "Europe/Berlin", "orientation": [0.855225, -0.13678, -0.498291, -0.039307]},
{"time": "2016-01-18 18:00:05.855", "id": "ArmLinks", "acceleration": [0.28, -0.29, 0.07], "location": "Europe/Berlin", "orientation": [0.855164, -0.135193, -0.498901, -0.039307]},
{"time": "2016-01-18 18:00:05.868", "id": "ArmLinks", "acceleration": [0.15, -0.05, 0.14], "location": "Europe/Berlin", "orientation": [0.855103, -0.13385, -0.499329, -0.039246]},
{"time": "2016-01-18 18:00:05.879", "id": "ArmLinks", "acceleration": [0.34, 0.0, 0.2], "location": "Europe/Berlin", "orientation": [0.855042, -0.132996, -0.499695, -0.039368]},
{"time": "2016-01-18 18:00:05.896", "id": "ArmLinks", "acceleration": [0.23, -0.01, 0.06], "location": "Europe/Berlin", "orientation": [0.854858, -0.132629, -0.500061, -0.039612]},
{"time": "2016-01-18 18:00:05.907", "id": "ArmLinks", "acceleration": [0.22, 0.02, 0.0], "location": "Europe/Berlin", "orientation": [0.854858, -0.132935, -0.499939, -0.039734]},
{"time": "2016-01-18 18:00:05.923", "id": "ArmLinks", "acceleration": [0.44, 0.21, 0.39], "location": "Europe/Berlin", "orientation": [0.85498, -0.133301, -0.499634, -0.039917]},
{"time": "2016-01-18 18:00:05.941", "id": "ArmLinks", "acceleration": [0.55, 0.29, 0.67], "location": "Europe/Berlin", "orientation": [0.85498, -0.133179, -0.499695, -0.040039]},
{"time": "2016-01-18 18:00:05.952", "id": "ArmLinks", "acceleration": [0.83, 0.06, 0.79], "location": "Europe/Berlin", "orientation": [0.854797, -0.132874, -0.5, -0.0401]},
{"time": "2016-01-18 18:00:05.964", "id": "ArmLinks", "acceleration": [0.67, 0.08, 0.74], "location": "Europe/Berlin", "orientation": [0.85376, -0.132019, -0.502014, -0.040222]},
{"time": "2016-01-18 18:00:05.978", "id": "ArmLinks", "acceleration": [0.64, 0.12, 0.5], "location": "Europe/Berlin", "orientation": [0.852905, -0.131714, -0.503601, -0.040344]},
{"time": "2016-01-18 18:00:05.988", "id": "ArmLinks", "acceleration": [0.56, 0.15, 0.41], "location": "Europe/Berlin", "orientation": [0.851868, -0.131531, -0.50531, -0.040405]},
{"time": "2016-01-18 18:00:06.006", "id": "ArmLinks", "acceleration": [0.74, 0.16, 0.31], "location": "Europe/Berlin", "orientation": [0.849731, -0.131287, -0.509033, -0.040649]},
{"time": "2016-01-18 18:00:06.020", "id": "ArmLinks", "acceleration": [1.4, 0.14, 0.77], "location": "Europe/Berlin", "orientation": [0.848633, -0.131165, -0.510803, -0.040771]},
{"time": "2016-01-18 18:00:06.030", "id": "ArmLinks", "acceleration": [1.74, 0.12, 0.83], "location": "Europe/Berlin", "orientation": [0.847656, -0.130615, -0.512634, -0.040894]},
{"time": "2016-01-18 18:00:06.046", "id": "ArmLinks", "acceleration": [1.83, -0.41, 0.83], "location": "Europe/Berlin", "orientation": [0.845459, -0.128174, -0.516846, -0.04071]},
{"time": "2016-01-18 18:00:06.063", "id": "ArmLinks", "acceleration": [1.58, -0.57, 1.02], "location": "Europe/Berlin", "orientation": [0.844116, -0.126831, -0.519409, -0.040466]},
{"time": "2016-01-18 18:00:06.079", "id": "ArmLinks", "acceleration": [1.21, -0.46, 1.12], "location": "Europe/Berlin", "orientation": [0.84021, -0.124939, -0.526184, -0.039551]},
{"time": "2016-01-18 18:00:06.096", "id": "ArmLinks", "acceleration": [0.44, 0.12, 0.91], "location": "Europe/Berlin", "orientation": [0.836609, -0.127563, -0.531311, -0.038513]},
{"time": "2016-01-18 18:00:06.105", "id": "ArmLinks", "acceleration": [0.01, 0.25, 0.65], "location": "Europe/Berlin", "orientation": [0.836304, -0.130859, -0.531067, -0.037964]},
{"time": "2016-01-18 18:00:06.115", "id": "ArmLinks", "acceleration": [0.09, 0.0, 0.3], "location": "Europe/Berlin", "orientation": [0.836975, -0.13501, -0.528931, -0.037659]},
{"time": "2016-01-18 18:00:06.128", "id": "ArmLinks", "acceleration": [0.65, 0.07, 0.21], "location": "Europe/Berlin", "orientation": [0.838501, -0.139465, -0.525452, -0.037231]},
{"time": "2016-01-18 18:00:06.151", "id": "ArmLinks", "acceleration": [1.44, 0.0, -0.25], "location": "Europe/Berlin", "orientation": [0.841553, -0.147827, -0.518311, -0.035645]},
{"time": "2016-01-18 18:00:06.165", "id": "ArmLinks", "acceleration": [1.38, 0.08, -0.15], "location": "Europe/Berlin", "orientation": [0.842285, -0.15387, -0.515503, -0.033447]},
{"time": "2016-01-18 18:00:06.177", "id": "ArmLinks", "acceleration": [1.33, 0.05, -0.04], "location": "Europe/Berlin", "orientation": [0.841675, -0.156006, -0.515991, -0.032288]},
{"time": "2016-01-18 18:00:06.190", "id": "ArmLinks", "acceleration": [1.12, -0.12, -0.05], "location": "Europe/Berlin", "orientation": [0.840576, -0.157532, -0.517334, -0.031067]},
{"time": "2016-01-18 18:00:06.203", "id": "ArmLinks", "acceleration": [0.75, -0.11, -0.08], "location": "Europe/Berlin", "orientation": [0.839233, -0.158447, -0.519287, -0.029785]},
{"time": "2016-01-18 18:00:06.218", "id": "ArmLinks", "acceleration": [0.23, -0.04, -0.07], "location": "Europe/Berlin", "orientation": [0.83606, -0.15918, -0.524414, -0.026855]},
{"time": "2016-01-18 18:00:06.228", "id": "ArmLinks", "acceleration": [0.04, -0.05, -0.12], "location": "Europe/Berlin", "orientation": [0.83429, -0.159424, -0.527222, -0.025269]},
{"time": "2016-01-18 18:00:06.248", "id": "ArmLinks", "acceleration": [-0.54, 0.16, -0.19], "location": "Europe/Berlin", "orientation": [0.8302, -0.160767, -0.533325, -0.021912]},
{"time": "2016-01-18 18:00:06.263", "id": "ArmLinks", "acceleration": [-1.27, 0.14, -0.18], "location": "Europe/Berlin", "orientation": [0.825562, -0.163513, -0.539856, -0.018372]},
{"time": "2016-01-18 18:00:06.278", "id": "ArmLinks", "acceleration": [-1.61, 0.11, -0.19], "location": "Europe/Berlin", "orientation": [0.823364, -0.165283, -0.542603, -0.016541]},
{"time": "2016-01-18 18:00:06.301", "id": "ArmLinks", "acceleration": [-1.88, 0.16, -0.08], "location": "Europe/Berlin", "orientation": [0.819885, -0.168945, -0.546875, -0.013245]},
{"time": "2016-01-18 18:00:06.315", "id": "ArmLinks", "acceleration": [-2.03, 0.08, -0.45], "location": "Europe/Berlin", "orientation": [0.816833, -0.172119, -0.550476, -0.010559]},
{"time": "2016-01-18 18:00:06.328", "id": "ArmLinks", "acceleration": [-2.17, 0.02, -0.53], "location": "Europe/Berlin", "orientation": [0.815308, -0.173523, -0.552307, -0.009644]},
{"time": "2016-01-18 18:00:06.347", "id": "ArmLinks", "acceleration": [-2.57, 0.09, -0.81], "location": "Europe/Berlin", "orientation": [0.811951, -0.17572, -0.55658, -0.008728]},
{"time": "2016-01-18 18:00:06.355", "id": "ArmLinks", "acceleration": [-3.09, 0.2, -1.33], "location": "Europe/Berlin", "orientation": [0.811951, -0.17572, -0.55658, -0.008728]},
{"time": "2016-01-18 18:00:06.380", "id": "ArmLinks", "acceleration": [-3.7, 0.26, -1.28], "location": "Europe/Berlin", "orientation": [0.80603, -0.176331, -0.564941, -0.009155]},
{"time": "2016-01-18 18:00:06.390", "id": "ArmLinks", "acceleration": [-4.13, 0.17, -1.03], "location": "Europe/Berlin", "orientation": [0.804138, -0.175354, -0.567871, -0.009827]},
{"time": "2016-01-18 18:00:06.404", "id": "ArmLinks", "acceleration": [-4.18, 0.07, -0.68], "location": "Europe/Berlin", "orientation": [0.802734, -0.173584, -0.570435, -0.010864]},
{"time": "2016-01-18 18:00:06.415", "id": "ArmLinks", "acceleration": [-3.99, 0.03, 0.08], "location": "Europe/Berlin", "orientation": [0.801636, -0.167725, -0.573669, -0.014038]},
{"time": "2016-01-18 18:00:06.428", "id": "ArmLinks", "acceleration": [-3.56, -0.01, 0.46], "location": "Europe/Berlin", "orientation": [0.802124, -0.163757, -0.574097, -0.016235]},
{"time": "2016-01-18 18:00:06.451", "id": "ArmLinks", "acceleration": [-2.38, -0.05, 1.18], "location": "Europe/Berlin", "orientation": [0.804321, -0.15448, -0.573364, -0.021851]},
{"time": "2016-01-18 18:00:06.465", "id": "ArmLinks", "acceleration": [-0.37, 0.17, 1.8], "location": "Europe/Berlin", "orientation": [0.806763, -0.144714, -0.572021, -0.030212]},
{"time": "2016-01-18 18:00:06.478", "id": "ArmLinks", "acceleration": [0.24, 0.28, 1.57], "location": "Europe/Berlin", "orientation": [0.8078, -0.140259, -0.571411, -0.035767]},
{"time": "2016-01-18 18:00:06.497", "id": "ArmLinks", "acceleration": [2.14, 0.25, 1.08], "location": "Europe/Berlin", "orientation": [0.808899, -0.132019, -0.570923, -0.048584]},
{"time": "2016-01-18 18:00:06.505", "id": "ArmLinks", "acceleration": [2.68, 0.2, 0.86], "location": "Europe/Berlin", "orientation": [0.808899, -0.132019, -0.570923, -0.048584]},
{"time": "2016-01-18 18:00:06.519", "id": "ArmLinks", "acceleration": [3.18, 0.4, 0.63], "location": "Europe/Berlin", "orientation": [0.808533, -0.125916, -0.571594, -0.061035]},
{"time": "2016-01-18 18:00:06.529", "id": "ArmLinks", "acceleration": [3.26, 0.27, 0.23], "location": "Europe/Berlin", "orientation": [0.808105, -0.12384, -0.572021, -0.066345]},
{"time": "2016-01-18 18:00:06.547", "id": "ArmLinks", "acceleration": [3.34, 0.18, -0.12], "location": "Europe/Berlin", "orientation": [0.807312, -0.121582, -0.572571, -0.075073]},
{"time": "2016-01-18 18:00:06.555", "id": "ArmLinks", "acceleration": [3.21, 0.12, -0.74], "location": "Europe/Berlin", "orientation": [0.807312, -0.121582, -0.572571, -0.075073]},
{"time": "2016-01-18 18:00:06.568", "id": "ArmLinks", "acceleration": [3.25, 0.0, -1.11], "location": "Europe/Berlin", "orientation": [0.807129, -0.121582, -0.571838, -0.081848]},
{"time": "2016-01-18 18:00:06.583", "id": "ArmLinks", "acceleration": [3.33, -0.12, -1.58], "location": "Europe/Berlin", "orientation": [0.807495, -0.122009, -0.570923, -0.084473]},
{"time": "2016-01-18 18:00:06.598", "id": "ArmLinks", "acceleration": [2.83, -0.13, -1.96], "location": "Europe/Berlin", "orientation": [0.808777, -0.122498, -0.568481, -0.08783]},
{"time": "2016-01-18 18:00:06.608", "id": "ArmLinks", "acceleration": [2.55, 0.03, -2.11], "location": "Europe/Berlin", "orientation": [0.809692, -0.122375, -0.567078, -0.08844]},
{"time": "2016-01-18 18:00:06.623", "id": "ArmLinks", "acceleration": [2.48, 0.05, -1.81], "location": "Europe/Berlin", "orientation": [0.810791, -0.121887, -0.565613, -0.088318]},
{"time": "2016-01-18 18:00:06.632", "id": "ArmLinks", "acceleration": [2.0, 0.03, -1.63], "location": "Europe/Berlin", "orientation": [0.812012, -0.121277, -0.564148, -0.087585]},
{"time": "2016-01-18 18:00:06.662", "id": "ArmLinks", "acceleration": [0.42, -0.14, -1.53], "location": "Europe/Berlin", "orientation": [0.815552, -0.119751, -0.56073, -0.078003]},
{"time": "2016-01-18 18:00:06.679", "id": "ArmLinks", "acceleration": [-0.05, -0.15, -1.39], "location": "Europe/Berlin", "orientation": [0.816284, -0.119568, -0.560181, -0.074707]},
{"time": "2016-01-18 18:00:06.697", "id": "ArmLinks", "acceleration": [-1.07, -0.12, -1.3], "location": "Europe/Berlin", "orientation": [0.81781, -0.118713, -0.55896, -0.067871]},
{"time": "2016-01-18 18:00:06.706", "id": "ArmLinks", "acceleration": [-1.29, -0.1, -1.27], "location": "Europe/Berlin", "orientation": [0.81781, -0.118713, -0.55896, -0.067871]},
{"time": "2016-01-18 18:00:06.720", "id": "ArmLinks", "acceleration": [-1.52, -0.07, -1.11], "location": "Europe/Berlin", "orientation": [0.819336, -0.116394, -0.558044, -0.060913]},
{"time": "2016-01-18 18:00:06.734", "id": "ArmLinks", "acceleration": [-2.07, -0.05, -0.73], "location": "Europe/Berlin", "orientation": [0.820068, -0.114624, -0.557739, -0.057312]},
{"time": "2016-01-18 18:00:06.749", "id": "ArmLinks", "acceleration": [-2.18, -0.06, -0.49], "location": "Europe/Berlin", "orientation": [0.821899, -0.109558, -0.556763, -0.049683]},
{"time": "2016-01-18 18:00:06.765", "id": "ArmLinks", "acceleration": [-2.52, 0.01, -0.09], "location": "Europe/Berlin", "orientation": [0.824402, -0.102661, -0.554993, -0.041748]},
{"time": "2016-01-18 18:00:06.779", "id": "ArmLinks", "acceleration": [-2.47, -0.02, 0.14], "location": "Europe/Berlin", "orientation": [0.825989, -0.098572, -0.553711, -0.037903]},
{"time": "2016-01-18 18:00:06.795", "id": "ArmLinks", "acceleration": [-2.41, -0.09, 0.89], "location": "Europe/Berlin", "orientation": [0.827698, -0.093933, -0.552185, -0.03418]},
{"time": "2016-01-18 18:00:06.808", "id": "ArmLinks", "acceleration": [-2.43, -0.02, 1.4], "location": "Europe/Berlin", "orientation": [0.831116, -0.084229, -0.54895, -0.027893]},
{"time": "2016-01-18 18:00:06.820", "id": "ArmLinks", "acceleration": [-2.39, -0.35, 1.73], "location": "Europe/Berlin", "orientation": [0.832764, -0.079407, -0.547302, -0.025635]},
{"time": "2016-01-18 18:00:06.830", "id": "ArmLinks", "acceleration": [-2.23, 0.05, 2.3], "location": "Europe/Berlin", "orientation": [0.834229, -0.074951, -0.545715, -0.024292]},
{"time": "2016-01-18 18:00:06.848", "id": "ArmLinks", "acceleration": [-2.21, -0.15, 2.33], "location": "Europe/Berlin", "orientation": [0.836914, -0.066956, -0.542664, -0.024048]},
{"time": "2016-01-18 18:00:06.857", "id": "ArmLinks", "acceleration": [-2.18, -0.29, 2.23], "location": "Europe/Berlin", "orientation": [0.836914, -0.066956, -0.542664, -0.024048]},
{"time": "2016-01-18 18:00:06.875", "id": "ArmLinks", "acceleration": [-2.13, -0.27, 2.26], "location": "Europe/Berlin", "orientation": [0.840515, -0.058716, -0.537781, -0.03009]},
{"time": "2016-01-18 18:00:06.890", "id": "ArmLinks", "acceleration": [-2.03, -0.25, 2.12], "location": "Europe/Berlin", "orientation": [0.841736, -0.057129, -0.535828, -0.033875]},
{"time": "2016-01-18 18:00:06.904", "id": "ArmLinks", "acceleration": [-1.65, -0.08, 1.61], "location": "Europe/Berlin", "orientation": [0.843018, -0.056091, -0.533569, -0.03833]},
{"time": "2016-01-18 18:00:06.916", "id": "ArmLinks", "acceleration": [-0.99, -0.09, 0.97], "location": "Europe/Berlin", "orientation": [0.845703, -0.055115, -0.528564, -0.048645]},
{"time": "2016-01-18 18:00:06.930", "id": "ArmLinks", "acceleration": [-0.56, 0.01, 0.54], "location": "Europe/Berlin", "orientation": [0.846924, -0.054993, -0.526001, -0.054321]},
{"time": "2016-01-18 18:00:06.951", "id": "ArmLinks", "acceleration": [0.51, 0.06, -0.01], "location": "Europe/Berlin", "orientation": [0.849243, -0.05542, -0.520874, -0.066528]},
{"time": "2016-01-18 18:00:06.971", "id": "ArmLinks", "acceleration": [1.43, 0.08, -0.78], "location": "Europe/Berlin", "orientation": [0.850708, -0.056519, -0.516602, -0.078857]},
{"time": "2016-01-18 18:00:06.980", "id": "ArmLinks", "acceleration": [1.58, 0.08, -0.98], "location": "Europe/Berlin", "orientation": [0.851074, -0.057129, -0.515015, -0.084839]},
{"time": "2016-01-18 18:00:06.998", "id": "ArmLinks", "acceleration": [1.7, 0.09, -1.09], "location": "Europe/Berlin", "orientation": [0.851135, -0.057739, -0.513855, -0.090576]},
{"time": "2016-01-18 18:00:07.006", "id": "ArmLinks", "acceleration": [1.54, 0.1, -1.37], "location": "Europe/Berlin", "orientation": [0.851013, -0.058411, -0.513, -0.09613]},
{"time": "2016-01-18 18:00:07.019", "id": "ArmLinks", "acceleration": [1.84, 0.05, -1.52], "location": "Europe/Berlin", "orientation": [0.85083, -0.059998, -0.511169, -0.105835]},
{"time": "2016-01-18 18:00:07.030", "id": "ArmLinks", "acceleration": [2.03, 0.16, -1.76], "location": "Europe/Berlin", "orientation": [0.85083, -0.060974, -0.510254, -0.10968]},
{"time": "2016-01-18 18:00:07.041", "id": "ArmLinks", "acceleration": [1.98, 0.09, -1.76], "location": "Europe/Berlin", "orientation": [0.85083, -0.062012, -0.50946, -0.112854]},
{"time": "2016-01-18 18:00:07.055", "id": "ArmLinks", "acceleration": [1.68, 0.11, -1.69], "location": "Europe/Berlin", "orientation": [0.850769, -0.063049, -0.508789, -0.115417]},
{"time": "2016-01-18 18:00:07.071", "id": "ArmLinks", "acceleration": [1.28, 0.23, -1.41], "location": "Europe/Berlin", "orientation": [0.851013, -0.065125, -0.507263, -0.11908]},
{"time": "2016-01-18 18:00:07.085", "id": "ArmLinks", "acceleration": [1.07, 0.29, -1.37], "location": "Europe/Berlin", "orientation": [0.851257, -0.066223, -0.506409, -0.120361]},
{"time": "2016-01-18 18:00:07.099", "id": "ArmLinks", "acceleration": [0.5, 0.57, -1.49], "location": "Europe/Berlin", "orientation": [0.851624, -0.067993, -0.505249, -0.121826]},
{"time": "2016-01-18 18:00:07.111", "id": "ArmLinks", "acceleration": [0.33, 0.62, -1.6], "location": "Europe/Berlin", "orientation": [0.851807, -0.068176, -0.504883, -0.121887]},
{"time": "2016-01-18 18:00:07.131", "id": "ArmLinks", "acceleration": [0.1, 0.51, -0.72], "location": "Europe/Berlin", "orientation": [0.8526, -0.066528, -0.50415, -0.120483]},
{"time": "2016-01-18 18:00:07.143", "id": "ArmLinks", "acceleration": [-0.07, 0.51, -0.53], "location": "Europe/Berlin", "orientation": [0.853088, -0.065063, -0.503723, -0.119263]},
{"time": "2016-01-18 18:00:07.158", "id": "ArmLinks", "acceleration": [-0.28, 0.4, -0.22], "location": "Europe/Berlin", "orientation": [0.854492, -0.061768, -0.502441, -0.116455]},
{"time": "2016-01-18 18:00:07.172", "id": "ArmLinks", "acceleration": [-0.21, 0.24, 0.03], "location": "Europe/Berlin", "orientation": [0.855469, -0.060242, -0.501343, -0.11499]},
{"time": "2016-01-18 18:00:07.181", "id": "ArmLinks", "acceleration": [-0.38, 0.28, -0.02], "location": "Europe/Berlin", "orientation": [0.856567, -0.059143, -0.499939, -0.113464]},
{"time": "2016-01-18 18:00:07.195", "id": "ArmLinks", "acceleration": [-0.55, 0.27, 0.0], "location": "Europe/Berlin", "orientation": [0.857666, -0.058594, -0.498413, -0.112]},
{"time": "2016-01-18 18:00:07.205", "id": "ArmLinks", "acceleration": [-0.7, 0.37, -0.34], "location": "Europe/Berlin", "orientation": [0.858887, -0.058472, -0.496704, -0.110657]},
{"time": "2016-01-18 18:00:07.220", "id": "ArmLinks", "acceleration": [-0.69, 0.44, -0.65], "location": "Europe/Berlin", "orientation": [0.861206, -0.05896, -0.493103, -0.108459]},
{"time": "2016-01-18 18:00:07.231", "id": "ArmLinks", "acceleration": [-0.6, 0.4, -0.8], "location": "Europe/Berlin", "orientation": [0.862183, -0.059387, -0.491455, -0.107422]},
{"time": "2016-01-18 18:00:07.241", "id": "ArmLinks", "acceleration": [-0.6, 0.35, -0.74], "location": "Europe/Berlin", "orientation": [0.863098, -0.059998, -0.490051, -0.106323]},
{"time": "2016-01-18 18:00:07.255", "id": "ArmLinks", "acceleration": [-0.81, 0.34, -0.82], "location": "Europe/Berlin", "orientation": [0.863892, -0.060486, -0.488831, -0.105225]},
{"time": "2016-01-18 18:00:07.268", "id": "ArmLinks", "acceleration": [-0.96, 0.25, -1.03], "location": "Europe/Berlin", "orientation": [0.865601, -0.061462, -0.486145, -0.103149]},
{"time": "2016-01-18 18:00:07.285", "id": "ArmLinks", "acceleration": [-0.76, 0.24, -1.03], "location": "Europe/Berlin", "orientation": [0.866577, -0.06189, -0.484497, -0.102173]},
{"time": "2016-01-18 18:00:07.299", "id": "ArmLinks", "acceleration": [-0.98, 0.24, -0.85], "location": "Europe/Berlin", "orientation": [0.868835, -0.062073, -0.480896, -0.100403]},
{"time": "2016-01-18 18:00:07.314", "id": "ArmLinks", "acceleration": [-0.93, 0.23, -0.73], "location": "Europe/Berlin", "orientation": [0.870178, -0.061646, -0.478638, -0.099487]},
{"time": "2016-01-18 18:00:07.331", "id": "ArmLinks", "acceleration": [-0.83, 0.6, -0.27], "location": "Europe/Berlin", "orientation": [0.874084, -0.060852, -0.472046, -0.09729]},
{"time": "2016-01-18 18:00:07.347", "id": "ArmLinks", "acceleration": [-0.59, 0.52, -0.27], "location": "Europe/Berlin", "orientation": [0.876404, -0.060486, -0.467957, -0.096069]},
{"time": "2016-01-18 18:00:07.359", "id": "ArmLinks", "acceleration": [-0.17, 0.41, -0.12], "location": "Europe/Berlin", "orientation": [0.881836, -0.05896, -0.458557, -0.09259]},
{"time": "2016-01-18 18:00:07.371", "id": "ArmLinks", "acceleration": [0.26, 0.23, 0.49], "location": "Europe/Berlin", "orientation": [0.884827, -0.0578, -0.453308, -0.090576]},
{"time": "2016-01-18 18:00:07.382", "id": "ArmLinks", "acceleration": [0.85, 0.07, 0.38], "location": "Europe/Berlin", "orientation": [0.887939, -0.056763, -0.447754, -0.088501]},
{"time": "2016-01-18 18:00:07.395", "id": "ArmLinks", "acceleration": [0.68, -0.27, -0.06], "location": "Europe/Berlin", "orientation": [0.891113, -0.055054, -0.442078, -0.085999]},
{"time": "2016-01-18 18:00:07.405", "id": "ArmLinks", "acceleration": [1.13, -0.31, 0.51], "location": "Europe/Berlin", "orientation": [0.893921, -0.05304, -0.437195, -0.083252]},
{"time": "2016-01-18 18:00:07.426", "id": "ArmLinks", "acceleration": [0.82, -0.75, 0.67], "location": "Europe/Berlin", "orientation": [0.898132, -0.048828, -0.429871, -0.078918]},
{"time": "2016-01-18 18:00:07.442", "id": "ArmLinks", "acceleration": [1.26, -1.01, 1.43], "location": "Europe/Berlin", "orientation": [0.900818, -0.044739, -0.425171, -0.075623]},
{"time": "2016-01-18 18:00:07.455", "id": "ArmLinks", "acceleration": [1.02, -0.91, 1.69], "location": "Europe/Berlin", "orientation": [0.901917, -0.042969, -0.423279, -0.074158]},
{"time": "2016-01-18 18:00:07.472", "id": "ArmLinks", "acceleration": [1.82, -1.3, 1.35], "location": "Europe/Berlin", "orientation": [0.904175, -0.039978, -0.419128, -0.071838]},
{"time": "2016-01-18 18:00:07.482", "id": "ArmLinks", "acceleration": [1.04, -1.06, 1.78], "location": "Europe/Berlin", "orientation": [0.90564, -0.03894, -0.416321, -0.07074]},
{"time": "2016-01-18 18:00:07.498", "id": "ArmLinks", "acceleration": [1.38, -0.98, 1.84], "location": "Europe/Berlin", "orientation": [0.906738, -0.037903, -0.414185, -0.069824]},
{"time": "2016-01-18 18:00:07.505", "id": "ArmLinks", "acceleration": [1.53, -0.63, 2.04], "location": "Europe/Berlin", "orientation": [0.907654, -0.037292, -0.412231, -0.069275]},
{"time": "2016-01-18 18:00:07.522", "id": "ArmLinks", "acceleration": [1.24, -0.48, 1.79], "location": "Europe/Berlin", "orientation": [0.908508, -0.037781, -0.410522, -0.06842]},
{"time": "2016-01-18 18:00:07.532", "id": "ArmLinks", "acceleration": [0.92, -0.3, 1.78], "location": "Europe/Berlin", "orientation": [0.908508, -0.039185, -0.410461, -0.068054]},
{"time": "2016-01-18 18:00:07.544", "id": "ArmLinks", "acceleration": [0.21, -0.06, 1.31], "location": "Europe/Berlin", "orientation": [0.908386, -0.041321, -0.410461, -0.06781]},
{"time": "2016-01-18 18:00:07.559", "id": "ArmLinks", "acceleration": [-0.37, 0.06, 0.65], "location": "Europe/Berlin", "orientation": [0.908508, -0.044006, -0.409973, -0.067566]},
{"time": "2016-01-18 18:00:07.572", "id": "ArmLinks", "acceleration": [-0.39, 0.19, 0.67], "location": "Europe/Berlin", "orientation": [0.909729, -0.049988, -0.406616, -0.067017]},
{"time": "2016-01-18 18:00:07.582", "id": "ArmLinks", "acceleration": [-0.32, 0.26, 0.59], "location": "Europe/Berlin", "orientation": [0.911011, -0.053223, -0.403503, -0.066589]},
{"time": "2016-01-18 18:00:07.595", "id": "ArmLinks", "acceleration": [-0.43, 0.35, 0.38], "location": "Europe/Berlin", "orientation": [0.912537, -0.056763, -0.399658, -0.066162]},
{"time": "2016-01-18 18:00:07.605", "id": "ArmLinks", "acceleration": [-0.62, 0.25, 0.47], "location": "Europe/Berlin", "orientation": [0.914185, -0.060608, -0.395325, -0.065857]},
{"time": "2016-01-18 18:00:07.625", "id": "ArmLinks", "acceleration": [-0.53, 0.24, 0.01], "location": "Europe/Berlin", "orientation": [0.917542, -0.069092, -0.386047, -0.06543]},
{"time": "2016-01-18 18:00:07.643", "id": "ArmLinks", "acceleration": [0.02, 0.27, -0.04], "location": "Europe/Berlin", "orientation": [0.921143, -0.077576, -0.375671, -0.065979]},
{"time": "2016-01-18 18:00:07.655", "id": "ArmLinks", "acceleration": [0.13, 0.2, -0.31], "location": "Europe/Berlin", "orientation": [0.922974, -0.081665, -0.370239, -0.066467]},
{"time": "2016-01-18 18:00:07.672", "id": "ArmLinks", "acceleration": [0.01, -0.09, -0.25], "location": "Europe/Berlin", "orientation": [0.925964, -0.088501, -0.360962, -0.066895]},
{"time": "2016-01-18 18:00:07.683", "id": "ArmLinks", "acceleration": [0.0, -0.15, -0.25], "location": "Europe/Berlin", "orientation": [0.927124, -0.091492, -0.357178, -0.066589]},
{"time": "2016-01-18 18:00:07.696", "id": "ArmLinks", "acceleration": [0.16, -0.22, -0.05], "location": "Europe/Berlin", "orientation": [0.928284, -0.094299, -0.353699, -0.06604]},
{"time": "2016-01-18 18:00:07.705", "id": "ArmLinks", "acceleration": [0.19, -0.28, -0.04], "location": "Europe/Berlin", "orientation": [0.929321, -0.097046, -0.350159, -0.06543]},
{"time": "2016-01-18 18:00:07.723", "id": "ArmLinks", "acceleration": [0.28, -0.31, 0.0], "location": "Europe/Berlin", "orientation": [0.93158, -0.102112, -0.342957, -0.063843]},
{"time": "2016-01-18 18:00:07.733", "id": "ArmLinks", "acceleration": [0.32, -0.29, 0.01], "location": "Europe/Berlin", "orientation": [0.932739, -0.104309, -0.339417, -0.062744]},
{"time": "2016-01-18 18:00:07.743", "id": "ArmLinks", "acceleration": [0.15, -0.31, 0.1], "location": "Europe/Berlin", "orientation": [0.933838, -0.106323, -0.335938, -0.061462]},
{"time": "2016-01-18 18:00:07.759", "id": "ArmLinks", "acceleration": [-0.1, -0.26, -0.23], "location": "Europe/Berlin", "orientation": [0.934937, -0.108032, -0.332581, -0.060181]},
{"time": "2016-01-18 18:00:07.773", "id": "ArmLinks", "acceleration": [0.0, -0.23, 0.03], "location": "Europe/Berlin", "orientation": [0.93689, -0.110718, -0.326599, -0.057922]},
{"time": "2016-01-18 18:00:07.783", "id": "ArmLinks", "acceleration": [-0.14, -0.18, -0.21], "location": "Europe/Berlin", "orientation": [0.937622, -0.111816, -0.324097, -0.057068]},
{"time": "2016-01-18 18:00:07.795", "id": "ArmLinks", "acceleration": [-0.27, -0.15, -0.38], "location": "Europe/Berlin", "orientation": [0.938354, -0.112671, -0.321899, -0.056458]},
{"time": "2016-01-18 18:00:07.805", "id": "ArmLinks", "acceleration": [-0.28, -0.04, -0.25], "location": "Europe/Berlin", "orientation": [0.938965, -0.113281, -0.319885, -0.055969]},
{"time": "2016-01-18 18:00:07.826", "id": "ArmLinks", "acceleration": [-0.44, -0.02, -0.4], "location": "Europe/Berlin", "orientation": [0.940063, -0.114197, -0.316589, -0.055237]},
{"time": "2016-01-18 18:00:07.843", "id": "ArmLinks", "acceleration": [-0.2, -0.06, -0.15], "location": "Europe/Berlin", "orientation": [0.94104, -0.114807, -0.313599, -0.054199]},
{"time": "2016-01-18 18:00:07.856", "id": "ArmLinks", "acceleration": [-0.17, -0.02, -0.18], "location": "Europe/Berlin", "orientation": [0.941589, -0.11499, -0.312012, -0.053528]},
{"time": "2016-01-18 18:00:07.865", "id": "ArmLinks", "acceleration": [-0.1, -0.06, -0.14], "location": "Europe/Berlin", "orientation": [0.9422, -0.115173, -0.31012, -0.052856]},
{"time": "2016-01-18 18:00:07.882", "id": "ArmLinks", "acceleration": [0.05, -0.05, 0.01], "location": "Europe/Berlin", "orientation": [0.943665, -0.115356, -0.305847, -0.051331]},
{"time": "2016-01-18 18:00:07.899", "id": "ArmLinks", "acceleration": [0.01, 0.02, -0.08], "location": "Europe/Berlin", "orientation": [0.944458, -0.115356, -0.303528, -0.050415]},
{"time": "2016-01-18 18:00:07.906", "id": "ArmLinks", "acceleration": [0.08, -0.04, 0.06], "location": "Europe/Berlin", "orientation": [0.945312, -0.115173, -0.301086, -0.0495]},
{"time": "2016-01-18 18:00:07.923", "id": "ArmLinks", "acceleration": [0.41, -0.02, 0.36], "location": "Europe/Berlin", "orientation": [0.94696, -0.114563, -0.296448, -0.047668]},
{"time": "2016-01-18 18:00:07.933", "id": "ArmLinks", "acceleration": [0.43, -0.03, 0.33], "location": "Europe/Berlin", "orientation": [0.947632, -0.114319, -0.294617, -0.046692]},
{"time": "2016-01-18 18:00:07.945", "id": "ArmLinks", "acceleration": [0.17, 0.02, 0.36], "location": "Europe/Berlin", "orientation": [0.948181, -0.114197, -0.292969, -0.045715]},
{"time": "2016-01-18 18:00:07.955", "id": "ArmLinks", "acceleration": [0.26, 0.04, 0.38], "location": "Europe/Berlin", "orientation": [0.948669, -0.114197, -0.291504, -0.044861]},
{"time": "2016-01-18 18:00:07.969", "id": "ArmLinks", "acceleration": [0.09, 0.02, -0.12], "location": "Europe/Berlin", "orientation": [0.949463, -0.114563, -0.289001, -0.043518]},
{"time": "2016-01-18 18:00:07.984", "id": "ArmLinks", "acceleration": [0.46, 0.03, 0.09], "location": "Europe/Berlin", "orientation": [0.949768, -0.114624, -0.288086, -0.042847]},
{"time": "2016-01-18 18:00:07.995", "id": "ArmLinks", "acceleration": [0.19, 0.06, 0.01], "location": "Europe/Berlin", "orientation": [0.949951, -0.114502, -0.287537, -0.042053]},
{"time": "2016-01-18 18:00:08.005", "id": "ArmLinks", "acceleration": [0.04, 0.1, 0.12], "location": "Europe/Berlin", "orientation": [0.950073, -0.114258, -0.287354, -0.041199]},
{"time": "2016-01-18 18:00:08.015", "id": "ArmLinks", "acceleration": [0.04, 0.14, 0.04], "location": "Europe/Berlin", "orientation": [0.950195, -0.113708, -0.287415, -0.040466]},
{"time": "2016-01-18 18:00:08.036", "id": "ArmLinks", "acceleration": [-0.26, 0.18, 0.07], "location": "Europe/Berlin", "orientation": [0.950195, -0.112244, -0.288025, -0.039001]},
{"time": "2016-01-18 18:00:08.045", "id": "ArmLinks", "acceleration": [-0.15, 0.15, 0.06], "location": "Europe/Berlin", "orientation": [0.950134, -0.111511, -0.288696, -0.038269]},
{"time": "2016-01-18 18:00:08.055", "id": "ArmLinks", "acceleration": [-0.12, 0.18, 0.06], "location": "Europe/Berlin", "orientation": [0.950012, -0.11084, -0.289551, -0.037476]},
{"time": "2016-01-18 18:00:08.066", "id": "ArmLinks", "acceleration": [-0.02, 0.07, 0.03], "location": "Europe/Berlin", "orientation": [0.949829, -0.110168, -0.290527, -0.036621]},
{"time": "2016-01-18 18:00:08.074", "id": "ArmLinks", "acceleration": [-0.17, 0.04, 0.07], "location": "Europe/Berlin", "orientation": [0.949707, -0.109314, -0.291321, -0.035767]},
{"time": "2016-01-18 18:00:08.087", "id": "ArmLinks", "acceleration": [-0.34, 0.01, 0.19], "location": "Europe/Berlin", "orientation": [0.949646, -0.108459, -0.291931, -0.035095]},
{"time": "2016-01-18 18:00:08.095", "id": "ArmLinks", "acceleration": [-0.27, 0.0, 0.28], "location": "Europe/Berlin", "orientation": [0.949524, -0.107483, -0.292603, -0.03479]},
{"time": "2016-01-18 18:00:08.105", "id": "ArmLinks", "acceleration": [-0.23, -0.04, 0.31], "location": "Europe/Berlin", "orientation": [0.949341, -0.106445, -0.293579, -0.034973]},
{"time": "2016-01-18 18:00:08.116", "id": "ArmLinks", "acceleration": [-0.06, -0.07, 0.06], "location": "Europe/Berlin", "orientation": [0.948975, -0.105469, -0.294983, -0.035339]},
{"time": "2016-01-18 18:00:08.123", "id": "ArmLinks", "acceleration": [-0.02, -0.08, 0.22], "location": "Europe/Berlin", "orientation": [0.948547, -0.104614, -0.296631, -0.035706]},
{"time": "2016-01-18 18:00:08.138", "id": "ArmLinks", "acceleration": [-0.03, -0.09, 0.28], "location": "Europe/Berlin", "orientation": [0.94812, -0.103882, -0.298279, -0.036011]},
{"time": "2016-01-18 18:00:08.146", "id": "ArmLinks", "acceleration": [-0.05, -0.11, 0.36], "location": "Europe/Berlin", "orientation": [0.947754, -0.10321, -0.299683, -0.036194]},
{"time": "2016-01-18 18:00:08.156", "id": "ArmLinks", "acceleration": [-0.03, -0.08, 0.33], "location": "Europe/Berlin", "orientation": [0.94751, -0.1026, -0.300659, -0.036377]},
{"time": "2016-01-18 18:00:08.166", "id": "ArmLinks", "acceleration": [-0.01, -0.12, 0.23], "location": "Europe/Berlin", "orientation": [0.947327, -0.102112, -0.301392, -0.036682]},
{"time": "2016-01-18 18:00:08.173", "id": "ArmLinks", "acceleration": [0.01, -0.12, 0.16], "location": "Europe/Berlin", "orientation": [0.947205, -0.101624, -0.30188, -0.037109]},
{"time": "2016-01-18 18:00:08.189", "id": "ArmLinks", "acceleration": [0.06, -0.08, 0.14], "location": "Europe/Berlin", "orientation": [0.947021, -0.101135, -0.30249, -0.037659]},
{"time": "2016-01-18 18:00:08.206", "id": "ArmLinks", "acceleration": [0.02, -0.03, 0.09], "location": "Europe/Berlin", "orientation": [0.946594, -0.099854, -0.304138, -0.039185]},
{"time": "2016-01-18 18:00:08.216", "id": "ArmLinks", "acceleration": [-0.03, 0.01, -0.18], "location": "Europe/Berlin", "orientation": [0.946228, -0.09906, -0.305298, -0.040222]},
{"time": "2016-01-18 18:00:08.225", "id": "ArmLinks", "acceleration": [-0.06, 0.0, -0.13], "location": "Europe/Berlin", "orientation": [0.945801, -0.098145, -0.306702, -0.041443]},
{"time": "2016-01-18 18:00:08.236", "id": "ArmLinks", "acceleration": [-0.2, 0.12, -0.09], "location": "Europe/Berlin", "orientation": [0.945374, -0.097046, -0.308228, -0.042847]},
{"time": "2016-01-18 18:00:08.249", "id": "ArmLinks", "acceleration": [-0.16, 0.09, -0.17], "location": "Europe/Berlin", "orientation": [0.944885, -0.095825, -0.309875, -0.044373]},
{"time": "2016-01-18 18:00:08.256", "id": "ArmLinks", "acceleration": [0.24, 0.01, -0.08], "location": "Europe/Berlin", "orientation": [0.944458, -0.09436, -0.311462, -0.045776]},
{"time": "2016-01-18 18:00:08.265", "id": "ArmLinks", "acceleration": [0.31, -0.02, 0.0], "location": "Europe/Berlin", "orientation": [0.944031, -0.092896, -0.313049, -0.046875]},
{"time": "2016-01-18 18:00:08.275", "id": "ArmLinks", "acceleration": [0.16, -0.01, 0.1], "location": "Europe/Berlin", "orientation": [0.943665, -0.091614, -0.314453, -0.047668]},
{"time": "2016-01-18 18:00:08.286", "id": "ArmLinks", "acceleration": [0.16, -0.02, 0.3], "location": "Europe/Berlin", "orientation": [0.943359, -0.090454, -0.315613, -0.048279]},
{"time": "2016-01-18 18:00:08.299", "id": "ArmLinks", "acceleration": [0.22, 0.0, 0.35], "location": "Europe/Berlin", "orientation": [0.943054, -0.089478, -0.316528, -0.048889]},
{"time": "2016-01-18 18:00:08.306", "id": "ArmLinks", "acceleration": [0.22, -0.02, 0.22], "location": "Europe/Berlin", "orientation": [0.942871, -0.088684, -0.317261, -0.049561]},
{"time": "2016-01-18 18:00:08.315", "id": "ArmLinks", "acceleration": [0.42, 0.04, 0.07], "location": "Europe/Berlin", "orientation": [0.942749, -0.087769, -0.31781, -0.050293]},
{"time": "2016-01-18 18:00:08.326", "id": "ArmLinks", "acceleration": [0.37, 0.09, 0.08], "location": "Europe/Berlin", "orientation": [0.942627, -0.086731, -0.318359, -0.051147]},
{"time": "2016-01-18 18:00:08.336", "id": "ArmLinks", "acceleration": [0.31, 0.03, 0.1], "location": "Europe/Berlin", "orientation": [0.942383, -0.085632, -0.319214, -0.052246]},
{"time": "2016-01-18 18:00:08.349", "id": "ArmLinks", "acceleration": [0.01, 0.12, 0.01], "location": "Europe/Berlin", "orientation": [0.942017, -0.084473, -0.320374, -0.053528]},
{"time": "2016-01-18 18:00:08.356", "id": "ArmLinks", "acceleration": [-0.18, 0.14, -0.2], "location": "Europe/Berlin", "orientation": [0.941528, -0.083191, -0.321838, -0.055054]},
{"time": "2016-01-18 18:00:08.366", "id": "ArmLinks", "acceleration": [-0.13, 0.19, -0.29], "location": "Europe/Berlin", "orientation": [0.940979, -0.081787, -0.323547, -0.056702]},
{"time": "2016-01-18 18:00:08.374", "id": "ArmLinks", "acceleration": [-0.01, 0.18, -0.38], "location": "Europe/Berlin", "orientation": [0.94043, -0.080261, -0.325134, -0.058411]},
{"time": "2016-01-18 18:00:08.385", "id": "ArmLinks", "acceleration": [0.04, 0.07, -0.05], "location": "Europe/Berlin", "orientation": [0.939941, -0.078552, -0.326721, -0.059937]},
{"time": "2016-01-18 18:00:08.399", "id": "ArmLinks", "acceleration": [-0.02, 0.01, -0.04], "location": "Europe/Berlin", "orientation": [0.939514, -0.076782, -0.328125, -0.06134]},
{"time": "2016-01-18 18:00:08.407", "id": "ArmLinks", "acceleration": [-0.15, 0.0, -0.04], "location": "Europe/Berlin", "orientation": [0.939026, -0.074951, -0.329651, -0.062561]},
{"time": "2016-01-18 18:00:08.416", "id": "ArmLinks", "acceleration": [0.02, -0.04, -0.36], "location": "Europe/Berlin", "orientation": [0.938538, -0.073059, -0.331177, -0.063721]},
{"time": "2016-01-18 18:00:08.426", "id": "ArmLinks", "acceleration": [0.2, -0.04, -0.31], "location": "Europe/Berlin", "orientation": [0.938049, -0.071106, -0.332825, -0.065002]},
{"time": "2016-01-18 18:00:08.435", "id": "ArmLinks", "acceleration": [0.13, -0.15, 0.13], "location": "Europe/Berlin", "orientation": [0.937561, -0.068909, -0.334412, -0.066345]}
      ]
    };
  },

  componentDidMount: function() {
    var i = 0;
    var max = this.state.data.length - 1;
    var that = this;
    setInterval(function() {
      if (i === max) i =0;
      var date = that.state.data[i].time;
      //console.log('date', date);
      that.setState({
        cQ: that.state.data[i].orientation,
        cA: {acceleration: that.state.data[i].acceleration, time: date}
      });
      i++;
    }, 13);
  },

  handleSwitch: function() {
    var isLive = !this.state.isLive;
    console.log('is it live:', isLive);
    this.setState({isLive: isLive});
  },

  renderFields: function(){
    var that = this;
    return this.state.fields.map(function(field){
      var value;
      var caption;
      var id;
      if(Array.isArray(field)){
        id = field[0];
        value = that.props.sensor[field[0]] || 'missing';
        caption = field[1];
      }else{
        value = that.props.sensor[field] || 'missing';
        caption = field;
        id = field;
      }
      var text = value;
      if(id === 'creationDate'){
        var parts = /^([0-9]{4}-[0-9]{2}-[0-9]{2})T([0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]+)Z$/.exec(text);
        text = parts[1] + ' ' + parts[2];
      }else if(id === 'sensorTypes'){
        text = that.props.sensor[field[0]].join(', ');
      }
      return(
        <tr key={caption}>
          <td>{caption}</td>
          <td>{id === 'owner' ? <a href={"/user/" + text}>{text}</a> : text}</td>
        </tr>
      );
    });
  },

  renderClusters:function(){
    var that = this;
    return this.props.sensor.attachedClusters.map(function(cluster){
      return(
        <div className='row' key={cluster}>
          <a href={'/cluster/' + cluster}>
          <div className='large-12 columns selectable-row'>{cluster}</div>
</a>
      </div>
      );
    });
  },

  //renderGraph: function(){
    //return (
      //<div className='row'>
        //<div className='large-12 columns' style={{border: '1px solid black',height:300}}>super meger krasse d3 Grafik</div>
      //</div>);
  //},

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} activePage='sensors' />
        <div style={{marginTop: 25}}>
          <div className='row column' style={{float: 'none'}}>
            <div className='callout'>
                <h3>{this.props.sensor.name}</h3>
                <table style={{width: '100%'}}>
                  <tbody style={{borderWidth: 0}}>
                    {this.renderFields()}
                  </tbody>
                </table>
            </div>
          </div>
          <div className='row column' style={{float: 'none'}}>
            <div className='callout'>
              <h5>attached cluster</h5>
              {this.renderClusters()}
            </div>
          </div>
          <div className='row column' style={{float:'none'}}>
            <div className='callout'>
              <div style={{textAlign: 'center'}}>
                <p style={{marginBottom: 0}}>Show live data</p>
                <div className="switch large">
                  <input className="switch-input"
                    id="yes-no"
                    type="checkbox"
                    onClick={this.handleSwitch}
                    name="exampleSwitch"/>
                  <label className="switch-paddle" htmlFor="yes-no">
                    <span className="show-for-sr"></span>
                    <span className="switch-active" aria-hidden="true">Yes</span>
                    <span className="switch-inactive" aria-hidden="true">No</span>
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='large-6 columns'>
                  <Arrow3D quad={this.state.cQ}/>
                </div>
                <div className='large-6 columns'>
                  <Graph value={this.state.cA} all={this.state.data}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SingleSensor;
