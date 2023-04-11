import { useEffect } from "react";
import { fabric } from "fabric";

function History(canvas) {
  const all = [];
  const ignored = [];

  function add(name, icon, ignore) {
    const prop = ignore ? "ignored" : "all";

    //make sure don't have duplicates in ignored array
    if (prop === "ignored") {
      for (let i = 0; i < ignored.length; i++) {
        if (ignored[i].name === name) {
          ignored.splice(i, 1);
        }
      }
    }

    all.unshift({
      name,
      state: canvas.fabric.toJSON(["selectable", "name"]),
      index: all.length + 1,
      icon,
      zoom: canvas.zoom,
      canvasWidth: canvas.original.width || canvas.fabric.getWidth(),
      canvasHeight: canvas.original.height || canvas.fabric.getHeight(),
    });
  }

  function get(name, prop) {
    if (!prop) prop = "ignored";

    for (let i = 0; i < this[prop].length; i++) {
      if (this[prop][i].name === name) {
        return this[prop][i];
      }
    }
  }

  function getCurrentCanvasState() {
    return {
      state: canvas.fabric.toJSON(["selectable", "name"]),
      index: all.length + 1,
      zoom: canvas.zoom,
      canvasWidth: canvas.original.width || canvas.fabric.getWidth(),
      canvasHeight: canvas.original.height || canvas.fabric.getHeight(),
    };
  }

  function load(item) {
    useEffect(() => {
      if (typeof item === "string") {
        item = get(item);
      }

      if (!item) {
        return;
      }

      canvas.isLoading(true);

      setTimeout(() => {
        canvas.fabric.loadFromJSON(item.state, () => {
          canvas.fabric.forEachObject((obj) => {
            //reapply any filters object used to have
            if (obj.applyFilters && obj.filters.length) {
              obj.applyFilters(canvas.fabric.renderAll.bind(canvas.fabric));
            }

            //assign new reference to mainImage property
            if (obj.name === "mainImage") {
              canvas.mainImage = obj;
            }
          });

          canvas.zoom(1);

          if (item.canvasWidth && item.canvasHeight) {
            canvas.fabric.setWidth(item.canvasWidth);
            canvas.fabric.setHeight(item.canvasHeight);
            canvas.original.width = item.canvasWidth;
            canvas.original.height = item.canvasHeight;
          }

          canvas.fabric.renderAll();
          canvas.fabric.calcOffset();
          canvas.isLoading(false);
          canvas.fitToScreen();
        });
      }, 30);
    }, [item]);

    useEffect(() => {
      canvas.fabric.off("object:added");
      canvas.fabric.on("object:added", () => {
        const current = getCurrentCanvasState();
        add("State " + current.index, "", true);
      });
    }, []);
  }

  return { all, ignored, add, get, load };
}

export default History;
