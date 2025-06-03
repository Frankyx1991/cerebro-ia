import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": "es-ES,es;q=0.9"
}

def buscar_amazon(producto):
    url = f"https://www.amazon.es/s?k={producto.replace(' ', '+')}"
    response = requests.get(url, headers=HEADERS)

    if response.status_code != 200:
        return ["Error al consultar Amazon"]

    soup = BeautifulSoup(response.text, "html.parser")
    resultados = soup.select("span.a-text-normal")

    productos = []
    for r in resultados:
        texto = r.get_text()
        if len(texto.split()) > 2:
            productos.append(texto)
        if len(productos) == 5:
            break

    return productos or ["No se encontraron resultados"]