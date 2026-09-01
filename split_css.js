const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const stylePath = path.join(cssDir, 'style.css');

const content = fs.readFileSync(stylePath, 'utf8');

// The file has a structure we can parse. But instead of parsing line by line, let's just use regular expressions or string splits.
// We can find the sections.
const sections = content.split('/* --------------------------------------------------------------------------');

let baseContent = sections[0]; // MUEBLERÍA JOTA - ESTILOS PRINCIPALES
let layoutContent = '';
let componentsContent = '';
let pagesContent = '';

for (let i = 1; i < sections.length; i++) {
    const sectionText = '/* --------------------------------------------------------------------------' + sections[i];
    if (sectionText.includes('1. VARIABLES CSS') || sectionText.includes('2. RESET & ESTILOS BASE')) {
        baseContent += sectionText;
    } else if (sectionText.includes('4. HEADER & NAVEGACIÓN') || sectionText.includes('9. FOOTER') || sectionText.includes('10. MENÚ MÓVIL')) {
        layoutContent += sectionText;
    } else if (sectionText.includes('3. BOTONES Y COMPONENTES REUTILIZABLES') || sectionText.includes('11. COMPLEMENTOS REUTILIZABLES')) {
        componentsContent += sectionText;
    } else {
        pagesContent += sectionText;
    }
}

fs.writeFileSync(path.join(cssDir, 'base.css'), baseContent);
fs.writeFileSync(path.join(cssDir, 'layout.css'), layoutContent);
fs.writeFileSync(path.join(cssDir, 'components.css'), componentsContent);
fs.writeFileSync(path.join(cssDir, 'pages.css'), pagesContent);

const newStyleContent = `@import url("base.css");
@import url("layout.css");
@import url("components.css");
@import url("pages.css");
`;

fs.writeFileSync(stylePath, newStyleContent);

console.log("CSS modularizado correctamente.");
