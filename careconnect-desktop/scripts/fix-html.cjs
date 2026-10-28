const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'dist', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

const before = (html.match(/crossorigin/g) || []).length;
html = html.replace(/ crossorigin/g, '');

fs.writeFileSync(htmlPath, html);
console.log(`Stripped ${before} crossorigin attribute(s) from dist/index.html`);