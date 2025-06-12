async function generarHTML() {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Tienda Automática</title>
</head>
<body>
  <h1>Bienvenido a tu tienda generada automáticamente</h1>
</body>
</html>`;
  return html;
}
module.exports = { generarHTML };
