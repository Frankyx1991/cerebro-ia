from pytrends.request import TrendReq

def obtener_tendencias_espana():
    pytrends = TrendReq(hl='es-ES', tz=360)
    pytrends.build_payload(kw_list=['comprar', 'mejor', 'barato', 'nuevo'], geo='ES')
    trending_searches = pytrends.trending_searches(pn='spain')
    top_queries = trending_searches.head(10).squeeze().tolist()

    recomendaciones = []
    for producto in top_queries:
        if isinstance(producto, str) and len(producto.split()) > 1:
            recomendaciones.append(producto)

    return recomendaciones