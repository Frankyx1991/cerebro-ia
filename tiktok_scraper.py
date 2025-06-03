import requests
from bs4 import BeautifulSoup

def obtener_tendencias_tiktok():
    url = "https://trends24.in/spain/"
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        tendencias = soup.select("ol.trend-card__list li a")
        return [t.text.strip() for t in tendencias[:5]]
    except Exception as e:
        return [f"Error al consultar TikTok: {str(e)}"]