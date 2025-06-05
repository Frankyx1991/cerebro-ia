// Simulación IA básica para estudio de mercado y tienda
const generarEstudioMercado = async () => {
  return {
    producto: "Masajeador facial portátil",
    nicho: "Bienestar y cuidado facial",
    trend: "Alta demanda en Amazon y AliExpress en 2025"
  };
};

const generarTienda = async () => {
  return {
    nombre: "Dormato",
    colores: "Verde menta y blanco",
    estilo: "Minimalista y relajante"
  };
};

module.exports = { generarEstudioMercado, generarTienda };