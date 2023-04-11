import { useEffect } from 'react';

function Polygon(props) {
  const { canvas } = props;

  useEffect(() => {
    function onMouseMove(event) {
      const pos = canvas.fabric.getPointer(event.e);
      if (self.mode === 'edit' && self.currentShape) {
        const points = self.currentShape.get('points');
        points[points.length - 1].x = pos.x - self.currentShape.get('left');
        points[points.length - 1].y = pos.y - self.currentShape.get('top');
        self.currentShape.set({
          points: points
        });
        canvas.fabric.renderAll();
      }
    }

    function onMouseDown(event) {
      const pos = canvas.fabric.getPointer(event.e);

      if (self.mode === 'add') {
        const poly = new fabric.Polygon(
          [
            {
              x: pos.x,
              y: pos.y
            },
            {
              x: pos.x + 0.5,
              y: pos.y + 0.5
            }
          ],
          {
            fill: 'black',
            opacity: 1,
            selectable: false
          }
        );
        self.currentShape = poly;
        self.currentShape.name = 'polygon';
        canvas.fabric.add(self.currentShape);
        self.mode = 'edit';
      } else if (
        self.mode === 'edit' &&
        self.currentShape &&
        self.currentShape.type === 'polygon'
      ) {
        const points = self.currentShape.get('points');
        points.push({
          x: pos.x - self.currentShape.get('left'),
          y: pos.y - self.currentShape.get('top')
        });
        self.currentShape.set({
          points: points
        });
        canvas.fabric.renderAll();
      }
    }

    function onEscape(e) {
      if ((!e && self.currentShape) || (e && e.keyCode === 27)) {
        if (self.mode === 'edit' || self.mode === 'add') {
          self.mode = 'normal';
          self.currentShape.set({
            selectable: true
          });

          self.currentShape._calcDimensions();
          self.currentShape.setCoords();

          canvas.fabric.setActiveObject(self.currentShape);
          canvas.fabric.renderAll();
        } else {
          self.mode = 'add';
        }

        self.currentShape = null;
      }
    }

    function onClick(e) {
      const clickedInModal = $(e.target).closest('.md-dialog-container')[0];

      if (
        e.target.nodeName !== 'CANVAS' &&
        $(e.target).closest('.shape').data('name') !== 'polygon' &&
        !clickedInModal
      ) {
        self.disable();
      }
    }

    const self = {
      mode: 'add',
      currentShape: false,
      enabled: false,

      enable: function() {
        if (this.enabled) return;

        this.enabled = true;
        canvas.fabric.on('mouse:move', onMouseMove);
        canvas.fabric.on('mouse:down', onMouseDown);
        fabric.util.addListener(window, 'keyup', onEscape);

        setTimeout(function() {
          fabric.util.addListener(window, 'click', onClick);
        }, 20);
      },

      disable: function() {
        this.enabled = false;
        canvas.fabric.off('mouse:move', onMouseMove);
        canvas.fabric.off('mouse:down', onMouseDown);
        fabric.util.removeListener(window, 'keyup', onEscape);
        fabric.util.removeListener(window, 'click', onClick);
        onEscape();
      }
    };

    self.enable();

return () => {
  self.disable();
};
  

export default Polygon