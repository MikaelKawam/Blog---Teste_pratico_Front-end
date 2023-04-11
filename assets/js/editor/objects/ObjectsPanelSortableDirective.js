import { useEffect, useRef } from "react";
import { fabric } from "fabric";

function ObjectsPanelSortable({ objects, setObjects }) {
  const sortableRef = useRef(null);

  useEffect(() => {
    const sortableEl = sortableRef.current;

    const start = (e, ui) => {
      ui.item.data("start", ui.item.index());
    };

    const update = (e, ui) => {
      const start = ui.item.data("start");
      const end = ui.item.index();

      const objs = [...objects];
      objs.splice(end, 0, objs.splice(start, 1)[0]);
      setObjects(objs);

      const obj = canvas.getObjects()[start];

      if (!obj) return;

      if (end > start) {
        for (let i = 0; i < end - start; i++) {
          canvas.bringForward(obj);
        }
      } else {
        for (let i = 0; i < start - end; i++) {
          canvas.sendBackwards(obj);
        }
      }

      canvas.renderAll();
    };

    const sortable = new Sortable(sortableEl, {
      items: ".object:visible",
      scroll: false,
      containment: "parent",
      start,
      update,
    });

    const canvas = new fabric.Canvas("canvas");

    return () => {
      sortable.destroy();
      canvas.dispose();
    };
  }, [objects, setObjects]);

  return <div ref={sortableRef}>{/* Render objects here */}</div>;
}

export default ObjectsPanelSortable;
