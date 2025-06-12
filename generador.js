const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const outputPath = path.join(__dirname, 'tienda.zip');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Archivo creado: ${outputPath} (${archive.pointer()} bytes)`);
});

archive.on('error', err => {
  throw err;
});

archive.pipe(output);
archive.directory(path.join(__dirname, 'tienda'), false);
archive.finalize();
