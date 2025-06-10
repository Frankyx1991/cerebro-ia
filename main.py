from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "Cerebro IA activo"

@app.route("/webhook", methods=["POST"])
def webhook():
    secret = os.environ.get("GITHUB_SECRET")
    if not secret:
        return "Falta GITHUB_SECRET", 403
    return jsonify({"status": "Webhook recibido correctamente"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
