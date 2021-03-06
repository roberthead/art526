function start() {
  var message = "Hello, World";
  var canvasElement = document.getElementById("the-canvas");
  var canvasWidth = 1600;
  var canvasHeight = 900;
  canvasElement.width = canvasWidth;
  canvasElement.height = canvasHeight;
  canvasElement.style.width = "" + (canvasWidth / window.devicePixelRatio) + "px";
  canvasElement.style.height = "" + (canvasHeight / window.devicePixelRatio) + "px";
  var canvasContext = canvasElement.getContext("2d");
  canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);

  var boxX = canvasWidth / 10;
  var boxY = canvasHeight / 10;
  var boxWidth = canvasWidth / 4;
  var boxHeight = canvasHeight / 4;

  var boxColorRed = 0;
  var boxColorGreen = 0;
  var boxColorBlue = 0;
  var boxColorAlpha = 1;
  var boxColorRedVelocity = 0;
  var boxColorGreenVelocity = 0;
  var boxColorBlueVelocity = 0;

  var boxXVelocity = Math.random() * 2 - 1;
  var boxYVelocity = Math.random() * 2 - 1;
  var boxWidthVelocity = Math.random() * 2 - 1;
  var boxHeightVelocity = Math.random() * 2 - 1;

  function draw() {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    boxColor = "rgba(" + boxColorRed + ", " + boxColorGreen + ", " + boxColorBlue + ", " + boxColorAlpha + ")";
    canvasContext.fillStyle = boxColor;
    canvasContext.fillRect(boxX, boxY, boxWidth, boxHeight);

    canvasContext.font = "23px Helvetica";
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(message, boxX + boxWidth / 4, boxY + boxHeight / 2);
  }

  // window.requestAnimationFrame(gameLoop);
	canvasElement.addEventListener("mousedown", mouseClickHandler);

	function mouseClickHandler(event) {
		var offSetX = theCanvas.offsetLeft - theCanvas.scrollLeft;
    		var offsetY = theCanvas.offsetTop - theCanvas.scrollTop;
		mouse.x = event.pageX - offSetX;
		mouse.y = event.pageY - offsetY;
		//you now have the location of the mouse click stored in your mouse variable
		//here you can call some function that makes use of it...
    alert("boo!");
	}

  function gameLoop() {
    boxX += boxXVelocity;
    boxY += boxYVelocity;
    if ((boxX + boxWidth) >= canvasWidth / 2) {
      boxWidthVelocity = Math.abs(boxWidthVelocity) * -1;
      boxXVelocity = Math.abs(boxXVelocity) * -1;
      boxColorRedVelocity += 1
    } else if (boxX <= 0) {
      boxXVelocity = Math.abs(boxXVelocity);
      boxColorRedVelocity -= 1
    }
    if (boxWidth < canvasWidth / 8) {
      boxWidthVelocity = Math.abs(boxWidthVelocity);
      boxColorGreenVelocity += 1
    }
    if ((boxY + boxHeight) >= canvasHeight / 2) {
      boxHeightVelocity = Math.abs(boxHeightVelocity) * -1;
      boxYVelocity = Math.abs(boxYVelocity) * -1;
      boxColorBlueVelocity += 1
    } else if (boxY <= 0) {
      boxYVelocity = Math.abs(boxYVelocity);
      boxColorBlueVelocity -= 1
    }
    if (boxHeight < canvasHeight / 8) {
      boxHeightVelocity = Math.abs(boxHeightVelocity);
      boxColorGreenVelocity -= 1
    }

    boxColorRed = Math.max(Math.min(boxColorRed + boxColorRedVelocity, 255), 0)
    boxColorBlue = Math.max(Math.min(boxColorBlue + boxColorBlueVelocity, 255), 0)
    boxColorGreen = Math.max(Math.min(boxColorGreen + boxColorGreenVelocity, 255), 0)

    if (boxColorRed == 0 || boxColorRed == 255) { boxColorRedVelocity = 0; }
    if (boxColorBlue == 0 || boxColorBlue == 255) { boxColorBlueVelocity = 0; }
    if (boxColorGreen == 0 || boxColorGreen == 255) { boxColorGreenVelocity = 0; }

    boxWidth += boxWidthVelocity;
    boxHeight += boxHeightVelocity;
    draw();

    window.requestAnimationFrame(gameLoop);
  }
};

window.onload = start;
