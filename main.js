const fs = require('fs');
const { execSync } = require('child_process');

function corregirCerebroIA() {
  const logPath = './logs.txt';
  if (!fs.existsSync(logPath)) return;

  const logs = fs.readFileSync(logPath, 'utf8');
  if (logs.includes("Cannot find module 'dotenv'")) {
    try {
      console.log('🧠 Xenthia detectó error en Cerebro: dotenv no instalado.');
      execSync('npm install dotenv');
      console.log('✅ Corrección aplicada por Xenthia.');
    } catch (err) {
      console.error('❌ Error al corregir Cerebro-IA:', err.message);
    }
  }
}

async function iniciarXenthia() {
  corregirCerebroIA();
  console.log("🧠 Xenthia iniciada correctamente.");
}

iniciarXenthia();