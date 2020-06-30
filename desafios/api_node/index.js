//criar uma api em express
//data base files
const { writeFile, readFile, existFile } = require('fs').promises;
const express = require('express');

global.fileName = 'db_pessoas.json';

const app = express();

app.use(express.json());

app.use(express.json());

// app.get('/teste', (req, res) => {
//   // const result = await database.simpleExecute(
//   //   'select user, systimestamp from dual'
//   // );
//   // const user = result.rows[0].USER;
//   // const date = result.rows[0].SYSTIMESTAMP;

//   // // res.end(`DB user: ${user}\nDate: ${date}`);
//   res.end(`Terminal Tracker API\nDate`);
// });

//app.use('/api', router);

app.listen(3000, async () => {
  try {
    const initialJson = {
      nextId: 1,
      pessoas: [],
    };

    if (existFile('db_pessoas.json')) {
      await writeFile(global.fileName, JSON.stringify(initialJson), {
        flag: 'wx',
      });
    }
  } catch (error) {
    console.error(error);
  }
  console.log('API Started');
});

// global.fileName = 'db_pessoas.json';

// const app = express();

// app.use('/', (req, res) => {
//   res.end('API Hello World');
// });

// const routers = express.Router();

// app.listen(3000, async () => {
//   try {
//     const db_initial = {
//       nextId: 0,
//       pessoas: [],
//     };

//     await writeFile(global.fileName, JSON.stringify(db_initial), {
//       flag: 'wx',
//     });
//     // await writeFile(global.fileName, JSON.stringify(initialJson), {
//     //   flag: 'wx',
//     // });
//   } catch (error) {
//     console.log(error);
//   }
//   console.log('API STARTED');
// });

// async function lerFile() {
//   const arquivo = await readFile('db_pessoas.json');
//   return arquivo;
// }

// async function createFile() {
//   const db_initial = {
//     nextId: 0,
//     pessoas: [],
//   };

//   const arquivo = await writeFile(
//     'db_pessoas.json',
//     JSON.stringify(db_initial)
//   );

//   console.log(arquivo);
// }
