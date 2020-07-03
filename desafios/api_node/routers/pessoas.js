const express = require('express');
const pessoasController = require('../controllers/pessoasController');

const router = new express.Router();

router
  .route('/pessoas/:id?')
  .get(pessoasController.get)
  .post(pessoasController.post)
  .put(pessoasController.put)
  .delete(pessoasController.remove);

module.exports = router;
