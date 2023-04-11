import React, { useState, useEffect } from 'react';
import fabric from 'fabric';

const StickersController = ({ canvas, settings }) => {
const [shapes, setShapes] = useState([]);
const [opacity, setOpacity] = useState(0.9);
const [categories, setCategories] = useState([]);
const [activeCategory, setActiveCategory] = useState('doodles');
const [loading, setLoading] = useState(false);

useEffect(() => {
const getCategories = () => {
const stickers = settings.get('stickers');
stickers.forEach((sticker) => {
sticker.items = new Array(sticker.items);
});
setCategories(stickers);
};
settings.ready(getCategories);
}, [settings]);

const activeStickerIsSvg = () => {
const obj = canvas.fabric.getActiveObject();
return obj && obj.svgUid !== undefined;
};

const isPanelEnabled = () => {
const obj = canvas.fabric.getActiveObject();
return obj && obj.name === 'sticker' && activeTab === 'stickers';
};

const handleSetActiveCategory = (name) => {
setActiveCategory((prevActiveCategory) =>
prevActiveCategory === name ? false : name
);
};

const handleSetOpacity = (opacity) => {
const obj = shapes.getShape('sticker');
obj.setOpacity(opacity);
canvas.fabric.renderAll();
setOpacity(opacity);
};

const handleSetColor = (color) => {
const obj = shapes.getShape('sticker');
if (obj.isSameColor && obj.isSameColor() || !obj.paths) {
obj.setFill(color);
} else if (obj.paths) {
obj.paths.forEach((path) => {
path.setFill(color);
});
}
canvas.fabric.renderAll();
};

const handleAddToCanvas = (category, index, e) => {
if (loading) return;
setLoading(true);
openPanel('stickers', e);
if (category.type === 'svg') {
fabric.loadSVGFromURL(
assets/images/stickers/${category.name}/${index}.${category.type},
(objects, options) => {
const image = fabric.util.groupSVGElements(objects, options);
image.name = 'sticker';
canvas.fabric.add(image);
image.scaleToHeight((40 / 100) * canvas.fabric.getHeight());
image.center();
image.setCoords();
canvas.fabric.setActiveObject(image);
canvas.fabric.renderAll();
setLoading(false);
history.add('Added: Sticker', 'favorite');
}
);
} else {
fabric.util.loadImage(
assets/images/stickers/${category.name}/${index}.${category.type},
(img) => {
const image = new fabric.Image(img);
image.name = 'sticker';
canvas.fabric.add(image);
image.center();
image.setCoords();
image.scaleToHeight((40 / 100) * canvas.original.height);
canvas.fabric.setActiveObject(image);
canvas.fabric.renderAll();
setLoading(false);
history.add('Added: Sticker', 'favorite');
}
);
}
};

return (
<>
{/* Your JSX here */}
</>
);
};

export default StickersController;