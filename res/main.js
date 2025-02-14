$(document).ready(function() {


var opt = {
    cell_size: 45,
    variance: 0.75,
    x_colors: 'random',
    y_colors: 'match_x',
    palette: Trianglify.colorbrewer,
    color_space: 'lab',
    color_function: false,
    stroke_width: 1.51,
    width: window.innerWidth,
    height: window.innerHeight,
    seed: null
  };
  var pattern = Trianglify(opt);
  document.body.appendChild(pattern.canvas())
	
});


