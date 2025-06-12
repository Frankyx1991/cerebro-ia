# Cerebro IA + Xenthia (Automejora)

Este sistema permite que Xenthia supervise y corrija automáticamente errores en Cerebro IA, como la falta del módulo `dotenv`. Si se detecta el error en los logs, se repara automáticamente e informa por consola.

## Estructura

- `main.js`: núcleo de Xenthia con función de autocorrección.
- `cerebro_automejora.js`: script adicional que puede ejecutarse manualmente.
- `.env`: configuración sensible (no subir a GitHub).
- `.env.example`: ejemplo para compartir en GitHub.
- `logs.txt`: archivo de ejemplo para pruebas.
- `package.json`: incluye scripts `start` y `automejora`.

## Licencia

MIT.