# Cerebro IA

Este proyecto contiene un bot de Telegram y un servidor Express que utiliza la API de OpenAI para generar respuestas.

## Requisitos
- Node.js 18 o superior
- Una cuenta de OpenAI con una API key válida
- Un bot de Telegram creado y su token correspondiente

## Configuración
1. Copia el archivo `.env.example` a `.env` y completa los valores necesarios:
   ```
   PORT=3000
   BOT_TOKEN=tu_token_de_bot
   OPENAI_API_KEY=tu_clave_de_openai
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso
- **Servidor web**: ejecuta `npm start` para iniciar el servidor. Visita `http://localhost:3000` para ver la tienda estática. Usa `/api/generar?prompt=hola` para obtener una respuesta generada.
- **Bot de Telegram**: ejecuta `node bot.js` para iniciar el bot y comienza a chatear con él en Telegram.

Los registros se almacenan en `logs.txt`.
