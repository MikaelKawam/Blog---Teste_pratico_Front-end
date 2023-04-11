import { useState } from 'react';
import { toggleTextDecoration } from 'text'; // certifique-se de importar a função toggleTextDecoration do seu arquivo de utilitários

function EdTextDecorationButtons() {
const [decorations, setDecorations] = useState([]);

const handleDecorationClick = (e) => {
const name = e.target.dataset.decoration;
const newDecorations = toggleTextDecoration(name);
setDecorations(newDecorations);
Aqui está o código equivalente em ReactJS:

import { useState } from 'react';
import { toggleTextDecoration } from 'text'; // certifique-se de importar a função toggleTextDecoration do seu arquivo de utilitários

function EdTextDecorationButtons() {
const [decorations, setDecorations] = useState([]);

const handleDecorationClick = (e) => {
const name = e.target.dataset.decoration;
const newDecorations = toggleTextDecoration(name);

scss
Copy code
setDecorations(newDecorations);
};

return (
<div onClick={handleDecorationClick}>
<button className={decorations.includes('underline') ? 'active' : ''} data-decoration="underline">Underline</button>
<button className={decorations.includes('bold') ? 'active' : ''} data-decoration="bold">Bold</button>
<button className={decorations.includes('italic') ? 'active' : ''} data-decoration="italic">Italic</button>
</div>
);
}