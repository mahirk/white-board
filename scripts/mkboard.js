(function() {
  var board = document.getElementById('drawboard');
  $('#menu').css("height",$(window).height());
  board.width = $(window).width() - (0.09*  $(window).width()); //document.width is obsolete
  board.height = $(window).height() - 25; //document.height is obsolete
  var context = board.getContext("2d");
  $(window).resize(function(){
    board.width = $(window).width() - (0.09*  $(window).width()); //document.width is obsolete
    board.height = $(window).height() - 25; //document.height is obsolete
    $('#menu').css("height", $(window).height());
  });

  //Global Variables

  var drawStatus = false;
  var clickX = [];
  var clickY = [];
  var clickDrag = [];
  var color = "#000";
  var colorCurr = [];
  var drawSize = [];
  var size = "3";
  //initialization

  $('#color').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
      $(colpkr).fadeIn(500);
      return false;
    },
    onHide: function (colpkr) {
      $(colpkr).fadeOut(500);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      $('#color').css('color', '#' + hex);
      color = '#' + hex;
    }
  });




  //Mouse Based Functions

  $('#drawboard').mousedown(function(e){
    var xdir = e.pageX - this.offsetLeft;
    var ydir = e.pageY - this.offsetTop;

    drawStatus = true;
    addClick(xdir, ydir, false, color, size);
    create();
    console.log(xdir + ", " + ydir);
    create();
  });

  $('#drawboard').mousemove(function(e){
    if(drawStatus){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true, color, size);
      create();
    }
  });

  $('#drawboard').mouseup(function(e){
    drawStatus = false;
  });

  $('#drawboard').mouseleave(function(e){
    drawStatus = false;
  });

  // Drawing functions

  function addClick(x, y, dragging, color, size)  {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    colorCurr.push(color);
    drawSize.push(size);
  }

  function create(){
    context.lineJoin = "round";
    for(var i=0; i < clickX.length; i++) {
      context.beginPath();
      if(clickDrag[i]){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.lineWidth = drawSize[i];
       context.strokeStyle = colorCurr[i];
       context.stroke();
    }
  }

  $("#sizebox").change(function() {
    size = document.getElementById("sizebox").value;
  });

  $('#eraser').bind('click', function() {
    color = "#fff";
  });

  $('#draw').bind('click', function() {
    color = "#000";
  });

  $('#post').bind('click', function() {
    context.fillStyle= color;
    context.fillRect(100,20,150,100);
    context.stroke();
  });

  $('#clear').bind('click', function() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    clickX = [];
    clickY = [];
    clickDrag = [];
    colorCurr = [];
    drawSize = [];
  });



})();
