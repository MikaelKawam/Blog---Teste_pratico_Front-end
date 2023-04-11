import { useState } from 'react';
import fabric from 'fabric';

const SimpleShapes = ({ canvas, polygon, history }) => {
  const [gradients] = useState(edGradients);
  const [textures] = useState(new Array(28));
  const [available] = useState([]);
  const [selected, setSelected] = useState(false);

  const baseOptions = {
    main: {
      enabled: true,
      opacity: { type: 'slider', current: 1, min: 0.1, max: 1, step: 0.1 },
      fill: { type: 'colorpicker', current: '#263238', hidden: true }
    },
    border: {
      enabled: false,
      onToggle: 'toggleBorder',
      stroke: { type: 'colorpicker', current: '#2196F3', displayName: 'Color' },
      strokeWidth: { type: 'slider', current: 5, max: 40, displayName: 'Width' }
    },
    shadow: {
      enabled: false,
      onToggle: 'toggleShadow',
      color: { type: 'colorpicker', current: 'rgba(0,0,0,0.5)'},
      blur: { type: 'slider', current: 5, max: 80 },
      offsetX: { type: 'slider', current: 8, max: 30 },
      offsetY: { type: 'slider', current: 5, max: 30 }
    }
  };

  const addToCanvas = (shape) => {
    if (!shapeExists(shape)) return;
    setSelected(shape);

    //we might need to enable a drawing mode instead
    //of added a shape to canvas if we get passed polygon
    if (shape.service && shape.service.enable) {
      return shape.service.enable();
    }

    const fabricShape = createNewShape(shape);

    canvas.fabric.add(fabricShape);
    canvas.center(fabricShape);
    canvas.fabric.setActiveObject(fabricShape);
    canvas.fabric.renderAll();

    history.add(`Added: ${shape.name}`, 'panorama-vertical');
  };

  const createNewShape = (shape) => {
    switch (shape.type) {
      case 'rect':
        return new fabric.Rect({
          width: 200,
          height: 200,
          fill: '#263238',
          stroke: '#2196F3',
          strokeWidth: 5,
          shadow: 'rgba(0,0,0,0.5) 8px 5px 5px',
          selectable: true,
          name: shape.name
        });
      case 'circle':
        return new fabric.Circle({
          radius: 100,
          fill: '#263238',
          stroke: '#2196F3',
          strokeWidth: 5,
          shadow: 'rgba(0,0,0,0.5) 8px 5px 5px',
          selectable: true,
          name: shape.name
        });
      case 'triangle':
        return new fabric.Triangle({
          width: 200,
          height: 200,
          fill: '#263238',
          stroke: '#2196F3',
          strokeWidth: 5,
          shadow: 'rgba(0,0,0,0.5) 8px 5px 5px',
          selectable: true,
          name: shape.name
        });
      case 'polygon':
        return new fabric.Polygon(shape.points, {
          fill: '#263238',
          stroke: '#2196F3',
          strokeWidth: 5,
          shadow: 'rgba(0,0,0,0)
                  });
...function(shape) {
var fabricShape;
        switch(shape.type) {
            case 'rectangle':
                fabricShape = new fabric.Rect({
                    width: shape.options.width.current,
                    height: shape.options.height.current,
                    fill: shape.options.main.fill.current,
                    opacity: shape.options.main.opacity.current,
                    stroke: shape.options.border.enabled ? shape.options.border.stroke.current : false,
                    strokeWidth: shape.options.border.enabled ? shape.options.border.strokeWidth.current : 0,
                    hasBorders: true,
                    hasControls: true,
                    name: shape.name
                });
                break;
            case 'ellipse':
                fabricShape = new fabric.Ellipse({
                    rx: shape.options.rx.current,
                    ry: shape.options.ry.current,
                    fill: shape.options.main.fill.current,
                    opacity: shape.options.main.opacity.current,
                    stroke: shape.options.border.enabled ? shape.options.border.stroke.current : false,
                    strokeWidth: shape.options.border.enabled ? shape.options.border.strokeWidth.current : 0,
                    hasBorders: true,
                    hasControls: true,
                    name: shape.name
                });
                break;
            case 'triangle':
                fabricShape = new fabric.Triangle({
                    width: shape.options.width.current,
                    height: shape.options.height.current,
                    fill: shape.options.main.fill.current,
                    opacity: shape.options.main.opacity.current,
                    stroke: shape.options.border.enabled ? shape.options.border.stroke.current : false,
                    strokeWidth: shape.options.border.enabled ? shape.options.border.strokeWidth.current : 0,
                    hasBorders: true,
                    hasControls: true,
                    name: shape.name
                });
                break;
            case 'polygon':
                fabricShape = polygon.create(shape);
                break;
            case 'line':
                fabricShape = new fabric.Line([50, 100, 200, 200], {
                    stroke: shape.options.border.enabled ? shape.options.border.stroke.current : false,
                    strokeWidth: shape.options.border.enabled ? shape.options.border.strokeWidth.current : 0,
                    hasBorders: true,
                    hasControls: true,
                    name: shape.name
                });
                break;
            case 'text':
                fabricShape = new fabric.Text(shape.options.text.current, {
                    fontFamily: shape.options.fontFamily.current,
                    fontSize: shape.options.fontSize.current,
                    fontWeight: shape.options.fontWeight.current,
                    fontStyle: shape.options.fontStyle.current,
                    fill: shape.options.fill.current,
                    opacity: shape.options.opacity.current,
                    stroke: shape.options.stroke.current,
                    strokeWidth: shape.options.strokeWidth.current,
                    textAlign: shape.options.textAlign.current,
                    hasBorders: true,
                    hasControls: true,
                    name: shape.name
                });
                break;
            case 'image':
                fabricShape = new fabric.Image(document.getElementById('image-preview'), {
                    hasBorders: true,
                    hasControls: true,
                    name: shape.name
                });
                break;
        }

        return fabricShape;
    }
};

return shapes;
}]);