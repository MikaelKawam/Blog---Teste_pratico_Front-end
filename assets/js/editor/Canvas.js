// Set fabric options
fabricCanvas.selection = false;
fabricCanvas.renderOnAddRemove = false;
fabric.Object.prototype.borderColor = "#2196F3";
fabric.Object.prototype.cornerColor = "#2196F3";
fabric.Object.prototype.transparentCorners = false;

// Handle window resize
const handleResize = () => {
  const { innerWidth, innerHeight } = window;
  if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
    fitToScreen();
  }
};
window.addEventListener("resize", handleResize);

// Load image if available
if (props.imageUrl) {
  loadMainImage(props.imageUrl);
} else if (props.blankCanvasSize) {
  const { width, height } = props.blankCanvasSize;
  openNew(width, height, "newCanvas");
} else {
  props.onOpenDialog();
}

// Cleanup on unmount
return () => {
  window.removeEventListener("resize", handleResize);
  fabricCanvas.dispose();
};
}, []);

const fitToScreen = () => {
// Implement fitToScreen function
};

const loadMainImage = (url) => {
// Implement loadMainImage function
};

const openNew = (width, height, name) => {
// Implement openNew function
};

return (
<canvas id="canvas" ref={canvasRef}></canvas>
);
}

export default Canvas;