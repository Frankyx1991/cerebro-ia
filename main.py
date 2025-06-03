import os
import requests
from flask import Flask, request

app = Flask(__name__)

BOT_TOKEN = os.environ['BOT_TOKEN']
AUTHORIZED_CHAT_ID = os.environ['CHAT_ID']
URL_BASE = os.environ['URL_BASE']  # Ej: https://cerebro-ia.onrender.com

def enviar_mensaje(mensaje):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = {"chat_id": AUTHORIZED_CHAT_ID, "text": mensaje}
    requests.post(url, data=data)

def configurar_webhook():
    webhook_url = f"{URL_BASE}/{BOT_TOKEN}"
    r = requests.get(f"https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url={webhook_url}")
    if r.status_code == 200:
        print("✅ Webhook configurado automáticamente")
    else:
        print("❌ Error al configurar webhook:", r.text)

@app.route(f"/{BOT_TOKEN}", methods=["POST"])
def webhook():
    data = request.get_json()
    chat_id = data['message']['chat']['id']
    text = data['message']['text'].lower()

    if str(chat_id) != AUTHORIZED_CHAT_ID:
        return "Unauthorized", 403

    if "crear tienda" in text:
        enviar_mensaje("🔍 Iniciando estudio de mercado y creación de tienda...")
    elif "ayuda" in text:
        enviar_mensaje("Comandos disponibles:\\n- crear tienda\\n- analizar mercado\\n- generar publicidad")
    else:
        enviar_mensaje("🤖 No entendí el comando. Escribe 'ayuda' para ver opciones.")
    
    return "ok", 200

@app.route("/")
def index():
    return "Cerebro IA en funcionamiento", 200

if __name__ == "__main__":
    configurar_webhook()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
