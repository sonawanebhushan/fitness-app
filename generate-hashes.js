const bcrypt = require('bcryptjs');

async function generateHashes() {
  const amarPassword = 'amar123!@#';
  const premPassword = 'prem456$%^';

  const amarHash = await bcrypt.hash(amarPassword, 10);
  const premHash = await bcrypt.hash(premPassword, 10);

  console.log('Amar hash:', amarHash);
  console.log('Prem hash:', premHash);
}

generateHashes();
