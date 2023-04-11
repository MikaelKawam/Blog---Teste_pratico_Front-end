import { useState, useEffect } from "react";

function SimpleShapesController({ canvas, simpleShapes }) {
  const [shapes, setShapes] = useState(simpleShapes);
  const available = ['rect', 'triangle', 'circle', 'ellipse', 'polygon'];

  const isPanelEnabled = () => {
    const obj = canvas.fabric.getActiveObject();
    return obj && available.indexOf(obj.name) > -1 && simpleShapes.selected.options;
  };

  useEffect(() => {
    canvas.fabric.on('object:selected', (object) => {
      if (activeTab !== 'simple-shapes') return;
      simpleShapes.selectShape(object.target.name);
    });
  }, [canvas.fabric, simpleShapes.selected.options]);

  return (
    // implemente o restante da interface do usuário aqui
  );
}
