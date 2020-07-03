const { readFile, writeFile } = require('fs').promises;

async function get(req, res) {
  try {
    const dbFile = await readFile(global.fileName);
    const registers = JSON.parse(dbFile).pessoas;

    if (req.params.id) {
      const element = registers.find((pessoa) => pessoa.id == req.params.id);
      res.send(element);
    } else {
      res.send(registers);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function post(req, res, next) {
  try {
    const dbFile = await readFile(global.fileName);
    const jsonFile = JSON.parse(dbFile);

    const register = { id: jsonFile.nextId++, ...req.body };

    jsonFile.pessoas.push(register);
    await writeFile(global.fileName, JSON.stringify(jsonFile));
    res.send(register);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function put(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.send({ message: 'Necessário informar Id' });
    } else {
      const register = req.body;
      const dbFile = await readFile(global.fileName);
      const jsonFile = JSON.parse(dbFile);

      const index = jsonFile.pessoas.findIndex((pessoa) => pessoa.id == id);

      jsonFile.pessoas[index] = { id: id, ...register };

      writeFile(global.fileName, JSON.stringify(jsonFile));

      res.send(register);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const dbFile = await readFile(global.fileName);
    const jsonFile = JSON.parse(dbFile);

    jsonFile.pessoas = jsonFile.pessoas.filter(
      (pessoa) => pessoa.id != req.params.id
    );

    writeFile(global.fileName, JSON.stringify(jsonFile));
    res.send(true);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = { get, post, put, remove };
