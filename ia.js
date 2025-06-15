const axios = require('axios');

async function realizarEstudioMercado() {
  try {
    const respuesta = await axios.post(
      'https://xenthia-698362270360.europe-southwest1.run.app/estudio_mercado',
      {}
    );
    return respuesta.data?.respuesta || 'No se recibió respuesta de Xenthia';
  } catch (error) {
    console.error("Error al contactar con Xenthia:", error.message);
    return 'Error al obtener estudio de mercado de Xenthia';
  }
}

module.exports = { realizarEstudioMercado };