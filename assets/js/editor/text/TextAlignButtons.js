mport { useState } from 'react';

function EditTextAlignButtons() {
const [textAlign, setTextAlign] = useState('');

function handleAlignment(e) {
const align = e.currentTarget.dataset.align;
setTextAlign(align);
}

return (
<div onClick={handleAlignment}>
<i className={left-align ${textAlign === 'left' ? 'active' : ''}} data-align="left"></i>
<i className={center-align ${textAlign === 'center' ? 'active' : ''}} data-align="center"></i>
<i className={right-align ${textAlign === 'right' ? 'active' : ''}} data-align="right"></i>
</div>
);
}