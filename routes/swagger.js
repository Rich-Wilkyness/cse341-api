const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// router.use('/api-docs/', swaggerUi.serve);
// router.get('/api-docs/', swaggerUi.setup(swaggerDocument));

routes.use('/', require('./swagger'));
routes.use('/contacts', contact);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  })
);

module.exports = router;
