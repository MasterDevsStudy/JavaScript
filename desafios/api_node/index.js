const { writeFile } = require('fs').promises;
const express = require('express');
const routers = require('./routers/pessoas');
const cors = require('cors');

global.fileName = 'db_pessoas.json';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', routers);

app.get('/', (_, res) => {
  res.end('Aplicação iniciada');
});

app.listen(3000, async () => {
  try {
    const initialJson = {
      nextId: 1,
      pessoas: [],
    };
    await writeFile(global.fileName, JSON.stringify(initialJson), {
      flag: 'wx',
    });
  } catch (error) {
    console.log('arquivo já existente');
  }
  console.log('API Started');
});
