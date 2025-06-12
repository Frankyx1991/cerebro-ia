const fs = require('fs');
const { execSync } = require('child_process');

function corregirErroresCerebro() {
  const logPath = './logs.txt';
  if (!fs.existsSync(logPath)) return;

  const logs = fs.readFileSync(logPath, 'utf8');
  if (logs.includes("Cannot find module 'dotenv'")) {
    try {
      console.log('🧠 Error detectado: dotenv no instalado. Instalando...');
      execSync('npm install dotenv');
      console.log('✅ dotenv instalado correctamente.');
    } catch (err) {
      console.error('❌ Fallo al instalar dotenv:', err.message);
    }
  }
}

corregirErroresCerebro();