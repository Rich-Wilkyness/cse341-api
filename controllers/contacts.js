const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    res.status(500).json({ error: 'An error occurred while fetching contacts.' });
  }
};

const getContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'An error occurred while fetching the contact.' });
  }
};

module.exports = { 
  getAllContacts,
  getContact,
};
