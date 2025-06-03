import os
import requests
from flask import Flask, request

app = Flask(__name__)

BOT_TOKEN = os.environ['BOT_TOKEN']
AUTHORIZED_CHAT_ID = os.environ['CHAT_ID']

def enviar_mensaje(mensaje):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = {"chat_id": AUTHORIZED_CHAT_ID, "text": mensaje}
    requests.post(url, data=data)

@app.route(f"/{BOT_TOKEN}", methods=["POST"])
def webhook():
    data = request.get_json()
    chat_id = data['message']['chat']['id']
    text = data['message']['text'].lower()

    if str(chat_id) != AUTHORIZED_CHAT_ID:
        return "Unauthorized", 403

    if "crear tienda" in text:
        enviar_mensaje("🔍 Iniciando estudio de mercado y creación de tienda...")
        # Aquí se llamarán los módulos siguientes
    elif "ayuda" in text:
        enviar_mensaje("Comandos disponibles:\n- crear tienda\n- analizar mercado\n- generar publicidad")
    else:
        enviar_mensaje("🤖 No entendí el comando. Escribe 'ayuda' para ver opciones.")
    
    return "ok", 200

@app.route("/")
def index():
    return "Cerebro IA en funcionamiento", 200