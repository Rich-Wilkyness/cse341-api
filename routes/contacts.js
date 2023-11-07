const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');


// GET /feed/posts
// router.get('/', (req, res) => {
//     res.send('Hello World');
// })
// Get all contacts and all info on them
router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContact);

module.exports = router;